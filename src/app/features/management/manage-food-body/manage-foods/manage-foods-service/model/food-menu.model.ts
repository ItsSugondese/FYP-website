export interface foodMenu{
    id : number,
    name: string,
    description: string,
    cost: number,
    photoId: number,
    isAvailableToday : boolean,
    foodType: string,
    menuItems : string[]
  }


export interface FoodMenuWithImageData{
  foodMenu: foodMenu,
  image: string
    
  }