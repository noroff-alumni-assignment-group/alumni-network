package no.experisAcadmey.trondheim.NoroffAlumni.models.DTOs.groupDTOs;

import lombok.Data;
import no.experisAcadmey.trondheim.NoroffAlumni.models.User;

/**
 * Group post DTO
 */
@Data
public class GroupPostDto {

    private String name;
    private String description;
    private Boolean isPrivate;

}
