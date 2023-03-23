package no.experisAcadmey.trondheim.NoroffAlumni.models;

import java.util.Set;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToMany;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

/**
 * Entity model for users.
 */
@Entity(name = "users")
@Getter
@Setter
@NoArgsConstructor
public class User {
   @Id
   private String id;
   @Column(unique = true)
   private String username;
   @Column(unique = true)
   private String email;
   private String firstName;
   private String lastName;
   private String title; // New field
   private String biography; // New field
   private String funfact; // New field
   @ManyToMany(mappedBy = "subscribers")
   private Set<Topic> topics;

}
