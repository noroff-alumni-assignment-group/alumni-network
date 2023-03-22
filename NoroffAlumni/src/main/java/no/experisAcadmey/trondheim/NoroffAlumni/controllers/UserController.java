package no.experisAcadmey.trondheim.NoroffAlumni.controllers;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import no.experisAcadmey.trondheim.NoroffAlumni.mappers.TopicMapper;
import no.experisAcadmey.trondheim.NoroffAlumni.mappers.UserMapper;
import no.experisAcadmey.trondheim.NoroffAlumni.models.DTOs.userDTOs.UserDto;
import no.experisAcadmey.trondheim.NoroffAlumni.models.User;
import no.experisAcadmey.trondheim.NoroffAlumni.services.UserService;
import org.mapstruct.factory.Mappers;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ProblemDetail;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;
import java.util.UUID;

@RestController
@RequestMapping("/api/v1/user")
public class UserController {

    @Autowired
    private UserService userService;

    private UserMapper userMapper = Mappers.getMapper(UserMapper.class);


    /**
     * Retrieves the information of the currently
     * authenticated user.
     *
     * @return currently authenticated user
     */
    @GetMapping
    @PreAuthorize("hasRole('ROLE_ALUMNI')")
    @Operation(summary = "Retrieves the currently authenticated user")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Success", content = {
                    @Content(mediaType = "application/json", schema = @Schema(implementation = UserDto.class))
            }),
            @ApiResponse(responseCode = "400", description = "Bad Request", content = {
                    @Content(mediaType = "application/json", schema = @Schema(implementation = ProblemDetail.class))
            }),
    })
    public ResponseEntity getCurrentUser(){
        try{
            return ResponseEntity.ok(userMapper.toUserDto(userService.getCurrentUser()));
        }catch(Exception e){
            return ResponseEntity.badRequest().build();
        }
    }

    @GetMapping("/find/{name}")
    @PreAuthorize("hasRole('ROLE_ALUMNI')")
    @Operation(summary = "Find a user by name and return the user")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Success", content = {
                    @Content(mediaType = "application/json", schema = @Schema(implementation = UserDto.class))
            }),
            @ApiResponse(responseCode = "400", description = "Bad Request", content = {
                    @Content(mediaType = "application/json", schema = @Schema(implementation = ProblemDetail.class))
            }),
            @ApiResponse(responseCode = "404", description = "Not Found", content = {
                    @Content(mediaType = "application/json", schema = @Schema(implementation = ProblemDetail.class))
            }),
    })
    public ResponseEntity<UserDto> findUserByName(
            @Parameter(description = "Name to search for", required = true)
            @PathVariable("name") String name) {
        Optional<User> user = userService.findUserByName(name);

        if (user.isPresent()) {
            return ResponseEntity.ok(userMapper.toUserDto(user.get()));
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @PutMapping("/{id}")
    @PreAuthorize("hasRole('ROLE_ALUMNI')")
    @Operation(summary = "Update user profile")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Success", content = {
                    @Content(mediaType = "application/json", schema = @Schema(implementation = UserDto.class))
            }),
            @ApiResponse(responseCode = "400", description = "Bad Request", content = {
                    @Content(mediaType = "application/json", schema = @Schema(implementation = ProblemDetail.class))
            }),
            @ApiResponse(responseCode = "404", description = "Not Found", content = {
                    @Content(mediaType = "application/json", schema = @Schema(implementation = ProblemDetail.class))
            }),
    })
    public ResponseEntity<UserDto> updateUser(
            @Parameter(description = "User ID", required = true)
            @PathVariable("id") String id,
            @Parameter(description = "Updated user data", required = true)
            @RequestBody UserDto updatedUserData) {
        Optional<User> user = userService.findUserById(id);

        if (user.isPresent()) {
            User updatedUserModel = userMapper.toUser(updatedUserData);
            User updatedUser = userService.updateUser(id, updatedUserModel);

            return ResponseEntity.ok(userMapper.toUserDto(updatedUser));
        } else {
            return ResponseEntity.notFound().build();
        }
    }
}
