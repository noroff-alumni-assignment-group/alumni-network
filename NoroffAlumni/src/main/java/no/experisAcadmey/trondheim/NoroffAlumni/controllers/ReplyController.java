package no.experisAcadmey.trondheim.NoroffAlumni.controllers;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import no.experisAcadmey.trondheim.NoroffAlumni.exceptions.ReplyNotFoundException;
import no.experisAcadmey.trondheim.NoroffAlumni.mappers.ReplyMapper;
import no.experisAcadmey.trondheim.NoroffAlumni.models.DTOs.postDTOs.PostDto;
import no.experisAcadmey.trondheim.NoroffAlumni.models.DTOs.replyDTOs.NewReplyDto;
import no.experisAcadmey.trondheim.NoroffAlumni.models.DTOs.replyDTOs.ReplyDto;
import no.experisAcadmey.trondheim.NoroffAlumni.services.ReplyService;
import org.mapstruct.factory.Mappers;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ProblemDetail;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.net.URI;

@RestController
@RequestMapping(path = "/api/v1/reply")
public class ReplyController {

    @Autowired
    private ReplyService replyService;
    @Autowired
    private ReplyMapper replyMapper = Mappers.getMapper(ReplyMapper.class);


    @GetMapping("/{reply_id}")
    @PreAuthorize("hasRole('ROLE_ALUMNI')")
    @Operation(summary = "Retrieve a specific reply by id")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "success", content = {
                    @Content(mediaType = "application/json", schema = @Schema(implementation = ReplyDto.class))
            }),
            @ApiResponse(responseCode = "400", description = "Bad Request", content = {
                    @Content(mediaType = "application/json", schema = @Schema(implementation = ProblemDetail.class))
            }),
            @ApiResponse(responseCode = "404", description = "Post Not Found", content = {
                    @Content(mediaType = "application/json", schema = @Schema(implementation = ProblemDetail.class))
            }),
    })
    public ResponseEntity getReply(@PathVariable("reply_id") Long replyId) {
        try {
            return ResponseEntity.ok(replyMapper.toReplyDto(replyService.getReply(replyId)));
        } catch (ReplyNotFoundException e) {
            return ResponseEntity.notFound().build();
        } catch (Exception e) {
            return ResponseEntity.badRequest().build();
        }
    }

    @PostMapping
    @PreAuthorize("hasRole('ROLE_ALUMNI')")
    @Operation(summary = "Create a new reply for a given post")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "201", description = "Created", content = {
                    @Content(mediaType = "application/json", schema = @Schema(implementation = URI.class))
            }),
            @ApiResponse(responseCode = "400", description = "Bad Request", content = {
                    @Content(mediaType = "application/json", schema = @Schema(implementation = ProblemDetail.class))
            })
    })
    public ResponseEntity createReply(@RequestParam Long postId, @RequestBody NewReplyDto newReplyDto){
        try {
            Long id = replyService.createReply(newReplyDto, postId);
            return ResponseEntity.created(URI.create("/api/v1/reply/" + id)).body(id);
        } catch (Exception e) {
            return ResponseEntity.badRequest().build();
        }
    }
}
