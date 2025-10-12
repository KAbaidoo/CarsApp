import { render, screen, fireEvent } from '@testing-library/react';
import App from './App';
import AddCar from './components/AddCar';

// Render-based snapshot using testing-library
test('renders AddCar component correctly', () => {
  const { container } = render(<AddCar />);
  // basic smoke: button should be present
  expect(screen.getByText(/Add Car/i)).toBeInTheDocument();
  // snapshot the DOM output
  expect(container.innerHTML).toMatchSnapshot();
});

// Test if main components render and dialog opens
test('open add car dialog', () => {
  render(<App />);
  const addButton = screen.getByText(/Add Car/i);
  fireEvent.click(addButton);

  const dialog = screen.getByRole('dialog');
  expect(dialog).toHaveTextContent(/Add New Car/i);
});
