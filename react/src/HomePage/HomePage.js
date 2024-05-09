import React, { useState, useEffect, useCallback } from 'react';
import Container from 'react-bootstrap/Container';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import ErrorAlert from '../Components/ErrorAlert';
import LoadingSpinner from '../Components/LoadingSpinner';
import GlobalNavBar from '../Components/GlobalNavBar';
import AddJobForm from './AddJobs/AddJobForm';
import EditJobForm from './EditJobModal/EditJobForm';
import JobList from './JobListModal/JobList';

function HomePage() {
  const [jobs, setJobs] = useState([]);
  const [jobCount, setJobCount] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [currentJob, setCurrentJob] = useState(null); // State for the job being edited
  const [showEditModal, setShowEditModal] = useState(false); // State to control visibility of the edit modal

  // Helper function to handle API response
  const handleApiResponse = (response) => {
    if (!response.ok) throw new Error('Network response was not ok');
    return response.json();
  };

  // Fetch all jobs
  const fetchAllJobs = useCallback(() => {
    setLoading(true);
    fetch('/api/jobs/all')
      .then(handleApiResponse)
      .then((data) => setJobs(Array.isArray(data) ? data : []))
      .then(() => setLoading(false))
      .catch((errorResponse) => {
        setErrorMessage(errorResponse.message);
        setError(true);
        setLoading(false);
        setJobs([]);
      });
  }, []);

  // count the number of jobs
  const countJobs = useCallback(() => {
    setLoading(true);
    fetch('/api/jobs/count')
      .then(handleApiResponse)
      .then((data) => {
        setJobCount(data);
        setLoading(false);
      })
      .catch((errorResponse) => {
        setErrorMessage(errorResponse.message);
        setError(true);
        setLoading(false);
      });
  }, []);

  // Function to handle adding a new job
  const handleAddJob = (newJob) => {
    setLoading(true);
    fetch('/api/jobs/add', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newJob),
    })
      .then(handleApiResponse)
      .then(() => {
        fetchAllJobs();
        countJobs();
        setLoading(false);
      })
      .catch((errorResponse) => {
        setErrorMessage(errorResponse.message);
        setError(true);
        setLoading(false);
      });
  };

  // Function to handle updating currentJob
  const handleUpdateJob = (updatedJob) => {
    setLoading(true);
    fetch(`/api/jobs/update/${updatedJob.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updatedJob),
    })
      .then(handleApiResponse)
      .then(() => {
        fetchAllJobs();
        setLoading(false);
        setShowEditModal(false);
      })
      .catch((errorResponse) => {
        setErrorMessage(errorResponse.message);
        setError(true);
        setLoading(false);
      });
  };

  // Function to handle deleting a job and reload the jobs
  const handleDeleteJob = (jobId) => {
    setLoading(true);
    fetch(`/api/jobs/delete/${jobId}`, {
      method: 'DELETE',
    })
      .then(handleApiResponse)
      .then(() => {
        fetchAllJobs();
        countJobs();
        setLoading(false);
      })
      .catch((errorResponse) => {
        setErrorMessage(errorResponse.message);
        setError(false);
        setLoading(false);
      });
  };

  // Fetch all jobs and count after every api call
  useEffect(() => {
    fetchAllJobs();
    countJobs();
  }, [fetchAllJobs, countJobs]);

  // Function to open edit modal with selected job's details
  const handleEditClick = (job) => {
    setCurrentJob(job);
    setShowEditModal(true);
  };

  return (
    <div>
      <GlobalNavBar appName="Job Tracker" />
      {/* show the number of jobs as a badge */}
      <h1 className="text-center mt-4">
        Job Tracker
        {' '}
        <span className="badge bg-secondary">{jobCount}</span>
      </h1>
      <Container>
        {error && (
          <ErrorAlert
            errorMessage={errorMessage}
            onClose={() => setError(false)}
          />
        )}
        <AddJobForm onSubmit={handleAddJob} />
        {loading ? (
          <LoadingSpinner />
        ) : (
          <JobList
            jobs={jobs}
            onEdit={handleEditClick}
            onDelete={handleDeleteJob}
          />
        )}

        {/* Edit Job Modal */}
        <Modal show={showEditModal} onHide={() => setShowEditModal(false)}>
          <Modal.Header closeButton>
            <Modal.Title>Edit Job</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {currentJob && (
              <EditJobForm job={currentJob} onSubmit={handleUpdateJob} />
            )}
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => setShowEditModal(false)}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>
      </Container>
    </div>
  );
}

export default HomePage;
