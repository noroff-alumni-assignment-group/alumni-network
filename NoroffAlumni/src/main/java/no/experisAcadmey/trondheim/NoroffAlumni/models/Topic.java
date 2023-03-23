package no.experisAcadmey.trondheim.NoroffAlumni.models;

import java.util.ArrayList;
import java.util.List;
import java.util.Set;

import jakarta.persistence.Basic;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.JoinTable;
import jakarta.persistence.ManyToMany;
import lombok.Data;

@Entity
@Data
public class Topic {

   @Id
   @GeneratedValue(strategy = GenerationType.IDENTITY)
   private Long id;
   private String name;
   private String description;
   @ManyToMany
   @JoinTable(name = "topic_subscriptions", joinColumns = @JoinColumn(name = "topic_id"), inverseJoinColumns = @JoinColumn(name = "user_id"))
   private Set<User> subscribers;
   @ManyToMany(mappedBy = "targetTopics")
   private List<Post> posts;

   public Topic addSubscriber(User user){
      subscribers.add(user);
      return this;
   }
}
