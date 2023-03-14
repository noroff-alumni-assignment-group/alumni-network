package no.experisAcadmey.trondheim.NoroffAlumni.controllers;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.crossstore.ChangeSetPersister.NotFoundException;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import no.experisAcadmey.trondheim.NoroffAlumni.services.TopicService;

@RestController
@RequestMapping(path = "api/v1/topic")
public class TopicController {

   @Autowired
   private TopicService topicService;

   @GetMapping
   public ResponseEntity getTopics(@RequestParam("search") Optional<String> searchWord,@RequestParam("page") Optional<Integer> page, @RequestParam("limit")Optional<Integer> limit){
      try{
         return ResponseEntity.ok(topicService.getTopics());
      }
      // catch(NotFoundException e){
      //    return ResponseEntity.notFound().build();
      // }
      catch(Exception e){
         return ResponseEntity.badRequest().build();
      }
   }
   
}
