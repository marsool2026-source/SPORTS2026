// ============================================
// 📦 النماذج (Models)
// ============================================

import 'package:flutter/foundation.dart';

// ============================================
// نموذج اللاعب
// ============================================
class Player {
  final String id;
  final String name;
  final int age;
  final int birthYear;
  final String sport;
  final String? position;
  final String serialNumber;
  final String qrCode;
  final SubscriptionStatus subscriptionStatus;
  final String? groupId;
  final String? coachId;
  final String? phone;
  final String? emergencyContact;
  final String? medicalNotes;
  final List<String> achievements;
  final PlayerPerformance performance;

  Player({
    required this.id,
    required this.name,
    required this.age,
    required this.birthYear,
    required this.sport,
    this.position,
    required this.serialNumber,
    required this.qrCode,
    required this.subscriptionStatus,
    this.groupId,
    this.coachId,
    this.phone,
    this.emergencyContact,
    this.medicalNotes,
    this.achievements = const [],
    required this.performance,
  });

  factory Player.fromJson(Map<String, dynamic> json) {
    return Player(
      id: json['id'] ?? '',
      name: json['name'] ?? '',
      age: json['age'] ?? 0,
      birthYear: json['birthYear'] ?? 0,
      sport: json['sport'] ?? '',
      position: json['position'],
      serialNumber: json['serialNumber'] ?? '',
      qrCode: json['qrCode'] ?? '',
      subscriptionStatus: SubscriptionStatus.values.firstWhere(
        (e) => e.name == json['subscriptionStatus'],
        orElse: () => SubscriptionStatus.inactive,
      ),
      groupId: json['groupId'],
      coachId: json['coachId'],
      phone: json['phone'],
      emergencyContact: json['emergencyContact'],
      medicalNotes: json['medicalNotes'],
      achievements: List<String>.from(json['achievements'] ?? []),
      performance: PlayerPerformance.fromJson(json['performance'] ?? {}),
    );
  }

  Map<String, dynamic> toJson() {
    return {
      'id': id,
      'name': name,
      'age': age,
      'birthYear': birthYear,
      'sport': sport,
      'position': position,
      'serialNumber': serialNumber,
      'qrCode': qrCode,
      'subscriptionStatus': subscriptionStatus.name,
      'groupId': groupId,
      'coachId': coachId,
      'phone': phone,
      'emergencyContact': emergencyContact,
      'medicalNotes': medicalNotes,
      'achievements': achievements,
      'performance': performance.toJson(),
    };
  }

  Player copyWith({
    String? id,
    String? name,
    int? age,
    int? birthYear,
    String? sport,
    String? position,
    String? serialNumber,
    String? qrCode,
    SubscriptionStatus? subscriptionStatus,
    String? groupId,
    String? coachId,
    String? phone,
    String? emergencyContact,
    String? medicalNotes,
    List<String>? achievements,
    PlayerPerformance? performance,
  }) {
    return Player(
      id: id ?? this.id,
      name: name ?? this.name,
      age: age ?? this.age,
      birthYear: birthYear ?? this.birthYear,
      sport: sport ?? this.sport,
      position: position ?? this.position,
      serialNumber: serialNumber ?? this.serialNumber,
      qrCode: qrCode ?? this.qrCode,
      subscriptionStatus: subscriptionStatus ?? this.subscriptionStatus,
      groupId: groupId ?? this.groupId,
      coachId: coachId ?? this.coachId,
      phone: phone ?? this.phone,
      emergencyContact: emergencyContact ?? this.emergencyContact,
      medicalNotes: medicalNotes ?? this.medicalNotes,
      achievements: achievements ?? this.achievements,
      performance: performance ?? this.performance,
    );
  }
}

// ============================================
// حالة الاشتراك
// ============================================
enum SubscriptionStatus {
  active,
  pending,
  inactive,
}

// ============================================
// أداء اللاعب
// ============================================
class PlayerPerformance {
  final int speed;
  final int strength;
  final int endurance;
  final int accuracy;
  final int agility;

  PlayerPerformance({
    this.speed = 0,
    this.strength = 0,
    this.endurance = 0,
    this.accuracy = 0,
    this.agility = 0,
  });

  factory PlayerPerformance.fromJson(Map<String, dynamic> json) {
    return PlayerPerformance(
      speed: json['speed'] ?? 0,
      strength: json['strength'] ?? 0,
      endurance: json['endurance'] ?? 0,
      accuracy: json['accuracy'] ?? 0,
      agility: json['agility'] ?? 0,
    );
  }

  Map<String, dynamic> toJson() {
    return {
      'speed': speed,
      'strength': strength,
      'endurance': endurance,
      'accuracy': accuracy,
      'agility': agility,
    };
  }
}

// ============================================
// نموذج المدرب
// ============================================
class Coach {
  final String id;
  final String name;
  final String specialty;
  final String experience;
  final List<String> certifications;
  final int playersCount;
  final double rating;

  Coach({
    required this.id,
    required this.name,
    required this.specialty,
    required this.experience,
    this.certifications = const [],
    this.playersCount = 0,
    this.rating = 0.0,
  });

  factory Coach.fromJson(Map<String, dynamic> json) {
    return Coach(
      id: json['id'] ?? '',
      name: json['name'] ?? '',
      specialty: json['specialty'] ?? '',
      experience: json['experience'] ?? '',
      certifications: List<String>.from(json['certifications'] ?? []),
      playersCount: json['playersCount'] ?? 0,
      rating: (json['rating'] ?? 0.0).toDouble(),
    );
  }

  Map<String, dynamic> toJson() {
    return {
      'id': id,
      'name': name,
      'specialty': specialty,
      'experience': experience,
      'certifications': certifications,
      'playersCount': playersCount,
      'rating': rating,
    };
  }
}

// ============================================
// نموذج المجموعة التدريبية
// ============================================
class TrainingGroup {
  final String id;
  final String name;
  final String ageGroup;
  final String coachId;
  final String coachName;
  final int playersCount;
  final int maxCapacity;
  final String schedule;
  final String location;

  TrainingGroup({
    required this.id,
    required this.name,
    required this.ageGroup,
    required this.coachId,
    required this.coachName,
    this.playersCount = 0,
    required this.maxCapacity,
    required this.schedule,
    required this.location,
  });

  factory TrainingGroup.fromJson(Map<String, dynamic> json) {
    return TrainingGroup(
      id: json['id'] ?? '',
      name: json['name'] ?? '',
      ageGroup: json['ageGroup'] ?? '',
      coachId: json['coachId'] ?? '',
      coachName: json['coachName'] ?? '',
      playersCount: json['playersCount'] ?? 0,
      maxCapacity: json['maxCapacity'] ?? 0,
      schedule: json['schedule'] ?? '',
      location: json['location'] ?? '',
    );
  }

  Map<String, dynamic> toJson() {
    return {
      'id': id,
      'name': name,
      'ageGroup': ageGroup,
      'coachId': coachId,
      'coachName': coachName,
      'playersCount': playersCount,
      'maxCapacity': maxCapacity,
      'schedule': schedule,
      'location': location,
    };
  }
}

// ============================================
// نموذج المعاملة المالية
// ============================================
class Transaction {
  final String id;
  final String playerId;
  final String playerName;
  final double amount;
  final TransactionType type;
  final String paymentMethod;
  final TransactionStatus status;
  final DateTime date;
  final String? receiptUrl;
  final String? approvedBy;
  final String? notes;

  Transaction({
    required this.id,
    required this.playerId,
    required this.playerName,
    required this.amount,
    required this.type,
    required this.paymentMethod,
    required this.status,
    required this.date,
    this.receiptUrl,
    this.approvedBy,
    this.notes,
  });

  factory Transaction.fromJson(Map<String, dynamic> json) {
    return Transaction(
      id: json['id'] ?? '',
      playerId: json['playerId'] ?? '',
      playerName: json['playerName'] ?? '',
      amount: (json['amount'] ?? 0.0).toDouble(),
      type: TransactionType.values.firstWhere(
        (e) => e.name == json['type'],
        orElse: () => TransactionType.subscription,
      ),
      paymentMethod: json['paymentMethod'] ?? '',
      status: TransactionStatus.values.firstWhere(
        (e) => e.name == json['status'],
        orElse: () => TransactionStatus.pending,
      ),
      date: DateTime.parse(json['date'] ?? DateTime.now().toIso8601String()),
      receiptUrl: json['receiptUrl'],
      approvedBy: json['approvedBy'],
      notes: json['notes'],
    );
  }

  Map<String, dynamic> toJson() {
    return {
      'id': id,
      'playerId': playerId,
      'playerName': playerName,
      'amount': amount,
      'type': type.name,
      'paymentMethod': paymentMethod,
      'status': status.name,
      'date': date.toIso8601String(),
      'receiptUrl': receiptUrl,
      'approvedBy': approvedBy,
      'notes': notes,
    };
  }
}

enum TransactionType {
  subscription,
  product,
  bus,
}

enum TransactionStatus {
  pending,
  approved,
  rejected,
}

// ============================================
// نموذج الحضور
// ============================================
class AttendanceRecord {
  final String id;
  final String playerId;
  final String playerName;
  final DateTime date;
  final String time;
  final AttendanceStatus status;
  final String groupId;

  AttendanceRecord({
    required this.id,
    required this.playerId,
    required this.playerName,
    required this.date,
    required this.time,
    required this.status,
    required this.groupId,
  });

  factory AttendanceRecord.fromJson(Map<String, dynamic> json) {
    return AttendanceRecord(
      id: json['id'] ?? '',
      playerId: json['playerId'] ?? '',
      playerName: json['playerName'] ?? '',
      date: DateTime.parse(json['date'] ?? DateTime.now().toIso8601String()),
      time: json['time'] ?? '',
      status: AttendanceStatus.values.firstWhere(
        (e) => e.name == json['status'],
        orElse: () => AttendanceStatus.present,
      ),
      groupId: json['groupId'] ?? '',
    );
  }

  Map<String, dynamic> toJson() {
    return {
      'id': id,
      'playerId': playerId,
      'playerName': playerName,
      'date': date.toIso8601String(),
      'time': time,
      'status': status.name,
      'groupId': groupId,
    };
  }
}

enum AttendanceStatus {
  present,
  absent,
  late,
}

// ============================================
// نموذج البطولة
// ============================================
class Tournament {
  final int id;
  final String name;
  final DateTime date;
  final String location;
  final int participants;
  final TournamentStatus status;
  final String? prize;
  final String category;

  Tournament({
    required this.id,
    required this.name,
    required this.date,
    required this.location,
    this.participants = 0,
    required this.status,
    this.prize,
    required this.category,
  });

  factory Tournament.fromJson(Map<String, dynamic> json) {
    return Tournament(
      id: json['id'] ?? 0,
      name: json['name'] ?? '',
      date: DateTime.parse(json['date'] ?? DateTime.now().toIso8601String()),
      location: json['location'] ?? '',
      participants: json['participants'] ?? 0,
      status: TournamentStatus.values.firstWhere(
        (e) => e.name == json['status'],
        orElse: () => TournamentStatus.upcoming,
      ),
      prize: json['prize'],
      category: json['category'] ?? '',
    );
  }

  Map<String, dynamic> toJson() {
    return {
      'id': id,
      'name': name,
      'date': date.toIso8601String(),
      'location': location,
      'participants': participants,
      'status': status.name,
      'prize': prize,
      'category': category,
    };
  }
}

enum TournamentStatus {
  upcoming,
  ongoing,
  completed,
}

// ============================================
// نموذج الإشعارات
// ============================================
class AppNotification {
  final int id;
  final NotificationType type;
  final String title;
  final String message;
  final String time;
  final bool read;
  final String icon;

  AppNotification({
    required this.id,
    required this.type,
    required this.title,
    required this.message,
    required this.time,
    this.read = false,
    required this.icon,
  });

  factory AppNotification.fromJson(Map<String, dynamic> json) {
    return AppNotification(
      id: json['id'] ?? 0,
      type: NotificationType.values.firstWhere(
        (e) => e.name == json['type'],
        orElse: () => NotificationType.normal,
      ),
      title: json['title'] ?? '',
      message: json['message'] ?? '',
      time: json['time'] ?? '',
      read: json['read'] ?? false,
      icon: json['icon'] ?? '🔔',
    );
  }

  Map<String, dynamic> toJson() {
    return {
      'id': id,
      'type': type.name,
      'title': title,
      'message': message,
      'time': time,
      'read': read,
      'icon': icon,
    };
  }

  AppNotification copyWith({
    int? id,
    NotificationType? type,
    String? title,
    String? message,
    String? time,
    bool? read,
    String? icon,
  }) {
    return AppNotification(
      id: id ?? this.id,
      type: type ?? this.type,
      title: title ?? this.title,
      message: message ?? this.message,
      time: time ?? this.time,
      read: read ?? this.read,
      icon: icon ?? this.icon,
    );
  }
}

enum NotificationType {
  urgent,
  normal,
  promo,
}

// ============================================
// نموذج الكوبون
// ============================================
class Coupon {
  final int id;
  final String code;
  final double discount;
  final CouponType type;
  final CouponStatus status;
  final DateTime validUntil;
  final int usedCount;
  final int maxUses;

  Coupon({
    required this.id,
    required this.code,
    required this.discount,
    required this.type,
    required this.status,
    required this.validUntil,
    this.usedCount = 0,
    required this.maxUses,
  });

  factory Coupon.fromJson(Map<String, dynamic> json) {
    return Coupon(
      id: json['id'] ?? 0,
      code: json['code'] ?? '',
      discount: (json['discount'] ?? 0.0).toDouble(),
      type: CouponType.values.firstWhere(
        (e) => e.name == json['type'],
        orElse: () => CouponType.percentage,
      ),
      status: CouponStatus.values.firstWhere(
        (e) => e.name == json['status'],
        orElse: () => CouponStatus.active,
      ),
      validUntil: DateTime.parse(json['validUntil'] ?? DateTime.now().toIso8601String()),
      usedCount: json['usedCount'] ?? 0,
      maxUses: json['maxUses'] ?? 0,
    );
  }

  Map<String, dynamic> toJson() {
    return {
      'id': id,
      'code': code,
      'discount': discount,
      'type': type.name,
      'status': status.name,
      'validUntil': validUntil.toIso8601String(),
      'usedCount': usedCount,
      'maxUses': maxUses,
    };
  }
}

enum CouponType {
  percentage,
  fixed,
}

enum CouponStatus {
  active,
  expired,
}

// ============================================
// نموذج الرقم القياسي
// ============================================
class WorldRecord {
  final int id;
  final String sport;
  final String event;
  final String record;
  final String unit;
  final String holder;
  final String country;
  final String category;

  WorldRecord({
    required this.id,
    required this.sport,
    required this.event,
    required this.record,
    required this.unit,
    required this.holder,
    required this.country,
    required this.category,
  });

  factory WorldRecord.fromJson(Map<String, dynamic> json) {
    return WorldRecord(
      id: json['id'] ?? 0,
      sport: json['sport'] ?? '',
      event: json['event'] ?? '',
      record: json['record'] ?? '',
      unit: json['unit'] ?? '',
      holder: json['holder'] ?? '',
      country: json['country'] ?? '',
      category: json['category'] ?? '',
    );
  }

  Map<String, dynamic> toJson() {
    return {
      'id': id,
      'sport': sport,
      'event': event,
      'record': record,
      'unit': unit,
      'holder': holder,
      'country': country,
      'category': category,
    };
  }
}

// ============================================
// نموذج رسالة الشات
// ============================================
class ChatMessage {
  final int id;
  final MessageSender sender;
  final String senderName;
  final String text;
  final String time;

  ChatMessage({
    required this.id,
    required this.sender,
    required this.senderName,
    required this.text,
    required this.time,
  });

  factory ChatMessage.fromJson(Map<String, dynamic> json) {
    return ChatMessage(
      id: json['id'] ?? 0,
      sender: MessageSender.values.firstWhere(
        (e) => e.name == json['sender'],
        orElse: () => MessageSender.coach,
      ),
      senderName: json['senderName'] ?? '',
      text: json['text'] ?? '',
      time: json['time'] ?? '',
    );
  }

  Map<String, dynamic> toJson() {
    return {
      'id': id,
      'sender': sender.name,
      'senderName': senderName,
      'text': text,
      'time': time,
    };
  }
}

enum MessageSender {
  coach,
  player,
}

// ============================================
// نموذج المستخدم
// ============================================
class User {
  final String id;
  final String name;
  final String email;
  final UserRole role;
  final String? avatar;

  User({
    required this.id,
    required this.name,
    required this.email,
    required this.role,
    this.avatar,
  });

  factory User.fromJson(Map<String, dynamic> json) {
    return User(
      id: json['id'] ?? '',
      name: json['name'] ?? '',
      email: json['email'] ?? '',
      role: UserRole.values.firstWhere(
        (e) => e.name == json['role'],
        orElse: () => UserRole.player,
      ),
      avatar: json['avatar'],
    );
  }

  Map<String, dynamic> toJson() {
    return {
      'id': id,
      'name': name,
      'email': email,
      'role': role.name,
      'avatar': avatar,
    };
  }
}

enum UserRole {
  admin,
  financialManager,
  coach,
  player,
  parent,
}
