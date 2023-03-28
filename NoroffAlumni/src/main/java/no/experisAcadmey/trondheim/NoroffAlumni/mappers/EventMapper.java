package no.experisAcadmey.trondheim.NoroffAlumni.mappers;

import no.experisAcadmey.trondheim.NoroffAlumni.models.DTOs.eventDTOs.EventDTO;
import no.experisAcadmey.trondheim.NoroffAlumni.models.DTOs.eventDTOs.EventPostDTO;
import no.experisAcadmey.trondheim.NoroffAlumni.models.DTOs.userDTOs.UserDisplayDto;
import no.experisAcadmey.trondheim.NoroffAlumni.models.DTOs.userDTOs.UserDto;
import no.experisAcadmey.trondheim.NoroffAlumni.models.Event;
import no.experisAcadmey.trondheim.NoroffAlumni.models.User;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.Named;
import org.mapstruct.factory.Mappers;

import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;
import java.util.UUID;

@Mapper(componentModel = "spring", uses = {UserMapper.class})
public interface EventMapper {

    @Mapping(target = "participants", source = "participants", qualifiedByName = "userListToStringSet")
    EventDTO eventToEventDTO(Event event);

    @Mapping(target = "participants", source = "participants", qualifiedByName = "userListToStringSet")
    List<EventDTO> eventsToEventDTOs(List<Event> events);

    Event eventPostDTOToEvent(EventPostDTO eventPostDTO);

    @Named("userListToStringSet")
    default Set<String> userListToStringSet(List<User> users) {
        return users.stream().map(User::getId).collect(Collectors.toSet());
    }
}

