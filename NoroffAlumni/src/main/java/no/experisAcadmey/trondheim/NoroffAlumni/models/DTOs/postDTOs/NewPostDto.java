package no.experisAcadmey.trondheim.NoroffAlumni.models.DTOs.postDTOs;

import lombok.Data;

@Data
public class NewPostDto {
    private String title;
    private String body;
    private String target_topic;
    private String target_group;
}
