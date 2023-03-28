package no.experisAcadmey.trondheim.NoroffAlumni.mappers;

import no.experisAcadmey.trondheim.NoroffAlumni.models.DTOs.replyDTOs.ReplyDto;
import no.experisAcadmey.trondheim.NoroffAlumni.models.DTOs.userDTOs.UserDisplayDto;
import no.experisAcadmey.trondheim.NoroffAlumni.models.Reply;
import no.experisAcadmey.trondheim.NoroffAlumni.models.User;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.Named;
import org.mapstruct.factory.Mappers;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.List;

@Mapper(componentModel = "spring")
public abstract class ReplyMapper {

    @Autowired
    private UserMapper userMapper = Mappers.getMapper(UserMapper.class);

    @Mapping(target = "author", qualifiedByName = "mapUserToUserDisplayDto", source = "author")
    @Mapping(target = "last_updated", source = "lastUpdated")
    public abstract ReplyDto toReplyDto(Reply reply);

    public abstract List<ReplyDto> toReplyDto(List<Reply> reply);

    @Named("mapUserToUserDisplayDto")
    public UserDisplayDto mapUserToUserDisplayDto(User user){
        return userMapper.toUserDisplayDto(user);
    }

}
