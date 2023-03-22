package no.experisAcadmey.trondheim.NoroffAlumni.controllers;

import java.net.URI;
import java.util.Optional;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.ArraySchema;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import no.experisAcadmey.trondheim.NoroffAlumni.exceptions.TopicExistException;
import no.experisAcadmey.trondheim.NoroffAlumni.exceptions.TopicNotFoundException;
import no.experisAcadmey.trondheim.NoroffAlumni.mappers.TopicMapper;
import no.experisAcadmey.trondheim.NoroffAlumni.models.DTOs.topicDTOs.NewTopic;
import no.experisAcadmey.trondheim.NoroffAlumni.models.DTOs.topicDTOs.TopicDto;
import no.experisAcadmey.trondheim.NoroffAlumni.models.DTOs.topicDTOs.TopicListItem;
import org.mapstruct.factory.Mappers;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ProblemDetail;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import no.experisAcadmey.trondheim.NoroffAlumni.services.TopicService;

@RestController
@RequestMapping(path = "/api/v1/topic")
public class TopicController {

    @Autowired
    private TopicService topicService;
    private TopicMapper topicMapper = Mappers.getMapper(TopicMapper.class);

    @GetMapping
    @PreAuthorize("hasRole('ROLE_ALUMNI')")
    @Operation(summary = "Retrieve a page of topics, optionally with parameters such as search, page and page-size")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Success", content = {
                    @Content(mediaType = "application/json", array = @ArraySchema(schema = @Schema(implementation = TopicListItem.class)))
            }),
            @ApiResponse(responseCode = "400", description = "Bad Request", content = {
                    @Content(mediaType = "application/json", schema = @Schema(implementation = ProblemDetail.class))
            }),
            @ApiResponse(responseCode = "404", description = "Topic Not Found", content = {
                    @Content(mediaType = "application/json", schema = @Schema(implementation = ProblemDetail.class))
            }),
    })
    public ResponseEntity getTopics(@RequestParam("search") Optional<String> searchWord,
                                    @RequestParam("page") Optional<Integer> page,
                                    @RequestParam("pageSize") Optional<Integer> pageSize) {
        try {
            return ResponseEntity.ok(topicMapper.topicToTopicListItem(topicService.getTopics(searchWord, page, pageSize)));
        } catch (TopicNotFoundException e) {
            return ResponseEntity.notFound().build();
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Request not valid");
        }
    }

    @GetMapping("/subscribed")
    @PreAuthorize("hasRole('ROLE_ALUMNI')")
    @Operation(summary = "Retrieve all topics that the current user is subscribed to")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Success", content = {
                    @Content(mediaType = "application/json", array = @ArraySchema(schema = @Schema(implementation = TopicListItem.class)))
            }),
            @ApiResponse(responseCode = "400", description = "Bad Request", content = {
                    @Content(mediaType = "application/json", schema = @Schema(implementation = ProblemDetail.class))
            }),
            @ApiResponse(responseCode = "404", description = "Topic Not Found", content = {
                    @Content(mediaType = "application/json", schema = @Schema(implementation = ProblemDetail.class))
            }),
    })
    public ResponseEntity getSubscribedTopics() {
        try {
            return ResponseEntity.ok(topicMapper.topicToTopicListItem(topicService.getSubscribedTopics()));
        } catch (TopicNotFoundException e) {
            return ResponseEntity.notFound().build();
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Request not valid");
        }
    }

    @GetMapping("/{topic_id}")
    @PreAuthorize("hasRole('ROLE_ALUMNI')")
    @Operation(summary = "Retrieve a Topic based on a specific id")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Success", content = {
                    @Content(mediaType = "application/json", schema = @Schema(implementation = TopicDto.class))
            }),
            @ApiResponse(responseCode = "400", description = "Bad Request", content = {
                    @Content(mediaType = "application/json", schema = @Schema(implementation = ProblemDetail.class))
            }),
            @ApiResponse(responseCode = "404", description = "Topic Not Found", content = {
                    @Content(mediaType = "application/json", schema = @Schema(implementation = ProblemDetail.class))
            }),
    })
    public ResponseEntity getTopic(@PathVariable("topic_id") Long topicId){
        try{
            return ResponseEntity.ok(topicMapper.topicToTopicDto(topicService.getTopic(topicId)));
        }catch (TopicNotFoundException e){
            return ResponseEntity.notFound().build();
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Request not valid");
        }
    }

    @PostMapping
    @PreAuthorize("hasRole('ROLE_ALUMNI')")
    @Operation(summary = "Create a new topic with name and description")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "201", description = "Created", content = {
                    @Content(mediaType = "application/json", schema = @Schema(implementation = URI.class))
            }),
            @ApiResponse(responseCode = "400", description = "Bad Request", content = {
                    @Content(mediaType = "application/json", schema = @Schema(implementation = ProblemDetail.class))
            }),
            @ApiResponse(responseCode = "409", description = "Topic Already Exists", content = {
                    @Content(mediaType = "application/json", schema = @Schema(implementation = ProblemDetail.class))
            }),
    })
    public ResponseEntity createTopic(@RequestBody NewTopic newTopic){
        try{
            return ResponseEntity.created(URI.create("/api/v1/topic/"+topicService.createTopic(newTopic))).build();
        }catch(TopicExistException e){
            return ResponseEntity.status(409).build();
        }catch(Exception e){
            return ResponseEntity.badRequest().build();
        }
    }

    @PostMapping("/{topic_id}/join")
    @PreAuthorize("hasRole('ROLE_ALUMNI')")
    @Operation(summary = "Create a new topic with name and description")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Success", content = {
                    @Content(mediaType = "application/json")
            }),
            @ApiResponse(responseCode = "400", description = "Bad Request", content = {
                    @Content(mediaType = "application/json", schema = @Schema(implementation = ProblemDetail.class))
            }),
            @ApiResponse(responseCode = "404", description = "Topic Not Found", content = {
                    @Content(mediaType = "application/json", schema = @Schema(implementation = ProblemDetail.class))
            }),
    })
    public ResponseEntity subscribeToTopic(@PathVariable("topic_id") Long topicId){
        try{

            return ResponseEntity.ok(topicMapper.topicToTopicListItem(topicService.joinTopic(topicId)));
        }catch (TopicNotFoundException e){
            return ResponseEntity.notFound().build();
        } catch(Exception e){
            return ResponseEntity.badRequest().build();
        }
    }

}
