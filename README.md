# timezone-codes

[![npm version](https://img.shields.io/npm/v/timezone-codes.svg)](https://www.npmjs.com/package/timezone-codes)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![CI Status](https://github.com/venkatajanapareddy/timezone-codes/workflows/CI%2FCD/badge.svg)](https://github.com/venkatajanapareddy/timezone-codes/actions)

A comprehensive, typed dataset of IANA timezone identifiers with metadata. This library provides a complete list of IANA timezone names along with their standard UTC offsets, common abbreviations, and regions. Perfect for datetime pickers, global dashboards, scheduling apps, and localization engines.

## Features

- 📦 Zero runtime dependencies
- 🔍 Complete IANA timezone dataset
- 📝 TypeScript-first with full type definitions
- 🎯 Utility functions for timezone operations
- 🌐 Support for both ESM and CommonJS
- 📊 Includes standard offsets and abbreviations
- 🧪 Thoroughly tested with Vitest

## Installation

```bash
npm install timezone-codes
```

## Usage

### Basic Usage

```typescript
import { timezones, getTimezoneByName } from 'timezone-codes';

// Access the complete timezone list
console.log(timezones);

// Get a specific timezone
const newYork = getTimezoneByName('America/New_York');
console.log(newYork);
// {
//   name: 'America/New_York',
//   standardUtcOffset: '-05:00',
//   standardAbbreviation: 'EST',
//   region: 'America'
// }
```

### CLI Usage

The package includes a CLI tool that can be used to quickly look up timezone information:

```bash
npx timezone-codes America/New_York
```

Output:

```
Timezone: America/New_York
Region: America
Standard UTC Offset: -05:00
Standard Abbreviation: EST
Current UTC Offset: -04:00
Current Abbreviation: EDT
```

### Utility Functions

```typescript
import {
  getTimezonesByRegion,
  getStandardUtcOffset,
  isValidTimezoneName,
  getCurrentTimezoneDetails,
} from 'timezone-codes';

// Get all timezones in a region
const europeTimezones = getTimezonesByRegion('Europe');
console.log(europeTimezones);

// Get standard UTC offset
const offset = getStandardUtcOffset('Asia/Tokyo');
console.log(offset); // '+09:00'

// Check if a timezone name is valid
const isValid = isValidTimezoneName('America/New_York');
console.log(isValid); // true

// Get current timezone details (including DST)
const details = await getCurrentTimezoneDetails('America/New_York');
console.log(details);
// {
//   currentUtcOffset: '-04:00', // During DST
//   currentAbbreviation: 'EDT'  // During DST
// }
```

## API Reference

### Data Types

```typescript
type IANATimezoneName = string; // e.g., 'America/New_York'
type TimezoneAbbreviation = string; // e.g., 'EST', 'JST'
type UTCOffset = string; // e.g., '-05:00', '+09:00'
type TimezoneRegion = string; // e.g., 'America', 'Asia'

interface Timezone {
  name: IANATimezoneName;
  standardUtcOffset: UTCOffset;
  standardAbbreviation: TimezoneAbbreviation;
  region: TimezoneRegion;
}

interface CurrentTimezoneDetails {
  currentUtcOffset: UTCOffset;
  currentAbbreviation: TimezoneAbbreviation;
}
```

### Exports

#### `timezones: Readonly<Timezone[]>`

The complete list of timezones with their metadata. This is a readonly array to prevent accidental modifications.

#### `getTimezoneByName(name: IANATimezoneName | string): Timezone | undefined`

Gets a timezone by its IANA name. Returns undefined if not found.

#### `getTimezonesByRegion(region: TimezoneRegion | string): Timezone[]`

Gets all timezones in a specific region. Case-insensitive. Returns an empty array if no timezones found.

#### `getStandardUtcOffset(name: IANATimezoneName | string): UTCOffset | undefined`

Gets the standard UTC offset for a timezone. Returns undefined if not found.

#### `isValidTimezoneName(name: string): boolean`

Checks if a string is a valid IANA timezone name.

#### `getCurrentTimezoneDetails(name: IANATimezoneName): Promise<CurrentTimezoneDetails | undefined>`

Gets the current timezone details including DST information. Returns undefined if the timezone is invalid.

## Data Source

The timezone data is sourced from the IANA Time Zone Database and processed to include standard offsets and common abbreviations. The data is embedded directly in the library, ensuring zero runtime dependencies.

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## Releases and Versioning

This package follows [Semantic Versioning](https://semver.org/) (SemVer).

- **Patch releases** (1.0.x): Bug fixes and minor updates that don't change the API
- **Minor releases** (1.x.0): New features added in a backward-compatible manner
- **Major releases** (x.0.0): Breaking changes to the API

The package is published to npm automatically through GitHub Actions when a new version tag is pushed. For more detailed information about the release process, see [RELEASING.md](RELEASING.md).

## License

MIT
