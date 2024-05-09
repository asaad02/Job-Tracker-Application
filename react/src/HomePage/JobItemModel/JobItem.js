import React from 'react';
import PropTypes from 'prop-types';

function JobItem({ job, onEdit, onDelete }) {
  return (
    <div className="card mb-3 shadow-sm">
      <div className="card-body">
        <h5 className="card-title">
          {job.jobTitle}
          {' '}
          at
          {' '}
          {job.company}
        </h5>
        <p className="card-text">
          <strong>Status:</strong>
          {' '}
          {job.status}
        </p>
        <div className="d-flex justify-content-end">
          <button
            className="btn btn-outline-primary me-2"
            onClick={() => onEdit(job)}
            title="Edit"
            aria-label="Edit"
            type="button"
          >
            <i className="fas fa-edit" />
          </button>
          <button
            className="btn btn-outline-danger"
            onClick={() => onDelete(job.id)}
            title="Delete"
            aria-label="Delete"
            type="button"
          >
            <i className="fas fa-trash-alt" />
          </button>
        </div>
      </div>
    </div>
  );
}

JobItem.propTypes = {
  job: PropTypes.shape({
    id: PropTypes.number.isRequired,
    jobTitle: PropTypes.string.isRequired,
    company: PropTypes.string.isRequired,
    status: PropTypes.string.isRequired,
  }).isRequired,
  onEdit: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
};

export default JobItem;
