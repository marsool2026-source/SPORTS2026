// ============================================
// 🚪 شاشة تسجيل الدخول
// ============================================

import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import '../providers/auth_provider.dart';
import '../widgets/glass_card.dart';

class LoginScreen extends StatefulWidget {
  const LoginScreen({super.key});

  @override
  State<LoginScreen> createState() => _LoginScreenState();
}

class _LoginScreenState extends State<LoginScreen>
    with SingleTickerProviderStateMixin {
  final _emailController = TextEditingController();
  final _passwordController = TextEditingController();
  final _formKey = GlobalKey<FormState>();
  bool _isSignUp = false;
  bool _obscurePassword = true;
  late AnimationController _animationController;
  late Animation<double> _fadeAnimation;

  @override
  void initState() {
    super.initState();
    _animationController = AnimationController(
      vsync: this,
      duration: const Duration(milliseconds: 800),
    );
    _fadeAnimation = Tween<double>(begin: 0.0, end: 1.0).animate(
      CurvedAnimation(
        parent: _animationController,
        curve: Curves.easeInOut,
      ),
    );
    _animationController.forward();
  }

  @override
  void dispose() {
    _emailController.dispose();
    _passwordController.dispose();
    _animationController.dispose();
    super.dispose();
  }

  void _toggleMode() {
    setState(() {
      _isSignUp = !_isSignUp;
    });
  }

  Future<void> _handleAuth() async {
    if (!_formKey.currentState!.validate()) return;

    final authProvider = Provider.of<AuthProvider>(context, listen: false);

    try {
      if (_isSignUp) {
        await authProvider.signUp(
          email: _emailController.text.trim(),
          password: _passwordController.text,
          displayName: _emailController.text.split('@').first,
        );
      } else {
        await authProvider.signIn(
          email: _emailController.text.trim(),
          password: _passwordController.text,
        );
      }

      if (mounted) {
        Navigator.of(context).pushReplacementNamed('/dashboard');
      }
    } catch (e) {
      if (mounted) {
        ScaffoldMessenger.of(context).showSnackBar(
          SnackBar(
            content: Text(e.toString()),
            backgroundColor: Colors.red,
          ),
        );
      }
    }
  }

  Future<void> _handleGoogleSignIn() async {
    final authProvider = Provider.of<AuthProvider>(context, listen: false);

    try {
      await authProvider.signInWithGoogle();
      if (mounted) {
        Navigator.of(context).pushReplacementNamed('/dashboard');
      }
    } catch (e) {
      if (mounted) {
        ScaffoldMessenger.of(context).showSnackBar(
          SnackBar(
            content: Text(e.toString()),
            backgroundColor: Colors.red,
          ),
        );
      }
    }
  }

  @override
  Widget build(BuildContext context) {
    final authProvider = Provider.of<AuthProvider>(context);

    return Scaffold(
      body: Container(
        decoration: const BoxDecoration(
          gradient: LinearGradient(
            begin: Alignment.topLeft,
            end: Alignment.bottomRight,
            colors: [
              Color(0xFF0F172A),
              Color(0xFF1E293B),
              Color(0xFF0F172A),
            ],
          ),
        ),
        child: SafeArea(
          child: FadeTransition(
            opacity: _fadeAnimation,
            child: SingleChildScrollView(
              padding: const EdgeInsets.all(24.0),
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.stretch,
                children: [
                  const SizedBox(height: 40),
                  
                  // الشعار
                  _buildLogo(),
                  
                  const SizedBox(height: 40),
                  
                  // العنوان
                  _buildTitle(),
                  
                  const SizedBox(height: 40),
                  
                  // النموذج
                  _buildForm(authProvider),
                  
                  const SizedBox(height: 24),
                  
                  // زر تسجيل الدخول
                  _buildSubmitButton(authProvider),
                  
                  const SizedBox(height: 16),
                  
                  // زر نسيت كلمة المرور
                  if (!_isSignUp) _buildForgotPasswordButton(),
                  
                  const SizedBox(height: 24),
                  
                  // الفاصل
                  _buildDivider(),
                  
                  const SizedBox(height: 24),
                  
                  // تسجيل الدخول بـ Google
                  _buildGoogleButton(),
                  
                  const SizedBox(height: 24),
                  
                  // التبديل بين تسجيل الدخول وإنشاء حساب
                  _buildToggleAuthMode(),
                ],
              ),
            ),
          ),
        ),
      ),
    );
  }

  Widget _buildLogo() {
    return Center(
      child: Container(
        width: 100,
        height: 100,
        decoration: BoxDecoration(
          gradient: const LinearGradient(
            begin: Alignment.topLeft,
            end: Alignment.bottomRight,
            colors: [
              Color(0xFF3B82F6),
              Color(0xFF8B5CF6),
            ],
          ),
          borderRadius: BorderRadius.circular(20),
          boxShadow: [
            BoxShadow(
              color: const Color(0xFF3B82F6).withOpacity(0.3),
              blurRadius: 20,
              spreadRadius: 5,
            ),
          ],
        ),
        child: const Center(
          child: Text(
            '🏆',
            style: TextStyle(fontSize: 50),
          ),
        ),
      ),
    );
  }

  Widget _buildTitle() {
    return Column(
      children: [
        ShaderMask(
          shaderCallback: (bounds) => const LinearGradient(
            colors: [
              Color(0xFF60A5FA),
              Color(0xFFA78BFA),
              Color(0xFFF472B6),
            ],
          ).createShader(bounds),
          child: const Text(
            'أكاديمية الرياضات الاحترافية',
            style: TextStyle(
              fontSize: 28,
              fontWeight: FontWeight.bold,
              color: Colors.white,
            ),
            textAlign: TextAlign.center,
          ),
        ),
        const SizedBox(height: 8),
        Text(
          'Sports Academy System',
          style: TextStyle(
            fontSize: 16,
            color: Colors.white.withOpacity(0.7),
          ),
          textAlign: TextAlign.center,
        ),
      ],
    );
  }

  Widget _buildForm(AuthProvider authProvider) {
    return Form(
      key: _formKey,
      child: Column(
        children: [
          // حقل البريد الإلكتروني
          GlassCard(
            child: TextFormField(
              controller: _emailController,
              keyboardType: TextInputType.emailAddress,
              style: const TextStyle(color: Colors.white),
              decoration: InputDecoration(
                hintText: 'البريد الإلكتروني',
                hintStyle: TextStyle(color: Colors.white.withOpacity(0.5)),
                prefixIcon: const Icon(Icons.email, color: Color(0xFF3B82F6)),
                border: InputBorder.none,
              ),
              validator: (value) {
                if (value == null || value.isEmpty) {
                  return 'البريد الإلكتروني مطلوب';
                }
                if (!value.contains('@')) {
                  return 'البريد الإلكتروني غير صالح';
                }
                return null;
              },
            ),
          ),
          
          const SizedBox(height: 16),
          
          // حقل كلمة المرور
          GlassCard(
            child: TextFormField(
              controller: _passwordController,
              obscureText: _obscurePassword,
              style: const TextStyle(color: Colors.white),
              decoration: InputDecoration(
                hintText: 'كلمة المرور',
                hintStyle: TextStyle(color: Colors.white.withOpacity(0.5)),
                prefixIcon: const Icon(Icons.lock, color: Color(0xFF3B82F6)),
                suffixIcon: IconButton(
                  icon: Icon(
                    _obscurePassword ? Icons.visibility_off : Icons.visibility,
                    color: Colors.white.withOpacity(0.5),
                  ),
                  onPressed: () {
                    setState(() {
                      _obscurePassword = !_obscurePassword;
                    });
                  },
                ),
                border: InputBorder.none,
              ),
              validator: (value) {
                if (value == null || value.isEmpty) {
                  return 'كلمة المرور مطلوبة';
                }
                if (value.length < 6) {
                  return 'كلمة المرور يجب أن تكون 6 أحرف على الأقل';
                }
                return null;
              },
            ),
          ),
          
          // حقل تأكيد كلمة المرور (للتسجيل فقط)
          if (_isSignUp) ...[
            const SizedBox(height: 16),
            GlassCard(
              child: TextFormField(
                obscureText: _obscurePassword,
                style: const TextStyle(color: Colors.white),
                decoration: InputDecoration(
                  hintText: 'تأكيد كلمة المرور',
                  hintStyle: TextStyle(color: Colors.white.withOpacity(0.5)),
                  prefixIcon: const Icon(Icons.lock_outline, color: Color(0xFF3B82F6)),
                  border: InputBorder.none,
                ),
                validator: (value) {
                  if (_isSignUp && value != _passwordController.text) {
                    return 'كلمتا المرور غير متطابقتين';
                  }
                  return null;
                },
              ),
            ),
          ],
        ],
      ),
    );
  }

  Widget _buildSubmitButton(AuthProvider authProvider) {
    return SizedBox(
      height: 56,
      child: ElevatedButton(
        onPressed: authProvider.isLoading ? null : _handleAuth,
        style: ElevatedButton.styleFrom(
          backgroundColor: const Color(0xFF3B82F6),
          foregroundColor: Colors.white,
          shape: RoundedRectangleBorder(
            borderRadius: BorderRadius.circular(12),
          ),
          elevation: 8,
          shadowColor: const Color(0xFF3B82F6).withOpacity(0.5),
        ),
        child: authProvider.isLoading
            ? const SizedBox(
                width: 24,
                height: 24,
                child: CircularProgressIndicator(
                  strokeWidth: 2,
                  valueColor: AlwaysStoppedAnimation<Color>(Colors.white),
                ),
              )
            : Text(
                _isSignUp ? 'إنشاء حساب' : 'تسجيل الدخول',
                style: const TextStyle(
                  fontSize: 16,
                  fontWeight: FontWeight.bold,
                ),
              ),
      ),
    );
  }

  Widget _buildForgotPasswordButton() {
    return TextButton(
      onPressed: () {
        // TODO: Implement forgot password
      },
      child: const Text(
        'نسيت كلمة المرور؟',
        style: TextStyle(
          color: Color(0xFF60A5FA),
          fontSize: 14,
        ),
      ),
    );
  }

  Widget _buildDivider() {
    return Row(
      children: [
        Expanded(
          child: Divider(
            color: Colors.white.withOpacity(0.2),
            thickness: 1,
          ),
        ),
        Padding(
          padding: const EdgeInsets.symmetric(horizontal: 16),
          child: Text(
            'أو',
            style: TextStyle(
              color: Colors.white.withOpacity(0.5),
              fontSize: 14,
            ),
          ),
        ),
        Expanded(
          child: Divider(
            color: Colors.white.withOpacity(0.2),
            thickness: 1,
          ),
        ),
      ],
    );
  }

  Widget _buildGoogleButton() {
    return SizedBox(
      height: 56,
      child: OutlinedButton.icon(
        onPressed: _handleGoogleSignIn,
        style: OutlinedButton.styleFrom(
          backgroundColor: Colors.white.withOpacity(0.05),
          foregroundColor: Colors.white,
          side: BorderSide(
            color: Colors.white.withOpacity(0.2),
          ),
          shape: RoundedRectangleBorder(
            borderRadius: BorderRadius.circular(12),
          ),
        ),
        icon: Image.asset(
          'assets/icons/google.png',
          width: 24,
          height: 24,
          errorBuilder: (context, error, stackTrace) {
            return const Icon(Icons.g_mobiledata, size: 24);
          },
        ),
        label: const Text(
          'تسجيل الدخول بـ Google',
          style: TextStyle(
            fontSize: 16,
            fontWeight: FontWeight.bold,
          ),
        ),
      ),
    );
  }

  Widget _buildToggleAuthMode() {
    return Row(
      mainAxisAlignment: MainAxisAlignment.center,
      children: [
        Text(
          _isSignUp ? 'لديك حساب بالفعل؟' : 'ليس لديك حساب؟',
          style: TextStyle(
            color: Colors.white.withOpacity(0.7),
            fontSize: 14,
          ),
        ),
        TextButton(
          onPressed: _toggleMode,
          child: Text(
            _isSignUp ? 'تسجيل الدخول' : 'إنشاء حساب',
            style: const TextStyle(
              color: Color(0xFF60A5FA),
              fontSize: 14,
              fontWeight: FontWeight.bold,
            ),
          ),
        ),
      ],
    );
  }
}
