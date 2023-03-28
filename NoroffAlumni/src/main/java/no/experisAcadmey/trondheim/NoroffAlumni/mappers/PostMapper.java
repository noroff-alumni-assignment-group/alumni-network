package no.experisAcadmey.trondheim.NoroffAlumni.mappers;

import no.experisAcadmey.trondheim.NoroffAlumni.models.*;
import no.experisAcadmey.trondheim.NoroffAlumni.models.DTOs.postDTOs.PostDto;
import no.experisAcadmey.trondheim.NoroffAlumni.models.DTOs.replyDTOs.ReplyDto;
import no.experisAcadmey.trondheim.NoroffAlumni.models.DTOs.replyDTOs.ReplyDto;
import no.experisAcadmey.trondheim.NoroffAlumni.models.DTOs.userDTOs.UserDisplayDto;
import no.experisAcadmey.trondheim.NoroffAlumni.services.TopicService;
import no.experisAcadmey.trondheim.NoroffAlumni.models.Reply;
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
    @Autowired
    private ReplyMapper replyMapper = Mappers.getMapper(ReplyMapper.class);

    @Mapping(target = "target_topics", qualifiedByName = "mapTopicToTopicName", source = "targetTopics")
    @Mapping(target = "author", qualifiedByName = "mapUserToUserDisplayDto", source = "author")
    @Mapping(target = "target_user", qualifiedByName = "mapUserToUserDisplayDto", source = "targetUser")
    @Mapping(target="target_group",qualifiedByName = "mapGroupToGroupName", source = "targetGroups")
    @Mapping(target = "last_updated", source = "lastUpdated")
    @Mapping(target = "replies", qualifiedByName = "mapReplyToReplyDto", source = "replies")
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

    @Named("mapGroupToGroupName")
    public List<String> mapGroupToGroupName(List<Group> groups){
        return groups.stream().map(Group::getName).toList();
    }

    @Named("mapReplyToReplyDto")
    public List<ReplyDto> mapReplyToReplyDto(List<Reply> replies) {
        return replyMapper.toReplyDto(replies);
    }
}
