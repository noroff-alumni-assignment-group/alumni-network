package no.experisAcadmey.trondheim.NoroffAlumni.services;

import no.experisAcadmey.trondheim.NoroffAlumni.exceptions.UserNotFoundException;
import no.experisAcadmey.trondheim.NoroffAlumni.models.User;
import no.experisAcadmey.trondheim.NoroffAlumni.repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.stereotype.Service;
import org.webjars.NotFoundException;

import java.util.*;

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
        return userRepository.findById(auth.getName()).orElseThrow(() -> new UserNotFoundException(""));
    }

    /**
     * Retrieves a user identified by its name
     * @param id Id of user
     * @return User identified by the provided Id
     */
    public User getUser(String id){
        return userRepository.findById(id).orElseThrow(() -> new UserNotFoundException(""));
    }

    public List<User> getUsers(String searchWord) {
        Set<User> users = new HashSet<>();
        users.addAll(userRepository.findByFirstNameContainingIgnoreCase(searchWord));
        users.addAll(userRepository.findByLastNameContainingIgnoreCase(searchWord));
        return users.stream().toList();
    }

    public Optional<User> findUserByName(String username) {
        return userRepository.findByUsername(username);
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

    public Optional<User> findUserById(String id) {
        return userRepository.findById(String.valueOf(id));
    }

    public User updateUser(String userId, User updatedUser) {
        Optional<User> userOptional = userRepository.findById(String.valueOf(userId));

        if (userOptional.isPresent()) {
            User existingUser = userOptional.get();
            existingUser.setBiography(updatedUser.getBiography());
            existingUser.setFunfact(updatedUser.getFunfact());
            existingUser.setTitle(updatedUser.getTitle());
            // Update other fields as needed

            return userRepository.save(existingUser);
        } else {
            throw new NotFoundException("User not found");
        }
    }

    public User getUserById(UUID userId) {
        return userRepository.findById(userId.toString())
                .orElseThrow(() -> new UserNotFoundException("User with ID " + userId + " not found."));
    }


}
