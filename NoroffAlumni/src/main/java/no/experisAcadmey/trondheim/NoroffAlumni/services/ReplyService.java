package no.experisAcadmey.trondheim.NoroffAlumni.services;

import no.experisAcadmey.trondheim.NoroffAlumni.models.DTOs.replyDTOs.NewReplyDto;
import no.experisAcadmey.trondheim.NoroffAlumni.models.Reply;
import no.experisAcadmey.trondheim.NoroffAlumni.repositories.ReplyRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Date;

@Service
public class ReplyService {

    @Autowired
    private ReplyRepository replyRepository;
    @Autowired
    private PostService postService;
    @Autowired
    private UserService userService;


    public Reply getReply(Long replyId){
        return replyRepository.findById(replyId).orElseThrow();
    }

    public Long createReply(NewReplyDto newReplyDto, Long postId){
        Reply reply = new Reply();
        reply.setLastUpdated(new Date());
        reply.setBody(newReplyDto.getBody());
        reply.setTargetPost(postService.getPost(postId));
        reply.setAuthor(userService.getCurrentUser());
        replyRepository.save(reply);
        return reply.getId();
    }
}
