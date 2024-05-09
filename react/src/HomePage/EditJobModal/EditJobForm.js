import React, { useState } from 'react';
import PropTypes from 'prop-types';

function EditJobForm({ job, onSubmit }) {
  // State hooks for form fields, initialized with job object properties.
  const [jobTitle, setJobTitle] = useState(job.jobTitle);
  const [company, setCompany] = useState(job.company);
  const [companyUrl, setCompanyUrl] = useState(job.companyUrl);
  const [status, setStatus] = useState(job.status);
  const [applicationDate, setApplicationDate] = useState(job.applicationDate);
  const [applicationPassword, setApplicationPassword] = useState(
    job.applicationPassword,
  );
  const [notes, setNotes] = useState(job.notes);

  // Handles form submission event.
  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({
      ...job,
      jobTitle,
      company,
      companyUrl,
      status,
      applicationDate,
      applicationPassword,
      notes,
    });
  };

  return (
    <div className="container mt-5">
      <div className="card shadow">
        <div className="card-header bg-primary text-white">
          <h2 className="card-title">Edit Job</h2>
        </div>
        <div className="card-body">
          <form onSubmit={handleSubmit}>
            <div className="form-group mb-3">
              <label htmlFor="jobTitle" className="form-label">
                Job Title
              </label>
              <input
                type="text"
                className="form-control"
                id="jobTitle"
                value={jobTitle}
                onChange={(e) => setJobTitle(e.target.value)}
                required
              />
            </div>
            <div className="form-group mb-3">
              <label htmlFor="company" className="form-label">
                Company Name
              </label>
              <input
                type="text"
                className="form-control"
                id="company"
                value={company}
                onChange={(e) => setCompany(e.target.value)}
                required
              />
            </div>
            <div className="form-group mb-3">
              <label htmlFor="companyUrl" className="form-label">
                Company URL
              </label>
              <input
                type="url"
                className="form-control"
                id="companyUrl"
                value={companyUrl}
                onChange={(e) => setCompanyUrl(e.target.value)}
              />
            </div>
            <div className="form-group mb-3">
              <label htmlFor="status" className="form-label">
                Status
              </label>
              <select
                className="form-select"
                id="status"
                value={status}
                onChange={(e) => setStatus(e.target.value)}
                required
              >
                <option value="Applied">Applied</option>
                <option value="Interview">Interview</option>
                <option value="Offer">Offer</option>
                <option value="Rejected">Rejected</option>
              </select>
            </div>
            <div className="form-group mb-3">
              <label htmlFor="applicationDate" className="form-label">
                Application Date
              </label>
              <input
                type="date"
                className="form-control"
                id="applicationDate"
                value={applicationDate}
                onChange={(e) => setApplicationDate(e.target.value)}
                required
              />
            </div>
            <div className="form-group mb-3">
              <label htmlFor="applicationPassword" className="form-label">
                Application Password (optional)
              </label>
              <input
                type="password"
                className="form-control"
                id="applicationPassword"
                value={applicationPassword}
                onChange={(e) => setApplicationPassword(e.target.value)}
              />
            </div>
            <div className="form-group mb-3">
              <label htmlFor="notes" className="form-label">
                Notes (optional)
              </label>
              <textarea
                className="form-control"
                id="notes"
                rows="3"
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
              />
            </div>
            <div className="d-grid gap-2 mt-4">
              <button className="btn btn-success" type="submit">
                Update Job
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
// Define prop types for validation
EditJobForm.propTypes = {
  job: PropTypes.shape({
    jobTitle: PropTypes.string,
    company: PropTypes.string,
    companyUrl: PropTypes.string,
    status: PropTypes.string,
    applicationDate: PropTypes.string,
    applicationPassword: PropTypes.string,
    notes: PropTypes.string,
  }).isRequired,
  onSubmit: PropTypes.func.isRequired,
};

export default EditJobForm;
