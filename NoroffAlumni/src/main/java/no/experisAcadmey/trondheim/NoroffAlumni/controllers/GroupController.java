package no.experisAcadmey.trondheim.NoroffAlumni.controllers;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.ArraySchema;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import no.experisAcadmey.trondheim.NoroffAlumni.exceptions.GroupNotFoundException;
import no.experisAcadmey.trondheim.NoroffAlumni.mappers.GroupMapper;
import no.experisAcadmey.trondheim.NoroffAlumni.models.DTOs.groupDTOs.GroupDTO;
import no.experisAcadmey.trondheim.NoroffAlumni.models.DTOs.groupDTOs.GroupPostDTO;
import no.experisAcadmey.trondheim.NoroffAlumni.models.Group;
import no.experisAcadmey.trondheim.NoroffAlumni.services.GroupService;
import org.mapstruct.factory.Mappers;
import org.springframework.http.ProblemDetail;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.util.Collection;

@RestController
@RequestMapping(path = "api/v1/group")
public class GroupController {

    private final GroupService groupService;
    private final GroupMapper groupMapper = Mappers.getMapper(GroupMapper.class);

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
                            array = @ArraySchema(schema = @Schema(implementation = GroupDTO.class)))
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
            Collection<GroupDTO> groups = groupMapper.groupsToGroupDTO(groupService.findGroups());
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
                            array = @ArraySchema(schema = @Schema(implementation = GroupDTO.class)))
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
            return ResponseEntity.ok(groupMapper.groupToGroupDTO(groupService.findGroupById(id)));
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
    public ResponseEntity createGroup(@RequestBody GroupPostDTO group) {
        try {
            Group newGroup = groupService.createGroup(groupMapper.groupPostDTOToGroup(group));
            URI location = URI.create("group/" + newGroup.getId());
            return ResponseEntity.created(location).build();
        } catch(Exception e){
            return ResponseEntity.badRequest().build();
        }
    }

    @PostMapping("/{id}/join")
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
    public ResponseEntity joinGroup(@PathVariable("id") Long id) {
        try {
            return ResponseEntity.ok(groupMapper.groupToGroupDTO(groupService.joinGroup(id)));
        } catch (GroupNotFoundException e) {
            return ResponseEntity.notFound().build();
        } catch(Exception e) {
            return ResponseEntity.badRequest().build();
        }
    }


}