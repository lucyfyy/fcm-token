importScripts('https://www.gstatic.com/firebasejs/10.11.0/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/10.11.0/firebase-messaging-compat.js');

// Inisialisasi Firebase di SW
firebase.initializeApp({
    apiKey: "AIzaSyBpTCGN-qbcDKmZC-CEVN4cr4i6UT34ff0",
    authDomain: "presensi-app-db6fb.firebaseapp.com",
    projectId: "presensi-app-db6fb",
    storageBucket: "presensi-app-db6fb.appspot.com",
    messagingSenderId: "567443003463",
    appId: "1:567443003463:web:9fa22c24ec0025aa6f3962",
    measurementId: "G-MX82GJ8PNC"
});

const messaging = firebase.messaging();

messaging.onBackgroundMessage(function (payload) {
    console.log('Pesan diterima di background:', payload);
    const notificationTitle = payload.data.title;
    const notificationOptions = {
        body: payload.data.body,
        icon: '/firebase-logo.png'
    };

    self.registration.showNotification(notificationTitle, notificationOptions);
});
