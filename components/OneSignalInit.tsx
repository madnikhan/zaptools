import { useEffect } from 'react';

export default function OneSignalInit() {
  useEffect(() => {
    if (typeof window === 'undefined') return;
    if ((window as any).OneSignal) return;
    const script = document.createElement('script');
    script.src = 'https://cdn.onesignal.com/sdks/OneSignalSDK.js';
    script.async = true;
    document.body.appendChild(script);

    (window as any).OneSignal = (window as any).OneSignal || [];
    (window as any).OneSignal.push(function () {
      (window as any).OneSignal.init({
        appId: 'YOUR-ONESIGNAL-APP-ID', // TODO: Replace with your OneSignal App ID
        notifyButton: { enable: true },
        allowLocalhostAsSecureOrigin: true,
      });
    });
  }, []);
  return null;
} 