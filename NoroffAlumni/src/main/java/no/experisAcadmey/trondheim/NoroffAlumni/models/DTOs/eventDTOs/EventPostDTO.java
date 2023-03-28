package no.experisAcadmey.trondheim.NoroffAlumni.models.DTOs.eventDTOs;

import lombok.Data;

@Data
public class EventPostDTO {
    private String createdBy;
    private String groupId;
    private String title;
    private String description;
    private String date;
    private String time;
    private String location;
    private String name;
    private int theme;
}

