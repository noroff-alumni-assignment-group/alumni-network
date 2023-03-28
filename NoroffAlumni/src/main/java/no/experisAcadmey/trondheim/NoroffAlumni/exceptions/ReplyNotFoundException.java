package no.experisAcadmey.trondheim.NoroffAlumni.exceptions;

import jakarta.persistence.EntityNotFoundException;

public class ReplyNotFoundException extends EntityNotFoundException {
    public ReplyNotFoundException(){ super("Reply not found"); }
}
