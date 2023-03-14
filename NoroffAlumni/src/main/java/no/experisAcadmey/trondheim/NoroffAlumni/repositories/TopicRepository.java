package no.experisAcadmey.trondheim.NoroffAlumni.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import no.experisAcadmey.trondheim.NoroffAlumni.models.Topic;

@Repository
public interface TopicRepository extends JpaRepository<Topic,Long>{
   
}