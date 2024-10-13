import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import UsernameInput from './UsernameInput';

describe('UsernameInput Unit Test', () => {
  let setIsValid;

  beforeEach(() => {
    setIsValid = jest.fn();
  });

  test('renders UsernameInput correctly', () => {
    render(
      <UsernameInput 
        value="" 
        onChange={() => {}} 
        setIsValid={setIsValid} 
      />
    );

    expect(screen.getByLabelText(/Username/i)).toBeInTheDocument();
  });

  test('error message for invalid username and calls setIsValid(false)', () => {
    const { getByLabelText } = render(
      <UsernameInput 
        value="invalid username!" 
        onChange={() => {}} 
        setIsValid={setIsValid} 
      />
    );

    const usernameInput = getByLabelText(/Username/i);

    fireEvent.change(usernameInput, { target: { value: 'invalid username!' } });

    expect(screen.getByText(/Please enter a valid username./i)).toBeInTheDocument();
    expect(setIsValid).toHaveBeenCalledWith(false);
  });

  test('no error message for valid username and calls setIsValid(true)', () => {
    const { getByLabelText } = render(
      <UsernameInput 
        value="valid-username123" 
        onChange={() => {}} 
        setIsValid={setIsValid} 
      />
    );

    const usernameInput = getByLabelText(/Username/i);

    fireEvent.change(usernameInput, { target: { value: 'valid-username123' } });

    expect(screen.queryByText(/Please enter a valid username./i)).not.toBeInTheDocument();
    expect(setIsValid).toHaveBeenCalledWith(true);
  });
});
