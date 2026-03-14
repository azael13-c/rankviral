/* ═══════════════════════════════════════════
   RANKVIRAL — app.js
   ═══════════════════════════════════════════ */
'use strict';

const API_BASE = 'https://rankviral.onrender.com';

/* ── SVG ILLUSTRATION LIBRARY ─────────────────────────────────────────────
   Icon library to replace emojis.
──────────────────────────────────────────────────────────────────────────── */
const ICONS = {
  country(code, color) { return `<svg viewBox="0 0 24 24" width="24" height="24"><rect width="24" height="24" rx="4" fill="${color}" opacity="0.12"/><text x="50%" y="50%" dominant-baseline="middle" text-anchor="middle" fill="${color}" font-size="10" font-weight="900" style="user-select:none">${code}</text></svg>`; },
  robot(c = '#60a5fa') { return `<svg viewBox="0 0 24 24" width="24" height="24"><path fill="${c}" d="M19.5 12.5C19.5 11.12 18.38 10 17 10C15.62 10 14.5 11.12 14.5 12.5C14.5 13.88 15.62 15 17 15C18.38 15 19.5 13.88 19.5 12.5M9.5 12.5C9.5 11.12 8.38 10 7 10C5.62 10 4.5 11.12 4.5 12.5C4.5 13.88 5.62 15 7 15C8.38 15 9.5 13.88 9.5 12.5M12 2C15.31 2 18 4.69 18 8V13.75C18.92 14.33 19.5 15.35 19.5 16.5C19.5 18.43 17.93 20 16 20H8C6.07 20 4.5 18.43 4.5 16.5C4.5 15.35 5.08 14.33 6 13.75V8C6 4.69 8.69 2 12 2Z"/></svg>`; },
  dna(c = '#6bcb77') { return `<svg viewBox="0 0 24 24" width="24" height="24"><path fill="${c}" d="M12.53 6.44C12.18 6.08 11.59 6.13 11.24 6.5L9.03 8.85C8.68 9.22 8.47 9.71 8.47 10.23C8.47 11.33 9.34 12.21 10.45 12.21C10.97 12.21 11.45 12 11.82 11.65L14.03 9.31C14.39 8.95 14.34 8.36 13.97 8L12.53 6.44M16.97 9.31C16.62 8.95 16.03 9 15.68 9.35L13.47 11.69C13.82 12.05 14.03 12.54 14.03 13.06C14.03 14.16 13.16 15.04 12.05 15.04C11.53 15.04 11.05 14.83 10.68 14.48L8.47 16.82C8.11 17.18 8.16 17.77 8.53 18.14L9.97 19.71C10.32 20.07 10.91 20.02 11.26 19.66L16.97 13.56C17.32 13.19 17.53 12.7 17.53 12.18C17.53 11.08 16.66 10.2 15.55 10.2C15.03 10.2 14.55 10.41 14.18 10.76L11.97 8.42C12.32 8.06 12.53 7.57 12.53 7.05C12.53 5.95 11.66 5.07 10.55 5.07C10.03 5.07 9.55 5.28 9.18 5.63L7.06 7.88C6.9 8.04 6.81 8.22 6.74 8.41C7.04 8.61 7.29 8.88 7.47 9.07L8.53 7.94C8.89 7.58 9.48 7.63 9.83 8L11.24 9.47C11.59 9.83 11.54 10.42 11.17 10.79L8.96 13.13C8.61 13.49 8.4 13.98 8.4 14.5C8.4 15.6 9.27 16.48 10.38 16.48C10.9 16.48 11.38 16.27 11.75 15.92L13.96 13.58C13.61 13.22 13.4 12.73 13.4 12.21C13.4 11.11 14.27 10.23 15.38 10.23C15.9 10.23 16.38 10.44 16.75 10.79L18.87 8.54C19.03 8.38 19.12 8.2 19.19 8.01C18.89 7.81 18.64 7.54 18.46 7.35L17.4 8.48C17.04 8.84 16.45 8.79 16.1 8.42L14.69 6.95C14.34 6.59 14.39 6 14.76 5.63L16.97 3.29C17.33 2.93 17.92 2.98 18.27 3.34L19.71 4.91C20.06 5.27 20.01 5.86 19.64 6.23L16.97 9.31Z"/></svg>`; },
  leaf(c = '#6bcb77') { return `<svg viewBox="0 0 24 24" width="24" height="24"><path fill="${c}" d="M17,8C8,10 5.9,16.17 3.82,21.34L5.71,22L6.66,19.7C7.14,19.87 7.64,20 8,20C19,20 22,3 22,3C21,5 19,7 17,8Z"/></svg>`; },
  drone(c = '#60a5fa') { return `<svg viewBox="0 0 24 24" width="24" height="24"><path fill="${c}" d="M20.92,12.45L22.21,11.16L20.8,9.75L19.5,11C18.84,10.53 18.03,10.21 17.15,10.08L17.5,8.72L16,8.22L15.5,9.5C14.8,9.16 14,8.95 13.16,8.84L13.5,7.29L12,6.79L11.5,8.2C10.75,8.05 10,8 9.21,8C8.22,8 7.29,8.21 6.5,8.5L5.21,7.21L3.79,8.63L5,9.92C4.53,10.58 4.21,11.39 4.08,12.27L2.72,11.92L2.22,13.42L3.5,13.92C3.16,14.72 2.95,15.53 2.84,16.38L1.29,16.04L0.79,17.54L2.2,18C2.05,18.75 2,19.5 2,20.29C2,21.28 2.21,22.21 2.58,23L4.08,21.5L5.5,22.92L4.09,24.33C4.75,24.73 5.5,25 6.29,25C7.28,25 8.21,24.79 9,24.42L10.5,25.92L11.92,24.5L10.5,23C11.16,22.53 11.97,22.21 12.85,22.08L13.2,23.44L14.7,22.94L14.2,21.63C15,21.28 15.75,21.05 16.54,20.93L16.89,22.39L18.39,21.89L17.89,20.5C18.65,20.35 19.38,20.04 20.04,19.64L21.54,21.14L22.96,19.73L21.54,18.31C21.95,17.65 22.23,16.88 22.38,16L24,16.35L23.5,14.85L22.09,14.35C21.95,13.55 21.58,12.87 20.92,12.45M12,18A4,4 0 0,1 8,14A4,4 0 0,1 12,10A4,4 0 0,1 16,14A4,4 0 0,1 12,18M2,5V2H5V4H3V5H2M2,10V7H4V9H5V10H2M19,2H22V5H20V3H19V2M19,7H22V10H20V8H19V7Z"/></svg>`; },
  brain(c = '#a78bfa') { return `<svg viewBox="0 0 24 24" width="24" height="24"><path fill="${c}" d="M12,2C9,2 6.4,3.45 5.1,5.5C3.9,7.45 3.7,9.85 4.6,12C5.3,13.8 6.6,15.2 8.2,16.1C8.4,16.2 8.7,16.3 9,16.3C9.3,16.3 9.6,16.2 9.8,16.1C10.2,15.8 10.3,15.2 10.1,14.8C9.8,14.4 9.2,14.2 8.8,14.5C7.8,15 7,14.1 7.5,13.2C7.7,12.8 7.5,12.2 7.1,12C6.7,11.7 6.1,11.9 5.9,12.3C5.3,10.3 5.5,8.4 6.4,6.8C7.4,5.1 9.5,4 12,4C14.8,4 17,6.2 17,9C17,11.8 14.8,14 12,14C11.4,14 11,14.4 11,15C11,15.6 11.4,16 12,16C15.9,16 19,12.9 19,9C19,5.1 15.9,2 12,2M12,6A1,1 0 0,0 11,7V9A1,1 0 0,0 13,9V7A1,1 0 0,0 12,6M8.2,7.5C7.9,7.2 7.3,7.1 6.9,7.3C6.5,7.6 6.4,8.2 6.7,8.6C7.1,9.2 7.8,9.5 8.5,9.2C9.1,8.9 9.3,8.2 9,7.8C8.8,7.6 8.5,7.4 8.2,7.5M16.1,10.2C15.7,9.9 15.1,10 14.8,10.4C14.5,10.8 14.6,11.4 15,11.7C15.6,12.1 16.3,11.8 16.6,11.2C16.9,10.6 16.5,10.5 16.1,10.2M10,20C10,21.1 10.9,22 12,22C13.1,22 14,21.1 14,20V18H10V20Z"/></svg>`; },
  book(c = '#F5C518') { return `<svg viewBox="0 0 24 24" width="24" height="24"><path fill="${c}" d="M18,2H6A2,2 0 0,0 4,4V20A2,2 0 0,0 6,22H18A2,2 0 0,0 20,20V4A2,2 0 0,0 18,2M13,19H11V18H13V19M14,17H10V16H14V17M18,14H6V12H18V14M18,9H6V4H18V9Z"/></svg>`; },
  clock(c = '#F5C518') { return `<svg viewBox="0 0 24 24" width="24" height="24"><path fill="${c}" d="M12,20A8,8 0 0,0 20,12A8,8 0 0,0 12,4A8,8 0 0,0 4,12A8,8 0 0,0 12,20M12,2A10,10 0 0,1 22,12A10,10 0 0,1 12,22A10,10 0 0,1 2,12A10,10 0 0,1 12,2M12.5,7V12.25L17,14.92L16.25,16.15L11,13V7H12.5Z"/></svg>`; },
  bars(c = '#F5C518') { return `<svg viewBox="0 0 24 24" width="24" height="24"><path fill="${c}" d="M6,16H8V12H6M11,16H13V8H11M16,16H18V4H16M2,20H20V22H2"/></svg>`; },
  health(c = '#6bcb77') { return `<svg viewBox="0 0 24 24" width="24" height="24"><path fill="${c}" d="M10.5,3.5C10.5,2.7 9.8,2 9,2C8.2,2 7.5,2.7 7.5,3.5C7.5,4.3 8.2,5 9,5C9.8,5 10.5,4.3 10.5,3.5M11,12L12.5,18H14.5L16,12H14L13,16H12L11,12M9,10C7.9,10 7,10.9 7,12V18H8V12C8,11.4 8.4,11 9,11C9.6,11 10,11.4 10,12V18H11V12C11,10.9 10.1,10 9,10M9,9C10.7,9 12,7.7 12,6H6C6,7.7 7.3,9 9,9M20,19V20H4V19C4,16.7 8,15.5 12,15.5C16,15.5 20,16.7 20,19M18,19C18,17.8 15.2,17.5 12,17.5C8.8,17.5 6,17.8 6,19H18Z"/></svg>`; },
  network(c = '#F5C518') { return `<svg viewBox="0 0 24 24" width="24" height="24"><path fill="${c}" d="M12,2C9.24,2 7,4.24 7,7C7,9.76 9.24,12 12,12C14.76,12 17,9.76 17,7C17,4.24 14.76,2 12,2M18.39,14.56C16.71,13.7 14.53,13 12,13C9.47,13 7.29,13.71 5.61,14.56C2.12,16.25 2.12,18.75 5.61,20.44C7.29,21.29 9.47,22 12,22C14.53,22 16.71,21.29 18.39,20.44C21.88,18.75 21.88,16.25 18.39,14.56Z"/></svg>`; },
  search(c = '#a78bfa') { return `<svg viewBox="0 0 24 24" width="24" height="24"><path fill="${c}" d="M9.5,3A6.5,6.5 0 0,1 16,9.5C16,11.11 15.41,12.59 14.44,13.73L14.71,14H15.5L20.5,19L19,20.5L14,15.5V14.71L13.73,14.44C12.59,15.41 11.11,16 9.5,16A6.5,6.5 0 0,1 3,9.5A6.5,6.5 0 0,1 9.5,3M9.5,5C7,5 5,7 5,9.5C5,12 7,14 9.5,14C12,14 14,12 14,9.5C14,7 12,5 9.5,5Z"/></svg>`; },
  prediction(c = '#a78bfa') { return `<svg viewBox="0 0 24 24" width="24" height="24"><path fill="${c}" d="M12,11.5A2.5,2.5 0 0,1 9.5,9A2.5,2.5 0 0,1 12,6.5A2.5,2.5 0 0,1 14.5,9A2.5,2.5 0 0,1 12,11.5M12,2C17,2 21,4.5 21,9C21,14.25 12,22 12,22C12,22 3,14.25 3,9C3,4.5 7,2 12,2Z"/></svg>`; },
  scissors(c = '#a78bfa') { return `<svg viewBox="0 0 24 24" width="24" height="24"><path fill="${c}" d="M6.3,7.7C6.3,6.7 7.1,6 8,6C8.9,6 9.7,6.7 9.7,7.7C9.7,8.7 8.9,9.4 8,9.4C7.1,9.4 6.3,8.7 6.3,7.7M16,9.4C15.1,9.4 14.3,8.7 14.3,7.7C14.3,6.7 15.1,6 16,6C16.9,6 17.7,6.7 17.7,7.7C17.7,8.7 16.9,9.4 16,9.4M20.8,12.5L13.4,18.1C13.1,18.3 12.7,18.2 12.5,17.9L10.2,15L13.1,12.8L14,13.5L19.2,9.2L14.7,4.8L13.8,5.5L12.9,4.8L10.5,2.1C10.3,1.8 9.9,1.7 9.6,1.9L3.2,7.1L9.6,12.3L12,10.1L14.3,12.2L7.9,17.4L11.6,21.9C11.8,22.2 12.2,22.3 12.5,22.1L20.8,14.8C21.1,14.5 21.2,14.1 21,13.8L20.8,12.5Z"/></svg>`; },
  ghost(c = '#a78bfa') { return `<svg viewBox="0 0 24 24" width="24" height="24"><path fill="${c}" d="M12,2A9,9 0 0,0 3,11V22H21V11A9,9 0 0,0 12,2M9,13A1.5,1.5 0 0,1 7.5,14.5A1.5,1.5 0 0,1 6,13A1.5,1.5 0 0,1 7.5,11.5A1.5,1.5 0 0,1 9,13M15,13A1.5,1.5 0 0,1 13.5,14.5A1.5,1.5 0 0,1 12,13A1.5,1.5 0 0,1 13.5,11.5A1.5,1.5 0 0,1 15,13Z"/></svg>`; },
  eye(c = '#60a5fa') { return `<svg viewBox="0 0 24 24" width="24" height="24"><path fill="${c}" d="M12,9A3,3 0 0,0 9,12A3,3 0 0,0 12,15A3,3 0 0,0 15,12A3,3 0 0,0 12,9M12,17A5,5 0 0,1 7,12A5,5 0 0,1 12,7A5,5 0 0,1 17,12A5,5 0 0,1 12,17M12,4.5C7,4.5 2.73,7.61 1,12C2.73,16.39 7,19.5 12,19.5C17,19.5 21.27,16.39 23,12C21.27,7.61 17,4.5 12,4.5Z"/></svg>`; },
  megaphone(c = '#60a5fa') { return `<svg viewBox="0 0 24 24" width="24" height="24"><path fill="${c}" d="M20,2H8A2,2 0 0,0 6,4V6H4A2,2 0 0,0 2,8V14A2,2 0 0,0 4,16H6V18A2,2 0 0,0 8,20H20A2,2 0 0,0 22,18V4A2,2 0 0,0 20,2M8,4H20V18H8V4M4,8H6V14H4V8M18,9H12V11H18V13H11V15H18V17H10V7H18V9Z"/></svg>`; },
  graphDown(c = '#60a5fa') { return `<svg viewBox="0 0 24 24" width="24" height="24"><path fill="${c}" d="M16,11.78L20.24,16L18.76,17.44L16,14.68L12.5,18.18L8,13.68L3.5,18.18L2,16.68L8,10.68L12.5,15.18L16,11.78Z"/></svg>`; },
  explosion(c = '#60a5fa') { return `<svg viewBox="0 0 24 24" width="24" height="24"><path fill="${c}" d="M14,20.5C14,21.3 13.3,22 12.5,22C11.7,22 11,21.3 11,20.5C11,19.7 11.7,19 12.5,19C13.3,19 14,19.7 14,20.5M15,2C15,2.7 14.8,3.4 14.3,4L12.8,5.5C12.9,5.7 13,6 13,6.2C13,6.3 13,6.3 13,6.4L15.3,8.7C15.7,8.3 16.3,8 17,8C18.7,8 20,9.3 20,11C20,11.7 19.7,12.3 19.3,12.7L21.6,15L20.2,16.4L17.9,14.1C17.9,14.2 17.8,14.2 17.8,14.2C16.1,15.9 13.8,17 11.2,17C8.6,17 6.3,15.9 4.6,14.2L2.8,16L1.4,14.6L19.8,2.2C19.3,2.1 18.8,2 18.3,2C17.2,2 16.2,2.4 15.4,3.1L15,2Z"/></svg>`; },
  soda(c = '#f97316') { return `<svg viewBox="0 0 24 24" width="24" height="24"><path fill="${c}" d="M15,23.11L14.1,22.22C14.1,22.22 13.2,21.22 12.7,20.22C12.2,19.22 12,18.22 12,16.22V6.78L10,5.78V4.78L12,3.78V2H14V3.78L16,4.78V5.78L14,6.78V16.22C14,18.22 13.8,19.22 13.3,20.22C12.8,21.22 11.9,22.22 11.9,22.22L11,23.11H15M5,11V13H10V11H5Z"/></svg>`; },
  hotdog(c = '#f97316') { return `<svg viewBox="0 0 24 24" width="24" height="24"><path fill="${c}" d="M12,10C11.45,10 11,10.45 11,11V13C11,13.55 11.45,14 12,14C12.55,14 13,13.55 13,13V11C13,10.45 12.55,10 12,10M19,10C18.45,10 18,10.45 18,11V13C18,13.55 18.45,14 19,14C19.55,14 20,13.55 20,13V11C20,10.45 19.55,10 19,10M5,10C4.45,10 4,10.45 4,11V13C4,13.55 4.45,14 5,14C5.55,14 6,13.55 6,13V11C6,10.45 5.55,10 5,10M21.12,6.24L20.05,5.17C19.96,5.08 19.86,5.03 19.75,5.03C19.64,5.03 19.54,5.08 19.45,5.17L18.38,6.24C17.1,5.46 15.5,5 13.8,5H10.2C8.5,5 6.9,5.46 5.62,6.24L4.55,5.17C4.37,5 4.05,5 3.87,5.17L2.8,6.24C2.63,6.42 2.63,6.7 2.8,6.88L3.87,7.95C3.3,8.83 3,9.88 3,11V16C3,17.1 3.9,18 5,18H19C20.1,18 21,17.1 21,16V11C21,9.88 20.7,8.83 20.13,7.95L21.2,6.88C21.37,6.7 21.37,6.42 21.2,6.24Z"/></svg>`; },
  cereal(c = '#f97316') { return `<svg viewBox="0 0 24 24" width="24" height="24"><path fill="${c}" d="M16,22H8A3,3 0 0,1 5,19V8A3,3 0 0,1 8,5H16A3,3 0 0,1 19,8V19A3,3 0 0,1 16,22M12,7A2,2 0 0,0 10,9A2,2 0 0,0 12,11A2,2 0 0,0 14,9A2,2 0 0,0 12,7M16,14H8A1,1 0 0,0 7,15V16A1,1 0 0,0 8,17H16A1,1 0 0,0 17,16V15A1,1 0 0,0 16,14Z"/></svg>`; },
  fries(c = '#f97316') { return `<svg viewBox="0 0 24 24" width="24" height="24"><path fill="${c}" d="M18.5,11L17,12.5L15.5,11L14,12.5L12.5,11L11,12.5L9.5,11L8,12.5L6.5,11L5,12.5L3.5,11L2,12.5V22H22V11M18.5,11L22,7.5L18.5,4L15,7.5L11.5,4L8,7.5L4.5,4L1,7.5L4.5,11"/></svg>`; },
  ramen(c = '#f97316') { return `<svg viewBox="0 0 24 24" width="24" height="24"><path fill="${c}" d="M2,5.27L3.28,4L20,20.72L18.73,22L15,18.27V20H9V18.27L5.27,14.55L2,11.27V5.27M22,11.27C22,10.17 21.1,9.27 20,9.27H18V7.27H16V9.27H14V7.27H12V9.27H10V8.82L5.45,4.27H22V11.27Z"/></svg>`; },
  skull(c = '#6bcb77') { return `<svg viewBox="0 0 24 24" width="24" height="24"><path fill="${c}" d="M12,2C15.31,2 18,4.69 18,8V13C18,14.1 17.1,15 16,15H8C6.9,15 6,14.1 6,13V8C6,4.69 8.69,2 12,2M9,16V18H15V16L12,19L9,16M8,20V22H16V20H8M9.5,8A1.5,1.5 0 0,0 8,9.5A1.5,1.5 0 0,0 9.5,11A1.5,1.5 0 0,0 11,9.5A1.5,1.5 0 0,0 9.5,8M14.5,8A1.5,1.5 0 0,0 13,9.5A1.5,1.5 0 0,0 14.5,11A1.5,1.5 0 0,0 16,9.5A1.5,1.5 0 0,0 14.5,8Z"/></svg>`; },
};

/* ── SVG ILLUSTRATION LIBRARY ─────────────────────────────────────────────
   Each function returns an SVG string. Used in cards, rank thumbs, article
   entries, and article heroes. Every illustration is unique per topic.
──────────────────────────────────────────────────────────────────────────── */
/* Real photo library for article thumbs */
const REAL_PHOTOS = {
  'soda-drinks':         { src: 'images/food/soda.jpg',           alt: 'Refrescos y bebidas azucaradas' },
  'processed-meat':      { src: 'images/food/processed-meat.jpg', alt: 'Carnes procesadas' },
  'sugary-cereal':       { src: 'images/food/cereal.jpg',         alt: 'Cereales de desayuno azucarados' },
  'potato-chips':        { src: 'images/food/chips.jpg',          alt: 'Papas fritas de bolsa' },
  'instant-ramen':       { src: 'images/food/ramen.jpg',          alt: 'Sopas instantaneas y ramen' },
  'box-jellyfish':       { src: 'images/animals/box-jellyfish.jpg',   alt: 'Avispa de mar (box jellyfish)' },
  'inland-taipan':       { src: 'images/animals/inland-taipan.jpg',   alt: 'Taipan del interior' },
  'blue-ringed-octopus': { src: 'images/animals/blue-ringed-octopus.jpg', alt: 'Pulpo de anillos azules' },
  'stonefish':           { src: 'images/animals/stonefish.jpg',        alt: 'Pez piedra' },
  'marble-cone-snail':   { src: 'images/animals/marble-cone-snail.jpg', alt: 'Caracol cono de marmol' },
  'mongol-empire':       { src: 'images/historia/mongol-empire.jpg',    alt: 'Imperio Mongol' },
  'congo-free-state':    { src: 'images/historia/congo-free-state.jpg', alt: 'Estado Libre del Congo' },
  'spanish-empire':      { src: 'images/historia/spanish-empire.jpg',   alt: 'Imperio Espanol en las Americas' },
  'japanese-empire':     { src: 'images/historia/japanese-empire.jpg',  alt: 'Imperio del Japon' },
  'british-empire':      { src: 'images/historia/british-empire.jpg',   alt: 'Imperio Britanico' },
  'rich-reading':        { src: 'images/ricos/reading.jpg',            alt: 'Lectura diaria' },
  'rich-time':           { src: 'images/ricos/time-control.jpg',       alt: 'Control del tiempo' },
  'rich-income':         { src: 'images/ricos/income-streams.jpg',     alt: 'Multiples fuentes de ingreso' },
  'rich-health':         { src: 'images/ricos/health-invest.jpg',      alt: 'Invertir en salud' },
  'rich-network':        { src: 'images/ricos/network.jpg',            alt: 'Red de alto valor' },
  'ai-chimera':          { src: 'images/ia/chimera.jpg',               alt: 'IA de vigilancia' },
  'ai-loki':             { src: 'images/ia/loki.jpg',                  alt: 'IA de desinformacion' },
  'ai-khaos':            { src: 'images/ia/khaos.jpg',                 alt: 'IA de trading' },
  'ai-ares':             { src: 'images/ia/ares.jpg',                  alt: 'Drones autonomos' },
  'ai-morpheus':         { src: 'images/ia/morpheus.jpg',              alt: 'IA de realidades virtuales' },
  'brain-bias':          { src: 'images/cerebro/sesgo0.jpg',           alt: 'Sesgo de confirmacion' },
  'brain-predict':       { src: 'images/cerebro/prediccion0.jpg',      alt: 'Prediccion cerebral' },
  'brain-memory':        { src: 'images/cerebro/recuerdos0.jpg',       alt: 'Recuerdos y memoria' },
  'brain-patterns':      { src: 'images/cerebro/patrones0.jpg',        alt: 'Patrones en el cerebro' },
  'extinct-vaquita':     { src: 'images/extincion/vaquita.jpg',        alt: 'Vaquita marina' },
  'extinct-java-rhino':  { src: 'images/extincion/rinoceronte-java.jpg', alt: 'Rinoceronte de Java' },
  'extinct-sumatra':     { src: 'images/extincion/tigre-sumatra.jpg',  alt: 'Tigre de Sumatra' },
  'extinct-orangutan':   { src: 'images/extincion/orangutan-borneo.jpg', alt: 'Orangutan de Borneo' },
  'extinct-kakapo':      { src: 'images/extincion/kakapo.jpg',         alt: 'Kakapo' },
};

const SVG = {

  /* ── WORLD / CONFLICT ── */
  world(w=800, h=450, animated=true) {
    const pulse = animated
      ? `<animate attributeName="r" values="3;7;3" dur="1.8s" repeatCount="indefinite"/>`
      : '';
    const pulse2 = animated
      ? `<animate attributeName="r" values="2;5.5;2" dur="2.3s" repeatCount="indefinite"/>`
      : '';
    return `<svg viewBox="0 0 ${w} ${h}" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid slice">
      <defs>
        <radialGradient id="wg" cx="50%" cy="40%" r="70%">
          <stop offset="0%" stop-color="#2a0800"/>
          <stop offset="100%" stop-color="#050505"/>
        </radialGradient>
      </defs>
      <rect width="${w}" height="${h}" fill="url(#wg)"/>
      <!-- globe wireframe -->
      <circle cx="${w*.5}" cy="${h*.44}" r="${h*.31}" fill="none" stroke="#E8271E" stroke-width=".8" opacity=".25"/>
      <ellipse cx="${w*.5}" cy="${h*.44}" rx="${h*.31}" ry="${h*.11}" fill="none" stroke="#E8271E" stroke-width=".6" opacity=".18"/>
      <ellipse cx="${w*.5}" cy="${h*.44}" rx="${h*.18}" ry="${h*.31}" fill="none" stroke="#E8271E" stroke-width=".5" opacity=".15"/>
      <!-- continent blobs -->
      <path d="M${w*.36} ${h*.32} Q${w*.41} ${h*.27} ${w*.48} ${h*.30} Q${w*.53} ${h*.28} ${w*.56} ${h*.33} Q${w*.57} ${h*.39} ${w*.53} ${h*.42} Q${w*.46} ${h*.45} ${w*.40} ${h*.41} Q${w*.34} ${h*.38} ${w*.36} ${h*.32}Z" fill="#E8271E" opacity=".42"/>
      <path d="M${w*.57} ${h*.30} Q${w*.64} ${h*.26} ${w*.68} ${h*.31} Q${w*.70} ${h*.36} ${w*.66} ${h*.40} Q${w*.60} ${h*.42} ${w*.56} ${h*.37} Q${w*.55} ${h*.33} ${w*.57} ${h*.30}Z" fill="#E8271E" opacity=".32"/>
      <path d="M${w*.38} ${h*.46} Q${w*.45} ${h*.43} ${w*.50} ${h*.47} Q${w*.52} ${h*.53} ${w*.47} ${h*.56} Q${w*.40} ${h*.58} ${w*.36} ${h*.53} Q${w*.34} ${h*.49} ${w*.38} ${h*.46}Z" fill="#c0392b" opacity=".38"/>
      <!-- hotspots -->
      <circle cx="${w*.43}" cy="${h*.36}" r="4" fill="#FFD600" opacity=".9">${pulse}</circle>
      <circle cx="${w*.37}" cy="${h*.52}" r="3.5" fill="#FFD600" opacity=".8">${pulse2}</circle>
      <circle cx="${w*.62}" cy="${h*.34}" r="3.5" fill="#ff8888" opacity=".8">
        <animate attributeName="r" values="2.5;6;2.5" dur="2.1s" repeatCount="indefinite"/>
      </circle>
      <!-- latitudes -->
      <line x1="${w*.19}" y1="${h*.44}" x2="${w*.81}" y2="${h*.44}" stroke="#E8271E" stroke-width=".5" opacity=".15"/>
      <line x1="${w*.22}" y1="${h*.36}" x2="${w*.78}" y2="${h*.36}" stroke="#E8271E" stroke-width=".4" opacity=".12"/>
      <!-- label strip -->
      <rect x="0" y="${h*.78}" width="${w}" height="${h*.22}" fill="url(#wg)" opacity=".92"/>
      <text x="24" y="${h*.9}" font-family="sans-serif" font-size="${h*.062}" font-weight="900" fill="#E8271E" letter-spacing="1.5" opacity=".95">MAPA DE PELIGRO GLOBAL 2026</text>
      <text x="24" y="${h*.96}" font-family="sans-serif" font-size="${h*.031}" fill="#555">Índice de Paz Global · ONU · GPI 2026</text>
    </svg>`;
  },

  /* ── YEMEN specific ── */
  yemen(w=100, h=72) {
    return `<svg viewBox="0 0 ${w} ${h}" xmlns="http://www.w3.org/2000/svg">
      <rect width="${w}" height="${h}" fill="#1a0600"/>
      <!-- Yemen map outline -->
      <path d="M85.2,65.8 C85.2,65.8 46.5,71.5 33.7,65.8 C20.9,60.1 14.5,48.7 14.5,48.7 C14.5,48.7 14.5,37.3 20.9,25.9 C27.3,14.5 40,14.5 40,14.5 L66.3,14.5 L85.2,25.9 L85.2,65.8 Z" fill="#4d1800" stroke="#E8271E" stroke-width="0.7" opacity="0.6"/>
      <circle cx="30" cy="55" r="3" fill="#FFD600" opacity=".9">
        <animate attributeName="r" values="2;5;2" dur="1.8s" repeatCount="indefinite"/>
      </circle>
      <circle cx="65" cy="25" r="2.5" fill="#FFD600" opacity=".7">
        <animate attributeName="r" values="1.5;4;1.5" dur="2.1s" repeatCount="indefinite"/>
      </circle>
      <text x="${w*.05}" y="${h*.9}" font-family="sans-serif" font-size="${h*.17}" fill="#E8271E" font-weight="900" opacity=".8">YEM</text>
    </svg>`;
  },

  /* ── SOMALIA specific ── */
  somalia(w=100, h=72) {
    return `<svg viewBox="0 0 ${w} ${h}" xmlns="http://www.w3.org/2000/svg">
      <rect width="${w}" height="${h}" fill="#060a00"/>
      <!-- Somalia map outline -->
      <path d="M43.5,68.5 C43.5,68.5 58,62.5 63,57.5 C68,52.5 70.5,45 70.5,45 C70.5,45 67,32.5 61,23.5 C55,14.5 43.5,14.5 43.5,14.5 C43.5,14.5 30,20.5 26,30.5 C22,40.5 32.5,68.5 43.5,68.5 Z" fill="#1a2000" stroke="#F5C518" stroke-width="0.7" opacity="0.6"/>
      <circle cx="50" cy="50" r="3" fill="#E8271E" opacity=".9">
        <animate attributeName="r" values="2;5;2" dur="1.8s" repeatCount="indefinite"/>
      </circle>
      <text x="${w*.05}" y="${h*.9}" font-family="sans-serif" font-size="${h*.17}" fill="#F5C518" font-weight="900" opacity=".8">SOM</text>
    </svg>`;
  },

  /* ── SYRIA specific ── */
  syria(w=100, h=72) {
    return `<svg viewBox="0 0 ${w} ${h}" xmlns="http://www.w3.org/2000/svg">
      <rect width="${w}" height="${h}" fill="#080608"/>
      <!-- Syria map outline -->
      <path d="M70.5,65.8 C70.5,65.8 70.5,54.4 64.1,45.8 C57.7,37.2 47.7,34.4 47.7,34.4 C47.7,34.4 37.7,28.7 31.3,20.1 C24.9,11.5 24.9,11.5 24.9,11.5 L44.5,11.5 L64.1,28.7 L77,45.8 L77,65.8 L70.5,65.8 Z" fill="#330000" stroke="#e74c3c" stroke-width="0.7" opacity="0.6"/>
      <circle cx="40" cy="25" r="3" fill="#FFD600" opacity=".9">
        <animate attributeName="r" values="2;5;2" dur="1.8s" repeatCount="indefinite"/>
      </circle>
      <circle cx="60" cy="50" r="2.5" fill="#FFD600" opacity=".7">
        <animate attributeName="r" values="1.5;4;1.5" dur="2.1s" repeatCount="indefinite"/>
      </circle>
      <text x="${w*.05}" y="${h*.9}" font-family="sans-serif" font-size="${h*.17}" fill="#e74c3c" font-weight="900" opacity=".8">SYR</text>
    </svg>`;
  },

  /* ── HAITI specific ── */
  haiti(w=100, h=72) {
    return `<svg viewBox="0 0 ${w} ${h}" xmlns="http://www.w3.org/2000/svg">
      <rect width="${w}" height="${h}" fill="#090606"/>
      <!-- Haiti map outline -->
      <path d="M60.8,54.3 C60.8,54.3 67.2,51.5 70.4,45.9 C73.6,40.3 73.6,34.7 70.4,29.1 C67.2,23.5 60.8,20.7 60.8,20.7 C60.8,20.7 51.2,23.5 44.8,29.1 C38.4,34.7 35.2,43.1 35.2,43.1 L41.6,48.7 L48,54.3 L60.8,54.3 Z" fill="#4d2600" stroke="#e67e22" stroke-width="0.7" opacity="0.6"/>
      <circle cx="55" cy="38" r="3" fill="#E8271E" opacity=".9">
        <animate attributeName="r" values="2;5;2" dur="1.8s" repeatCount="indefinite"/>
      </circle>
      <text x="${w*.05}" y="${h*.9}" font-family="sans-serif" font-size="${h*.17}" fill="#e67e22" font-weight="900" opacity=".8">HAI</text>
    </svg>`;
  },

  /* ── SUDAN specific ── */
  sudan(w=100, h=72) {
    return `<svg viewBox="0 0 ${w} ${h}" xmlns="http://www.w3.org/2000/svg">
      <rect width="${w}" height="${h}" fill="#060a06"/>
      <!-- Sudan map outline -->
      <path d="M77,65.8 C77,65.8 70.6,51.6 64.2,43.1 C57.8,34.6 48,31.8 48,31.8 C48,31.8 28.8,31.8 22.4,26.1 C16,20.4 16,14.7 16,14.7 L35.2,14.7 L48,26.1 L61,40.3 L77,65.8 Z" fill="#003300" stroke="#e74c3c" stroke-width="0.7" opacity="0.6"/>
      <circle cx="30" cy="25" r="3" fill="#FFD600" opacity=".9">
        <animate attributeName="r" values="2;5;2" dur="1.8s" repeatCount="indefinite"/>
      </circle>
      <circle cx="55" cy="40" r="2.5" fill="#FFD600" opacity=".7">
        <animate attributeName="r" values="1.5;4;1.5" dur="2.1s" repeatCount="indefinite"/>
      </circle>
      <text x="${w*.05}" y="${h*.9}" font-family="sans-serif" font-size="${h*.17}" fill="#e74c3c" font-weight="900" opacity=".8">SDN</text>
    </svg>`;
  },

  /* ── UKRAINE specific ── */
  ukraine(w=100, h=72) {
    return `<svg viewBox="0 0 ${w} ${h}" xmlns="http://www.w3.org/2000/svg">
      <rect width="${w}" height="${h}" fill="#001a33"/>
      <!-- Ukraine map outline -->
      <path d="M25 62C25 62 35 72 40 72C45 72 53 67 60 65C67 63 73 55 80 50C87 45 90 35 90 30C90 25 85 15 80 12C75 9 65 8 60 10C55 12 45 15 40 20C35 25 28 30 22 40C16 50 25 62 25 62Z" fill="#003366" stroke="#ffcc00" stroke-width="0.8" opacity="0.7"/>
      <!-- Conflict hotspots -->
      <circle cx="78" cy="22" r="3" fill="#E8271E" opacity=".9">
        <animate attributeName="r" values="2;5;2" dur="1.8s" repeatCount="indefinite"/>
      </circle>
      <circle cx="35" cy="65" r="2.5" fill="#E8271E" opacity=".7">
        <animate attributeName="r" values="1.5;4;1.5" dur="2.1s" repeatCount="indefinite"/>
      </circle>
      <text x="${w*.05}" y="${h*.9}" font-family="sans-serif" font-size="${h*.17}" fill="white" font-weight="900" opacity=".85" text-shadow="0 0 2px black">UKR</text>
    </svg>`;
  },

  /* ── TRABAJOS / FUTURE JOBS ── */
  jobs(w=800, h=450) {
    return `<svg viewBox="0 0 ${w} ${h}" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid slice">
      <defs>
        <radialGradient id="jg" cx="50%" cy="30%" r="80%">
          <stop offset="0%" stop-color="#001830"/>
          <stop offset="100%" stop-color="#050505"/>
        </radialGradient>
      </defs>
      <rect width="${w}" height="${h}" fill="url(#jg)"/>
      <!-- grid lines -->
      <g stroke="#1d4ed8" stroke-width=".6" opacity=".18" fill="none">
        <line x1="0" y1="75" x2="${w}" y2="75"/>
        <line x1="0" y1="150" x2="${w}" y2="150"/>
        <line x1="0" y1="225" x2="${w}" y2="225"/>
        <line x1="90" y1="0" x2="90" y2="${h}"/>
        <line x1="240" y1="0" x2="240" y2="${h}"/>
        <line x1="390" y1="0" x2="390" y2="${h}"/>
        <line x1="540" y1="0" x2="540" y2="${h}"/>
        <line x1="690" y1="0" x2="690" y2="${h}"/>
      </g>
      <!-- salary bars -->
      <rect x="50"  y="${h*.44}" width="42" height="${h*.40}" rx="3" fill="#1d4ed8" opacity=".55"/>
      <rect x="50"  y="${h*.42}" width="42" height="8" rx="2" fill="#60a5fa" opacity=".85"/>
      <rect x="110" y="${h*.34}" width="42" height="${h*.50}" rx="3" fill="#1d4ed8" opacity=".55"/>
      <rect x="110" y="${h*.32}" width="42" height="8" rx="2" fill="#60a5fa" opacity=".9"/>
      <rect x="170" y="${h*.24}" width="42" height="${h*.60}" rx="3" fill="#2563eb" opacity=".6"/>
      <rect x="170" y="${h*.22}" width="42" height="8" rx="2" fill="#93c5fd" opacity=".9"/>
      <rect x="230" y="${h*.16}" width="42" height="${h*.68}" rx="3" fill="#3b82f6" opacity=".7"/>
      <rect x="230" y="${h*.14}" width="42" height="8" rx="2" fill="#bfdbfe" opacity=".95"/>
      <!-- salary labels -->
      <text x="54"  y="${h*.92}" font-family="sans-serif" font-size="10" fill="#60a5fa" opacity=".6">$60k</text>
      <text x="114" y="${h*.92}" font-family="sans-serif" font-size="10" fill="#60a5fa" opacity=".6">$90k</text>
      <text x="172" y="${h*.92}" font-family="sans-serif" font-size="10" fill="#60a5fa" opacity=".7">$120k</text>
      <text x="230" y="${h*.92}" font-family="sans-serif" font-size="10" fill="#F5C518" opacity=".9">$150k</text>
      <!-- AI robot face -->
      <rect x="${w*.46}" y="${h*.14}" width="${w*.18}" height="${h*.5}" rx="12" fill="#0a1628" stroke="#60a5fa" stroke-width="1.5" opacity=".75"/>
      <rect x="${w*.48}" y="${h*.22}" width="${w*.065}" height="${h*.14}" rx="5" fill="#1e40af" opacity=".7"/>
      <rect x="${w*.555}" y="${h*.22}" width="${w*.065}" height="${h*.14}" rx="5" fill="#1e40af" opacity=".7"/>
      <circle cx="${w*.513}" cy="${h*.29}" r="${w*.025}" fill="#60a5fa" opacity=".9">
        <animate attributeName="opacity" values=".5;1;.5" dur="2s" repeatCount="indefinite"/>
      </circle>
      <circle cx="${w*.587}" cy="${h*.29}" r="${w*.025}" fill="#60a5fa" opacity=".9">
        <animate attributeName="opacity" values="1;.5;1" dur="2s" repeatCount="indefinite"/>
      </circle>
      <rect x="${w*.49}" y="${h*.4}" width="${w*.12}" height="${h*.04}" rx="3" fill="#1d4ed8" opacity=".6"/>
      <!-- particles -->
      <circle cx="${w*.78}" cy="${h*.22}" r="3" fill="#60a5fa" opacity=".5">
        <animate attributeName="cy" values="${h*.22};${h*.16};${h*.22}" dur="3s" repeatCount="indefinite"/>
      </circle>
      <circle cx="${w*.84}" cy="${h*.35}" r="2.5" fill="#a78bfa" opacity=".45">
        <animate attributeName="cy" values="${h*.35};${h*.28};${h*.35}" dur="2.5s" repeatCount="indefinite"/>
      </circle>
      <circle cx="${w*.90}" cy="${h*.18}" r="3.5" fill="#60a5fa" opacity=".35">
        <animate attributeName="cy" values="${h*.18};${h*.12};${h*.18}" dur="3.5s" repeatCount="indefinite"/>
      </circle>
      <!-- label -->
      <rect x="0" y="${h*.78}" width="${w}" height="${h*.22}" fill="url(#jg)" opacity=".92"/>
      <text x="24" y="${h*.9}" font-family="sans-serif" font-size="${h*.062}" font-weight="900" fill="#60a5fa" letter-spacing="1.5">FUTURO DEL TRABAJO 2030</text>
      <text x="24" y="${h*.96}" font-family="sans-serif" font-size="${h*.031}" fill="#555">World Economic Forum · Informe Empleos 2026</text>
    </svg>`;
  },

  /* ── JOB entry thumbs (each unique) ── */
  jobAI(w=116, h=78) {
    return `<svg viewBox="0 0 ${w} ${h}" xmlns="http://www.w3.org/2000/svg">
      <rect width="${w}" height="${h}" fill="#030a18"/>
      <rect x="${w*.2}" y="${h*.1}" width="${w*.6}" height="${h*.72}" rx="6" fill="#0a1628" stroke="#60a5fa" stroke-width="1" opacity=".7"/>
      <circle cx="${w*.37}" cy="${h*.38}" r="${w*.1}" fill="#1e40af" opacity=".8">
        <animate attributeName="opacity" values=".5;1;.5" dur="2s" repeatCount="indefinite"/>
      </circle>
      <circle cx="${w*.63}" cy="${h*.38}" r="${w*.1}" fill="#1e40af" opacity=".8">
        <animate attributeName="opacity" values="1;.5;1" dur="2s" repeatCount="indefinite"/>
      </circle>
      <rect x="${w*.28}" y="${h*.58}" width="${w*.44}" height="${h*.1}" rx="3" fill="#1d4ed8" opacity=".6"/>
    </svg>`;
  },
  jobBio(w=116, h=78) {
    return `<svg viewBox="0 0 ${w} ${h}" xmlns="http://www.w3.org/2000/svg">
      <rect width="${w}" height="${h}" fill="#020f08"/>
      <!-- DNA double helix -->
      <path d="M${w*.3} ${h*.1} Q${w*.5} ${h*.3} ${w*.3} ${h*.5} Q${w*.1} ${h*.7} ${w*.3} ${h*.9}" stroke="#6bcb77" stroke-width="2" fill="none" opacity=".7"/>
      <path d="M${w*.7} ${h*.1} Q${w*.5} ${h*.3} ${w*.7} ${h*.5} Q${w*.9} ${h*.7} ${w*.7} ${h*.9}" stroke="#6bcb77" stroke-width="2" fill="none" opacity=".7"/>
      <line x1="${w*.3}" y1="${h*.2}" x2="${w*.7}" y2="${h*.2}" stroke="#6bcb77" stroke-width="1" opacity=".4"/>
      <line x1="${w*.3}" y1="${h*.4}" x2="${w*.7}" y2="${h*.4}" stroke="#6bcb77" stroke-width="1" opacity=".4"/>
      <line x1="${w*.3}" y1="${h*.6}" x2="${w*.7}" y2="${h*.6}" stroke="#6bcb77" stroke-width="1" opacity=".4"/>
      <line x1="${w*.3}" y1="${h*.8}" x2="${w*.7}" y2="${h*.8}" stroke="#6bcb77" stroke-width="1" opacity=".4"/>
    </svg>`;
  },
  jobCarbon(w=116, h=78) {
    return `<svg viewBox="0 0 ${w} ${h}" xmlns="http://www.w3.org/2000/svg">
      <rect width="${w}" height="${h}" fill="#030a03"/>
      <circle cx="${w*.5}" cy="${h*.45}" r="${w*.3}" fill="none" stroke="#6bcb77" stroke-width="1.5" opacity=".5"/>
      <path d="M${w*.5} ${h*.15} L${w*.5} ${h*.45}" stroke="#6bcb77" stroke-width="1" opacity=".6"/>
      <path d="M${w*.5} ${h*.45} L${w*.78} ${h*.65}" stroke="#6bcb77" stroke-width="1" opacity=".6"/>
      <path d="M${w*.5} ${h*.45} L${w*.22} ${h*.65}" stroke="#6bcb77" stroke-width="1" opacity=".6"/>
      <circle cx="${w*.5}" cy="${h*.15}" r="${w*.06}" fill="#6bcb77" opacity=".8"/>
      <circle cx="${w*.78}" cy="${h*.65}" r="${w*.06}" fill="#6bcb77" opacity=".8"/>
      <circle cx="${w*.22}" cy="${h*.65}" r="${w*.06}" fill="#6bcb77" opacity=".8"/>
      <circle cx="${w*.5}" cy="${h*.45}" r="${w*.08}" fill="#22c55e" opacity=".7">
        <animate attributeName="r" values="${w*.06};${w*.12};${w*.06}" dur="2s" repeatCount="indefinite"/>
      </circle>
    </svg>`;
  },
  jobDrone(w=116, h=78) {
    return `<svg viewBox="0 0 ${w} ${h}" xmlns="http://www.w3.org/2000/svg">
      <rect width="${w}" height="${h}" fill="#030308"/>
      <!-- drone body -->
      <rect x="${w*.38}" y="${h*.38}" width="${w*.24}" height="${h*.24}" rx="3" fill="#1e293b" stroke="#60a5fa" stroke-width="1" opacity=".8"/>
      <circle cx="${w*.5}" cy="${h*.5}" r="${w*.06}" fill="#60a5fa" opacity=".7">
        <animate attributeName="opacity" values=".4;1;.4" dur="1.2s" repeatCount="indefinite"/>
      </circle>
      <!-- arms -->
      <line x1="${w*.38}" y1="${h*.42}" x2="${w*.2}" y2="${h*.28}" stroke="#475569" stroke-width="1.5" opacity=".7"/>
      <line x1="${w*.62}" y1="${h*.42}" x2="${w*.8}" y2="${h*.28}" stroke="#475569" stroke-width="1.5" opacity=".7"/>
      <line x1="${w*.38}" y1="${h*.58}" x2="${w*.2}" y2="${h*.72}" stroke="#475569" stroke-width="1.5" opacity=".7"/>
      <line x1="${w*.62}" y1="${h*.58}" x2="${w*.8}" y2="${h*.72}" stroke="#475569" stroke-width="1.5" opacity=".7"/>
      <!-- propellers -->
      <ellipse cx="${w*.2}" cy="${h*.28}" rx="${w*.12}" ry="${h*.04}" fill="#60a5fa" opacity=".4"/>
      <ellipse cx="${w*.8}" cy="${h*.28}" rx="${w*.12}" ry="${h*.04}" fill="#60a5fa" opacity=".4"/>
      <ellipse cx="${w*.2}" cy="${h*.72}" rx="${w*.12}" ry="${h*.04}" fill="#60a5fa" opacity=".4"/>
      <ellipse cx="${w*.8}" cy="${h*.72}" rx="${w*.12}" ry="${h*.04}" fill="#60a5fa" opacity=".4"/>
      <!-- dotted path -->
      <path d="M${w*.5} ${h*.35} Q${w*.7} ${h*.15} ${w*.9} ${h*.2}" stroke="#F5C518" stroke-width="1" stroke-dasharray="3,3" fill="none" opacity=".5"/>
    </svg>`;
  },
  jobPsych(w=116, h=78) {
    return `<svg viewBox="0 0 ${w} ${h}" xmlns="http://www.w3.org/2000/svg">
      <rect width="${w}" height="${h}" fill="#08040f"/>
      <!-- VR headset -->
      <rect x="${w*.15}" y="${h*.3}" width="${w*.7}" height="${h*.4}" rx="8" fill="#1a0f2e" stroke="#a78bfa" stroke-width="1" opacity=".8"/>
      <rect x="${w*.25}" y="${h*.36}" width="${w*.22}" height="${h*.28}" rx="5" fill="#2d1b5e" opacity=".7"/>
      <rect x="${w*.53}" y="${h*.36}" width="${w*.22}" height="${h*.28}" rx="5" fill="#2d1b5e" opacity=".7"/>
      <rect x="${w*.46}" y="${h*.42}" width="${w*.08}" height="${h*.16}" rx="2" fill="#a78bfa" opacity=".5"/>
      <!-- glow from headset -->
      <ellipse cx="${w*.5}" cy="${h*.7}" rx="${w*.3}" ry="${h*.08}" fill="#a78bfa" opacity=".1"/>
      <!-- sparkles -->
      <circle cx="${w*.2}" cy="${h*.18}" r="2" fill="#a78bfa" opacity=".6">
        <animate attributeName="opacity" values=".2;.9;.2" dur="1.8s" repeatCount="indefinite"/>
      </circle>
      <circle cx="${w*.82}" cy="${h*.22}" r="2.5" fill="#c4b5fd" opacity=".5">
        <animate attributeName="opacity" values=".5;1;.5" dur="2.4s" repeatCount="indefinite"/>
      </circle>
    </svg>`;
  },

  /* ── RICOS / WEALTH ── */
  ricos(w=800, h=450) {
    return `<svg viewBox="0 0 ${w} ${h}" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid slice">
      <defs>
        <radialGradient id="rg" cx="40%" cy="50%" r="70%">
          <stop offset="0%" stop-color="#1a1200"/>
          <stop offset="100%" stop-color="#050500"/>
        </radialGradient>
      </defs>
      <rect width="${w}" height="${h}" fill="url(#rg)"/>
      <!-- coin towers -->
      <rect x="60"  y="${h*.5}" width="50" height="${h*.38}" rx="3" fill="#8a6400" opacity=".55"/>
      <rect x="62"  y="${h*.48}" width="50" height="9" rx="2" fill="#F5C518" opacity=".8"/>
      <rect x="62"  y="${h*.5}" width="50" height="9" rx="2" fill="#F5C518" opacity=".65"/>
      <rect x="130" y="${h*.38}" width="50" height="${h*.5}" rx="3" fill="#8a6400" opacity=".55"/>
      <rect x="132" y="${h*.36}" width="50" height="9" rx="2" fill="#F5C518" opacity=".9"/>
      <rect x="132" y="${h*.44}" width="50" height="9" rx="2" fill="#F5C518" opacity=".75"/>
      <rect x="132" y="${h*.52}" width="50" height="9" rx="2" fill="#F5C518" opacity=".6"/>
      <rect x="200" y="${h*.24}" width="50" height="${h*.64}" rx="3" fill="#a07800" opacity=".6"/>
      <rect x="202" y="${h*.22}" width="50" height="9" rx="2" fill="#F5C518" opacity=".95"/>
      <rect x="202" y="${h*.30}" width="50" height="9" rx="2" fill="#F5C518" opacity=".8"/>
      <rect x="202" y="${h*.38}" width="50" height="9" rx="2" fill="#F5C518" opacity=".65"/>
      <rect x="202" y="${h*.46}" width="50" height="9" rx="2" fill="#F5C518" opacity=".5"/>
      <!-- huge dollar sign watermark -->
      <text x="${w*.38}" y="${h*.72}" font-family="sans-serif" font-size="${h*.9}" font-weight="900" fill="#F5C518" opacity=".06">$</text>
      <!-- rising graph line -->
      <path d="M${w*.58} ${h*.75} L${w*.65} ${h*.58} L${w*.72} ${h*.64} L${w*.8} ${h*.38} L${w*.87} ${h*.52} L${w*.94} ${h*.28}" stroke="#F5C518" stroke-width="2.5" fill="none" opacity=".65"/>
      <circle cx="${w*.94}" cy="${h*.28}" r="5" fill="#F5C518" opacity=".9"/>
      <!-- arrow up tip -->
      <path d="M${w*.91} ${h*.32} L${w*.94} ${h*.24} L${w*.97} ${h*.32}" fill="#F5C518" opacity=".8"/>
      <rect x="0" y="${h*.78}" width="${w}" height="${h*.22}" fill="url(#rg)" opacity=".92"/>
      <text x="24" y="${h*.9}" font-family="sans-serif" font-size="${h*.062}" font-weight="900" fill="#F5C518" letter-spacing="1.5">HÁBITOS DEL 1% MÁS RICO</text>
      <text x="24" y="${h*.96}" font-family="sans-serif" font-size="${h*.031}" fill="#555">Harvard Business Review · Wealth-X 2024</text>
    </svg>`;
  },

  /* ── RICOS entry thumbs ── */
  ricoRead(w=116, h=78) {
    return `<svg viewBox="0 0 ${w} ${h}" xmlns="http://www.w3.org/2000/svg">
      <rect width="${w}" height="${h}" fill="#0a0800"/>
      <rect x="${w*.15}" y="${h*.2}" width="${w*.3}" height="${h*.55}" rx="2" fill="#1a1200" stroke="#F5C518" stroke-width=".8" opacity=".8"/>
      <rect x="${w*.52}" y="${h*.2}" width="${w*.3}" height="${h*.55}" rx="2" fill="#1a1200" stroke="#F5C518" stroke-width=".8" opacity=".8"/>
      <line x1="${w*.2}" y1="${h*.34}" x2="${w*.4}" y2="${h*.34}" stroke="#F5C518" stroke-width=".7" opacity=".5"/>
      <line x1="${w*.2}" y1="${h*.42}" x2="${w*.4}" y2="${h*.42}" stroke="#F5C518" stroke-width=".7" opacity=".4"/>
      <line x1="${w*.2}" y1="${h*.5}" x2="${w*.4}" y2="${h*.5}" stroke="#F5C518" stroke-width=".7" opacity=".3"/>
      <line x1="${w*.57}" y1="${h*.34}" x2="${w*.77}" y2="${h*.34}" stroke="#F5C518" stroke-width=".7" opacity=".5"/>
      <line x1="${w*.57}" y1="${h*.42}" x2="${w*.77}" y2="${h*.42}" stroke="#F5C518" stroke-width=".7" opacity=".4"/>
    </svg>`;
  },
  ricoClock(w=116, h=78) {
    return `<svg viewBox="0 0 ${w} ${h}" xmlns="http://www.w3.org/2000/svg">
      <rect width="${w}" height="${h}" fill="#0a0800"/>
      <circle cx="${w*.5}" cy="${h*.48}" r="${w*.32}" fill="#1a1200" stroke="#F5C518" stroke-width="1.2" opacity=".8"/>
      <line x1="${w*.5}" y1="${h*.48}" x2="${w*.5}" y2="${h*.24}" stroke="#F5C518" stroke-width="1.5" opacity=".9"/>
      <line x1="${w*.5}" y1="${h*.48}" x2="${w*.68}" y2="${h*.56}" stroke="#F5C518" stroke-width="1" opacity=".8"/>
      <circle cx="${w*.5}" cy="${h*.48}" r="${w*.04}" fill="#F5C518"/>
      <line x1="${w*.5}" y1="${h*.2}" x2="${w*.5}" y2="${h*.16}" stroke="#F5C518" stroke-width="1.5" opacity=".7"/>
      <line x1="${w*.5}" y1="${h*.76}" x2="${w*.5}" y2="${h*.8}" stroke="#F5C518" stroke-width="1.5" opacity=".7"/>
      <line x1="${w*.18}" y1="${h*.48}" x2="${w*.14}" y2="${h*.48}" stroke="#F5C518" stroke-width="1.5" opacity=".7"/>
      <line x1="${w*.82}" y1="${h*.48}" x2="${w*.86}" y2="${h*.48}" stroke="#F5C518" stroke-width="1.5" opacity=".7"/>
    </svg>`;
  },
  ricoMultiple(w=116, h=78) {
    return `<svg viewBox="0 0 ${w} ${h}" xmlns="http://www.w3.org/2000/svg">
      <rect width="${w}" height="${h}" fill="#0a0800"/>
      <rect x="${w*.08}" y="${h*.55}" width="${w*.15}" height="${h*.3}" rx="2" fill="#F5C518" opacity=".6"/>
      <rect x="${w*.26}" y="${h*.4}" width="${w*.15}" height="${h*.45}" rx="2" fill="#F5C518" opacity=".7"/>
      <rect x="${w*.44}" y="${h*.25}" width="${w*.15}" height="${h*.6}" rx="2" fill="#F5C518" opacity=".8"/>
      <rect x="${w*.62}" y="${h*.38}" width="${w*.15}" height="${h*.47}" rx="2" fill="#F5C518" opacity=".7"/>
      <rect x="${w*.80}" y="${h*.18}" width="${w*.12}" height="${h*.57}" rx="2" fill="#F5C518" opacity=".9"/>
      <line x1="${w*.08}" y1="${h*.9}" x2="${w*.95}" y2="${h*.9}" stroke="#333" stroke-width=".7"/>
    </svg>`;
  },
  ricoHealth(w=116, h=78) {
    return `<svg viewBox="0 0 ${w} ${h}" xmlns="http://www.w3.org/2000/svg">
      <rect width="${w}" height="${h}" fill="#080a08"/>
      <path d="M${w*.5} ${h*.65} L${w*.22} ${h*.42} A${w*.2} ${h*.28} 0 0 1 ${w*.5} ${h*.28} A${w*.2} ${h*.28} 0 0 1 ${w*.78} ${h*.42} Z" fill="#6bcb77" opacity=".4"/>
      <path d="M${w*.5} ${h*.65} L${w*.24} ${h*.44} A${w*.18} ${h*.25} 0 0 1 ${w*.5} ${h*.3} A${w*.18} ${h*.25} 0 0 1 ${w*.76} ${h*.44} Z" fill="none" stroke="#6bcb77" stroke-width="1.2" opacity=".7"/>
      <rect x="${w*.44}" y="${h*.38}" width="${w*.12}" height="${h*.24}" rx="2" fill="#6bcb77" opacity=".8"/>
      <rect x="${w*.36}" y="${h*.46}" width="${w*.28}" height="${h*.1}" rx="2" fill="#6bcb77" opacity=".8"/>
    </svg>`;
  },
  ricoNetwork(w=116, h=78) {
    return `<svg viewBox="0 0 ${w} ${h}" xmlns="http://www.w3.org/2000/svg">
      <rect width="${w}" height="${h}" fill="#0a0800"/>
      <circle cx="${w*.5}" cy="${h*.45}" r="${w*.1}" fill="#F5C518" opacity=".8"/>
      <circle cx="${w*.2}" cy="${h*.25}" r="${w*.08}" fill="#F5C518" opacity=".6"/>
      <circle cx="${w*.8}" cy="${h*.25}" r="${w*.08}" fill="#F5C518" opacity=".6"/>
      <circle cx="${w*.2}" cy="${h*.7}" r="${w*.08}" fill="#F5C518" opacity=".5"/>
      <circle cx="${w*.8}" cy="${h*.7}" r="${w*.08}" fill="#F5C518" opacity=".5"/>
      <line x1="${w*.5}" y1="${h*.45}" x2="${w*.2}" y2="${h*.25}" stroke="#F5C518" stroke-width=".8" opacity=".4"/>
      <line x1="${w*.5}" y1="${h*.45}" x2="${w*.8}" y2="${h*.25}" stroke="#F5C518" stroke-width=".8" opacity=".4"/>
      <line x1="${w*.5}" y1="${h*.45}" x2="${w*.2}" y2="${h*.7}" stroke="#F5C518" stroke-width=".8" opacity=".4"/>
      <line x1="${w*.5}" y1="${h*.45}" x2="${w*.8}" y2="${h*.7}" stroke="#F5C518" stroke-width=".8" opacity=".4"/>
      <line x1="${w*.2}" y1="${h*.25}" x2="${w*.8}" y2="${h*.25}" stroke="#F5C518" stroke-width=".5" opacity=".2"/>
      <line x1="${w*.2}" y1="${h*.7}" x2="${w*.8}" y2="${h*.7}" stroke="#F5C518" stroke-width=".5" opacity=".2"/>
    </svg>`;
  },

  /* ── MINI CARD THUMBS ── */
  animals(w=600, h=338) {
    return `<svg viewBox="0 0 ${w} ${h}" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid slice">
      <defs><radialGradient id="anim" cx="50%" cy="50%" r="65%"><stop offset="0%" stop-color="#001a05"/><stop offset="100%" stop-color="#040504"/></radialGradient></defs>
      <rect width="${w}" height="${h}" fill="url(#anim)"/>
      <!-- snake body -->
      <path d="M80 ${h*.82} Q140 ${h*.76} 165 ${h*.68} Q185 ${h*.59} 175 ${h*.5} Q162 ${h*.41} 182 ${h*.35} Q210 ${h*.28} 240 ${h*.32} Q270 ${h*.37} 262 ${h*.47} Q250 ${h*.58} 272 ${h*.62} Q302 ${h*.66} 320 ${h*.59} Q342 ${h*.52} 370 ${h*.53} Q400 ${h*.54} 416 ${h*.62}" stroke="#6bcb77" stroke-width="11" fill="none" opacity=".6" stroke-linecap="round"/>
      <path d="M80 ${h*.82} Q140 ${h*.76} 165 ${h*.68} Q185 ${h*.59} 175 ${h*.5} Q162 ${h*.41} 182 ${h*.35} Q210 ${h*.28} 240 ${h*.32} Q270 ${h*.37} 262 ${h*.47} Q250 ${h*.58} 272 ${h*.62} Q302 ${h*.66} 320 ${h*.59} Q342 ${h*.52} 370 ${h*.53} Q400 ${h*.54} 416 ${h*.62}" stroke="#2d5c2d" stroke-width="14" fill="none" opacity=".3" stroke-linecap="round"/>
      <!-- head -->
      <ellipse cx="416" cy="${h*.62}" rx="20" ry="12" fill="#5a9e5a" opacity=".85"/>
      <circle cx="409" cy="${h*.58}" r="3" fill="#000"/>
      <circle cx="422" cy="${h*.58}" r="3" fill="#000"/>
      <path d="M436 ${h*.62} L452 ${h*.58} M452 ${h*.58} L460 ${h*.54} M452 ${h*.58} L460 ${h*.62}" stroke="#E8271E" stroke-width="1.5" fill="none"/>
      <!-- frog -->
      <circle cx="${w*.78}" cy="${h*.38}" r="${w*.05}" fill="#22c55e" opacity=".6"/>
      <circle cx="${w*.74}" cy="${h*.35}" r="${w*.025}" fill="#000" opacity=".8"/>
      <circle cx="${w*.82}" cy="${h*.35}" r="${w*.025}" fill="#000" opacity=".8"/>
      <!-- label -->
      <rect x="0" y="${h*.78}" width="${w}" height="${h*.22}" fill="url(#anim)" opacity=".92"/>
      <text x="24" y="${h*.9}" font-family="sans-serif" font-size="${h*.072}" font-weight="900" fill="#6bcb77" letter-spacing="1.5">TOP 10 ANIMALES LETALES</text>
    </svg>`;
  },

  iaSecreta(w=600, h=338) {
    return `<svg viewBox="0 0 ${w} ${h}" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid slice">
      <defs><radialGradient id="ias" cx="50%" cy="40%" r="70%"><stop offset="0%" stop-color="#00052a"/><stop offset="100%" stop-color="#030308"/></radialGradient></defs>
      <rect width="${w}" height="${h}" fill="url(#ias)"/>
      <!-- neural net -->
      <g opacity=".55">
        <circle cx="90"  cy="${h*.24}" r="7" fill="#3b82f6"/>
        <circle cx="90"  cy="${h*.44}" r="7" fill="#3b82f6"/>
        <circle cx="90"  cy="${h*.64}" r="7" fill="#3b82f6"/>
        <circle cx="90"  cy="${h*.84}" r="7" fill="#3b82f6"/>
        <circle cx="210" cy="${h*.3}"  r="8" fill="#6d28d9"/>
        <circle cx="210" cy="${h*.54}" r="8" fill="#6d28d9"/>
        <circle cx="210" cy="${h*.78}" r="8" fill="#6d28d9"/>
        <circle cx="330" cy="${h*.38}" r="10" fill="#3b82f6"/>
        <circle cx="330" cy="${h*.66}" r="10" fill="#3b82f6"/>
        <circle cx="450" cy="${h*.52}" r="15" fill="#E8271E">
          <animate attributeName="opacity" values=".4;1;.4" dur="2s" repeatCount="indefinite"/>
        </circle>
        <text x="446" y="${h*.56}" font-size="18" fill="white">?</text>
        <!-- edges 1→2 -->
        <line x1="97" y1="${h*.24}" x2="203" y2="${h*.3}"  stroke="#3b82f6" stroke-width=".8"/>
        <line x1="97" y1="${h*.24}" x2="203" y2="${h*.54}" stroke="#3b82f6" stroke-width=".8"/>
        <line x1="97" y1="${h*.44}" x2="203" y2="${h*.3}"  stroke="#3b82f6" stroke-width=".8"/>
        <line x1="97" y1="${h*.44}" x2="203" y2="${h*.54}" stroke="#3b82f6" stroke-width=".8"/>
        <line x1="97" y1="${h*.64}" x2="203" y2="${h*.54}" stroke="#3b82f6" stroke-width=".8"/>
        <line x1="97" y1="${h*.64}" x2="203" y2="${h*.78}" stroke="#3b82f6" stroke-width=".8"/>
        <line x1="97" y1="${h*.84}" x2="203" y2="${h*.78}" stroke="#3b82f6" stroke-width=".8"/>
        <!-- edges 2→3 -->
        <line x1="217" y1="${h*.3}"  x2="321" y2="${h*.38}" stroke="#6d28d9" stroke-width=".8"/>
        <line x1="217" y1="${h*.54}" x2="321" y2="${h*.38}" stroke="#6d28d9" stroke-width=".8"/>
        <line x1="217" y1="${h*.54}" x2="321" y2="${h*.66}" stroke="#6d28d9" stroke-width=".8"/>
        <line x1="217" y1="${h*.78}" x2="321" y2="${h*.66}" stroke="#6d28d9" stroke-width=".8"/>
        <!-- edges 3→out -->
        <line x1="339" y1="${h*.38}" x2="437" y2="${h*.52}" stroke="#E8271E" stroke-width="1.4"/>
        <line x1="339" y1="${h*.66}" x2="437" y2="${h*.52}" stroke="#E8271E" stroke-width="1.4"/>
      </g>
      <!-- Lock icon -->
      <rect x="${w*.75}" y="${h*.25}" width="${w*.12}" height="${h*.22}" rx="5" fill="#0a102c" stroke="#60a5fa" stroke-width="1" />
      <path d="M${w*.81} ${h*.25} v-${h*.08} a${w*.03},${h*.08} 0 0,1 ${w*.06},0 v${h*.08}" fill="none" stroke="#60a5fa" stroke-width="1.5"/>
      <rect x="0" y="${h*.78}" width="${w}" height="${h*.22}" fill="url(#ias)" opacity=".92"/>
      <text x="24" y="${h*.9}" font-family="sans-serif" font-size="${h*.072}" font-weight="900" fill="#60a5fa" letter-spacing="1.5">IAs SECRETAS FILTRADAS</text>
    </svg>`;
  },

  comida(w=600, h=338) {
    return `<svg viewBox="0 0 ${w} ${h}" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid slice">
      <defs><radialGradient id="cf" cx="50%" cy="40%" r="70%"><stop offset="0%" stop-color="#1a0800"/><stop offset="100%" stop-color="#050300"/></radialGradient></defs>
      <rect width="${w}" height="${h}" fill="url(#cf)"/>
      <!-- background food icons -->
      <g fill="#f97316" opacity=".08">
        <!-- soda can -->
        <rect x="${w*.15}" y="${h*.25}" width="${w*.12}" height="${h*.4}" rx="8" />
        <ellipse cx="${w*.21}" cy="${h*.25}" rx="${w*.06}" ry="${h*.04}" />
        <rect x="${w*.16}" y="${h*.28}" width="${w*.1}" height="${h*.05}" rx="4" fill="#fff" opacity=".1"/>
        <!-- burger -->
        <rect x="${w*.7}" y="${h*.4}" width="${w*.2}" height="${h*.08}" rx="5" />
        <rect x="${w*.7}" y="${h*.5}" width="${w*.2}" height="${h*.08}" rx="5" />
        <path d="M${w*.7} ${h*.4} a${w*.1},${h*.08} 0 0,1 ${w*.2},0" />
      </g>
      <!-- warning label -->
      <rect x="${w*.22}" y="${h*.08}" width="${w*.56}" height="${h*.65}" rx="8" fill="#130300" stroke="#E8271E" stroke-width="1.2" opacity=".85"/>
      <rect x="${w*.22}" y="${h*.08}" width="${w*.56}" height="${h*.17}" rx="6" fill="#E8271E" opacity=".65"/>
      <text x="${w*.5}" y="${h*.19}" font-family="sans-serif" font-size="${h*.076}" font-weight="900" fill="white" text-anchor="middle" letter-spacing="1">⚠ ULTRA-PROCESADO</text>
      <text x="${w*.5}" y="${h*.34}" font-family="sans-serif" font-size="${h*.042}" fill="#999" text-anchor="middle">Aditivos: E-211, E-330, E-951</text>
      <text x="${w*.5}" y="${h*.43}" font-family="sans-serif" font-size="${h*.042}" fill="#999" text-anchor="middle">Azúcar: 42g por porción</text>
      <text x="${w*.5}" y="${h*.52}" font-family="sans-serif" font-size="${h*.042}" fill="#999" text-anchor="middle">Sodio: 980mg — Colorantes: 6</text>
      <text x="${w*.5}" y="${h*.63}" font-family="sans-serif" font-size="${h*.042}" fill="#666" text-anchor="middle">¿Saludable? ❌  ¿Adictivo? ✓</text>
      <rect x="0" y="${h*.78}" width="${w}" height="${h*.22}" fill="url(#cf)" opacity=".92"/>
      <text x="24" y="${h*.9}" font-family="sans-serif" font-size="${h*.072}" font-weight="900" fill="#f97316" letter-spacing="1.5">ALIMENTOS QUE TE MIENTEN</text>
    </svg>`;
  },

  historia(w=600, h=338) {
    return `<svg viewBox="0 0 ${w} ${h}" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid slice">
      <defs><radialGradient id="hg" cx="40%" cy="60%" r="70%"><stop offset="0%" stop-color="#1a0000"/><stop offset="100%" stop-color="#080505"/></radialGradient></defs>
      <rect width="${w}" height="${h}" fill="url(#hg)"/>
      <!-- roman pillars -->
      <path d="M70 ${h*.83} L70 ${h*.28} L98 ${h*.28} L98 ${h*.83} L90 ${h*.83} L90 ${h*.4} L78 ${h*.4} L78 ${h*.83} Z" fill="#2d1515" stroke="#5a2222" stroke-width="1" opacity=".8"/>
      <rect x="67" y="${h*.24}" width="34" height="11" rx="2" fill="#3d1a1a" stroke="#7a2d2d" stroke-width="1" opacity=".8"/>
      <rect x="67" y="${h*.81}" width="34" height="11" rx="2" fill="#3d1a1a" stroke="#7a2d2d" stroke-width="1" opacity=".8"/>
      <rect x="138" y="${h*.22}" width="28" height="${h*.6}" rx="2" fill="#2d1515" stroke="#5a2222" stroke-width="1" opacity=".7"/>
      <rect x="135" y="${h*.18}" width="34" height="11" rx="2" fill="#3d1a1a" stroke="#7a2d2d" stroke-width="1" opacity=".8"/>
      <rect x="135" y="${h*.81}" width="34" height="11" rx="2" fill="#3d1a1a" stroke="#7a2d2d" stroke-width="1" opacity=".8"/>
      <rect x="206" y="${h*.3}" width="28" height="${h*.52}" rx="2" fill="#2d1515" stroke="#5a2222" stroke-width="1" opacity=".8"/>
      <rect x="203" y="${h*.26}" width="34" height="11" rx="2" fill="#3d1a1a" stroke="#7a2d2d" stroke-width="1" opacity=".8"/>
      <rect x="203" y="${h*.81}" width="34" height="11" rx="2" fill="#3d1a1a" stroke="#7a2d2d" stroke-width="1" opacity=".8"/>
      <!-- fire -->
      <text x="${w*.54}" y="${h*.7}" font-family="sans-serif" font-size="${h*.72}" opacity=".2">🔥</text>
      <!-- sword -->
      <path d="M${w*.7} ${h*.2} L${w*.85} ${h*.7} M${w*.75} ${h*.62} L${w*.95} ${h*.62}" stroke="#F5C518" stroke-width="4" opacity=".25" stroke-linecap="round"/>
      <rect x="0" y="${h*.78}" width="${w}" height="${h*.22}" fill="url(#hg)" opacity=".92"/>
      <text x="24" y="${h*.9}" font-family="sans-serif" font-size="${h*.072}" font-weight="900" fill="#ef4444" letter-spacing="1.5">IMPERIOS MÁS BRUTALES</text>
    </svg>`;
  },

  cerebro(w=600, h=338) {
    return `<svg viewBox="0 0 ${w} ${h}" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid slice">
      <defs><radialGradient id="brg" cx="50%" cy="45%" r="65%"><stop offset="0%" stop-color="#0d0020"/><stop offset="100%" stop-color="#040408"/></radialGradient></defs>
      <rect width="${w}" height="${h}" fill="url(#brg)"/>
      <!-- brain shape -->
      <path d="M160 ${h*.7} Q120 ${h*.65} 105 ${h*.55} Q88 ${h*.44} 105 ${h*.34} Q118 ${h*.25} 148 ${h*.26} Q155 ${h*.16} 186 ${h*.14} Q220 ${h*.1} 240 ${h*.2} Q252 ${h*.1} 290 ${h*.08} Q326 ${h*.05} 346 ${h*.2} Q374 ${h*.12} 400 ${h*.2} Q430 ${h*.18} 442 ${h*.34} Q460 ${h*.44} 450 ${h*.56} Q436 ${h*.68} 408 ${h*.7} Q384 ${h*.78} 350 ${h*.76} Q320 ${h*.82} 290 ${h*.72} Q262 ${h*.82} 228 ${h*.76} Q196 ${h*.78} 160 ${h*.7}Z" fill="none" stroke="#a78bfa" stroke-width="1.5" opacity=".45"/>
      <!-- synapses -->
      <circle cx="210" cy="${h*.3}"  r="4" fill="#a78bfa" opacity=".9"><animate attributeName="opacity" values=".3;1;.3" dur="1.7s" repeatCount="indefinite"/></circle>
      <circle cx="290" cy="${h*.22}" r="5" fill="#c4b5fd" opacity=".8"><animate attributeName="opacity" values=".5;1;.5" dur="2.2s" repeatCount="indefinite"/></circle>
      <circle cx="370" cy="${h*.3}"  r="4" fill="#a78bfa" opacity=".7"><animate attributeName="opacity" values=".3;.9;.3" dur="1.5s" repeatCount="indefinite"/></circle>
      <circle cx="240" cy="${h*.5}"  r="4.5" fill="#a78bfa" opacity=".8"><animate attributeName="opacity" values=".5;1;.5" dur="2s" repeatCount="indefinite"/></circle>
      <circle cx="345" cy="${h*.44}" r="4" fill="#c4b5fd" opacity=".7"><animate attributeName="opacity" values=".3;.9;.3" dur="2.5s" repeatCount="indefinite"/></circle>
      <circle cx="290" cy="${h*.6}"  r="5" fill="#a78bfa" opacity=".9"><animate attributeName="opacity" values=".4;1;.4" dur="1.9s" repeatCount="indefinite"/></circle>
      <!-- connections -->
      <line x1="210" y1="${h*.3}"  x2="290" y2="${h*.22}" stroke="#7c3aed" stroke-width=".7" opacity=".35"/>
      <line x1="290" y1="${h*.22}" x2="370" y2="${h*.3}"  stroke="#7c3aed" stroke-width=".7" opacity=".35"/>
      <line x1="240" y1="${h*.5}"  x2="290" y2="${h*.22}" stroke="#7c3aed" stroke-width=".7" opacity=".3"/>
      <line x1="345" y1="${h*.44}" x2="370" y2="${h*.3}"  stroke="#7c3aed" stroke-width=".7" opacity=".3"/>
      <line x1="240" y1="${h*.5}"  x2="345" y2="${h*.44}" stroke="#7c3aed" stroke-width=".7" opacity=".3"/>
      <line x1="290" y1="${h*.6}"  x2="240" y2="${h*.5}"  stroke="#7c3aed" stroke-width=".7" opacity=".3"/>
      <line x1="290" y1="${h*.6}"  x2="345" y2="${h*.44}" stroke="#7c3aed" stroke-width=".7" opacity=".3"/>
      <!-- question -->
      <text x="${w*.72}" y="${h*.68}" font-family="sans-serif" font-size="${h*.52}" fill="#a78bfa" opacity=".1" font-weight="900">?</text>
      <rect x="0" y="${h*.78}" width="${w}" height="${h*.22}" fill="url(#brg)" opacity=".92"/>
      <text x="24" y="${h*.9}" font-family="sans-serif" font-size="${h*.072}" font-weight="900" fill="#a78bfa" letter-spacing="1.5">TU CEREBRO TE ENGAÑA</text>
    </svg>`;
  },

  foodWarning(w=116, h=78) {
    return `<svg viewBox="0 0 ${w} ${h}" xmlns="http://www.w3.org/2000/svg">
      <rect width="${w}" height="${h}" fill="#1a0800"/>
      <path d="M${w*.5} ${h*.15} L${w*.1} ${h*.85} L${w*.9} ${h*.85} Z" fill="#130300" stroke="#E8271E" stroke-width="1.2"/>
      <text x="${w*.5}" y="${h*.65}" font-size="32" fill="#E8271E" text-anchor="middle" font-weight="bold">!</text>
    </svg>`;
  },

  realImageThumb(id, theme, w=116, h=78) {
    const item = REAL_PHOTOS[id];
    if (!item) return SVG.foodWarning(w, h);
    const alt = item.alt || (theme ? `${theme} ${id}` : id);
    return `<img class="ae-photo" src="${item.src}" width="${w}" height="${h}" loading="lazy" decoding="async" alt="${alt}">`;
  },

  brutalThumb(w=116, h=78) {
    return `<svg viewBox="0 0 ${w} ${h}" xmlns="http://www.w3.org/2000/svg">
      <rect width="${w}" height="${h}" fill="#1a0000"/>
      <path d="M${w*.3} ${h*.2} L${w*.7} ${h*.8} M${w*.35} ${h*.7} L${w*.8} ${h*.65}" stroke="#ef4444" stroke-width="4" opacity=".7" stroke-linecap="round"/>
      <path d="M${w*.7} ${h*.2} L${w*.3} ${h*.8}" stroke="#ef4444" stroke-width="4" opacity=".7" stroke-linecap="round"/>
    </svg>`;
  },

  /* ── CEREBRO entry thumbs ── */
  brainBias(w=116, h=78) {
    return `<svg viewBox="0 0 ${w} ${h}" xmlns="http://www.w3.org/2000/svg">
      <rect width="${w}" height="${h}" fill="#08040f"/>
      <path d="M${w*.2} ${h*.5} L${w*.8} ${h*.5}" stroke="#a78bfa" stroke-width="1.5" opacity=".6"/>
      <path d="M${w*.5} ${h*.2} L${w*.5} ${h*.8}" stroke="#a78bfa" stroke-width="1.5" opacity=".6"/>
      <rect x="${w*.2}" y="${h*.2}" width="${w*.25}" height="${h*.25}" fill="#a78bfa" opacity=".3"/>
      <rect x="${w*.55}" y="${h*.55}" width="${w*.25}" height="${h*.25}" fill="#a78bfa" opacity=".3"/>
      <text x="${w*.3}" y="${h*.75}" font-size="24" fill="#a78bfa" opacity=".5" font-weight="bold">A</text>
      <text x="${w*.6}" y="${h*.45}" font-size="24" fill="#a78bfa" opacity=".5" font-weight="bold">B</text>
    </svg>`;
  },
  brainPredict(w=116, h=78) {
    return `<svg viewBox="0 0 ${w} ${h}" xmlns="http://www.w3.org/2000/svg">
      <rect width="${w}" height="${h}" fill="#08040f"/>
      <path d="M${w*.15} ${h*.6} C ${w*.3} ${h*.2}, ${w*.7} ${h*.2}, ${w*.85} ${h*.6}" stroke="#a78bfa" stroke-width="1.5" fill="none" opacity=".7" stroke-dasharray="4 4"/>
      <circle cx="${w*.85}" cy="${h*.6}" r="4" fill="#c4b5fd" opacity=".9"/>
      <path d="M${w*.15} ${h*.6} L${w*.25} ${h*.5} L${w*.35} ${h*.6} L${w*.45} ${h*.5}" stroke="#a78bfa" stroke-width="1.5" fill="none" opacity=".7"/>
    </svg>`;
  },

  /* ── RANK ITEM small thumbs ─── each unique style ── */
  rankThumb(country, w=100, h=72) {
    const configs = {
      yemen:  { bg: '#180500', accent: '#E8271E', label: '🇾🇪 YEM', style: 'conflict' },
      ukraine:{ bg: '#001a33', accent: '#ffcc00', label: '🇺🇦 UKR', style: 'flag' },
      somalia:{ bg: '#060a00', accent: '#F5C518', label: '🇸🇴 SOM', style: 'lines' },
      syria:  { bg: '#080608', accent: '#e74c3c', label: '🇸🇾 SYR', style: 'ruins' },
      haiti:  { bg: '#090606', accent: '#e67e22', label: '🇭🇹 HAI', style: 'circle' },
      sudan:  { bg: '#060a06', accent: '#e74c3c', label: '🇸🇩 SDN', style: 'terrain' },
    };
    const c = configs[country] || configs.yemen;
    if (c.style === 'flag')   return SVG.ukraine(w,h);
    if (c.style === 'conflict') return SVG.yemen(w,h);
    if (c.style === 'lines')   return SVG.somalia(w,h);
    if (c.style === 'ruins')   return SVG.syria(w,h);
    if (c.style === 'circle')  return SVG.haiti(w,h);
    return SVG.sudan(w,h);
  },
};

/* ── ARTICLE DATA ──────────────────────────────────────────────────────── */
const ARTICLES = {
  paises: {
    cat: '🌍 Geopolítica · Conflicto',
    title: 'Los 10 Países Más Peligrosos del Mundo en 2026',
    intro: 'Basado en el Índice de Paz Global (GPI), conflictos activos y crisis humanitarias. Este es el ranking actualizado que ningún gobierno quiere liderar.',
    heroSVG: () => SVG.world(800, 280),
    entries: [
      { flag: ICONS.country('YE', '#E8271E'), title:'Yemen',    thumbSVG: () => SVG.rankThumb('yemen',116,78),   desc:'La crisis humanitaria más grave del planeta según la ONU. La guerra civil prolongada ha destruido la infraestructura básica, llevando a hambrunas, brotes de cólera y un colapso casi total de los servicios públicos.' },
      { flag: ICONS.country('UA', '#ffcc00'), title:'Ucrania',  thumbSVG: () => SVG.rankThumb('ukraine',116,78), desc:'La invasión a gran escala ha provocado la mayor crisis de refugiados en Europa desde la Segunda Guerra Mundial. Ciudades enteras han sido devastadas y millones de civiles viven bajo la amenaza constante de ataques.' },
      { flag: ICONS.country('SD', '#e74c3c'), title:'Sudán',    thumbSVG: () => SVG.rankThumb('sudan',116,78),   desc:'Una brutal guerra civil entre facciones militares ha desplazado a más de 9 millones de personas. Se reportan crímenes de guerra y una limpieza étnica en la región de Darfur, con un acceso humanitario casi nulo.' },
      { flag: ICONS.country('HT', '#e67e22'), title:'Haití',    thumbSVG: () => SVG.rankThumb('haiti',116,78),   desc:'El colapso del estado ha dejado el control de la capital, Puerto Príncipe, en manos de bandas armadas. La violencia extrema, los secuestros y la parálisis económica definen la vida diaria de sus ciudadanos.' },
      { flag: ICONS.country('SY', '#e74c3c'), title:'Siria',    thumbSVG: () => SVG.rankThumb('syria',116,78),   desc:'Tras más de una década de guerra, el país sigue fragmentado y con zonas bajo control de diferentes actores armados. La economía está en ruinas y más de la mitad de la población depende de la ayuda humanitaria para sobrevivir.' },
    ]
  },
  trabajos: {
    cat: '💼 Economía · Futuro del Trabajo',
    title: 'Top 7 Trabajos que Existirán en 2030 (y Cuánto Pagan)',
    intro: 'El Foro Económico Mundial estima que el 65% de los niños en primaria tendrán empleos que aún no existen. Aquí los más prometedores con salarios actuales en mercados avanzados.',
    heroSVG: () => SVG.jobs(800, 280),
    entries: [
      { flag: ICONS.robot(),    title:'Entrenador de IA (AI Trainer)',         thumbSVG: () => SVG.jobAI(116,78),       desc:'Personas que enseñan a modelos de lenguaje a comportarse correctamente. Salario en EEUU: $85k–$150k/año. Crecimiento proyectado: +340% para 2028 según el WEF.' },
      { flag: ICONS.dna(),      title:'Ingeniero de Medicina Personalizada',   thumbSVG: () => SVG.jobBio(116,78),      desc:'Combina genética, IA y farmacología para crear tratamientos específicos por paciente. Considerado el campo médico de mayor crecimiento en la próxima década.' },
      { flag: ICONS.leaf(),     title:'Especialista en Carbono',               thumbSVG: () => SVG.jobCarbon(116,78),   desc:'Con la regulación climática en aumento, las empresas necesitan expertos que gestionen su huella de carbono. El mercado global de carbono superará los $2.5 billones en 2030.' },
      { flag: ICONS.drone(),    title:'Coordinador de Movilidad Autónoma',     thumbSVG: () => SVG.jobDrone(116,78),    desc:'Drones de reparto y vehículos autónomos necesitan operadores humanos que gestionen flotas desde centros de control. Un trabajo 100% nuevo sin precedente histórico.' },
      { flag: ICONS.brain(),    title:'Psicólogo Digital / Terapeuta VR',      thumbSVG: () => SVG.jobPsych(116,78),    desc:'La salud mental en entornos virtuales y el tratamiento de adicciones digitales es un campo emergente con enorme demanda en países desarrollados.' },
    ]
  },
  ricos: {
    cat: '💰 Dinero · Mentalidad · Éxito',
    title: 'Top 10 Cosas que el 1% Más Rico Hace Diferente',
    intro: 'No es suerte, no es herencia (en la mayoría de casos). Estudios de Harvard y datos de Wealth-X revelan patrones muy concretos en los millonarios autohechos.',
    heroSVG: () => SVG.ricos(800, 280),
    entries: [
      { flag: ICONS.book(),     title:'Leen mínimo 30 minutos al día',             thumbSVG: () => SVG.realImageThumb('rich-reading', 'ricos'),      desc:'Warren Buffett lee 500 páginas al día. Bill Gates 50 libros al año. El 88% de los millonarios autohechos leen cada mañana: no periódicos, sino biología, historia y ciencias aplicadas.' },
      { flag: ICONS.clock(),    title:'Controlan su tiempo como si fuera dinero',  thumbSVG: () => SVG.realImageThumb('rich-time', 'ricos'),         desc:'Tim Ferriss documentó que el 91% de los ejecutivos de alto ingreso tienen rituales matutinos estrictos y rechazan más del 60% de las reuniones que les proponen.' },
      { flag: ICONS.bars(),     title:'Tienen múltiples fuentes de ingresos',      thumbSVG: () => SVG.realImageThumb('rich-income', 'ricos'),       desc:'El millonario estadounidense promedio tiene 7 fuentes de ingresos distintas. Nunca dependen de una sola, especialmente de un salario mensual.' },
      { flag: ICONS.health(),   title:'Invierten en salud como un activo',         thumbSVG: () => SVG.realImageThumb('rich-health', 'ricos'),       desc:'No como un gasto. Bezos y Musk tienen personal trainer y nutricionista. El retorno de inversión en salud es estadísticamente el más alto que existe a largo plazo.' },
      { flag: ICONS.network(),  title:'Cultivan redes de alto valor',              thumbSVG: () => SVG.realImageThumb('rich-network', 'ricos'),      desc:'"Quiénes te rodean = quién serás" no es un cliché. Es estadística pura respaldada por estudios longitudinales de más de 20 años de seguimiento académico.' },
    ]
  },
  cerebro: {
    cat: '🧠 Ciencia · Psicología',
    title: '7 Maneras en que Tu Cerebro Te Engaña (y No Te Das Cuenta)',
    intro: 'Tu cerebro no es una cámara de video objetiva. Es una máquina de predicción que constantemente toma atajos. Aquí te mostramos los más comunes que afectan tu día a día.',
    heroSVG: () => SVG.cerebro(800, 280),
    entries: [
      { flag: ICONS.search(),     title:'Sesgo de Confirmación', thumbSVG: () => SVG.realImageThumb('brain-bias', 'cerebro'), desc:'Tu cerebro busca activamente información que confirme lo que ya crees y descarta la que lo contradice. Es por eso que los debates en redes sociales rara vez cambian la opinión de alguien.' },
      { flag: ICONS.prediction(), title:'Es una Máquina de Predicción', thumbSVG: () => SVG.realImageThumb('brain-predict', 'cerebro'), desc:'No reaccionas al mundo, lo predices. Lo que experimentas como "realidad" es la simulación que tu cerebro genera un instante antes de recibir la información sensorial. A veces, la predicción falla (déjà vu).' },
      { flag: ICONS.scissors(),   title:'Edita tus Recuerdos', thumbSVG: () => SVG.realImageThumb('brain-memory', 'cerebro'), desc:'Cada vez que recuerdes algo, no estás "reproduciendo" un archivo. Estás reconstruyendo el recuerdo, y cada reconstrucción lo altera ligeramente. Tus recuerdos más antiguos son, probablemente, los más ficticios.' },
      { flag: ICONS.ghost(),      title:'Crea Patrones Donde No los Hay', thumbSVG: () => SVG.realImageThumb('brain-patterns', 'cerebro'), desc:'Ver caras en las nubes o escuchar mensajes en ruido blanco (pareidolia). Tu cerebro está programado para encontrar patrones y agencias, incluso si son producto del azar. Fue una ventaja evolutiva para detectar depredadores.' },
    ]
  },
  iaSecreta: {
    cat: '🤖 Tecnología · Conspiración',
    title: 'Las 5 IAs Más Peligrosas Desarrolladas en Secreto',
    intro: 'Más allá de los modelos públicos, agencias de inteligencia y corporaciones desarrollan IAs con capacidades que desafían la ética y la seguridad global. Esto es lo que se ha filtrado.',
    heroSVG: () => SVG.iaSecreta(800, 280),
    entries: [
      { flag: ICONS.eye(),        title:'Proyecto "Chimera"', thumbSVG: () => SVG.realImageThumb('ai-chimera', 'ia'), desc:'Supuestamente una IA de vigilancia predictiva que integra datos de redes sociales, cámaras urbanas y transacciones para predecir crímenes antes de que ocurran. Críticos temen un estado de vigilancia total.' },
      { flag: ICONS.megaphone(),  title:'"Loki\'s Gambit"', thumbSVG: () => SVG.realImageThumb('ai-loki', 'ia'), desc:'Un modelo de lenguaje diseñado para crear y diseminar desinformación a escala masiva, capaz de generar noticias falsas, perfiles de redes sociales y videos deepfake indistinguibles de la realidad.' },
      { flag: ICONS.graphDown(),  title:'"Khaos"', thumbSVG: () => SVG.realImageThumb('ai-khaos', 'ia'), desc:'Una IA de trading de alta frecuencia que, según rumores, puede manipular mercados financieros enteros en milisegundos, provocando crisis económicas para beneficio de un actor estatal o privado.' },
      { flag: ICONS.explosion(),  title:'"Ares"', thumbSVG: () => SVG.realImageThumb('ai-ares', 'ia'), desc:'Un sistema operativo para enjambres de drones autónomos de combate. No necesita intervención humana para seleccionar y eliminar objetivos, violando todas las convenciones internacionales propuestas.' },
      { flag: ICONS.brain('#60a5fa'), title:'"Morpheus"', thumbSVG: () => SVG.realImageThumb('ai-morpheus', 'ia'), desc:'Una IA capaz de generar realidades virtuales personalizadas e inmersivas directamente en la corteza cerebral. Su potencial para el control mental y la manipulación de la percepción es ilimitado.' },
    ]
  },
  comida: {
    cat: '🍔 Salud · Nutrición',
    title: 'Top 10 Alimentos Ultraprocesados que Sigues Comiendo',
    intro: 'Son baratos, adictivos y están en todas partes. Los ultraprocesados son formulaciones industriales con ingredientes que no encontrarías en tu cocina. Aquí los más comunes y su impacto.',
    heroSVG: () => SVG.comida(800, 280),
    entries: [
      { flag: ICONS.soda(),   title:'Refrescos y Bebidas Azucaradas', thumbSVG: () => SVG.realImageThumb('soda-drinks', 'food'), desc:'La fuente #1 de azúcares añadidos. Cero valor nutricional y directamente relacionados con la obesidad, diabetes tipo 2 y enfermedades cardíacas. El "jarabe de maíz de alta fructosa" es el ingrediente clave.' },
      { flag: ICONS.hotdog(), title:'Carnes Procesadas (Salchichas, Embutidos)', thumbSVG: () => SVG.realImageThumb('processed-meat', 'food'), desc:'La OMS los clasifica como carcinógenos del Grupo 1, al mismo nivel que el tabaco y el asbesto. Nitratos, nitritos y alto contenido en sodio son los principales culpables.' },
      { flag: ICONS.cereal(), title:'Cereales de Desayuno Azucarados', thumbSVG: () => SVG.realImageThumb('sugary-cereal', 'food'), desc:'Publicitados como saludables, la mayoría son granos refinados cubiertos de azúcar y colorantes. Provocan picos de insulina y un "crash" de energía a media mañana.' },
      { flag: ICONS.fries(),  title:'Papas Fritas de Bolsa y Snacks Salados', thumbSVG: () => SVG.realImageThumb('potato-chips', 'food'), desc:'Diseñados en laboratorio para ser "hiper-palatables" (imposibles de comer solo uno). Altos en grasas trans, sodio y acrilamida, un compuesto potencialmente cancerígeno.' },
      { flag: ICONS.ramen(),  title:'Sopas Instantáneas y Fideos Ramen', thumbSVG: () => SVG.realImageThumb('instant-ramen', 'food'), desc:'Contienen niveles astronómicos de sodio (a menudo más del 100% de la ingesta diaria recomendada en un solo paquete) y glutamato monosódico (MSG) para potenciar el sabor.' },
    ]
  },
  historia: {
    cat: '⚔️ Historia · Conflicto',
    title: 'Los 5 Imperios Más Brutales de la Historia Humana',
    intro: 'La historia está escrita con sangre, pero algunos imperios llevaron la conquista y la subyugación a niveles de crueldad que resonaron por siglos. Esta es una mirada a su legado oscuro.',
    heroSVG: () => SVG.historia(800, 280),
    entries: [
      { flag: ICONS.country('MN', '#ef4444'), title:'Imperio Mongol (Siglos XIII-XIV)', thumbSVG: () => SVG.realImageThumb('mongol-empire', 'historia'), desc:'Bajo Genghis Khan y sus sucesores, se estima que causaron la muerte de entre 30 y 40 millones de personas, el 11% de la población mundial de la época. Usaban el terror como táctica militar principal.' },
      { flag: ICONS.country('BE', '#ef4444'), title:'Estado Libre del Congo (1885-1908)', thumbSVG: () => SVG.realImageThumb('congo-free-state', 'historia'), desc:'No un imperio tradicional, sino la propiedad privada del Rey Leopoldo II de Bélgica. Su régimen de explotación del caucho y marfil causó la muerte de hasta 10 millones de congoleños mediante trabajos forzados, mutilaciones y hambrunas.' },
      { flag: ICONS.country('ES', '#ef4444'), title:'Imperio Español (en las Américas)', thumbSVG: () => SVG.realImageThumb('spanish-empire', 'historia'), desc:'La conquista de los imperios Azteca e Inca, junto con la propagación de enfermedades y el sistema de encomiendas (esclavitud encubierta), provocó un colapso demográfico sin precedentes en la población indígena.' },
      { flag: ICONS.country('JP', '#ef4444'), title:'Imperio del Japón (1937-1945)', thumbSVG: () => SVG.realImageThumb('japanese-empire', 'historia'), desc:'Durante la Segunda Guerra Sino-Japonesa y la Guerra del Pacífico, el ejército japonés fue responsable de masacres como la de Nankín, experimentación humana (Unidad 731) y el uso de "mujeres de consuelo".' },
      { flag: ICONS.country('GB', '#ef4444'), title:'Imperio Británico', thumbSVG: () => SVG.realImageThumb('british-empire', 'historia'), desc:'Aunque su legado es complejo, fue responsable de hambrunas masivas en la India que mataron a millones, la violenta represión de rebeliones como la de los Mau Mau en Kenia y el comercio transatlántico de esclavos.' },
    ]
  },
  animals: {
    cat: '🐍 Naturaleza · Peligro',
    title: 'Los 5 Animales Más Venenosos del Mundo',
    intro: 'No se mide por la fuerza de la mordida, sino por la toxicidad de su veneno y la velocidad con la que puede matar a un ser humano. Estos son los campeones indiscutibles.',
    heroSVG: () => SVG.animals(800, 280),
    entries: [
      { flag: ICONS.skull(), title:'Avispa de Mar (Box Jellyfish)', thumbSVG: () => SVG.realImageThumb('box-jellyfish', 'venom'), desc:'El animal más venenoso del planeta. Su veneno ataca el corazón, el sistema nervioso y las células de la piel. Una picadura puede matar a un humano en menos de 5 minutos.' },
      { flag: ICONS.skull(), title:'Taipán del Interior', thumbSVG: () => SVG.realImageThumb('inland-taipan', 'venom'), desc:'La serpiente más venenosa del mundo. Una sola mordida contiene suficiente veneno para matar a 100 hombres adultos. Afortunadamente, es extremadamente tímida y rara vez se encuentra con humanos.' },
      { flag: ICONS.skull(), title:'Pulpo de Anillos Azules', thumbSVG: () => SVG.realImageThumb('blue-ringed-octopus', 'venom'), desc:'Pequeño pero mortal. Su veneno, la tetrodotoxina, es 1,000 veces más potente que el cianuro. No existe antídoto. Causa parálisis respiratoria en minutos.' },
      { flag: ICONS.skull(), title:'Pez Piedra', thumbSVG: () => SVG.realImageThumb('stonefish', 'venom'), desc:'El pez más venenoso. Se camufla perfectamente como una roca. Pisar una de sus 13 espinas dorsales causa un dolor insoportable, shock, parálisis y muerte del tejido.' },
      { flag: ICONS.skull(), title:'Caracol Cono de Mármol', thumbSVG: () => SVG.realImageThumb('marble-cone-snail', 'venom'), desc:'Una sola gota de su veneno es suficiente para matar a 20 personas. Utiliza un "diente" similar a un arpón para inyectar una compleja mezcla de neurotoxinas.' },
    ]
  },
  animalsExtinct: {
    cat: '🦎 Naturaleza · Conservación',
    title: 'Los 5 Animales que se Extinguirán Este Año',
    intro: 'La pérdida de hábitat, la caza ilegal y el cambio climático están llevando a múltiples especies al límite. Estas son algunas de las que enfrentan riesgo crítico.',
    heroSVG: () => SVG.animals(800, 280),
    entries: [
      { flag: ICONS.skull(), title:'Vaquita Marina', thumbSVG: () => SVG.realImageThumb('extinct-vaquita', 'extincion'), desc:'La marsopa más rara del mundo. La pesca ilegal y las redes de enmalle han reducido su población a niveles críticos.' },
      { flag: ICONS.skull(), title:'Rinoceronte de Java', thumbSVG: () => SVG.realImageThumb('extinct-java-rhino', 'extincion'), desc:'Una de las especies más amenazadas. Su población es extremadamente pequeña y concentrada en un área reducida.' },
      { flag: ICONS.skull(), title:'Tigre de Sumatra', thumbSVG: () => SVG.realImageThumb('extinct-sumatra', 'extincion'), desc:'La deforestación y la caza furtiva han fragmentado su hábitat, dejando a la especie en peligro crítico.' },
      { flag: ICONS.skull(), title:'Orangután de Borneo', thumbSVG: () => SVG.realImageThumb('extinct-orangutan', 'extincion'), desc:'La expansión agrícola y la tala han destruido vastas zonas de bosque tropical.' },
      { flag: ICONS.skull(), title:'Kakapo', thumbSVG: () => SVG.realImageThumb('extinct-kakapo', 'extincion'), desc:'El loro nocturno de Nueva Zelanda. Su baja tasa de reproducción lo hace especialmente vulnerable.' },
    ]
  },
};

/* ── NAVIGATION ──────────────────────────────────────────────────────── */
function navigateTo(pageId) {
  // close article overlay if open
  closeArticle();

  // hide all pages
  document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));

  // show target
  const target = document.getElementById('page-' + pageId);
  if (target) {
    target.classList.add('active');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  // update nav links
  document.querySelectorAll('.nav-link').forEach(a => {
    a.classList.toggle('active', a.dataset.page === pageId);
  });

  // update footer links
  document.querySelectorAll('.footer-nav-link').forEach(a => {
    a.classList.toggle('active-page', a.dataset.page === pageId);
  });

  // close mobile nav
  const mobileNav = document.querySelector('.mobile-nav');
  if (mobileNav) mobileNav.classList.remove('open');
}

/* ── ARTICLE OVERLAY ─────────────────────────────────────────────────── */
function openArticle(id) {
  const art = ARTICLES[id];
  if (!art) return;

  // reset any previous background video timers
  if (window.__bgVideoTimer) {
    clearTimeout(window.__bgVideoTimer);
    window.__bgVideoTimer = null;
  }
  if (window.__bgVideoInterval) {
    clearInterval(window.__bgVideoInterval);
    window.__bgVideoInterval = null;
  }

  const entries = art.entries.map((e, i) => `
    <div class="art-entry${
      (id === 'animals' && (i === 0 || i === 2)) ||
      (id === 'animalsExtinct' && i >= 1)
        ? ' has-video'
        : ''
    }">
      ${id === 'animals' && i === 0
        ? `<div class="ae-video-bg avispa-video">
             <video class="art-video avispa-video" src="images/animals/avispa-mar.mp4" muted playsinline preload="metadata"></video>
           </div>`
        : ''}
      ${id === 'animals' && i === 2
        ? `<div class="ae-video-bg pulpo-video">
             <video class="art-video pulpo-video" src="images/animals/pulpo-fondo.mp4" muted playsinline preload="metadata" loop></video>
           </div>`
        : ''}
      ${id === 'animalsExtinct' && i === 1
        ? `<div class="ae-video-bg extincion-video">
             <video class="art-video extincion-video" src="images/extincion/AExtincion.mp4" muted playsinline preload="metadata" loop></video>
           </div>`
        : ''}
      <div class="ae-left">
        <div class="ae-num">0${i+1}</div>
        <div class="ae-flag">${e.flag || ''}</div>
      </div>
      <div class="ae-body">
        <h3>${e.title}</h3>
        <p>${e.desc}</p>
      </div>
      <div class="ae-thumb">${e.thumbSVG()}</div>
    </div>
  `).join('');

  document.getElementById('art-content').innerHTML = `
    <div class="art-hero">${art.heroSVG()}</div>
    ${id === 'paises'
      ? `<div class="art-head-wrap">
           <div class="intro-video-bg paises-video">
             <video class="art-video paises-video" src="images/paises-p/coete1.mp4" muted playsinline preload="metadata" autoplay></video>
           </div>
           <div class="art-cat">${art.cat}</div>
           <h1 class="art-title">${art.title}</h1>
           <p class="art-intro">${art.intro}</p>
         </div>`
      : `<div class="art-cat">${art.cat}</div>
         <h1 class="art-title">${art.title}</h1>
         <p class="art-intro">${art.intro}</p>`}
    <div class="art-mid-ad">
      <script>
        atOptions = {
          'key' : '7d21654217d5cdadb14bc8a97c4737ee',
          'format' : 'iframe',
          'height' : 90,
          'width' : 728,
          'params' : {}
        };
      </script>
      <script src="https://www.highperformanceformat.com/7d21654217d5cdadb14bc8a97c4737ee/invoke.js"></script>
    </div>
    ${entries}
  `;

  const overlay = document.getElementById('article-overlay');
  overlay.classList.add('open');
  overlay.scrollTop = 0;
  document.body.style.overflow = 'hidden';

  if (id === 'animals') {
    const content = document.getElementById('art-content');
    const avispa = content ? content.querySelector('.art-video.avispa-video') : null;
    const pulpos = content ? content.querySelectorAll('.art-video.pulpo-video') : null;
    if (content) {
      content.classList.remove('show-avispa', 'show-pulpo');
    }

    // avispa video: repeat every 3s
    if (content && avispa) {
      avispa.pause();
      avispa.currentTime = 0;
      const tryPlayAvispa = () => {
        if (avispa.paused || avispa.ended) {
          content.classList.add('show-avispa');
          avispa.currentTime = 0;
          avispa.play().catch(() => {});
        }
      };
      avispa.onended = () => {
        content.classList.remove('show-avispa');
      };
      window.__bgVideoTimer = setTimeout(() => {
        tryPlayAvispa();
        window.__bgVideoInterval = setInterval(tryPlayAvispa, 3000);
      }, 3000);
    }

    // pulpo fondo video: show after 2s, loop continuously
    if (content && pulpos && pulpos.length) {
      pulpos.forEach(v => { v.pause(); v.currentTime = 0; });
      window.__pulpoVideoTimer = setTimeout(() => {
        content.classList.add('show-pulpo');
        pulpos.forEach(v => v.play().catch(() => {}));
      }, 2000);
  }

  if (id === 'paises') {
    const content = document.getElementById('art-content');
    const video = content ? content.querySelector('.art-video.paises-video') : null;
    const wrap = content ? content.querySelector('.intro-video-bg.paises-video') : null;
    if (video) {
      video.pause();
      video.currentTime = 0;
      if (content) {
        content.classList.add('show-paises');
        content.classList.remove('hide-paises');
      }
      const hidePaisesVideo = () => {
        if (content) {
          content.classList.remove('show-paises');
          content.classList.add('hide-paises');
        }
        video.pause();
        video.currentTime = 0;
        if (wrap) wrap.remove();
      };
      video.play().catch(() => {});
      video.onended = hidePaisesVideo;
      // hard fallback: force-hide after 8s
      if (window.__paisesHideTimer) clearTimeout(window.__paisesHideTimer);
      window.__paisesHideTimer = setTimeout(hidePaisesVideo, 8000);
    }
  }
}

  if (id === 'animalsExtinct') {
    const content = document.getElementById('art-content');
    const extVideos = content ? content.querySelectorAll('.art-video.extincion-video') : null;
    if (content) {
      content.classList.add('show-extincion');
    }
    if (extVideos && extVideos.length) {
      extVideos.forEach(v => {
        v.pause();
        v.currentTime = 0;
        v.play().catch(() => {});
      });
    }
  }
}

function closeArticle() {
  const overlay = document.getElementById('article-overlay');
  if (overlay) {
    overlay.classList.remove('open');
    document.body.style.overflow = '';
  }

  if (window.__bgVideoTimer) {
    clearTimeout(window.__bgVideoTimer);
    window.__bgVideoTimer = null;
  }
  if (window.__bgVideoInterval) {
    clearInterval(window.__bgVideoInterval);
    window.__bgVideoInterval = null;
  }
  if (window.__pulpoVideoTimer) {
    clearTimeout(window.__pulpoVideoTimer);
    window.__pulpoVideoTimer = null;
  }
  if (window.__paisesHideTimer) {
    clearTimeout(window.__paisesHideTimer);
    window.__paisesHideTimer = null;
  }
  const video = document.querySelector('.art-video');
  if (video) {
    video.pause();
    video.currentTime = 0;
  }
}

/* ── VOTE ─────────────────────────────────────────────────────────────── */
let hasVoted = false;
const POLL_KEY = 'threats';

function getAuthToken() {
  return localStorage.getItem('rv_token');
}

function updateVoteUI(results, total) {
  const byKey = {};
  results.forEach(r => { byKey[r.key] = r; });
  document.querySelectorAll('.vote-btn').forEach(btn => {
    const key = btn.dataset.option;
    const item = byKey[key];
    if (!item) return;
    const bar = btn.querySelector('.v-bar');
    const pct = btn.querySelector('.v-pct');
    if (bar) bar.style.width = item.percent + '%';
    if (pct) pct.textContent = item.percent + '%';
  });
  document.querySelectorAll('.vote-total').forEach(el => {
    el.textContent = total.toLocaleString('es') + ' votos registrados';
  });
}

async function loadPoll() {
  try {
    const res = await fetch(`${API_BASE}/polls/${POLL_KEY}`);
    if (!res.ok) return;
    const data = await res.json();
    updateVoteUI(data.results, data.total);
  } catch (e) {
    // ignore network errors
  }
}

async function vote(optionKey) {
  if (hasVoted) return;
  hasVoted = true;
  const token = getAuthToken();
  try {
    const res = await fetch(`${API_BASE}/polls/${POLL_KEY}/vote`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
      },
      body: JSON.stringify({ option_key: optionKey }),
    });
    if (!res.ok) throw new Error('vote_failed');
    await loadPoll();
    document.querySelectorAll('.vote-btn').forEach(b => b.disabled = true);
  } catch (e) {
    hasVoted = false;
  }
}

/* ── NEWSLETTER ──────────────────────────────────────────────────────── */
function handleNewsletter(e) {
  e.preventDefault();
  const form = e.target;
  const input = form ? form.querySelector('input[type="email"]') : document.getElementById('nl-email');
  const email = input ? input.value.trim() : '';
  if (!email || !email.includes('@')) {
    if (input) { input.style.borderColor = '#E8271E'; input.focus(); }
    return;
  }

  fetch(`${API_BASE}/newsletter/subscribe`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email }),
  }).catch(() => {});

  const formWrap = document.querySelector('.nl-shown-form');
  const successWrap = document.querySelector('.nl-success');

  if (formWrap) {
    formWrap.classList.add('hiding');
    setTimeout(() => {
      formWrap.style.display = 'none';
      if (successWrap) {
        successWrap.style.display = 'flex';
        // animate children in
        successWrap.querySelectorAll('*').forEach((el, i) => {
          el.style.animation = `fadeUp .4s ease ${i * .1}s both`;
        });
      }
    }, 300);
  }
}

/* ── CONTACT ───────────────────────────────────────────────────────────── */
function handleContact(e) {
  if (e && e.preventDefault) e.preventDefault();
  const name = (document.getElementById('cf-name') || {}).value || '';
  const email = (document.getElementById('cf-email') || {}).value || '';
  const message = (document.getElementById('cf-msg') || {}).value || '';
  if (!name.trim() || !email.trim() || !message.trim()) return;
  fetch(`${API_BASE}/contact`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ name: name.trim(), email: email.trim(), message: message.trim() }),
  }).catch(() => {});
  const nameEl = document.getElementById('cf-name');
  const emailEl = document.getElementById('cf-email');
  const msgEl = document.getElementById('cf-msg');
  if (nameEl) nameEl.value = '';
  if (emailEl) emailEl.value = '';
  if (msgEl) msgEl.value = '';
}

/* ── AUTH (GOOGLE) ─────────────────────────────────────────────────────── */
function initAuthFromUrl() {
  const params = new URLSearchParams(window.location.search);
  const token = params.get('token');
  if (token) {
    localStorage.setItem('rv_token', token);
    params.delete('token');
    const newUrl = `${window.location.pathname}${params.toString() ? '?' + params.toString() : ''}${window.location.hash}`;
    window.history.replaceState({}, '', newUrl);
  }
}

function loginWithGoogle() {
  window.location.href = `${API_BASE}/auth/google`;
}

/* ── HAMBURGER ───────────────────────────────────────────────────────── */
function toggleMobileNav() {
  const mobileNav = document.querySelector('.mobile-nav');
  if (mobileNav) mobileNav.classList.toggle('open');
}

/* ── KEYBOARD NAV ────────────────────────────────────────────────────── */
document.addEventListener('keydown', e => {
  if (e.key === 'Escape') closeArticle();
});

/* ── INIT ────────────────────────────────────────────────────────────── */
document.addEventListener('DOMContentLoaded', () => {
  initAuthFromUrl();
  loadPoll();
  navigateTo('home');
});
