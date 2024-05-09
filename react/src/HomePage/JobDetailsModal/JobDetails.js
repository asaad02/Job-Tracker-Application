import React from 'react';
import PropTypes from 'prop-types';

// JobDetails component for displaying detailed information about a job application.
function JobDetails({ job }) {
  // Helper function to format date in a readable format.
  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  // Renders the detailed view of job application information, including the job title, company, status, application date, job URL, application password, and notes.
  // Note: It is important to secure any sensitive information such as applicationPassword if it is not meant to be displayed.
  return (
    <div className="container mt-4">
      <div className="card border-0">
        <div className="card-body">
          <h3 className="card-title mb-4">Job Application Details</h3>
          <dl className="row">
            <dt className="col-sm-3">Job Title:</dt>
            <dd className="col-sm-9">{job.jobTitle}</dd>

            <dt className="col-sm-3">Company:</dt>
            <dd className="col-sm-9">{job.company}</dd>

            <dt className="col-sm-3">Status:</dt>
            <dd className="col-sm-9">{job.status}</dd>

            <dt className="col-sm-3">Application Date:</dt>
            <dd className="col-sm-9">{formatDate(job.applicationDate)}</dd>

            <dt className="col-sm-3">Job URL:</dt>
            <dd className="col-sm-9">
              <a
                href={job.companyUrl}
                target="_blank"
                rel="noopener noreferrer"
              >
                {job.companyUrl}
              </a>
            </dd>

            <dt className="col-sm-3">Notes:</dt>
            <dd className="col-sm-9">{job.notes || 'None'}</dd>
          </dl>
        </div>
      </div>
    </div>
  );
}

JobDetails.propTypes = {
  job: PropTypes.shape({
    jobTitle: PropTypes.string.isRequired,
    company: PropTypes.string.isRequired,
    status: PropTypes.string.isRequired,
    applicationDate: PropTypes.string.isRequired,
    companyUrl: PropTypes.string,
    notes: PropTypes.string,
  }).isRequired,
};

export default JobDetails;
