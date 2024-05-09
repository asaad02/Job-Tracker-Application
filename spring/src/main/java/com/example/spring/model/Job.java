package com.example.spring.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.*;
import java.util.Date;

/**
 * The Job entity represents a job application within the system.
 */
@Entity
@Table(name = "job") // Specifies the table name in the database.
public class Job {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotBlank(message = "Job title is required.")
    @Column(name = "job_title", nullable = false)
    private String jobTitle;

    @Column(name = "company")
    private String company;

    @Column(name = "company_url")
    private String companyUrl;

    @Column(name = "status")
    private String status;

    @Temporal(TemporalType.TIMESTAMP)
    @Column(name = "application_date")
    private Date applicationDate;

    @Column(name = "application_password")
    private String applicationPassword;

    @Lob
    @Column(name = "notes")
    private String notes;

    // No-argument constructor required by JPA.
    public Job() {
    }

    // Constructor with fields for easier instantiation.
    public Job(String jobTitle, String company, String companyUrl, String status, Date applicationDate, String applicationPassword, String notes) {
        this.jobTitle = jobTitle;
        this.company = company;
        this.companyUrl = companyUrl;
        this.status = status;
        this.applicationDate = applicationDate;
        this.applicationPassword = applicationPassword;
        this.notes = notes;
    }

    // Standard getters and setters with comments for each method.
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getJobTitle() {
        return jobTitle;
    }

    public void setJobTitle(String jobTitle) {
        this.jobTitle = jobTitle;
    }

    public String getCompany() {
        return company;
    }

    public void setCompany(String company) {
        this.company = company;
    }

    public String getCompanyUrl() {
        return companyUrl;
    }

    public void setCompanyUrl(String companyUrl) {
        this.companyUrl = companyUrl;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public Date getApplicationDate() {
        return applicationDate;
    }

    public void setApplicationDate(Date applicationDate) {
        this.applicationDate = applicationDate;
    }

    public String getApplicationPassword() {
        return applicationPassword;
    }

    public void setApplicationPassword(String applicationPassword) {
        this.applicationPassword = applicationPassword;
    }

    public String getNotes() {
        return notes;
    }

    public void setNotes(String notes) {
        this.notes = notes;
    }

    // toString method for easy logging and debugging.
    @Override
    public String toString() {
        return "Job{" +
                "id=" + id +
                ", jobTitle='" + jobTitle + '\'' +
                ", company='" + company + '\'' +
                ", companyUrl='" + companyUrl + '\'' +
                ", status='" + status + '\'' +
                ", applicationDate=" + applicationDate +
                ", applicationPassword='" + applicationPassword + '\'' +
                ", notes='" + notes + '\'' +
                '}';
    }

    // Additional methods related to the Job entity can be added below.
    // Example: A method to update the status of the job application.
    public void updateStatus(String newStatus) {
        // Additional business logic can be applied here.
        this.status = newStatus;
    }
}
