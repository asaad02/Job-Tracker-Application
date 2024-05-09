package com.example.spring.controller;

import com.example.spring.model.Job;
import com.example.spring.service.JobService;
import com.example.spring.exception.ResourceNotFoundException;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

// The main controller for handling job-related requests
@RestController
@RequestMapping(path = "/api/jobs")
public class JobController {
    
    private static final Logger logger = LoggerFactory.getLogger(JobController.class);
    private final JobService jobService;

    @Autowired
    public JobController(JobService jobService) {
        this.jobService = jobService;
    }

    // Adds a new job to the system
    @PostMapping("/add")
    public @ResponseBody Job addJob(@RequestBody Job newJob) {
        logger.info("Adding new job: {}", newJob);
        Job createdJob = jobService.addJob(newJob);
        logger.info("Added job successfully: {}", createdJob);
        return createdJob;
    }

    // Retrieves a job by its ID
    @GetMapping("/get/{id}")
    public @ResponseBody Job getJob(@PathVariable Long id) {
        logger.info("Fetching job with id: {}", id);
        return jobService.getJobById(id).orElseThrow(() -> new ResourceNotFoundException("Job not found with id " + id));
    }

    // Updates an existing job
    @PutMapping("/update/{id}")
    public @ResponseBody Job updateJob(@RequestBody Job updatedJob) {
        logger.info("Updating job: {}", updatedJob);
        Job job = jobService.updateJob(updatedJob);
        logger.info("Updated job successfully: {}", job);
        return job;
    }

    // Deletes a job by its ID
    @DeleteMapping("/delete/{id}")
    public @ResponseBody ResponseEntity<String> deleteJob(@PathVariable Long id) {
        logger.info("Deleting job with id: {}", id);
        jobService.deleteJob(id);
        logger.info("Deleted job successfully with id: {}", id);
        return ResponseEntity.ok("Job deleted successfully");
    }

    // Retrieves all jobs from the system
    @GetMapping("/all")
    public @ResponseBody Iterable<Job> getAllJobs() {
        logger.info("Fetching all jobs");
        return jobService.getAllJobs();
    }

    // Counts the number of jobs in the system
    @GetMapping("/count")
    public @ResponseBody long countJobs() {
        logger.info("Counting all jobs");
        return jobService.count();
    }

    // Handles ResourceNotFoundException across the entire application
    @ExceptionHandler(ResourceNotFoundException.class)
    public @ResponseBody ResponseEntity<String> handleResourceNotFound(ResourceNotFoundException e) {
        logger.error("Resource not found: {}", e.getMessage());
        return ResponseEntity.status(404).body(e.getMessage());
    }
}
