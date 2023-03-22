package no.experisAcadmey.trondheim.NoroffAlumni.services;

import no.experisAcadmey.trondheim.NoroffAlumni.exceptions.UserNotFoundException;
import no.experisAcadmey.trondheim.NoroffAlumni.models.User;
import no.experisAcadmey.trondheim.NoroffAlumni.repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.stereotype.Service;

import java.util.HashSet;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    /**
     * Retrieves the current authenticated
     * user from the security context
     *
     * @return currently authenticated user.
     */
    public User getCurrentUser(){
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        return userRepository.findById(auth.getName()).orElseThrow(UserNotFoundException::new);
    }

    public User getUser(String name){
        return userRepository.findById(name).orElseThrow(UserNotFoundException::new);
    }

    /**
     * Creates user based on the jwt-token data.
     *
     * @param jwt jwt token to create the user from.
     */
    public void createFromJwt(Jwt jwt){
        User user = new User();
        user.setId(jwt.getClaim("sub"));
        user.setEmail(jwt.getClaim("email"));
        user.setUsername(jwt.getClaim("preferred_username"));
        user.setTopics(new HashSet<>());
        user.setFirstName(jwt.getClaim("given_name"));
        user.setLastName(jwt.getClaim("family_name"));
        userRepository.save(user);
    }
}
