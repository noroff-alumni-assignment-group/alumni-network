package no.experisAcadmey.trondheim.NoroffAlumni.services;

import no.experisAcadmey.trondheim.NoroffAlumni.models.DTOs.replyDTOs.NewReplyDto;
import no.experisAcadmey.trondheim.NoroffAlumni.models.Reply;
import no.experisAcadmey.trondheim.NoroffAlumni.repositories.ReplyRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.List;
import java.util.Optional;

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

    public List<Reply> getReplies(Long postId) {
        return replyRepository.findAllByTargetPostIdOrderByLastUpdatedDesc(postId);
    }

    public Long createReply(NewReplyDto newReplyDto, Long postId, Optional<Long> parentId){
        Reply reply = new Reply();
        reply.setLastUpdated(new Date());
        reply.setBody(newReplyDto.getBody());
        reply.setAuthor(userService.getCurrentUser());
        if(parentId.isPresent()){
            reply.setParentReply(getReply(parentId.get()));
        }else {
            reply.setTargetPost(postService.getPost(postId));
        }
        replyRepository.save(reply);
        return reply.getId();
    }
}
