package no.experisAcadmey.trondheim.NoroffAlumni.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import no.experisAcadmey.trondheim.NoroffAlumni.models.User;

import java.util.List;
import java.util.Optional;

/**
 * Repository for interaction between application and
 * SQLDatabase
 */
@Repository
public interface UserRepository extends JpaRepository<User,String>{

    List<User> findByFirstNameContainingIgnoreCase(String firstname);

    List<User> findByLastNameContainingIgnoreCase(String lastname);

    Optional<User> findByUsername(String username);

}
