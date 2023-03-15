package no.experisAcadmey.trondheim.NoroffAlumni.models.DTOs.groupDTOs;

import lombok.Data;

/**
 * Group post DTO
 */
@Data
public class GroupPostDTO {

    private String name;
    private String description;
    private Boolean is_private;

}
