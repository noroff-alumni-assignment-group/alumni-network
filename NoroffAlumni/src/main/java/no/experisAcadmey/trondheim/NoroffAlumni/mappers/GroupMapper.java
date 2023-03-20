package no.experisAcadmey.trondheim.NoroffAlumni.mappers;


import no.experisAcadmey.trondheim.NoroffAlumni.models.DTOs.groupDTOs.GroupDTO;
import no.experisAcadmey.trondheim.NoroffAlumni.models.DTOs.groupDTOs.GroupPostDTO;
import no.experisAcadmey.trondheim.NoroffAlumni.models.Group;
import no.experisAcadmey.trondheim.NoroffAlumni.models.User;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.Named;

import java.util.Collection;
import java.util.HashSet;
import java.util.Set;
import java.util.stream.Collectors;

@Mapper(componentModel = "spring")
public abstract class GroupMapper {

    /**
     * Maps a created group from DTO to entity.
     * @param dto the created group to be mapped
     * @return
     */
    public abstract GroupPostDTO groupPostDtoToGroup(GroupPostDTO dto);

    /**
     * Maps a group from entity to DTO.
     * @param group the group to be mapped
     * @return
     */
    @Mapping(target = "members", qualifiedByName = "mapMembersToId",source = "members")
    public abstract GroupDTO groupToGroupDTO(Group group);

    /**
     * Maps a collection of group entities to group DTOs.
     * @param groups the groups to be mapped
     * @return
     */
    public abstract Collection<GroupDTO> groupsToGroupDTO(Collection<Group> groups);

    @Named("mapMembersToId")
    public Set<String> mapMembersToId(Set<User> members) {
        if (members == null) return new HashSet<>();
        return members.stream().map(User::getId).collect(Collectors.toSet());
    }

}
