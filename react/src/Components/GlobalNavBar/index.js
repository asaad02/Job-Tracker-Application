import React from 'react';
import PropTypes from 'prop-types';
import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';

function GlobalNavBar({ appName, pageName }) {
  return (
    <Navbar className="bg-body-tertiary">
      <Container>
        {/* If Navbar and Container inherently render <nav> and <div> respectively,
                an additional <div> wrapper might not be necessary. */}
        <Navbar.Brand href="/">{appName}</Navbar.Brand>
        <div>{pageName}</div>
      </Container>
    </Navbar>
  );
}

GlobalNavBar.propTypes = {
  appName: PropTypes.string.isRequired,
  pageName: PropTypes.string,
};

GlobalNavBar.defaultProps = {
  pageName: '', // You can set this to any default string value you deem appropriate
};

export default GlobalNavBar;
