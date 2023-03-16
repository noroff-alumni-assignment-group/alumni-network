package no.experisAcadmey.trondheim.NoroffAlumni.models.DTOs.authDTOs;

import lombok.AllArgsConstructor;
import lombok.Data;

/**
 * A class used to manage a login request.
 */
@Data
@AllArgsConstructor
public class LoginRequest {
   private String username;
   private String password;
}
