import { render, screen } from '@testing-library/react';
import App from '../App';

test('renders the main dashboard', () => {
    render(<App />);
    const dashboardElement = screen.getByText(/Dashboard/i);
    expect(dashboardElement).toBeInTheDocument();
});

test('renders Kanban board', () => {
    render(<App />);
    const kanbanElement = screen.getByText(/Kanban/i);
    expect(kanbanElement).toBeInTheDocument();
});
