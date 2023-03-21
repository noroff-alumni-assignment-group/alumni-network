package no.experisAcadmey.trondheim.NoroffAlumni.models.DTOs.authDTOs;

import java.util.List;

import lombok.AllArgsConstructor;
import lombok.Data;

/**
 * A class to manage signup data for keycloak signup request. 
 */
@Data
@AllArgsConstructor
public class SignupKeycloakRequest {

  private String username;
  private String email;
  private boolean enabled;
  private boolean emailVerified;
  private List<KeycloakCredentials> credentials;
  private String firstName;
  private String lastName;
}
