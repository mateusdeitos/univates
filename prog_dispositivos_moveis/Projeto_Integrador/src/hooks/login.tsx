import React, {
  createContext,
  useCallback,
  useState,
  useContext,
  useEffect,
} from 'react';
import AsyncStorage from '@react-native-community/async-storage';
import { Alert } from 'react-native';
import api from '../services/api';

export interface User {
  id: number;
  nome: string;
  email: string;
}

interface AuthState {
  user: User;
}

interface SignInCredentials {
  email: string;
  password: string;
}

interface AuthContextData {
  user: User;
  loading: boolean;
  signIn(credentials: SignInCredentials): Promise<void>;
  signOut(): void;
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

const AuthProvider: React.FC = ({ children }) => {
  const [data, setData] = useState<AuthState>({} as AuthState);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadStorageData(): Promise<void> {
      const user = await AsyncStorage.getItem('user');
      if (user) {
        setData({ user: JSON.parse(user) });
      }
    }

    loadStorageData();
    setLoading(false);
  }, []);

  const signIn = useCallback(async ({ email, password }) => {
    const response = await api.get(`/users?email=${email}`);
    if (response.data.length > 0) {
      const { senha } = response.data[0];
      if (senha === password) {
        const user = response.data[0];
        console.log({ user });
        await AsyncStorage.setItem('user', JSON.stringify(user));

        setData({ user });
        return;
      }
    }
    Alert.alert('Erro de autenticação', 'Usuário/senha incorreto(s)');
  }, []);

  const signOut = useCallback(async () => {
    await AsyncStorage.removeItem('user');

    setData({} as AuthState);
  }, []);

  return (
    <AuthContext.Provider value={{ user: data.user, loading, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  );
};

function useAuth(): AuthContextData {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error('useAuth must be used within a AuthProvider');
  }

  return context;
}

export { AuthProvider, useAuth };
