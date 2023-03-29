package no.experisAcadmey.trondheim.NoroffAlumni.models.DTOs.postDTOs;

import lombok.Data;
import no.experisAcadmey.trondheim.NoroffAlumni.models.DTOs.groupDTOs.GroupReducedDto;
import no.experisAcadmey.trondheim.NoroffAlumni.models.DTOs.replyDTOs.ReplyDto;
import no.experisAcadmey.trondheim.NoroffAlumni.models.DTOs.topicDTOs.TopicReducedDto;
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
    private String authorInitlas;
    
    private List<TopicReducedDto> target_topics;
    private List<GroupReducedDto> target_group;

    private List<ReplyDto> replies;
}
