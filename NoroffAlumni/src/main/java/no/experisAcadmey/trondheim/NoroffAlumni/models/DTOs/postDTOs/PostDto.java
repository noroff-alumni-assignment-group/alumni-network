package no.experisAcadmey.trondheim.NoroffAlumni.models.DTOs.postDTOs;

import lombok.Data;
import no.experisAcadmey.trondheim.NoroffAlumni.models.DTOs.userDTOs.UserDisplayDto;
import no.experisAcadmey.trondheim.NoroffAlumni.models.DTOs.userDTOs.UserDto;

import java.util.Date;

@Data
public class PostDto {
    private Long id;
    private String title;
    private String body;
    private Date last_updated;
    private UserDisplayDto author;
    private String target_topic;
    private String target_group;
}
