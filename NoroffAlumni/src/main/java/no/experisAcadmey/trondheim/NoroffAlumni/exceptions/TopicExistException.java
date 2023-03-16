package no.experisAcadmey.trondheim.NoroffAlumni.exceptions;

import javax.management.InstanceAlreadyExistsException;


/**
 * Exception used for when a Topic already exist
 * when trying to create a new one.
 */
public class TopicExistException extends InstanceAlreadyExistsException {
    public  TopicExistException(){
        super("Topic already exists");
    }
}
