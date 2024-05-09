package com.example.spring.service;

import com.example.spring.model.Job;
import java.util.List;
import java.util.Optional;

/**
 * The JobService interface defines the operations that can be performed on Job entities.
 */
public interface JobService {
    /**
     * Adds a new Job to the system.
     *
     * @param job the job to add
     * @return the saved job
     */
    Job addJob(Job job);

    /**
     * Retrieves a job by its ID.
     *
     * @param id the ID of the job
     * @return an Optional containing the job if found, or an empty Optional if not
     */
    Optional<Job> getJobById(Long id);

    /**
     * Updates an existing Job.
     *
     * @param job the job with updated information
     * @return the updated job
     */
    Job updateJob(Job job);

    /**
     * Deletes a job by its ID.
     *
     * @param id the ID of the job to delete
     */
    void deleteJob(Long id);

    /**
     * Retrieves all jobs in the system.
     *
     * @return a list of jobs
     */
    List<Job> getAllJobs();

    /**
     * Counts the number of jobs in the system.
     *
     * @return the count of jobs
     */
    long count();
}
