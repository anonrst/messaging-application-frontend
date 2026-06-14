import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router";
import { useState } from "react";
import "@/styles/signup.css"
import { EnvConfig } from "@/util/envConfg";
import { getConsentScreenURL } from "@/service/authServie";

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
        width: size, height: size, borderRadius: "50%",
        background: `linear-gradient(135deg, ${user.color}55, ${user.color}22)`,
        border: `1.5px solid ${user.color}66`,
        display: "flex", alignItems: "center", justifyContent: "center",
        fontFamily: "'Syne', sans-serif", fontWeight: 700,
        fontSize: size * 0.38, color: user.color, flexShrink: 0,
        boxShadow: `0 0 10px ${user.color}33`,
      }}
    >
      {user.avatar}
    </div>
  );
}

const PERKS = [
  { icon: "⚡", label: "Sub-20ms voice latency" },
  { icon: "🖥", label: "4K 60fps screen share" },
  { icon: "🔐", label: "End-to-end encrypted" },
  { icon: "🌐", label: "200+ global edge nodes" },
];

export default function SignUp() {
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm();
  const [serverError, setServerError] = useState("");
  const navigate = useNavigate();

  const handleFormSubmit = async (data: any) => {
    setServerError("");
    const body = { username: data.username, email: data.email, password: data.password, fullname: data.fullname };
    try {
      const resp = await fetch(`${EnvConfig.backend}${EnvConfig.basePath}/auth/sign-up`, {
        body: JSON.stringify(body), method: "POST",
        headers: { "Content-Type": "application/json" },
      });
      const respData = await resp.json();
      if (resp.status === 400) throw new Error(respData.message || "Invalid request format");
      if (resp.status === 401) throw new Error(respData.message || "Invalid credentials");
      if (resp.status === 429) throw new Error(respData.message || "Rate limit reached");
      if (!resp.ok) throw new Error(respData.message || "Signup failed");
      navigate("/sign-in");
    } catch (err: any) {
      setServerError(err.message);
    }
  };

  const handleGoogleSignUp = () => {
    window.location.href = getConsentScreenURL();
  };

  return (
    <>

      <div className="nx-su-root">
        {/* Atmosphere */}
        <div className="nx-orb nx-orb-violet" />
        <div className="nx-orb nx-orb-blue" />
        <div className="nx-orb nx-orb-green" />
        <div className="nx-ring nx-ring-a" />
        <div className="nx-ring nx-ring-b" />
        <svg className="nx-noise">
          <filter id="nn"><feTurbulence type="fractalNoise" baseFrequency="0.65" numOctaves="3" stitchTiles="stitch" /><feColorMatrix type="saturate" values="0" /></filter>
          <rect width="100%" height="100%" filter="url(#nn)" />
        </svg>

        {/* LEFT — branding */}
        <div className="nx-left">
          <div className="nx-logo-row">
            <div className="nx-logo-icon">⬡</div>
            <span className="nx-logo-text">NEXUS</span>
          </div>

          <div className="nx-badge">
            <span className="nx-badge-dot" />
            <span className="nx-badge-text">FREE TO JOIN · NO CARD NEEDED</span>
          </div>

          <h1 className="nx-headline">
            Build your space<br />in the{" "}
            <span className="nx-headline-grad">Nexus.</span>
          </h1>

          <p className="nx-sub">
            One account. Every community, every voice channel, every collaboration — all in one platform built for how you actually work.
          </p>

          <div className="nx-perks">
            {PERKS.map((p, i) => (
              <div key={i} className="nx-perk">
                <span className="nx-perk-icon">{p.icon}</span>
                <span className="nx-perk-label">{p.label}</span>
              </div>
            ))}
          </div>

          <div className="nx-proof">
            <div className="nx-avatar-stack">
              {USERS_PREVIEW.map((u, i) => (
                <div key={i}><Avatar user={u} size={30} /></div>
              ))}
            </div>
            <span className="nx-proof-text">
              <strong>214,000+</strong> teams joined this month
            </span>
          </div>
        </div>

        {/* Divider */}
        <div className="nx-divider" />

        {/* RIGHT — form */}
        <div className="nx-right">
          <div className="nx-card">
            <div className="nx-card-title">Create account</div>
            {serverError && (
              <div className="nx-server-error">
                <span>⚠</span> {serverError}
              </div>
            )}

            <form onSubmit={handleSubmit(handleFormSubmit)} noValidate>
              <div className="nx-form-grid">
                {/* Full Name */}
                <div className="nx-form-group">
                  <label className="nx-label">Full Name</label>
                  <div className="nx-input-wrap">
                    <span className="nx-input-icon">✦</span>
                    <input
                      type="text"
                      className={`nx-input${errors.fullname ? " nx-err" : ""}`}
                      placeholder="Your name"
                      disabled={isSubmitting}
                      {...register("fullname", { required: "Full name is required" })}
                    />
                  </div>
                  {errors.fullname && <span className="nx-error-text">⚠ {errors.fullname.message?.toString()}</span>}
                </div>

                {/* Username */}
                <div className="nx-form-group">
                  <label className="nx-label">Username</label>
                  <div className="nx-input-wrap">
                    <span className="nx-input-icon">#</span>
                    <input
                      type="text"
                      className={`nx-input${errors.username ? " nx-err" : ""}`}
                      placeholder="handle"
                      disabled={isSubmitting}
                      {...register("username", {
                        required: "Username is required",
                        minLength: { value: 3, message: "Min 3 characters" },
                      })}
                    />
                  </div>
                  {errors.username && <span className="nx-error-text">⚠ {errors.username.message?.toString()}</span>}
                </div>

                {/* Email */}
                <div className="nx-form-group full">
                  <label className="nx-label">Email</label>
                  <div className="nx-input-wrap">
                    <span className="nx-input-icon">@</span>
                    <input
                      type="email"
                      className={`nx-input${errors.email ? " nx-err" : ""}`}
                      placeholder="your@email.com"
                      disabled={isSubmitting}
                      {...register("email", {
                        required: "Email is required",
                        pattern: { value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i, message: "Invalid email" },
                      })}
                    />
                  </div>
                  {errors.email && <span className="nx-error-text">⚠ {errors.email.message?.toString()}</span>}
                </div>

                {/* Password */}
                <div className="nx-form-group full">
                  <label className="nx-label">Password</label>
                  <div className="nx-input-wrap">
                    <span className="nx-input-icon">🔒</span>
                    <input
                      type="password"
                      className={`nx-input${errors.password ? " nx-err" : ""}`}
                      placeholder="Min. 6 characters"
                      disabled={isSubmitting}
                      {...register("password", {
                        required: "Password is required",
                        minLength: { value: 6, message: "Minimum 6 characters" },
                      })}
                    />
                  </div>
                  {errors.password && <span className="nx-error-text">⚠ {errors.password.message?.toString()}</span>}
                </div>
              </div>

              <button type="submit" className="nx-submit" disabled={isSubmitting}>
                {isSubmitting && <span className="nx-spinner" />}
                {isSubmitting ? "Creating your space…" : "Create account →"}
              </button>
            </form>

            <div className="nx-or">
              <div className="nx-or-line" />
              <span className="nx-or-text">OR SIGN UP WITH</span>
              <div className="nx-or-line" />
            </div>

            <button className="nx-oauth" onClick={handleGoogleSignUp} type="button">
              <img className="nx-oauth-icon" height={16} width={16}
                src="https://imgs.search.brave.com/7oRMZ5ifuTywDSOtzsemEMjW7jsmHMLZeDMZPLycObU/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly93d3cu/dmVjdG9ybG9nby56/b25lL2xvZ29zL2dv/b2dsZS9nb29nbGUt/dGlsZS5zdmc" alt="Google" />
              Continue with Google
            </button>
            <p className="nx-terms">
              By creating an account you agree to our{" "}
              <a href="#">Terms of Service</a> and <a href="#">Privacy Policy</a>
            </p>

            <p className="nx-footer">
              Already have an account?{" "}
              <Link to="/sign-in">Sign in</Link>
            </p>
          </div>
        </div>
      </div>
    </>
  );
}