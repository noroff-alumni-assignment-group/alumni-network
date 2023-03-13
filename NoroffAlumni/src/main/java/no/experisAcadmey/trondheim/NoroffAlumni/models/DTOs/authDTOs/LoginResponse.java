package no.experisAcadmey.trondheim.NoroffAlumni.models.DTOs.authDTOs;

import lombok.Data;

/**
 * A class to manage login response.
 */
@Data
public class LoginResponse {
   private String access_token;
   private String refresh_token;
   private String expires_in;
   private String refresh_expires_in;
   private String token_type;
}
