import { Injectable } from '@angular/core';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class FileValidatorService {

   private readonly MAX_FILE_SIZE_MB = 1;

  constructor() { }
  validateFile(file:File, allowedTypes:string[]):boolean{
                   const MAX_FILE_SIZE_BYTES = this.MAX_FILE_SIZE_MB * 1024 * 1024;
                   if (file.size > MAX_FILE_SIZE_BYTES) {
                     Swal.fire({
                           icon: 'error',
                           title: 'Oops...',
                           text: `The file exceeds the maximum allowed size of ${this.MAX_FILE_SIZE_MB} MB.`
                         });
                     return false; 
                   }
                  if (!allowedTypes.includes(file.type)) {
                    const allowedTypesText = allowedTypes.join(', ');
                     let message = `Only ${allowedTypesText} are allowed.`;
                     if(allowedTypes.length==1 && allowedTypes[0]=='application/pdf'){
                     message = `Only PDFs are allowed.`;
                     }

                    Swal.fire({
                      icon: 'error',
                      title: 'Invalid File Type',
                      text: message,
                    });
                    return false;
                }
                return true;
}
}
