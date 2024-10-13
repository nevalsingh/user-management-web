import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import EmailInput from './EmailInput';

describe('EmailInput Unit Test', () => {
  let setIsValid;

  beforeEach(() => {
    setIsValid = jest.fn();
  });

  test('renders EmailInput correctly', () => {
    render(
      <EmailInput 
        value="" 
        onChange={() => {}} 
        setIsValid={setIsValid} 
      />
    );

    expect(screen.getByLabelText(/Email/i)).toBeInTheDocument();
  });

  test('error message for invalid email and calls setIsValid(false)', () => {
    const { getByLabelText } = render(
      <EmailInput 
        value="invalid-email" 
        onChange={() => {}} 
        setIsValid={setIsValid} 
      />
    );

    const emailInput = getByLabelText(/Email/i);

    fireEvent.change(emailInput, { target: { value: 'invalid-email' } });

    expect(screen.getByText(/Please enter a valid email address./i)).toBeInTheDocument();
    expect(setIsValid).toHaveBeenCalledWith(false);
  });

  test('no error message for valid email and calls setIsValid(true)', () => {
    const { getByLabelText } = render(
      <EmailInput 
        value="valid@example.com" 
        onChange={() => {}} 
        setIsValid={setIsValid} 
      />
    );

    const emailInput = getByLabelText(/Email/i);

    fireEvent.change(emailInput, { target: { value: 'valid@example.com' } });

    expect(screen.queryByText(/Please enter a valid email address./i)).not.toBeInTheDocument();
    expect(setIsValid).toHaveBeenCalledWith(true);
  });
});
