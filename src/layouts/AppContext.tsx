import { useState, ReactNode, createContext } from 'react';

export interface AppContextProps {
  supabaseName: string;
  setSupabaseName: React.Dispatch<React.SetStateAction<string>>;

  supabaseUrl: string;
  setSupabaseUrl: React.Dispatch<React.SetStateAction<string>>;

  supabaseKey: string;
  setSupabaseKey: React.Dispatch<React.SetStateAction<string>>;
}

export const AppContext = createContext<AppContextProps>(undefined!);

export interface AppProviderProps {
  children: ReactNode;
}

export const AppProvider = ({ children }: AppProviderProps) => {
  const [supabaseName, setSupabaseName] = useState<string>('');
  const [supabaseUrl, setSupabaseUrl] = useState<string>('');
  const [supabaseKey, setSupabaseKey] = useState<string>('');

  return (
    <AppContext.Provider
      value={{
        supabaseName,
        setSupabaseName,

        supabaseUrl,
        setSupabaseUrl,

        supabaseKey,
        setSupabaseKey,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
