import { Crud } from "src/enums/backend/curd.enums";

export interface ResponseData<T>{
    status : boolean;
    message: string;
    data : T;
    crud: Crud
}