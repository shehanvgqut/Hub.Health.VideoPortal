# Midnight Health Telehealth Video Consultation PoC

This repository contains a web-based telehealth Proof of Concept for Midnight Health. It provides separate patient and clinician experiences for joining a Microsoft Teams consultation through Azure Communication Services (ACS) from a custom React front end.

The current repository is a single React application. It does not include a local Node/Express backend; ACS tokens are requested from a configurable backend token endpoint.

## Tech Stack

- React 18
- Create React App / `react-scripts`
- Azure Communication Services Calling SDK
- Azure Communication Services Common SDK
- CSS and inline React styles
- Static hosting configuration for SPA fallback redirects

## Application Routes

The PoC uses route paths to choose which portal to render. There is no unified login screen in this version.

- `/` or `/patient` - Patient waiting room and consultation view
- `/clinician` - Clinician waiting room and consultation view
- `/clinician-dashboard` - Mock clinician dashboard with schedule, patient, and consultation summary data

Routing is implemented in `src/App.js` by inspecting `window.location.pathname`; React Router is not currently used.

## Core Features

- Patient and clinician portals with role-specific copy and controls
- ACS Calling SDK integration for joining a Microsoft Teams meeting link
- Configurable backend endpoint for secure ACS token generation
- Configurable Microsoft Teams meeting link
- Camera preview before joining a consultation
- Microphone mute/unmute and camera on/off controls
- Remote participant video rendering
- Call state, participant count, connection strength, and microphone input indicators
- Clinician-only notes field during a consultation
- Mock clinician dashboard data for schedules, recent consultations, and summary metrics

## Prerequisites

- Node.js 16 or higher
- npm 8 or higher
- An ACS-compatible backend token endpoint that returns an ACS user access token
- A Microsoft Teams meeting link supported by ACS Teams interoperability

## Local Setup

Install dependencies from the repository root:

```bash
npm install
```

Create a local `.env` file in the repository root. You can start from `.env.example`:

```bash
REACT_APP_BACKEND_TOKEN_URL=https://your-backend-domain.com/api/token
REACT_APP_TEAMS_MEETING_LINK=https://teams.microsoft.com/meet/your-meeting-link
```

Start the development server:

```bash
npm start
```

Open [http://localhost:3000](http://localhost:3000) in a browser.

## Backend Token Endpoint Contract

The React app sends a `POST` request to `REACT_APP_BACKEND_TOKEN_URL` with the selected display name:

```json
{
  "displayName": "Patient"
}
```

The endpoint must return JSON containing a `token` property:

```json
{
  "token": "acs_access_token"
}
```

ACS access tokens must be generated on the backend. Do not hardcode ACS connection strings or generated tokens in the React app.

## Available Scripts

```bash
npm start
```

Runs the app locally in development mode.

```bash
npm test
```

Starts the Create React App test runner.

```bash
npm run build
```

Creates a production build in the `build` directory.

## Deployment Notes

The repository includes `vercel.json`, `_redirects`, and `public/_redirects` so static hosts can serve the React app for deep links such as `/clinician` and `/clinician-dashboard`.

For production-like deployments, configure the following environment variables in the hosting provider:

- `REACT_APP_BACKEND_TOKEN_URL`
- `REACT_APP_TEAMS_MEETING_LINK`

## Known Limitations

- This repository does not include the token-generation backend. A compatible backend service must be deployed separately.
- Clinical notes, schedules, patient details, and dashboard metrics are mock front-end data.
- The app does not implement authentication or authorization.
- The app currently uses path-based portal selection instead of React Router.
- Only Teams work/school meeting links supported by ACS are accepted. Teams personal/life meeting links are rejected.
- In some enterprise Microsoft Teams tenants, an organizer may need to start or admit participants before external ACS users can join successfully.

## Security and Privacy Notes

- ACS tokens are fetched dynamically from a backend endpoint and should not be stored in source control.
- Camera and microphone access require browser permission before previewing or joining.
- Local and remote video renderers are disposed when leaving a call.
- Call media state is reset when the consultation component unmounts or the participant leaves the meeting.
