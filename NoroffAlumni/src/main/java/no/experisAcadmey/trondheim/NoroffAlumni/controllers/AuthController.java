package no.experisAcadmey.trondheim.NoroffAlumni.controllers;

import javax.management.InvalidAttributeValueException;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.client.HttpClientErrorException;
import org.springframework.http.ProblemDetail;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import no.experisAcadmey.trondheim.NoroffAlumni.models.DTOs.authDTOs.LoginRequest;
import no.experisAcadmey.trondheim.NoroffAlumni.models.DTOs.authDTOs.LoginResponse;
import no.experisAcadmey.trondheim.NoroffAlumni.models.DTOs.authDTOs.SignUpRequest;
import no.experisAcadmey.trondheim.NoroffAlumni.models.DTOs.authDTOs.SignoutResponse;
import no.experisAcadmey.trondheim.NoroffAlumni.models.DTOs.authDTOs.TokenRequest;
import no.experisAcadmey.trondheim.NoroffAlumni.services.AuthService;
import java.net.URI;

/**
 * Controller for all endpoints relating to authentication and registration of new user.
 */
@RestController
@RequestMapping(path = "/api/v1/authenticate")
public class AuthController {

   private Logger logger = LoggerFactory.getLogger(AuthController.class);
   
   @Autowired
   private AuthService authService;


   @PostMapping
   @Operation(summary="Login to keycloak and retrieve accsess_token")
   @ApiResponses(value={
      @ApiResponse(responseCode = "200",description = "Success",content={
         @Content(mediaType="application/json", schema=@Schema(implementation=LoginResponse.class))
      }),
      @ApiResponse(responseCode = "400",description = "Bad Request",content={
         @Content(mediaType="application/json", schema=@Schema(implementation=ProblemDetail.class))
      }),
   })
   public ResponseEntity login(@RequestBody LoginRequest loginRequest){
      try{
         return ResponseEntity.ok(authService.login(loginRequest));
      }catch(Exception e){
         return ResponseEntity.badRequest().build();
      }
   }

   @PostMapping(path = "/refresh")
   @Operation(summary="Refresh access_token using refresh_token")
   @ApiResponses(value={
      @ApiResponse(responseCode = "200",description = "Success",content={
         @Content(mediaType="application/json", schema=@Schema(implementation=LoginResponse.class))
      }),
      @ApiResponse(responseCode = "400",description = "Bad Request",content={
         @Content(mediaType="application/json", schema=@Schema(implementation=ProblemDetail.class))
      }),
   })
   public ResponseEntity refreshToken(@RequestBody TokenRequest token){
      try{
         return ResponseEntity.ok(authService.refresh(token));
      }catch(Exception e){
         return ResponseEntity.badRequest().build();
      }
   }

   @PostMapping(path = "/register")
   @Operation(summary="Register users")
   @ApiResponses(value={
      @ApiResponse(responseCode = "200",description = "Success",content={
         @Content(mediaType="application/json", schema=@Schema(implementation=URI.class))
      }),
      @ApiResponse(responseCode = "400",description = "Bad Request",content={
         @Content(mediaType="application/json", schema=@Schema(implementation=ProblemDetail.class))
      }),
      @ApiResponse(responseCode = "409",description = "Conflict",content={
         @Content(mediaType="application/json", schema=@Schema(implementation=ProblemDetail.class))
      }),
      @ApiResponse(responseCode = "500",description = "Internal Server Error",content={
         @Content(mediaType="application/json", schema=@Schema(implementation=ProblemDetail.class))
      })
   })
   public ResponseEntity signup(@RequestBody SignUpRequest signUpRequest){
      try{
         return ResponseEntity.created(URI.create("api/v1/users/"+authService.registerUser(signUpRequest))).build();
      }catch(HttpClientErrorException e){
         logger.error(e.getMessage());
         return ResponseEntity.status(e.getStatusCode()).build();
      }catch(IllegalArgumentException e){
         logger.error(e.getMessage());
         return ResponseEntity.badRequest().body(e.getMessage());
      }catch(Exception e){
         logger.error(e.getMessage());
         return ResponseEntity.internalServerError().build();
      }
   }

   @PostMapping(path = "/signout")
   @Operation(summary="Refresh access_token using refresh_token")
   @ApiResponses(value={
      @ApiResponse(responseCode = "200",description = "Success",content={
         @Content(mediaType="application/json", schema=@Schema(implementation=SignoutResponse.class))
      }),
      @ApiResponse(responseCode = "400",description = "Bad Request",content={
         @Content(mediaType="application/json", schema=@Schema(implementation=ProblemDetail.class))
      }),
   })
   public ResponseEntity signout(@RequestBody TokenRequest tokenRequest){
      try{
         return ResponseEntity.ok(authService.signOut(tokenRequest));
      }catch(Exception e){
         return ResponseEntity.badRequest().body("Logout unavailable");
      }
   }
}
