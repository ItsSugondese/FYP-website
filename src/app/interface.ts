export interface role {
    role: string
}

export interface jwtResponse {
    jwtToken: string,
    role: string[],
    username: string
}

export interface loginFormHeader {
    status: string,
    color: string
}

export interface defaultPaginationNavigator {
    currentPage: number,
    row: number,
    totalNoOfpage?: number,
    totalNoOfElements?: number,
    noOfElements?: number
}

export interface foodMenu {
    id: number,
    name: string,
    description: string,
    cost: number,
    isPackage: boolean,
    photoId: number,
    menuItems: string[]
}

export interface foodOrdering {
    id ?: number,
    quantity : number,
    imageSrc : string,
    selectedFoodMenu : foodMenu
}


