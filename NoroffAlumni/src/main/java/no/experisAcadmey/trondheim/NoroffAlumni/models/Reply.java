package no.experisAcadmey.trondheim.NoroffAlumni.models;

import jakarta.persistence.*;
import lombok.Data;

import java.util.Date;

@Entity
@Data
public class Reply {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String body;
    private Date lastUpdated;
    @ManyToOne
    private User author;
    @ManyToOne
    private Post targetPost;
}
