package no.experisAcadmey.trondheim.NoroffAlumni.mappers;

import no.experisAcadmey.trondheim.NoroffAlumni.models.DTOs.userDTOs.UserDto;
import no.experisAcadmey.trondheim.NoroffAlumni.models.Topic;
import no.experisAcadmey.trondheim.NoroffAlumni.models.User;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.Named;

import java.util.Set;
import java.util.stream.Collectors;

@Mapper(componentModel = "spring")
public abstract class UserMapper {

    @Mapping(target = "topics", qualifiedByName = "mapTopicToTopicId", source = "topics")
    public abstract UserDto toUserDto(User user);

    @Named("mapTopicToTopicId")
    public Set<Long> mapTopicToTopicId(Set<Topic> topics){
        return topics.stream().map(Topic::getId).collect(Collectors.toSet());
    }
}
