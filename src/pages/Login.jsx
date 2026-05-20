import React, { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate, Link } from "react-router-dom";
import { LogIn, ArrowLeft } from "lucide-react";
import toast from "react-hot-toast";

const Login = () => {
  const { loginWithGoogle } = useAuth();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  const handleGoogleLogin = async () => {
    setIsLoading(true);
    try {
      await loginWithGoogle();
      toast.success("Successfully logged in!");
      navigate("/"); // Go home after login
    } catch (error) {
      console.error(error);
      toast.error("Google login failed or cancelled. Try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleDemoLogin = () => {
    toast.error("Email login is currently disabled. Please use Google Login.");
  };

  return (
    <div
      className="login-page"
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        pointerEvents: "auto",
      }}
    >
      <div
        className="glass-card"
        style={{
          width: "100%",
          maxWidth: "450px",
          padding: "3.5rem 3rem",
          borderRadius: "2rem",
          display: "flex",
          flexDirection: "column",
          gap: "2rem",
        }}
      >
        <Link
          to="/"
          className="cursor-hover"
          style={{
            textDecoration: "none",
            color: "inherit",
            display: "inline-flex",
            alignItems: "center",
            gap: "0.5rem",
            opacity: 0.6,
            fontWeight: 600,
            fontSize: "0.875rem",
            alignSelf: "flex-start",
          }}
        >
          <ArrowLeft size={16} /> Back to Store
        </Link>

        <div style={{ textAlign: "center" }}>
          <h1
            className="font-syne"
            style={{
              fontSize: "2.5rem",
              fontWeight: 800,
              margin: 0,
              marginBottom: "0.5rem",
            }}
          >
            AURA<span style={{ color: "#7a828e" }}>.KICKS</span>
          </h1>
          <p style={{ opacity: 0.7, margin: 0, fontSize: "1rem" }}>
            You must log in to continue.
          </p>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
          <input
            type="email"
            placeholder="Email Address"
            className="cursor-hover"
            style={{
              width: "100%",
              padding: "1rem",
              borderRadius: "1rem",
              border: "1px solid rgba(0,0,0,0.1)",
              background: "rgba(255,255,255,0.5)",
              fontSize: "1rem",
              outline: "none",
            }}
          />
          <input
            type="password"
            placeholder="Password"
            className="cursor-hover"
            style={{
              width: "100%",
              padding: "1rem",
              borderRadius: "1rem",
              border: "1px solid rgba(0,0,0,0.1)",
              background: "rgba(255,255,255,0.5)",
              fontSize: "1rem",
              outline: "none",
            }}
          />
          <button
            className="cursor-hover"
            onClick={handleDemoLogin}
            style={{
              width: "100%",
              padding: "1.25rem",
              borderRadius: "1rem",
              background: "var(--metal-800)",
              color: "white",
              fontWeight: 700,
              border: "none",
              fontSize: "1.125rem",
              transition: "transform 0.2s",
              marginTop: "0.5rem",
            }}
          >
            Sign In
          </button>
        </div>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "1rem",
            opacity: 0.5,
          }}
        >
          <div style={{ flex: 1, height: "1px", background: "black" }} />
          <span style={{ fontSize: "0.875rem", fontWeight: 600 }}>OR</span>
          <div style={{ flex: 1, height: "1px", background: "black" }} />
        </div>

        <button
          className="cursor-hover"
          onClick={handleGoogleLogin}
          disabled={isLoading}
          style={{
            width: "100%",
            padding: "1.25rem",
            borderRadius: "1rem",
            background: "white",
            color: "black",
            fontWeight: 700,
            border: "1px solid rgba(0,0,0,0.1)",
            fontSize: "1.125rem",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "0.75rem",
            transition: "transform 0.2s",
          }}
        >
          {isLoading ? (
            "Connecting..."
          ) : (
            <>
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  fill="#4285F4"
                />
                <path
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  fill="#34A853"
                />
                <path
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                  fill="#FBBC05"
                />
                <path
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                  fill="#EA4335"
                />
              </svg>
              Continue with Google
            </>
          )}
        </button>
      </div>
    </div>
  );
};

export default Login;
