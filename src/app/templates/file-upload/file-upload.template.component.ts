import { ChangeDetectorRef, Component, EventEmitter, Input, OnChanges, OnDestroy, OnInit, Output, SimpleChanges } from '@angular/core';
import { Subscription } from 'rxjs';
import { ManageFoodsService } from 'src/app/features/management/manage-food-body/manage-foods/manage-foods-service/manage-foods.service';


@Component({
  selector: 'file-upload-template',
  template: `
 <div class="flex justify-center hover:cursor-default">
 <div class=" bg-gray-100 border-dashed border-2 border-gray-400 p-8 text-center" (drop)="onDrop($event)"
            (dragover)="onDragOver($event)" >
            <span class="text-lg text-gray-600 w-full hover:cursor-pointer"  (click)="fileInput.click()">Drag & Drop files here or click to upload</span>
            <input type="file" multiple style="display: none;" (change)="onFileSelect($event); fileInput.value = '';" #fileInput />

            <div class="">
              <div class="flex justify-center hover:cursor-default">
                <div class="group image-container  w-fit h-fit p-3 px-0 pt-1 overflow-hidden rounded-sm">
                  <img *ngIf="imageUrl" [src]="imageUrl" class=" rounded-sm w-32 object-cover"
                    [class.group-hover:brightness-75]="originalImage == null || originalImage != imageUrl">
                  <div class="hidden  top-0 right-0 p-1 group-hover:block hover:cursor-pointer bg-white rounded"
                    *ngIf="originalImage == null || originalImage != imageUrl"
                     (click)="removeImage($event)">

                    <svg viewBox="64 64 896 896" focusable="false" data-icon="delete" width="1em" height="1em"
                      fill="currentColor" aria-hidden="true">
                      <path
                        d="M864 256H736v-80c0-35.3-28.7-64-64-64H352c-35.3 0-64 28.7-64 64v80H160c-17.7 0-32 14.3-32 32v32c0 4.4 3.6 8 8 8h60.4l24.7 523c1.6 34.1 29.8 61 63.9 61h454c34.2 0 62.3-26.8 63.9-61l24.7-523H888c4.4 0 8-3.6 8-8v-32c0-17.7-14.3-32-32-32zm-200 0H360v-72h304v72z">
                      </path>
                    </svg>


                  </div>
                </div>
              </div>

            </div>

          </div>
  `,
  styles: [
  ],
})
export class FileUploadComponent implements OnInit, OnChanges, OnDestroy {

  @Input() originalImage: string | null = null
  imageUrl: string | null = null
  tempImageUrl !: string | null

  imageId$ !: Subscription;

  @Output() imageIdEvent: EventEmitter<number | null> = new EventEmitter<number | null>()
  constructor(private foodService: ManageFoodsService, private cdr: ChangeDetectorRef) { }

  ngOnInit(): void {
    if (this.originalImage != null) {
      this.imageUrl = this.originalImage
    }
    this.cdr.detectChanges();
  }
  ngOnChanges(changes: SimpleChanges) {
    if (changes.originalImage) {
      this.imageUrl = this.originalImage
    }
  }

  removeImage(event: MouseEvent): void {
    if (this.originalImage != null) {
      this.imageUrl = this.originalImage
    } else {
      this.imageUrl = null;
    }
    this.imageIdEvent.emit(null)
    // this.imageId = null;
  }

  onDrop(event: DragEvent) {
    event.preventDefault();
    this.uploadFiles(event.dataTransfer!.files);
  }

  onDragOver(event: DragEvent) {
    event.preventDefault();
  }

  onFileSelect(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files!.length > 0) {
      this.uploadFiles(input.files!);
    }
  }

  uploadFiles(files: FileList) {
    const file = files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.tempImageUrl = this.imageUrl
        this.imageUrl = e.target.result;
        const formData = new FormData();
        formData.append('attachments', file);
        this.imageId$ = this.foodService.postImage(formData).subscribe(
          (response: any) => {
            this.imageIdEvent.emit(response.data[0])
            this.imageId$.unsubscribe()

          }, (error) => { this.imageUrl = this.tempImageUrl }
        )
      };
      reader.readAsDataURL(file);
    }
  }


  ngOnDestroy(): void {
    if (this.imageId$) {
      this.imageId$.unsubscribe()
    }

  }


}
