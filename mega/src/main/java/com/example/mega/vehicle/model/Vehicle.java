package com.example.mega.vehicle.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

import lombok.Data;

@Data
@Entity
@Table(name = "vehicles")
public class Vehicle {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "vehicle_id")
    private Integer vehicleId;

    @NotBlank(message = "Registration number cannot be blank")
    @Size(max = 250, message = "Registration number cannot exceed 250 characters")
    @Column(name = "registration_number", unique = true)
    private String registrationNumber;

    @NotBlank(message = "Make cannot be blank")
    @Size(max = 250, message = "Make cannot exceed 250 characters")
    private String make;

    @NotBlank(message = "Model cannot be blank")
    @Size(max = 250, message = "Model cannot exceed 250 characters")
    private String model;

    private Integer year;

    @NotBlank(message = "Type cannot be blank")
    @Size(max = 250, message = "Type cannot exceed 250 characters")
    private String type;

    @Size(max = 250, message = "Status cannot exceed 250 characters")
    private String status;

    @Column(name = "current_driver_id")
    private Integer currentDriverId;

    @Column(name = "vehicle_picture_path")
    private String vehiclePicturePath;
}