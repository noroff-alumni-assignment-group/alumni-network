package no.experisAcadmey.trondheim.NoroffAlumni.mappers;


import no.experisAcadmey.trondheim.NoroffAlumni.models.DTOs.groupDTOs.GroupDTO;
import no.experisAcadmey.trondheim.NoroffAlumni.models.DTOs.groupDTOs.GroupPostDTO;
import no.experisAcadmey.trondheim.NoroffAlumni.models.Group;

import java.util.Collection;

@Mapper(componentModel = "spring")
public abstract class GroupMapper {

    /**
     * Maps a created group from DTO to entity.
     * @param dto the group to be mapped
     * @return
     */
    public abstract GroupPostDTO groupPostDtoToGroup(GroupPostDTO dto);

    /**
     * Maps a collection of group entities to group DTOs.
     * @param groups the groups to be mapped
     * @return
     */
    public abstract Collection<GroupDTO> groupToGroupDTO(Collection<Group> groups);

}
