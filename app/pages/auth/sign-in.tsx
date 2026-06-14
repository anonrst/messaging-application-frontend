import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router";
import {  useState } from "react";
import "@/styles/signin.css"
import { getConsentScreenURL } from "@/service/authServie";
import { useDispatch, useSelector } from "react-redux";
import type { RootStateType } from "@/util/redux/store";
import type {  User } from "@/types/auth.types";
import { loginSuccess } from "@/util/redux/RSlices";
const backend = import.meta.env.VITE_API_URL;
const basePath = import.meta.env.VITE_BASE_PATH;

const USERS_PREVIEW = [
  { avatar: "K", color: "#7EB8F7" },
  { avatar: "A", color: "#A78BFA" },
  { avatar: "Z", color: "#34D399" },
  { avatar: "N", color: "#F472B6" },
  { avatar: "D", color: "#FBBF24" },
];

function Avatar({ user, size = 32 }: any) {
  return (
    <div
      style={{
        width: size,
        height: size,
        borderRadius: "50%",
        background: `linear-gradient(135deg, ${user.color}55, ${user.color}22)`,
        border: `1.5px solid ${user.color}66`,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontFamily: "'Syne', sans-serif",
        fontWeight: 700,
        fontSize: size * 0.38,
        color: user.color,
        flexShrink: 0,
        boxShadow: `0 0 10px ${user.color}33`,
      }}
    >
      {user.avatar}
    </div>
  );
}

export default function SignIn() {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [serverError, setServerError] = useState("");
  const [isLoading, setLoading] = useState(false);

  const [focusedField, setFocusedField] = useState<String | null>(null);
  const navigate = useNavigate();
  const authSlice = useSelector((state: RootStateType) => state.auth);
const dispatch = useDispatch(); // ← calls the hook inside the component tree

  const handleFormSubmit = async (data: any) => {
    setLoading(true);
    setServerError("");
    const body = { credential: data.credential, password: data.password };
    try {
      const resp = await fetch(`${backend}${basePath}/auth/login`, {
        body: JSON.stringify(body),
        method: "POST",
        headers: { "Content-Type": "application/json" },
      });
      const respData= await resp.json();
      if (resp.status === 400 || resp.status === 401 || !resp.ok) {
        throw new Error(respData.message);
      }
      setLoading(false);
      dispatch(loginSuccess(respData as User))
      navigate("/dashboard");
    } catch (err: any) {
      setLoading(false);
      setServerError(err.message.toString());
    }
  };

  const handleGoogleSignin = () => {
    window.location.href = getConsentScreenURL();
  };

  return (
    <>
      <div className="nexus-signin-root">
        {/* Atmosphere */}
        <div className="orb orb-blue" />
        <div className="orb orb-violet" />
        <div className="orb orb-green" />
        <div className="ring ring-lg" />
        <div className="ring ring-xl" />
        <svg className="noise-svg">
          <filter id="n"><feTurbulence type="fractalNoise" baseFrequency="0.65" numOctaves="3" stitchTiles="stitch" /><feColorMatrix type="saturate" values="0" /></filter>
          <rect width="100%" height="100%" filter="url(#n)" />
        </svg>

        {/* LEFT — branding panel */}
        <div className="left-panel">
          <div className="logo-row">
            <div className="logo-icon">⬡</div>
            <span className="logo-text">NEXUS</span>
          </div>

          <div className="signin-badge">
            <span className="badge-dot" />
            <span className="badge-text">2.1M COMMUNITIES ONLINE</span>
          </div>

          <h1 className="signin-headline">
            Welcome<br />back to your{" "}
            <span className="headline-gradient">universe.</span>
          </h1>

          <p className="signin-sub">
            Real-time voice, HD video, threaded chat and a whole ecosystem — all waiting for you inside.
          </p>

          <div className="social-proof">
            <div className="avatar-stack">
              {USERS_PREVIEW.map((u, i) => (
                <div key={i}>
                  <Avatar user={u} size={30} />
                </div>
              ))}
            </div>
            <span className="social-proof-text">
              <strong>214,000+</strong> teams joined this month
            </span>
          </div>
        </div>

        {/* Divider */}
        <div className="panel-divider" />

        {/* RIGHT — form panel */}
        <div className="right-panel">
          <div className="form-card">
            <div className="form-title">Sign in</div>
            <p className="form-subtitle">Enter your credentials to continue</p>

            {serverError && (
              <div className="server-error">
                <span>⚠</span> {serverError}
              </div>
            )}

            <form onSubmit={handleSubmit(handleFormSubmit)} noValidate>
              <div className="form-group">
                <label className="form-label">Email or Username</label>
                <div className="input-wrap">
                  <span className="input-icon">@</span>
                  <input
                    type="text"
                    className={`nexus-input${errors.credential ? " has-error" : ""}`}
                    placeholder="your@email.com or username"
                    onFocus={() => setFocusedField("credential")}
                    {...register("credential", { required: "Email or username is required" })}
                  />
                </div>
                {errors.credential && (
                  <span className="error-text">⚠ {errors.credential.message?.toString()}</span>
                )}
              </div>

              <div className="form-group">
                <label className="form-label">Password</label>
                <div className="input-wrap">
                  <span className="input-icon">🔒</span>
                  <input
                    type="password"
                    className={`nexus-input${errors.password ? " has-error" : ""}`}
                    placeholder="Enter your password"
                    onFocus={() => setFocusedField("password")}
                    {...register("password", {
                      required: "Password is required",
                      minLength: { value: 6, message: "Minimum 6 characters" },
                    })}
                  />
                </div>
                {errors.password && (
                  <span className="error-text">⚠ {errors.password.message?.toString()}</span>
                )}
              </div>

              <div className="forgot-row">
                <a href="#" className="forgot-link">Forgot password?</a>
              </div>

              <button type="submit" className="submit-btn" disabled={isLoading}>
                {isLoading && <span className="spinner" />}
                {isLoading ? "Signing in…" : "Sign in to Nexus →"}
              </button>
            </form>

            <div className="or-divider">
              <div className="or-line" />
              <span className="or-text">OR CONTINUE WITH</span>
              <div className="or-line" />
            </div>

            <button className="oauth-btn" onClick={handleGoogleSignin} type="button">
              <img
                className="oauth-icon"
                height={18} width={18}
                src="https://imgs.search.brave.com/7oRMZ5ifuTywDSOtzsemEMjW7jsmHMLZeDMZPLycObU/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly93d3cu/dmVjdG9ybG9nby56/b25lL2xvZ29zL2dv/b2dsZS9nb29nbGUt/dGlsZS5zdmc"
                alt="Google"
              />
              Continue with Google
            </button>


            <p className="form-footer">
              Don't have an account?{" "}
              <Link to="/sign-up">Create one</Link>
            </p>
          </div>
        </div>
      </div>
    </>
  );
}