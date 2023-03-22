package no.experisAcadmey.trondheim.NoroffAlumni.mappers;

import no.experisAcadmey.trondheim.NoroffAlumni.models.DTOs.profileDTOs.UpdateProfile;
import no.experisAcadmey.trondheim.NoroffAlumni.models.Profile;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper
public interface ProfileMapper {

    // Other existing mapping methods

    @Mapping(target = "id", ignore = true)
    @Mapping(target = "profileOwnerID", ignore = true)
    Profile updateProfileToProfile(UpdateProfile updateProfile);
}
