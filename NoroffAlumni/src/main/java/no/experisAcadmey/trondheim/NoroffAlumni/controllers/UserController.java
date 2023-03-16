package no.experisAcadmey.trondheim.NoroffAlumni.controllers;

import no.experisAcadmey.trondheim.NoroffAlumni.mappers.TopicMapper;
import no.experisAcadmey.trondheim.NoroffAlumni.mappers.UserMapper;
import no.experisAcadmey.trondheim.NoroffAlumni.services.UserService;
import org.mapstruct.factory.Mappers;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/v1/user")
public class UserController {

    @Autowired
    private UserService userService;

    private UserMapper userMapper = Mappers.getMapper(UserMapper.class);


    @GetMapping
    public ResponseEntity getCurrentUser(){
        try{
            return ResponseEntity.ok(userMapper.toUserDto(userService.getCurrentUser()));
        }catch(Exception e){
            return ResponseEntity.badRequest().build();
        }
    }
}
