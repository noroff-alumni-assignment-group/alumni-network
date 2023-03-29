package no.experisAcadmey.trondheim.NoroffAlumni.mappers;

import no.experisAcadmey.trondheim.NoroffAlumni.models.DTOs.userDTOs.UserDisplayDto;
import no.experisAcadmey.trondheim.NoroffAlumni.models.DTOs.userDTOs.UserDto;
import no.experisAcadmey.trondheim.NoroffAlumni.models.Topic;
import no.experisAcadmey.trondheim.NoroffAlumni.models.User;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.Named;
import org.mapstruct.factory.Mappers;

import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

@Mapper(componentModel = "spring")
public abstract class UserMapper {

    /**
     * Maps a user to the userDTO.
     * @param user user to map
     * @return mapped userDTO
     */
    @Mapping(target = "topics", qualifiedByName = "mapTopicToTopicId", source = "topics")
    @Mapping(target = "profileTheme", source = "profileTheme")
    public abstract UserDto toUserDto(User user);

    public abstract UserDisplayDto toUserDisplayDto(User user);

    public abstract List<UserDisplayDto> toUserDisplayDto(List<User> users);

    @Mapping(target = "topics", qualifiedByName = "mapTopicIdToTopic", source = "topics")
    @Mapping(target = "profileTheme", source = "profileTheme")
    public abstract User toUser(UserDto userDto);

    /**
     * Defines how to map topics
     * @param topics topics to map
     * @return mapped topics
     */
    @Named("mapTopicToTopicId")
    public Set<String> mapTopicToTopicId(Set<Topic> topics){
        return topics.stream().map(Topic::getName).collect(Collectors.toSet());
    }


    @Named("mapTopicIdToTopic")
    public Set<Topic> mapTopicIdToTopic(Set<String> topicIds) {
        return topicIds.stream().map(topicId -> {
            Topic topic = new Topic();
            topic.setName(topicId);
            return topic;
        }).collect(Collectors.toSet());
    }
}
