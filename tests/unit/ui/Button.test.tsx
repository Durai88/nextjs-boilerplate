// src/components/ui/Button.test.tsx
import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/react';
import Button from '../../../src/components/ui/Button';

describe('Button component', () => {
  it('renders correctly', () => {
    const { getByText } = render(<Button>Click me</Button>);
    expect(getByText('Click me')).toBeTruthy();
  });
});
