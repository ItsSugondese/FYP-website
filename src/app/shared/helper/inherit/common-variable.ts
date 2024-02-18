import { PassHeight } from "src/app/constant/class/child-height-constant";
import { CenterItems } from "src/app/constant/class/display-center.model";
import { MessageStatus } from "src/app/templates/snackbar/snackbar.template.component";

export class CommonVariable {

    centerItems : string = CenterItems()
    forChild : string = PassHeight()
    messageStatus = MessageStatus
    selectedRow = 5

    tableSizes = [
        { name: 5 },
        { name: 10 },
        { name: 15 },
        { name: 20 }
      ];
}