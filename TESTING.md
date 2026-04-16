# Testing & Logging Guide

## Testing

### Frontend Tests (Vitest + React Testing Library)

**Location:** `src/__tests__/`

#### Running Tests

```bash
# Run tests in watch mode
npm test

# Run tests once
npm run test:run

# Run tests with coverage report
npm run test:coverage

# Run tests with UI (if installed)
npm run test:ui
```

#### Test Files

- `booking.test.js` - Unit tests for booking utilities
- `logger.test.js` - Unit tests for the logger
- `BookingEngine.test.jsx` - Component tests for the booking engine

#### Writing Tests

```javascript
import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';

describe('Component Name', () => {
  it('should render correctly', () => {
    render(<Component />);
    expect(screen.getByText('Expected Text')).toBeInTheDocument();
  });
});
```

### Backend Tests (Jest + Supertest)

**Location:** `server/__tests__/`

#### Running Tests

```bash
cd server

# Run tests
npm test

# Run tests in watch mode
npm run test:watch

# Run tests with coverage
npm run test:coverage
```

#### Test Files

- `integration.test.js` - Integration tests for API endpoints

---

## Logging

### Client-Side Logging

The application uses a centralized logger (`src/utils/logger.js`) that:
- Logs to console in development
- Sends logs to the server via `/api/logs` endpoint
- Automatically captures unhandled errors and promise rejections
- Flushes logs on page unload using `sendBeacon`

#### Usage

```javascript
import { logger } from '../utils/logger';

logger.debug('Debug message', { data: 'optional' });
logger.info('Info message', { userId: 123 });
logger.warn('Warning message');
logger.error('Error message', error);
```

### Server-Side Logging

**Log file location:** `server/logs.txt`

The server receives client logs via the `/api/logs` endpoint and appends them to `logs.txt`.

#### Log Format

```
[TIMESTAMP] LEVEL: Message | Data: {...} | URL: http://...
```

#### Example Log Entry

```
[2026-04-15T10:30:00.000Z] INFO: Loading booking data | Data: {"bookingsCount":5,"customersCount":3} | URL: http://localhost:5173/booking
```

### Log Levels

- **DEBUG** - Detailed information for debugging
- **INFO** - General operational information
- **WARN** - Warning conditions that should be investigated
- **ERROR** - Error conditions that need immediate attention

---

## Test Coverage

### Frontend Coverage Goals

- Utilities: 100% coverage
- Context providers: 80%+ coverage
- Components: 70%+ coverage

### Backend Coverage Goals

- API routes: 100% coverage
- Database operations: 90%+ coverage
- Error handling: 100% coverage

---

## CI/CD Integration

Add these commands to your CI/CD pipeline:

```yaml
# Frontend tests
- npm ci
- npm run test:run
- npm run test:coverage

# Backend tests
- cd server && npm ci
- npm test
- npm run test:coverage
```

---

## Troubleshooting

### Tests Failing

1. Ensure the database is in a clean state: `cd server && npx prisma db push`
2. Clear test cache: `npm test -- --clearCache`
3. Run tests in isolation: `npm test -- --runInBand`

### Logs Not Appearing

1. Check server is running: `curl http://localhost:3001/api/health`
2. Verify log endpoint: `curl -X POST http://localhost:3001/api/logs -H "Content-Type: application/json" -d '{"logs":[{"level":"INFO","message":"test"}]}'`
3. Check logs.txt permissions: `ls -la server/logs.txt`
