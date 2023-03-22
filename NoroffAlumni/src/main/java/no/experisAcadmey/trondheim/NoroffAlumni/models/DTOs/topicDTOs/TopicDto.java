package no.experisAcadmey.trondheim.NoroffAlumni.models.DTOs.topicDTOs;

import lombok.Data;

import java.util.List;
import java.util.Set;

@Data
public class TopicDto {
    private Long id;
    private String name;
    private String description;
    private Set<String> subscribers;
    private List<Long> posts;
}
