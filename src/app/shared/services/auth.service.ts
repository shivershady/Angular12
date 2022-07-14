import {Injectable, NgZone} from '@angular/core';
import {User} from './user';
import * as auth from 'firebase/auth';
import {AngularFireAuth} from '@angular/fire/compat/auth';
import {
  AngularFirestore,
  AngularFirestoreDocument,
} from '@angular/fire/compat/firestore';
import {Router} from '@angular/router';
import {environment} from "../../../environments/environment";

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  userData: any; // Lưu dữ liệu người dùng đã đăng nhập
  constructor(
    public afs: AngularFirestore, //
    public afAuth: AngularFireAuth, // Inject Firebase auth service
    public router: Router,
    public ngZone: NgZone // Dịch vụ NgZone để loại bỏ cảnh báo phạm vi bên ngoài
  ) {
    /* Lưu dữ liệu người dùng trong localstorage khi
    đã đăng nhập và thiết lập null khi đăng xuất */
    this.afAuth.authState.subscribe((user) => {
      if (user) {
        this.userData = user;
        localStorage.setItem('user', JSON.stringify(this.userData));
        JSON.parse(localStorage.getItem('user')!);  // ! là không thể là null
      } else {
        localStorage.setItem('user', 'null');
        JSON.parse(localStorage.getItem('user')!);  // ! là không thể là null
      }
    });
  }

  // Đăng nhập bằng email và mật khẩu
  SignIn(email: string, password: string) {
    return this.afAuth
      .signInWithEmailAndPassword(email, password)
      .then((result) => {
        this.ngZone.run(() => {
          this.router.navigate(['']); // nếu đăng nhập thành công thì chuyển hướng đến trang home
        });
        this.SetUserData(result.user);
      })
      .catch((error) => {
        window.alert("Đăng nhập thất bại, vui lòng thử lại");
      });
  }

  // Đăng ký bằng email và mật khẩu
  SignUp(payload: any) {
    return this.afAuth
      .createUserWithEmailAndPassword(payload.email, payload.password)
      .then((result) => {
        /* Gọi hàm SendVerificaitonMail () khi người dùng mới đăng nhập
        lên và return promise */
        this.SendVerificationMail();
        this.SetUserData(result.user, payload);
      })
      .catch((error) => {
        window.alert("Đăng ký thất bại, vui lòng thử lại");
      });
  }

  // Gửi email verfificaiton khi người dùng đăng ký
  SendVerificationMail() {
    return this.afAuth.currentUser
      .then((u: any) => u.sendEmailVerification({
        url: environment.local+'/login',
      }))
      .then(() => {
        this.router.navigate(['verify-email-address']); // chuyển hướng đến trang xác nhận email
      });
  }

  // Đặt lại mật khẩu Quên mật khẩu
  ForgotPassword(passwordResetEmail: string) {
    return this.afAuth
      .sendPasswordResetEmail(passwordResetEmail)
      .then(() => {
        window.alert('Đã gửi email đặt lại mật khẩu, hãy kiểm tra hộp thư đến của bạn.');
      })
      .catch((error) => {
        window.alert('Đã xảy ra lỗi, vui lòng thử lại.');
      });
  }

  // Trả về true khi người dùng đã đăng nhập và email được xác minh
  get isLoggedIn(): boolean {
    const user = JSON.parse(localStorage.getItem('user')!);
    return user !== null && user.emailVerified !== false ? true : false;
  }

  // Đăng nhâp bằng Google
  GoogleAuth() {
    return this.AuthLogin(new auth.GoogleAuthProvider()).then((res: any) => {
      if (res) {
        this.router.navigate(['']); // nếu đăng nhập thành công thì chuyển hướng đến trang home
      }
    });
  }

  // Auth logic to run auth providers
  AuthLogin(provider: any) {
    return this.afAuth
      .signInWithPopup(provider)
      .then((result) => {
        this.ngZone.run(() => {
          this.router.navigate(['']);
        });
        this.SetUserData(result.user);
      })
      .catch((error) => {
        window.alert(error);
      });
  }

  /* Thiết lập dữ liệu người dùng khi đăng nhập bằng tên người dùng / mật khẩu,
  đăng ký bằng tên người dùng / mật khẩu và đăng nhập bằng xác thực xã hội
  nhà cung cấp trong cơ sở dữ liệu Firestore sử dụng AngularFirestore + AngularFirestoreDocument service */
  SetUserData(user: any, payload?: any) {
    const userRef: AngularFirestoreDocument<any> = this.afs.doc(
      `users/${user.uid}`   // tạo một thư mục users và lấy uid của người dùng
    );
    const userData: User = {
      uid: user.uid,
      email: user.email,
      displayName: user.displayName ? user.displayName : payload.firstName + ' ' + payload.lastName,
      photoURL: user.photoURL,
      emailVerified: user.emailVerified,
      dayOfBirth: payload ? payload.dayOfBirth : null,
      monthOfBirth: payload ? payload.monthOfBirth : null,
      yearOfBirth: payload ? payload.yearOfBirth : null,
    };
    return userRef.set(userData, {
      merge: true,  // nếu đã có dữ liệu thì ghi đè
    });
  }

  // Đăng xuất
  SignOut() {
    return this.afAuth.signOut().then(() => {
      localStorage.removeItem('user');
      this.router.navigate(['login']);  // chuyển hướng đến trang đăng nhập
    });
  }
}
