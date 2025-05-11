/**
 * Represents an IANA timezone name (e.g., 'America/New_York')
 */
export type IANATimezoneName = string;

/**
 * Represents a timezone abbreviation (e.g., 'EST', 'JST')
 */
export type TimezoneAbbreviation = string;

/**
 * Represents a UTC offset string (e.g., '-05:00', '+09:00')
 */
export type UTCOffset = string;

/**
 * Represents a timezone region (e.g., 'America', 'Asia', 'Europe')
 */
export type TimezoneRegion = string;

/**
 * Represents a complete timezone entry with metadata
 */
export interface Timezone {
  /** The IANA timezone name (e.g., 'America/New_York') */
  name: IANATimezoneName;
  /** The standard UTC offset (e.g., '-05:00') */
  standardUtcOffset: UTCOffset;
  /** The standard time abbreviation (e.g., 'EST') */
  standardAbbreviation: TimezoneAbbreviation;
  /** The region derived from the IANA name (e.g., 'America') */
  region: TimezoneRegion;
}

/**
 * Represents the current timezone details including DST information
 */
export interface CurrentTimezoneDetails {
  /** The current UTC offset including DST if applicable */
  currentUtcOffset: UTCOffset;
  /** The current timezone abbreviation including DST if applicable */
  currentAbbreviation: TimezoneAbbreviation;
}
