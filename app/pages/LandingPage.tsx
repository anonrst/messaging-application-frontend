import { useState, useEffect, useRef } from "react";

const USERS = [
  { name: "Kira", color: "#7EB8F7", status: "online", avatar: "K", role: "Designer" },
  { name: "Aryan", color: "#A78BFA", status: "online", avatar: "A", role: "Dev" },
  { name: "Zoe", color: "#34D399", status: "gaming", avatar: "Z", role: "PM" },
  { name: "Niko", color: "#F472B6", status: "online", avatar: "N", role: "Recruiter" },
  { name: "Dev", color: "#FBBF24", status: "idle", avatar: "D", role: "Founder" },
  { name: "Sera", color: "#60A5FA", status: "online", avatar: "S", role: "Engineer" },
];

const MESSAGES = [
  { user: "Kira", text: "Pushed v2.4 — check the new spatial audio 🎙️", time: "2m ago", reactions: ["🔥 12", "🎉 8"] },
  { user: "Aryan", text: "Latency dropped to 18ms globally. Ship it.", time: "1m ago", reactions: ["✅ 6"] },
  { user: "Zoe", text: "Screen share quality is insane now. Going live in #dev-stage", time: "just now", reactions: [] },
];

const FEATURES = [
  {
    icon: "⚡",
    title: "Zero-lag voice",
    desc: "Sub-20ms latency across 200+ edge nodes. Your voice, with no delay, anywhere on Earth.",
    accent: "#7EB8F7",
    glow: "rgba(126,184,247,0.15)",
  },
  {
    icon: "🖥",
    title: "HD Screen Share",
    desc: "4K 60fps capture with adaptive bitrate. Code reviews, design sessions, war rooms — native clarity.",
    accent: "#A78BFA",
    glow: "rgba(167,139,250,0.15)",
  },
  {
    icon: "🧠",
    title: "AI-native threading",
    desc: "Context-aware threads that auto-summarize. Never miss the signal inside the noise.",
    accent: "#34D399",
    glow: "rgba(52,211,153,0.15)",
  },
  {
    icon: "🔐",
    title: "End-to-end encrypted",
    desc: "Military-grade encryption with zero knowledge architecture. What's yours stays yours.",
    accent: "#F472B6",
    glow: "rgba(244,114,182,0.15)",
  },
  {
    icon: "🌐",
    title: "Federated servers",
    desc: "Host your own nodes. Full data sovereignty with the feel of a global platform.",
    accent: "#FBBF24",
    glow: "rgba(251,191,36,0.15)",
  },
  {
    icon: "📡",
    title: "Presence Engine",
    desc: "Rich activity states, location-aware status, cross-device sync. Know your team's real pulse.",
    accent: "#60A5FA",
    glow: "rgba(96,165,250,0.15)",
  },
];

const TESTIMONIALS = [
  { name: "Alex Mercer", role: "CTO @ Vortex Labs", text: "We replaced four tools with Nexus. Our standups are faster, code reviews deeper, and hiring pipeline is tighter than ever.", avatar: "AM", color: "#7EB8F7" },
  { name: "Priya Nair", role: "Lead Designer @ Figma alumni", text: "The spatial audio in voice channels is genuinely surreal. It's the first time an online meeting felt like a real room.", avatar: "PN", color: "#A78BFA" },
  { name: "Jordan Tse", role: "Community Lead @ 500k+ server", text: "Our community went from fragmented to flourishing. Nexus handles 80k concurrent users without a hiccup.", avatar: "JT", color: "#34D399" },
];

const PLANS = [
  { name: "Beacon", price: "Free", desc: "For small teams and early builders", features: ["Up to 50 members", "10 voice channels", "2GB file storage", "Basic presence"] },
  {
    name: "Orbit",
    price: "$12",
    desc: "For scaling communities and studios",
    features: ["Unlimited members", "Unlimited voice", "100GB storage", "HD video calls", "Screen sharing", "Analytics dashboard"],
    highlight: true,
  },
  { name: "Apex", price: "$39", desc: "For enterprises and platform builders", features: ["Everything in Orbit", "Federated servers", "Custom domains", "SSO & SAML", "Dedicated infra", "SLA 99.99%"] },
];

import "../styles/LandingPage.css"
import { Link, useNavigate } from "react-router";
// === MAIN COMPONENT ===
export default function LandingPage() {
  const [scrollY, setScrollY] = useState(0);
  const [activeTab, setActiveTab] = useState(0);
  const heroRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    const onScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const parallax = scrollY * 0.3;

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#0C0D0F",
        color: "#fff",
        fontFamily: "'DM Sans', sans-serif",
        overflowX: "hidden",
        position: "relative",
      }}
    >

      <Noise />

      {/* NAV */}
      <nav
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          zIndex: 100,
          padding: "0 60px",
          height: 64,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          background: scrollY > 40 ? "rgba(12,13,15,0.85)" : "transparent",
          backdropFilter: scrollY > 40 ? "blur(20px)" : "none",
          borderBottom: scrollY > 40 ? "1px solid rgba(255,255,255,0.05)" : "none",
          transition: "all 0.4s ease",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <div
            style={{
              width: 32,
              height: 32,
              borderRadius: 10,
              background: "linear-gradient(135deg, #7EB8F7, #5B9CF6)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 16,
            }}
          >
            ⬡
          </div>
          <span style={{ fontFamily: "'Syne', sans-serif", fontWeight: 800, fontSize: 18,}}>NEXUS</span>
        </div>

        <div style={{ display: "flex", gap: 36 }}>
          {["Platform", "Communities", "Developers", "Enterprise"].map((l) => (
            <a key={l} href="#" className="nav-link">{l}</a>
          ))}
        </div>

        <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
          <Link to="sign-in" className="nav-link">Sign in</Link>
          <button className="btn-primary" onClick={() => navigate("sign-up")} style={{ padding: "9px 20px", fontSize: 13, borderRadius: 10 }}>
            Get started
          </button>
        </div>
      </nav>

      {/* === HERO === */}
      <section
        ref={heroRef}
        style={{
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          position: "relative",
          overflow: "hidden",
          paddingTop: 120,
          paddingBottom: 80,
        }}
      >
        {/* Background orbs */}
        <FloatingOrb x="5%" y="10%" size={600} color="radial-gradient(circle, #7EB8F755, transparent)" blur={120} />
        <FloatingOrb x="55%" y="30%" size={500} color="radial-gradient(circle, #A78BFA55, transparent)" blur={130} />
        <FloatingOrb x="30%" y="60%" size={400} color="radial-gradient(circle, #34D39944, transparent)" blur={110} />

        {/* 3D ring decoration */}
        <div
          style={{
            position: "absolute",
            width: 700,
            height: 700,
            borderRadius: "50%",
            border: "1px solid rgba(126,184,247,0.07)",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            animation: "rotateSlow 40s linear infinite",
          }}
        />
        <div
          style={{
            position: "absolute",
            width: 900,
            height: 900,
            borderRadius: "50%",
            border: "1px solid rgba(167,139,250,0.04)",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            animation: "rotateSlow 60s linear infinite reverse",
          }}
        />

        {/* Content */}
        <div style={{ textAlign: "center", maxWidth: 820, zIndex: 2, padding: "0 40px", position: "relative" }}>
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 8,
              background: "rgba(126,184,247,0.08)",
              border: "1px solid rgba(126,184,247,0.2)",
              borderRadius: 100,
              padding: "7px 16px",
              marginBottom: 32,
              animation: "fadeUp 0.8s ease forwards",
            }}
          >
            <span style={{ width: 6, height: 6, borderRadius: "50%", background: "#34D399", boxShadow: "0 0 6px #34D399", display: "inline-block", animation: "pulse 2s infinite" }} />
            <span style={{ fontFamily: "'Syne', sans-serif", fontSize: 12, color: "#7EB8F7", letterSpacing: "0.08em" }}>NOW IN PUBLIC BETA · 2.1M COMMUNITIES</span>
          </div>

          <h1
            style={{
              fontFamily: "'Syne', sans-serif",
              fontWeight: 800,
              fontSize: "clamp(48px, 6.5vw, 88px)",
              lineHeight: 1.05,
              letterSpacing: "-0.03em",
              marginBottom: 28,
              animation: "fadeUp 0.9s 0.1s ease both",
            }}
          >
            Where teams{" "}
            <span
              style={{
                background: "linear-gradient(90deg, #7EB8F7, #A78BFA, #7EB8F7)",
                backgroundSize: "200% auto",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                animation: "shimmer 3s linear infinite",
              }}
            >
              converge.
            </span>
            <br />
            Communities thrive.
          </h1>

          <p
            style={{
              fontSize: 18,
              color: "rgba(255,255,255,0.45)",
              lineHeight: 1.7,
              maxWidth: 560,
              margin: "0 auto 44px",
              fontWeight: 300,
              animation: "fadeUp 1s 0.2s ease both",
            }}
          >
            Nexus unifies real-time chat, spatial voice, HD video, and async collaboration into one seamless platform. Built for builders, gamers, and communities who demand more.
          </p>

          <div style={{ display: "flex", gap: 14, justifyContent: "center", animation: "fadeUp 1.1s 0.3s ease both" }}>
            <button className="btn-primary" style={{ fontSize: 16, padding: "16px 40px" }}>
              Launch your space →
            </button>
            <button className="btn-ghost" style={{ fontSize: 16, padding: "16px 40px" }}>
              Watch demo
            </button>
          </div>

          <div style={{ display: "flex", justifyContent: "center", alignItems: "center", gap: 16, marginTop: 40, animation: "fadeUp 1.2s 0.4s ease both" }}>
            <div style={{ display: "flex" }}>
              {USERS.map((u, i) => (
                <div key={i} style={{ marginLeft: i > 0 ? -10 : 0, border: "2px solid #0C0D0F", borderRadius: "50%" }}>
                  <Avatar user={u} size={32} />
                </div>
              ))}
            </div>
            <span style={{ fontSize: 13, color: "rgba(255,255,255,0.35)" }}>
              Joined by <strong style={{ color: "rgba(255,255,255,0.7)" }}>214,000+</strong> teams this month
            </span>
          </div>
        </div>

        {/* Floating UI Mocks */}
        <div style={{ position: "absolute", right: "4%", top: "50%", transform: `translateY(-50%) translateY(-${parallax * 0.3}px)`, zIndex: 3, width: 340 }}>
          <HeroMockVideoCall />
        </div>
        <div style={{ position: "absolute", left: "2%", top: "50%", transform: `translateY(-50%) translateY(${parallax * 0.2}px)`, zIndex: 3 }}>
          <HeroMockSidebar />
          <HeroMockChat />
        </div>

        {/* Notification badge floating */}
        <div
          style={{
            position: "absolute",
            right: "22%",
            top: "22%",
            zIndex: 5,
            animation: "floatA 5s ease-in-out infinite",
          }}
        >
          <GlassCard style={{ padding: "10px 16px", display: "flex", alignItems: "center", gap: 10 }}>
            <Avatar user={USERS[3]} size={28} />
            <div>
              <div style={{ fontSize: 11, fontFamily: "'Syne', sans-serif", color: "rgba(255,255,255,0.8)" }}>Niko joined Nexus HQ</div>
              <div style={{ fontSize: 10, color: "rgba(255,255,255,0.3)" }}>just now</div>
            </div>
            <div style={{ position: "relative" }}>
              <div style={{ width: 8, height: 8, borderRadius: "50%", background: "#7EB8F7" }} />
              <div style={{ position: "absolute", inset: 0, borderRadius: "50%", background: "#7EB8F7", animation: "ping 1.5s infinite" }} />
            </div>
          </GlassCard>
        </div>
      </section>

      {/* === TRUSTED BY === */}
      <section style={{ padding: "60px 0", borderTop: "1px solid rgba(255,255,255,0.04)", borderBottom: "1px solid rgba(255,255,255,0.04)", overflow: "hidden" }}>
        <div style={{ textAlign: "center", marginBottom: 36 }}>
          <p style={{ fontSize: 12, color: "rgba(255,255,255,0.3)", letterSpacing: "0.12em", fontFamily: "'Syne', sans-serif" }}>TRUSTED BY TEAMS AT</p>
        </div>
        <div style={{ display: "flex", justifyContent: "center", gap: 64, flexWrap: "wrap", padding: "0 80px" }}>
          {["Vercel", "Linear", "Figma", "Supabase", "Raycast", "Loom", "Notion", "Clerk"].map((c) => (
            <span key={c} style={{ fontFamily: "'Syne', sans-serif", fontWeight: 700, fontSize: 17, color: "rgba(255,255,255,0.14)", letterSpacing: "0.04em", transition: "color 0.3s" }}>
              {c}
            </span>
          ))}
        </div>
      </section>

      {/* === FEATURES === */}
      <section style={{ padding: "120px 80px", position: "relative" }}>
        <FloatingOrb x="-5%" y="20%" size={400} color="radial-gradient(circle, #7EB8F733, transparent)" blur={100} />

        <div style={{ maxWidth: 1280, margin: "0 auto" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: 72 }}>
            <div>
              <p style={{ fontFamily: "'Syne', sans-serif", fontSize: 12, color: "#7EB8F7", letterSpacing: "0.12em", marginBottom: 16 }}>PLATFORM CAPABILITIES</p>
              <h2 style={{ fontFamily: "'Syne', sans-serif", fontWeight: 800, fontSize: "clamp(32px, 2vw, 54px)", lineHeight: 1.4, maxWidth: 480 }}>
                Built for the way <br />real work happens.
              </h2>
            </div>
            <p style={{ maxWidth: 320, color: "rgba(255,255,255,0.4)", fontSize: 15, lineHeight: 1.7, textAlign: "right" }}>
              Six foundational pillars engineered for speed, security, and scale — without sacrificing the experience.
            </p>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 20 }}>
            {FEATURES.map((f, i) => (
              <GlassCard
                key={i}
                className="feature-card"
                style={{
                  padding: 32,
                  transition: "all 0.4s ease",
                  cursor: "default",
                  background: `linear-gradient(135deg, ${f.glow}, rgba(255,255,255,0.02))`,
                  position: "relative",
                  overflow: "hidden",
                }}
              >
                <div
                  style={{
                    position: "absolute",
                    top: 0,
                    right: 0,
                    width: 120,
                    height: 120,
                    borderRadius: "50%",
                    background: `radial-gradient(circle, ${f.accent}18, transparent)`,
                    transform: "translate(30%, -30%)",
                  }}
                />
                <div style={{ fontSize: 28, marginBottom: 20 }}>{f.icon}</div>
                <h3 style={{ fontFamily: "'Syne', sans-serif", fontWeight: 700, fontSize: 18, marginBottom: 12, color: f.accent }}>
                  {f.title}
                </h3>
                <p style={{ color: "rgba(255,255,255,0.45)", fontSize: 14, lineHeight: 1.7 }}>{f.desc}</p>
                <div style={{ marginTop: 24, display: "flex", alignItems: "center", gap: 6, color: f.accent, fontSize: 13, fontFamily: "'Syne', sans-serif" }}>
                  Learn more <span>→</span>
                </div>
              </GlassCard>
            ))}
          </div>
        </div>
      </section>

      {/* === LIVE COLLABORATION === */}
      <section style={{ padding: "100px 80px", position: "relative", background: "linear-gradient(180deg, transparent, rgba(126,184,247,0.02), transparent)" }}>
        <div style={{ maxWidth: 1280, margin: "0 auto", display: "grid", gridTemplateColumns: "1fr 1fr", gap: 80, alignItems: "center" }}>
          <div>
            <p style={{ fontFamily: "'Syne', sans-serif", fontSize: 12, color: "#A78BFA", letterSpacing: "0.12em", marginBottom: 16 }}>REAL-TIME COLLABORATION</p>
            <h2 style={{ fontFamily: "'Syne', sans-serif", fontWeight: 800, fontSize: "clamp(30px, 3vw, 48px)", lineHeight: 1.15, letterSpacing: "-0.02em", marginBottom: 24 }}>
              Your whole team.<br />One shared context.
            </h2>
            <p style={{ color: "rgba(255,255,255,0.45)", fontSize: 15, lineHeight: 1.8, marginBottom: 36 }}>
              Presence-aware threads sync across voice, chat, and code. Everyone knows what's happening, what needs attention, and who's on it.
            </p>
            <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
              {["Synchronized read receipts across all channels", "Activity presence with context — not just idle/active", "Threaded async with voice note replies", "Smart notifications that surface what matters"].map((item, i) => (
                <div key={i} style={{ display: "flex", alignItems: "flex-start", gap: 12 }}>
                  <div style={{ width: 20, height: 20, borderRadius: 6, background: "rgba(167,139,250,0.15)", border: "1px solid rgba(167,139,250,0.3)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 11, flexShrink: 0, marginTop: 1 }}>
                    ✓
                  </div>
                  <span style={{ color: "rgba(255,255,255,0.6)", fontSize: 14 }}>{item}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Collaboration mock */}
          <div style={{ position: "relative", height: 480 }}>
            <GlassCard style={{ position: "absolute", inset: 0, padding: 24 }}>
              <div style={{ display: "flex", gap: 8, marginBottom: 20 }}>
                {["Team Feed", "Activity", "Threads"].map((t, i) => (
                  <button
                    key={t}
                    onClick={() => setActiveTab(i)}
                    style={{
                      padding: "7px 16px",
                      borderRadius: 10,
                      border: "none",
                      background: activeTab === i ? "rgba(167,139,250,0.15)" : "transparent",
                      color: activeTab === i ? "#A78BFA" : "rgba(255,255,255,0.35)",
                      fontFamily: "'Syne', sans-serif",
                      fontSize: 12,
                      cursor: "pointer",
                      transition: "all 0.2s",
                    }}
                  >
                    {t}
                  </button>
                ))}
              </div>

              {USERS.map((u, i) => (
                <div key={i} style={{ display: "flex", alignItems: "center", gap: 12, padding: "12px 0", borderBottom: "1px solid rgba(255,255,255,0.04)" }}>
                  <Avatar user={u} size={36} />
                  <div style={{ flex: 1 }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                      <span style={{ fontFamily: "'Syne', sans-serif", fontWeight: 700, fontSize: 13, color: u.color }}>{u.name}</span>
                      <StatusDot status={u.status} />
                      <span style={{ fontSize: 11, color: "rgba(255,255,255,0.25)" }}>{u.role}</span>
                    </div>
                    <div style={{ fontSize: 12, color: "rgba(255,255,255,0.35)", marginTop: 2 }}>
                      {u.status === "gaming" ? "Playing: Nexus Arena" : u.status === "idle" ? "Away since 14m" : "Active in #dev-stage"}
                    </div>
                  </div>
                  <div
                    style={{
                      fontSize: 11,
                      fontFamily: "'Syne', sans-serif",
                      color: "rgba(255,255,255,0.25)",
                      background: "rgba(255,255,255,0.04)",
                      borderRadius: 6,
                      padding: "3px 8px",
                    }}
                  >
                    {["typing...", "reviewing PR", "in call", "online", "reviewing", "coding"][i]}
                  </div>
                </div>
              ))}
            </GlassCard>

            {/* Floating notification */}
            <GlassCard
              style={{
                position: "absolute",
                bottom: -20,
                right: -30,
                padding: "12px 16px",
                display: "flex",
                alignItems: "center",
                gap: 10,
                animation: "floatB 5s ease-in-out infinite",
              }}
            >
              <span style={{ fontSize: 20 }}>🎯</span>
              <div>
                <div style={{ fontSize: 12, fontFamily: "'Syne', sans-serif", color: "rgba(255,255,255,0.8)", marginBottom: 2 }}>Sprint velocity up 34%</div>
                <div style={{ fontSize: 11, color: "rgba(255,255,255,0.3)" }}>AI summary · 5min ago</div>
              </div>
            </GlassCard>
          </div>
        </div>
      </section>

      {/* === SERVER / COMMUNITY === */}
      <section style={{ padding: "100px 80px", position: "relative" }}>
        <FloatingOrb x="60%" y="10%" size={500} color="radial-gradient(circle, #34D39933, transparent)" blur={120} />

        <div style={{ maxWidth: 1280, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: 72 }}>
            <p style={{ fontFamily: "'Syne', sans-serif", fontSize: 12, color: "#34D399", letterSpacing: "0.12em", marginBottom: 16 }}>SERVER ECOSYSTEM</p>
            <h2 style={{ fontFamily: "'Syne', sans-serif", fontWeight: 700, fontSize: "clamp(32px, 3vw, 54px)", lineHeight: 1.4 }}>
              Your universe of communities.
            </h2>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 16 }}>
            {[
              { name: "GameDevs United", members: "84k", tag: "Game Dev", color: "#A78BFA", channels: ["#general", "#assets", "#showcase"], icon: "🎮" },
              { name: "Open Source Hub", members: "210k", tag: "OSS", color: "#7EB8F7", channels: ["#contributions", "#issues", "#releases"], icon: "🌐" },
              { name: "Design Systems", members: "42k", tag: "Design", color: "#F472B6", channels: ["#tokens", "#components", "#feedback"], icon: "🎨" },
              { name: "Hiring Network", members: "130k", tag: "Careers", color: "#FBBF24", channels: ["#jobs", "#portfolio", "#referrals"], icon: "💼" },
            ].map((s, i) => (
              <GlassCard key={i} className="feature-card" style={{ padding: 24, transition: "all 0.3s ease", cursor: "pointer" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 20 }}>
                  <div style={{ fontSize: 32 }}>{s.icon}</div>
                  <span
                    style={{
                      fontSize: 10,
                      fontFamily: "'Syne', sans-serif",
                      color: s.color,
                      background: `${s.color}18`,
                      border: `1px solid ${s.color}33`,
                      padding: "3px 10px",
                      borderRadius: 100,
                      letterSpacing: "0.08em",
                    }}
                  >
                    {s.tag}
                  </span>
                </div>
                <h3 style={{ fontFamily: "'Syne', sans-serif", fontWeight: 700, fontSize: 15, marginBottom: 6, color: "rgba(255,255,255,0.9)" }}>{s.name}</h3>
                <p style={{ fontSize: 12, color: "rgba(255,255,255,0.3)", marginBottom: 20 }}>{s.members} members</p>
                <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                  {s.channels.map((c) => (
                    <div key={c} style={{ fontSize: 12, color: "rgba(255,255,255,0.4)", fontFamily: "'Syne', sans-serif" }}>{c}</div>
                  ))}
                </div>
                <button
                  style={{
                    marginTop: 20,
                    width: "100%",
                    padding: "9px",
                    borderRadius: 10,
                    background: `${s.color}15`,
                    border: `1px solid ${s.color}33`,
                    color: s.color,
                    fontFamily: "'Syne', sans-serif",
                    fontSize: 12,
                    cursor: "pointer",
                    transition: "all 0.2s",
                    fontWeight: 600,
                  }}
                >
                  Join →
                </button>
              </GlassCard>
            ))}
          </div>
        </div>
      </section>

      {/* === VIDEO / SCREENSHARE === */}
      <section style={{ padding: "100px 80px", position: "relative" }}>
        <div style={{ maxWidth: 1280, margin: "0 auto", display: "grid", gridTemplateColumns: "1fr 1fr", gap: 80, alignItems: "center" }}>
          {/* Mock video UI */}
          <div style={{ position: "relative", height: 460 }}>
            <GlassCard style={{ position: "absolute", inset: 0, padding: 20 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 16 }}>
                <div style={{ width: 8, height: 8, borderRadius: "50%", background: "#F87171", boxShadow: "0 0 6px #F87171", animation: "pulse 1.5s infinite" }} />
                <span style={{ fontFamily: "'Syne', sans-serif", fontSize: 11, color: "rgba(255,255,255,0.4)", letterSpacing: "0.1em" }}>SCREEN SHARE · 4K · 60FPS</span>
                <span style={{ marginLeft: "auto", fontSize: 11, color: "#34D399", fontFamily: "'Syne', sans-serif" }}>● LIVE</span>
              </div>

              {/* Fake screen content */}
              <div
                style={{
                  flex: 1,
                  borderRadius: 12,
                  background: "linear-gradient(135deg, #0D1117, #161B22)",
                  border: "1px solid rgba(255,255,255,0.08)",
                  padding: 16,
                  marginBottom: 16,
                  height: 280,
                  position: "relative",
                  overflow: "hidden",
                  fontFamily: "monospace",
                }}
              >
                <div style={{ fontSize: 10, color: "#7EB8F7", marginBottom: 4 }}>// nexus-sdk/src/voice.ts</div>
                {["const connect = async (channelId: string) => {", "  const stream = await AudioContext.capture();", "  await socket.emit('join', { channelId, stream });", "  setPresence({ state: 'voice', channel: channelId });", "  return { latency: await measureRTT() }", "};"].map((line, i) => (
                  <div key={i} style={{ fontSize: 11, color: i === 2 ? "#A78BFA" : "rgba(255,255,255,0.45)", marginBottom: 3, paddingLeft: i > 0 && i < 5 ? 16 : 0 }}>
                    {line}
                  </div>
                ))}
                {/* Cursor blink */}
                <div style={{ display: "inline-block", width: 2, height: 14, background: "#7EB8F7", animation: "pulse 1s infinite", marginLeft: 8, verticalAlign: "middle" }} />

                {/* Overlay avatars */}
                <div style={{ position: "absolute", bottom: 10, right: 10, display: "flex", gap: 6 }}>
                  {USERS.slice(0, 3).map((u, i) => (
                    <div key={i} style={{ border: `2px solid ${u.color}` , borderRadius: "50%" }}>
                      <Avatar user={u} size={24} />
                    </div>
                  ))}
                </div>
              </div>

              {/* Controls row */}
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                <div style={{ display: "flex", gap: 10 }}>
                  {["🎤", "📷", "🖥", "⚙️"].map((ic, i) => (
                    <button
                      key={i}
                      style={{
                        width: 38,
                        height: 38,
                        borderRadius: "50%",
                        background: "rgba(255,255,255,0.06)",
                        border: "1px solid rgba(255,255,255,0.1)",
                        cursor: "pointer",
                        fontSize: 15,
                        transition: "all 0.2s",
                      }}
                    >
                      {ic}
                    </button>
                  ))}
                </div>
                <button style={{ padding: "8px 20px", borderRadius: 10, background: "#F87171", border: "none", color: "#fff", fontFamily: "'Syne', sans-serif", fontSize: 12, cursor: "pointer", fontWeight: 600 }}>
                  End session
                </button>
              </div>
            </GlassCard>
          </div>

          <div>
            <p style={{ fontFamily: "'Syne', sans-serif", fontSize: 12, color: "#F472B6", letterSpacing: "0.12em", marginBottom: 16 }}>HD VIDEO & SCREEN SHARE</p>
            <h2 style={{ fontFamily: "'Syne', sans-serif", fontWeight: 800, fontSize: "clamp(30px, 3vw, 48px)", lineHeight: 1.15, letterSpacing: "-0.02em", marginBottom: 24 }}>
              See it exactly<br />as they see it.
            </h2>
            <p style={{ color: "rgba(255,255,255,0.45)", fontSize: 15, lineHeight: 1.8, marginBottom: 36 }}>
              Crystal-clear 4K screen sharing with adaptive compression and under-20ms latency. Code reviews, design crits, and interviews — finally feel like the same room.
            </p>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
              {[["4K Resolution", "#F472B6"], ["60fps capture", "#7EB8F7"], ["Dual stream", "#A78BFA"], ["Noise cancel", "#34D399"]].map(([label, color]) => (
                <div key={label} style={{ padding: "14px 18px", borderRadius: 12, background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.07)", display: "flex", alignItems: "center", gap: 10 }}>
                  <div style={{ width: 8, height: 8, borderRadius: "50%", background: color, boxShadow: `0 0 6px ${color}` }} />
                  <span style={{ fontFamily: "'Syne', sans-serif", fontSize: 13, color: "rgba(255,255,255,0.7)" }}>{label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* === RECRUITER NETWORKING === */}
      <section style={{ padding: "100px 80px", position: "relative" }}>
        <FloatingOrb x="50%" y="50%" size={600} color="radial-gradient(circle, #FBBF2422, transparent)" blur={140} />

        <div style={{ maxWidth: 1280, margin: "0 auto", display: "grid", gridTemplateColumns: "1fr 1fr", gap: 80, alignItems: "center" }}>
          <div>
            <p style={{ fontFamily: "'Syne', sans-serif", fontSize: 12, color: "#FBBF24", letterSpacing: "0.12em", marginBottom: 16 }}>RECRUITER NETWORK</p>
            <h2 style={{ fontFamily: "'Syne', sans-serif", fontWeight: 800, fontSize: "clamp(30px, 3vw, 48px)", lineHeight: 1.15, letterSpacing: "-0.02em", marginBottom: 24 }}>
              Hire where talent<br />already lives.
            </h2>
            <p style={{ color: "rgba(255,255,255,0.45)", fontSize: 15, lineHeight: 1.8, marginBottom: 36 }}>
              Reach developers, designers, and founders in their native environment. Post opportunities in community servers, run live Q&As, and make offers without leaving the platform.
            </p>
            <div style={{ display: "flex", gap: 14 }}>
              <button className="btn-primary" style={{ padding: "13px 28px", fontSize: 14 }}>Recruiter access</button>
              <button className="btn-ghost" style={{ padding: "13px 28px", fontSize: 14 }}>View talent pools</button>
            </div>
          </div>

          {/* Recruiter card UI */}
          <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
            {[
              { name: "Sera Malik", role: "Senior Engineer", tags: ["React", "Rust", "TypeScript"], color: "#60A5FA", open: true },
              { name: "Kira Tanaka", role: "Product Designer", tags: ["Figma", "Motion", "Systems"], color: "#7EB8F7", open: true },
              { name: "Aryan Shah", role: "ML Engineer", tags: ["PyTorch", "LLMs", "Infra"], color: "#A78BFA", open: false },
            ].map((p, i) => (
              <GlassCard key={i} style={{ padding: "18px 22px", display: "flex", alignItems: "center", gap: 16 }}>
                <Avatar user={{ ...USERS[i + 3], color: p.color }} size={44} />
                <div style={{ flex: 1 }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 4 }}>
                    <span style={{ fontFamily: "'Syne', sans-serif", fontWeight: 700, fontSize: 14, color: "rgba(255,255,255,0.9)" }}>{p.name}</span>
                    {p.open && (
                      <span style={{ fontSize: 10, fontFamily: "'Syne', sans-serif", color: "#34D399", background: "rgba(52,211,153,0.1)", border: "1px solid rgba(52,211,153,0.2)", borderRadius: 100, padding: "2px 8px" }}>
                        OPEN
                      </span>
                    )}
                  </div>
                  <div style={{ fontSize: 12, color: "rgba(255,255,255,0.4)", marginBottom: 10 }}>{p.role}</div>
                  <div style={{ display: "flex", gap: 6 }}>
                    {p.tags.map((t) => (
                      <span key={t} style={{ fontSize: 10, fontFamily: "'Syne', sans-serif", color: p.color, background: `${p.color}12`, border: `1px solid ${p.color}25`, borderRadius: 6, padding: "2px 8px" }}>
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
                <button
                  style={{
                    padding: "8px 16px",
                    borderRadius: 10,
                    background: "rgba(255,255,255,0.06)",
                    border: "1px solid rgba(255,255,255,0.1)",
                    color: "rgba(255,255,255,0.6)",
                    fontFamily: "'Syne', sans-serif",
                    fontSize: 12,
                    cursor: "pointer",
                    transition: "all 0.2s",
                  }}
                >
                  Connect
                </button>
              </GlassCard>
            ))}
          </div>
        </div>
      </section>

      {/* === TESTIMONIALS === */}
      <section style={{ padding: "100px 80px", borderTop: "1px solid rgba(255,255,255,0.04)" }}>
        <div style={{ maxWidth: 1280, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: 72 }}>
            <p style={{ fontFamily: "'Syne', sans-serif", fontSize: 12, color: "#A78BFA", letterSpacing: "0.12em", marginBottom: 16 }}>TESTIMONIALS</p>
            <h2 style={{ fontFamily: "'Syne', sans-serif", fontWeight: 750, fontSize: "clamp(32px, 2vw, 52px)", lineHeight: 1.4,}}>
              Heard from the front lines.
            </h2>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 24 }}>
            {TESTIMONIALS.map((t, i) => (
              <GlassCard key={i} style={{ padding: 32 }}>
                <div style={{ fontSize: 32, color: t.color, marginBottom: 20, opacity: 0.4 }}>"</div>
                <p style={{ color: "rgba(255,255,255,0.6)", fontSize: 15, lineHeight: 1.8, marginBottom: 28 }}>{t.text}</p>
                <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                  <Avatar user={{ avatar: t.avatar, color: t.color }} size={40} />
                  <div>
                    <div style={{ fontFamily: "'Syne', sans-serif", fontWeight: 700, fontSize: 13, color: "rgba(255,255,255,0.9)" }}>{t.name}</div>
                    <div style={{ fontSize: 12, color: "rgba(255,255,255,0.35)" }}>{t.role}</div>
                  </div>
                </div>
              </GlassCard>
            ))}
          </div>
        </div>
      </section>

      {/* === PRICING === */}
      <section style={{ padding: "100px 80px", position: "relative" }}>
        <FloatingOrb x="20%" y="50%" size={400} color="radial-gradient(circle, #7EB8F733, transparent)" blur={100} />
        <FloatingOrb x="70%" y="30%" size={400} color="radial-gradient(circle, #A78BFA33, transparent)" blur={100} />

        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: 72 }}>
            <p style={{ fontFamily: "'Syne', sans-serif", fontSize: 12, color: "#7EB8F7", letterSpacing: "0.12em", marginBottom: 16 }}>PRICING</p>
            <h2 style={{ fontFamily: "'Syne', sans-serif", fontWeight: 800, fontSize: "clamp(32px, 3vw, 52px)", lineHeight: 1.4,}}>
              Start free. Scale forever.
            </h2>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 20, alignItems: "stretch" }}>
            {PLANS.map((plan, i) => (
              <GlassCard
                key={i}
                className="pricing-card"
                style={{
                  padding: 36,
                  transition: "all 0.4s ease",
                  position: "relative",
                  overflow: "hidden",
                  border: plan.highlight ? "1px solid rgba(126,184,247,0.3)" : "1px solid rgba(255,255,255,0.07)",
                  background: plan.highlight ? "linear-gradient(135deg, rgba(126,184,247,0.08), rgba(167,139,250,0.05))" : "rgba(255,255,255,0.03)",
                }}
              >
                {plan.highlight && (
                  <div
                    style={{
                      position: "absolute",
                      top: 0,
                      left: "50%",
                      transform: "translateX(-50%)",
                      background: "linear-gradient(90deg, #7EB8F7, #A78BFA)",
                      color: "#0C0D0F",
                      fontFamily: "'Syne', sans-serif",
                      fontSize: 10,
                      fontWeight: 700,
                      padding: "4px 20px",
                      borderRadius: "0 0 10px 10px",
                      letterSpacing: "0.08em",
                    }}
                  >
                    MOST POPULAR
                  </div>
                )}
                <div style={{ marginTop: plan.highlight ? 20 : 0, marginBottom: 8 }}>
                  <span style={{ fontFamily: "'Syne', sans-serif", fontWeight: 800, fontSize: 14, color: plan.highlight ? "#7EB8F7" : "rgba(255,255,255,0.7)", letterSpacing: "0.06em" }}>
                    {plan.name}
                  </span>
                </div>
                <div style={{ fontFamily: "'Syne', sans-serif", fontWeight: 800, fontSize: 44, letterSpacing: "-0.03em", marginBottom: 6 }}>
                  {plan.price}
                  {plan.price !== "Free" && <span style={{ fontSize: 16, fontWeight: 400, color: "rgba(255,255,255,0.4)" }}>/mo</span>}
                </div>
                <p style={{ color: "rgba(255,255,255,0.35)", fontSize: 13, marginBottom: 28 }}>{plan.desc}</p>
                <div style={{ display: "flex", flexDirection: "column", gap: 12, marginBottom: 32 }}>
                  {plan.features.map((f) => (
                    <div key={f} style={{ display: "flex", alignItems: "center", gap: 10 }}>
                      <div style={{ width: 16, height: 16, borderRadius: 5, background: plan.highlight ? "rgba(126,184,247,0.15)" : "rgba(255,255,255,0.06)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 9, flexShrink: 0, color: plan.highlight ? "#7EB8F7" : "rgba(255,255,255,0.4)" }}>
                        ✓
                      </div>
                      <span style={{ fontSize: 13, color: "rgba(255,255,255,0.55)" }}>{f}</span>
                    </div>
                  ))}
                </div>
                <button
                  className={plan.highlight ? "btn-primary" : "btn-ghost"}
                  style={{ width: "100%", fontSize: 14, padding: "13px" }}
                >
                  {plan.price === "Free" ? "Get started free" : "Start with " + plan.name}
                </button>
              </GlassCard>
            ))}
          </div>
        </div>
      </section>

      {/* === FINAL CTA === */}
      <section
        style={{
          padding: "120px 80px",
          textAlign: "center",
          position: "relative",
          overflow: "hidden",
          borderTop: "1px solid rgba(255,255,255,0.04)",
        }}
      >
        <FloatingOrb x="20%" y="20%" size={500} color="radial-gradient(circle, #7EB8F744, transparent)" blur={130} />
        <FloatingOrb x="60%" y="40%" size={500} color="radial-gradient(circle, #A78BFA44, transparent)" blur={130} />

        {/* Decorative ring */}
        <div
          style={{
            position: "absolute",
            width: 600,
            height: 600,
            borderRadius: "50%",
            border: "1px solid rgba(126,184,247,0.06)",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
          }}
        />

        <div style={{ position: "relative", zIndex: 2 }}>
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 8,
              background: "rgba(52,211,153,0.08)",
              border: "1px solid rgba(52,211,153,0.2)",
              borderRadius: 100,
              padding: "7px 16px",
              marginBottom: 32,
            }}
          >
            <span style={{ width: 6, height: 6, borderRadius: "50%", background: "#34D399", display: "inline-block", animation: "pulse 2s infinite" }} />
            <span style={{ fontFamily: "'Syne', sans-serif", fontSize: 12, color: "#34D399", letterSpacing: "0.08em" }}>2,847 TEAMS JOINED THIS WEEK</span>
          </div>

          <h2 style={{ fontFamily: "'Syne', sans-serif", fontWeight: 800, fontSize: "clamp(36px, 3vw, 72px)", lineHeight: 1.05, letterSpacing: "-0.03em", marginBottom: 28, maxWidth: 700, margin: "0 auto 28px" }}>
            The future of{" "}
            <span style={{ background: "linear-gradient(90deg, #7EB8F7, #A78BFA)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
              communication
            </span>{" "}
            is here.
          </h2>

          <p style={{ color: "rgba(255,255,255,0.4)", fontSize: 17, lineHeight: 1.7, maxWidth: 480, margin: "0 auto 48px", fontWeight: 300 }}>
            Join the communities and teams already using Nexus to build faster, ship smarter, and connect deeper.
          </p>

          <div style={{ display: "flex", gap: 16, justifyContent: "center" }}>
            <button className="btn-primary" style={{ fontSize: 16, padding: "18px 48px", borderRadius: 16 }}>
              Start for free →
            </button>
            <button className="btn-ghost" style={{ fontSize: 16, padding: "18px 48px", borderRadius: 16 }}>
              Contact sales
            </button>
          </div>
        </div>
      </section>

      {/* === FOOTER === */}
      <footer style={{ padding: "60px 80px 40px", borderTop: "1px solid rgba(255,255,255,0.04)" }}>
        <div style={{ maxWidth: 1280, margin: "0 auto" }}>
          <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr 1fr 1fr 1fr", gap: 48, marginBottom: 60 }}>
            <div>
              <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 16 }}>
                <div style={{ width: 30, height: 30, borderRadius: 9, background: "linear-gradient(135deg, #7EB8F7, #5B9CF6)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 15 }}>
                  ⬡
                </div>
                <span style={{ fontFamily: "'Syne', sans-serif", fontWeight: 800, fontSize: 16 }}>NEXUS</span>
              </div>
              <p style={{ color: "rgba(255,255,255,0.3)", fontSize: 13, lineHeight: 1.7, maxWidth: 260 }}>
                The next-generation platform for communities, teams, and creators. Built for those who demand more.
              </p>
            </div>
            {[
              { title: "Platform", links: ["Features", "Pricing", "Changelog", "Status"] },
              { title: "Developers", links: ["API Docs", "SDK", "Webhooks", "Open Source"] },
              { title: "Company", links: ["About", "Blog", "Careers", "Press"] },
              { title: "Legal", links: ["Privacy", "Terms", "Security", "Cookies"] },
            ].map((col) => (
              <div key={col.title}>
                <div style={{ fontFamily: "'Syne', sans-serif", fontSize: 12, color: "rgba(255,255,255,0.3)", letterSpacing: "0.1em", marginBottom: 16 }}>{col.title}</div>
                {col.links.map((l) => (
                  <div key={l} style={{ marginBottom: 10 }}>
                    <a href="#" className="nav-link" style={{ fontSize: 13 }}>{l}</a>
                  </div>
                ))}
              </div>
            ))}
          </div>

          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", borderTop: "1px solid rgba(255,255,255,0.05)", paddingTop: 28 }}>
            <span style={{ fontSize: 12, color: "rgba(255,255,255,0.2)" }}>© 2025 Nexus Technologies, Inc. All rights reserved.</span>
            <div style={{ display: "flex", gap: 24 }}>
              {["Twitter", "GitHub", "Discord", "LinkedIn"].map((s) => (
                <a key={s} href="#" className="nav-link" style={{ fontSize: 12 }}>{s}</a>
              ))}
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}



function Avatar({ user, size = 36 }:any) {
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
        boxShadow: `0 0 12px ${user.color}33`,
      }}
    >
      {user.avatar}
    </div>
  );
}

function StatusDot({ status }:any) {
  const c = status === "online" ? "#34D399" : status === "gaming" ? "#A78BFA" : "#FBBF24";
  return (
    <span
      style={{
        display: "inline-block",
        width: 8,
        height: 8,
        borderRadius: "50%",
        background: c,
        boxShadow: `0 0 6px ${c}`,
        flexShrink: 0,
      }}
    />
  );
}

function GlassCard({ children, style = {}, className = "" }: any) {
  return (
    <div
      className={className}
      style={{
        background: "rgba(255,255,255,0.03)",
        backdropFilter: "blur(24px)",
        border: "1px solid rgba(255,255,255,0.08)",
        borderRadius: 20,
        boxShadow: "0 8px 48px rgba(0,0,0,0.45), inset 0 1px 0 rgba(255,255,255,0.07)",
        ...style,
      }}
    >
      {children}
    </div>
  );
}

function Noise() {
  return (
    <svg style={{ position: "fixed", top: 0, left: 0, width: "100%", height: "100%", opacity: 0.03, pointerEvents: "none", zIndex: 0 }}>
      <filter id="noise">
        <feTurbulence type="fractalNoise" baseFrequency="0.65" numOctaves="3" stitchTiles="stitch" />
        <feColorMatrix type="saturate" values="0" />
      </filter>
      <rect width="100%" height="100%" filter="url(#noise)" />
    </svg>
  );
}

function FloatingOrb({ x, y, size, color, blur = 120 }:any) {
  return (
    <div
      style={{
        position: "absolute",
        left: x,
        top: y,
        width: size,
        height: size,
        borderRadius: "50%",
        background: color,
        filter: `blur(${blur}px)`,
        opacity: 0.18,
        pointerEvents: "none",
      }}
    />
  );
}

// === HERO MOCK UI ===
function HeroMockChat() {
  const [tick, setTick] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setTick((v) => v + 1), 3000);
    return () => clearInterval(t);
  }, []);

  return (
    <GlassCard
      style={{
        width: 340,
        padding: "16px",
        position: "absolute",
        bottom: 40,
        left: -60,
        zIndex: 4,
        animation: "floatA 6s ease-in-out infinite",
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 14, borderBottom: "1px solid rgba(255,255,255,0.06)", paddingBottom: 12 }}>
        <div style={{ width: 8, height: 8, borderRadius: "50%", background: "#34D399", boxShadow: "0 0 6px #34D399" }} />
        <span style={{ fontFamily: "'Syne', sans-serif", fontSize: 12, color: "rgba(255,255,255,0.5)", letterSpacing: "0.08em" }}># dev-stage</span>
        <span style={{ marginLeft: "auto", fontSize: 11, color: "rgba(255,255,255,0.25)" }}>live</span>
      </div>
      {MESSAGES.map((m, i) => {
        const u = USERS.find((u) => u.name === m.user);
        return (
          <div key={i} style={{ display: "flex", gap: 10, marginBottom: 12, opacity: i === 0 && tick % 2 === 0 ? 0.7 : 1, transition: "opacity 0.5s" }}>
            {u && <Avatar user={u} size={30} />}
            <div>
              <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 3 }}>
                <span style={{ fontFamily: "'Syne', sans-serif", fontWeight: 700, fontSize: 12, color: u?.color }}>{m.user}</span>
                <span style={{ fontSize: 10, color: "rgba(255,255,255,0.25)" }}>{m.time}</span>
              </div>
              <p style={{ margin: 0, fontSize: 12, color: "rgba(255,255,255,0.7)", lineHeight: 1.5 }}>{m.text}</p>
              {m.reactions.length > 0 && (
                <div style={{ display: "flex", gap: 6, marginTop: 6 }}>
                  {m.reactions.map((r, j) => (
                    <span key={j} style={{ fontSize: 11, background: "rgba(255,255,255,0.06)", borderRadius: 8, padding: "2px 8px", color: "rgba(255,255,255,0.5)" }}>
                      {r}
                    </span>
                  ))}
                </div>
              )}
            </div>
          </div>
        );
      })}
    </GlassCard>
  );
}

function HeroMockVideoCall() {
  return (
    <GlassCard
      style={{
        width: 290,
        padding: 16,
        position: "absolute",
        top: 20,
        right: -40,
        zIndex: 4,
        animation: "floatB 7s ease-in-out infinite",
      }}
    >
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
        <span style={{ fontFamily: "'Syne', sans-serif", fontSize: 11, color: "rgba(255,255,255,0.4)", letterSpacing: "0.1em" }}>LIVE CALL</span>
        <div style={{ display: "flex", gap: 4 }}>
          <div style={{ width: 6, height: 6, borderRadius: "50%", background: "#F87171" }} />
          <div style={{ width: 6, height: 6, borderRadius: "50%", background: "#FBBF24" }} />
          <div style={{ width: 6, height: 6, borderRadius: "50%", background: "#34D399" }} />
        </div>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8, marginBottom: 12 }}>
        {USERS.slice(0, 4).map((u, i) => (
          <div
            key={i}
            style={{
              aspectRatio: "16/10",
              borderRadius: 12,
              background: `linear-gradient(135deg, ${u.color}18, ${u.color}06)`,
              border: `1px solid ${u.color}33`,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              gap: 4,
              position: "relative",
              overflow: "hidden",
            }}
          >
            <Avatar user={u} size={28} />
            <span style={{ fontSize: 9, color: "rgba(255,255,255,0.4)", fontFamily: "'Syne', sans-serif" }}>{u.name}</span>
            {i === 0 && (
              <div style={{ position: "absolute", bottom: 4, right: 4, width: 6, height: 6, borderRadius: "50%", background: "#34D399", boxShadow: "0 0 4px #34D399" }} />
            )}
          </div>
        ))}
      </div>
      <div style={{ display: "flex", justifyContent: "center", gap: 12 }}>
        {["🎤", "📷", "🖥", "📵"].map((ic, i) => (
          <button
            key={i}
            style={{
              width: 34,
              height: 34,
              borderRadius: "50%",
              background: i === 3 ? "#F87171" : "rgba(255,255,255,0.07)",
              border: "1px solid rgba(255,255,255,0.1)",
              cursor: "pointer",
              fontSize: 14,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            {ic}
          </button>
        ))}
      </div>
    </GlassCard>
  );
}

function HeroMockSidebar() {
  return (
    <GlassCard
      style={{
        width: 220,
        padding: "16px 12px",
        position: "absolute",
        top: "50%",
        left: -100,
        transform: "translateY(-50%)",
        zIndex: 3,
        animation: "floatC 8s ease-in-out infinite",
      }}
    >
      <div style={{ marginBottom: 16 }}>
        <div style={{ fontSize: 10, color: "rgba(255,255,255,0.3)", letterSpacing: "0.1em", marginBottom: 8, fontFamily: "'Syne', sans-serif" }}>SERVERS</div>
        {["⚡ Nexus HQ", "🎮 GameDevs", "💼 Hiring Hub", "🌐 Open Source"].map((s, i) => (
          <div
            key={i}
            style={{
              padding: "8px 10px",
              borderRadius: 10,
              marginBottom: 4,
              background: i === 0 ? "rgba(126,184,247,0.12)" : "transparent",
              border: i === 0 ? "1px solid rgba(126,184,247,0.2)" : "1px solid transparent",
              fontSize: 12,
              color: i === 0 ? "#7EB8F7" : "rgba(255,255,255,0.45)",
              cursor: "pointer",
              fontFamily: "'Syne', sans-serif",
            }}
          >
            {s}
          </div>
        ))}
      </div>
      <div>
        <div style={{ fontSize: 10, color: "rgba(255,255,255,0.3)", letterSpacing: "0.1em", marginBottom: 8, fontFamily: "'Syne', sans-serif" }}>ONLINE — 2,847</div>
        {USERS.slice(0, 4).map((u, i) => (
          <div key={i} style={{ display: "flex", alignItems: "center", gap: 8, padding: "5px 0" }}>
            <Avatar user={u} size={24} />
            <span style={{ fontSize: 11, color: "rgba(255,255,255,0.55)", fontFamily: "'Syne', sans-serif" }}>{u.name}</span>
            <StatusDot status={u.status} />
          </div>
        ))}
      </div>
    </GlassCard>
  );
}