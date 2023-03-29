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

    // Retrieving all posts
    List<Post> findAllByOrderByLastUpdatedDesc();

    // Retrieves all posts by searchWord
    List<Post> findAllByTitleContainingIgnoreCaseOrBodyContainingIgnoreCaseOrderByLastUpdatedDesc(String title, String body);

    // Retrieving posts made by a user
    List<Post> findAllByAuthorIdOrderByLastUpdated(String authorId);

    // Retrieves posts made by a user by search word
    @Query( value = "select * from post where post.author_id=?2\n" +
            "and (upper(post.body) like upper(?1) or upper(post.title) like upper(?1))",
            nativeQuery = true)
    List<Post> findAllAuthoredBySearchWord(String searchWord, String authorId);

    // Retrieves direct messages received by a user
    List<Post> findAllByTargetUserIdOrderByLastUpdatedDesc(String targetUser);

    // Retrieves direct messages received by a user by searchWord
    @Query( value = "select * from post where post.target_user_id=?1\n" +
            "and (upper(post.body) like upper(?2) or upper(post.title) like upper(?2))",
            nativeQuery = true)
    List<Post> findAllMessagesReceivedBySearchWord(String targetUser, String searchWord);

    // Retrieves direct messages sent by a user
    List<Post> findAllByAuthorIdAndTargetUserIdIsNotNull(String authorId);

    // Retrieves direct messages sent by a user by searchWord
    @Query( value = "select * from post where post.author_id=?1 and post.target_user_id is not null\n" +
            "and (upper(post.body) like upper(?2) or upper(post.title) like upper(?2))",
            nativeQuery = true)
    List<Post> findMessagesSentBySearchWord(String authorId, String searchWord);

    List<Post> findAllByTargetGroupsIdOrderByLastUpdatedDesc(Long groupId);
}
