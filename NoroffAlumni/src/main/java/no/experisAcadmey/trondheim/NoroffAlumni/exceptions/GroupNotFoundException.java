package no.experisAcadmey.trondheim.NoroffAlumni.exceptions;

import jakarta.persistence.EntityNotFoundException;

public class GroupNotFoundException extends EntityNotFoundException {

    public GroupNotFoundException() {
        super("The group was not found");
    }
}
