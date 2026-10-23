import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { MobileMenu } from '../src/components/layout/MobileMenu';
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from '../src/components/ui/Accordion';

describe('MobileMenu Component', () => {
  it('renders nothing when closed', () => {
    const triggerRef = { current: document.createElement('button') };
    render(
      <MemoryRouter>
        <MobileMenu isOpen={false} onClose={vi.fn()} triggerRef={triggerRef} />
      </MemoryRouter>
    );

    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
  });

  it('renders navigation links and closes on Escape key', () => {
    const onClose = vi.fn();
    const triggerBtn = document.createElement('button');
    document.body.appendChild(triggerBtn);
    const triggerRef = { current: triggerBtn };

    render(
      <MemoryRouter>
        <MobileMenu isOpen={true} onClose={onClose} triggerRef={triggerRef} />
      </MemoryRouter>
    );

    expect(screen.getByRole('dialog', { name: /mobile navigation/i })).toBeInTheDocument();
    expect(screen.getByText('For students')).toBeInTheDocument();
    expect(screen.getByText('Pricing')).toBeInTheDocument();

    // Fire Escape key
    fireEvent.keyDown(window, { key: 'Escape' });
    expect(onClose).toHaveBeenCalled();

    document.body.removeChild(triggerBtn);
  });
});

describe('Accordion Component', () => {
  it('expands and collapses items properly', () => {
    render(
      <Accordion type="single" collapsible>
        <AccordionItem value="item-1">
          <AccordionTrigger>Question 1</AccordionTrigger>
          <AccordionContent>Answer 1</AccordionContent>
        </AccordionItem>
      </Accordion>
    );

    const trigger = screen.getByRole('button', { name: /question 1/i });
    expect(trigger).toHaveAttribute('data-state', 'closed');

    fireEvent.click(trigger);
    expect(trigger).toHaveAttribute('data-state', 'open');
    expect(screen.getByText('Answer 1')).toBeVisible();

    fireEvent.click(trigger);
    expect(trigger).toHaveAttribute('data-state', 'closed');
  });
});
