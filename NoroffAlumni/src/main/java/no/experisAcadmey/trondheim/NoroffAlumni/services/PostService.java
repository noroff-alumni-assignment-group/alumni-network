package no.experisAcadmey.trondheim.NoroffAlumni.services;

import no.experisAcadmey.trondheim.NoroffAlumni.exceptions.PostNotFoundException;
import no.experisAcadmey.trondheim.NoroffAlumni.models.DTOs.postDTOs.EditPostDto;
import no.experisAcadmey.trondheim.NoroffAlumni.models.DTOs.postDTOs.NewPostDto;
import no.experisAcadmey.trondheim.NoroffAlumni.models.Post;
import no.experisAcadmey.trondheim.NoroffAlumni.repositories.PostRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.List;
import java.util.Optional;

@Service
public class PostService {

    @Autowired
    private PostRepository postRepository;
    @Autowired
    private UserService userService;
    @Autowired
    private TopicService topicService;

    // TODO: Should return based on user's subscribed topics and groups, not "findAll"
    public List<Post> getPosts(){
        return postRepository.findAll();
    }

    public Post getPost(Long id) {
        return postRepository.findById(id).orElseThrow(PostNotFoundException::new);
    }

    public Long createPost(NewPostDto newPostDto){
        Post post = new Post();
        post.setTitle(newPostDto.getTitle());
        post.setBody(newPostDto.getBody());
        post.setLast_updated(new Date());
        post.setAuthor(userService.getCurrentUser());
        if(!newPostDto.getTarget_user().isEmpty()){
            post.setTarget_user(userService.getUser(newPostDto.getTarget_user()));
        }
        if(!newPostDto.getTarget_topic().isEmpty()){
            post.setTarget_topic(topicService.getTopicByName(newPostDto.getTarget_topic()));
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
        post.setLast_updated(new Date());
        postRepository.save(post);
        return post.getId();
    }

}