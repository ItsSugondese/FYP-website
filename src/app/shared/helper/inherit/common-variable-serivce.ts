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
}