import { EnumItem } from "@shared/model/enums/MapForEnum.model";
import { Observable, catchError, finalize } from "rxjs";

export class ServiceCommonVariable{
    loading = false;

    handleError() {
        return (source: Observable<any>) => {
          return source.pipe(
            catchError(error => {
              this.loading = false;
              throw error;
            }),
            finalize(() => this.loading = false)
          );
        };
      }

      enumToEnumItems(enumObject: Record<string, string>): EnumItem[] {
        return Object.keys(enumObject).map(key => ({ key, value: enumObject[key] }));
      }
}