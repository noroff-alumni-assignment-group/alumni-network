package no.experisAcadmey.trondheim.NoroffAlumni.mappers;

import no.experisAcadmey.trondheim.NoroffAlumni.models.DTOs.postDTOs.PostDto;
import no.experisAcadmey.trondheim.NoroffAlumni.models.DTOs.userDTOs.UserDisplayDto;
import no.experisAcadmey.trondheim.NoroffAlumni.models.Post;
import no.experisAcadmey.trondheim.NoroffAlumni.models.Topic;
import no.experisAcadmey.trondheim.NoroffAlumni.models.User;
import no.experisAcadmey.trondheim.NoroffAlumni.services.TopicService;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.Named;
import org.mapstruct.factory.Mappers;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.Collection;

@Mapper(componentModel = "spring")
public abstract class PostMapper {

    @Autowired
    private UserMapper userMapper = Mappers.getMapper(UserMapper.class);

    @Mapping(target = "target_topic", qualifiedByName = "mapTopicToTopicName", source = "target_topic")
    @Mapping(target = "author", qualifiedByName = "mapUserToUserDisplayDto", source = "author")
    @Mapping(target = "target_user", qualifiedByName = "mapUserToUserDisplayDto", source = "target_user")
    public abstract PostDto postToPostDto(Post post);

    public abstract Collection<PostDto> postToPostDto(Collection<Post> posts);

    @Named("mapTopicToTopicName")
    public String mapTopicToTopicName(Topic topic){
        return topic.getName();
    }

    @Named("mapUserToUserDisplayDto")
    public UserDisplayDto maptUserToUserDisplayDto(User user) {
        return userMapper.toUserDisplayDto(user);
    }

}
