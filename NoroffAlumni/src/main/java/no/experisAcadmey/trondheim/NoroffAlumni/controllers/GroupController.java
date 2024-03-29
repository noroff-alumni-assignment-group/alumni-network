package no.experisAcadmey.trondheim.NoroffAlumni.controllers;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.ArraySchema;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import no.experisAcadmey.trondheim.NoroffAlumni.exceptions.GroupNotFoundException;
import no.experisAcadmey.trondheim.NoroffAlumni.mappers.GroupMapper;
import no.experisAcadmey.trondheim.NoroffAlumni.mappers.PostMapper;
import no.experisAcadmey.trondheim.NoroffAlumni.models.DTOs.groupDTOs.GroupDto;
import no.experisAcadmey.trondheim.NoroffAlumni.models.DTOs.groupDTOs.GroupPostDto;
import no.experisAcadmey.trondheim.NoroffAlumni.models.User;
import no.experisAcadmey.trondheim.NoroffAlumni.services.GroupService;
import org.mapstruct.factory.Mappers;
import org.springframework.http.ProblemDetail;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.util.Collection;
import java.util.Optional;
import java.util.UUID;

@RestController
@RequestMapping(path = "api/v1/group")
public class GroupController {

    private final GroupService groupService;
    private final GroupMapper groupMapper = Mappers.getMapper(GroupMapper.class);
    private final PostMapper postMapper = Mappers.getMapper(PostMapper.class);

    public GroupController(GroupService groupService) {
        this.groupService = groupService;
    }


    @GetMapping
    @PreAuthorize("hasRole('ROLE_ALUMNI')")
    @Operation(summary = "Find all groups")
    @ApiResponses(value = {
            @ApiResponse(
                    responseCode = "200",
                    description = "Success",
                    content = { @Content(mediaType = "application/json",
                            array = @ArraySchema(schema = @Schema(implementation = GroupDto.class)))
                    }
            ),
            @ApiResponse(
                    responseCode = "400",
                    description = "Bad request",
                    content = { @Content(mediaType = "application/json",
                            schema = @Schema(implementation = ProblemDetail.class))
                    }
            ),
            @ApiResponse(
                    responseCode = "404",
                    description = "Group not Found",
                    content = { @Content(mediaType = "application/json",
                            schema = @Schema(implementation = ProblemDetail.class))
                    }
            )
    })
    public ResponseEntity getGroups() {
        try {
            Collection<GroupDto> groups = groupMapper.groupsToGroupDto(groupService.findGroups());
            return ResponseEntity.ok(groups);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Request not valid");
        }
    }

    @GetMapping("/{id}")
    @PreAuthorize("hasRole('ROLE_ALUMNI')")
    @Operation(summary = "Find a group by an ID")
    @ApiResponses(value = {
            @ApiResponse(
                    responseCode = "200",
                    description = "Success",
                    content = { @Content(mediaType = "application/json",
                            array = @ArraySchema(schema = @Schema(implementation = GroupDto.class)))
                    }
            ),
            @ApiResponse(
                    responseCode = "400",
                    description = "Bad Request",
                    content = { @Content(mediaType = "application/json",
                            schema = @Schema(implementation = ProblemDetail.class))
                    }
            ),
            @ApiResponse(
                    responseCode = "403",
                    description = "Forbidden",
                    content = { @Content(mediaType = "application/json",
                            schema = @Schema(implementation = ProblemDetail.class))
                    }
            ),
            @ApiResponse(
                    responseCode = "404",
                    description = "Group not Found",
                    content = { @Content(mediaType = "application/json",
                            schema = @Schema(implementation = ProblemDetail.class))
                    }
            )
    })
    public ResponseEntity getGroupById(@PathVariable Long id) {
        try {
            return ResponseEntity.ok(groupMapper.groupToGroupDto(groupService.findGroupById(id)));
        } catch (GroupNotFoundException e) {
            return ResponseEntity.notFound().build();
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Request not valid");
        }

    }

    @GetMapping("/member")
    @PreAuthorize("hasRole('ROLE_ALUMNI')")
    @Operation(summary = "Retrieve all groups that the current user is a member of")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Success", content = {
                    @Content(mediaType = "application/json", array = @ArraySchema(schema = @Schema(implementation = GroupDto.class)))
            }),
            @ApiResponse(responseCode = "400", description = "Bad Request", content = {
                    @Content(mediaType = "application/json", schema = @Schema(implementation = ProblemDetail.class))
            }),
            @ApiResponse(responseCode = "404", description = "Group Not Found", content = {
                    @Content(mediaType = "application/json", schema = @Schema(implementation = ProblemDetail.class))
            }),
    })
    public ResponseEntity getUserGroups() {
        try {
            Collection<GroupDto> groups = groupMapper.groupsToGroupDto(groupService.findUserGroups());
            return ResponseEntity.ok(groups);
        } catch (GroupNotFoundException e) {
            return ResponseEntity.notFound().build();
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Request not valid");
        }
    }

    @PostMapping
    @PreAuthorize("hasRole('ROLE_ALUMNI')")
    @Operation(summary = "Create a new group")
    @ApiResponses(value = {
            @ApiResponse(
                    responseCode = "201",
                    description = "Created",
                    content = @Content
            ),
            @ApiResponse(
                    responseCode = "400",
                    description = "Bad Request",
                    content = { @Content(mediaType = "application/json",
                            schema = @Schema(implementation = ProblemDetail.class))
                    }
            )
    })
    public ResponseEntity createGroup(@RequestBody GroupPostDto group) {
        try {
            return ResponseEntity.created(URI.create("group/"+groupService.createGroup(group))).build();
        } catch(Exception e){
            return ResponseEntity.badRequest().build();
        }
    }

    @PostMapping("/{group_id}/join")
    @PreAuthorize("hasRole('ROLE_ALUMNI')")
    @Operation(summary = "Join a group")
    @ApiResponses(value = {
            @ApiResponse(
                    responseCode = "200",
                    description = "Success",
                    content = @Content
            ),
            @ApiResponse(
                    responseCode = "400",
                    description = "Bad request",
                    content = { @Content(mediaType = "application/json",
                            schema = @Schema(implementation = ProblemDetail.class))
                    }
            ),
            @ApiResponse(
                    responseCode = "404",
                    description = "Group not Found",
                    content = { @Content(mediaType = "application/json",
                            schema = @Schema(implementation = ProblemDetail.class))
            })
    })
    public ResponseEntity joinGroup(@PathVariable("group_id") Long groupId) {
        try {
            return ResponseEntity.ok(groupMapper.groupToGroupDto(groupService.joinGroup(groupId)));
        } catch (GroupNotFoundException e) {
            return ResponseEntity.notFound().build();
        } catch(Exception e) {
            return ResponseEntity.badRequest().build();
        }
    }

    @PostMapping("/{group_id}/leave")
    @PreAuthorize("hasRole('ROLE_ALUMNI')")
    @Operation(summary = "Leave a group")
    @ApiResponses(value = {
            @ApiResponse(
                    responseCode = "200",
                    description = "Success",
                    content = @Content
            ),
            @ApiResponse(
                    responseCode = "400",
                    description = "Bad request",
                    content = { @Content(mediaType = "application/json",
                            schema = @Schema(implementation = ProblemDetail.class))
                    }
            ),
            @ApiResponse(
                    responseCode = "404",
                    description = "Group not Found",
                    content = { @Content(mediaType = "application/json",
                            schema = @Schema(implementation = ProblemDetail.class))
                    })
    })
    public ResponseEntity leaveGroup(@PathVariable("group_id") Long groupId) {
        try {
            groupService.leaveGroup(groupId);
            return ResponseEntity.ok().build();
        } catch (GroupNotFoundException e) {
            return ResponseEntity.notFound().build();
        } catch(Exception e) {
            return ResponseEntity.badRequest().build();
        }
    }

    @PostMapping("/{group_id}/invite/{user_id}")
    @PreAuthorize("hasRole('ROLE_ALUMNI')")
    @Operation(summary = "Invite a new member to a group")
    @ApiResponses(value = {
            @ApiResponse(
                    responseCode = "200",
                    description = "Success",
                    content = @Content
            ),
            @ApiResponse(
                    responseCode = "400",
                    description = "Bad request",
                    content = { @Content(mediaType = "application/json",
                            schema = @Schema(implementation = ProblemDetail.class))
                    }
            ),
            @ApiResponse(
                    responseCode = "404",
                    description = "Group not Found",
                    content = { @Content(mediaType = "application/json",
                            schema = @Schema(implementation = ProblemDetail.class))
                    })
    })
    public ResponseEntity inviteToGroup(@PathVariable("group_id") Long groupId, @PathVariable("user_id") UUID userId) {
        try {
            return ResponseEntity.ok(groupMapper.groupToGroupDto(groupService.inviteToGroup(groupId, userId)));
        } catch (GroupNotFoundException e) {
            return ResponseEntity.notFound().build();
        } catch(Exception e) {
            return ResponseEntity.badRequest().build();
        }
    }

    @GetMapping("/{group_id}/posts")
    @PreAuthorize("hasRole('ROLE_ALUMNI')")
    @Operation(summary = "Get all posts in a group")
    @ApiResponses(value = {
            @ApiResponse(
                    responseCode = "200",
                    description = "Success",
                    content = @Content
            ),
            @ApiResponse(
                    responseCode = "400",
                    description = "Bad request",
                    content = { @Content(mediaType = "application/json",
                            schema = @Schema(implementation = ProblemDetail.class))
                    }
            ),
            @ApiResponse(
                    responseCode = "404",
                    description = "Group not Found",
                    content = { @Content(mediaType = "application/json",
                            schema = @Schema(implementation = ProblemDetail.class))
                    })
    })
    public ResponseEntity getGroupPosts(@PathVariable("group_id") Long groupId, @RequestParam Optional<String> searchWord){
        try {
            return ResponseEntity.ok(postMapper.postToPostDto(groupService.getPostsInGroup(groupId, searchWord)));
        } catch (GroupNotFoundException e) {
            return ResponseEntity.notFound().build();
        } catch(Exception e) {
            return ResponseEntity.badRequest().build();
        }
    }


}