package no.experisAcadmey.trondheim.NoroffAlumni.models.DTOs.groupDTOs;

import lombok.Data;

/**
 * Group post DTO
 */
@Data
public class GroupPostDto {

    private String name;
    private String description;
    private Boolean isPrivate;

}
