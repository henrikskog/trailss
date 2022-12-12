import { createContext, ReactNode, useContext, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import useLocalStorage from '../../shared/hooks/useLocalStorage';
import { CompanyUser } from '../../user/types';

interface CompanyAuthContext {
  // We defined the user type in `index.d.ts`, but it's
  // a simple object with email, name and password.
  companyUser: CompanyUser | null;
  login: (email: string, password: string) => void;
  logout: () => void;
}

const CompanyAuthContext = createContext<CompanyAuthContext>({} as CompanyAuthContext);

export function CompanyAuthProvider({ children }: { children: ReactNode }): JSX.Element {
  const [companyUser, setCompanyUser] = useLocalStorage<CompanyUser | null>('user', null);
  const navigate = useNavigate();

  async function login(username: string, password: string) {
    navigate('/dashboardCompany');
  }

  function logout() {
    navigate('/');
  }

  const memoedValue = useMemo<CompanyAuthContext>(
    () => ({
      companyUser,
      login,
      logout,
    }),
    [companyUser]
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
