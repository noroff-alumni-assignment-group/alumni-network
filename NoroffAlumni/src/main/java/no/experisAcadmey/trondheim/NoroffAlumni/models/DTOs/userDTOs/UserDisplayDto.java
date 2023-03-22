package no.experisAcadmey.trondheim.NoroffAlumni.models.DTOs.userDTOs;

import jakarta.persistence.ManyToMany;
import lombok.Data;
import no.experisAcadmey.trondheim.NoroffAlumni.models.Topic;

import java.util.Set;

/**
 * Data transfer representation for User entity
 */
@Data
public class UserDisplayDto {

    private String id;
    private String username;
    private String email;
    private String firstName;
    private String lastName;
}
