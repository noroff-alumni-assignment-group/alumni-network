package no.experisAcadmey.trondheim.NoroffAlumni.models.DTOs.topicDTOs;

import lombok.Data;

@Data
public class TopicListItem {
    private Long id;
    private String name;
    private String description;
    private Integer subscribers;
    private Integer numberOfPosts;
}
