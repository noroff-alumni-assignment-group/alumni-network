package no.experisAcadmey.trondheim.NoroffAlumni.services;

import no.experisAcadmey.trondheim.NoroffAlumni.exceptions.UserNotFoundException;
import no.experisAcadmey.trondheim.NoroffAlumni.models.User;
import no.experisAcadmey.trondheim.NoroffAlumni.repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

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

    /**
     * Retrieves a user identified by its name
     * @param id Id of user
     * @return User identified by the provided Id
     */
    public User getUser(String id){
        return userRepository.findById(id).orElseThrow(UserNotFoundException::new);
    }

    public List<User> getUsers(String searchWord) {
        Set<User> users = new HashSet<>();
        users.addAll(userRepository.findByFirstNameContainingIgnoreCase(searchWord));
        users.addAll(userRepository.findByLastNameContainingIgnoreCase(searchWord));
        return users.stream().toList();
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
