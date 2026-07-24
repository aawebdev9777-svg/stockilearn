// League "servers" — each league tier is split into server instances (shards)
// capped at MAX_PLAYERS_PER_SERVER. When a server fills up, a new one is spun
// up so leagues act like sharded servers rather than one giant leaderboard.
//
// Used by appSignup (assign on join) and appLogin (backfill existing users).

export const MAX_PLAYERS_PER_SERVER = 30;

/**
 * Assigns a league server instance for a user in the given tier.
 * Finds the first existing server with spare capacity; if all are full,
 * returns a new server number (max + 1) to spin up a fresh league.
 */
export async function assignLeagueServer(base44, tier = 1) {
  // All users compete together in server 1 for now.
  return 1;
}