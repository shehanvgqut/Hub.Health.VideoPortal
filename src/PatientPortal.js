import VideoConsultation from "./VideoConsultation";

const patientConfig = {
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

export default function PatientPortal() {
  return <VideoConsultation roleConfig={patientConfig} />;
}
