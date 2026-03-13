---
title:        Frontend Testing Guide
section:      04-frontend
last-updated: 2025-03-13
maintained-by:QA Tester
status:       Approved
---

# 🧪 Frontend Testing Guide

Duo Designs uses **Vitest** for testing because it is extremely fast and integrates perfectly with Vite.

## 🛠️ Testing Tools
- **Vitest:** The primary test runner.
- **React Testing Library (RTL):** For component-level rendering and event testing.
- **MSW (Mock Service Worker):** For mocking API responses without a live backend.
- **Playwright:** (Staged for future) End-to-end browser testing.

---

## 🏗️ Writing a Component Test
Place your test files in `src/components/__tests__/` or next to the component (e.g. `Button.test.jsx`).

```javascript
import { render, screen, fireEvent } from '@testing-library/react';
import Button from '../common/Button';

describe('Button Component', () => {
  it('renders correctly with primary variant', () => {
    render(<Button variant="primary">ORDER NOW</Button>);
    const btn = screen.getByText(/ORDER NOW/i);
    expect(btn).toHaveClass('btn-primary');
  });

  it('calls onClick when clicked', () => {
    const handleClick = vi.fn();
    render(<Button onClick={handleClick}>CLICK ME</Button>);
    fireEvent.click(screen.getByText(/CLICK ME/i));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });
});
```

---

## 🔄 Testing Global State (Zustand)
You can test state transitions without rendering components.

```javascript
import useCartStore from '../store/cartStore';

describe('Cart Store', () => {
  beforeEach(() => useCartStore.getState().clearCart());

  it('adds an item to the cart', () => {
    useCartStore.getState().addItem({ id: 1, name: 'T-Shirt' });
    expect(useCartStore.getState().items).toHaveLength(1);
  });
});
```

---

## 🚀 Running Tests
```bash
npm run test          # Run in CLI
npm run test:ui       # Run in browser UI
npm run test:coverage # Check which files aren't tested
```

## ✅ Manual Testing Checklist
While automated tests are great, always perform a **Vibe Check** manually:
- [ ] Header logo navigates to home.
- [ ] Cart drawer opens/closes smoothly on mobile.
- [ ] Search results show correct item mocks.
- [ ] Lime colors are vibrant on different screens.

---
[Related: 11-testing/overview.md](../11-testing/overview.md) | [Home](../README.md)
