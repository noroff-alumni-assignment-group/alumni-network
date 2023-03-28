package no.experisAcadmey.trondheim.NoroffAlumni.repositories;

import no.experisAcadmey.trondheim.NoroffAlumni.models.Reply;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ReplyRepository extends JpaRepository<Reply, Long> {

}
