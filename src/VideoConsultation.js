import React, { useEffect, useMemo, useRef, useState } from "react";
import {
  joinCall,
  leaveCall,
  muteMyAudio,
  refreshMyVideoPreview,
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
    background: "#EDE5DD",
    padding: "32px 20px",
    fontFamily: '"Poppins", Arial, "Segoe UI", Roboto, sans-serif',
    fontWeight: 500
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
  meetingHero: {
    padding: "22px 40px 18px 40px"
  },
  eyebrow: {
    display: "inline-flex",
    alignItems: "center",
    gap: "8px",
    padding: "8px 14px",
    borderRadius: "999px",
    fontSize: "13px",
    fontWeight: 500,
    color: "#114b8b",
    background: "#e8f1ff",
    border: "1px solid #d3e2ff",
    marginBottom: "18px",
    textTransform: "uppercase",
    letterSpacing: "0.08em"
  },
  title: {
    flex: "1 1 auto",
    minWidth: "260px",
    margin: 0,
    fontSize: "54px",
    lineHeight: 1,
    color: "#0f172a",
    letterSpacing: "-1.8px",
    fontWeight: 500
  },
  meetingTitle: {
    fontSize: "42px",
    lineHeight: 1.05
  },
  titleRow: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    gap: "18px",
    flexWrap: "wrap"
  },
  dashboardLink: {
    flex: "0 0 auto",
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    minHeight: "38px",
    padding: "9px 16px",
    borderRadius: "14px",
    background: "#DD8E75",
    color: "#fff",
    fontSize: "15px",
    fontFamily: "inherit",
    fontWeight: 500,
    textDecoration: "none",
    boxShadow: "0 8px 18px rgba(221, 142, 117, 0.22)"
  },
  subtitle: {
    marginTop: "14px",
    marginBottom: 0,
    fontSize: "19px",
    lineHeight: 1.6,
    color: "#526075",
    maxWidth: "800px"
  },
  meetingSubtitle: {
    marginTop: "10px",
    fontSize: "16px",
    lineHeight: 1.45,
    maxWidth: "720px"
  },
  topBar: {
    padding: "22px 40px 0 40px"
  },
  meetingTopBar: {
    padding: "14px 40px 0 40px"
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
    fontWeight: 500
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
    gridTemplateColumns: "minmax(0, 1fr) 330px",
    gap: "20px",
    padding: "18px 40px 32px 40px",
    alignItems: "start"
  },
  card: {
    background: "#F7EFE7",
    border: "1px solid #E8C9BA",
    borderRadius: "26px",
    boxShadow: "0 14px 38px rgba(221, 142, 117, 0.12)"
  },
  sectionCard: {
    padding: "24px"
  },
  sectionTitle: {
    marginTop: 0,
    marginBottom: "12px",
    fontSize: "26px",
    color: "#111827",
    letterSpacing: "-0.4px",
    fontWeight: 500
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
    background: "#DD8E75",
    color: "#fff",
    fontSize: "16px",
    fontFamily: "inherit",
    fontWeight: 500,
    cursor: "pointer",
    boxShadow: "0 10px 22px rgba(221, 142, 117, 0.22)"
  },
  secondaryButton: {
    padding: "14px 22px",
    borderRadius: "16px",
    border: "1px solid #dbe1ea",
    background: "#DD8E75",
    color: "#172033",
    fontSize: "16px",
    fontFamily: "inherit",
    fontWeight: 500,
    cursor: "pointer"
  },
  dangerButton: {
    padding: "14px 22px",
    borderRadius: "16px",
    border: "1px solid #ffd2d2",
    background: "#DD8E75",
    color: "#d92d20",
    fontSize: "16px",
    fontFamily: "inherit",
    fontWeight: 500,
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
    gap: "8px",
    marginTop: "14px"
  },
  statRow: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    gap: "10px",
    padding: "9px 12px",
    borderRadius: "12px",
    background: "#fff8f3",
    border: "1px solid #efd1c3"
  },
  statLabel: {
    fontSize: "13px",
    fontWeight: 500,
    color: "#667085"
  },
  statValue: {
    fontSize: "14px",
    fontWeight: 500,
    color: "#111827"
  },
  metricGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(2, minmax(0, 1fr))",
    gap: "10px",
    marginTop: "12px"
  },
  metricButton: {
    width: "100%",
    minHeight: "84px",
    padding: "11px 12px",
    borderRadius: "12px",
    border: "1px solid #efd1c3",
    background: "#fff8f3",
    color: "#172033",
    fontFamily: "inherit",
    fontWeight: 500,
    cursor: "default",
    textAlign: "left"
  },
  metricLabel: {
    display: "block",
    fontSize: "12px",
    color: "#667085"
  },
  metricValue: {
    display: "block",
    marginTop: "6px",
    fontSize: "20px",
    lineHeight: 1,
    color: "#111827"
  },
  remoteFrame: {
    minHeight: "min(58vh, 560px)",
    borderRadius: "28px",
    background: "linear-gradient(180deg, #0c111b 0%, #111827 100%)",
    overflow: "hidden",
    border: "1px solid #1f2937",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    position: "relative",
    flexDirection: "column"
  },
  remoteVideosHost: {
    width: "100%",
    minHeight: "min(58vh, 560px)",
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
    padding: "20px",
    position: "absolute",
    inset: 0,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    margin: "0 auto"
  },
  localTile: {
    width: "100%",
    minHeight: "170px",
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
    gap: "14px",
    position: "sticky",
    top: "14px"
  },
  controlsCard: {
    padding: "20px",
    borderRadius: "22px"
  },
  controlsTitle: {
    marginTop: 0,
    marginBottom: "14px",
    fontSize: "24px",
    lineHeight: 1.15,
    color: "#0f172a",
    fontWeight: 500
  },
  controlsActionRow: {
    display: "grid",
    gridTemplateColumns: "repeat(2, minmax(0, 1fr))",
    gap: "10px",
    marginTop: "16px"
  },
  controlsButton: {
    minHeight: "48px",
    width: "100%",
    padding: "10px 12px",
    borderRadius: "12px",
    fontSize: "14px"
  },
  controlsDangerButton: {
    gridColumn: "1 / -1",
    background: "#d92d20",
    color: "#fff",
    border: "1px solid #d92d20",
    boxShadow: "0 10px 22px rgba(217, 45, 32, 0.18)"
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

function getConnectionMetrics() {
  if (typeof navigator === "undefined") {
    return {
      value: "Unavailable",
      detail: "Browser network estimate unavailable"
    };
  }

  if (!navigator.onLine) {
    return {
      value: "Offline",
      detail: "Offline"
    };
  }

  const connection =
    navigator.connection || navigator.mozConnection || navigator.webkitConnection;

  if (!connection) {
    return {
      value: "Unavailable",
      detail: "Browser network estimate unavailable"
    };
  }

  const downlink =
    typeof connection.downlink === "number" ? connection.downlink : null;
  const rtt = typeof connection.rtt === "number" ? connection.rtt : null;
  const effectiveType = connection.effectiveType || "online";

  const downlinkScore =
    downlink === null ? 75 : Math.min(100, Math.round((downlink / 10) * 100));
  const rttScore = rtt === null ? 75 : Math.max(0, 100 - Math.round(rtt / 4));
  const score = Math.round((downlinkScore + rttScore) / 2);
  const detail = [
    downlink === null ? null : `${downlink} Mbps`,
    rtt === null ? null : `${rtt} ms`,
    effectiveType
  ]
    .filter(Boolean)
    .join(" | ");

  return {
    value: `${score}% estimate`,
    detail
  };
}

export default function VideoConsultation({ roleConfig }) {
  const config = useMemo(() => roleConfig, [roleConfig]);

  const [screen, setScreen] = useState("waiting");
  const [status, setStatus] = useState("Ready");
  const [callState, setCallState] = useState("None");
  const [isMuted, setIsMuted] = useState(false);
  const [remoteParticipantCount, setRemoteParticipantCount] = useState(0);
  const [hasRemoteVideo, setHasRemoteVideo] = useState(false);
  const [loading, setLoading] = useState(false);
  const [isCameraEnabled, setIsCameraEnabled] = useState(true);
  const [shouldAutoJoin, setShouldAutoJoin] = useState(false);
  const [connectionMetrics, setConnectionMetrics] = useState(
    getConnectionMetrics
  );
  const [callQualityMetrics, setCallQualityMetrics] = useState(null);
  const [microphoneLevel, setMicrophoneLevel] = useState(0);
  const [microphoneStatus, setMicrophoneStatus] = useState("Live input");

  const localVideoRef = useRef(null);
  const remoteVideosRef = useRef(null);

  useEffect(() => {
    const updateConnectionMetrics = () => {
      setConnectionMetrics(getConnectionMetrics());
    };
    const connection =
      navigator.connection ||
      navigator.mozConnection ||
      navigator.webkitConnection;

    updateConnectionMetrics();
    window.addEventListener("online", updateConnectionMetrics);
    window.addEventListener("offline", updateConnectionMetrics);
    connection?.addEventListener?.("change", updateConnectionMetrics);

    return () => {
      window.removeEventListener("online", updateConnectionMetrics);
      window.removeEventListener("offline", updateConnectionMetrics);
      connection?.removeEventListener?.("change", updateConnectionMetrics);
    };
  }, []);

  useEffect(() => {
    if (isMuted) {
      setMicrophoneLevel(0);
      setMicrophoneStatus("Muted");
      return undefined;
    }

    let animationFrame = null;
    let audioContext = null;
    let mediaStream = null;
    let cancelled = false;
    let lastUpdate = 0;

    async function measureMicrophoneLevel() {
      if (!navigator.mediaDevices?.getUserMedia) {
        setMicrophoneLevel(0);
        setMicrophoneStatus("Unavailable");
        return;
      }

      try {
        mediaStream = await navigator.mediaDevices.getUserMedia({ audio: true });
        setMicrophoneStatus("Live input");

        if (cancelled) {
          mediaStream.getTracks().forEach((track) => track.stop());
          return;
        }

        const AudioContextClass = window.AudioContext || window.webkitAudioContext;
        audioContext = new AudioContextClass();

        const analyser = audioContext.createAnalyser();
        const source = audioContext.createMediaStreamSource(mediaStream);
        const data = new Uint8Array(analyser.fftSize);

        analyser.fftSize = 2048;
        source.connect(analyser);

        const tick = (timestamp) => {
          analyser.getByteTimeDomainData(data);

          let sum = 0;
          for (let index = 0; index < data.length; index += 1) {
            const sample = (data[index] - 128) / 128;
            sum += sample * sample;
          }

          if (timestamp - lastUpdate > 150) {
            const rms = Math.sqrt(sum / data.length);
            setMicrophoneLevel(Math.min(100, Math.round(rms * 260)));
            lastUpdate = timestamp;
          }

          animationFrame = requestAnimationFrame(tick);
        };

        animationFrame = requestAnimationFrame(tick);
      } catch (error) {
        console.warn("Microphone strength unavailable:", error);
        setMicrophoneLevel(0);
        setMicrophoneStatus("Unavailable");
      }
    }

    measureMicrophoneLevel();

    return () => {
      cancelled = true;

      if (animationFrame) {
        cancelAnimationFrame(animationFrame);
      }

      mediaStream?.getTracks().forEach((track) => track.stop());
      audioContext?.close?.();
    };
  }, [isMuted]);

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

        await startLocalPreview(localVideoRef.current, config.displayName);

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
  }, [isCameraEnabled, screen, config.displayName]);

  useEffect(() => {
    if (screen !== "meeting" || !remoteVideosRef.current) {
      setHasRemoteVideo(false);
      return undefined;
    }

    const remoteVideosElement = remoteVideosRef.current;
    const syncRemoteVideoState = () => {
      setHasRemoteVideo(remoteVideosElement.childElementCount > 0);
    };

    syncRemoteVideoState();

    const observer = new MutationObserver(syncRemoteVideoState);
    observer.observe(remoteVideosElement, {
      childList: true
    });

    return () => {
      observer.disconnect();
    };
  }, [screen]);

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
          displayName: config.displayName,
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
              setHasRemoteVideo(false);
              setCallQualityMetrics(null);
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
          },
          onCallQualityChanged: (metrics) => {
            if (!cancelled) {
              setCallQualityMetrics(metrics);
            }
          },
          onRemoteVideoChanged: (remoteVideoAvailable) => {
            if (!cancelled) {
              setHasRemoteVideo(Boolean(remoteVideoAvailable));
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
    config.displayName
  ]);

  useEffect(() => {
    return () => {
      Promise.resolve(stopLocalPreview()).catch((error) => {
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
      setHasRemoteVideo(false);
      setCallQualityMetrics(null);
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
        await startLocalPreview(localVideoRef.current, config.displayName);
        setIsCameraEnabled(true);
        setStatus("Camera preview turned on.");
      } catch (error) {
        console.error(error);
        setStatus(error.message || "Could not turn on camera preview.");
      }
      return;
    }

    try {
      await startMyVideo(localVideoRef.current);

      window.setTimeout(() => {
        const localVideoElement = localVideoRef.current;

        if (localVideoElement) {
          refreshMyVideoPreview(localVideoElement).catch((error) => {
            console.warn("Could not refresh local video preview:", error);
          });
        }
      }, 250);

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
  const displayedConnectionMetrics = callQualityMetrics || connectionMetrics;
  const connectionStrengthText = displayedConnectionMetrics.value;
  const microphoneStrengthText = `${microphoneLevel}%`;
  const currentPath =
    typeof window === "undefined" ? "" : window.location.pathname.toLowerCase();
  const isClinicianWaitingRoute =
    currentPath.replace(/\/$/, "") === "/clinician";

  const getButtonStyle = (type, disabled = false) => {
    const base =
      type === "primary"
        ? styles.primaryButton
        : type === "danger"
        ? styles.dangerButton
        : styles.secondaryButton;

    return disabled ? { ...base, ...styles.disabledButton } : base;
  };

  const getControlsButtonStyle = (type, disabled = false) => ({
    ...getButtonStyle(type, disabled),
    ...styles.controlsButton,
    ...(type === "danger" ? styles.controlsDangerButton : {})
  });

  const renderStrengthMetrics = () => (
    <div style={styles.metricGrid}>
      <button type="button" style={styles.metricButton}>
        <span style={styles.metricLabel}>
          {callQualityMetrics ? "Call connection quality" : "Connection estimate"}
        </span>
        <span style={styles.metricValue}>{connectionStrengthText}</span>
        <span style={styles.metricLabel}>{displayedConnectionMetrics.detail}</span>
      </button>

      <button type="button" style={styles.metricButton}>
        <span style={styles.metricLabel}>Microphone input level</span>
        <span style={styles.metricValue}>{microphoneStrengthText}</span>
        <span style={styles.metricLabel}>{microphoneStatus}</span>
      </button>
    </div>
  );

  return (
    <div style={styles.page}>
      <div style={styles.shell}>
        <div
          style={{
            ...styles.hero,
            ...(screen === "meeting" ? styles.meetingHero : {})
          }}
        >
          <div style={styles.eyebrow}>
            {screen === "waiting"
              ? config.waitingEyebrow
              : config.meetingEyebrow}
          </div>

          <div style={styles.titleRow}>
            <h1
              style={{
                ...styles.title,
                ...(screen === "meeting" ? styles.meetingTitle : {})
              }}
            >
              {screen === "waiting"
                ? config.waitingTitle
                : config.meetingTitle}
            </h1>

            {screen === "waiting" && isClinicianWaitingRoute && config.dashboardPath ? (
              <a href={config.dashboardPath} style={styles.dashboardLink}>
                Dashboard
              </a>
            ) : null}
          </div>

          <p
            style={{
              ...styles.subtitle,
              ...(screen === "meeting" ? styles.meetingSubtitle : {})
            }}
          >
            {screen === "waiting"
              ? config.waitingSubtitle
              : config.meetingSubtitle}
          </p>
        </div>

        <div
          style={{
            ...styles.topBar,
            ...(screen === "meeting" ? styles.meetingTopBar : {})
          }}
        >
          <div style={styles.statusWrap}>
            <div style={{ ...styles.statusPill, ...statusStyle }}>{status}</div>

            <p style={styles.helperText}>
              {screen === "waiting"
                ? "Join when you are ready"
                : remoteParticipantCount > 0
                ? "Participant connected"
                : config.waitingRemoteText}
            </p>
          </div>
        </div>

        {screen === "waiting" ? (
          <div style={styles.waitingGrid}>
            <div style={styles.previewPanel}>
              <div style={{ ...styles.card, ...styles.sectionCard }}>
                <h3 style={styles.sectionTitle}>{config.previewTitle}</h3>
                <p style={styles.bodyText}>{config.previewDescription}</p>

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
                <h3 style={styles.sectionTitle}>{config.sideTitle}</h3>
                <p style={styles.bodyText}>{config.sideDescription}</p>

                <div style={styles.statList}>
                  <div style={styles.statRow}>
                    <span style={styles.statLabel}>Role</span>
                    <span style={styles.statValue}>{config.displayName}</span>
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

                {renderStrengthMetrics()}

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
                    {config.joinButton}
                  </button>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div style={styles.meetingGrid}>
            <div style={{ ...styles.card, ...styles.sectionCard }}>
              <h3 style={styles.sectionTitle}>{config.remoteTitle}</h3>

              <div style={{ ...styles.remoteFrame, marginTop: "20px" }}>
                <div ref={remoteVideosRef} style={styles.remoteVideosHost} />

                {!hasRemoteVideo && (
                  <div style={styles.emptyState}>
                    No remote participant video yet. Once the other person joins
                    with their camera on, the video will appear here.
                  </div>
                )}
              </div>
            </div>

            <div style={styles.meetingSidebar}>
              <div style={{ ...styles.card, ...styles.controlsCard }}>
                <h3 style={styles.controlsTitle}>Meeting controls</h3>

                <div style={styles.statList}>
                  <div style={styles.statRow}>
                    <span style={styles.statLabel}>Role</span>
                    <span style={styles.statValue}>{config.displayName}</span>
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

                {renderStrengthMetrics()}

                <div style={styles.controlsActionRow}>
                  <button
                    onClick={handleMuteAudio}
                    disabled={!isConnected || isMuted}
                    style={getControlsButtonStyle(
                      "secondary",
                      !isConnected || isMuted
                    )}
                  >
                    Mute Mic
                  </button>

                  <button
                    onClick={handleUnmuteAudio}
                    disabled={!isConnected || !isMuted}
                    style={getControlsButtonStyle(
                      "secondary",
                      !isConnected || !isMuted
                    )}
                  >
                    Unmute Mic
                  </button>

                  <button
                    onClick={handleUnblockVideo}
                    disabled={!isConnected || isCameraEnabled}
                    style={getControlsButtonStyle(
                      "secondary",
                      !isConnected || isCameraEnabled
                    )}
                  >
                    Turn Camera On
                  </button>

                  <button
                    onClick={handleBlockVideo}
                    disabled={!isConnected || !isCameraEnabled}
                    style={getControlsButtonStyle(
                      "secondary",
                      !isConnected || !isCameraEnabled
                    )}
                  >
                    Turn Camera Off
                  </button>

                  <button
                    onClick={handleLeave}
                    disabled={loading || !isConnected}
                    style={getControlsButtonStyle("danger", loading || !isConnected)}
                  >
                    Leave Meeting
                  </button>
                </div>
              </div>

              <div style={{ ...styles.card, ...styles.controlsCard }}>
                <h3 style={styles.sectionTitle}>{config.localTitle}</h3>
                <div ref={localVideoRef} style={styles.localTile}>
                  {!isCameraEnabled ? "Your camera is off" : null}
                </div>
              </div>

              {config.notesEnabled && (
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
