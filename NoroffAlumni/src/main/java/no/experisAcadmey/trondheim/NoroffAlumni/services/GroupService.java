package no.experisAcadmey.trondheim.NoroffAlumni.services;

import no.experisAcadmey.trondheim.NoroffAlumni.exceptions.GroupNotFoundException;
import no.experisAcadmey.trondheim.NoroffAlumni.models.DTOs.groupDTOs.GroupPostDTO;
import no.experisAcadmey.trondheim.NoroffAlumni.models.Group;
import no.experisAcadmey.trondheim.NoroffAlumni.models.User;
import no.experisAcadmey.trondheim.NoroffAlumni.repositories.GroupRepository;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;


@Service
public class GroupService {


    private final GroupRepository groupRepository;
    private final UserService userService;


    public GroupService(GroupRepository groupRepository, UserService userService) {
        this.groupRepository = groupRepository;
        this.userService = userService;
    }

    /**
     * Retrieves all the groups that currently exist.
     * @return A list of groups
     */
    public List<Group> findGroups(){
        User currentUser = userService.getCurrentUser();
        return groupRepository.findByIsPrivateFalseOrMembersContains(currentUser);
    }

    /**
     * Retrieves a group based on the group ID provided.
     * @param group_id the group ID
     * @return the group with the matching ID
     */
    public Group findGroupById(int group_id) {
        User currentUser = userService.getCurrentUser();
        Optional<Group> group = groupRepository.findByIdAndIsPrivateFalseOrMembersContains(group_id, currentUser);
        return group.orElse(null);
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
        g.setIsPrivate(newGroup.getIs_private());
        groupRepository.save(g);

        return g;
    }

    /**
     * Assigns a new member to a group.
     * @param group_id the ID of the group the member is to be assigned to
     * @return
     */
    public Group joinGroup(int group_id) {
        Group group = groupRepository.findById(group_id).orElseThrow(GroupNotFoundException::new);
        group.addMember(userService.getCurrentUser());
        return groupRepository.save(group);
    }

}
