import { render } from '@testing-library/react';
import SEOHead from '../components/SEOHead';
import Head from 'next/head';

describe('SEOHead', () => {
  it('renders the correct title and meta description', () => {
    render(
      <>
        <SEOHead title="Test Title" description="Test description." url="https://example.com" />
        <Head />
      </>
    );
    expect(document.title).toBe('Test Title | ZapTools');
    const meta = document.querySelector('meta[name="description"]');
    expect(meta?.getAttribute('content')).toBe('Test description.');
  });
}); 