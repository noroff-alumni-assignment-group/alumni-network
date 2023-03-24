package no.experisAcadmey.trondheim.NoroffAlumni.models.DTOs.groupDTOs;

import lombok.Data;

import java.util.List;
import java.util.Set;

/**
 * Group read DTO
 */
@Data
public class GroupDto {

    private Long id;
    private String name;
    private String description;
    private Boolean isPrivate;
    private Set<String> members;
    private List<Long> posts;

}
