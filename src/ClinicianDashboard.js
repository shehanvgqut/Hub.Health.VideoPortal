import React from "react";
import "./ClinicianDashboard.css";

const scheduleItems = [
  {
    time: "09:00 AM",
    initial: "J",
    name: "John Doe",
    subtitle: "Follow-up consultation",
    type: "Hair loss",
    status: "Completed",
    statusTone: "completed"
  },
  {
    time: "10:30 AM",
    initial: "S",
    name: "Sarah Miller",
    subtitle: "Initial consultation",
    type: "Fatigue",
    status: "In Progress",
    statusTone: "progress"
  },
  {
    time: "11:30 AM",
    initial: "M",
    name: "Mike Johnson",
    subtitle: "Follow-up consultation",
    type: "Dizziness",
    status: "Upcoming",
    statusTone: "upcoming"
  },
  {
    time: "02:00 PM",
    initial: "E",
    name: "Emma Wilson",
    subtitle: "Initial consultation",
    type: "Acne",
    status: "Upcoming",
    statusTone: "upcoming"
  },
  {
    time: "03:30 PM",
    initial: "D",
    name: "David Thompson",
    subtitle: "Follow-up consultation",
    type: "Migraine",
    status: "Upcoming",
    statusTone: "upcoming"
  }
];

const recentConsultations = [
  {
    date: "May 15, 9:00 AM",
    name: "John Doe",
    subtitle: "Follow-up consultation",
    type: "Hair loss",
    status: "Completed"
  },
  {
    date: "May 15, 8:00 AM",
    name: "Lisa Chen",
    subtitle: "Initial consultation",
    type: "Fatigue",
    status: "Completed"
  },
  {
    date: "May 14, 4:30 PM",
    name: "Robert Brown",
    subtitle: "Follow-up consultation",
    type: "Dizziness",
    status: "Completed"
  },
  {
    date: "May 14, 2:00 PM",
    name: "Maria Garcia",
    subtitle: "Initial consultation",
    type: "Acne",
    status: "Completed"
  },
  {
    date: "May 13, 11:00 AM",
    name: "James Wilson",
    subtitle: "Follow-up consultation",
    type: "Migraine",
    status: "Completed"
  }
];

const navItems = [
  { label: "Dashboard", icon: HomeIcon, active: true },
  { label: "Consultations", icon: ClipboardIcon },
  { label: "Patients", icon: UsersIcon },
  { label: "Schedule", icon: CalendarIcon },
  { label: "Messages", icon: MessageIcon, badge: "2" },
  { label: "Reports", icon: ChartIcon },
  { label: "Settings", icon: SettingsIcon }
];

const stats = [
  {
    label: "Today's Consultations",
    value: "8",
    subtext: "2 upcoming",
    icon: CalendarIcon
  },
  {
    label: "Active Consultations",
    value: "1",
    subtext: "In progress",
    icon: VideoIcon
  },
  {
    label: "Total Patients",
    value: "124",
    subtext: "+5 this week",
    icon: UsersIcon
  },
  {
    label: "Completed Today",
    value: "5",
    subtext: "+2 from yesterday",
    icon: CheckIcon
  }
];

function IconBase({ children, className = "" }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.9"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {children}
    </svg>
  );
}

function HomeIcon({ className }) {
  return (
    <IconBase className={className}>
      <path d="M3.5 11.5 12 4l8.5 7.5" />
      <path d="M5.5 10.5V20h13v-9.5" />
      <path d="M9.5 20v-6h5v6" />
    </IconBase>
  );
}

function ClipboardIcon({ className }) {
  return (
    <IconBase className={className}>
      <path d="M9 5h6" />
      <path d="M9 4.5A2.5 2.5 0 0 1 11.5 2h1A2.5 2.5 0 0 1 15 4.5V6H9Z" />
      <path d="M7 5H5.5A2.5 2.5 0 0 0 3 7.5v11A2.5 2.5 0 0 0 5.5 21h13a2.5 2.5 0 0 0 2.5-2.5v-11A2.5 2.5 0 0 0 18.5 5H17" />
      <path d="M8 11h8" />
      <path d="M8 15h6" />
    </IconBase>
  );
}

function UsersIcon({ className }) {
  return (
    <IconBase className={className}>
      <path d="M16 19a4 4 0 0 0-8 0" />
      <circle cx="12" cy="8" r="3" />
      <path d="M21 19a3.6 3.6 0 0 0-4.2-3.6" />
      <path d="M17.5 5.2a2.6 2.6 0 0 1 0 5.1" />
    </IconBase>
  );
}

function CalendarIcon({ className }) {
  return (
    <IconBase className={className}>
      <path d="M7 3v4" />
      <path d="M17 3v4" />
      <rect x="4" y="5" width="16" height="16" rx="3" />
      <path d="M4 10h16" />
      <path d="M8 14h2" />
      <path d="M14 14h2" />
      <path d="M8 17h2" />
    </IconBase>
  );
}

function MessageIcon({ className }) {
  return (
    <IconBase className={className}>
      <path d="M4 6.5A3.5 3.5 0 0 1 7.5 3h9A3.5 3.5 0 0 1 20 6.5v5A3.5 3.5 0 0 1 16.5 15H11l-5 4v-4.4A3.5 3.5 0 0 1 4 11.5Z" />
    </IconBase>
  );
}

function ChartIcon({ className }) {
  return (
    <IconBase className={className}>
      <path d="M4 20V5" />
      <path d="M4 20h16" />
      <path d="M8 16v-5" />
      <path d="M12 16V8" />
      <path d="M16 16v-3" />
    </IconBase>
  );
}

function SettingsIcon({ className }) {
  return (
    <IconBase className={className}>
      <circle cx="12" cy="12" r="3" />
      <path d="M19.4 15a1.8 1.8 0 0 0 .36 1.98l.04.04a2.1 2.1 0 0 1-2.97 2.97l-.04-.04a1.8 1.8 0 0 0-1.98-.36 1.8 1.8 0 0 0-1.1 1.65V21.4a2.1 2.1 0 0 1-4.2 0v-.06a1.8 1.8 0 0 0-1.1-1.65 1.8 1.8 0 0 0-1.98.36l-.04.04a2.1 2.1 0 0 1-2.97-2.97l.04-.04A1.8 1.8 0 0 0 3.8 15a1.8 1.8 0 0 0-1.65-1.1H2.1a2.1 2.1 0 0 1 0-4.2h.06A1.8 1.8 0 0 0 3.8 8.6a1.8 1.8 0 0 0-.36-1.98L3.4 6.58a2.1 2.1 0 1 1 2.97-2.97l.04.04a1.8 1.8 0 0 0 1.98.36A1.8 1.8 0 0 0 9.5 2.36V2.1a2.1 2.1 0 0 1 4.2 0v.06a1.8 1.8 0 0 0 1.1 1.65 1.8 1.8 0 0 0 1.98-.36l.04-.04a2.1 2.1 0 0 1 2.97 2.97l-.04.04a1.8 1.8 0 0 0-.36 1.98 1.8 1.8 0 0 0 1.65 1.1h.06a2.1 2.1 0 0 1 0 4.2h-.06A1.8 1.8 0 0 0 19.4 15Z" />
    </IconBase>
  );
}

function VideoIcon({ className }) {
  return (
    <IconBase className={className}>
      <rect x="4" y="7" width="11" height="10" rx="2" />
      <path d="m15 11 5-3v8l-5-3" />
    </IconBase>
  );
}

function CheckIcon({ className }) {
  return (
    <IconBase className={className}>
      <path d="m6 12 4 4 8-8" />
    </IconBase>
  );
}

function SearchIcon({ className }) {
  return (
    <IconBase className={className}>
      <circle cx="11" cy="11" r="6" />
      <path d="m16 16 4 4" />
    </IconBase>
  );
}

function BellIcon({ className }) {
  return (
    <IconBase className={className}>
      <path d="M18 9a6 6 0 1 0-12 0c0 7-3 7-3 9h18c0-2-3-2-3-9" />
      <path d="M10 21h4" />
    </IconBase>
  );
}

function PlusIcon({ className }) {
  return (
    <IconBase className={className}>
      <path d="M12 5v14" />
      <path d="M5 12h14" />
    </IconBase>
  );
}

function LogoutIcon({ className }) {
  return (
    <IconBase className={className}>
      <path d="M10 17H5V7h5" />
      <path d="M14 8l4 4-4 4" />
      <path d="M8 12h10" />
    </IconBase>
  );
}

function Sidebar() {
  return (
    <aside className="sidebar">
      <h1 className="portal-title">Clinician Portal</h1>

      <nav className="sidebar-nav" aria-label="Main navigation">
        {navItems.map((item) => {
          const Icon = item.icon;

          return (
            <button
              className={`nav-item${item.active ? " is-active" : ""}`}
              type="button"
              key={item.label}
            >
              <Icon className="nav-icon" />
              <span>{item.label}</span>
              {item.badge ? <span className="nav-badge">{item.badge}</span> : null}
            </button>
          );
        })}
      </nav>

      <div className="sidebar-footer">
        <button className="new-consultation" type="button">
          <PlusIcon className="button-icon" />
          <span>New Consultation</span>
        </button>
        <button className="logout" type="button">
          <LogoutIcon className="logout-icon" />
          <span>Log out</span>
        </button>
      </div>
    </aside>
  );
}

function StatCard({ stat }) {
  const Icon = stat.icon;

  return (
    <section className="stat-card" aria-label={stat.label}>
      <div>
        <p className="stat-label">{stat.label}</p>
        <strong className="stat-value">{stat.value}</strong>
        <p className="stat-subtext">{stat.subtext}</p>
      </div>
      <div className="stat-icon-wrap">
        <Icon className="stat-icon" />
      </div>
    </section>
  );
}

function ConsultationPill({ children, tone = "completed" }) {
  return <span className={`consultation-pill ${tone}`}>{children}</span>;
}

function ScheduleRow({ item }) {
  return (
    <div className="schedule-row">
      <div className="schedule-time">{item.time}</div>
      <div className="patient-avatar">{item.initial}</div>
      <div className="patient-copy">
        <strong>{item.name}</strong>
        <span>{item.subtitle}</span>
      </div>
      <ConsultationPill tone="type">{item.type}</ConsultationPill>
      <ConsultationPill tone={item.statusTone}>{item.status}</ConsultationPill>
      <button className="row-arrow" type="button" aria-label={`Open ${item.name}`}>
        &gt;
      </button>
    </div>
  );
}

function RecentRow({ item }) {
  return (
    <div className="recent-row">
      <div className="recent-date">{item.date}</div>
      <strong className="recent-name">{item.name}</strong>
      <div className="recent-subtitle">{item.subtitle}</div>
      <ConsultationPill tone="type">{item.type}</ConsultationPill>
      <ConsultationPill tone="completed">{item.status}</ConsultationPill>
    </div>
  );
}

export default function ClinicianDashboard() {
  return (
    <main className="clinician-dashboard">
      <Sidebar />

      <section className="dashboard-main">
        <header className="topbar">
          <a className="back-to-waiting" href="/clinician">
            Back to Waiting Room
          </a>

          <div className="search-box">
            <SearchIcon className="search-icon" />
            <input aria-label="Search" placeholder="Search patients, consultations..." />
          </div>

          <button className="notification-button" type="button" aria-label="Notifications">
            <BellIcon className="bell-icon" />
            <span>3</span>
          </button>

          <div className="doctor-profile">
            <div className="doctor-copy">
              <strong>Dr. Sarah Lee</strong>
              <span>Clinician</span>
            </div>
            <div className="profile-avatar">SL</div>
          </div>
        </header>

        <section className="welcome-block">
          <h2>Welcome back, Dr. Sarah</h2>
          <p>Here's what's happening with your consultations today.</p>
        </section>

        <section className="stats-grid" aria-label="Dashboard stats">
          {stats.map((stat) => (
            <StatCard key={stat.label} stat={stat} />
          ))}
        </section>

        <section className="dashboard-panels">
          <div className="panel schedule-panel">
            <div className="panel-header">
              <h3>Today's Schedule</h3>
              <button type="button">View all</button>
            </div>

            <div className="schedule-list">
              {scheduleItems.map((item) => (
                <ScheduleRow item={item} key={`${item.time}-${item.name}`} />
              ))}
            </div>
          </div>

          <div className="panel recent-panel">
            <div className="panel-header">
              <h3>Recent Consultations</h3>
              <button type="button">View all</button>
            </div>

            <div className="recent-list">
              {recentConsultations.map((item) => (
                <RecentRow item={item} key={`${item.date}-${item.name}`} />
              ))}
            </div>
          </div>
        </section>
      </section>
    </main>
  );
}
