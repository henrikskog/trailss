import {
  createContext,
  ReactNode,
  useContext, useMemo,
  useState
} from "react";
import useLocalStorage from "../../../shared/hooks/useLocalStorage";
import { User } from "../../types";
import authApi from "../api/authApi";

interface AuthContextType {
  // We defined the user type in `index.d.ts`, but it's
  // a simple object with email, name and password.
  user: User | null;
  loading: boolean;
  error?: any;
  login: (email: string, password: string) => void;
  register: (email: string, name: string, password: string) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType>({} as AuthContextType);

// Export the provider as we need to wrap the entire app with it
export function AuthProvider({
  children,
}: {
  children: ReactNode;
}): JSX.Element {
  const [user, setUser] = useLocalStorage<User | null>("user", null);
  const [error, setError] = useState<any>();
  const [loading, setLoading] = useState<boolean>(false);

  // Flags the component loading state and posts the login
  // data to the server.
  //
  // An error means that the email/password combination is
  // not valid.
  //
  // Finally, just signal the component that loading the
  // loading state is over.
  function login(email: string, password: string) {
    setLoading(true);

    authApi()
      .login({email, password})
      .then((user) => {
        setUser(user);
      })
      .catch((error) => setError(error))
      .finally(() => setLoading(false));
  }

  // Sends sign up details to the server. On success we just apply
  // the created user to the state.
  function register(email: string, username: string, password: string) {
    setLoading(true);

    authApi()
      .register({ email, username, password })
      .then((user) => {
        setUser(user);
      })
      .catch((error) => setError(error))
      .finally(() => setLoading(false));
  }

  function logout() {
    setUser(null)
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
  const memoedValue = useMemo(
    () => ({
      user,
      loading,
      error,
      login,
      register,
      logout,
    }),
    [user, loading, error]
  );

  // We only want to render the underlying app after we
  // assert for the presence of a current user.
  return (
    <AuthContext.Provider value={memoedValue}>
      {children}
    </AuthContext.Provider>
  );
}

// Let's only export the `useAuth` hook instead of the context.
// We only want to use the hook directly and never the context component.
export default function useAuth() {
  return useContext(AuthContext);
}
