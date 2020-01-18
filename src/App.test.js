import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import App from './App';

test('page renders without error', () => {
  const { getByText } = render(<App />);
  const welcomeElement = getByText(/Find out your this is us character/i);
  expect(welcomeElement).toBeInTheDocument();
});

test('page renders first question on load', () => {
  const { getByText } = render(<App />);
  const firstQuestion = getByText(/first question/i);
  expect(firstQuestion).toBeInTheDocument()


});

test('page shows second question after image click', () => {
  const { getByText } = render(<App />);
  fireEvent.click(getByText('Squats'))
  const secondQuestion = getByText(/second question/i);
  expect(secondQuestion).toBeInTheDocument()

});

test.skip('after last image is clicked, display results', async () => {
  const { getByText, findByText } = render(<App />);
  fireEvent.click(getByText('Bench Press'))
  fireEvent.click(getByText('Burger'))
  fireEvent.click(getByText('Video game'))

  const testResults = await findByText(/Result/i);
  expect(testResults).toHaveTextContent('Randall Pearson');
});
