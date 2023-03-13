package no.experisAcadmey.trondheim.NoroffAlumni.models.DTOs.authDTOs;

import java.util.regex.Pattern;

import lombok.Data;

/**
 * A class to manage Sign up request data.
 */
@Data
public class SignUpRequest {
   private String email;
   private String username;
   private String password;
   private String firstName;
   private String lastName;

   /**
    * Checks if the SignUpRequest data is valid.
    * @return boolean based on if the sign up data is valid or not.
    */
   public boolean isValid(){
      return this.email != null && validEmail() && this.password != null && this.firstName != null && this.lastName != null;
   }

   /**
    * Validates the email of the SignUpRequest.
    * @return boolean based on if the email is valid or not.
    */
   private boolean validEmail(){
      String regexPattern = "^(?=.{1,64}@)[A-Za-z0-9_-]+(\\.[A-Za-z0-9_-]+)*@" 
      + "[^-][A-Za-z0-9-]+(\\.[A-Za-z0-9-]+)*(\\.[A-Za-z]{2,})$";
      Pattern emailPattern = Pattern.compile(regexPattern);
      return emailPattern.matcher(this.email).matches();
   }
}
