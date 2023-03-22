package no.experisAcadmey.trondheim.NoroffAlumni.exceptions;

import jakarta.persistence.EntityNotFoundException;

public class PostNotFoundException extends EntityNotFoundException {
    public PostNotFoundException(){ super("Post not found"); }
}
