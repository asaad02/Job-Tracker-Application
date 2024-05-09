import React, { useState } from 'react';
import PropTypes from 'prop-types';
// AddJobForm component allows users to add new job entries.
// It uses React's useState hook to manage form state and handle submission.
function AddJobForm({ onSubmit }) {
  // State hooks for each input field corresponding to the Job entity in the backend.
  const [jobTitle, setJobTitle] = useState('');
  const [company, setCompany] = useState('');
  const [companyUrl, setCompanyUrl] = useState('');
  const [status, setStatus] = useState('Applied');
  const [applicationDate, setApplicationDate] = useState('');
  const [applicationPassword, setApplicationPassword] = useState('');
  const [notes, setNotes] = useState('');
  // handleSubmit is called when the user submits the form.
  // It prevents the default form submission action, calls the onSubmit prop with form data, and resets the form fields.
  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({
      jobTitle,
      company,
      companyUrl,
      status,
      applicationDate,
      applicationPassword,
      notes,
    });
    // Reset form fields after submitting
    setJobTitle('');
    setCompany('');
    setCompanyUrl('');
    setStatus('Applied');
    setApplicationDate('');
    setApplicationPassword('');
    setNotes('');
  };
  // The form includes various input fields, each with a corresponding state hook and change handler.
  // Required attribute is used to ensure the form cannot be submitted with empty essential fields.
  // The form uses Bootstrap classes for styling.
  return (
    <div className="container my-4">
      <div className="row justify-content-center">
        <div className="col-lg-8">
          <div className="card shadow-sm">
            <div className="card-body">
              <h2 className="card-title text-center mb-4">Add New Job</h2>
              <form onSubmit={handleSubmit}>
                {/* Input fields are grouped using form-group for better spacing and layout */}
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
                  <div className="invalid-feedback">Job Title is required.</div>
                </div>
                {/* Company Name Input */}
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
                  <div className="invalid-feedback">
                    Company Name is required.
                  </div>
                </div>
                {/* Company URL Input */}
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
                  <div className="invalid-feedback">Status is required.</div>
                </div>
                {/* Application Date Input */}
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
                  <div className="invalid-feedback">
                    Application Date is required.
                  </div>
                </div>
                {/* Application Password Input */}
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
                {/* Notes Input */}
                <div className="form-group mb-4">
                  <label htmlFor="notes" className="form-label">
                    Notes (optional)
                  </label>
                  <textarea
                    className="form-control"
                    id="notes"
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    rows="3"
                  />
                </div>
                {/* Submit Button */}
                <div className="text-center">
                  {/* submit button only works when all required fields are filled out */}
                  <button
                    type="submit"
                    className="btn btn-primary"
                    disabled={
                      !jobTitle || !company || !status || !applicationDate
                    }
                  >
                    Submit Job
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
// Define prop types for validation
AddJobForm.propTypes = {
  onSubmit: PropTypes.func.isRequired, // Specifies that onSubmit is a required function prop
};

export default AddJobForm;
