export interface foodMenu{
    id : number,
    name: string,
    description: string,
    cost: number,
    isPackage: boolean,
    photoId: number,
    isAvailableToday : boolean,
    foodType: string,
    menuItems : string[]
  }