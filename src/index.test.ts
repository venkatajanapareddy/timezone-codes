import { describe, it, expect } from 'vitest';
import {
  timezones,
  getTimezoneByName,
  getTimezonesByRegion,
  getStandardUtcOffset,
  isValidTimezoneName,
  getCurrentTimezoneDetails,
} from './index';

describe('timezone-codes', () => {
  describe('timezones data', () => {
    it('should export a non-empty array of timezones', () => {
      expect(timezones).toBeDefined();
      expect(Array.isArray(timezones)).toBe(true);
      expect(timezones.length).toBeGreaterThan(0);
    });

    it('should have valid timezone entries', () => {
      timezones.forEach((tz) => {
        expect(tz).toHaveProperty('name');
        expect(tz).toHaveProperty('standardUtcOffset');
        expect(tz).toHaveProperty('standardAbbreviation');
        expect(tz).toHaveProperty('region');
      });
    });

    it('should have correct data for known timezones', () => {
      const newYork = timezones.find((tz) => tz.name === 'America/New_York');
      expect(newYork).toBeDefined();
      expect(newYork?.standardUtcOffset).toBe('-05:00');
      expect(newYork?.standardAbbreviation).toBe('EST');
      expect(newYork?.region).toBe('America');

      const tokyo = timezones.find((tz) => tz.name === 'Asia/Tokyo');
      expect(tokyo).toBeDefined();
      expect(tokyo?.standardUtcOffset).toBe('+09:00');
      expect(tokyo?.standardAbbreviation).toBe('JST');
      expect(tokyo?.region).toBe('Asia');
    });
  });

  describe('getTimezoneByName', () => {
    it('should return the correct timezone for valid names', () => {
      const tz = getTimezoneByName('America/New_York');
      expect(tz).toBeDefined();
      expect(tz?.name).toBe('America/New_York');
    });

    it('should return undefined for invalid names', () => {
      expect(getTimezoneByName('Invalid/Timezone')).toBeUndefined();
    });

    it('should handle null/undefined input', () => {
      expect(getTimezoneByName('')).toBeUndefined();
      expect(getTimezoneByName(null as unknown as string)).toBeUndefined();
      expect(getTimezoneByName(undefined as unknown as string)).toBeUndefined();
    });
  });

  describe('getTimezonesByRegion', () => {
    it('should return timezones for valid regions', () => {
      const americaTzs = getTimezonesByRegion('America');
      expect(americaTzs.length).toBeGreaterThan(0);
      americaTzs.forEach((tz) => {
        expect(tz.region).toBe('America');
      });
    });

    it('should be case-insensitive', () => {
      const americaTzs = getTimezonesByRegion('america');
      const AmericaTzs = getTimezonesByRegion('America');
      expect(americaTzs).toEqual(AmericaTzs);
    });

    it('should return empty array for invalid regions', () => {
      expect(getTimezonesByRegion('InvalidRegion')).toEqual([]);
    });

    it('should handle null/undefined input', () => {
      expect(getTimezonesByRegion('')).toEqual([]);
      expect(getTimezonesByRegion(null as unknown as string)).toEqual([]);
      expect(getTimezonesByRegion(undefined as unknown as string)).toEqual([]);
    });
  });

  describe('getStandardUtcOffset', () => {
    it('should return correct offset for valid timezones', () => {
      expect(getStandardUtcOffset('America/New_York')).toBe('-05:00');
      expect(getStandardUtcOffset('Asia/Tokyo')).toBe('+09:00');
    });

    it('should return undefined for invalid timezones', () => {
      expect(getStandardUtcOffset('Invalid/Timezone')).toBeUndefined();
    });

    it('should handle null/undefined input', () => {
      expect(getStandardUtcOffset('')).toBeUndefined();
      expect(getStandardUtcOffset(null as unknown as string)).toBeUndefined();
      expect(getStandardUtcOffset(undefined as unknown as string)).toBeUndefined();
    });
  });

  describe('isValidTimezoneName', () => {
    it('should return true for valid timezone names', () => {
      expect(isValidTimezoneName('America/New_York')).toBe(true);
      expect(isValidTimezoneName('Asia/Tokyo')).toBe(true);
    });

    it('should return false for invalid timezone names', () => {
      expect(isValidTimezoneName('Invalid/Timezone')).toBe(false);
    });

    it('should handle null/undefined input', () => {
      expect(isValidTimezoneName('')).toBe(false);
      expect(isValidTimezoneName(null as unknown as string)).toBe(false);
      expect(isValidTimezoneName(undefined as unknown as string)).toBe(false);
    });
  });

  describe('getCurrentTimezoneDetails', () => {
    it('should return current details for valid timezone', async () => {
      const details = await getCurrentTimezoneDetails('America/New_York');
      expect(details).toBeDefined();
      expect(details).toHaveProperty('currentUtcOffset');
      expect(details).toHaveProperty('currentAbbreviation');
    });

    it('should return undefined for invalid timezone', async () => {
      const details = await getCurrentTimezoneDetails('Invalid/Timezone');
      expect(details).toBeUndefined();
    });

    it('should handle null/undefined input', async () => {
      expect(await getCurrentTimezoneDetails('' as unknown as string)).toBeUndefined();
      expect(await getCurrentTimezoneDetails(null as unknown as string)).toBeUndefined();
      expect(await getCurrentTimezoneDetails(undefined as unknown as string)).toBeUndefined();
    });
  });
});
