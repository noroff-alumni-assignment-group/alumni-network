package no.experisAcadmey.trondheim.NoroffAlumni.mappers;

import no.experisAcadmey.trondheim.NoroffAlumni.models.DTOs.groupDTOs.GroupDTO;
import no.experisAcadmey.trondheim.NoroffAlumni.models.DTOs.groupDTOs.GroupPostDTO;
import no.experisAcadmey.trondheim.NoroffAlumni.models.Group;
import no.experisAcadmey.trondheim.NoroffAlumni.models.User;
import no.experisAcadmey.trondheim.NoroffAlumni.services.UserService;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.Named;

import java.util.Collection;
import java.util.Set;
import java.util.stream.Collectors;

@Mapper(componentModel = "spring")
public abstract class GroupMapper {

    protected UserService userService;

    /**
     * Maps a group from entity to DTO.
     * @param group the group to be mapped
     * @return group DTO
     */
    @Mapping(target = "members", source = "members", qualifiedByName = "membersToIds")
    public abstract GroupDTO groupToGroupDTO(Group group);

    /**
     * Maps a collection of group entities to group DTOs.
     * @param groups the groups to be mapped
     * @return collection of group DTOs
     */
    public abstract Collection<GroupDTO> groupsToGroupDTO(Collection<Group> groups);

    /**
     * Maps a created group from DTO to entity.
     * @param group the created group to be mapped
     * @return created group entity
     */
    public abstract Group groupPostDTOToGroup(GroupPostDTO group);


    @Named("membersToIds")
    public Set<String> mapMembersToIds(Set<User> source) {
        if (source == null)
            return null;
        return source.stream().map(User::getId).collect(Collectors.toSet());
    }
}