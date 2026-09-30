import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import 'package:provider/provider.dart';
import 'package:google_fonts/google_fonts.dart';
import 'package:firebase_core/firebase_core.dart';
import 'package:shared_preferences/shared_preferences.dart';

import 'screens/splash_screen.dart';
import 'screens/login_screen.dart';
import 'screens/dashboard_screen.dart';
import 'screens/players_screen.dart';
import 'screens/coaches_screen.dart';
import 'screens/attendance_screen.dart';
import 'screens/communication_screen.dart';
import 'screens/tournaments_screen.dart';
import 'screens/finance_screen.dart';
import 'services/auth_service.dart';
import 'providers/theme_provider.dart';
import 'providers/auth_provider.dart';
import 'providers/player_provider.dart';

void main() async {
  WidgetsFlutterBinding.ensureInitialized();
  
  // تهيئة Firebase
  await Firebase.initializeApp();
  
  // قفل الاتجاه العمودي
  await SystemChrome.setPreferredOrientations([
    DeviceOrientation.portraitUp,
    DeviceOrientation.portraitDown,
  ]);
  
  // إعداد الحالة المفضلة
  final prefs = await SharedPreferences.getInstance();
  
  runApp(
    MultiProvider(
      providers: [
        ChangeNotifierProvider(create: (_) => ThemeProvider(prefs)),
        ChangeNotifierProvider(create: (_) => AuthProvider()),
        ChangeNotifierProvider(create: (_) => PlayerProvider()),
      ],
      child: const SportsAcademyApp(),
    ),
  );
}

class SportsAcademyApp extends StatelessWidget {
  const SportsAcademyApp({super.key});

  @override
  Widget build(BuildContext context) {
    return Consumer<ThemeProvider>(
      builder: (context, themeProvider, child) {
        return MaterialApp(
          title: 'أكاديمية الرياضات الاحترافية',
          debugShowCheckedModeBanner: false,
          theme: ThemeData(
            useMaterial3: true,
            brightness: Brightness.dark,
            colorScheme: ColorScheme.dark(
              primary: const Color(0xFF3B82F6),
              secondary: const Color(0xFF8B5CF6),
              surface: const Color(0xFF1E293B),
              background: const Color(0xFF0F172A),
            ),
            textTheme: GoogleFonts.cairoTextTheme(
              Theme.of(context).textTheme.apply(
                bodyColor: Colors.white,
                displayColor: Colors.white,
              ),
            ),
            scaffoldBackgroundColor: const Color(0xFF0F172A),
            appBarTheme: const AppBarTheme(
              backgroundColor: Color(0xFF1E293B),
              elevation: 0,
              centerTitle: true,
            ),
            cardTheme: CardTheme(
              color: Colors.white.withOpacity(0.05),
              elevation: 0,
              shape: RoundedRectangleBorder(
                borderRadius: BorderRadius.circular(16),
                side: BorderSide(
                  color: Colors.white.withOpacity(0.1),
                ),
              ),
            ),
          ),
          darkTheme: ThemeData(
            useMaterial3: true,
            brightness: Brightness.dark,
            colorScheme: ColorScheme.dark(
              primary: const Color(0xFF3B82F6),
              secondary: const Color(0xFF8B5CF6),
              surface: const Color(0xFF1E293B),
              background: const Color(0xFF0F172A),
            ),
            textTheme: GoogleFonts.cairoTextTheme(
              Theme.of(context).textTheme.apply(
                bodyColor: Colors.white,
                displayColor: Colors.white,
              ),
            ),
            scaffoldBackgroundColor: const Color(0xFF0F172A),
          ),
          themeMode: themeProvider.themeMode,
          home: const SplashScreen(),
          routes: {
            '/login': (context) => const LoginScreen(),
            '/dashboard': (context) => const DashboardScreen(),
            '/players': (context) => const PlayersScreen(),
            '/coaches': (context) => const CoachesScreen(),
            '/attendance': (context) => const AttendanceScreen(),
            '/communication': (context) => const CommunicationScreen(),
            '/tournaments': (context) => const TournamentsScreen(),
            '/finance': (context) => const FinanceScreen(),
          },
        );
      },
    );
  }
}
