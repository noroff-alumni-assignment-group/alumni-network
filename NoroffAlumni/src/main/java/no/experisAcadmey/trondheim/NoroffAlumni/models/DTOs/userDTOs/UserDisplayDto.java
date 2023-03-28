package no.experisAcadmey.trondheim.NoroffAlumni.models.DTOs.userDTOs;

import jakarta.persistence.ManyToMany;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;
import no.experisAcadmey.trondheim.NoroffAlumni.models.Topic;

import java.util.Set;

/**
 * Data transfer representation for User entity
 */
@Data
@AllArgsConstructor
public class UserDisplayDto {
    private String id;
    private String username;
    private String email;
    private String firstName;
    private String lastName;
    private String title;
    private String biography;
    private String funfact;

}
