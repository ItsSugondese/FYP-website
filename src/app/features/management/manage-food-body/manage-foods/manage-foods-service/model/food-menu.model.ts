export interface foodMenu{
    id : number,
    name: string,
    description: string,
    cost: number,
    photoId: number,
    isAvailableToday : boolean,
    foodType: string,
    isAuto : boolean
  }


export interface FoodMenuWithImageData{
  foodMenu: foodMenu,
  image: string
    
  }