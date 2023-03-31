package no.experisAcadmey.trondheim.NoroffAlumni.repositories;

import no.experisAcadmey.trondheim.NoroffAlumni.models.Event;
import no.experisAcadmey.trondheim.NoroffAlumni.models.Group;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface EventRepository extends JpaRepository<Event, Long> {
    List<Event> findAll();

}
