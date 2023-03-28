package no.experisAcadmey.trondheim.NoroffAlumni.exceptions;

import jakarta.persistence.EntityNotFoundException;

/**
 * Exception thrown when a user is not
 * found in a search.
 */
public class UserNotFoundException extends EntityNotFoundException {

    public UserNotFoundException(String s) {
        super("User not found");
    }
}
