export interface defaultPaginationNavigator {
    currentPage: number,
    row: number,
    totalNoOfpage?: number,
    totalNoOfElements?: number,
    noOfElements?: number
}

export interface paginationPayload {
    row: number,
    page : number,
}