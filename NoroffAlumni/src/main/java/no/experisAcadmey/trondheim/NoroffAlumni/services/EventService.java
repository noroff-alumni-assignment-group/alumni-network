package no.experisAcadmey.trondheim.NoroffAlumni.services;

import no.experisAcadmey.trondheim.NoroffAlumni.exceptions.UserNotFoundException;
import no.experisAcadmey.trondheim.NoroffAlumni.repositories.UserRepository;
import org.springframework.stereotype.Service;

import java.util.*;

import no.experisAcadmey.trondheim.NoroffAlumni.exceptions.EventNotFoundException;
import no.experisAcadmey.trondheim.NoroffAlumni.models.Event;
import no.experisAcadmey.trondheim.NoroffAlumni.models.User;
import no.experisAcadmey.trondheim.NoroffAlumni.repositories.EventRepository;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;


@Service
public class EventService {

    private final EventRepository eventRepository;
    private final UserService userService;
    private final UserRepository userRepository;

    public EventService(EventRepository eventRepository, UserService userService, UserRepository userRepository) {
        this.eventRepository = eventRepository;
        this.userService = userService;
        this.userRepository = userRepository;
    }

    public List<Event> getAllEvents() {
        return eventRepository.findAll();
    }

    public Event getEventById(Long id) throws EventNotFoundException {
        Optional<Event> optionalEvent = eventRepository.findById(id);
        if (optionalEvent.isPresent()) {
            return optionalEvent.get();
        } else {
            throw new EventNotFoundException("Event not found with ID: " + id);
        }
    }

    public Event saveEvent(Event event) {
        return eventRepository.save(event);
    }

    public void joinEvent(Long eventId, UUID userId) throws UserNotFoundException, EventNotFoundException {
        Event event = getEventById(eventId);
        User user = userService.getUserById(userId);

        if (!event.getParticipants().contains(user)) {
            event.getParticipants().add(user);
            eventRepository.save(event);
        }
    }

    public List<Event> getEventsForUser(String userId) {
        User user = userRepository.findById(String.valueOf(UUID.fromString(userId))).orElseThrow(() -> new UserNotFoundException(userId));
        return new ArrayList<>(user.getEvents());
    }

}

