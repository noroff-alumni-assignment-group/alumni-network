package no.experisAcadmey.trondheim.NoroffAlumni.controllers;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.ArraySchema;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import no.experisAcadmey.trondheim.NoroffAlumni.exceptions.EventNotFoundException;
import no.experisAcadmey.trondheim.NoroffAlumni.exceptions.UserNotFoundException;
import no.experisAcadmey.trondheim.NoroffAlumni.mappers.EventMapper;
import no.experisAcadmey.trondheim.NoroffAlumni.mappers.UserMapper;
import no.experisAcadmey.trondheim.NoroffAlumni.models.DTOs.eventDTOs.EventDTO;
import no.experisAcadmey.trondheim.NoroffAlumni.models.DTOs.eventDTOs.EventPostDTO;
import no.experisAcadmey.trondheim.NoroffAlumni.models.DTOs.userDTOs.UserDisplayDto;
import no.experisAcadmey.trondheim.NoroffAlumni.models.DTOs.userDTOs.UserDto;
import no.experisAcadmey.trondheim.NoroffAlumni.models.Event;
import no.experisAcadmey.trondheim.NoroffAlumni.models.User;
import no.experisAcadmey.trondheim.NoroffAlumni.services.EventService;
import org.mapstruct.factory.Mappers;
import org.springframework.http.HttpStatus;
import org.springframework.http.ProblemDetail;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@RestController
@RequestMapping(path = "api/v1/event")
public class EventController {

    private final EventService eventService;

    private final EventMapper eventMapper = Mappers.getMapper(EventMapper.class);
    private final UserMapper userMapper = Mappers.getMapper(UserMapper.class);

    public EventController(EventService eventService) {
        this.eventService = eventService;
    }

    @GetMapping
    @PreAuthorize("hasRole('ROLE_ALUMNI')")
    @Operation(summary = "Find all events")
    @ApiResponses(value = {
            @ApiResponse(
                    responseCode = "200",
                    description = "Success",
                    content = { @Content(mediaType = "application/json",
                            array = @ArraySchema(schema = @Schema(implementation = EventDTO.class)))
                    }
            ),
            @ApiResponse(
                    responseCode = "400",
                    description = "Bad request",
                    content = { @Content(mediaType = "application/json",
                            schema = @Schema(implementation = ProblemDetail.class))
                    }
            )
    })
    public ResponseEntity<List<EventDTO>> getAllEvents() {
        List<Event> events = eventService.getAllEvents();
        List<EventDTO> eventDTOs = eventMapper.eventsToEventDTOs(events);
        return ResponseEntity.ok(eventDTOs);
    }


    @GetMapping("/{id}")
    @PreAuthorize("hasRole('ROLE_ALUMNI')")
    @Operation(summary = "Find an event by ID")
    @ApiResponses(value = {
            @ApiResponse(
                    responseCode = "200",
                    description = "Success",
                    content = { @Content(mediaType = "application/json",
                            array = @ArraySchema(schema = @Schema(implementation = EventDTO.class)))
                    }
            ),
            @ApiResponse(
                    responseCode = "400",
                    description = "Bad Request",
                    content = { @Content(mediaType = "application/json",
                            schema = @Schema(implementation = ProblemDetail.class))
                    }
            ),
            @ApiResponse(
                    responseCode = "403",
                    description = "Forbidden",
                    content = { @Content(mediaType = "application/json",
                            schema = @Schema(implementation = ProblemDetail.class))
                    }
            ),
            @ApiResponse(
                    responseCode = "404",
                    description = "Event not Found",
                    content = { @Content(mediaType = "application/json",
                            schema = @Schema(implementation = ProblemDetail.class))
                    }
            )
    })
    public ResponseEntity<EventDTO> getEventById(@PathVariable Long id) {
        try {
            Event event = eventService.getEventById(id);
            EventDTO eventDTO = eventMapper.eventToEventDTO(event);
            return ResponseEntity.ok(eventDTO);
        } catch (EventNotFoundException e) {
            return ResponseEntity.notFound().build();
        } catch (Exception e) {
            return ResponseEntity.badRequest().build();
        }
    }

    @PostMapping
    @PreAuthorize("hasRole('ROLE_ALUMNI')")
    @Operation(summary = "Create a new event")
    @ApiResponses(value = {
            @ApiResponse(
                    responseCode = "201",
                    description = "Created",
                    content = @Content
            ),
            @ApiResponse(
                    responseCode = "400",
                    description = "Bad Request",
                    content = { @Content(mediaType = "application/json",
                            schema = @Schema(implementation = ProblemDetail.class))
                    }
            )
    })
    public ResponseEntity createEvent(@RequestBody EventPostDTO eventPostDTO) {
        try {
            Event event = eventMapper.eventPostDTOToEvent(eventPostDTO);
            event.setTheme(eventPostDTO.getTheme());
            Event savedEvent = eventService.saveEvent(event);
            URI location = URI.create("/api/v1/event/" + savedEvent.getId());
            return ResponseEntity.created(location).build();
        } catch (Exception e) {
            return ResponseEntity.badRequest().build();
        }
    }

    @PostMapping("/{id}/join")
    @PreAuthorize("hasRole('ROLE_ALUMNI')")
    @Operation(summary = "Join an event")
    @ApiResponses(value = {
            @ApiResponse(
                    responseCode = "200",
                    description = "Joined",
                    content = @Content
            ),
            @ApiResponse(
                    responseCode = "400",
                    description = "Bad Request",
                    content = {@Content(mediaType = "application/json",
                            schema = @Schema(implementation = ProblemDetail.class))
                    }
            )
    })
    public ResponseEntity joinEvent(@PathVariable Long id, @RequestParam UUID userId) {
        try {
            eventService.joinEvent(id, userId);
            return ResponseEntity.ok().build();
        } catch (Exception e) {
            return ResponseEntity.badRequest().build();
        }
    }

    @GetMapping("/user/{userId}")
    @PreAuthorize("hasRole('ROLE_ALUMNI')")
    @Operation(summary = "Find all events for a specific user")
    @ApiResponses(value = {
            @ApiResponse(
                    responseCode = "200",
                    description = "Success",
                    content = { @Content(mediaType = "application/json",
                            array = @ArraySchema(schema = @Schema(implementation = EventDTO.class)))
                    }
            ),
            @ApiResponse(
                    responseCode = "400",
                    description = "Bad request",
                    content = { @Content(mediaType = "application/json",
                            schema = @Schema(implementation = ProblemDetail.class))
                    }
            ),
            @ApiResponse(
                    responseCode = "404",
                    description = "User not Found",
                    content = { @Content(mediaType = "application/json",
                            schema = @Schema(implementation = ProblemDetail.class))
                    }
            )
    })
    public ResponseEntity<List<EventDTO>> getEventsForUser(@PathVariable String userId) {
        try {
            List<Event> events = eventService.getEventsForUser(userId);
            List<EventDTO> eventDTOs = eventMapper.eventsToEventDTOs(events);
            return ResponseEntity.ok(eventDTOs);
        } catch (UserNotFoundException e) {
            return ResponseEntity.notFound().build();
        } catch (Exception e) {
            return ResponseEntity.badRequest().build();
        }
    }




}



