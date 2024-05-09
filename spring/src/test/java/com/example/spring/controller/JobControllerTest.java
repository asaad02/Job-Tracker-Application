package com.example.spring.controller;

import com.example.spring.model.Job;
import com.example.spring.service.JobService;
import com.example.spring.exception.ResourceNotFoundException;
import com.fasterxml.jackson.databind.ObjectMapper;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;

import java.util.Optional;

import static org.hamcrest.Matchers.*;
import static org.mockito.BDDMockito.given;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;
import static org.mockito.Mockito.doNothing;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.anyLong;

@ExtendWith(MockitoExtension.class)
class JobControllerTest {

    private MockMvc mockMvc;

    @Mock
    private JobService jobService;

    @InjectMocks
    private JobController jobController;

    @BeforeEach
    void setUp() {
        mockMvc = MockMvcBuilders.standaloneSetup(jobController)
                .build();
    }

    @Test
    void whenAddJob_thenReturnSavedJob() throws Exception {
        Job newJob = new Job();
        newJob.setJobTitle("Software Engineer");
        given(jobService.addJob(any(Job.class))).willReturn(newJob);

        mockMvc.perform(post("/api/jobs/add")
                .contentType(MediaType.APPLICATION_JSON)
                .content(new ObjectMapper().writeValueAsString(newJob)))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.jobTitle", is(newJob.getJobTitle())));
    }

    @Test
    void whenGetJobById_thenReturnJob() throws Exception {
        Job job = new Job();
        job.setId(1L);
        job.setJobTitle("Software Engineer");
        given(jobService.getJobById(job.getId())).willReturn(Optional.of(job));

        mockMvc.perform(get("/api/jobs/get/{id}", job.getId()))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.jobTitle", is(job.getJobTitle())));
    }

    @Test
    void whenGetJobById_thenReturn404() throws Exception {
        Long jobId = 1L;
        given(jobService.getJobById(jobId)).willThrow(new ResourceNotFoundException("Job not found with id " + jobId));

        mockMvc.perform(get("/api/jobs/get/{id}", jobId))
                .andExpect(status().isNotFound())
                .andExpect(content().string(containsString("Job not found with id ")));
    }

    
    @Test
    void whenDeleteJob_thenRespondWithStatusOk() throws Exception {
        Long jobId = 1L;
        doNothing().when(jobService).deleteJob(jobId);

        mockMvc.perform(delete("/api/jobs/delete/{id}", jobId))
                .andExpect(status().isOk())
                .andExpect(content().string("Job deleted successfully"));
    }

    @Test
    void whenGetAllJobs_thenReturnJobList() throws Exception {
        mockMvc.perform(get("/api/jobs/all"))
                .andExpect(status().isOk());
    }

    @Test
    void whenCountJobs_thenReturnCount() throws Exception {
        mockMvc.perform(get("/api/jobs/count"))
                .andExpect(status().isOk());
    }
}
