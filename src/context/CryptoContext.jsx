import { createContext, useState, useEffect } from "react";

const CryptoContext = createContext();
export const CryptoProvider = ({ children }) => {
  const [currency, setCurrency] = useState("EUR");
  const [symbol, setSymbol] = useState("€");
  useEffect(() => {
    if (currency === "USD") {
      setSymbol("$");
    } else if (currency === "EUR") {
      setSymbol("€");
    }
  }, [currency]);

  return (
    <CryptoContext.Provider value={{ currency, symbol, setCurrency }}>
      {children}
    </CryptoContext.Provider>
  );
};

export default CryptoContext;
