/**
 * 🏆 IPL Season Points Table
 *
 * IPL ka season chal raha hai aur tujhe points table banana hai!
 * Tujhe match results ka array milega, aur tujhe har team ke points
 * calculate karke sorted table return karna hai.
 *
 * Match result types:
 *   - "win": Winning team gets 2 points, losing team gets 0
 *   - "tie": Both teams get 1 point each
 *   - "no_result": Both teams get 1 point each (rain/bad light)
 *
 * Each match object: { team1: "CSK", team2: "MI", result: "win", winner: "CSK" }
 *   - For "tie" and "no_result", the winner field is absent or ignored
 *
 * Rules (use for loop with object accumulator):
 *   - Loop through matches array
 *   - Build an object accumulator: { "CSK": { team, played, won, lost, tied, noResult, points }, ... }
 *   - After processing all matches, convert to array and sort:
 *     1. By points DESCENDING
 *     2. If points are equal, by team name ASCENDING (alphabetical)
 *
 * Validation:
 *   - Agar matches array nahi hai ya empty hai, return []
 *
 * @param {Array<{team1: string, team2: string, result: string, winner?: string}>} matches
 * @returns {Array<{team: string, played: number, won: number, lost: number, tied: number, noResult: number, points: number}>}
 *
 * @example
 *   iplPointsTable([
 *     { team1: "CSK", team2: "MI", result: "win", winner: "CSK" },
 *     { team1: "RCB", team2: "CSK", result: "tie" },
 *   ])
 *   // CSK: played=2, won=1, tied=1, points=3
 *   // MI: played=1, won=0, lost=1, points=0
 *   // RCB: played=1, tied=1, points=1
 *   // Sorted: CSK(3), RCB(1), MI(0)
 */
export function iplPointsTable(matches) {
  // Your code here
  if (!Array.isArray(matches) || matches.length === 0) {
    return [];
  }

  let acc = {};

  for (let i = 0; i < matches.length; i++) {
    let match = matches[i];
    let { team1, team2, result, winner } = match;

    // Initialize teams if not present
    if (!acc[team1]) {
      acc[team1] = {
        team: team1,
        played: 0,
        won: 0,
        lost: 0,
        tied: 0,
        noResult: 0,
        points: 0
      };
    }

    if (!acc[team2]) {
      acc[team2] = {
        team: team2,
        played: 0,
        won: 0,
        lost: 0,
        tied: 0,
        noResult: 0,
        points: 0
      };
    }

    // Both teams played
    acc[team1].played++;
    acc[team2].played++;

    if (result === "win") {
      // Winner gets 2 points
      acc[winner].won++;
      acc[winner].points += 2;

      // Loser
      let loser = winner === team1 ? team2 : team1;
      acc[loser].lost++;

    } else if (result === "tie") {
      acc[team1].tied++;
      acc[team2].tied++;

      acc[team1].points += 1;
      acc[team2].points += 1;

    } else if (result === "no_result") {
      acc[team1].noResult++;
      acc[team2].noResult++;

      acc[team1].points += 1;
      acc[team2].points += 1;
    }
  }

  // Convert to array
  let table = Object.values(acc);

  // Sort
  table.sort((a, b) => {
    if (b.points !== a.points) {
      return b.points - a.points;
    }
    return a.team.localeCompare(b.team);
  });

  return table;
}
