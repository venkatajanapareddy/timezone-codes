#!/usr/bin/env node

import { getTimezoneByName, getCurrentTimezoneDetails } from './index';

async function main() {
  const args = process.argv.slice(2);

  if (args.length === 0) {
    console.log('Usage: npx timezone-codes <timezone-name>');
    console.log('Example: npx timezone-codes Asia/Tokyo');
    process.exit(0);
  }

  const timezoneName = args[0];
  const timezone = getTimezoneByName(timezoneName);

  if (!timezone) {
    console.error(`Error: "${timezoneName}" is not a valid IANA timezone name.`);
    process.exit(1);
  }

  console.log(`Timezone: ${timezone.name}`);
  console.log(`Region: ${timezone.region}`);
  console.log(`Standard UTC Offset: ${timezone.standardUtcOffset}`);
  console.log(`Standard Abbreviation: ${timezone.standardAbbreviation}`);

  try {
    const currentDetails = await getCurrentTimezoneDetails(timezoneName);
    if (currentDetails) {
      console.log(`Current UTC Offset: ${currentDetails.currentUtcOffset}`);
      console.log(`Current Abbreviation: ${currentDetails.currentAbbreviation}`);
    }
  } catch (error) {
    console.error('Error getting current timezone details:', error);
  }
}

main().catch(console.error);
