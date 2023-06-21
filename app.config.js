import 'dotenv/config';

export default {
  expo: {
    extra: {
      androidClientId: process.env.androidClientId,
      iosClientId: process.env.iosClientId,
      expoClientId: process.env.expoClientId,
      firebaseAPIKEY: process.env.firebaseAPIKEY,
      authDomain: process.env.authDomain,
      projectId: process.env.projectId,
      storageBucket: process.env.storageBucket,
      messagingSenderId: process.env.messagingSenderId,
      appId: process.env.appId,
    },
  },
};
