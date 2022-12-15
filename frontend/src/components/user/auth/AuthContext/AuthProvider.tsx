import { showNotification } from '@mantine/notifications';
import { createContext, ReactNode, useContext, useMemo, useState } from 'react';
import { redirect, useNavigate } from 'react-router-dom';
import { removeAxiosAuthToken } from '../../../../api/axiosConfig';
import useLocalStorage from '../../../shared/hooks/useLocalStorage';
import { JwtTokenResponse, RegisteredUserResponse, User } from '../../types';

type FetchParams = [RequestInfo | URL, RequestInit | undefined];

type LoginParams = {
  username: string;
  password: string;
};

type RegisterParams = {
  username: string;
  email: string;
  password: string;
};

interface AuthContext {
  // We defined the user type in `index.d.ts`, but it's
  // a simple object with email, name and password.
  user: User | null;
  loading: boolean;
  error: string;

  login: (email: string, password: string) => void;

  register: (email: string, name: string, password: string) => void;
  logout: () => void;
  authFetch: (...fetchParams: FetchParams) => Promise<unknown>;
}

const AuthContext = createContext<AuthContext>({} as AuthContext);

export function AuthProvider({ children }: { children: ReactNode }): JSX.Element {
  const [user, setUser] = useLocalStorage<User | null>('user', null);
  const [authError, setAuthError] = useState<string>('');
  const [authLoading, setAuthLoading] = useState<boolean>(false);

  const navigate = useNavigate();

  // Functions that send requests to the backend
  // TODO: add error checking for API calls (if backend not available)
  const authApi = () => {
    const REACT_APP_API_ROOT = process.env.REACT_APP_API_ROOT;
    const LOGIN_PART = '/user/login';
    const REGISTER_PART = '/user/register';

    const handleExpiredToken = () => {
      showNotification({
        title: 'Session timed out',
        message: 'Your session has timed out and you will need to sign in again.',
      });
      setUser(null);
      navigate('/login');
    };

    return {
      login: async ({ username, password }: LoginParams): Promise<string | null> => {
        const response = await fetch(
          REACT_APP_API_ROOT + LOGIN_PART + `?username=${username}&password=${password}`
        );

        const data = await response.json();
        const parsedData = JwtTokenResponse.safeParse(data);

        if (parsedData.success) {
          return parsedData.data.access_token;
        } else {
          return null;
        }
      },

      register: async ({
        email,
        username,
        password,
      }: RegisterParams): Promise<RegisteredUserResponse | null> => {
        const response = await fetch(REACT_APP_API_ROOT + REGISTER_PART, {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            email,
            username,
            password,
          }),
        });

        const data = await response.json();
        const parsedData = RegisteredUserResponse.safeParse(data);

        if (parsedData.success) {
          return { username, email };
        } else {
          return null;
        }
      },

      authFetch: async (...fetchParams: FetchParams): Promise<unknown> => {
        if (user?.accessToken === null) {
          showNotification({
            title: 'Session timed out',
            message: 'Your session has timed out and you will need to sign in again.',
          });
          return new Response();
        }

        const response = await fetch(fetchParams[0], {
          headers: {
            Authorization: `Bearer ${user?.accessToken}`,
            'Content-Type': 'application/json',
          },
          ...fetchParams[1],
        });

        response.status == 401 && handleExpiredToken();

        const data = await response.json();
        return data;
      },
    };
  };

  async function login(username: string, password: string) {
    setAuthLoading(true);

    authApi()
      .login({ username, password })
      .then((token) => {
        console.log('token:', token);
        if (token === null) {
          setAuthError('Invalid credentials');
        } else {
          setUser({ accessToken: token, username: username });
        }
      })
      .catch((error: Error) => {
        setAuthError(error.message);
      })
      .finally(() => {
        setAuthLoading(false);
      });
  }

  // Sends sign up details to the server. On success we just apply
  // the created user to the state.
  function register(email: string, username: string, password: string) {
    setAuthLoading(true);

    authApi()
      .register({ email, username, password })
      .then((user) => {
        if (user === null) {
          setAuthError('Could not create user');
        } else {
          navigate('/login');
        }
      })
      .catch((error: Error) => setAuthError(error.message))
      .finally(() => setAuthLoading(false));
  }

  function logout() {
    console.log('logging out')
    removeAxiosAuthToken()
    setUser(null);
    navigate('/');
  }

  // Make the provider update only when it should.
  // We only want to force re-renders if the user,
  // loading or error states change.
  //
  // Whenever the `value` passed into a provider changes,
  // the whole tree under the provider re-renders, and
  // that can be very costly! Even in this case, where
  // you only get re-renders when logging in and out
  // we want to keep things very performant.
  const memoedValue = useMemo<AuthContext>(
    () => ({
      user,
      loading: authLoading,
      error: authError,
      login,
      register,
      logout,
      authFetch: authApi().authFetch,
    }),
    [user, authLoading, authError]
  );

  // We only want to render the underlying app after we
  // assert for the presence of a current user.
  return <AuthContext.Provider value={memoedValue}>{children}</AuthContext.Provider>;
}

// Let's only export the `useAuth` hook instead of the context.
// We only want to use the hook directly and never the context component.
export default function useAuth() {
  return useContext(AuthContext);
}
