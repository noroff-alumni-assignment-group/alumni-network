package no.experisAcadmey.trondheim.NoroffAlumni.services;

import java.util.List;
import java.util.Map;
import java.util.Objects;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.security.oauth2.jwt.JwtDecoder;
import org.springframework.stereotype.Service;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.client.RestTemplate;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;

import no.experisAcadmey.trondheim.NoroffAlumni.models.User;
import no.experisAcadmey.trondheim.NoroffAlumni.models.DTOs.authDTOs.KeycloakCredentials;
import no.experisAcadmey.trondheim.NoroffAlumni.models.DTOs.authDTOs.LoginRequest;
import no.experisAcadmey.trondheim.NoroffAlumni.models.DTOs.authDTOs.LoginResponse;
import no.experisAcadmey.trondheim.NoroffAlumni.models.DTOs.authDTOs.SignUpRequest;
import no.experisAcadmey.trondheim.NoroffAlumni.models.DTOs.authDTOs.SignoutResponse;
import no.experisAcadmey.trondheim.NoroffAlumni.models.DTOs.authDTOs.SignupKeycloakRequest;
import no.experisAcadmey.trondheim.NoroffAlumni.models.DTOs.authDTOs.TokenRequest;
import no.experisAcadmey.trondheim.NoroffAlumni.repositories.UserRepository;

@Service
public class AuthService {
   @Autowired
   private RestTemplate restTemplate;
   @Autowired
   private UserRepository userRepository;
   @Autowired
   private JwtDecoder jwtDecoder;
   @Autowired
   private UserService userService;

   @Value("${keycloak.base-url}")
   private String baseUrl;
   @Value("${keycloak.realm}")
   private String realm;
   @Value("${keycloak.client-id}")
   private String clientId;
   @Value("${keycloak.client-secret}")
   private String clientSecret;

   @Value("${keycloak.admin-username}")
   private String adminUsername;
   @Value("${keycloak.admin-password}")
   private String adminPassword;

   /**
    * Logs in a user and return tokens from keycloak server

    * @param loginRequest DTO containing password and username.
    * @return returns LoginResponse containing multiple tokens from keycloak server
    */
   public LoginResponse login(LoginRequest loginRequest) {
      HttpHeaders headers = new HttpHeaders();
      headers.setContentType(MediaType.APPLICATION_FORM_URLENCODED);

      MultiValueMap<String, String> map = new LinkedMultiValueMap<>();
      map.add("client_id", this.clientId);
      map.add("client_secret", this.clientSecret);
      map.add("grant_type", "password");
      map.add("username", loginRequest.getEmail());
      map.add("password", loginRequest.getPassword());

      HttpEntity<MultiValueMap<String, String>> httpEntity = new HttpEntity<>(map, headers);
      String loginUrl = this.baseUrl + "auth/realms/" + this.realm + "/protocol/openid-connect/token";
      ResponseEntity<LoginResponse> response = restTemplate.postForEntity(loginUrl, httpEntity, LoginResponse.class);
      Jwt jwt = jwtDecoder.decode(Objects.requireNonNull(response.getBody()).getAccess_token());

      if(!userRepository.existsById(jwt.getClaim("sub"))){
         userService.createFromJwt(jwt);
      }

      return response.getBody();
   }

   /**
    * Creates a new user from SignUpRequest-DTO

    * @param signUpRequest contains data for new users
    * @return Returns id of the new user
    * @throws JsonProcessingException
    */
   public String registerUser(SignUpRequest signUpRequest) throws JsonProcessingException {
      if(!signUpRequest.isValid()) throw new IllegalArgumentException("One or more fields are not valid");

      LoginResponse adminLogin = login(new LoginRequest(this.adminUsername, this.adminPassword));

      HttpHeaders headers = new HttpHeaders();
      headers.setContentType(MediaType.APPLICATION_JSON);
      headers.set("Authorization", "Bearer " + adminLogin.getAccess_token());

      SignupKeycloakRequest body = new SignupKeycloakRequest(
            signUpRequest.getEmail(),
            true,
            true,
            List.of(new KeycloakCredentials(
                  "password", signUpRequest.getPassword(),
                  false)),
            signUpRequest.getFirstName(),
            signUpRequest.getLastName());

      ObjectMapper mapper = new ObjectMapper();
      Map jsonBody = mapper.convertValue(body, Map.class);

      HttpEntity<Map> httpEntity = new HttpEntity<>(jsonBody, headers);
      String signupUrl = this.baseUrl + "auth/admin/realms/" + this.realm + "/users";
      ResponseEntity<String> registrationResponse = restTemplate.postForEntity(signupUrl, httpEntity, String.class);
      
      String newUserId = "";
      User newUser = new User();
      if(registrationResponse.getStatusCode() == HttpStatusCode.valueOf(201)){
         newUserId = (String)getKeycloakUser(adminLogin.getAccess_token(),signUpRequest.getEmail()).get("id");
         newUser.setId(newUserId);
         newUser.setEmail(signUpRequest.getEmail());
         newUser.setUsername(signUpRequest.getUsername() != null ? signUpRequest.getUsername(): signUpRequest.getEmail());
         newUser.setFirstName(signUpRequest.getFirstName());
         newUser.setLastName(signUpRequest.getLastName());
         userRepository.save(newUser);
      }

      return newUserId;
   }

   /**
    * Retrieves data from a given user

    * @param adminToken token to allow retrieving userData for different users.
    * @param email email of the user to find
    * @return Map containing userData
    */
   private Map<String,Object> getKeycloakUser(String adminToken,String email){
      HttpHeaders headers = new HttpHeaders();
      headers.set("Authorization", "Bearer " + adminToken);

      String searchUrl = this.baseUrl + "auth/admin/realms/" + this.realm + "/users?email="+email;
      ResponseEntity<List> response = restTemplate.exchange(searchUrl,HttpMethod.GET, new HttpEntity<>(headers), List.class);

      return (Map<String,Object>)(response.getBody().get(0));
   }

   /**
    * Signs a user out using refresh_token
    *
    * @param request TokenRequest containing refresh_token
    * @return message received on sign out.
    */
   public boolean signOut(TokenRequest request) {
      HttpHeaders headers = new HttpHeaders();
      headers.setContentType(MediaType.APPLICATION_FORM_URLENCODED);
  
      MultiValueMap<String, String> map = new LinkedMultiValueMap<>();
      map.add("client_id", this.clientId);
      map.add("client_secret", this.clientSecret);
      map.add("refresh_token", request.getToken());
  
      HttpEntity<MultiValueMap<String, String>> httpEntity = new HttpEntity<>(map, headers);
  
      var signOutUrl = baseUrl + "/auth/realms/" + realm + "/protocol/openid-connect/logout";
      var response = restTemplate.postForEntity(signOutUrl, httpEntity, SignoutResponse.class);
  
      return response.getStatusCode().is2xxSuccessful();
    }

    /**
     * Refreshes authentication token 
     * 
     * @param token refresh token to use for refresh
     * @return LoginResponse containing new access_token and refresh_token.
     */
    public LoginResponse refresh(TokenRequest token) {
      HttpHeaders headers = new HttpHeaders();
      headers.setContentType(MediaType.APPLICATION_FORM_URLENCODED);

      MultiValueMap<String, String> map = new LinkedMultiValueMap<>();
      map.add("client_id", this.clientId);
      map.add("client_secret", this.clientSecret);
      map.add("grant_type", "refresh_token");
      map.add("refresh_token", token.getToken());

      HttpEntity<MultiValueMap<String, String>> httpEntity = new HttpEntity<>(map, headers);
      String loginUrl = this.baseUrl + "auth/realms/" + this.realm + "/protocol/openid-connect/token";
      ResponseEntity<LoginResponse> response = restTemplate.postForEntity(loginUrl, httpEntity, LoginResponse.class);

      return response.getBody();
   }
  
}
