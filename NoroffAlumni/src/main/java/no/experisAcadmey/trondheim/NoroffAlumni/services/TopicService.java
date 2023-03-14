package no.experisAcadmey.trondheim.NoroffAlumni.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

import no.experisAcadmey.trondheim.NoroffAlumni.repositories.TopicRepository;
import no.experisAcadmey.trondheim.NoroffAlumni.models.Topic;

import org.springframework.data.crossstore.ChangeSetPersister.NotFoundException;

@Service
public class TopicService {
   

   @Autowired
   private TopicRepository topicRepoisitory;


   public List<Topic> getTopics(){
      //throw new NotFoundException();
      return new ArrayList<>();
   }
}
