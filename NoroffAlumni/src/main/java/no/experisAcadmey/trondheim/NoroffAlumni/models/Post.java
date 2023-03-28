package no.experisAcadmey.trondheim.NoroffAlumni.models;


import jakarta.persistence.*;
import lombok.Data;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@Entity
@Data
public class Post {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Column(length=100, nullable = false)
    private String title;
    @Column(length=1500, nullable = false)
    private String body;
    private Date lastUpdated;

    private String authorInitlas;

    @ManyToOne
    private User author;
    @ManyToOne
    private User targetUser;
    @ManyToMany
    @JoinTable(name="topic_posts",joinColumns = @JoinColumn(name = "post_id"),inverseJoinColumns = @JoinColumn(name = "topic_id"))
    private List<Topic> targetTopics = new ArrayList<>();
    private List<Long> targetGroup;
    @OneToMany(mappedBy = "targetPost")
    private List<Reply> replies = new ArrayList<>();

    public Post addTopic(Topic topic){
        targetTopics.add(topic);
        return this;
    }

}
