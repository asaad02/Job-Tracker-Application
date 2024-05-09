package com.example.spring.service;

import com.example.spring.model.Job;
import com.example.spring.repository.JobRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.dao.EmptyResultDataAccessException;

import java.util.Arrays;
import java.util.List;
import java.util.Optional;

import static org.mockito.Mockito.*;
import static org.junit.jupiter.api.Assertions.*;

class JobServiceImplTest {

    @Mock
    private JobRepository jobRepository;

    @InjectMocks
    private JobServiceImpl jobService;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
    }

    @Test
    void testAddJob() {
        // Arrange
        Job job = new Job();
        job.setJobTitle("Software Engineer");
        when(jobRepository.save(any(Job.class))).thenReturn(job);

        // Act
        Job createdJob = jobService.addJob(job);

        // Assert
        assertNotNull(createdJob);
        assertEquals("Software Engineer", createdJob.getJobTitle());
    }

    @Test
    void testGetJobByIdWhenFound() {
        // Arrange
        Job job = new Job();
        job.setId(1L);
        when(jobRepository.findById(1L)).thenReturn(Optional.of(job));

        // Act
        Optional<Job> foundJob = jobService.getJobById(1L);

        // Assert
        assertTrue(foundJob.isPresent());
        assertEquals(1L, foundJob.get().getId());
    }

    @Test
    void testGetJobByIdWhenNotFound() {
        // Arrange
        when(jobRepository.findById(1L)).thenReturn(Optional.empty());

        // Act
        Optional<Job> foundJob = jobService.getJobById(1L);

        // Assert
        assertFalse(foundJob.isPresent());
    }

    @Test
    void testUpdateJob() {
        // Arrange
        Job job = new Job();
        job.setId(1L);
        job.setJobTitle("Software Engineer Updated");
        when(jobRepository.save(job)).thenReturn(job);

        // Act
        Job updatedJob = jobService.updateJob(job);

        // Assert
        assertNotNull(updatedJob);
        assertEquals("Software Engineer Updated", updatedJob.getJobTitle());
    }

    @Test
    void testDeleteJob() {
        // Arrange
        doNothing().when(jobRepository).deleteById(1L);

        // Act
        jobService.deleteJob(1L);

        // Assert
        verify(jobRepository, times(1)).deleteById(1L);
    }


    @Test
    void testGetAllJobs() {
        // Arrange
        Job job1 = new Job();
        Job job2 = new Job();
        when(jobRepository.findAll()).thenReturn(Arrays.asList(job1, job2));

        // Act
        List<Job> jobs = jobService.getAllJobs();

        // Assert
        assertEquals(2, jobs.size());
    }

    @Test
    void testCount() {
        // Arrange
        long expectedCount = 10L;
        when(jobRepository.count()).thenReturn(expectedCount);

        // Act
        long actualCount = jobService.count();

        // Assert
        assertEquals(expectedCount, actualCount);
    }
}
