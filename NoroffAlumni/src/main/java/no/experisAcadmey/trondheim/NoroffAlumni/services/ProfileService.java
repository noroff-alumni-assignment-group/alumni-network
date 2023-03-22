package no.experisAcadmey.trondheim.NoroffAlumni.services;

import no.experisAcadmey.trondheim.NoroffAlumni.models.Profile;
import no.experisAcadmey.trondheim.NoroffAlumni.repositories.ProfileRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class ProfileService {

    @Autowired
    private ProfileRepository profileRepository;

    // Other existing methods

    public Profile updateProfile(Long id, Profile updatedProfileData) throws Exception {
        Profile profile = profileRepository.findById(id)
                .orElseThrow(() -> new Exception("Profile not found with id: " + id));

        profile.setBiography(updatedProfileData.getBiography());
        profile.setFunfact(updatedProfileData.getFunfact());
        profile.setTitle(updatedProfileData.getTitle());

        return profileRepository.save(profile);
    }

    public Profile getProfile(Long id) throws Exception {
        return profileRepository.findById(id)
                .orElseThrow(() -> new Exception("Profile not found with id: " + id));
    }
}
