package no.experisAcadmey.trondheim.NoroffAlumni.models.DTOs.replyDTOs;

import lombok.Data;
import no.experisAcadmey.trondheim.NoroffAlumni.models.DTOs.userDTOs.UserDisplayDto;

import java.util.Date;
import java.util.List;

@Data
public class ReplyDto {

    private Long id;
    private String body;
    private Date last_updated;
    private UserDisplayDto author;
    private List<ReplyDto> child_replies;
}
