package no.experisAcadmey.trondheim.NoroffAlumni.repositories;

import no.experisAcadmey.trondheim.NoroffAlumni.models.Profile;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ProfileRepository extends JpaRepository<Profile, Long> {
}