import { render, screen } from '@testing-library/react';
import Button from './index';

const buttonCaption = 'test button';

test('button caption check', () => {
  render(<Button>{buttonCaption}</Button>);
  expect(screen.getByText(buttonCaption).textContent).toBe(buttonCaption);
});


