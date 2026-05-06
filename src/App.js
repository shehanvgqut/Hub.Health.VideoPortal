import ClinicianPortal from "./ClinicianPortal";
import PatientPortal from "./PatientPortal";

export default function App() {
  const path = window.location.pathname.toLowerCase();

  if (path.includes("clinician")) {
    return <ClinicianPortal />;
  }

  return <PatientPortal />;
}
