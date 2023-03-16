package no.experisAcadmey.trondheim.NoroffAlumni.repositories;

import org.springframework.data.domain.Page;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import no.experisAcadmey.trondheim.NoroffAlumni.models.Topic;
import org.springframework.data.domain.Pageable;
import java.util.List;
import java.util.Optional;

/**
 * Repository for Topics, servers as an interface for
 * application and Database
 */
@Repository
public interface TopicRepository extends JpaRepository<Topic,Long>{


    Page<Topic> findByNameContainingIgnoreCase(String searchWord, Pageable pageable);
    List<Topic> findByNameContainingIgnoreCase(String name);

    Optional<Topic> findByName(String name);
}
