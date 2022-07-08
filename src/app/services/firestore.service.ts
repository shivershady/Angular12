import { Injectable } from '@angular/core';
import {AngularFireDatabase, AngularFireObject} from "@angular/fire/compat/database";

@Injectable({
  providedIn: 'root'
})
export class FirestoreService {
  constructor( private db: AngularFireDatabase) { }
}
