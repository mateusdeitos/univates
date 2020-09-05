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

interface User {
  id: string;
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
      const [user] = await AsyncStorage.multiGet(['user']);
      if (user[0]) {
        setData({ user: JSON.parse(user[0]) });
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
        await AsyncStorage.multiSet([['user', JSON.stringify(user)]]);

        setData({ user });
      }
    } else {
      Alert.alert('Erro de autenticação', 'Usuário/senha incorreto(s)');
    }
  }, []);

  const signOut = useCallback(async () => {
    await AsyncStorage.multiRemove(['user']);

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
