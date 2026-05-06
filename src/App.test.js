import { render, screen } from "@testing-library/react";
import App from "./App";

jest.mock("./VideoCall", () => ({
  isVideoStarted: jest.fn(() => false),
  joinCall: jest.fn(),
  leaveCall: jest.fn(),
  muteMyAudio: jest.fn(),
  startLocalPreview: jest.fn(() => Promise.resolve()),
  startMyVideo: jest.fn(),
  stopLocalPreview: jest.fn(() => Promise.resolve()),
  stopMyVideo: jest.fn(),
  unmuteMyAudio: jest.fn()
}));

function setPath(path) {
  window.history.pushState({}, "", path);
}

test("renders the patient portal by default", () => {
  setPath("/");

  render(<App />);

  expect(screen.getByText("Patient portal")).toBeInTheDocument();
  expect(screen.getByRole("heading", { name: "Consultation Waiting Room" }))
    .toBeInTheDocument();
});

test("renders the clinician portal on clinician routes", () => {
  setPath("/clinician");

  render(<App />);

  expect(screen.getByText("Clinician portal")).toBeInTheDocument();
  expect(screen.getByRole("heading", { name: "Clinician Waiting Room" }))
    .toBeInTheDocument();
});
