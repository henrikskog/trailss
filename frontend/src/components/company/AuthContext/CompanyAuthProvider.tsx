import { showNotification } from '@mantine/notifications';
import { createContext, ReactNode, useContext, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useLocalStorage from '../../shared/hooks/useLocalStorage';
import { CompanyUser, JwtTokenResponse } from '../../user/types';

type LoginParams = {
  username: string;
  password: string;
};

type RegisterParams = {
  username: string;
  email: string;
  password: string;
};

interface CompanyAuthContext {
  // We defined the user type in `index.d.ts`, but it's
  // a simple object with email, name and password.
  companyUser: CompanyUser | null;
  loading: boolean;
  error: string;

  login: (email: string, password: string) => void;

  logout: () => void;
}

const CompanyAuthContext = createContext<CompanyAuthContext>({} as CompanyAuthContext);

export function CompanyAuthProvider({ children }: { children: ReactNode }): JSX.Element {
  const [companyUser, setCompanyUser] = useLocalStorage<CompanyUser | null>('user', null);
  const [authError, setAuthError] = useState<string>('');
  const [authLoading, setAuthLoading] = useState<boolean>(false);

  const navigate = useNavigate();

  // Functions that send requests to the backend
  // TODO: add error checking for API calls (if backend not available)
  const authApi = () => {
    const REACT_APP_API_ROOT = 'http://localhost:5000';
    const LOGIN_PART = '/user/login';

    const handleExpiredToken = () => {
      showNotification({
        title: 'Session timed out',
        message: 'Your session has timed out and you will need to sign in again.',
      });
      setCompanyUser(null);
      navigate('/login');
    };

    return {
      login: async ({ username, password }: LoginParams): Promise<string | null> => {
        navigate('/dashboardCompany');
        return 'fake token';
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
          setCompanyUser({ accessToken: token, username: username });
        }
      })
      .catch((error: Error) => {
        setAuthError(error.message);
      })
      .finally(() => {
        setAuthLoading(false);
      });
  }

  function logout() {
    setCompanyUser(null);
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
  const memoedValue = useMemo<CompanyAuthContext>(
    () => ({
      companyUser,
      loading: authLoading,
      error: authError,
      login,
      logout,
    }),
    [companyUser, authLoading, authError]
  );

  // We only want to render the underlying app after we
  // assert for the presence of a current user.
  return <CompanyAuthContext.Provider value={memoedValue}>{children}</CompanyAuthContext.Provider>;
}

// Let's only export the `useAuth` hook instead of the context.
// We only want to use the hook directly and never the context component.
export default function useCompanyAuth() {
  return useContext(CompanyAuthContext);
}
