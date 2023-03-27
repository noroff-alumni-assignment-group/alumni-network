package no.experisAcadmey.trondheim.NoroffAlumni.repositories;

import no.experisAcadmey.trondheim.NoroffAlumni.models.Post;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.Date;
import java.util.List;

import java.util.List;

@Repository
public interface PostRepository extends JpaRepository<Post, Long> {

    Page<Post> findAllByTargetTopicsIdOrderByLastUpdated(Long topicId, Pageable pageable);

    // Retrieving general posts
    List<Post> findAllByOrderByLastUpdatedDesc();
    List<Post> findAllByTitleContainingIgnoreCaseOrBodyContainingIgnoreCaseOrderByLastUpdatedDesc(String title, String body);

    // Retrieving user-specific posts
    List<Post> findAllByAuthorIdOrderByLastUpdated(String authorId);
    @Query( value = "select * from post where post.author_id=?2\n" +
            "and (upper(post.body) like upper(?1) or upper(post.title) like upper(?1))",
            nativeQuery = true)
    List<Post> findAllBySearchWord(String searchWord, String authorId);
}
