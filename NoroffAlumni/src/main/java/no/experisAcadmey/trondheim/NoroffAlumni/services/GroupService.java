package no.experisAcadmey.trondheim.NoroffAlumni.services;

import no.experisAcadmey.trondheim.NoroffAlumni.exceptions.GroupNotFoundException;
import no.experisAcadmey.trondheim.NoroffAlumni.models.DTOs.groupDTOs.GroupPostDto;
import no.experisAcadmey.trondheim.NoroffAlumni.models.Group;
import no.experisAcadmey.trondheim.NoroffAlumni.models.Post;
import no.experisAcadmey.trondheim.NoroffAlumni.models.User;
import no.experisAcadmey.trondheim.NoroffAlumni.repositories.GroupRepository;
import no.experisAcadmey.trondheim.NoroffAlumni.repositories.PostRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.*;


@Service
public class GroupService {

    @Autowired
    private final GroupRepository groupRepository;
    @Autowired
    private final PostRepository postRepository;
    @Autowired
    private final UserService userService;


    public GroupService(GroupRepository groupRepository, PostRepository postRepository, UserService userService) {
        this.groupRepository = groupRepository;
        this.postRepository = postRepository;
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
    public Group findGroupById(Long group_id) {

        Optional<Group> group = groupRepository.findById(group_id);
        return group.orElse(null);
    }

    public Group findGroupByName(String name) {
        return groupRepository.findByName(name).orElseThrow(GroupNotFoundException::new);
    }

    /**
     * Creates a new group from the provided data.
     *
     * @param group the group to be created
     * @return the created group
     */
    public Long createGroup(GroupPostDto group) {

        Group g = new Group();
        g.setName(group.getName());
        g.setDescription(group.getDescription());
        g.setIsPrivate(group.getIsPrivate());
        g.setMembers(Set.of(userService.getCurrentUser()));
        g.setPosts(new ArrayList<>());
        groupRepository.save(g);

        return g.getId();
    }

    /**
     * Assigns a new member to a group.
     * @param group_id the ID of the group the member is to be assigned to
     * @return group
     */
    public Group joinGroup(Long group_id) {
        Group group = groupRepository.findById(group_id).orElseThrow(GroupNotFoundException::new);
        group.addMember(userService.getCurrentUser());
        return groupRepository.save(group);
    }

    public void leaveGroup(Long group_id) {
        Group group = groupRepository.findById(group_id).orElseThrow(GroupNotFoundException::new);
        group.removeMember(userService.getCurrentUser());
        groupRepository.save(group);
    }

    public Group inviteToGroup(Long group_id, UUID user_id) {
        Group group = groupRepository.findById(group_id).orElseThrow(GroupNotFoundException::new);
        User user = userService.getUserById(user_id);
        group.addMember(user);
        return groupRepository.save(group);
    }

    /**
     * Gets all the posts in a group
     * @param group_id the ID of the group to get all posts for
     * @return posts
     */
    public List<Post> getPostsInGroup(Long group_id, Optional<String> searchWord) {
        if(searchWord.isPresent()){
            return removeDirectMessages(postRepository.findAllByTargetGroupsIdAndSearchWord("%" + searchWord.get() + "%", group_id));
        }else {
            return removeDirectMessages(postRepository.findAllByTargetGroupsIdOrderByLastUpdatedDesc(group_id));
        }
    }

    public List<Post> removeDirectMessages(List<Post> posts){
        List<Post> result = new ArrayList<>();
        for(Post post : posts) {
            if(post.getTargetUser() == null){
                result.add(post);
            }
        }
        return result;
    }

    public List<Group> findUserGroups(){
        User currentUser = userService.getCurrentUser();
        return groupRepository.findByMembersContains(currentUser);
    }


}
