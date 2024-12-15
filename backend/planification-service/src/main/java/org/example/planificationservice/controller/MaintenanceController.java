package org.example.planificationservice.controller;

import feign.FeignException;
import org.example.planificationservice.model.TravailMaintenance;
import org.example.planificationservice.model.vehicule.Vehicule;
import org.example.planificationservice.service.MaintenanceService;
import org.example.planificationservice.vehiculeFeignClient.VehiculeFeignService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/planifications")
@CrossOrigin("*")
public class MaintenanceController {

    @Autowired
    private MaintenanceService maintenanceJobService;

    @Autowired
    private VehiculeFeignService vehiculeFeignService;

    @PostMapping("/create")
    public TravailMaintenance createJob(@RequestBody TravailMaintenance job) {
        TravailMaintenance createdJob = maintenanceJobService.createJob(job);
        return createdJob;
    }

    @GetMapping("/planifications")
    public List<TravailMaintenance> getAllJobs() {
        List<TravailMaintenance> jobs = maintenanceJobService.getAllJobs();
        // Fetch all vehicles with client data from vehicule-service
        List<Vehicule> vehicules = vehiculeFeignService.getAllVehicules();
        // Create a map of vehicles by their VIN for fast lookup
        Map<String, Vehicule> vehiculeMap = vehicules.stream()
                .collect(Collectors.toMap(Vehicule::getVin, vehicule -> vehicule));

        System.out.println("Vehicules in the garage: " + vehiculeMap);

        // For each job, set the associated vehicle and client information
        jobs.forEach(job -> {
            if ( job.getVehiculeVIN() != null) {
                String vehiculeVin = job.getVehiculeVIN();  // Get VIN from the existing job's vehicule
                Vehicule fullVehiculeData = vehiculeMap.get(vehiculeVin);

                if (fullVehiculeData != null) {
                    job.setVehicule(fullVehiculeData);   // Update the vehicule in the job with full data
                    job.setClient(fullVehiculeData.getClient());  // Set the client from the vehicule's client field
                } else {
                    System.out.println("No matching vehicle found for VIN: " + vehiculeVin);
                }
            } else {
                System.out.println("Job has no vehicule or vehicule VIN is null: " + job.getId());
            }
        });

        return jobs;
    }



    @GetMapping("/{id}")
    public TravailMaintenance getJobById(@PathVariable String id) {
        TravailMaintenance job = maintenanceJobService.getJobById(id);
        try {
            Vehicule vehicule = vehiculeFeignService.getVehiculeById(job.getVehiculeVIN());
            job.setVehicule(vehicule);
            job.setClient(vehicule.getClient());
        } catch (FeignException e) {
            // Log the error
            System.err.println("Error fetching vehicle: " + e.getMessage());
            // Optionally, set default values or rethrow
            // throw new RuntimeException("Could not retrieve vehicle information", e);
        }
        return job;
    }

    @PutMapping("/{id}")
    public ResponseEntity<TravailMaintenance> updateJob(@PathVariable String id, @RequestBody TravailMaintenance updatedJob) {
        TravailMaintenance existingJob = maintenanceJobService.getJobById(id);
        if (existingJob == null) {
            return ResponseEntity.notFound().build();
        }

        // Update only allowed fields
        if (updatedJob.getTempsDebut() != null) {
            existingJob.setTempsDebut(updatedJob.getTempsDebut());
        }
        if (updatedJob.getTempsFin() != null) {
            existingJob.setTempsFin(updatedJob.getTempsFin());
        }
        if (updatedJob.getStatus() != null) {
            existingJob.setStatus(updatedJob.getStatus());
        }
        System.out.println("EXISTING JOB"+existingJob);

        TravailMaintenance updated = maintenanceJobService.updateJob(id, existingJob);
        return ResponseEntity.ok(updated);
    }


    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteJob(@PathVariable String id) {
        maintenanceJobService.deleteJob(id);
        return ResponseEntity.noContent().build();
    }
}
