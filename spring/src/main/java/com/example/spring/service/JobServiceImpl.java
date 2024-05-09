package com.example.spring.service;

import com.example.spring.model.Job;
import com.example.spring.repository.JobRepository;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

/**
 * Service class for handling job-related business logic and interactions with the repository.
 */
@Service
public class JobServiceImpl implements JobService {

    private static final Logger logger = LoggerFactory.getLogger(JobServiceImpl.class);
    private final JobRepository jobRepository;

    @Autowired
    public JobServiceImpl(JobRepository jobRepository) {
        this.jobRepository = jobRepository;
    }

    @Override
    public Job addJob(Job job) {
        logger.info("Saving new job: {}", job);
        return jobRepository.save(job);
    }

    @Override
    public Optional<Job> getJobById(Long id) {
        logger.info("Retrieving job with id: {}", id);
        return jobRepository.findById(id);
    }

    @Override
    public Job updateJob(Job job) {
        logger.info("Updating job: {}", job);
        return jobRepository.save(job); 
    }

    @Override
    public void deleteJob(Long id) {
        try {
            jobRepository.deleteById(id);
            logger.info("Deleted job with id: {}", id);
        } catch (EmptyResultDataAccessException ex) {
            logger.error("Error deleting job with id: {}", id, ex);
            
        }
    }

    @Override
    public List<Job> getAllJobs() {
        logger.info("Retrieving all jobs");
        return jobRepository.findAll();
    }

    @Override
    public long count() {
        logger.info("Counting all jobs");
        return jobRepository.count();
    }
}
