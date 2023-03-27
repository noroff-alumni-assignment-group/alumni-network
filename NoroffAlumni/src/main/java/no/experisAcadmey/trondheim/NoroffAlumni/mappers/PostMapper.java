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
import java.util.List;
import java.util.stream.Collectors;

@Mapper(componentModel = "spring")
public abstract class PostMapper {

    @Autowired
    private UserMapper userMapper = Mappers.getMapper(UserMapper.class);

    @Mapping(target = "target_topics", qualifiedByName = "mapTopicToTopicName", source = "targetTopics")
    @Mapping(target = "author", qualifiedByName = "mapUserToUserDisplayDto", source = "author")
    @Mapping(target = "target_user", qualifiedByName = "mapUserToUserDisplayDto", source = "targetUser")
    public abstract PostDto postToPostDto(Post post);

    public abstract Collection<PostDto> postToPostDto(Collection<Post> posts);

    @Named("mapTopicToTopicName")
    public List<String> mapTopicToTopicName(List<Topic> topics){
        return topics.stream().map(Topic::getName).collect(Collectors.toList());
    }

    @Named("mapUserToUserDisplayDto")
    public UserDisplayDto maptUserToUserDisplayDto(User user) {
        return userMapper.toUserDisplayDto(user);
    }

}
