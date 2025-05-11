import { readFileSync } from 'fs';
import { join } from 'path';
import { fileURLToPath } from 'url';
import type {
  IANATimezoneName,
  Timezone,
  TimezoneRegion,
  UTCOffset,
  CurrentTimezoneDetails,
} from './types';

// Read and parse the timezones data
const __dirname = fileURLToPath(new URL('.', import.meta.url));
const timezonesData = JSON.parse(
  readFileSync(join(__dirname, 'data', 'timezones.json'), 'utf-8')
) as { timezones: Timezone[] };

/**
 * The complete list of timezones with their metadata.
 * This is a readonly array to prevent accidental modifications.
 */
export const timezones: Readonly<Timezone[]> = Object.freeze(timezonesData.timezones);

/**
 * Gets a timezone by its IANA name.
 * @param name - The IANA timezone name to look up
 * @returns The timezone object if found, undefined otherwise
 */
export function getTimezoneByName(name: IANATimezoneName | string): Timezone | undefined {
  if (!name) return undefined;
  return timezones.find((tz) => tz.name === name);
}

/**
 * Gets all timezones in a specific region.
 * @param region - The region to filter by (case-insensitive)
 * @returns Array of timezones in the specified region
 */
export function getTimezonesByRegion(region: TimezoneRegion | string): Timezone[] {
  if (!region) return [];
  const normalizedRegion = region.toLowerCase();
  return timezones.filter((tz) => tz.region.toLowerCase() === normalizedRegion);
}

/**
 * Gets the standard UTC offset for a timezone.
 * @param name - The IANA timezone name
 * @returns The standard UTC offset if found, undefined otherwise
 */
export function getStandardUtcOffset(name: IANATimezoneName | string): UTCOffset | undefined {
  if (!name) return undefined;
  return getTimezoneByName(name)?.standardUtcOffset;
}

/**
 * Checks if a string is a valid IANA timezone name.
 * @param name - The string to check
 * @returns true if the string is a valid IANA timezone name
 */
export function isValidTimezoneName(name: string): boolean {
  if (!name) return false;
  return timezones.some((tz) => tz.name === name);
}

/**
 * Gets the current timezone details including DST information.
 * @param name - The IANA timezone name
 * @returns Promise resolving to current timezone details or undefined if not found
 */
export async function getCurrentTimezoneDetails(
  name: IANATimezoneName
): Promise<CurrentTimezoneDetails | undefined> {
  if (!name || !isValidTimezoneName(name)) return undefined;

  try {
    const date = new Date();
    const formatter = new Intl.DateTimeFormat('en-US', {
      timeZone: name,
      timeZoneName: 'shortOffset',
    });

    const parts = formatter.formatToParts(date);
    const offsetPart = parts.find((part) => part.type === 'timeZoneName');
    const offset = offsetPart?.value || '';

    const shortFormatter = new Intl.DateTimeFormat('en-US', {
      timeZone: name,
      timeZoneName: 'short',
    });

    const shortParts = shortFormatter.formatToParts(date);
    const abbreviationPart = shortParts.find((part) => part.type === 'timeZoneName');
    const abbreviation = abbreviationPart?.value || '';

    return {
      currentUtcOffset: offset,
      currentAbbreviation: abbreviation,
    };
  } catch (error) {
    return undefined;
  }
}
