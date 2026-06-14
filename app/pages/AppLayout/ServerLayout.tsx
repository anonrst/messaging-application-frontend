import { useQuery } from "@tanstack/react-query";
import { useParams, Outlet, NavLink } from "react-router";
import { memo, useState, type Dispatch, type SetStateAction } from "react";
import { ChannelType, type ChannelDTO } from "@/types/auth.types";
import { getAllChannelOfAServer } from "@/util/tanstack/quries/readQuries";

// ─── Types ────────────────────────────────────────────────────────────────────
// assumes you already have these — adjust import paths as needed

// ─── Skeleton ─────────────────────────────────────────────────────────────────
const ChannelRowSkeleton = () => (
  <div className="ch-skeleton-row">
    <div className="ch-skeleton-icon" />
    <div className="ch-skeleton-label" />
  </div>
);

const ChannelsSkeleton = () => (
  <div className="ch-skeleton-wrap">
    <div className="ch-skeleton-group-label" />
    {Array.from({ length: 5 }).map((_, i) => <ChannelRowSkeleton key={i} />)}
    <div className="ch-skeleton-group-label" style={{ marginTop: 20 }} />
    {Array.from({ length: 2 }).map((_, i) => <ChannelRowSkeleton key={i} />)}
  </div>
);
// ─── Server Header ─────────────────────────────────────────────────────────────
const ServerHeader = ({ name }: { name?: string }) => (
  <div className="ch-server-header">
    <span className="ch-server-name">{name ?? "Server"}</span>
    <svg className="ch-server-chevron" viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <path d="M4 6l4 4 4-4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  </div>
);
// ─── Section Header ────────────────────────────────────────────────────────────
const SectionHeader = ({ label, id, collapsedSections, setCollapsedSections }: { label: string, id: string, collapsedSections: 
string[], setCollapsedSections: Dispatch<SetStateAction<string[]>> }) => {

  let isCollapsed = collapsedSections.includes(id);
  return (<div className="ch-section-header" onClick={() => {
    setCollapsedSections(prev => (
      prev.includes(id) ? prev.filter(p => p !== id) : [...prev, id]
    ))
  }}>
    <svg className="ch-section-arrow" viewBox="0 0 6 10" fill="none" aria-hidden="true" style={{transform: isCollapsed ? "rotate(0deg)": "rotate(90deg)", transition: "transform 0.2s ease"}}>
      <path d="M1 1l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
    <span>{label}</span>
    <button className="ch-section-add" aria-label={`Add ${label} channel`} title={`Add ${label}`}>
      <svg viewBox="0 0 16 16" fill="none" aria-hidden="true">
        <path d="M8 3v10M3 8h10" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
      </svg>
    </button>
  </div>)
};

// ─── Text Channel Button ───────────────────────────────────────────────────────
const TextChannelButton = memo(({ channel }: { channel: ChannelDTO }) => {
  console.log("TextChannelButton()");
  return (
    <NavLink
      to={channel.channelId.toString()}
      className={({ isActive }) =>
        `ch-row ch-row-text ${isActive ? "ch-row--active" : ""}`
      }
    >
      {({ isActive }) => (
        <>
          <span className="ch-icon ch-icon-text" aria-hidden="true">
            #
          </span>
          <span className="ch-label">{channel.channelName}</span>
          {isActive && (
            <span className="ch-active-pip" aria-hidden="true" />
          )}
        </>
      )}
    </NavLink>
  );
});

// ─── Voice Channel Button ──────────────────────────────────────────────────────
const VoiceChannelButton = memo(({ channel }: { channel: ChannelDTO }) => {
  console.log("VoiceChannelButton()");
  return (
    <NavLink
      to={channel.channelId.toString()}
      className={({ isActive }) =>
        `ch-row ch-row-voice ${isActive ? "ch-row--active" : ""}`
      }
    >
      {({ isActive }) => (
        <>
          <svg className="ch-icon ch-icon-voice" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" fill="currentColor" opacity=".9" />
            <path d="M15.54 8.46a5 5 0 0 1 0 7.07" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            <path d="M19.07 4.93a10 10 0 0 1 0 14.14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          </svg>
          <span className="ch-label">{channel.channelName}</span>
          {isActive && (
            <span className="ch-active-pip" aria-hidden="true" />
          )}
        </>
      )}
    </NavLink>
  );
});



// ─── Main Layout ───────────────────────────────────────────────────────────────
const ServerLayout = () => {
  const { serverId } = useParams<{ serverId: string }>();
  const { data, isLoading } = useQuery(getAllChannelOfAServer(serverId!));
  const [collapsedSections, setCollapsedSections] = useState<string[]>([]);
  const textChannels = data?.channels.filter((c) => c.channelType === ChannelType.TEXT) ?? [];
  const voiceChannels = data?.channels.filter((c) => c.channelType === ChannelType.VOICE) ?? [];

  return (
    <>
      <style>{CSS}</style>

      <aside className="serverChannelList serverContainer">
        <ServerHeader name={data?.serverName} />

        <nav className="ch-nav" aria-label="Channels">
          {isLoading ? (
            <ChannelsSkeleton />
          ) : (
            <>
              {textChannels.length > 0 && (
                <div className="ch-section">
                  <SectionHeader label="Text Channels" id="channels" collapsedSections={collapsedSections} setCollapsedSections={setCollapsedSections}/>
                  <div className="ch-section-body">
                    {!collapsedSections.includes("channels") && textChannels.map((ch) => (
                      <TextChannelButton
                        key={ch.channelId.toString()}
                        channel={ch}
                      />
                    ))}
                  </div>
                </div>
              )}

              {voiceChannels.length > 0 && (
                <div className="ch-section">
                  <SectionHeader label="Voice Channels" id="voices" collapsedSections={collapsedSections} setCollapsedSections={setCollapsedSections} />
                  <div id="voices" className="ch-section-body">
                    {!collapsedSections.includes("voices") && voiceChannels.map((ch) => (
                      <VoiceChannelButton
                        key={ch.channelId.toString()}
                        channel={ch}
                      />
                    ))}
                  </div>
                </div>
              )}

              {textChannels.length === 0 && voiceChannels.length === 0 && (
                <div className="ch-empty">
                  <svg viewBox="0 0 48 48" fill="none" className="ch-empty-icon" aria-hidden="true">
                    <circle cx="24" cy="24" r="20" stroke="currentColor" strokeWidth="2" opacity=".3" />
                    <path d="M16 24h16M24 16v16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" opacity=".5" />
                  </svg>
                  <p>No channels yet</p>
                  <span>Create one to get started</span>
                </div>
              )}
            </>
          )}
        </nav>
      </aside>

      <section className="serverChannelChat serverContainer">
        <Outlet />
      </section>
    </>
  );
};

export default ServerLayout;

// ─── Scoped CSS ────────────────────────────────────────────────────────────────
const CSS = `
  /* Server header */
  .ch-server-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 16px;
    height: 48px;
    min-height: 48px;
    border-bottom: 1px solid rgba(255,255,255,0.04);
    cursor: pointer;
    flex-shrink: 0;
    transition: background 0.15s ease;
  }
  .ch-server-header:hover {
    background: rgba(255,255,255,0.03);
  }
  .ch-server-name {
    font-size: 15px;
    font-weight: 600;
    color: #f2f3f5;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    letter-spacing: -0.01em;
  }
  .ch-server-chevron {
    width: 16px;
    height: 16px;
    color: #8a8e94;
    flex-shrink: 0;
  }

  /* Nav scroll area */
  .ch-nav {
    flex: 1;
    overflow-y: auto;
    overflow-x: hidden;
    padding: 8px 0 16px;
    scrollbar-width: thin;
    scrollbar-color: rgba(255,255,255,0.07) transparent;
  }
  .ch-nav::-webkit-scrollbar { width: 4px; }
  .ch-nav::-webkit-scrollbar-thumb { background: rgba(255,255,255,0.07); border-radius: 2px; }

  /* Section */
  .ch-section { margin-bottom: 4px; }
  .ch-section-body { display: flex; flex-direction: column; gap: 1px; }

  /* Section header */
  .ch-section-header {
    display: flex;
    align-items: center;
    gap: 4px;
    padding: 14px 6px 4px 8px;
    cursor: pointer;
    color: #8a8e94;
    font-size: 11px;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 0.065em;
    transition: color 0.15s ease;
    user-select: none;
  }
  .ch-section-header:hover { color: #c4c9d0; }
  .ch-section-arrow {
    width: 6px;
    height: 10px;
    flex-shrink: 0;
    transition: transform 0.2s ease;
  }
  .ch-section-add {
    margin-left: auto;
    width: 16px;
    height: 16px;
    display: flex;
    align-items: center;
    justify-content: center;
    background: none;
    border: none;
    cursor: pointer;
    color: #8a8e94;
    border-radius: 3px;
    padding: 0;
    opacity: 0;
    transition: opacity 0.15s, color 0.15s;
    flex-shrink: 0;
  }
  .ch-section-header:hover .ch-section-add { opacity: 1; }
  .ch-section-add:hover { color: #f2f3f5; }
  .ch-section-add svg { width: 14px; height: 14px; }

  /* Channel row base */
  .ch-row {
    display: flex;
    align-items: center;
    gap: 6px;
    padding: 0 8px 0 8px;
    height: 34px;
    border-radius: 4px;
    margin: 0 8px;
    cursor: pointer;
    color: #8a8e94;
    font-size: 15px;
    font-weight: 500;
    text-decoration: none;
    position: relative;
    transition: background 0.1s ease, color 0.1s ease;
    white-space: nowrap;
    overflow: hidden;
    flex-shrink: 0;
    outline: none;
  }
  .ch-row:hover {
    background: rgba(255,255,255,0.06);
    color: #d5d8dc;
  }
  .ch-row:focus-visible {
    box-shadow: 0 0 0 2px #5865f2;
  }
  .ch-row--active {
    background: rgba(255,255,255,0.1);
    color: #f2f3f5;
  }
  .ch-row--active:hover {
    background: rgba(255,255,255,0.1);
  }

  /* Active left pip */
  .ch-active-pip {
    position: absolute;
    left: -8px;
    top: 50%;
    transform: translateY(-50%);
    width: 3px;
    height: 16px;
    background: #5865f2;
    border-radius: 0 2px 2px 0;
  }

  /* Icons */
  .ch-icon {
    flex-shrink: 0;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .ch-icon-text {
    font-size: 18px;
    width: 18px;
    font-weight: 500;
    color: inherit;
    line-height: 1;
    margin-right: 1px;
  }
  .ch-icon-voice {
    width: 16px;
    height: 16px;
    color: inherit;
  }

  /* Label */
  .ch-label {
    flex: 1;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    font-size: 15px;
    line-height: 1;
  }

  /* Skeleton */
  @keyframes ch-shimmer {
    0%   { background-position: 200% 0; }
    100% { background-position: -200% 0; }
  }
  .ch-skeleton-wrap { padding: 8px 8px 0; }
  .ch-skeleton-row {
    display: flex;
    align-items: center;
    gap: 8px;
    padding: 0 8px;
    height: 34px;
    margin-bottom: 1px;
  }
  .ch-skeleton-icon {
    width: 16px;
    height: 16px;
    border-radius: 3px;
    background: linear-gradient(90deg, rgba(255,255,255,0.04) 25%, rgba(255,255,255,0.09) 50%, rgba(255,255,255,0.04) 75%);
    background-size: 200% 100%;
    animation: ch-shimmer 1.6s ease-in-out infinite;
    flex-shrink: 0;
  }
  .ch-skeleton-label {
    height: 10px;
    border-radius: 3px;
    background: linear-gradient(90deg, rgba(255,255,255,0.04) 25%, rgba(255,255,255,0.09) 50%, rgba(255,255,255,0.04) 75%);
    background-size: 200% 100%;
    animation: ch-shimmer 1.6s ease-in-out infinite;
    flex: 1;
    max-width: 120px;
  }
  .ch-skeleton-group-label {
    height: 8px;
    width: 80px;
    border-radius: 3px;
    margin: 14px 8px 8px 10px;
    background: linear-gradient(90deg, rgba(255,255,255,0.04) 25%, rgba(255,255,255,0.09) 50%, rgba(255,255,255,0.04) 75%);
    background-size: 200% 100%;
    animation: ch-shimmer 1.6s ease-in-out infinite;
  }

  /* Empty state */
  .ch-empty {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 40px 16px;
    text-align: center;
    gap: 6px;
    color: #8a8e94;
  }
  .ch-empty-icon { width: 48px; height: 48px; margin-bottom: 8px; }
  .ch-empty p { font-size: 14px; font-weight: 600; color: #c4c9d0; margin: 0; }
  .ch-empty span { font-size: 12px; color: #8a8e94; }
`;