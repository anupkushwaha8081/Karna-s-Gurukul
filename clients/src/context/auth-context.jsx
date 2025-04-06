import { Skeleton } from "@/components/ui/skeleton";
import { initialSignInFormData, initialSignUpFormData } from "../config/config";
import { checkAuthService, loginService, registerService } from "../services/services";
import { createContext, useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";

export const AuthContext = createContext(null);

// Fix: Add this working hook version
export const useAuth = () => useContext(AuthContext);

export default function AuthProvider({ children }) {
  const [signInFormData, setSignInFormData] = useState(initialSignInFormData);
  const [signUpFormData, setSignUpFormData] = useState(initialSignUpFormData);
  const [auth, setAuth] = useState({ authenticate: false, user: null });
  const [loading, setLoading] = useState(true);

  async function handleRegisterUser(event) {
    event.preventDefault();
    try {
      const data = await registerService(signUpFormData);
      if (data.success) {
        toast.success("Registration successful!", { position: "bottom-right" });
      } else {
        toast.error(data.message || "Registration failed!", { position: "bottom-right" });
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong!", {
        position: "bottom-right",
      });
    }
  }

  async function handleLoginUser(event) {
    event.preventDefault();
    try {
      const data = await loginService(signInFormData);
      if (data.success) {
        sessionStorage.setItem("accessToken", JSON.stringify(data.data.accessToken));
        setAuth({ authenticate: true, user: data.data.user });
        toast.success("Login successful!", { position: "bottom-right" });
      } else {
        setAuth({ authenticate: false, user: null });
        toast.error(data.message || "Login failed!", { position: "bottom-right" });
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong!", {
        position: "bottom-right",
      });
    }
  }

  async function checkAuthUser() {
    try {
      const data = await checkAuthService();
      if (data.success) {
        setAuth({ authenticate: true, user: data.data.user });
      } else {
        setAuth({ authenticate: false, user: null });
      }
    } catch (error) {
      setAuth({ authenticate: false, user: null });
    } finally {
      setLoading(false);
    }
  }

  function resetCredentials() {
    setAuth({ authenticate: false, user: null });
    sessionStorage.removeItem("accessToken");
  }

  function logout() {
    resetCredentials();
    toast.info("Logged out successfully", { position: "bottom-right" });
  }

  useEffect(() => {
    checkAuthUser();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        signInFormData,
        setSignInFormData,
        signUpFormData,
        setSignUpFormData,
        handleRegisterUser,
        handleLoginUser,
        auth,
        resetCredentials,
        logout,
      }}
    >
      {loading ? <Skeleton /> : children}
    </AuthContext.Provider>
  );
}
