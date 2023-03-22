package no.experisAcadmey.trondheim.NoroffAlumni.models;

import java.util.Set;

import jakarta.persistence.*;
import lombok.Data;


@Entity
@Data
public class Group {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(length = 50, nullable = false)
    private String name;

    @Column(length = 150)
    private String description;

    @Column(nullable = false)
    private Boolean isPrivate;

    @ManyToMany
    @JoinTable(
            name = "group_members",
            joinColumns = @JoinColumn(name = "group_id"),
            inverseJoinColumns = @JoinColumn(name = "user_id")
    )
    private Set<User> members;

    public void addMember(User user){
        members.add(user);
    }
}