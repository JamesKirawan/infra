import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import Swal from 'sweetalert2';
@Injectable({
    providedIn: 'root'
})

export class AlertService {

    constructor(
        private toastr: ToastrService
    ) { }

    // SweetAlert2 Zone -----------------------------------------------------------------------------------
    // icon: success, warning, question, error.

    Global_Alert(icon: any, title: any, text: any) {
        Swal.fire({
            icon: icon,
            title: title,
            text: text,
            // timer: 20000 // Auto close in 20 seconds
        })
    }

    Global_Alert_Without_Text(icon: any, title: any) {
        Swal.fire({
            icon: icon,
            title: title,
            showConfirmButton: false,
            timer: 3000
        })
    }

    Global_Alert_Preview_Image(imageUrl: any, fileName: any, fileSize: any) {
        Swal.fire({
            title: fileName,
            text: fileSize,
            imageUrl: imageUrl,
            width: '88%',
            imageHeight: 768,
            imageAlt: 'Attachment Image',
        })
    }

    Alert_Multiple(str) {
        Swal.fire({
            html: '<pre>' + str + '</pre>',
            customClass: {
                popup: 'format-pre'
            }
        });
    }

    toastrSuccess(message: string, duration: number = 2000,pos = {hr: 'center', vr: 'top'}) {
        this.toastr.success(message,'Success!', {
          positionClass: `toast-${pos.vr}-${pos.hr}`,
          timeOut: duration,
          toastClass: 'toast ngx-toastr',
          closeButton: true
        });
      }
    
      toastrError(title:string = 'Failed!', message: string,duration: number = 2000,pos: string = 'center') {
        this.toastr.error(message,title, {
          positionClass: `toast-top-${pos}`,
          timeOut: duration,
          toastClass: 'toast ngx-toastr',
          closeButton: true
        });
      }
}