import VideoConsultation from "./VideoConsultation";

const clinicianConfig = {
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

export default function ClinicianPortal() {
  return <VideoConsultation roleConfig={clinicianConfig} />;
}
