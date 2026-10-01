// ============================================
// 🔐 خدمة المصادقة (Auth Service)
// ============================================

import 'package:firebase_auth/firebase_auth.dart';
import 'package:google_sign_in/google_sign_in.dart';
import '../models/models.dart';

class AuthService {
  final FirebaseAuth _auth = FirebaseAuth.instance;
  final GoogleSignIn _googleSignIn = GoogleSignIn();

  // الحصول على المستخدم الحالي
  User? get currentUser => _auth.currentUser;

  // تيار تغييرات المصادقة
  Stream<User?> get authStateChanges => _auth.authStateChanges();

  // ============================================
  // تسجيل الدخول بالبريد الإلكتروني
  // ============================================
  Future<UserCredential> signInWithEmail({
    required String email,
    required String password,
  }) async {
    try {
      return await _auth.signInWithEmailAndPassword(
        email: email,
        password: password,
      );
    } catch (e) {
      throw _handleAuthError(e);
    }
  }

  // ============================================
  // إنشاء حساب جديد
  // ============================================
  Future<UserCredential> signUpWithEmail({
    required String email,
    required String password,
    required String displayName,
  }) async {
    try {
      final credential = await _auth.createUserWithEmailAndPassword(
        email: email,
        password: password,
      );

      await credential.user?.updateDisplayName(displayName);

      return credential;
    } catch (e) {
      throw _handleAuthError(e);
    }
  }

  // ============================================
  // تسجيل الدخول بـ Google
  // ============================================
  Future<UserCredential?> signInWithGoogle() async {
    try {
      final GoogleSignInAccount? googleUser = await _googleSignIn.signIn();

      if (googleUser == null) return null;

      final GoogleSignInAuthentication googleAuth =
          await googleUser.authentication;

      final credential = GoogleAuthProvider.credential(
        accessToken: googleAuth.accessToken,
        idToken: googleAuth.idToken,
      );

      return await _auth.signInWithCredential(credential);
    } catch (e) {
      throw _handleAuthError(e);
    }
  }

  // ============================================
  // تسجيل الخروج
  // ============================================
  Future<void> signOut() async {
    await Future.wait([
      _auth.signOut(),
      _googleSignIn.signOut(),
    ]);
  }

  // ============================================
  // إعادة تعيين كلمة المرور
  // ============================================
  Future<void> resetPassword(String email) async {
    try {
      await _auth.sendPasswordResetEmail(email: email);
    } catch (e) {
      throw _handleAuthError(e);
    }
  }

  // ============================================
  // تحديث الملف الشخصي
  // ============================================
  Future<void> updateProfile({
    String? displayName,
    String? photoURL,
  }) async {
    try {
      final user = _auth.currentUser;
      if (user == null) throw Exception('No user logged in');

      if (displayName != null) {
        await user.updateDisplayName(displayName);
      }
      if (photoURL != null) {
        await user.updatePhotoURL(photoURL);
      }
    } catch (e) {
      throw _handleAuthError(e);
    }
  }

  // ============================================
  // معالجة أخطاء المصادقة
  // ============================================
  String _handleAuthError(dynamic error) {
    if (error is FirebaseAuthException) {
      switch (error.code) {
        case 'user-not-found':
          return 'المستخدم غير موجود';
        case 'wrong-password':
          return 'كلمة المرور غير صحيحة';
        case 'email-already-in-use':
          return 'البريد الإلكتروني مستخدم بالفعل';
        case 'weak-password':
          return 'كلمة المرور ضعيفة';
        case 'invalid-email':
          return 'البريد الإلكتروني غير صالح';
        case 'user-disabled':
          return 'الحساب معطل';
        case 'too-many-requests':
          return 'محاولات كثيرة، حاول لاحقاً';
        default:
          return 'حدث خطأ، حاول مرة أخرى';
      }
    }
    return error.toString();
  }
}
