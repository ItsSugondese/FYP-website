import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { FoodMenuPagination, ToggleAvailability } from './model/food-menu.payload';
import { PaginatedData } from 'src/app/constant/data/pagination/pagination.model';
import { FoodMenuWithImageData, foodMenu } from './model/food-menu.model';
import { ResponseData } from 'src/app/constant/data/response-data.model';
import { BehaviorSubject, catchError, finalize } from 'rxjs';
import { LoaderService } from 'src/app/shared/service/loader-service/loader.service';
import { SnackbarService } from 'src/app/templates/snackbar/snackbar-service/snackbar.service';
import { MessageStatus } from 'src/app/templates/snackbar/snackbar.template.component';

@Injectable({
  providedIn: 'root'
})
export class ManageFoodsService {

  backendUrl = environment.apiUrl;
  moduleName : string = "food-menu"
  private selectedMenuSubject = new BehaviorSubject<FoodMenuWithImageData | null>(null);
loading = false;
public toggleLoading = {
  status: false,
  index: -1
} 
  constructor(private httpClient : HttpClient, private loaderService: LoaderService,
    private snackService: SnackbarService) { }
  
  postImage(data : FormData){
    this.loading = true
    return this.httpClient.post<any>(this.backendUrl + "temporary-attachments",data)
    .pipe(
      catchError(error => {
        throw error;
      }),
      finalize(() => this.loading=false
      ));;
  }

  postFoodMenu(data : { [key: string]: any }){
    this.loading = true
    return this.httpClient.post<any>(this.backendUrl + this.moduleName,data)
    .pipe(
      catchError(error => {
        this.loading = false
        throw error;
      }),
      finalize(() => this.loading=false
      ));;;
  }
  toggleFoodMenu(data : ToggleAvailability, i: number){
    this.toggleLoading = {
      status: true,
      index: i
    }
    
    return this.httpClient.post<any>(this.backendUrl + this.moduleName + "/toggle-availability",data)
    
    .pipe(
      catchError(((error : HttpErrorResponse) => {
        this.toggleLoading.status = false
        throw error;
      })),
      finalize(() => this.toggleLoading.status = false
      ));
  }

  getFoodMenu(){
     return this.httpClient.get<ResponseData<foodMenu[]>>(this.backendUrl + "food-menu" + "?type=ALL");
  }
  getFoodMenuPaginated(data : FoodMenuPagination){
    // this.loaderService.showLoading()
    this.loading = true
     return this.httpClient.post<ResponseData<PaginatedData<foodMenu>>>(this.backendUrl + this.moduleName +  "/pageable", data)
     .pipe(
      catchError(error => {
        // Handle error
        throw error;
      }),
      finalize(() => this.loading=false
      // this.loaderService.hideLoading()
      ));
    //  return this.httpClient.post<ResponseData<PaginatedData<foodMenu>>>(this.backendUrl + this.moduleName +  "/pageable", data);
  }

  getFoodPicture(id: number) {
    return this.httpClient.get(this.backendUrl +'food-menu/photo/' + id, { responseType: 'blob' });
  }

  
  sendSelectedFoodMenu(item: FoodMenuWithImageData | null){
    this.selectedMenuSubject.next(item);
  }

  getSelectedFoodMenu(){
    return this.selectedMenuSubject.asObservable();
  }
 

}

