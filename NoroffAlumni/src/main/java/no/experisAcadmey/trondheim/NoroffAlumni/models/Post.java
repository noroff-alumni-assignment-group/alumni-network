package no.experisAcadmey.trondheim.NoroffAlumni.models;


import jakarta.persistence.*;
import lombok.Data;

import java.util.Date;

@Entity
@Data
public class Post {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Column(length=100, nullable = false)
    private String title;
    @Column(length=500, nullable = false)
    private String body;
    private Date last_updated;

    private String authorInitlas;

    @ManyToOne
    private User author;
    @ManyToOne
    private User target_user;
    @ManyToOne
    private Topic target_topic;
    private Long target_group;

}
