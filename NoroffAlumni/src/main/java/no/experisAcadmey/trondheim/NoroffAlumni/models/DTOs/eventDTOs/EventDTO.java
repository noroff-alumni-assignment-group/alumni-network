package no.experisAcadmey.trondheim.NoroffAlumni.models.DTOs.eventDTOs;

import lombok.Data;
import no.experisAcadmey.trondheim.NoroffAlumni.models.User;

import java.util.Set;

@Data
public class EventDTO {
    private Long id;
    private String createdBy;
    private String groupId;
    private String title;
    private String description;
    private String date;
    private String time;
    private String location;
    private String name;
    private Set<String> participants;
    private int theme;
}
