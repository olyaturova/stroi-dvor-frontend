import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from "./AuthProvider";

export const AppProviders = ({ children }) => (

  <BrowserRouter>
    <AuthProvider>
        {children}
    </AuthProvider>
  </BrowserRouter>
);
