package no.experisAcadmey.trondheim.NoroffAlumni.exceptions;

import jakarta.persistence.EntityNotFoundException;

import java.util.Optional;

/**
 * Exception thrown when searching for a topic that does not exist
 */
public class TopicNotFoundException extends EntityNotFoundException {

    public TopicNotFoundException() {
            super("Topic not found");
    }
    public TopicNotFoundException(Optional<String> searchText) {
        super("Topic was not found for this search: " + searchText);
    }
    public TopicNotFoundException(String searchText) {
        super("Topic was not found for this search: " + searchText);
    }
}
