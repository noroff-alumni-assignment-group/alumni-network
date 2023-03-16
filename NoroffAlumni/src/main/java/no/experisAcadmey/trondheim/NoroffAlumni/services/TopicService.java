package no.experisAcadmey.trondheim.NoroffAlumni.services;
import no.experisAcadmey.trondheim.NoroffAlumni.exceptions.TopicExistException;
import no.experisAcadmey.trondheim.NoroffAlumni.models.DTOs.topicDTOs.NewTopic;
import org.springframework.data.domain.Pageable;

import no.experisAcadmey.trondheim.NoroffAlumni.exceptions.TopicNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.util.*;

import no.experisAcadmey.trondheim.NoroffAlumni.repositories.TopicRepository;
import no.experisAcadmey.trondheim.NoroffAlumni.models.Topic;


@Service
public class TopicService {
   

   @Autowired
   private TopicRepository topicRepository;
   @Autowired
   private UserService userService;


   /**
    * Retrieves a list of Topics with the possibility
    * of search, and pagination
    * @param searchWord word to search for
    * @param page page number
    * @param pageSize page size
    * @return list of topics
    */
   public List<Topic> getTopics(Optional<String> searchWord, Optional<Integer> page, Optional<Integer> pageSize){
      List<Topic> foundTopics = new ArrayList<>();
      if(searchWord.isPresent() && page.isPresent() && pageSize.isPresent()){
         Pageable pageRequest = PageRequest.of(page.get(), pageSize.get(), Sort.by("name").ascending());
         foundTopics = topicRepository.findByNameContainingIgnoreCase(searchWord.get(),pageRequest).toList();
      }else if(searchWord.isPresent()){
         foundTopics = topicRepository.findByNameContainingIgnoreCase(searchWord.get());
      }else {
         Pageable pageRequest = PageRequest.of(page.orElse(0), pageSize.orElse(10), Sort.by("name").ascending());
         foundTopics = topicRepository.findAll(pageRequest).toList();
      }

      if(foundTopics.size() == 0) throw new TopicNotFoundException(searchWord);

      //throw new NotFoundException();
      return foundTopics;
   }

   /**
    * Retrieves a specific topic based on Id
    *
    * @param topicId id of the topic to find
    * @return found topic
    */
   public Topic getTopic(Long topicId){
      return topicRepository.findById(topicId).orElseThrow(TopicNotFoundException::new);
   }

   /**
    * Creates a new Topic.
    *
    * @param newTopic data of the new topic.
    * @return id of the new topic.
    * @throws TopicExistException thrown if the topic already exists.
    */
   public Long createTopic(NewTopic newTopic) throws TopicExistException {
      if(topicRepository.findByName(newTopic.getName()).isPresent()) throw new TopicExistException();

      Topic topic = new Topic();
      topic.setName(newTopic.getName());
      topic.setDescription(newTopic.getDescription());
      topic.setSubscribers(Set.of(userService.getCurrentUser()));
      topic.setPosts(new HashSet<>());

      topicRepository.save(topic);

      return topic.getId();
   }

   /**
    * Join topic based on current user and topic id.
    * @param topicId id of the topic to join.
    */
   public void joinTopic(Long topicId){
      Topic topic = topicRepository.findById(topicId).orElseThrow(TopicNotFoundException::new);
      topic.addSubscriber(userService.getCurrentUser());
      topicRepository.save(topic);
   }
}
