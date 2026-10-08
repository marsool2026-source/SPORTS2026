/**
 * طبقة التوافق عبر المنصات (Cross-Platform Compatibility Layer)
 * تضمن عمل التطبيق على: Android, iOS, Windows, Mac, Linux, Web
 */

// ============================================
// 1. Storage Manager - مع حماية من الأخطاء
// ============================================
export const StorageManager = {
  isAvailable(): boolean {
    try {
      const test = '__storage_test__';
      localStorage.setItem(test, test);
      localStorage.removeItem(test);
      return true;
    } catch (e) {
      return false;
    }
  },

  getItem(key: string): string | null {
    try {
      if (!this.isAvailable()) return null;
      return localStorage.getItem(key);
    } catch (e) {
      console.warn('localStorage not available:', e);
      return null;
    }
  },

  setItem(key: string, value: string): boolean {
    try {
      if (!this.isAvailable()) return false;
      localStorage.setItem(key, value);
      return true;
    } catch (e) {
      console.warn('localStorage not available:', e);
      return false;
    }
  },

  removeItem(key: string): boolean {
    try {
      if (!this.isAvailable()) return false;
      localStorage.removeItem(key);
      return true;
    } catch (e) {
      console.warn('localStorage not available:', e);
      return false;
    }
  }
};

// ============================================
// 2. Notification Manager - مع fallback
// ============================================
export const NotificationManager = {
  isSupported(): boolean {
    return typeof window !== 'undefined' && 'Notification' in window;
  },

  getPermission(): NotificationPermission {
    if (!this.isSupported()) return 'denied';
    try {
      return window.Notification.permission;
    } catch (e) {
      return 'denied';
    }
  },

  async requestPermission(): Promise<NotificationPermission> {
    if (!this.isSupported()) return 'denied';
    try {
      return await window.Notification.requestPermission();
    } catch (e) {
      console.warn('Notification permission request failed:', e);
      return 'denied';
    }
  },

  show(title: string, options?: NotificationOptions): boolean {
    if (!this.isSupported()) return false;
    if (this.getPermission() !== 'granted') return false;
    
    try {
      new window.Notification(title, options);
      return true;
    } catch (e) {
      console.warn('Notification display failed:', e);
      return false;
    }
  }
};

// ============================================
// 3. Platform Detection
// ============================================
export const PlatformDetector = {
  isMobile(): boolean {
    if (typeof window === 'undefined') return false;
    return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
  },

  isIOS(): boolean {
    if (typeof window === 'undefined') return false;
    return /iPad|iPhone|iPod/.test(navigator.userAgent);
  },

  isAndroid(): boolean {
    if (typeof window === 'undefined') return false;
    return /Android/.test(navigator.userAgent);
  },

  isDesktop(): boolean {
    return !this.isMobile();
  },

  isSafari(): boolean {
    if (typeof window === 'undefined') return false;
    return /^((?!chrome|android).)*safari/i.test(navigator.userAgent);
  },

  isWebView(): boolean {
    if (typeof window === 'undefined') return false;
    const ua = navigator.userAgent.toLowerCase();
    return (ua.includes('wv') || ua.includes('webview'));
  },

  supportsNotifications(): boolean {
    return NotificationManager.isSupported() && !this.isIOS() && !this.isWebView();
  },

  supportsLocalStorage(): boolean {
    return StorageManager.isAvailable();
  },

  supportsIntersectionObserver(): boolean {
    return typeof window !== 'undefined' && 'IntersectionObserver' in window;
  },

  supportsServiceWorker(): boolean {
    return typeof window !== 'undefined' && 'serviceWorker' in navigator;
  }
};

// ============================================
// 4. Safe API Wrappers
// ============================================
export const SafeAPI = {
  // IntersectionObserver مع fallback
  observeIntersection(
    element: Element,
    callback: (isIntersecting: boolean) => void,
    options?: IntersectionObserverInit
  ): (() => void) | null {
    if (!PlatformDetector.supportsIntersectionObserver()) {
      // Fallback: افترض أن العنصر مرئي
      callback(true);
      return null;
    }

    const observer = new IntersectionObserver(([entry]) => {
      callback(entry.isIntersecting);
    }, options);

    observer.observe(element);
    return () => observer.disconnect();
  },

  // requestAnimationFrame مع fallback
  requestAnimationFrame(callback: FrameRequestCallback): number {
    if (typeof window === 'undefined') return 0;
    return (window.requestAnimationFrame || 
            (window as any).webkitRequestAnimationFrame || 
            (window as any).mozRequestAnimationFrame || 
            ((cb: FrameRequestCallback) => setTimeout(cb, 16)))(callback);
  },

  cancelAnimationFrame(id: number): void {
    if (typeof window === 'undefined') return;
    (window.cancelAnimationFrame || 
     (window as any).webkitCancelAnimationFrame || 
     (window as any).mozCancelAnimationFrame || 
     clearTimeout)(id);
  }
};

// ============================================
// 5. Viewport & Responsive Helpers
// ============================================
export const ViewportHelper = {
  getWidth(): number {
    return typeof window !== 'undefined' ? window.innerWidth : 1024;
  },

  getHeight(): number {
    return typeof window !== 'undefined' ? window.innerHeight : 768;
  },

  isMobile(): boolean {
    return this.getWidth() < 768;
  },

  isTablet(): boolean {
    return this.getWidth() >= 768 && this.getWidth() < 1024;
  },

  isDesktop(): boolean {
    return this.getWidth() >= 1024;
  },

  getBreakpoint(): 'mobile' | 'tablet' | 'desktop' {
    if (this.isMobile()) return 'mobile';
    if (this.isTablet()) return 'tablet';
    return 'desktop';
  }
};

// ============================================
// 6. Accessibility Helpers
// ============================================
export const AccessibilityHelper = {
  prefersReducedMotion(): boolean {
    if (typeof window === 'undefined') return false;
    return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  },

  prefersDarkMode(): boolean {
    if (typeof window === 'undefined') return false;
    return window.matchMedia('(prefers-color-scheme: dark)').matches;
  },

  isScreenReaderActive(): boolean {
    if (typeof document === 'undefined') return false;
    return document.documentElement.classList.contains('screen-reader');
  }
};

// ============================================
// 7. Error Boundary Helper
// ============================================
export const ErrorHandler = {
  log(error: Error, context?: string): void {
    console.error(`[Sports Academy Error]${context ? ` [${context}]` : ''}:`, error);
  },

  isQuotaExceededError(error: any): boolean {
    return error instanceof DOMException && (
      error.code === 22 || // QuotaExceededError
      error.code === 1014 || // NS_ERROR_DOM_QUOTA_REACHED
      error.name === 'QuotaExceededError'
    );
  },

  isSecurityError(error: any): boolean {
    return error instanceof DOMException && (
      error.code === 18 || // SecurityError
      error.name === 'SecurityError'
    );
  }
};

// ============================================
// 8. Export All
// ============================================
export default {
  StorageManager,
  NotificationManager,
  PlatformDetector,
  SafeAPI,
  ViewportHelper,
  AccessibilityHelper,
  ErrorHandler
};
