import { createContext, ReactNode, useContext, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useLocalStorage from '../../../shared/hooks/useLocalStorage';
import { JwtTokenResponse, RegisteredUserResponse, User, UserSchema } from '../../types';

type FetchParams = [input: RequestInfo | URL, init?: RequestInit | undefined];

interface AuthContextType {
  // We defined the user type in `index.d.ts`, but it's
  // a simple object with email, name and password.
  user: User | null;
  loading: boolean;
  error?: any;
  login: (email: string, password: string) => void;
  register: (email: string, name: string, password: string) => void;
  logout: () => void;
  authenticatedRequest: (...fetchParams: FetchParams) => Promise<User | null>;
}

const AuthContext = createContext<AuthContextType>({} as AuthContextType);

// Export the provider as we need to wrap the entire app with it
export function AuthProvider({ children }: { children: ReactNode }): JSX.Element {
  const [user, setUser] = useLocalStorage<User | null>('user', null);
  const [error, setError] = useState<any>('ingen error');
  const [loading, setLoading] = useState<boolean>(false);
  const navigate = useNavigate();

  type LoginParams = {
    username: string;
    password: string;
  };

  type RegisterParams = {
    username: string;
    email: string;
    password: string;
  };

  const authApi = () => {
    const API_ROOT = 'http://localhost:5000';
    const LOGIN_PART = '/user/login';
    const REGISTER_PART = '/user/register';

    return {
      login: async ({ username, password }: LoginParams): Promise<string | null> => {
        const response = await fetch(API_ROOT + LOGIN_PART + `?username=${username}&password=${password}`);

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
      }: RegisterParams): Promise<{ username: string; email: string } | null> => {
        const response = await fetch(API_ROOT + REGISTER_PART, {
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

        console.log(data)
        console.log(parsedData)

        if (parsedData.success) {
          return { username, email };
        } else {
          return null;
        }
      },

      authenticatedRequest: async (...fetchParams: FetchParams): Promise<User | null> => {
        if (user?.accessToken === null) {
          setError('user not signed in');
          console.log('user not signed in');
        }

        const response = await fetch(fetchParams[0], {
          headers: { Authorization: `Bearer ${user?.accessToken}` },
          body: fetchParams[1]?.body,
        });

        const data = await response.json();
        return data;
      },
    };
  };

  // Flags the component loading state and posts the login
  // data to the server.
  //
  // An error means that the email/password combination is
  // not valid.
  //
  // Finally, just signal the component that loading the
  // loading state is over.
  async function login(username: string, password: string) {
    setLoading(true);

    authApi()
      .login({ username, password })
      .then((token) => {
        console.log("token:", token)
        if (token === null) {
          setError('Invalid credentials');
        } else {
          setUser({ accessToken: token, username: username });
        }
      })
      .catch((error: Error) => {
        setError(error.message);
      })
      .finally(() => {
        setLoading(false);
      });
  }

  // Sends sign up details to the server. On success we just apply
  // the created user to the state.
  function register(email: string, username: string, password: string) {
    setLoading(true);

    authApi()
      .register({ email, username, password })
      .then((user) => {
        if (user === null) {
          setError('Could not create user');
        } else {
          navigate('/login');
        }
      })
      .catch((error: Error) => setError(error.message))
      .finally(() => setLoading(false));
  }

  function logout() {
    setUser(null);
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
  const memoedValue = useMemo<AuthContextType>(
    () => ({
      user,
      loading,
      error,
      login,
      register,
      logout,
      authenticatedRequest: authApi().authenticatedRequest,
    }),
    [user, loading, error]
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
