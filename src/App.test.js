import { render, screen, fireEvent } from '@testing-library/react';
import App from './App';

test('open add car dialog', () => {
  render(<App />);
  const addButton = screen.getByText(/Add Car/i);
  fireEvent.click(addButton);

  const dialog = screen.getByRole('dialog');
  expect(dialog).toHaveTextContent(/Add New Car/i);
});
