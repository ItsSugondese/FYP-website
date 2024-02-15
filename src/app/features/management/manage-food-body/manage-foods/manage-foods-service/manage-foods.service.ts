import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { FoodMenuPagination } from './model/food-menu.payload';
import { PaginatedData } from 'src/app/constant/data/pagination/pagination.model';
import { FoodMenuWithImageData, foodMenu } from './model/food-menu.model';
import { ResponseData } from 'src/app/constant/data/response-data.model';
import { BehaviorSubject, catchError, finalize } from 'rxjs';
import { LoaderService } from 'src/app/shared/service/loader-service/loader.service';

@Injectable({
  providedIn: 'root'
})
export class ManageFoodsService {

  backendUrl = environment.apiUrl;
  moduleName : string = "food-menu"
  private selectedMenuSubject = new BehaviorSubject<FoodMenuWithImageData | null>(null);
loading = false;
  constructor(private httpClient : HttpClient, private loaderService: LoaderService) { }
  
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
    return this.httpClient.post<any>(this.backendUrl + "food-menu",data)
    .pipe(
      catchError(error => {
        throw error;
      }),
      finalize(() => this.loading=false
      ));;;
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

