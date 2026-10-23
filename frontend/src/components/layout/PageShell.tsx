import React from 'react';
import { SkipLink } from './SkipLink';
import { PrototypeNotice } from './PrototypeNotice';
import { Header } from './Header';
import { Footer } from './Footer';
import { NoticeBar } from './NoticeBar';
import { ScrollProgressBar } from './ScrollProgressBar';

interface PageShellProps {
  children: React.ReactNode;
  className?: string;
}

export const PageShell: React.FC<PageShellProps> = ({ children, className = '' }) => {
  return (
    <div className="min-h-screen flex flex-col bg-canvas text-ink antialiased">
      <ScrollProgressBar />
      <SkipLink />
      <PrototypeNotice />
      <Header />
      <main id="main-content" className={`flex-1 w-full outline-none ${className}`}>
        {children}
      </main>
      <Footer />
      <NoticeBar />
    </div>
  );
};
