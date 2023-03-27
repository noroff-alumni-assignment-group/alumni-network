package no.experisAcadmey.trondheim.NoroffAlumni.models.DTOs.postDTOs;

import lombok.Data;

@Data
public class NewPostDto {
    private String title;
    private String body;
    private String target_user;
    private String[] target_topics;
    private String[] target_groups;
}
