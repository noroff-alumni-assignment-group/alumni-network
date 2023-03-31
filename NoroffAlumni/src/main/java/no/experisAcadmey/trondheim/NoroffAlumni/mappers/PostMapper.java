package no.experisAcadmey.trondheim.NoroffAlumni.mappers;

import no.experisAcadmey.trondheim.NoroffAlumni.models.*;
import no.experisAcadmey.trondheim.NoroffAlumni.models.DTOs.groupDTOs.GroupReducedDto;
import no.experisAcadmey.trondheim.NoroffAlumni.models.DTOs.postDTOs.PostDto;
import no.experisAcadmey.trondheim.NoroffAlumni.models.DTOs.replyDTOs.ReplyDto;
import no.experisAcadmey.trondheim.NoroffAlumni.models.DTOs.replyDTOs.ReplyDto;
import no.experisAcadmey.trondheim.NoroffAlumni.models.DTOs.topicDTOs.TopicReducedDto;
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
    @Autowired
    private TopicMapper topicMapper = Mappers.getMapper(TopicMapper.class);
    @Autowired
    private GroupMapper groupMapper = Mappers.getMapper(GroupMapper.class);

    @Mapping(target = "target_topics", qualifiedByName = "mapTopicToTopicReducedDto", source = "targetTopics")
    @Mapping(target = "author", qualifiedByName = "mapUserToUserDisplayDto", source = "author")
    @Mapping(target = "target_user", qualifiedByName = "mapUserToUserDisplayDto", source = "targetUser")
    @Mapping(target="target_group",qualifiedByName = "mapGroupToGroupReducedDto", source = "targetGroups")
    @Mapping(target = "last_updated", source = "lastUpdated")
    @Mapping(target = "replies", qualifiedByName = "mapReplyToReplyDto", source = "replies")
    public abstract PostDto postToPostDto(Post post);

    public abstract Collection<PostDto> postToPostDto(Collection<Post> posts);

    @Named("mapTopicToTopicReducedDto")
    public List<TopicReducedDto> mapTopicToTopicReducedDto(List<Topic> topics){
        return topicMapper.toTopicReducedDto(topics);
    }

    @Named("mapUserToUserDisplayDto")
    public UserDisplayDto mapUserToUserDisplayDto(User user) {
        return userMapper.toUserDisplayDto(user);
    }

    @Named("mapGroupToGroupReducedDto")
    public List<GroupReducedDto> mapGroupToGroupReducedDto(List<Group> groups){
        return groupMapper.toGroupReducedDto(groups);
    }

    @Named("mapReplyToReplyDto")
    public List<ReplyDto> mapReplyToReplyDto(List<Reply> replies) {
        return replyMapper.toReplyDto(replies);
    }
}
