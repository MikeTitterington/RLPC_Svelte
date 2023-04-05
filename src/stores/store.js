import { writable } from 'svelte/store';
import { persist, localStorage, cookieStorage, sessionStorage } from "@macfja/svelte-persistent-store"
export const teamsP4 = writable([]);
export const teamsIndy = writable([]);

export const sheetsP4 = writable('1Fu3jq_z7bGJ-2SaEtwNUxW3BUBnSCw9tFreEQO51DXU');
export const sheetsIndy = writable('1jSE4pD8j1Vyjs8h6jhVAb7qFsKBRAXSSdP9QGm7-_hI');
export const season = persist(writable('18'),cookieStorage(), 'season' )

export const showStatsD = persist(writable(false), localStorage(), 'showStatsD');
export const showStandD = persist(writable(false), localStorage(), 'showStandD');
export const showLeague = persist(writable(false), localStorage(), 'showLeague');
export const showStats = persist(writable(false), localStorage(), 'showStats');
export const showCollected = persist(writable(false), localStorage(), 'showCollected');
export const showStandings = persist(writable(false), localStorage(), 'showStandings');
export const showStatsm = persist(writable(false), localStorage(), 'showStatsm');
export const showCollectedm = persist(writable(false), localStorage(), 'showCollectedm');
export const showStandingsm = persist(writable(false), localStorage(), 'showStandingsm');
export const showBuilderm = persist(writable(false), localStorage(), 'showBuilderm');
export const showBuilder = persist(writable(false), localStorage(), 'showBuilder');
export const showPower = persist(writable(false), localStorage(), 'showPower');
export const showPowerm = persist(writable(false), localStorage(), 'showPowerm');
export const defaultLeague = persist(writable("Major"), cookieStorage(), 'defaultLeague');
export const showDraftee = persist(writable(false), cookieStorage(), 'showDraftee');
export const showFreeAgent = persist(writable(false), cookieStorage(), 'showFreeAgent');
export const showDrafteem = persist(writable(false), cookieStorage(), 'showDrafteem');
export const showFreeAgentm = persist(writable(false), cookieStorage(), 'showFreeAgentm');
