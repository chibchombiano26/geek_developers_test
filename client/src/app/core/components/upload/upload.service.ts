import {Injectable} from '@angular/core';

@Injectable()
export class UploadService {
    
    constructor() {

    }

    makeFileRequest(url: string, params: string[], files: File[]): Promise<any>{
        return new Promise((resolve, reject) => {
            let formData: FormData = new FormData(),
                xhr: XMLHttpRequest = new XMLHttpRequest();

            for (let i = 0; i < files.length; i++) {
                formData.append("uploads", files[i], files[i].name);
            }

            xhr.onreadystatechange = () => {
                if (xhr.readyState === 4) {
                    if (xhr.status === 200) {
                        resolve(xhr);
                    } else {
                     reject("error");
                   }
                }
            };

            xhr.upload.onprogress = (event) => {

            };

            xhr.open('POST', url, true);
            xhr.send(formData);

        });
    }
}