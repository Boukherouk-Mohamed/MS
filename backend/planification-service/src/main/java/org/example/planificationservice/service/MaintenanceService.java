package org.example.planificationservice.service;

import org.example.planificationservice.model.TravailMaintenance;
import org.example.planificationservice.repository.MaintenanceRepository;
import org.example.planificationservice.vehiculeFeignClient.VehiculeFeignService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;

@Service
public class MaintenanceService {

    @Autowired
    private MaintenanceRepository maintenanceJobRepository;

    @Autowired
    private VehiculeFeignService vehiculeFeignService;

    public TravailMaintenance createJob(TravailMaintenance job) {
        job.setId(UUID.randomUUID().toString());
        return maintenanceJobRepository.save(job);
    }

    public List<TravailMaintenance> getAllJobs() {
        return maintenanceJobRepository.findAll();
    }

    public TravailMaintenance getJobById(String id) {
        return maintenanceJobRepository.findById(id).orElse(null);
    }

    public TravailMaintenance updateJob(String id, TravailMaintenance updatedJob) {
        // Check if the job exists
        return maintenanceJobRepository.findById(id)
                .map(existingJob -> {
                    // Update fields
                    existingJob.setTempsDebut(updatedJob.getTempsDebut());
                    existingJob.setTempsFin(updatedJob.getTempsFin());
                    existingJob.setDescription(updatedJob.getDescription());
                    existingJob.setStatus(updatedJob.getStatus());
                    existingJob.setVehiculeVIN(updatedJob.getVehiculeVIN());
                    return maintenanceJobRepository.save(existingJob); // Save updated job
                })
                .orElse(null); // Return null if the job doesn't exist
    }

    public void deleteJob(String id) {
        maintenanceJobRepository.deleteById(id);
    }
}
