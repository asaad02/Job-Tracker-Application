import React from 'react';
import { render, screen, cleanup } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import { act } from 'react-dom/test-utils';
import EditJobForm from '../HomePage/EditJobModal/EditJobForm';

describe('EditJobForm Component', () => {
  const mockJob = {
    jobTitle: 'Software Developer',
    company: 'Example Company',
    companyUrl: 'https://example.com',
    status: 'Applied',
    applicationDate: '2022-01-01',
    applicationPassword: 'secret123',
    notes: 'Initial notes',
  };

  // Clean up the DOM after each test
  afterEach(cleanup);

  it('should render with initial job values and allow updates to be submitted', async () => {
    const mockOnSubmit = jest.fn();
    render(<EditJobForm job={mockJob} onSubmit={mockOnSubmit} />);

    // Check if the form fields are pre-populated with the job's current values
    expect(screen.getByLabelText(/Job Title/i)).toHaveValue(mockJob.jobTitle);
    expect(screen.getByLabelText(/Company Name/i)).toHaveValue(mockJob.company);
    expect(screen.getByLabelText(/Company URL/i)).toHaveValue(
      mockJob.companyUrl,
    );
    expect(screen.getByLabelText(/Status/i)).toHaveValue(mockJob.status);
    expect(screen.getByLabelText(/Application Date/i)).toHaveValue(
      mockJob.applicationDate,
    );
    expect(screen.getByLabelText(/Application Password/i)).toHaveValue(
      mockJob.applicationPassword,
    );
    expect(screen.getByLabelText(/Notes/i)).toHaveValue(mockJob.notes);

    await act(async () => {
      // Update the job title and company name
      await userEvent.clear(screen.getByLabelText(/Job Title/i));
      await userEvent.type(
        screen.getByLabelText(/Job Title/i),
        'Updated Software Developer',
      );
    });

    // Submit the form
    await userEvent.click(screen.getByRole('button', { name: /Update Job/i }));
  });
});
