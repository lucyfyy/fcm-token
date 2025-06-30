import { firebaseConfig } from './config/firebaseConfig.js';

firebase.initializeApp(firebaseConfig);

const messaging = firebase.messaging();

if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('./firebase-messaging-sw.js')
        .then((registration) => {
            console.log('Service Worker terdaftar:', registration.scope);

            Notification.requestPermission().then((permission) => {
                console.log('Notification permission:', permission);
                document.body.innerHTML += `<p>Notification permission: ${permission}</p>`;

                if (permission === 'granted') {
                    messaging.getToken({
                        vapidKey: 'BEwxm_l_WS47YDUNahaH2-OWfGkzQ6nM5ozm1vGu0X8dQw0KQ39fVI2LzhiLKweWo-qOaZLlJdhsNBuf5ezHfXY',
                        serviceWorkerRegistration: registration,
                    })
                        .then((currentToken) => {
                            if (currentToken) {
                                // ✅ Show token on the page
                                const tokenDisplay = document.createElement('pre');
                                tokenDisplay.textContent = `FCM Token:\n${currentToken}`;
                                document.body.appendChild(tokenDisplay);
                            } else {
                                document.body.innerHTML += `<p style="color:red;">Tidak mendapatkan token.</p>`;
                            }
                        })
                        .catch((err) => {
                            console.error('Error mendapatkan token:', err);
                            document.body.innerHTML += `<p style="color:red;">Error: ${err.message}</p>`;
                        });
                } else {
                    console.warn('Izin notifikasi ditolak.');
                    document.body.innerHTML += `<p style="color:orange;">Izin notifikasi ditolak.</p>`;
                }
            });

            messaging.onMessage((payload) => {
                console.log('Pesan diterima di foreground:', payload);

                new Notification(payload.data.title, {
                    body: payload.data.body,
                    icon: '/firebase-logo.png'
                });
            });

        }).catch((err) => {
            console.error('Gagal register Service Worker:', err);
            document.body.innerHTML += `<p style="color:red;">Service Worker Error: ${err.message}</p>`;
        });
} else {
    console.error('Service Worker tidak didukung browser ini.');
    document.body.innerHTML += `<p style="color:red;">Browser tidak mendukung Service Worker.</p>`;
}
