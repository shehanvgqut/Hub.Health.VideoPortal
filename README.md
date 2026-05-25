# Video Portal

A React-based video consultation portal for patient and clinician telehealth workflows. The app uses Azure Communication Services calling to join a Microsoft Teams meeting, render local and remote video, manage microphone/camera state, and show consultation status.

## Features

- Patient waiting room and video consultation view
- Clinician waiting room and video consultation view
- Clinician dashboard with schedule, statistics, and recent consultations
- Microsoft Teams meeting join through Azure Communication Services
- Local camera preview before joining a consultation
- Microphone mute/unmute and camera start/stop controls
- Remote participant video rendering
- Network quality status using ACS user-facing diagnostics

## Tech Stack

- React 18
- Create React App / `react-scripts`
- Azure Communication Services Calling SDK
- Azure Communication Common SDK

## Project Structure

```text
src/
  App.js                    Route selection for patient, clinician, and dashboard views
  PatientPortal.js          Patient role configuration
  ClinicianPortal.js        Clinician role configuration
  ClinicianDashboard.js     Clinician dashboard UI
  VideoConsultation.js      Shared consultation screen and controls
  VideoCall.js              Azure Communication Services call integration
```

## Routes

The app selects the view based on the browser path:

- `/` - Patient portal
- `/clinician` - Clinician portal
- `/clinician-dashboard` - Clinician dashboard

Deployed routes:

- Patient portal: [https://hub-health-videoportal.onrender.com/patient](https://hub-health-videoportal.onrender.com/patient)
- Clinician portal: [https://hub-health-videoportal.onrender.com/clinician](https://hub-health-videoportal.onrender.com/clinician)

## Environment Variables

Create a `.env` file in the project root. You can use `.env.example` as a starting point.

```env
REACT_APP_BACKEND_TOKEN_URL=https://hub-health-portalbackend.onrender.com/api/token
REACT_APP_TEAMS_MEETING_LINK=https://teams.microsoft.com/meet/4470884700236?p=Y8W0rDN1XnfjP9JjnN
```

`REACT_APP_BACKEND_TOKEN_URL` must point to a backend endpoint that returns an Azure Communication Services access token. `REACT_APP_TEAMS_MEETING_LINK` must be a supported Microsoft Teams meeting link.

## Installation

Install dependencies:

```bash
npm install
```

## Running Locally

Start the development server:

```bash
npm start
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Available Scripts

```bash
npm start
```

Runs the app in development mode.

```bash
npm test
```

Launches the test runner in interactive watch mode.

```bash
npm run build
```

Builds the app for production into the `build` folder.

## Deployment

Live app: [https://hub-health-videoportal.onrender.com/](https://hub-health-videoportal.onrender.com/)

This project includes `vercel.json` and `_redirects` files for single-page app routing support. For production deployment, make sure the environment variables are configured in the hosting provider as well as locally.

## Notes

- Browser camera and microphone permissions are required for consultations.
- Teams personal/life meeting links are not supported by the current call validation.
- The ACS token backend must support `POST` requests with a JSON body containing `displayName`.
