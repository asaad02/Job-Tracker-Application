package com.example.spring.repository;

import com.example.spring.model.Job;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

/**
 * Repository interface for {@link Job} instances.
 * Provides basic CRUD operations due to the extension of {@link JpaRepository}.
 * Use this interface to add custom query methods.
 */
@Repository
public interface JobRepository extends JpaRepository<Job, Long> {
    // Custom database queries can be added here, if necessary, following the Spring Data JPA query method pattern.

    // Example custom query to find jobs by their status
    // List<Job> findByStatus(String status);
}
