package no.experisAcadmey.trondheim.NoroffAlumni.models.DTOs.groupDTOs;

import lombok.Data;

import java.util.Set;

/**
 * Group read DTO
 */
@Data
public class GroupDTO {

    private int group_id;
    private String name;
    private String description;
    private Boolean is_private;
    private Set<String> members;

}
