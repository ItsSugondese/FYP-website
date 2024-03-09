export interface UsersData {
    totalUser: number;
    internal: number;
    external: number;
    latestUser: number;
    totalStaff: number;
    latestStaff: number;
  }

  export interface UsersDataPayload{
    fromDate ?: string | null,
    toDate ?: string | null, 
}
  