import React from 'react';
import PropTypes from 'prop-types';
import JobItem from '../JobItemModel/JobItem';

function JobList({ jobs, onEdit, onDelete }) {
  return (
    <div className="container mt-4">
      {jobs.length === 0 ? (
        <div className="alert alert-info" role="alert">
          No jobs to display. Start adding some!
        </div>
      ) : (
        <div className="row g-4">
          {jobs.map((job) => (
            <div className="col-md-6 col-lg-4" key={job.id}>
              <JobItem job={job} onEdit={onEdit} onDelete={onDelete} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

JobList.propTypes = {
  jobs: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      jobTitle: PropTypes.string.isRequired,
      company: PropTypes.string.isRequired,
      status: PropTypes.string.isRequired,
    }),
  ).isRequired,
  onEdit: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
};

export default JobList;
