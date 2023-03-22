package no.experisAcadmey.trondheim.NoroffAlumni.models.DTOs.postDTOs;

import lombok.Data;
import no.experisAcadmey.trondheim.NoroffAlumni.models.DTOs.userDTOs.UserDisplayDto;
import no.experisAcadmey.trondheim.NoroffAlumni.models.DTOs.userDTOs.UserDto;

import java.util.Date;
import java.util.List;

@Data
public class PostDto {
    private Long id;
    private String title;
    private String body;
    private Date last_updated;
    private UserDisplayDto author;
    private UserDisplayDto target_user;
    private List<String> target_topics;
    private List<String> target_groups;
}
