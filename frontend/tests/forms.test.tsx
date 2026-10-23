import { describe, it, expect } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { MemoryRouter, Routes, Route } from 'react-router-dom';
import { ApplyUniversity } from '../src/pages/ApplyUniversity';
import { VerifyCredential } from '../src/pages/VerifyCredential';
import { HelmetProvider } from 'react-helmet-async';

describe('ApplyUniversity form validation and submission', () => {
  it('validates required fields and shows errors when submitted empty', async () => {
    render(
      <HelmetProvider>
        <MemoryRouter>
          <ApplyUniversity />
        </MemoryRouter>
      </HelmetProvider>
    );

    const submitBtn = screen.getByRole('button', { name: /send application/i });
    fireEvent.click(submitBtn);

    await waitFor(() => {
      expect(screen.getByText(/institution name must be at least 2 characters/i)).toBeInTheDocument();
      expect(screen.getByText(/city is required/i)).toBeInTheDocument();
      expect(screen.getByText(/state is required/i)).toBeInTheDocument();
      expect(screen.getByText(/contact name is required/i)).toBeInTheDocument();
    });
  });
});

describe('VerifyCredential states', () => {
  it('renders verified credential details for valid fixture', async () => {
    render(
      <HelmetProvider>
        <MemoryRouter initialEntries={['/verify/a1b2c3d4e5f6a7b8c9']}>
          <Routes>
            <Route path="/verify/:credentialId" element={<VerifyCredential />} />
          </Routes>
        </MemoryRouter>
      </HelmetProvider>
    );

    await waitFor(() => {
      expect(screen.getByText('Aarav S.')).toBeInTheDocument();
      expect(screen.getByText('Verified student: Uni A')).toBeInTheDocument();
      expect(screen.getByText('React')).toBeInTheDocument();
    });
  });

  it('renders not-found state for unknown fixture', async () => {
    render(
      <HelmetProvider>
        <MemoryRouter initialEntries={['/verify/0000000000000000aa']}>
          <Routes>
            <Route path="/verify/:credentialId" element={<VerifyCredential />} />
          </Routes>
        </MemoryRouter>
      </HelmetProvider>
    );

    await waitFor(() => {
      expect(screen.getByRole('heading', { name: /we couldn't find this credential/i })).toBeInTheDocument();
    });
  });
});
