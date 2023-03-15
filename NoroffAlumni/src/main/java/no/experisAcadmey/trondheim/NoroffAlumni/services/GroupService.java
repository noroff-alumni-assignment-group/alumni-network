package no.experisAcadmey.trondheim.NoroffAlumni.services;

import no.experisAcadmey.trondheim.NoroffAlumni.models.DTOs.groupDTOs.GroupPostDTO;
import no.experisAcadmey.trondheim.NoroffAlumni.models.Group;
import no.experisAcadmey.trondheim.NoroffAlumni.repositories.GroupRepository;
import no.experisAcadmey.trondheim.NoroffAlumni.repositories.UserRepository;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class GroupService {

    private final GroupRepository groupRepository;
    private final UserRepository userRepository;

    public GroupService(GroupRepository groupRepository, UserRepository userRepository) {
        this.groupRepository = groupRepository;
        this.userRepository = userRepository;
    }

    /**
     * Retrieves all the groups that currently exist.
     * @return A list of groups
     */
    public List<Group> findGroups(){
        return new ArrayList<>();
    }

    /**
     * Retrieves a group based on the group ID provided.
     * @param group_id the group ID
     * @return the group with the matching ID
     */
    public Optional<Group> findGroupById(Integer group_id) {
        return groupRepository.findById(group_id);
    }

    /**
     * Creates a new group from the provided data.
     * @param newGroup the group to be created
     * @return the created group
     */
    public Group createGroup(GroupPostDTO newGroup) {

        Group g = new Group();
        g.setName(newGroup.getName());
        g.setDescription(newGroup.getDescription());
        g.setIs_private(newGroup.getIs_private());
        groupRepository.save(g);

        return g;
    }

    // To do

    /**
     * Assigns a new member to a group.
     * @param group_id the ID of the group the member is to be assigned to
     * @return
     */
    public Group joinGroup(int group_id) {
        return
    }

}
