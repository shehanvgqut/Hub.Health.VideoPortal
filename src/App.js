import React, { useEffect, useMemo, useRef, useState } from "react";
import {
  isVideoStarted,
  joinCall,
  leaveCall,
  muteMyAudio,
  startLocalPreview,
  startMyVideo,
  stopLocalPreview,
  stopMyVideo,
  unmuteMyAudio
} from "./VideoCall";

function getReadableStatus(callState) {
  switch (callState) {
    case "Connecting":
      return "Joining meeting...";
    case "InLobby":
      return "You are in the lobby. Waiting to be admitted...";
    case "Connected":
      return "Connected to the consultation.";
    case "Disconnecting":
      return "Leaving call...";
    case "Disconnected":
      return "Call ended.";
    default:
      return callState || "Ready";
  }
}

function getStatusColor(callState) {
  switch (callState) {
    case "Connected":
      return {
        background: "#e8fff1",
        color: "#0f9f57",
        border: "1px solid #b7efcc"
      };
    case "Connecting":
    case "InLobby":
      return {
        background: "#fff7e8",
        color: "#b76e00",
        border: "1px solid #f4d79b"
      };
    case "Disconnected":
      return {
        background: "#f5f5f5",
        color: "#666",
        border: "1px solid #e3e3e3"
      };
    default:
      return {
        background: "#eef3ff",
        color: "#315efb",
        border: "1px solid #cfdcff"
      };
  }
}

const styles = {
  page: {
    minHeight: "100vh",
    background:
      "radial-gradient(circle at top, #ffffff 0%, #f2f6ff 38%, #e9eef8 100%)",
    padding: "32px 20px",
    fontFamily: '"Avenir Next", "Segoe UI", sans-serif'
  },
  shell: {
    width: "1440px",
    maxWidth: "100%",
    margin: "0 auto",
    background: "#ffffff",
    borderRadius: "32px",
    boxShadow: "0 28px 90px rgba(15, 23, 42, 0.12)",
    border: "1px solid #e5ebf5",
    overflow: "hidden"
  },
  hero: {
    padding: "34px 40px 28px 40px",
    background: "linear-gradient(135deg, #fffdf9 0%, #eef5ff 100%)",
    borderBottom: "1px solid #edf1f7"
  },
  eyebrow: {
    display: "inline-flex",
    alignItems: "center",
    gap: "8px",
    padding: "8px 14px",
    borderRadius: "999px",
    fontSize: "13px",
    fontWeight: 700,
    color: "#114b8b",
    background: "#e8f1ff",
    border: "1px solid #d3e2ff",
    marginBottom: "18px",
    textTransform: "uppercase",
    letterSpacing: "0.08em"
  },
  title: {
    margin: 0,
    fontSize: "54px",
    lineHeight: 1,
    color: "#0f172a",
    letterSpacing: "-1.8px"
  },
  subtitle: {
    marginTop: "14px",
    marginBottom: 0,
    fontSize: "19px",
    lineHeight: 1.6,
    color: "#526075",
    maxWidth: "800px"
  },
  topBar: {
    padding: "22px 40px 0 40px"
  },
  statusWrap: {
    display: "flex",
    justifyContent: "space-between",
    gap: "16px",
    flexWrap: "wrap",
    alignItems: "center"
  },
  statusPill: {
    display: "inline-flex",
    alignItems: "center",
    padding: "10px 16px",
    borderRadius: "999px",
    fontSize: "15px",
    fontWeight: 700
  },
  helperText: {
    margin: 0,
    fontSize: "15px",
    color: "#667085"
  },
  waitingGrid: {
    display: "grid",
    gridTemplateColumns: "1.1fr 0.9fr",
    gap: "24px",
    padding: "24px 40px 40px 40px",
    alignItems: "stretch"
  },
  meetingGrid: {
    display: "grid",
    gridTemplateColumns: "1fr 340px",
    gap: "24px",
    padding: "24px 40px 40px 40px",
    alignItems: "start"
  },
  card: {
    background: "#fff",
    border: "1px solid #e8edf5",
    borderRadius: "26px",
    boxShadow: "0 14px 38px rgba(15, 23, 42, 0.05)"
  },
  sectionCard: {
    padding: "24px"
  },
  sectionTitle: {
    marginTop: 0,
    marginBottom: "12px",
    fontSize: "26px",
    color: "#111827",
    letterSpacing: "-0.4px"
  },
  bodyText: {
    margin: 0,
    fontSize: "16px",
    lineHeight: 1.7,
    color: "#526075"
  },
  actionRow: {
    display: "flex",
    flexWrap: "wrap",
    gap: "12px",
    marginTop: "24px"
  },
  primaryButton: {
    padding: "14px 22px",
    borderRadius: "16px",
    border: "none",
    background: "#1e63ff",
    color: "#fff",
    fontSize: "16px",
    fontWeight: 700,
    cursor: "pointer",
    boxShadow: "0 10px 22px rgba(30, 99, 255, 0.22)"
  },
  secondaryButton: {
    padding: "14px 22px",
    borderRadius: "16px",
    border: "1px solid #dbe1ea",
    background: "#fff",
    color: "#172033",
    fontSize: "16px",
    fontWeight: 700,
    cursor: "pointer"
  },
  dangerButton: {
    padding: "14px 22px",
    borderRadius: "16px",
    border: "1px solid #ffd2d2",
    background: "#fff5f5",
    color: "#d92d20",
    fontSize: "16px",
    fontWeight: 700,
    cursor: "pointer"
  },
  disabledButton: {
    opacity: 0.45,
    cursor: "not-allowed",
    boxShadow: "none"
  },
  previewFrame: {
    minHeight: "420px",
    borderRadius: "28px",
    background: "linear-gradient(180deg, #10131a 0%, #05070b 100%)",
    overflow: "hidden",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    color: "#cfd6e4",
    fontSize: "16px",
    position: "relative",
    border: "1px solid rgba(255,255,255,0.06)"
  },
  previewPanel: {
    display: "grid",
    gap: "24px"
  },
  statList: {
    display: "grid",
    gap: "14px",
    marginTop: "22px"
  },
  statRow: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    gap: "10px",
    padding: "14px 16px",
    borderRadius: "16px",
    background: "#f8fafc",
    border: "1px solid #edf2f7"
  },
  statLabel: {
    fontSize: "15px",
    fontWeight: 700,
    color: "#667085"
  },
  statValue: {
    fontSize: "16px",
    fontWeight: 800,
    color: "#111827"
  },
  remoteFrame: {
    minHeight: "640px",
    borderRadius: "28px",
    background: "linear-gradient(180deg, #0c111b 0%, #111827 100%)",
    overflow: "hidden",
    border: "1px solid #1f2937",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    position: "relative"
  },
  remoteVideosHost: {
    width: "100%",
    minHeight: "640px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    padding: "20px"
  },
  emptyState: {
    color: "#b8c1d1",
    fontSize: "18px",
    textAlign: "center",
    maxWidth: "420px",
    lineHeight: 1.6,
    padding: "20px"
  },
  localTile: {
    width: "100%",
    minHeight: "240px",
    background: "linear-gradient(180deg, #10131a 0%, #05070b 100%)",
    borderRadius: "22px",
    overflow: "hidden",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    color: "#cfd6e4",
    border: "1px solid rgba(255,255,255,0.06)"
  },
  meetingSidebar: {
    display: "grid",
    gap: "20px"
  },
  controlsCard: {
    padding: "24px"
  },
  notesArea: {
    width: "100%",
    minHeight: "160px",
    border: "1px solid #dbe1ea",
    borderRadius: "16px",
    padding: "14px",
    resize: "vertical",
    fontSize: "15px",
    fontFamily: "inherit",
    outline: "none"
  }
};

function getRoleConfig() {
  const path = window.location.pathname.toLowerCase();
  const isClinician = path.includes("clinician");

  if (isClinician) {
    return {
      role: "clinician",
      displayName: "Clinician",
      waitingEyebrow: "Clinician portal",
      meetingEyebrow: "Consultation in progress",
      waitingTitle: "Clinician Waiting Room",
      meetingTitle: "Clinician Video Consultation",
      waitingSubtitle:
        "Check your camera and microphone before joining the live patient consultation.",
      meetingSubtitle:
        "You are now in the live consultation. Manage your microphone, camera, and patient view.",
      previewTitle: "Clinician camera preview",
      previewDescription:
        "This is your video preview before entering the patient consultation.",
      sideTitle: "Consultation preview",
      sideDescription:
        "Review the consultation status before joining the patient call.",
      remoteTitle: "Patient video",
      localTitle: "Your video",
      joinButton: "Join as Clinician",
      waitingRemoteText: "Waiting for patient",
      notesEnabled: true
    };
  }

  return {
    role: "patient",
    displayName: "Patient",
    waitingEyebrow: "Patient portal",
    meetingEyebrow: "Consultation in progress",
    waitingTitle: "Consultation Waiting Room",
    meetingTitle: "Patient Video Consultation",
    waitingSubtitle:
      "Check your camera preview and review the consultation details before joining.",
    meetingSubtitle:
      "You are now in the live consultation. Manage your microphone and camera while waiting for the clinician.",
    previewTitle: "Camera preview",
    previewDescription:
      "This is the view that will be used once you enter the live consultation.",
    sideTitle: "Consultation preview",
    sideDescription:
      "Review your consultation status before entering the call.",
    remoteTitle: "Clinician video",
    localTitle: "Your video",
    joinButton: "Join Consultation",
    waitingRemoteText: "Waiting for clinician",
    notesEnabled: false
  };
}

export default function App() {
  const roleConfig = useMemo(() => getRoleConfig(), []);

  const [screen, setScreen] = useState("waiting");
  const [status, setStatus] = useState("Ready");
  const [callState, setCallState] = useState("None");
  const [isMuted, setIsMuted] = useState(false);
  const [remoteParticipantCount, setRemoteParticipantCount] = useState(0);
  const [loading, setLoading] = useState(false);
  const [isCameraEnabled, setIsCameraEnabled] = useState(true);
  const [shouldAutoJoin, setShouldAutoJoin] = useState(false);

  const localVideoRef = useRef(null);
  const remoteVideosRef = useRef(null);

  useEffect(() => {
    let cancelled = false;

    async function syncWaitingPreview() {
      if (screen !== "waiting" || !localVideoRef.current) {
        return;
      }

      try {
        if (!isCameraEnabled) {
          await stopLocalPreview();
          localVideoRef.current.innerHTML = "";
          return;
        }

        await startLocalPreview(localVideoRef.current, roleConfig.displayName);

        if (!cancelled) {
          setStatus((currentStatus) =>
            currentStatus === "Call ended." ? currentStatus : "Ready"
          );
        }
      } catch (error) {
        console.error(error);

        if (!cancelled) {
          setStatus(error.message || "Could not start camera preview.");
          setIsCameraEnabled(false);
        }
      }
    }

    syncWaitingPreview();

    return () => {
      cancelled = true;
    };
  }, [isCameraEnabled, screen, roleConfig.displayName]);

  useEffect(() => {
    let cancelled = false;

    async function connectToMeeting() {
      if (!shouldAutoJoin || screen !== "meeting") {
        return;
      }

      try {
        setLoading(true);
        setStatus("Joining meeting...");

        await joinCall({
          displayName: roleConfig.displayName,
          audioMuted: isMuted,
          localVideoContainer: localVideoRef.current,
          remoteVideosContainer: remoteVideosRef.current,
          startWithVideo: isCameraEnabled,
          onStateChanged: (newState, call) => {
            if (cancelled) {
              return;
            }

            setCallState(newState);
            setStatus(getReadableStatus(newState));

            if (typeof call?.isMuted === "boolean") {
              setIsMuted(call.isMuted);
            }

            if (newState === "Disconnected") {
              setRemoteParticipantCount(0);
              setScreen("waiting");
            }
          },
          onMutedChanged: (muted) => {
            if (!cancelled) {
              setIsMuted(muted);
            }
          },
          onParticipantsChanged: (participants) => {
            if (!cancelled) {
              setRemoteParticipantCount(participants?.length || 0);
            }
          }
        });
      } catch (error) {
        console.error(error);

        if (!cancelled) {
          setStatus(error.message || "Failed to join meeting.");
          setScreen("waiting");
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
          setShouldAutoJoin(false);
        }
      }
    }

    connectToMeeting();

    return () => {
      cancelled = true;
    };
  }, [
    isCameraEnabled,
    isMuted,
    screen,
    shouldAutoJoin,
    roleConfig.displayName
  ]);

  useEffect(() => {
    return () => {
      stopLocalPreview().catch((error) => {
        console.warn("stopLocalPreview cleanup failed:", error);
      });
    };
  }, []);

  const handleJoin = () => {
    setScreen("meeting");
    setShouldAutoJoin(true);
  };

  const handleLeave = async () => {
    try {
      setLoading(true);
      await leaveCall();
      await stopLocalPreview();

      setCallState("Disconnected");
      setStatus("Call ended.");
      setRemoteParticipantCount(0);
      setScreen("waiting");

      if (remoteVideosRef.current) {
        remoteVideosRef.current.innerHTML = "";
      }

      if (localVideoRef.current) {
        localVideoRef.current.innerHTML = "";
      }
    } catch (error) {
      console.error(error);
      setStatus(error.message || "Failed to leave call.");
    } finally {
      setLoading(false);
    }
  };

  const isConnected =
    callState === "Connected" ||
    callState === "InLobby" ||
    callState === "Connecting";

  const handleMuteAudio = async () => {
    if (!isConnected) {
      setIsMuted(true);
      setStatus("Microphone will join muted.");
      return;
    }

    try {
      await muteMyAudio();
      setIsMuted(true);
      setStatus("Microphone muted.");
    } catch (error) {
      console.error(error);
      setStatus(error.message || "Could not mute microphone.");
    }
  };

  const handleUnmuteAudio = async () => {
    if (!isConnected) {
      setIsMuted(false);
      setStatus("Microphone will join live.");
      return;
    }

    try {
      await unmuteMyAudio();
      setIsMuted(false);
      setStatus("Microphone unmuted.");
    } catch (error) {
      console.error(error);
      setStatus(error.message || "Could not unmute microphone.");
    }
  };

  const handleUnblockVideo = async () => {
    if (!isConnected) {
      try {
        await startLocalPreview(localVideoRef.current, roleConfig.displayName);
        setIsCameraEnabled(true);
        setStatus("Camera preview turned on.");
      } catch (error) {
        console.error(error);
        setStatus(error.message || "Could not turn on camera preview.");
      }
      return;
    }

    try {
      if (isVideoStarted()) {
        setIsCameraEnabled(true);
        return;
      }

      await startMyVideo(localVideoRef.current);
      setIsCameraEnabled(true);
      setStatus("Camera turned on.");
    } catch (error) {
      console.error(error);
      setStatus(error.message || "Could not turn on camera.");
    }
  };

  const handleBlockVideo = async () => {
    if (!isConnected) {
      try {
        await stopLocalPreview();

        if (localVideoRef.current) {
          localVideoRef.current.innerHTML = "";
        }

        setIsCameraEnabled(false);
        setStatus("Camera preview turned off.");
      } catch (error) {
        console.error(error);
        setStatus(error.message || "Could not turn off camera preview.");
      }
      return;
    }

    try {
      await stopMyVideo();
      setIsCameraEnabled(false);
      setStatus("Camera turned off.");
    } catch (error) {
      console.error(error);
      setStatus(error.message || "Could not turn off camera.");
    }
  };

  const statusStyle = getStatusColor(callState);

  const getButtonStyle = (type, disabled = false) => {
    const base =
      type === "primary"
        ? styles.primaryButton
        : type === "danger"
        ? styles.dangerButton
        : styles.secondaryButton;

    return disabled ? { ...base, ...styles.disabledButton } : base;
  };

  return (
    <div style={styles.page}>
      <div style={styles.shell}>
        <div style={styles.hero}>
          <div style={styles.eyebrow}>
            {screen === "waiting"
              ? roleConfig.waitingEyebrow
              : roleConfig.meetingEyebrow}
          </div>

          <h1 style={styles.title}>
            {screen === "waiting"
              ? roleConfig.waitingTitle
              : roleConfig.meetingTitle}
          </h1>

          <p style={styles.subtitle}>
            {screen === "waiting"
              ? roleConfig.waitingSubtitle
              : roleConfig.meetingSubtitle}
          </p>
        </div>

        <div style={styles.topBar}>
          <div style={styles.statusWrap}>
            <div style={{ ...styles.statusPill, ...statusStyle }}>{status}</div>

            <p style={styles.helperText}>
              {screen === "waiting"
                ? "Join when you are ready"
                : remoteParticipantCount > 0
                ? "Participant connected"
                : roleConfig.waitingRemoteText}
            </p>
          </div>
        </div>

        {screen === "waiting" ? (
          <div style={styles.waitingGrid}>
            <div style={styles.previewPanel}>
              <div style={{ ...styles.card, ...styles.sectionCard }}>
                <h3 style={styles.sectionTitle}>{roleConfig.previewTitle}</h3>
                <p style={styles.bodyText}>{roleConfig.previewDescription}</p>

                <div
                  ref={localVideoRef}
                  style={{ ...styles.previewFrame, marginTop: "20px" }}
                >
                  {!isCameraEnabled ? "Your camera preview is off" : null}
                </div>
              </div>
            </div>

            <div style={styles.previewPanel}>
              <div style={{ ...styles.card, ...styles.sectionCard }}>
                <h3 style={styles.sectionTitle}>{roleConfig.sideTitle}</h3>
                <p style={styles.bodyText}>{roleConfig.sideDescription}</p>

                <div style={styles.statList}>
                  <div style={styles.statRow}>
                    <span style={styles.statLabel}>Role</span>
                    <span style={styles.statValue}>{roleConfig.displayName}</span>
                  </div>

                  <div style={styles.statRow}>
                    <span style={styles.statLabel}>Meeting status</span>
                    <span style={styles.statValue}>{callState}</span>
                  </div>

                  <div style={styles.statRow}>
                    <span style={styles.statLabel}>Camera</span>
                    <span style={styles.statValue}>
                      {isCameraEnabled ? "Previewing" : "Off"}
                    </span>
                  </div>

                  <div style={styles.statRow}>
                    <span style={styles.statLabel}>Microphone</span>
                    <span style={styles.statValue}>
                      {isMuted ? "Will join muted" : "Will join live"}
                    </span>
                  </div>

                  <div style={styles.statRow}>
                    <span style={styles.statLabel}>Remote participants</span>
                    <span style={styles.statValue}>Visible after join</span>
                  </div>
                </div>

                <div style={styles.actionRow}>
                  <button
                    onClick={isMuted ? handleUnmuteAudio : handleMuteAudio}
                    style={getButtonStyle("secondary", loading)}
                    disabled={loading}
                  >
                    {isMuted ? "Unmute Mic" : "Mute Mic"}
                  </button>

                  <button
                    onClick={isCameraEnabled ? handleBlockVideo : handleUnblockVideo}
                    style={getButtonStyle("secondary", loading)}
                    disabled={loading}
                  >
                    {isCameraEnabled ? "Turn Camera Off" : "Turn Camera On"}
                  </button>

                  <button
                    onClick={handleJoin}
                    disabled={loading}
                    style={getButtonStyle("primary", loading)}
                  >
                    {roleConfig.joinButton}
                  </button>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div style={styles.meetingGrid}>
            <div style={{ ...styles.card, ...styles.sectionCard }}>
              <h3 style={styles.sectionTitle}>{roleConfig.remoteTitle}</h3>

              <div style={{ ...styles.remoteFrame, marginTop: "20px" }}>
                <div ref={remoteVideosRef} style={styles.remoteVideosHost} />

                {remoteParticipantCount === 0 && (
                  <div style={styles.emptyState}>
                    No remote participant video yet. Once the other person joins
                    with their camera on, the video will appear here.
                  </div>
                )}
              </div>
            </div>

            <div style={styles.meetingSidebar}>
              <div style={{ ...styles.card, ...styles.controlsCard }}>
                <h3 style={styles.sectionTitle}>{roleConfig.localTitle}</h3>
                <div ref={localVideoRef} style={styles.localTile}>
                  {!isCameraEnabled ? "Your camera is off" : null}
                </div>
              </div>

              <div style={{ ...styles.card, ...styles.controlsCard }}>
                <h3 style={styles.sectionTitle}>Meeting controls</h3>

                <div style={styles.statList}>
                  <div style={styles.statRow}>
                    <span style={styles.statLabel}>Role</span>
                    <span style={styles.statValue}>{roleConfig.displayName}</span>
                  </div>

                  <div style={styles.statRow}>
                    <span style={styles.statLabel}>Call state</span>
                    <span style={styles.statValue}>{callState}</span>
                  </div>

                  <div style={styles.statRow}>
                    <span style={styles.statLabel}>Microphone</span>
                    <span style={styles.statValue}>
                      {isMuted ? "Muted" : "Live"}
                    </span>
                  </div>

                  <div style={styles.statRow}>
                    <span style={styles.statLabel}>Camera</span>
                    <span style={styles.statValue}>
                      {isCameraEnabled ? "On" : "Off"}
                    </span>
                  </div>

                  <div style={styles.statRow}>
                    <span style={styles.statLabel}>Participants</span>
                    <span style={styles.statValue}>{remoteParticipantCount}</span>
                  </div>
                </div>

                <div style={styles.actionRow}>
                  <button
                    onClick={handleMuteAudio}
                    disabled={!isConnected || isMuted}
                    style={getButtonStyle("secondary", !isConnected || isMuted)}
                  >
                    Mute Mic
                  </button>

                  <button
                    onClick={handleUnmuteAudio}
                    disabled={!isConnected || !isMuted}
                    style={getButtonStyle("secondary", !isConnected || !isMuted)}
                  >
                    Unmute Mic
                  </button>

                  <button
                    onClick={handleUnblockVideo}
                    disabled={!isConnected || isCameraEnabled}
                    style={getButtonStyle(
                      "secondary",
                      !isConnected || isCameraEnabled
                    )}
                  >
                    Turn Camera On
                  </button>

                  <button
                    onClick={handleBlockVideo}
                    disabled={!isConnected || !isCameraEnabled}
                    style={getButtonStyle(
                      "secondary",
                      !isConnected || !isCameraEnabled
                    )}
                  >
                    Turn Camera Off
                  </button>

                  <button
                    onClick={handleLeave}
                    disabled={loading || !isConnected}
                    style={getButtonStyle("danger", loading || !isConnected)}
                  >
                    Leave Meeting
                  </button>
                </div>
              </div>

              {roleConfig.notesEnabled && (
                <div style={{ ...styles.card, ...styles.controlsCard }}>
                  <h3 style={styles.sectionTitle}>Clinician notes</h3>
                  <textarea
                    style={styles.notesArea}
                    placeholder="Add consultation notes here..."
                  />
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}