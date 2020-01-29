import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  constructor(private storage: Storage) {
  }

  public setMode(value: string) {
    return this.storage.set("mode", JSON.stringify(value)).then((data) => {
      console.log('Saved mode', data)
    });
  }

  public getMode(): Promise<string> {
    return this.storage.get("mode").then((data) => {
      console.log(data)
      return JSON.parse(data);
    });
  }
}
