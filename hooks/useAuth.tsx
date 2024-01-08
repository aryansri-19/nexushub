import { useContext, createContext, useState, useEffect } from "react";

type User = {
  id: number;
  name?: string;
  email: string;
};

type AuthContextProps = {
  user: User | null;
};

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

interface AuthContextProviderProps {
  children: React.ReactNode;
}
export const AuthContextProvider: React.FC<AuthContextProviderProps> = ({
  children,
}) => {
  const [user, setUser] = useState<User | null>(null);
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  return (
    <AuthContext.Provider value={{ user }}>{children}</AuthContext.Provider>
  );
};

const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export default useAuth;
