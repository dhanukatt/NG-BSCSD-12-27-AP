package com.example.mega.driver.service;

import com.example.mega.auth.model.User;
import com.example.mega.auth.repository.UserRepository;
import com.example.mega.driver.model.Driver;
import com.example.mega.driver.repository.DriverRepository;
import com.example.mega.dto.DriverDTO;
import com.example.mega.util.ImageStorageUtil;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class DriverService {

    private final DriverRepository driverRepository;
    private final ModelMapper modelMapper;
    private final UserRepository userRepository;
    private final ImageStorageUtil imageStorageUtil;

    @Value("${upload.directory}")
    private String uploadPath;

    @Transactional
    public DriverDTO createDriver(DriverDTO driverDTO, MultipartFile profilePicture) {
        validateDriverDTO(driverDTO);

        if (driverRepository.findByLicenseNumber(driverDTO.getLicenseNumber()).isPresent()) {
            throw new IllegalArgumentException("License number already exists");
        }

        setUserIdFromCurrentUser(driverDTO);

        Driver driver = modelMapper.map(driverDTO, Driver.class);
        handleProfilePictureUpload(driver, profilePicture);

        Driver savedDriver = driverRepository.save(driver);
        updateUserWithDriverId(savedDriver);

        return modelMapper.map(savedDriver, DriverDTO.class);
    }

    public Optional<DriverDTO> getDriverById(Integer id) {
        validateId(id);
        return driverRepository.findById(id)
                .map(driver -> modelMapper.map(driver, DriverDTO.class));
    }

    public Optional<DriverDTO> getDriverByLicenseNumber(String licenseNumber) {
        validateLicenseNumber(licenseNumber);
        return driverRepository.findByLicenseNumber(licenseNumber)
                .map(driver -> modelMapper.map(driver, DriverDTO.class));
    }

    @Transactional
    public DriverDTO updateDriver(Integer id, DriverDTO driverDTO, MultipartFile profilePicture) {
        validateId(id);
        validateDriverDTO(driverDTO);

        Driver existingDriver = driverRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Driver not found with ID: " + id));

        modelMapper.map(driverDTO, existingDriver);
        existingDriver.setDriverId(id);

        handleProfilePictureUpload(existingDriver, profilePicture);

        Driver updatedDriver = driverRepository.save(existingDriver);
        return modelMapper.map(updatedDriver, DriverDTO.class);
    }

    @Transactional
    public void deleteDriver(Integer id) {
        validateId(id);
        driverRepository.deleteById(id);
    }

    public List<DriverDTO> getAllDrivers() {
        return driverRepository.findAll().stream()
                .map(driver -> modelMapper.map(driver, DriverDTO.class))
                .collect(Collectors.toList());
    }

    public List<DriverDTO> getDriversByStatus(String status) {
        validateStatus(status);
        return driverRepository.findByStatus(status).stream()
                .map(driver -> modelMapper.map(driver, DriverDTO.class))
                .collect(Collectors.toList());
    }

    public boolean hasDriverProfile() {
        String currentUsername = getCurrentUsername();
        return userRepository.findByUsername(currentUsername)
                .map(User::getDriverId)
                .isPresent();
    }

    private void validateDriverDTO(DriverDTO driverDTO) {
        if (driverDTO == null) {
            throw new IllegalArgumentException("Driver object cannot be null");
        }
    }

    private void validateId(Integer id) {
        if (id == null) {
            throw new IllegalArgumentException("Driver ID cannot be null");
        }
    }

    private void validateLicenseNumber(String licenseNumber) {
        if (licenseNumber == null || licenseNumber.isEmpty()) {
            throw new IllegalArgumentException("License number cannot be null or empty");
        }
    }

    private void validateStatus(String status) {
        if (status == null || status.isEmpty()) {
            throw new IllegalArgumentException("Status cannot be null or empty");
        }
    }

    private void setUserIdFromCurrentUser(DriverDTO driverDTO) {
        if (driverDTO.getUserId() == null) {
            String currentUsername = getCurrentUsername();
            userRepository.findByUsername(currentUsername).ifPresent(user -> driverDTO.setUserId(user.getId()));
        }
    }

    private String getCurrentUsername() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        return authentication.getName();
    }

    private void handleProfilePictureUpload(Driver driver, MultipartFile profilePicture) {
        if (profilePicture != null && !profilePicture.isEmpty()) {
            String profilePicturePath = imageStorageUtil.saveImage(profilePicture, uploadPath);
            driver.setProfilePicturePath(profilePicturePath);
        }
    }

    private void updateUserWithDriverId(Driver driver) {
        userRepository.findById(driver.getUserId())
                .ifPresent(user -> {
                    user.setDriverId(driver.getDriverId());
                    userRepository.save(user);
                });
    }
}