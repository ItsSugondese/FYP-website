import { EnumItem } from "@shared/model/enums/MapForEnum.model";
import { PassHeight } from "src/app/constant/class/child-height-constant";
import { CenterItems } from "src/app/constant/class/display-center.model";
import { MessageStatus } from "src/app/templates/snackbar/snackbar.template.component";

export class CommonVariable {

  currency : string = "Rs."
  showPopUp: boolean = false;
  centerItems: string = CenterItems()
  forChild: string = PassHeight()
  messageStatus = MessageStatus
  selectedRow = 5

  createImageFromBlob(image: Blob, photoId: number): Promise<string> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => {
        resolve(reader.result as string);
      };
      reader.onerror = (error) => {
        reject(error);
      };
      reader.readAsDataURL(image);
    });
  }


  tableSizes = [
    { name: 5 },
    { name: 10 },
    { name: 15 },
    { name: 20 }
  ];

   enumToEnumItems(enumObject: Record<string, string>): EnumItem[] {
    return Object.keys(enumObject).map(key => ({ key, value: enumObject[key] }));
  }
  
}