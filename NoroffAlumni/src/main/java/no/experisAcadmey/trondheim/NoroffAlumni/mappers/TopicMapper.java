package no.experisAcadmey.trondheim.NoroffAlumni.mappers;

import no.experisAcadmey.trondheim.NoroffAlumni.models.DTOs.topicDTOs.TopicDto;
import no.experisAcadmey.trondheim.NoroffAlumni.models.DTOs.topicDTOs.TopicListItem;
import no.experisAcadmey.trondheim.NoroffAlumni.models.Topic;
import no.experisAcadmey.trondheim.NoroffAlumni.models.User;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.Named;

import java.util.*;
import java.util.stream.Collectors;

/**
 * Mapper used to map between domain model and
 * DTOs
 */
@Mapper(componentModel = "spring")
public abstract class TopicMapper {

    /**
     * Maps a topic to a TopiclistItem
     * @param topic topic to map
     * @return topicListItem based on Topic
     */
    @Mapping(target = "subscribers", qualifiedByName = "mapCollectionToSize", source = "subscribers")
    @Mapping(target = "numberOfPosts", qualifiedByName = "mapCollectionToSize", source = "posts")
    public abstract TopicListItem topicToTopicListItem(Topic topic);

    /**
     * Maps a list of Topics to TopicListItems
     * @param topics topics to map
     * @return topicListItems
     */
    public abstract Collection<TopicListItem> topicToTopicListItem(Collection<Topic> topics);

    /**
     * Maps a topic to topicDTO
     * @param topic topic to map
     * @return topicDto from topic
     */
    @Mapping(target = "subscribers", qualifiedByName = "mapSubscribersToId",source = "subscribers")
    public abstract TopicDto topicToTopicDto(Topic topic);

    /**
     * Defines how to map the subscriberField
     * @param subscribers list of users to map
     * @return mapped version of subscribers containing their ids
     */
    @Named("mapSubscribersToId")
    public Set<String> mapSubscribersToId(Set<User> subscribers) {
        if (subscribers == null) return new HashSet<>();
        return subscribers.stream().map(User::getId).collect(Collectors.toSet());
    }

    /**
     * Defines how to map a collection to the size of itself.
     *
     * @param collection collection to map
     * @return Integer of size of collection
     */

    @Named("mapCollectionToSize")
    public Integer mapCollectionToSize(Collection<?> collection) {
        if (collection == null) return 0;
        return collection.size();
    }

}
