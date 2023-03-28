package no.experisAcadmey.trondheim.NoroffAlumni.services;

import no.experisAcadmey.trondheim.NoroffAlumni.exceptions.PostNotFoundException;
import no.experisAcadmey.trondheim.NoroffAlumni.models.DTOs.postDTOs.EditPostDto;
import no.experisAcadmey.trondheim.NoroffAlumni.models.DTOs.postDTOs.NewPostDto;
import no.experisAcadmey.trondheim.NoroffAlumni.models.Post;
import no.experisAcadmey.trondheim.NoroffAlumni.models.Topic;
import no.experisAcadmey.trondheim.NoroffAlumni.repositories.PostRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.*;
import java.util.stream.Collectors;

@Service
public class PostService {

    @Autowired
    private PostRepository postRepository;
    @Autowired
    private UserService userService;
    @Autowired
    private TopicService topicService;
    @Autowired
    private GroupService groupService;

    public Post getPost(Long id) {
        return postRepository.findById(id).orElseThrow(PostNotFoundException::new);
    }

    // TODO: Should return based on user's subscribed topics and groups, not "findAll"
    public List<Post> getPosts(Optional<String> searchWord){
        if(searchWord.isPresent()){
            return postRepository.findAllByTitleContainingIgnoreCaseOrBodyContainingIgnoreCaseOrderByLastUpdatedDesc(searchWord.get(), searchWord.get());
        }else {
            return postRepository.findAllByOrderByLastUpdatedDesc();
        }
    }

    public List<Post> getPostsUser(String authorId, Optional<String> searchWord){
        if(searchWord.isPresent()){
            return postRepository.findAllAuthoredBySearchWord("%" + searchWord.get() + "%", authorId);
        }else {
            return postRepository.findAllByAuthorIdOrderByLastUpdated(authorId);
        }
    }

    public List<Post> getPostsForTargetUser(Optional<String> searchWord){
        if(searchWord.isPresent()){
            return postRepository.findAllMessagesReceivedBySearchWord(userService.getCurrentUser().getId(), "%" + searchWord.get() + "%");
        } else {
            return postRepository.findAllByTargetUserIdOrderByLastUpdatedDesc(userService.getCurrentUser().getId());
        }
    }

    public List<Post> getPostsToTargetUser(Optional<String> searchWord){
        if(searchWord.isPresent()){
            return postRepository.findMessagesSentBySearchWord(userService.getCurrentUser().getId(), "%" + searchWord.get() + "%");
        } else {
            return postRepository.findAllByAuthorIdAndTargetUserIdIsNotNull(userService.getCurrentUser().getId());
        }
    }

    public Long createPost(NewPostDto newPostDto){
        Post post = new Post();
        post.setTitle(newPostDto.getTitle());
        post.setBody(newPostDto.getBody());
        post.setLastUpdated(new Date());
        post.setAuthor(userService.getCurrentUser());
        if(!newPostDto.getTarget_user().isEmpty()){
            post.setTargetUser(userService.getUser(newPostDto.getTarget_user()));
        }
        for (String topicName : newPostDto.getTarget_topics()) {
            post.addTopic(topicService.getTopicByName(topicName));
        }
        for (String groupName : newPostDto.getTarget_groups()) {
            post.addGroup(groupService.findGroupByName(groupName));
        }

        postRepository.save(post);
        return post.getId();
    }

    public Long editPost(EditPostDto editPostDto, Long postId) throws PostNotFoundException {
        Optional<Post> optionalPost = postRepository.findById(postId);
        if(optionalPost.isEmpty()){
            throw new PostNotFoundException();
        }
        Post post = optionalPost.get();
        post.setTitle(editPostDto.getTitle());
        post.setBody(editPostDto.getBody());
        post.setLastUpdated(new Date());
        postRepository.save(post);
        return post.getId();
    }

}
