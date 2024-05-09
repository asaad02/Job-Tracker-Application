import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import { act } from 'react-dom/test-utils';
import AddJobForm from '../HomePage/AddJobs/AddJobForm';

describe('AddJobForm Component', () => {
  it('should render all form fields and submit the correct data', async () => {
    const mockOnSubmit = jest.fn();

    render(<AddJobForm onSubmit={mockOnSubmit} />);

    // Wrap the sequence of events that leads to state updates in act()
    await act(async () => {
      await userEvent.type(
        screen.getByLabelText(/Job Title/i),
        'Software Developer',
      );
      await userEvent.type(
        screen.getByLabelText(/Company Name/i),
        'Example Company',
      );
      await userEvent.type(
        screen.getByLabelText(/Company URL/i),
        'https://example.com',
      );
      // Select the status dropdown
      await userEvent.selectOptions(
        screen.getByLabelText(/Status/i),
        'Interview',
      );
      await userEvent.type(
        screen.getByLabelText(/Application Date/i),
        '2022-01-01',
      );
      await userEvent.type(
        screen.getByLabelText(/Application Password/i),
        'secret',
      );
      await userEvent.type(
        screen.getByLabelText(/Notes/i),
        'Some notes about the application',
      );
    });

    // Wrap the submit event in act()
    await act(async () => {
      await userEvent.click(
        screen.getByRole('button', { name: /Submit Job/i }),
      );
    });

    // Assert that the mockOnSubmit function was called with the expected data
    expect(mockOnSubmit).toHaveBeenCalledWith({
      jobTitle: 'Software Developer',
      company: 'Example Company',
      companyUrl: 'https://example.com',
      status: 'Interview',
      applicationDate: '2022-01-01',
      applicationPassword: 'secret',
      notes: 'Some notes about the application',
    });

    // Assert that the form resets after submission
    expect(screen.getByLabelText(/Job Title/i)).toHaveValue('');
    expect(screen.getByLabelText(/Company Name/i)).toHaveValue('');
    expect(screen.getByLabelText(/Company URL/i)).toHaveValue('');
    expect(screen.getByLabelText(/Status/i)).toHaveValue('Applied');
    expect(screen.getByLabelText(/Application Date/i)).toHaveValue('');
    expect(screen.getByLabelText(/Application Password/i)).toHaveValue('');
    expect(screen.getByLabelText(/Notes/i)).toHaveValue('');
  });

  it('should show validation feedback when required fields are missing', async () => {
    const mockOnSubmit = jest.fn();
    render(<AddJobForm onSubmit={mockOnSubmit} />);

    // Attempt to submit the form without filling out required fields
    await userEvent.click(screen.getByRole('button', { name: /Submit Job/i }));

    // Wait for potential validation feedback
    await screen.findByText(/Job Title is required./i);
    await screen.findByText(/Company name is required./i);
    await screen.findByText(/Application Date is required./i);
    await screen.findByText(/Status is required./i);

    // Assert that the mockOnSubmit function was not called
    expect(mockOnSubmit).not.toHaveBeenCalled();
  });
});
