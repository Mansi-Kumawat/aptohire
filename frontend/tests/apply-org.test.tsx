import { describe, it, expect } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { ApplyOrganization } from '../src/pages/ApplyOrganization';
import { GetStarted } from '../src/pages/GetStarted';
import { HelmetProvider } from 'react-helmet-async';

describe('ApplyOrganization form', () => {
  it('validates required fields and rejects free email domains', async () => {
    render(
      <HelmetProvider>
        <MemoryRouter>
          <ApplyOrganization />
        </MemoryRouter>
      </HelmetProvider>
    );

    const emailInput = screen.getByLabelText(/official work email/i);
    fireEvent.change(emailInput, { target: { value: 'john@gmail.com' } });

    const submitBtn = screen.getByRole('button', { name: /request access/i });
    fireEvent.click(submitBtn);

    await waitFor(() => {
      expect(screen.getByText(/please use your company work email/i)).toBeInTheDocument();
      expect(screen.getByText(/organization name must be at least 2 characters/i)).toBeInTheDocument();
    });
  });
});

describe('GetStarted page with intent query param', () => {
  it('renders three portal panels with correct actions', () => {
    render(
      <HelmetProvider>
        <MemoryRouter initialEntries={['/get-started?intent=organization']}>
          <GetStarted />
        </MemoryRouter>
      </HelmetProvider>
    );

    expect(screen.getByText(/where do you want to start\?/i)).toBeInTheDocument();
    expect(screen.getByText('Students & Early Career')).toBeInTheDocument();
    expect(screen.getByText('Universities & Placement Cells')).toBeInTheDocument();
    expect(screen.getByText('Organizations & Recruiters')).toBeInTheDocument();
  });
});
