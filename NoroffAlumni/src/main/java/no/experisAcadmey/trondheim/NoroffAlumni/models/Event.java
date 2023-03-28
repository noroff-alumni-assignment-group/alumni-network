package no.experisAcadmey.trondheim.NoroffAlumni.models;

import jakarta.persistence.*;
import lombok.Data;

import java.util.List;
import java.util.Set;

@Entity(name = "event")
@Data
public class Event {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(length = 150)
    private String created_by;

    @Column(length = 150)
    private String group_id;

    @Column(length = 150)
    private int theme;

    @Column(length = 150)
    private String title;

    @Column(length = 150)
    private String description;

    @Column(length = 150)
    private String date;

    @Column(length = 150)
    private String time;

    @Column(length = 150)
    private String location;

    @Column(length = 50, nullable = false)
    private String name;



    @ManyToMany
    @JoinTable(
            name = "event_participants",
            joinColumns = @JoinColumn(name = "event_id"),
            inverseJoinColumns = @JoinColumn(name = "user_id")
    )
    private List<User> participants;
}