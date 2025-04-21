import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-auth.js";
import { getFirestore, doc, setDoc } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-firestore.js";

const firebaseConfig = {
    apiKey: "AIzaSyBXVV4FDLvCZ_SflqjrSSP8-afkbka4RJ0",
    authDomain: "hara-8d199.firebaseapp.com",
    databaseURL: "https://hara-8d199-default-rtdb.firebaseio.com",
    projectId: "hara-8d199",
    storageBucket: "hara-8d199.firebasestorage.app",
    messagingSenderId: "446477557552",
    appId: "1:446477557552:web:ea9e5e8ccf0ab4e92932f5",
    measurementId: "G-BJVYT3PWHL"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

// Registro de usuarios
document.getElementById("formRegistro").addEventListener("submit", async (e) => {
    e.preventDefault();
    
    const nombreUsuario = document.getElementById("nombreUsuario").value.trim();
    const email = document.getElementById("emailRegistro").value.trim();
    const password = document.getElementById("passwordRegistro").value;
    
    if (!nombreUsuario) {
        alert("Por favor, ingresa un nombre de usuario.");
        return;
    }
    
    try {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;
        
        await setDoc(doc(db, "Usuarios", user.uid), {
            email: user.email,
            uid: user.uid,
            nombre: nombreUsuario
        });
        
        alert("Usuario registrado con éxito");
    } catch (error) {
        console.error("Error en el registro: ", error.message);
        alert("Error: " + error.message);
    }
});

// Inicio de sesión
document.getElementById("formLogin").addEventListener("submit", async (e) => {
    e.preventDefault();
    
    const email = document.getElementById("emailLogin").value.trim();
    const password = document.getElementById("passwordLogin").value;
    
    try {
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        console.log("Usuario autenticado: ", userCredential.user);
        window.location.href = "./Html/Inicio.html"; // Redirige si el login es exitoso
    } catch (error) {
        console.error("Error en el inicio de sesión: ", error.message);
        alert("Error: " + error.message);
    }
});
    