import {Injectable} from '@angular/core';
import {AngularFirestore} from "@angular/fire/compat/firestore";
import {AngularFireAuth} from "@angular/fire/compat/auth";
import { User } from "@firebase/auth";

@Injectable({
  providedIn: 'root'
})
export class AuthService <T> {

  constructor(private store: AngularFirestore,
              private auth: AngularFireAuth
  ) {
  }
}
