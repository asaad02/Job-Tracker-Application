import React from 'react';
import PropTypes from 'prop-types';
import Alert from 'react-bootstrap/Alert';

function ErrorAlert({ errorMessage, onClose }) {
  return (
    <Alert variant="danger" onClose={onClose} dismissible>
      {errorMessage}
    </Alert>
  );
}

ErrorAlert.propTypes = {
  errorMessage: PropTypes.string.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default ErrorAlert;
