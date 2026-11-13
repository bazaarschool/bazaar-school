// Site-wide settings are edited from the CMS (Site settings > General),
// which writes src/data/settings.json. This file just reads it.
import settings from './settings.json';

export const SITE = {
  name: settings.name || 'Bazaar School',
  tagline: settings.tagline || '',
  footerTagline: settings.footerTagline || settings.tagline || '',
  twitter: settings.twitter || '',
  contactEmail: settings.contactEmail || '',
};

export const ANALYTICS = {
  gaId: settings.gaId || '', // Google Analytics 4 measurement id (blank = off)
};

export const ADS = {
  adsenseClient: settings.adsenseClient || '', // AdSense publisher id (blank = off)
};

export const SOCIAL: Record<string, string> = settings.social || {};

// Optional broker / partner call-to-action. Hidden until a URL is set.
export const PARTNER = {
  label: settings.partner?.label || '',
  url: settings.partner?.url || '',
  blurb: settings.partner?.blurb || '',
};
