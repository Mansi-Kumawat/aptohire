import { describe, it, expect } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import { MemoryRouter, Routes, Route } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { Home } from '../src/pages/Home';
import { Pricing } from '../src/pages/Pricing';
import { GetStarted } from '../src/pages/GetStarted';
import { VerifyCredential } from '../src/pages/VerifyCredential';
import { NotFound } from '../src/pages/NotFound';
import { PageShell } from '../src/components/layout/PageShell';

describe('End-to-End Page & User Flow Scenarios', () => {
  it('E2E: Home page renders hero, scorecard, and all marketing sections', () => {
    render(
      <HelmetProvider>
        <MemoryRouter initialEntries={['/']}>
          <PageShell>
            <Home />
          </PageShell>
        </MemoryRouter>
      </HelmetProvider>
    );

    // Header & Brand
    expect(screen.getByRole('banner')).toBeInTheDocument();
    expect(screen.getAllByLabelText(/AptoHire home/i).length).toBeGreaterThan(0);

    // Hero Section
    expect(screen.getByRole('heading', { level: 1, name: /hired for what you can do/i })).toBeInTheDocument();
    expect(screen.getByText(/sample scorecard/i)).toBeInTheDocument();

    // Sections
    expect(screen.getByRole('heading', { name: /how it works/i })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: /for universities/i })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: /for organizations/i })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: /frequently asked questions/i })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: /show what you can do/i })).toBeInTheDocument();

    // Footer
    expect(screen.getByRole('contentinfo')).toBeInTheDocument();
  });

  it('E2E: Pricing page renders tiers and capability table', () => {
    render(
      <HelmetProvider>
        <MemoryRouter initialEntries={['/pricing']}>
          <PageShell>
            <Pricing />
          </PageShell>
        </MemoryRouter>
      </HelmetProvider>
    );

    expect(screen.getByRole('heading', { level: 1, name: /transparent plans for verified talent/i })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'Students' })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'Universities' })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'Organizations' })).toBeInTheDocument();
    expect(screen.getByText(/compare capabilities/i)).toBeInTheDocument();
  });

  it('E2E: Chooser page renders all 3 audience pathways', () => {
    render(
      <HelmetProvider>
        <MemoryRouter initialEntries={['/get-started?intent=student']}>
          <PageShell>
            <GetStarted />
          </PageShell>
        </MemoryRouter>
      </HelmetProvider>
    );

    expect(screen.getByRole('heading', { name: /where do you want to start\?/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /start as a student/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /apply for university access/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /request organization access/i })).toBeInTheDocument();
  });

  it('E2E: Public credential verification renders correctly for full credential', async () => {
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
      expect(screen.getByText(/Uni A/i)).toBeInTheDocument();
      expect(screen.getByText('React')).toBeInTheDocument();
      expect(screen.getByText('TypeScript')).toBeInTheDocument();
      expect(screen.getByText('REST APIs')).toBeInTheDocument();
      expect(screen.getByText(/how to read this/i)).toBeInTheDocument();
    });
  });

  it('E2E: 404 page renders calm error with return button', () => {
    render(
      <HelmetProvider>
        <MemoryRouter initialEntries={['/non-existent-page']}>
          <NotFound />
        </MemoryRouter>
      </HelmetProvider>
    );

    expect(screen.getByRole('heading', { name: '404' })).toBeInTheDocument();
    expect(screen.getByText(/that page doesn't exist/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /go home/i })).toBeInTheDocument();
  });
});
