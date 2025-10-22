# Tracking & Analytics in Bsky Social

This document explains how tracking, analytics, and monitoring work in the Puru Social codebase.

## Overview

The app uses multiple tracking systems for different purposes:
- **Statsig** - Feature flags & A/B testing
- **Bitdrift** - Performance monitoring
- **Sentry** - Error tracking & crash reporting
- **Custom Logger** - Centralized logging system

## Core Tracking Services

### 1. Statsig (`statsig-react-native-expo`)
**Purpose**: Feature flags, A/B testing, and user behavior analytics

**Key Files**:
- `src/lib/statsig/statsig.ts` - Main Statsig integration
- `src/state/session/logging.ts` - Session tracking

**Usage**:
```typescript
import {logEvent, useGate} from '#/lib/statsig/statsig'

// Feature flags
const isEnabled = useGate('longboarding')

// Event tracking
logEvent('profile:addToStarterPack', {})
logEvent('explore:module:searchButtonPress', {module: metricsTag})
```

### 2. Bitdrift (`@bitdrift/react-native`)
**Purpose**: Performance monitoring and metrics

**Key Files**:
- `src/logger/transports/bitdrift.ts` - Bitdrift transport configuration

**Usage**:
```typescript
import {logger} from '#/logger'

// Performance metrics
logger.metric('live:card:open', {subject: profile.did, from: 'post'})
```

### 3. Sentry (`@sentry/react-native`)
**Purpose**: Error tracking, crash reporting, and performance monitoring

**Configuration**:
- `package.json` includes `@sentry/react-native` and `@sentry/webpack-plugin`
- Source map uploads configured in build scripts
- Jest configuration includes Sentry in transform patterns

**Usage**:
```typescript
import {logger} from '#/logger'

// Error tracking
logger.error('Failed to refresh follows', {error: err})
```

### 4. Custom Logger System
**Purpose**: Centralized logging with multiple transports

**Key Files**:
- `src/logger/index.ts` - Main logger interface
- `src/logger/metrics.ts` - Event metrics definitions
- `src/logger/transports/` - Various transport implementations

**Usage**:
```typescript
import {logger} from '#/logger'

// Different log levels
logger.debug('Debug information')
logger.warn('Warning message')
logger.error('Error occurred', {context})
logger.metric('event:name', {data})
```

## Tracking Patterns

### Event Tracking
Events are tracked throughout the app using `logEvent()`:

```typescript
// User interactions
logEvent('profile:addToStarterPack', {})
logEvent('explore:module:searchButtonPress', {module: metricsTag})

// Feed interactions
logEvent('feed:refresh', {feed}, {statsig: false})
```

### Feature Flags
Feature flags control functionality and A/B tests:

```typescript
// Check if feature is enabled
const isEnabled = useGate('longboarding')

// Conditional rendering
{isEnabled && <LongboardingFeature />}
```

### Performance Metrics
Performance is tracked for various user actions:

```typescript
// Video interactions
logger.metric('live:card:open', {subject: profile.did, from: 'post'})

// Profile interactions
logger.metric('profile:addToStarterPack', {})
```

### Error Tracking
Errors are automatically captured and logged:

```typescript
// Manual error logging
logger.error('Failed to refresh follows', {error: err})

// Session errors
addSessionErrorLog(did, event)
```

## Configuration

### Package Dependencies
```json
{
  "dependencies": {
    "@bitdrift/react-native": "^0.6.8",
    "@sentry/react-native": "~6.20.0",
    "statsig-react-native-expo": "^4.6.1"
  },
  "devDependencies": {
    "@sentry/webpack-plugin": "^3.2.2"
  }
}
```

### Build Configuration
- Sentry source map uploads: `"upload-native-sourcemaps": "npx sentry-expo-upload-sourcemaps dist"`
- Jest includes Sentry in transform patterns
- Webpack plugin for Sentry integration

## Session Tracking

Session tracking is handled in `src/state/session/logging.ts`:

```typescript
// Session error logging
export function addSessionErrorLog(did: string, event: AtpSessionEvent)

// Session debug logging
export function addSessionDebugLog(log: Log)
```

## Metrics Definitions

Event metrics are defined in `src/logger/metrics.ts` with TypeScript types for type safety:

```typescript
export interface MetricEvents {
  'account:create:success': {
    email: string
    handle: string
    service: string
  }
  'explore:module:searchButtonPress': {
    module: 'suggestedAccounts' | 'suggestedFeeds'
  }
  // ... more events
}
```

## Privacy Considerations

- All tracking respects user privacy settings
- Session data is anonymized where possible
- Error tracking excludes sensitive information
- Performance metrics don't include personal data

## Development vs Production

- Development: Enhanced logging and debugging
- Production: Optimized tracking with reduced verbosity
- Error reporting: More detailed in development, sanitized in production

## Monitoring & Observability

The app provides comprehensive observability through:
- Real-time error tracking via Sentry
- Performance monitoring via Bitdrift
- User behavior analytics via Statsig
- Custom metrics and logging via the logger system

This multi-layered approach ensures comprehensive monitoring of app health, user experience, and feature performance.
