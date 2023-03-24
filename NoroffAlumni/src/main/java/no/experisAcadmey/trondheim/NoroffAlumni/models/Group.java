package no.experisAcadmey.trondheim.NoroffAlumni.models;

import java.util.List;
import java.util.Set;

import jakarta.persistence.*;
import lombok.Data;


@Entity(name = "groups")
@Data
public class Group {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(length = 50, nullable = false)
    private String name;

    @Column(length = 150)
    private String description;

    @Column
    private Boolean isPrivate;

    @ManyToMany
    @JoinTable(
            name = "group_members",
            joinColumns = @JoinColumn(name = "group_id"),
            inverseJoinColumns = @JoinColumn(name = "user_id")
    )
    private Set<User> members;

    @OneToMany(mappedBy = "targetGroup")
    private List<Post> posts;

    public Group addMember(User user){
        members.add(user);
        return this;
    }
}