
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics, isSupported } from "firebase/analytics";

// --- CONFIGURACIÓN DE FIREBASE ---
const firebaseConfig = {
  apiKey: "AIzaSyAIUw8fWrPLQlATdp0qFZS4TOUp4zqtzFc",
  authDomain: "huelva-late.firebaseapp.com",
  projectId: "huelva-late",
  storageBucket: "huelva-late.firebasestorage.app",
  messagingSenderId: "279342477253",
  appId: "1:279342477253:web:fc8923ea000f5596cb25ac",
  measurementId: "G-SD432ZQGC9"
};

// Initialize Firebase
let app = null;
let analytics = null;

// Validar que la API Key existe y no es el placeholder genérico
// CORRECCIÓN: Comparamos contra el texto de ejemplo, no contra la clave real
const isConfigured = firebaseConfig.apiKey && 
                     firebaseConfig.apiKey !== "TU_API_KEY_AQUI" && 
                     !firebaseConfig.apiKey.includes("TU_API_KEY");

if (typeof window !== 'undefined' && isConfigured) {
  try {
    app = initializeApp(firebaseConfig);
    
    // Analytics debe inicializarse con cuidado para evitar errores en entornos no soportados
    isSupported().then(supported => {
      if (supported) {
        analytics = getAnalytics(app);
        console.log("Firebase Analytics activo");
      }
    }).catch(err => {
      console.log("Firebase Analytics no soportado en este entorno:", err);
    });
    
    console.log("Firebase inicializado correctamente");
  } catch (error) {
    console.error("Error inicializando Firebase:", error);
  }
} else {
  console.log("⚠️ Firebase no configurado o claves incorrectas.");
}

export { app, analytics };
