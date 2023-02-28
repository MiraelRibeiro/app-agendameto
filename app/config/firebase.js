import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyD8U94A7yehRNDSqLaIFA3HbgpC1z-rSSw",
  authDomain: "agendamento-app-8ca2a.firebaseapp.com",
  projectId: "agendamento-app-8ca2a",
  storageBucket: "agendamento-app-8ca2a.appspot.com",
  messagingSenderId: "878811812349",
  appId: "1:878811812349:web:d7f2f1d9e669b635794994",
  measurementId: "G-CQJ7DXGVZ4"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
