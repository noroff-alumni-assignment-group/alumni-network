package no.experisAcadmey.trondheim.NoroffAlumni.controllers;

import java.net.URI;
import java.util.Optional;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.ArraySchema;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import no.experisAcadmey.trondheim.NoroffAlumni.exceptions.TopicExistException;
import no.experisAcadmey.trondheim.NoroffAlumni.exceptions.TopicNotFoundException;
import no.experisAcadmey.trondheim.NoroffAlumni.mappers.ProfileMapper;
import no.experisAcadmey.trondheim.NoroffAlumni.mappers.TopicMapper;
import no.experisAcadmey.trondheim.NoroffAlumni.models.DTOs.profileDTOs.UpdateProfile;
import no.experisAcadmey.trondheim.NoroffAlumni.models.DTOs.topicDTOs.NewTopic;
import no.experisAcadmey.trondheim.NoroffAlumni.models.DTOs.topicDTOs.TopicDto;
import no.experisAcadmey.trondheim.NoroffAlumni.models.DTOs.topicDTOs.TopicListItem;
import no.experisAcadmey.trondheim.NoroffAlumni.models.Profile;
import no.experisAcadmey.trondheim.NoroffAlumni.services.ProfileService;
import org.mapstruct.factory.Mappers;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ProblemDetail;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import no.experisAcadmey.trondheim.NoroffAlumni.services.TopicService;

@RestController
@RequestMapping(path = "/api/v1/profile")
public class ProfileController {

    @Autowired
    private ProfileService profileService;
    private ProfileMapper profileMapper = Mappers.getMapper(ProfileMapper.class);

    @PutMapping("/{id}")
    @PreAuthorize("hasRole('ROLE_ALUMNI')")
    public ResponseEntity<Profile> updateProfile(@PathVariable Long id, @RequestBody UpdateProfile updateProfileData) throws Exception {
        Profile updatedProfileData = profileMapper.updateProfileToProfile(updateProfileData);
        Profile updatedProfile = profileService.updateProfile(id, updatedProfileData);
        return ResponseEntity.ok(updatedProfile);
    }

    @GetMapping("/{id}")
    @PreAuthorize("hasRole('ROLE_ALUMNI')")
    public ResponseEntity<Profile> getProfile(@PathVariable Long id) throws Exception {
        Profile profile = profileService.getProfile(id);
        return ResponseEntity.ok(profile);
    }

}
