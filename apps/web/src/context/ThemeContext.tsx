// apps/web/src/context/ThemeContext.tsx

import React, {
    createContext,
    useState,
    useContext,
    useEffect,
    ReactNode,
  } from "react";
  
  // テーマの型
  export type Theme = "light" | "neon";
  
  interface ThemeContextValue {
    theme: Theme;
    setTheme: (t: Theme) => void;
  }
  
  const ThemeContext = createContext<ThemeContextValue>({
    theme: "light",
    setTheme: () => {},
  });
  
  // プロバイダーコンポーネント
  export const ThemeProvider: React.FC<{ children: ReactNode }> = ({
    children,
  }) => {
    const [theme, setTheme] = useState<Theme>("light");
  
    // theme が変わるたび、<html> 要素のクラスを上書き
    useEffect(() => {
      document.documentElement.className = theme;
    }, [theme]);
  
    return (
      <ThemeContext.Provider value={{ theme, setTheme }}>
        {children}
      </ThemeContext.Provider>
    );
  };
  
  // フックで簡単に値を取り出せるように
  export const useTheme = () => useContext(ThemeContext);
  