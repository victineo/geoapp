import { useState, useEffect } from 'react';
import { onAuthStateChanged, signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut } from 'firebase/auth';
import { doc, setDoc, getDoc } from 'firebase/firestore';
import { auth, db } from '../../firebaseConfig.js';

export const useAuth = () => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            setUser(user);
            setLoading(false);
        });

        return unsubscribe;
    }, []);

    const login = async (email, password) => {
        try {
            console.log('Iniciando login...');
            setLoading(true);
            const userCredential = await signInWithEmailAndPassword(auth, email, password);
            console.log('Login bem-sucedido:', userCredential.user);
            return { success: true, user: userCredential.user };
        } catch (error) {
            console.error('Erro no login:', error);
            return { success: false, error: error.message };
        } finally {
            setLoading(false);
        }
    };

    const register = async (email, password, name) => {
        try {
            setLoading(true);
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);

            // Salvar dados do usuário no Firestore
            await setDoc(doc(db, 'users', userCredential.user.uid), {
                name: name,
                email: email,
                createdAt: new Date().toISOString()
            });

            return { success: true, user: userCredential.user };
        } catch (error) {
            return { success: false, error: error.message };
        } finally {
            setLoading(false);
        }
    };

    const logout = async () => {
        try {
            await signOut(auth);
            return { success: true };
        } catch (error) {
            return { success: false, error: error.message };
        }
    };

    const getUserData = async (uid) => {
        try {
            const docRef = doc(db, 'users', uid);
            const docSnap = await getDoc(docRef);

            if (docSnap.exists()) {
                return docSnap.data();
            } else {
                return null;
            }
        } catch (error) {
            console.error('Error getting user data:', error);
            return null;
        }
    };

    return {
        user,
        loading,
        login,
        register,
        logout,
        getUserData
    };
};
