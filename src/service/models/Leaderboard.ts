export interface PlayerData {
  rank: number;
  name: string;
  country: string;
  money: number;
  isSelf: boolean;
}

export interface LeaderboardResponse {
  leaderboardData: Array<PlayerData>;
  leaderboardDataSelf: Array<PlayerData>;
}
