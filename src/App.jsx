import React, { useState, useEffect } from "react";
import {
  LayoutDashboard,
  Cpu,
  KeyRound,
  ShieldAlert,
  Sliders,
  BarChart2,
  FileText,
  Award,
  Bell,
  Settings,
  User,
  AlertTriangle,
  RefreshCw,
  Search,
  Check,
  Copy,
  Terminal,
  Lock,
  ShieldCheck,
  XCircle,
  Clock,
  Radio,
  Power,
  RotateCw,
  Network,
  Plus,
  Trash2,
  Send,
  Key,
  Fingerprint,
  Edit2,
  Save,
  Smartphone,
  Shield,
  CheckCircle2,
  ChevronRight,
  Sun,
  Moon
} from "lucide-react";

export default function App() {
  const [theme, setTheme] = useState("dark");
  const isDark = theme === "dark";

  const [activeTab, setActiveTab] = useState("overview");
  const [anomalyActive, setAnomalyActive] = useState(false);
  const [copiedFingerprint, setCopiedFingerprint] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [logFilter, setLogFilter] = useState("ALL");
  const [tokenTTL, setTokenTTL] = useState(142);

  // Device Control Toggles State
  const [fleetLockout, setFleetLockout] = useState(false);
  const [autoRotate, setAutoRotate] = useState(true);
  const [dynamicCrlSync, setDynamicCrlSync] = useState(true);

  // Settings Tab State
  const [brokerIp, setBrokerIp] = useState("10.50.250.104");
  const [brokerPort, setBrokerPort] = useState("8883");
  const [tlsStrict, setTlsStrict] = useState(true);
  const [requireClientCert, setRequireClientCert] = useState(true);
  const [entropyFilter, setEntropyFilter] = useState(true);
  const [webhookUrl, setWebhookUrl] = useState("https://hooks.slack.com/services/T00/B00/X00AuthSphere");
  const [webhookSent, setWebhookSent] = useState(false);
  const [apiKeys, setApiKeys] = useState([
    { id: "key_live_9f81a42", name: "Production Ingestion Node", created: "2026-08-14", status: "Active" },
    { id: "key_live_3c21b90", name: "Grafana Telemetry Stream", created: "2026-09-02", status: "Active" }
  ]);
  const [newKeyName, setNewKeyName] = useState("");

  // Profile Tab State
  const [isEditingProfile, setIsEditingProfile] = useState(false);
  const [profileSuccess, setProfileSuccess] = useState(false);
  const [profileData, setProfileData] = useState({
    fullName: "SecOps Lead",
    roleTitle: "Principal Security Engineer",
    email: "secops@authsphere.internal",
    emergencyContact: "+1 (555) 019-2834",
    organization: "Enterprise Mesh Ops"
  });
  const [editForm, setEditForm] = useState({ ...profileData });
  const [totpEnabled, setTotpEnabled] = useState(true);
  const [sessionFingerprint, setSessionFingerprint] = useState("sha256:4a8e91b2c4d0...e839");
  const [keyRotated, setKeyRotated] = useState(false);
  const [sessions, setSessions] = useState([
    {
      id: "sess_curr",
      device: "Browser Console (Current)",
      ip: "10.50.250.10",
      client: "Chrome 128 (Windows NT)",
      isCurrent: true,
      activeTime: "Now"
    },
    {
      id: "sess_cli",
      device: "CLI Operator Daemon",
      ip: "10.50.250.104",
      client: "authsphere-cli / SSH ed25519",
      isCurrent: false,
      activeTime: "12m ago"
    },
    {
      id: "sess_mobile",
      device: "Mobile Security Hub",
      ip: "172.16.42.8",
      client: "iOS 18 / Safari PWA",
      isCurrent: false,
      activeTime: "1h ago"
    }
  ]);

  // Helper for dynamic initials
  const getInitials = (name) => {
    if (!name) return "SA";
    const parts = name.trim().split(" ");
    if (parts.length >= 2) {
      return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
    }
    return name.slice(0, 2).toUpperCase();
  };

  // Dynamic TTL countdown
  useEffect(() => {
    const timer = setInterval(() => {
      setTokenTTL((prev) => (prev <= 1 ? 180 : prev - 1));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // Hardware Fleet Nodes
  const [devices, setDevices] = useState([
    {
      id: "SNX-ESP32-0002",
      sku: "ESP32-WROOM-32D",
      ip: "10.50.250.175",
      protocol: "ECC-secp256r1",
      trustScore: 99,
      status: "ACTIVE",
      serial: "SNX-002-8F92",
      arch: "Xtensa 32-bit LX6"
    },
    {
      id: "SNX-ESP32-0004",
      sku: "ESP32-S3-DevKit",
      ip: "10.50.250.200",
      protocol: "ECC-secp256r1",
      trustScore: 97,
      status: "ACTIVE",
      serial: "SNX-004-1C04",
      arch: "Xtensa Dual-Core LX7 + AI"
    },
    {
      id: "SNX-GW-RPI4-01",
      sku: "Raspberry Pi 4 Model B",
      ip: "10.50.250.101",
      protocol: "TLS 1.3 / SHA-256",
      trustScore: 100,
      status: "ACTIVE",
      serial: "SNX-GW1-E742",
      arch: "ARM Cortex-A72 Gateway"
    },
    {
      id: "SNX-ESP32-0001",
      sku: "ESP32-C3-MINI",
      ip: "10.50.250.112",
      protocol: "ECC-secp256r1",
      trustScore: 0,
      status: "REVOKED",
      serial: "SNX-001-09B1",
      arch: "RISC-V 32-bit Core"
    }
  ]);

  // Telemetry Audit Events
  const [auditLogs, setAuditLogs] = useState([
    {
      id: 1,
      time: "20:08:12",
      level: "INFO",
      source: "mTLS-CA",
      message: "Mutual TLS handshake verified via ECC-secp256r1 for SNX-ESP32-0002. Latency: 34.2 ms."
    },
    {
      id: 2,
      time: "20:07:45",
      level: "AI-EVAL",
      source: "Nakshatra-DPI",
      message: "Gemini 2.0 Flash deep packet entropy scan clean on topic 'telemetry/v1/stream'. Shannon score: 7.92."
    },
    {
      id: 3,
      time: "20:06:02",
      level: "INFO",
      source: "Mosquitto",
      message: "Dynamic ACL verified for gateway SNX-GW-RPI4-01. Port 8883 transport nominal."
    }
  ]);

  // Incident Queue
  const [alerts, setAlerts] = useState([
    {
      id: "ALT-9041",
      timestamp: "18:24:10",
      severity: "LOW",
      target: "SNX-ESP32-0001",
      title: "Certificate Revocation Enforced",
      description: "Node serial SNX-001-09B1 pushed to crl.pem. Broker transport blocked.",
      status: "CONTAINED"
    }
  ]);

  // Attack Trigger: Simulate DLP Anomaly
  const toggleAnomaly = () => {
    if (!anomalyActive) {
      setAnomalyActive(true);
      setDevices((prev) =>
        prev.map((d) =>
          d.id === "SNX-ESP32-0004"
            ? { ...d, status: "QUARANTINED", trustScore: 12 }
            : d
        )
      );

      const criticalMsg =
        "CRITICAL [Nakshatra-DLP] Unencrypted Credit Card PAN detected on topic 'telemetry/v1/stream'! Node SNX-ESP32-0004 isolated via Mosquitto ACL-403.";

      setAuditLogs((prev) => [
        {
          id: Date.now(),
          time: new Date().toLocaleTimeString(),
          level: "CRITICAL",
          source: "Nakshatra-DLP",
          message: criticalMsg
        },
        ...prev
      ]);

      setAlerts((prev) => [
        {
          id: `ALT-${Date.now().toString().slice(-4)}`,
          timestamp: new Date().toLocaleTimeString(),
          severity: "CRITICAL",
          target: "SNX-ESP32-0004",
          title: "Credit Card PAN DLP Violation",
          description: "Unencrypted PAN string identified by regex matcher. Device auto-quarantined via ACL-403.",
          status: "ACTIVE QUARANTINE"
        },
        ...prev
      ]);
    } else {
      setAnomalyActive(false);
      setDevices((prev) =>
        prev.map((d) =>
          d.id === "SNX-ESP32-0004"
            ? { ...d, status: "ACTIVE", trustScore: 97 }
            : d
        )
      );

      setAuditLogs((prev) => [
        {
          id: Date.now(),
          time: new Date().toLocaleTimeString(),
          level: "INFO",
          source: "Zero-Touch",
          message: "Zero-Touch re-attestation passed. Root trust restored for node SNX-ESP32-0004."
        },
        ...prev
      ]);

      setAlerts((prev) =>
        prev.map((a) =>
          a.target === "SNX-ESP32-0004" ? { ...a, status: "RESOLVED" } : a
        )
      );
    }
  };

  // Revoke device handler
  const handleRevokeDevice = (id) => {
    setDevices((prev) =>
      prev.map((d) => (d.id === id ? { ...d, status: "REVOKED", trustScore: 0 } : d))
    );
    setAuditLogs((prev) => [
      {
        id: Date.now(),
        time: new Date().toLocaleTimeString(),
        level: "CRITICAL",
        source: "PKI-CRL",
        message: `Node ${id} certificate explicitly revoked. Added to Mosquitto crl.pem ring.`
      },
      ...prev
    ]);
  };

  // Profile Save
  const handleSaveProfile = (e) => {
    e.preventDefault();
    setProfileData({ ...editForm });
    setIsEditingProfile(false);
    setProfileSuccess(true);
    setTimeout(() => setProfileSuccess(false), 2500);
  };

  // Rotate Session Key
  const handleRotateSessionKey = () => {
    const randomHex = Array.from({ length: 16 }, () =>
      Math.floor(Math.random() * 16).toString(16)
    ).join("");
    setSessionFingerprint(`sha256:${randomHex}...${Math.floor(Math.random() * 9000 + 1000)}`);
    setKeyRotated(true);
    setTimeout(() => setKeyRotated(false), 2000);
  };

  // Terminate Single Session
  const handleTerminateSession = (id) => {
    setSessions(sessions.filter((s) => s.id !== id));
  };

  // Revoke Other Sessions
  const handleRevokeOtherSessions = () => {
    setSessions(sessions.filter((s) => s.isCurrent));
  };

  // API Key Generator
  const handleGenerateKey = (e) => {
    e.preventDefault();
    if (!newKeyName.trim()) return;
    const newKey = {
      id: `key_live_${Math.random().toString(36).substring(2, 9)}`,
      name: newKeyName.trim(),
      created: new Date().toISOString().split("T")[0],
      status: "Active"
    };
    setApiKeys([newKey, ...apiKeys]);
    setNewKeyName("");
  };

  const handleDeleteKey = (id) => {
    setApiKeys(apiKeys.filter((k) => k.id !== id));
  };

  const handleTestWebhook = () => {
    setWebhookSent(true);
    setTimeout(() => setWebhookSent(false), 3000);
  };

  const copyFingerprint = () => {
    navigator.clipboard?.writeText(
      "sha256:8f2a9e34c0147e92b1a84f33108c9034e321bf4a0912d7c0147e92"
    );
    setCopiedFingerprint(true);
    setTimeout(() => setCopiedFingerprint(false), 2000);
  };

  const activeCount = devices.filter((d) => d.status === "ACTIVE").length;

  const filteredDevices = devices.filter(
    (d) =>
      d.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      d.sku.toLowerCase().includes(searchQuery.toLowerCase()) ||
      d.ip.includes(searchQuery)
  );

  const filteredLogs = auditLogs.filter((log) => {
    if (logFilter === "ALL") return true;
    return log.level === logFilter;
  });

  // Navigation Tabs
  const navTabs = [
    { id: "overview", label: "Overview", icon: LayoutDashboard },
    { id: "devices", label: "Devices", icon: Cpu, badge: devices.length },
    { id: "authentication", label: "Authentication", icon: KeyRound },
    { id: "prevention", label: "Security Prevention", icon: ShieldAlert },
    { id: "control", label: "Device Control", icon: Sliders },
    { id: "analytics", label: "Analytics", icon: BarChart2 },
    { id: "logs", label: "Logs & Audit", icon: FileText },
    { id: "certificates", label: "Certificates", icon: Award },
    { id: "alerts", label: "Alerts", icon: Bell, alertCount: anomalyActive ? 1 : 0 },
    { id: "settings", label: "Settings", icon: Settings },
    { id: "profile", label: "Profile", icon: User }
  ];

  // System Theme Classes Mapping
  const t = {
    canvas: isDark ? "bg-[#09090b] text-zinc-100" : "bg-slate-50 text-slate-900",
    header: isDark ? "bg-[#0c0c0e] border-[#27272a]" : "bg-white border-slate-200 text-slate-800 shadow-xs",
    sidebar: isDark ? "bg-[#0c0c0e] border-[#27272a]" : "bg-white border-slate-200 text-slate-700 shadow-xs",
    card: isDark ? "bg-[#121215] border-[#27272a] shadow-sm" : "bg-white border-slate-200 text-slate-800 shadow-sm",
    cardSub: isDark ? "bg-[#09090b] border-zinc-800 text-zinc-200" : "bg-slate-50 border-slate-200 text-slate-800",
    subtext: isDark ? "text-zinc-400" : "text-slate-500",
    muted: isDark ? "text-zinc-500" : "text-slate-400",
    border: isDark ? "border-[#27272a]" : "border-slate-200",
    navActive: isDark ? "bg-zinc-800 text-white font-semibold shadow-sm" : "bg-slate-100 text-slate-900 font-semibold shadow-xs",
    navInactive: isDark ? "text-zinc-400 hover:text-zinc-200 hover:bg-zinc-850/60" : "text-slate-600 hover:text-slate-900 hover:bg-slate-100",
    input: isDark ? "bg-[#09090b] border-zinc-800 text-zinc-200 focus:border-violet-500" : "bg-slate-50 border-slate-200 text-slate-800 focus:border-violet-600",
    tableHead: isDark ? "bg-[#0c0c0e] text-zinc-400" : "bg-slate-50 text-slate-600",
    tableHover: isDark ? "hover:bg-zinc-850/30" : "hover:bg-slate-50/80",
    divider: isDark ? "divide-[#27272a]" : "divide-slate-200",
    badgeZinc: isDark ? "bg-zinc-800 text-zinc-300 border-zinc-700" : "bg-slate-100 text-slate-700 border-slate-200"
  };

  return (
    <div className={`flex h-screen w-screen overflow-hidden font-sans antialiased transition-colors duration-200 ${t.canvas}`}>
      {/* SIDEBAR NAVIGATION */}
      <aside className={`w-64 flex-shrink-0 border-r flex flex-col justify-between p-3.5 transition-colors duration-200 ${t.sidebar}`}>
        <div className="space-y-4">
          {/* Platform Branding */}
          <div className="flex items-center space-x-3 px-2 py-1">
            <div className={`w-8 h-8 rounded-lg border flex items-center justify-center shadow-sm ${isDark ? "bg-zinc-800 border-zinc-700" : "bg-slate-100 border-slate-300"}`}>
              <ShieldCheck className="w-4 h-4 text-violet-600" />
            </div>
            <div>
              <div className="font-bold text-sm tracking-tight flex items-center space-x-1.5">
                <span>AuthSphere</span>
                <span className={`text-[10px] font-mono px-1 rounded border font-semibold ${isDark ? "bg-violet-950 text-violet-300 border-violet-800/50" : "bg-violet-50 text-violet-700 border-violet-200"}`}>
                  v2.4
                </span>
              </div>
              <div className={`text-[10px] font-medium ${t.muted}`}>
                Zero-Trust Attestation Core
              </div>
            </div>
          </div>

          {/* Navigation Items (11 Tabs) */}
          <nav className="space-y-0.5">
            {navTabs.map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;

              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-xs font-medium transition-all ${
                    isActive ? t.navActive : t.navInactive
                  }`}
                >
                  <div className="flex items-center space-x-2.5">
                    <Icon
                      className={`w-4 h-4 ${
                        isActive ? "text-violet-600" : t.muted
                      }`}
                    />
                    <span>{tab.label}</span>
                  </div>

                  {tab.badge !== undefined && (
                    <span className={`text-[10px] font-mono px-1.5 py-0.2 rounded border ${t.badgeZinc}`}>
                      {tab.badge}
                    </span>
                  )}

                  {tab.alertCount !== undefined && tab.alertCount > 0 && (
                    <span className="px-1.5 py-0.2 text-[10px] font-bold rounded-full bg-rose-500/20 text-rose-600 dark:text-rose-300 border border-rose-500/40 animate-pulse">
                      {tab.alertCount}
                    </span>
                  )}
                </button>
              );
            })}
          </nav>
        </div>

        {/* User Profile Footer Card */}
        <div
          onClick={() => setActiveTab("profile")}
          className={`p-3 rounded-xl border cursor-pointer hover:border-zinc-500 transition-colors ${t.card}`}
        >
          <div className="flex items-center space-x-2.5">
            <div className={`w-8 h-8 rounded-lg border flex items-center justify-center font-bold text-xs ${isDark ? "bg-zinc-800 border-zinc-700 text-zinc-200" : "bg-slate-100 border-slate-300 text-slate-800"}`}>
              {getInitials(profileData.fullName)}
            </div>
            <div className="min-w-0 flex-1">
              <div className="text-xs font-semibold truncate">
                {profileData.fullName}
              </div>
              <div className={`text-[10px] font-mono truncate ${t.muted}`}>
                {profileData.email}
              </div>
              <div className="text-[9px] text-emerald-600 dark:text-emerald-400 font-mono mt-0.5 font-medium">
                ● Hardware Token Active
              </div>
            </div>
          </div>
        </div>
      </aside>

      {/* MAIN VIEWPORT */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* TOP BAR */}
        <header className={`h-14 border-b px-8 flex items-center justify-between flex-shrink-0 transition-colors duration-200 ${t.header}`}>
          <div className="flex items-center space-x-3">
            <span className={`text-xs font-medium ${t.subtext}`}>Environment:</span>
            <span className={`text-xs font-mono px-2 py-0.5 rounded border ${t.badgeZinc}`}>
              ap-south-1 / SecureNodeX Mesh
            </span>
          </div>

          <div className="flex items-center space-x-3.5">
            {/* Quick Search */}
            <div className="relative hidden md:block">
              <Search className={`w-3.5 h-3.5 absolute left-3 top-2.5 ${t.muted}`} />
              <input
                type="text"
                placeholder="Search nodes, SKUs, IPs..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className={`pl-8 pr-3 py-1 rounded-md text-xs placeholder-zinc-500 focus:outline-none w-48 transition-colors ${t.input}`}
              />
            </div>

            {/* Dark / Light Mode Toggle Button */}
            <button
              onClick={() => setTheme(isDark ? "light" : "dark")}
              className={`p-1.5 rounded-lg border text-xs flex items-center space-x-1.5 transition-colors ${
                isDark
                  ? "bg-[#141417] border-[#27272a] text-zinc-300 hover:text-white hover:bg-zinc-800"
                  : "bg-white border-slate-200 text-slate-700 hover:text-slate-900 hover:bg-slate-100 shadow-xs"
              }`}
              title={isDark ? "Switch to Light Mode" : "Switch to Dark Mode"}
            >
              {isDark ? (
                <Sun className="w-4 h-4 text-amber-400" />
              ) : (
                <Moon className="w-4 h-4 text-slate-700" />
              )}
            </button>

            {/* Attack Trigger Button */}
            {anomalyActive ? (
              <button
                onClick={toggleAnomaly}
                className="flex items-center space-x-2 px-3.5 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold shadow-sm transition-all active:scale-95"
              >
                <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                <span>Purge Threat &amp; Re-attest</span>
              </button>
            ) : (
              <button
                onClick={toggleAnomaly}
                className="flex items-center space-x-2 px-3.5 py-1.5 rounded-lg bg-rose-950/80 hover:bg-rose-900 border border-rose-800/80 text-rose-200 text-xs font-semibold shadow-sm transition-all active:scale-95"
              >
                <AlertTriangle className="w-3.5 h-3.5 text-rose-400" />
                <span>Simulate DLP Anomaly</span>
              </button>
            )}
          </div>
        </header>

        {/* TAB CONTENTS CONTAINER */}
        <main className="flex-1 overflow-y-auto p-8 space-y-6">
          {/* TAB 1: OVERVIEW */}
          {activeTab === "overview" && (
            <div className="space-y-6 max-w-6xl mx-auto">
              {/* 4 Clean Metric Tiles */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {/* Attestation */}
                <div className={`p-5 rounded-xl border ${t.card}`}>
                  <div className={`text-xs font-medium ${t.subtext}`}>Fleet Attestation</div>
                  <div className="mt-2 flex items-center space-x-2">
                    <span className="text-2xl font-bold font-mono">
                      {anomalyActive ? "84.20%" : "99.98%"}
                    </span>
                    <span
                      className={`w-2 h-2 rounded-full ${
                        anomalyActive ? "bg-rose-500 animate-pulse" : "bg-emerald-500"
                      }`}
                    />
                  </div>
                  <div className={`mt-1 text-[11px] ${t.muted}`}>
                    {anomalyActive ? "Degraded • 1 Node Quarantined" : "All Nodes Verified"}
                  </div>
                </div>

                {/* Active Fleet */}
                <div className={`p-5 rounded-xl border ${t.card}`}>
                  <div className={`text-xs font-medium ${t.subtext}`}>Active Fleet</div>
                  <div className="mt-2 text-2xl font-bold font-mono">
                    {activeCount} / {devices.length} Nodes
                  </div>
                  <div className={`mt-1 text-[11px] ${t.muted}`}>
                    Connected &amp; mTLS Attested
                  </div>
                </div>

                {/* Broker Quarantine */}
                <div className={`p-5 rounded-xl border ${t.card}`}>
                  <div className={`text-xs font-medium ${t.subtext}`}>Broker Quarantine</div>
                  <div
                    className={`mt-2 text-2xl font-bold font-mono ${
                      anomalyActive ? "text-rose-500 animate-pulse" : "text-emerald-600 dark:text-emerald-400"
                    }`}
                  >
                    {anomalyActive ? "1 CRITICAL" : "0 Active"}
                  </div>
                  <div className={`mt-1 text-[11px] ${t.muted}`}>
                    Mosquitto Port 8883 ACL
                  </div>
                </div>

                {/* Crypto Overhead */}
                <div className={`p-5 rounded-xl border ${t.card}`}>
                  <div className={`text-xs font-medium ${t.subtext}`}>Crypto Overhead</div>
                  <div className="mt-2 flex items-baseline space-x-2">
                    <span className="text-2xl font-bold font-mono text-violet-600 dark:text-violet-300">
                      34.2 ms
                    </span>
                    <span className={`text-xs font-mono ${t.muted}`}>vs 418.0 ms</span>
                  </div>
                  <div className="mt-1 text-[11px] text-emerald-600 dark:text-emerald-400 font-medium">
                    91.8% Lower than RSA
                  </div>
                </div>
              </div>

              {/* Cryptographic Benchmark Comparison */}
              <div className={`p-6 rounded-xl border space-y-4 ${t.card}`}>
                <div>
                  <h2 className="text-sm font-semibold">
                    Cryptographic Handshake Benchmark
                  </h2>
                  <p className={`text-xs mt-0.5 ${t.subtext}`}>
                    AuthSphere ECC-secp256r1 vs Legacy RSA-2048 execution on Espressif silicon.
                  </p>
                </div>

                <div className="space-y-4 pt-1">
                  <div>
                    <div className="flex justify-between text-xs mb-1.5">
                      <span className="font-medium">
                        AuthSphere NIST P-256 (34.2 ms • 4.2 KB RAM)
                      </span>
                      <span className="font-mono text-emerald-600 dark:text-emerald-400 font-semibold">
                        91.8% Faster
                      </span>
                    </div>
                    <div className={`w-full h-3 rounded-full overflow-hidden border p-0.5 ${isDark ? "bg-zinc-900 border-zinc-800" : "bg-slate-100 border-slate-200"}`}>
                      <div
                        className="h-full bg-gradient-to-r from-emerald-500 to-violet-500 rounded-full"
                        style={{ width: "8.2%" }}
                      />
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between text-xs mb-1.5">
                      <span className={t.subtext}>
                        Legacy RSA-2048 (418.0 ms • 38.6 KB RAM)
                      </span>
                      <span className={`font-mono ${t.muted}`}>Deprecated</span>
                    </div>
                    <div className={`w-full h-3 rounded-full overflow-hidden border p-0.5 ${isDark ? "bg-zinc-900 border-zinc-800" : "bg-slate-100 border-slate-200"}`}>
                      <div
                        className="h-full bg-zinc-400 dark:bg-zinc-700 rounded-full"
                        style={{ width: "100%" }}
                      />
                    </div>
                  </div>
                </div>

                <div className={`pt-3 border-t text-xs flex flex-wrap items-center gap-x-5 gap-y-1 font-mono ${t.border} ${t.subtext}`}>
                  <span>• 64B public key vs 256B (75% bandwidth reduction)</span>
                  <span>• 4.2 KB RAM footprint (9x lower than RSA)</span>
                  <span>• 42,000 CPU cycles on ESP32 (12x computational release)</span>
                </div>
              </div>

              {/* Real-time Ingestion Stream Feed */}
              <div className={`p-6 rounded-xl border space-y-3 ${t.card}`}>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Terminal className={`w-4 h-4 ${t.muted}`} />
                    <span className="text-xs font-semibold uppercase tracking-wider">
                      Real-Time SOC Ingestion Feed
                    </span>
                  </div>
                  <span className={`text-[11px] font-mono ${t.muted}`}>
                    Active Telemetry Tail
                  </span>
                </div>

                <div className="space-y-2">
                  {auditLogs.slice(0, 4).map((log) => (
                    <div
                      key={log.id}
                      className={`p-3 rounded-lg border text-xs font-mono flex items-start space-x-3 ${
                        log.level === "CRITICAL"
                          ? "bg-rose-950/25 border-rose-900/50 text-rose-300 dark:text-rose-200"
                          : isDark
                          ? "bg-[#0e0e10] border-zinc-800/80 text-zinc-300"
                          : "bg-slate-50 border-slate-200 text-slate-800"
                      }`}
                    >
                      <span className={`flex-shrink-0 ${t.muted}`}>[{log.time}]</span>
                      <span
                        className={`px-1.5 py-0.2 rounded font-bold text-[10px] flex-shrink-0 ${
                          log.level === "CRITICAL"
                            ? "bg-rose-600 text-white animate-pulse"
                            : isDark
                            ? "bg-zinc-800 text-zinc-300"
                            : "bg-slate-200 text-slate-800"
                        }`}
                      >
                        {log.level}
                      </span>
                      <span className={`flex-shrink-0 font-medium ${t.subtext}`}>[{log.source}]</span>
                      <span className="flex-1">{log.message}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: DEVICES */}
          {activeTab === "devices" && (
            <div className="space-y-5 max-w-6xl mx-auto">
              <div>
                <h2 className="text-base font-semibold">
                  SecureNodeX Edge Fleet Inventory
                </h2>
                <p className={`text-xs mt-0.5 ${t.subtext}`}>
                  Connected microcontroller nodes verified with hardware attestation.
                </p>
              </div>

              {/* Table */}
              <div className={`rounded-xl border overflow-hidden ${t.card}`}>
                <table className="w-full text-left border-collapse text-xs">
                  <thead>
                    <tr className={`border-b text-[11px] font-medium uppercase tracking-wider ${t.border} ${t.tableHead}`}>
                      <th className="py-3 px-5">Node Identifier</th>
                      <th className="py-3 px-4">Hardware SKU</th>
                      <th className="py-3 px-4">Network IP</th>
                      <th className="py-3 px-4">Cipher Protocol</th>
                      <th className="py-3 px-4">Trust Index</th>
                      <th className="py-3 px-4">Status</th>
                      <th className="py-3 px-5 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className={`divide-y ${t.divider}`}>
                    {filteredDevices.map((dev) => {
                      const isQuarantined = dev.status === "QUARANTINED";
                      const isRevoked = dev.status === "REVOKED";
                      const isActive = dev.status === "ACTIVE";

                      return (
                        <tr
                          key={dev.id}
                          className={`transition-colors ${t.tableHover} ${
                            isQuarantined ? "bg-rose-950/20" : ""
                          }`}
                        >
                          <td className="py-3.5 px-5 font-mono font-semibold">
                            {dev.id}
                          </td>
                          <td className="py-3.5 px-4">
                            <div>{dev.sku}</div>
                            <div className={`text-[10px] font-mono ${t.muted}`}>{dev.arch}</div>
                          </td>
                          <td className={`py-3.5 px-4 font-mono ${t.subtext}`}>
                            {dev.ip}
                          </td>
                          <td className={`py-3.5 px-4 font-mono ${t.subtext}`}>
                            {dev.protocol}
                          </td>
                          <td className="py-3.5 px-4">
                            <span
                              className={`font-mono font-semibold ${
                                dev.trustScore > 75
                                  ? "text-emerald-600 dark:text-emerald-400"
                                  : dev.trustScore > 0
                                  ? "text-rose-500"
                                  : t.muted
                              }`}
                            >
                              {dev.trustScore}%
                            </span>
                          </td>
                          <td className="py-3.5 px-4">
                            {isActive && (
                              <span className="inline-flex items-center space-x-1.5 px-2 py-0.5 rounded text-[11px] font-medium bg-emerald-950/70 text-emerald-400 border border-emerald-800/40">
                                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                                <span>ACTIVE</span>
                              </span>
                            )}
                            {isQuarantined && (
                              <span className="inline-flex items-center space-x-1.5 px-2 py-0.5 rounded text-[11px] font-medium bg-rose-950 text-rose-300 border border-rose-800/60 animate-pulse">
                                <AlertTriangle className="w-3 h-3 text-rose-400" />
                                <span>QUARANTINED</span>
                              </span>
                            )}
                            {isRevoked && (
                              <span className={`inline-flex items-center space-x-1.5 px-2 py-0.5 rounded text-[11px] font-medium border ${isDark ? "bg-zinc-900 text-zinc-500 border-zinc-800" : "bg-slate-100 text-slate-500 border-slate-200"}`}>
                                <XCircle className="w-3 h-3" />
                                <span>REVOKED</span>
                              </span>
                            )}
                          </td>
                          <td className="py-3.5 px-5 text-right">
                            {isRevoked ? (
                              <span className={`text-[11px] font-mono ${t.muted}`}>IN CRL</span>
                            ) : (
                              <button
                                onClick={() => handleRevokeDevice(dev.id)}
                                className={`px-2.5 py-1 text-xs rounded border transition-colors ${isDark ? "bg-zinc-800 hover:bg-rose-950 hover:text-rose-300 border-zinc-700 hover:border-rose-800" : "bg-slate-100 hover:bg-rose-50 hover:text-rose-600 border-slate-300 hover:border-rose-200"}`}
                              >
                                Revoke
                              </button>
                            )}
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* TAB 3: AUTHENTICATION */}
          {activeTab === "authentication" && (
            <div className="space-y-6 max-w-6xl mx-auto">
              <div>
                <h2 className="text-base font-semibold">
                  AuthSphere Micro-PKI Architecture
                </h2>
                <p className={`text-xs mt-0.5 ${t.subtext}`}>
                  ECDHE secp256r1 keys, rolling challenge nonces, and hardware mutual authentication.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {/* Fingerprint */}
                <div className={`p-5 rounded-xl border space-y-3 ${t.card}`}>
                  <div className={`text-xs font-medium ${t.subtext}`}>Root Public Key Digest</div>
                  <div className={`p-2.5 rounded border text-[11px] font-mono flex items-center justify-between ${t.cardSub}`}>
                    <span className="truncate mr-2">sha256:8f2a...c0147e92</span>
                    <button
                      onClick={copyFingerprint}
                      className="hover:text-violet-500 transition-colors"
                    >
                      {copiedFingerprint ? (
                        <Check className="w-3.5 h-3.5 text-emerald-500" />
                      ) : (
                        <Copy className="w-3.5 h-3.5" />
                      )}
                    </button>
                  </div>
                  <div className={`text-[11px] font-mono ${t.muted}`}>
                    Algorithm: ECDSA-secp256r1
                  </div>
                </div>

                {/* Rolling Ephemeral Token */}
                <div className={`p-5 rounded-xl border space-y-3 ${t.card}`}>
                  <div className={`text-xs font-medium ${t.subtext}`}>Ephemeral Challenge TTL</div>
                  <div className="text-2xl font-bold font-mono">
                    {tokenTTL}s <span className={`text-xs font-normal ${t.muted}`}>/ 180s</span>
                  </div>
                  <div className={`h-1.5 w-full rounded-full overflow-hidden ${isDark ? "bg-zinc-900" : "bg-slate-200"}`}>
                    <div
                      className="h-full bg-violet-500 rounded-full transition-all duration-1000"
                      style={{ width: `${(tokenTTL / 180) * 100}%` }}
                    />
                  </div>
                  <div className={`text-[11px] font-mono ${t.muted}`}>
                    HMAC-SHA256 Rolling Challenge Nonce
                  </div>
                </div>

                {/* Broker Enforcement */}
                <div className={`p-5 rounded-xl border space-y-3 ${t.card}`}>
                  <div className={`text-xs font-medium ${t.subtext}`}>mTLS Transport Guard</div>
                  <div className="text-sm font-semibold font-mono">
                    Strict Client Cert Required
                  </div>
                  <p className={`text-xs ${t.subtext}`}>
                    ACL-403 blocks untrusted nodes at TCP layer before broker queue.
                  </p>
                  <div className="text-[11px] text-emerald-600 dark:text-emerald-400 font-mono font-medium">
                    Port 8883 (Active Enforced)
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 4: SECURITY PREVENTION */}
          {activeTab === "prevention" && (
            <div className="space-y-5 max-w-6xl mx-auto">
              <div>
                <h2 className="text-base font-semibold">
                  Nakshatra AI Threat Interceptor
                </h2>
                <p className={`text-xs mt-0.5 ${t.subtext}`}>
                  Gemini 2.0 Flash Deep Packet Inspection (DPI) &amp; DLP regex filtering engine.
                </p>
              </div>

              {/* Inspection Stream */}
              <div className={`rounded-xl border p-5 space-y-3 ${t.card}`}>
                <div className={`flex items-center justify-between pb-3 border-b ${t.border}`}>
                  <div className={`text-xs font-mono ${isDark ? "text-zinc-300" : "text-slate-700"}`}>
                    Active Filters: REGEX_PAN_V2 • ROGUE_NONCE_SCAN • SHANNON_ENTROPY
                  </div>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-950 text-emerald-400 border border-emerald-800">
                    INSPECTION: LIVE
                  </span>
                </div>

                <div className={`p-3 rounded border font-mono text-xs space-y-2 ${t.cardSub}`}>
                  {auditLogs.map((log) => (
                    <div key={log.id} className="flex space-x-3">
                      <span className={t.muted}>[{log.time}]</span>
                      <span
                        className={
                          log.level === "CRITICAL"
                            ? "text-rose-500 font-bold"
                            : "text-violet-600 dark:text-violet-400"
                        }
                      >
                        {log.level}
                      </span>
                      <span>{log.message}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* TAB 5: DEVICE CONTROL */}
          {activeTab === "control" && (
            <div className="space-y-5 max-w-6xl mx-auto">
              <div>
                <h2 className="text-base font-semibold">Centralized Device Control</h2>
                <p className={`text-xs mt-0.5 ${t.subtext}`}>
                  Cluster-wide emergency actuation controls and cryptographic commands.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {/* Control 1: Fleet Lockout */}
                <div className={`p-5 rounded-xl border space-y-4 ${t.card}`}>
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-semibold">Emergency Fleet Lockout</span>
                    <Power className={`w-4 h-4 ${fleetLockout ? "text-rose-500" : t.muted}`} />
                  </div>
                  <p className={`text-xs ${t.subtext}`}>
                    Immediately revoke all ephemeral session tokens and drop all client TCP connections.
                  </p>
                  <button
                    onClick={() => setFleetLockout(!fleetLockout)}
                    className={`w-full py-2 rounded-lg text-xs font-semibold transition-colors ${
                      fleetLockout
                        ? "bg-rose-600 hover:bg-rose-500 text-white"
                        : isDark
                        ? "bg-zinc-800 hover:bg-zinc-700 text-zinc-200"
                        : "bg-slate-100 hover:bg-slate-200 text-slate-800"
                    }`}
                  >
                    {fleetLockout ? "Disengage Lockout" : "Engage Emergency Lockout"}
                  </button>
                </div>

                {/* Control 2: Force Rotation */}
                <div className={`p-5 rounded-xl border space-y-4 ${t.card}`}>
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-semibold">Force Ephemeral Key Rotation</span>
                    <RotateCw className="w-4 h-4 text-violet-500" />
                  </div>
                  <p className={`text-xs ${t.subtext}`}>
                    Issue instantaneous re-keying challenges across all 4 registered SecureNodeX devices.
                  </p>
                  <button
                    onClick={() => setTokenTTL(180)}
                    className={`w-full py-2 rounded-lg text-xs font-semibold transition-colors ${isDark ? "bg-zinc-800 hover:bg-zinc-700 text-zinc-200" : "bg-slate-100 hover:bg-slate-200 text-slate-800"}`}
                  >
                    Re-Key Mesh Now
                  </button>
                </div>

                {/* Control 3: Broker CRL Sync */}
                <div className={`p-5 rounded-xl border space-y-4 ${t.card}`}>
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-semibold">Dynamic Broker CRL Sync</span>
                    <RefreshCw className="w-4 h-4 text-emerald-500" />
                  </div>
                  <p className={`text-xs ${t.subtext}`}>
                    Synchronize blacklist hash ring with Mosquitto's in-memory TLS context.
                  </p>
                  <button
                    onClick={() => setDynamicCrlSync(!dynamicCrlSync)}
                    className={`w-full py-2 rounded-lg text-xs font-semibold transition-colors ${
                      dynamicCrlSync
                        ? "bg-emerald-950 text-emerald-300 border border-emerald-800"
                        : isDark
                        ? "bg-zinc-800 text-zinc-300"
                        : "bg-slate-100 text-slate-800"
                    }`}
                  >
                    {dynamicCrlSync ? "CRL Synchronized (Active)" : "Sync Paused"}
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* TAB 6: ANALYTICS */}
          {activeTab === "analytics" && (
            <div className="space-y-6 max-w-6xl mx-auto">
              <div>
                <h2 className="text-base font-semibold">Mesh Telemetry &amp; Performance Analytics</h2>
                <p className={`text-xs mt-0.5 ${t.subtext}`}>
                  Real-time throughput curves, Shannon entropy distribution, and silicon architecture benchmarks.
                </p>
              </div>

              {/* Grid 1: Throughput & Entropy */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                {/* Throughput Curve */}
                <div className={`p-5 rounded-xl border space-y-4 ${t.card}`}>
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-xs font-semibold uppercase font-mono">
                        Handshake Throughput (ops/s)
                      </h3>
                      <p className={`text-[11px] ${t.muted}`}>Peak: 1,840 ops/s • Current: 1,420 ops/s</p>
                    </div>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-950 text-emerald-400 border border-emerald-800 font-semibold">
                      LIVE
                    </span>
                  </div>

                  {/* SVG Chart */}
                  <div className="h-44 w-full pt-2">
                    <svg viewBox="0 0 500 160" className="w-full h-full overflow-visible">
                      <defs>
                        <linearGradient id="gradOps" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="0%" stopColor="#8b5cf6" stopOpacity="0.4" />
                          <stop offset="100%" stopColor="#8b5cf6" stopOpacity="0.0" />
                        </linearGradient>
                      </defs>
                      <line x1="0" y1="40" x2="500" y2="40" stroke={isDark ? "#27272a" : "#e2e8f0"} strokeDasharray="3 3" />
                      <line x1="0" y1="80" x2="500" y2="80" stroke={isDark ? "#27272a" : "#e2e8f0"} strokeDasharray="3 3" />
                      <line x1="0" y1="120" x2="500" y2="120" stroke={isDark ? "#27272a" : "#e2e8f0"} strokeDasharray="3 3" />

                      <path
                        d="M0,130 Q50,110 100,120 T200,90 T300,70 T400,60 T500,45 L500,160 L0,160 Z"
                        fill="url(#gradOps)"
                      />
                      <path
                        d="M0,130 Q50,110 100,120 T200,90 T300,70 T400,60 T500,45"
                        fill="none"
                        stroke="#8b5cf6"
                        strokeWidth="2.5"
                      />
                      <circle cx="500" cy="45" r="4" fill="#a78bfa" />
                    </svg>
                  </div>
                  <div className={`flex justify-between text-[10px] font-mono ${t.muted}`}>
                    <span>-60s</span>
                    <span>-45s</span>
                    <span>-30s</span>
                    <span>-15s</span>
                    <span>Now</span>
                  </div>
                </div>

                {/* Shannon Entropy Distribution */}
                <div className={`p-5 rounded-xl border space-y-4 ${t.card}`}>
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-xs font-semibold uppercase font-mono">
                        Shannon Payload Entropy Score
                      </h3>
                      <p className={`text-[11px] ${t.muted}`}>Nominal Baseline: &gt;= 7.20 • Gemini Scan</p>
                    </div>
                    <span className={`text-[10px] font-mono px-2 py-0.5 rounded border font-semibold ${isDark ? "bg-violet-950 text-violet-300 border-violet-800" : "bg-violet-50 text-violet-700 border-violet-200"}`}>
                      7.92 AVG
                    </span>
                  </div>

                  {/* SVG Chart */}
                  <div className="h-44 w-full pt-2">
                    <svg viewBox="0 0 500 160" className="w-full h-full overflow-visible">
                      <defs>
                        <linearGradient id="gradEntropy" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="0%" stopColor="#10b981" stopOpacity="0.4" />
                          <stop offset="100%" stopColor="#10b981" stopOpacity="0.0" />
                        </linearGradient>
                      </defs>
                      <line x1="0" y1="95" x2="500" y2="95" stroke="#ef4444" strokeWidth="1" strokeDasharray="4 4" />
                      <text x="5" y="90" fill="#f87171" fontSize="9" fontFamily="monospace">Anomaly Threshold (7.20)</text>

                      <path
                        d="M0,50 Q70,45 140,55 T280,48 T420,52 T500,46 L500,160 L0,160 Z"
                        fill="url(#gradEntropy)"
                      />
                      <path
                        d="M0,50 Q70,45 140,55 T280,48 T420,52 T500,46"
                        fill="none"
                        stroke="#10b981"
                        strokeWidth="2.5"
                      />
                    </svg>
                  </div>
                  <div className={`flex justify-between text-[10px] font-mono ${t.muted}`}>
                    <span>Clean Ciphertext</span>
                    <span>Encrypted Telemetry</span>
                    <span>High Entropy (7.92)</span>
                  </div>
                </div>
              </div>

              {/* Silicon Architecture Hardware Breakdown */}
              <div className={`p-5 rounded-xl border space-y-4 ${t.card}`}>
                <h3 className="text-xs font-semibold uppercase font-mono">
                  Silicon Architecture Benchmark &amp; Resource Footprint
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 text-xs">
                  <div className={`p-3.5 rounded-lg border space-y-2 ${t.cardSub}`}>
                    <div className="font-semibold">ESP32-S3 (Dual LX7)</div>
                    <div className="text-[11px] font-mono text-emerald-600 dark:text-emerald-400">ECC-256: 34.2 ms</div>
                    <div className={`text-[10px] font-mono ${t.muted}`}>RAM: 4.2 KB • 18mA</div>
                    <div className={`h-1 rounded-full overflow-hidden mt-1 ${isDark ? "bg-zinc-800" : "bg-slate-200"}`}>
                      <div className="h-full bg-emerald-500" style={{ width: "95%" }}></div>
                    </div>
                  </div>

                  <div className={`p-3.5 rounded-lg border space-y-2 ${t.cardSub}`}>
                    <div className="font-semibold">ESP32-WROOM (LX6)</div>
                    <div className="text-[11px] font-mono text-emerald-600 dark:text-emerald-400">ECC-256: 38.6 ms</div>
                    <div className={`text-[10px] font-mono ${t.muted}`}>RAM: 4.6 KB • 22mA</div>
                    <div className={`h-1 rounded-full overflow-hidden mt-1 ${isDark ? "bg-zinc-800" : "bg-slate-200"}`}>
                      <div className="h-full bg-emerald-500" style={{ width: "90%" }}></div>
                    </div>
                  </div>

                  <div className={`p-3.5 rounded-lg border space-y-2 ${t.cardSub}`}>
                    <div className="font-semibold">Raspberry Pi 4 (A72)</div>
                    <div className="text-[11px] font-mono text-indigo-600 dark:text-indigo-400">TLS 1.3: 11.8 ms</div>
                    <div className={`text-[10px] font-mono ${t.muted}`}>RAM: 12.8 KB • Gateway</div>
                    <div className={`h-1 rounded-full overflow-hidden mt-1 ${isDark ? "bg-zinc-800" : "bg-slate-200"}`}>
                      <div className="h-full bg-indigo-500" style={{ width: "99%" }}></div>
                    </div>
                  </div>

                  <div className={`p-3.5 rounded-lg border space-y-2 ${t.cardSub}`}>
                    <div className="font-semibold">ESP32-C3 (RISC-V)</div>
                    <div className={`text-[11px] font-mono ${t.muted}`}>Revoked (CRL)</div>
                    <div className={`text-[10px] font-mono ${t.muted}`}>RAM: 0 KB • Standby</div>
                    <div className={`h-1 rounded-full overflow-hidden mt-1 ${isDark ? "bg-zinc-800" : "bg-slate-200"}`}>
                      <div className="h-full bg-rose-500" style={{ width: "10%" }}></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 7: LOGS & AUDIT */}
          {activeTab === "logs" && (
            <div className="space-y-5 max-w-6xl mx-auto">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div>
                  <h2 className="text-base font-semibold">Logs &amp; Audit Trail</h2>
                  <p className={`text-xs mt-0.5 ${t.subtext}`}>
                    Immutable security log records from AuthSphere mTLS broker and AI threat scanners.
                  </p>
                </div>

                <div className={`flex items-center space-x-1.5 p-1 rounded-lg border ${t.card}`}>
                  {["ALL", "INFO", "AI-EVAL", "CRITICAL"].map((lvl) => (
                    <button
                      key={lvl}
                      onClick={() => setLogFilter(lvl)}
                      className={`px-2.5 py-1 rounded text-[11px] font-mono font-medium transition-colors ${
                        logFilter === lvl
                          ? isDark
                            ? "bg-zinc-800 text-white font-semibold"
                            : "bg-slate-200 text-slate-900 font-semibold"
                          : t.subtext
                      }`}
                    >
                      {lvl}
                    </button>
                  ))}
                </div>
              </div>

              {/* Log Stream */}
              <div className={`rounded-xl border p-4 space-y-2 font-mono text-xs ${t.card}`}>
                {filteredLogs.map((log) => (
                  <div
                    key={log.id}
                    className={`p-2.5 rounded border flex items-start space-x-3 ${
                      log.level === "CRITICAL"
                        ? "bg-rose-950/20 border-rose-900/40 text-rose-400"
                        : isDark
                        ? "bg-[#09090b] border-zinc-800 text-zinc-300"
                        : "bg-slate-50 border-slate-200 text-slate-800"
                    }`}
                  >
                    <span className={t.muted}>[{log.time}]</span>
                    <span
                      className={`px-1.5 py-0.2 rounded font-bold text-[10px] ${
                        log.level === "CRITICAL"
                          ? "bg-rose-600 text-white"
                          : log.level === "AI-EVAL"
                          ? "bg-violet-950 text-violet-300 border border-violet-800"
                          : isDark
                          ? "bg-zinc-800 text-zinc-300"
                          : "bg-slate-200 text-slate-800"
                      }`}
                    >
                      {log.level}
                    </span>
                    <span className={t.subtext}>[{log.source}]</span>
                    <span className="flex-1">{log.message}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 8: CERTIFICATES */}
          {activeTab === "certificates" && (
            <div className="space-y-5 max-w-6xl mx-auto">
              <div>
                <h2 className="text-base font-semibold">
                  X.509 Certificate Matrix &amp; CRL Ring
                </h2>
                <p className={`text-xs mt-0.5 ${t.subtext}`}>
                  Device digital identities mapped to Mosquitto's `crl.pem` blacklist.
                </p>
              </div>

              <div className={`rounded-xl border overflow-hidden ${t.card}`}>
                <table className="w-full text-left border-collapse text-xs">
                  <thead>
                    <tr className={`border-b text-[11px] font-medium uppercase tracking-wider ${t.border} ${t.tableHead}`}>
                      <th className="py-3 px-5">Device Serial</th>
                      <th className="py-3 px-4">Node Bound</th>
                      <th className="py-3 px-4">Signature Algorithm</th>
                      <th className="py-3 px-4">CRL Status</th>
                      <th className="py-3 px-5 text-right">Validity</th>
                    </tr>
                  </thead>
                  <tbody className={`divide-y ${t.divider}`}>
                    {devices.map((d) => (
                      <tr key={d.serial} className={t.tableHover}>
                        <td className="py-3.5 px-5 font-mono font-semibold">
                          {d.serial}
                        </td>
                        <td className={`py-3.5 px-4 font-mono ${t.subtext}`}>{d.id}</td>
                        <td className={`py-3.5 px-4 font-mono ${t.subtext}`}>
                          ECDSA / SHA-256
                        </td>
                        <td className="py-3.5 px-4">
                          {d.status === "REVOKED" ? (
                            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-rose-950 text-rose-300 border border-rose-800 font-semibold">
                              BLACKLISTED (CRL)
                            </span>
                          ) : d.status === "QUARANTINED" ? (
                            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-rose-950 text-rose-300 border border-rose-800 font-semibold animate-pulse">
                              ACL ISOLATED
                            </span>
                          ) : (
                            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-950 text-emerald-400 border border-emerald-800 font-semibold">
                              VALID / ATTESTED
                            </span>
                          )}
                        </td>
                        <td className={`py-3.5 px-5 text-right font-mono ${t.muted}`}>
                          2035-12-31
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* TAB 9: ALERTS */}
          {activeTab === "alerts" && (
            <div className="space-y-5 max-w-6xl mx-auto">
              <div>
                <h2 className="text-base font-semibold">Active Incidents &amp; Alerts</h2>
                <p className={`text-xs mt-0.5 ${t.subtext}`}>
                  Real-time containment queue with automated quarantine actions.
                </p>
              </div>

              <div className="space-y-3">
                {alerts.map((alt) => (
                  <div
                    key={alt.id}
                    className={`p-4 rounded-xl border space-y-2 ${
                      alt.severity === "CRITICAL"
                        ? "bg-rose-950/20 border-rose-900/60"
                        : t.card
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <span
                          className={`px-2 py-0.5 rounded text-[10px] font-bold font-mono ${
                            alt.severity === "CRITICAL"
                              ? "bg-rose-600 text-white"
                              : isDark
                              ? "bg-zinc-800 text-zinc-300"
                              : "bg-slate-200 text-slate-800"
                          }`}
                        >
                          {alt.severity}
                        </span>
                        <span className="font-semibold text-sm">
                          {alt.title}
                        </span>
                      </div>
                      <span className={`text-[11px] font-mono ${t.muted}`}>
                        {alt.timestamp}
                      </span>
                    </div>
                    <p className={`text-xs ${isDark ? "text-zinc-300" : "text-slate-700"}`}>{alt.description}</p>
                    <div className="flex items-center justify-between pt-1 text-xs">
                      <span className={`font-mono ${t.subtext}`}>Target: {alt.target}</span>
                      <span
                        className={`font-mono text-[11px] font-semibold ${
                          alt.status.includes("ACTIVE") ? "text-rose-500" : "text-emerald-600 dark:text-emerald-400"
                        }`}
                      >
                        Status: {alt.status}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 10: SETTINGS */}
          {activeTab === "settings" && (
            <div className="space-y-6 max-w-6xl mx-auto">
              <div>
                <h2 className="text-base font-semibold">
                  Cluster Settings &amp; SaaS Configuration
                </h2>
                <p className={`text-xs mt-0.5 ${t.subtext}`}>
                  Broker bindings, API key provisioning, cryptographic enforcement, and alert webhooks.
                </p>
              </div>

              {/* Section 1: Broker Network Binding */}
              <div className={`p-5 rounded-xl border space-y-4 ${t.card}`}>
                <h3 className="text-xs font-semibold uppercase tracking-wider font-mono flex items-center space-x-2">
                  <Network className="w-4 h-4 text-violet-500" />
                  <span>Broker Network Endpoints</span>
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                  <div>
                    <label className={`block font-mono mb-1 ${t.subtext}`}>Mosquitto Host IP</label>
                    <input
                      type="text"
                      value={brokerIp}
                      onChange={(e) => setBrokerIp(e.target.value)}
                      className={`w-full px-3 py-2 rounded-lg font-mono text-xs focus:outline-none transition-colors border ${t.input}`}
                    />
                  </div>
                  <div>
                    <label className={`block font-mono mb-1 ${t.subtext}`}>mTLS Listening Port</label>
                    <input
                      type="text"
                      value={brokerPort}
                      onChange={(e) => setBrokerPort(e.target.value)}
                      className={`w-full px-3 py-2 rounded-lg font-mono text-xs focus:outline-none transition-colors border ${t.input}`}
                    />
                  </div>
                </div>
              </div>

              {/* Section 2: API Keys Generator */}
              <div className={`p-5 rounded-xl border space-y-4 ${t.card}`}>
                <div className="flex items-center justify-between">
                  <h3 className="text-xs font-semibold uppercase tracking-wider font-mono flex items-center space-x-2">
                    <Key className="w-4 h-4 text-emerald-500" />
                    <span>API Provisioning Keys</span>
                  </h3>
                  <span className={`text-[10px] font-mono ${t.muted}`}>Tier-1 Scoped</span>
                </div>

                <form onSubmit={handleGenerateKey} className="flex gap-2">
                  <input
                    type="text"
                    placeholder="Enter key identifier (e.g., Fleet Worker 03)..."
                    value={newKeyName}
                    onChange={(e) => setNewKeyName(e.target.value)}
                    className={`flex-1 px-3 py-1.5 rounded-lg text-xs focus:outline-none transition-colors border ${t.input}`}
                  />
                  <button
                    type="submit"
                    className="px-3.5 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-xs flex items-center space-x-1.5 shadow-xs"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>Generate Key</span>
                  </button>
                </form>

                <div className="space-y-2 pt-1">
                  {apiKeys.map((k) => (
                    <div
                      key={k.id}
                      className={`flex items-center justify-between p-2.5 rounded-lg border text-xs font-mono ${t.cardSub}`}
                    >
                      <div className="flex items-center space-x-3">
                        <span className="font-semibold">{k.name}</span>
                        <span className={`text-[11px] ${t.muted}`}>{k.id}</span>
                        <span className="px-1.5 py-0.2 rounded text-[10px] bg-emerald-950 text-emerald-400 border border-emerald-800">
                          {k.status}
                        </span>
                      </div>
                      <div className="flex items-center space-x-3">
                        <span className={`text-[10px] ${t.muted}`}>Created: {k.created}</span>
                        <button
                          onClick={() => handleDeleteKey(k.id)}
                          className="hover:text-rose-500 transition-colors"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Section 3: TLS Toggles */}
              <div className={`p-5 rounded-xl border space-y-3 ${t.card}`}>
                <h3 className="text-xs font-semibold uppercase tracking-wider font-mono flex items-center space-x-2">
                  <Lock className="w-4 h-4 text-violet-500" />
                  <span>Cryptographic Policy Toggles</span>
                </h3>

                <div className={`divide-y text-xs ${t.divider}`}>
                  <div className="flex items-center justify-between py-2.5">
                    <div>
                      <div className="font-semibold">TLS 1.3 Strict Cipher Suites</div>
                      <div className={`text-[11px] ${t.muted}`}>Enforce ECDHE-ECDSA-AES128-GCM-SHA256 only.</div>
                    </div>
                    <button
                      onClick={() => setTlsStrict(!tlsStrict)}
                      className={`w-10 h-5 rounded-full p-0.5 transition-colors ${
                        tlsStrict ? "bg-emerald-600" : isDark ? "bg-zinc-800" : "bg-slate-300"
                      }`}
                    >
                      <div
                        className={`w-4 h-4 rounded-full bg-white transition-transform ${
                          tlsStrict ? "translate-x-5" : "translate-x-0"
                        }`}
                      />
                    </button>
                  </div>

                  <div className="flex items-center justify-between py-2.5">
                    <div>
                      <div className="font-semibold">Client Certificate Strict Require</div>
                      <div className={`text-[11px] ${t.muted}`}>Reject unauthenticated clients before TLS greeting.</div>
                    </div>
                    <button
                      onClick={() => setRequireClientCert(!requireClientCert)}
                      className={`w-10 h-5 rounded-full p-0.5 transition-colors ${
                        requireClientCert ? "bg-emerald-600" : isDark ? "bg-zinc-800" : "bg-slate-300"
                      }`}
                    >
                      <div
                        className={`w-4 h-4 rounded-full bg-white transition-transform ${
                          requireClientCert ? "translate-x-5" : "translate-x-0"
                        }`}
                      />
                    </button>
                  </div>

                  <div className="flex items-center justify-between py-2.5">
                    <div>
                      <div className="font-semibold">Shannon Entropy Filter</div>
                      <div className={`text-[11px] ${t.muted}`}>Inspect all payload bytes with Gemini 2.0 heuristic scanner.</div>
                    </div>
                    <button
                      onClick={() => setEntropyFilter(!entropyFilter)}
                      className={`w-10 h-5 rounded-full p-0.5 transition-colors ${
                        entropyFilter ? "bg-emerald-600" : isDark ? "bg-zinc-800" : "bg-slate-300"
                      }`}
                    >
                      <div
                        className={`w-4 h-4 rounded-full bg-white transition-transform ${
                          entropyFilter ? "translate-x-5" : "translate-x-0"
                        }`}
                      />
                    </button>
                  </div>
                </div>
              </div>

              {/* Section 4: Webhook Dispatcher */}
              <div className={`p-5 rounded-xl border space-y-3 ${t.card}`}>
                <h3 className="text-xs font-semibold uppercase tracking-wider font-mono flex items-center space-x-2">
                  <Send className="w-4 h-4 text-violet-500" />
                  <span>Real-Time Incident Webhook</span>
                </h3>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={webhookUrl}
                    onChange={(e) => setWebhookUrl(e.target.value)}
                    className={`flex-1 px-3 py-1.5 rounded-lg font-mono text-xs focus:outline-none transition-colors border ${t.input}`}
                  />
                  <button
                    onClick={handleTestWebhook}
                    className={`px-3 py-1.5 rounded-lg font-semibold text-xs transition-colors border ${isDark ? "bg-zinc-800 hover:bg-zinc-700 text-zinc-200 border-zinc-700" : "bg-slate-100 hover:bg-slate-200 text-slate-800 border-slate-300"}`}
                  >
                    {webhookSent ? "Payload Sent!" : "Dispatch Test"}
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* TAB 11: PROFILE */}
          {activeTab === "profile" && (
            <div className="space-y-6 max-w-6xl mx-auto">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div>
                  <h2 className="text-base font-semibold">SecOps Operator Identity &amp; Access</h2>
                  <p className={`text-xs mt-0.5 ${t.subtext}`}>
                    Hardware-attested session management, cryptographic RBAC keys, and operator profile.
                  </p>
                </div>

                <div className="flex items-center space-x-2">
                  {profileSuccess && (
                    <span className="text-xs font-mono text-emerald-600 dark:text-emerald-400 flex items-center space-x-1 animate-pulse">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      <span>Changes Saved!</span>
                    </span>
                  )}
                  <button
                    onClick={() => {
                      if (!isEditingProfile) {
                        setEditForm({ ...profileData });
                      }
                      setIsEditingProfile(!isEditingProfile);
                    }}
                    className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center space-x-1.5 transition-colors border ${
                      isDark
                        ? "bg-zinc-800 hover:bg-zinc-700 text-zinc-200 border-zinc-700"
                        : "bg-slate-100 hover:bg-slate-200 text-slate-800 border-slate-300"
                    }`}
                  >
                    <Edit2 className="w-3.5 h-3.5" />
                    <span>{isEditingProfile ? "Cancel Editing" : "Edit Profile Details"}</span>
                  </button>
                </div>
              </div>

              {/* Editable Profile Form or Static Card */}
              {isEditingProfile ? (
                <form
                  onSubmit={handleSaveProfile}
                  className={`p-6 rounded-xl border space-y-4 ${t.card}`}
                >
                  <h3 className="text-xs font-semibold uppercase tracking-wider font-mono">
                    Edit Operator Information
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                    <div>
                      <label className={`block font-medium mb-1 ${t.subtext}`}>Full Name</label>
                      <input
                        type="text"
                        value={editForm.fullName}
                        onChange={(e) => setEditForm({ ...editForm, fullName: e.target.value })}
                        className={`w-full px-3 py-2 rounded-lg text-xs font-medium border ${t.input}`}
                        required
                      />
                    </div>
                    <div>
                      <label className={`block font-medium mb-1 ${t.subtext}`}>Role Title</label>
                      <input
                        type="text"
                        value={editForm.roleTitle}
                        onChange={(e) => setEditForm({ ...editForm, roleTitle: e.target.value })}
                        className={`w-full px-3 py-2 rounded-lg text-xs font-medium border ${t.input}`}
                        required
                      />
                    </div>
                    <div>
                      <label className={`block font-medium mb-1 ${t.subtext}`}>Enterprise Email</label>
                      <input
                        type="email"
                        value={editForm.email}
                        onChange={(e) => setEditForm({ ...editForm, email: e.target.value })}
                        className={`w-full px-3 py-2 rounded-lg font-mono text-xs border ${t.input}`}
                        required
                      />
                    </div>
                    <div>
                      <label className={`block font-medium mb-1 ${t.subtext}`}>Emergency Escalation Contact</label>
                      <input
                        type="text"
                        value={editForm.emergencyContact}
                        onChange={(e) => setEditForm({ ...editForm, emergencyContact: e.target.value })}
                        className={`w-full px-3 py-2 rounded-lg font-mono text-xs border ${t.input}`}
                      />
                    </div>
                    <div className="sm:col-span-2">
                      <label className={`block font-medium mb-1 ${t.subtext}`}>Organization / Mesh Unit</label>
                      <input
                        type="text"
                        value={editForm.organization}
                        onChange={(e) => setEditForm({ ...editForm, organization: e.target.value })}
                        className={`w-full px-3 py-2 rounded-lg text-xs border ${t.input}`}
                      />
                    </div>
                  </div>

                  <div className="flex justify-end space-x-2 pt-2">
                    <button
                      type="button"
                      onClick={() => setIsEditingProfile(false)}
                      className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
                        isDark ? "bg-zinc-800 text-zinc-300 hover:bg-zinc-700" : "bg-slate-200 text-slate-700 hover:bg-slate-300"
                      }`}
                    >
                      Discard
                    </button>
                    <button
                      type="submit"
                      className="px-4 py-1.5 rounded-lg bg-violet-600 hover:bg-violet-500 text-white text-xs font-semibold flex items-center space-x-1.5 transition-colors shadow-sm"
                    >
                      <Save className="w-3.5 h-3.5" />
                      <span>Save Changes</span>
                    </button>
                  </div>
                </form>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* Identity Card */}
                  <div className={`p-6 rounded-xl border space-y-4 ${t.card}`}>
                    <div className="flex items-center space-x-4">
                      <div className={`w-14 h-14 rounded-2xl border flex items-center justify-center font-bold text-lg shadow-sm ${
                        isDark ? "bg-zinc-800 border-zinc-700 text-white" : "bg-slate-100 border-slate-300 text-slate-900"
                      }`}>
                        {getInitials(profileData.fullName)}
                      </div>
                      <div>
                        <h3 className="text-base font-bold">{profileData.fullName}</h3>
                        <p className={`text-xs font-mono ${t.subtext}`}>{profileData.email}</p>
                        <span className="inline-block mt-1 text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-950 text-emerald-400 border border-emerald-800 font-semibold">
                          Session: Hardware Token Attested
                        </span>
                      </div>
                    </div>

                    <div className={`space-y-2 pt-2 border-t text-xs ${t.border}`}>
                      <div className="flex justify-between py-1">
                        <span className={t.subtext}>Platform Role</span>
                        <span className="font-semibold">{profileData.roleTitle}</span>
                      </div>
                      <div className="flex justify-between py-1">
                        <span className={t.subtext}>Access Clearance</span>
                        <span className="font-semibold text-emerald-600 dark:text-emerald-400 font-mono">Tier-1 Cluster Admin</span>
                      </div>
                      <div className="flex justify-between py-1">
                        <span className={t.subtext}>Organization</span>
                        <span className="font-mono">{profileData.organization}</span>
                      </div>
                      <div className="flex justify-between py-1">
                        <span className={t.subtext}>Emergency Contact</span>
                        <span className="font-mono">{profileData.emergencyContact}</span>
                      </div>
                    </div>
                  </div>

                  {/* Hardware Security Key (FIDO2/YubiKey) */}
                  <div className={`p-6 rounded-xl border space-y-4 ${t.card}`}>
                    <div className="flex items-center justify-between">
                      <h3 className="text-xs font-semibold uppercase tracking-wider font-mono flex items-center space-x-2">
                        <Fingerprint className="w-4 h-4 text-emerald-500" />
                        <span>FIDO2 / YubiKey Hardware Token</span>
                      </h3>
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-950 text-emerald-400 border border-emerald-800 font-semibold">
                        ACTIVE &amp; ENFORCED
                      </span>
                    </div>

                    <div className="space-y-2 text-xs">
                      <div className={`p-2.5 rounded border flex justify-between font-mono ${t.cardSub}`}>
                        <span className={t.subtext}>Security Key Model</span>
                        <span className="font-semibold">YubiKey 5C NFC (FIPS 140-2)</span>
                      </div>
                      <div className={`p-2.5 rounded border flex justify-between font-mono ${t.cardSub}`}>
                        <span className={t.subtext}>Attestation Serial</span>
                        <span>YK-9041-SEC-774A</span>
                      </div>
                      <div className={`p-2.5 rounded border flex justify-between font-mono ${t.cardSub}`}>
                        <span className={t.subtext}>WebAuthn Assertion</span>
                        <span className="text-emerald-600 dark:text-emerald-400">userPresence + userVerification</span>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* MFA & Ephemeral Key Rotation Row */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* TOTP Authenticator */}
                <div className={`p-5 rounded-xl border space-y-3 ${t.card}`}>
                  <div className="flex items-center justify-between">
                    <h3 className="text-xs font-semibold uppercase tracking-wider font-mono flex items-center space-x-2">
                      <Smartphone className="w-4 h-4 text-violet-500" />
                      <span>TOTP Mobile Authenticator</span>
                    </h3>
                    <span
                      className={`text-[10px] font-mono px-2 py-0.5 rounded font-semibold ${
                        totpEnabled
                          ? "bg-emerald-950 text-emerald-400 border border-emerald-800"
                          : t.badgeZinc
                      }`}
                    >
                      {totpEnabled ? "ENABLED" : "DISABLED"}
                    </span>
                  </div>
                  <p className={`text-xs ${t.subtext}`}>
                    Time-based one-time password fallback (1Password / Google Authenticator) for out-of-band SecOps attestation.
                  </p>
                  <button
                    onClick={() => setTotpEnabled(!totpEnabled)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors border ${isDark ? "bg-zinc-800 hover:bg-zinc-700 text-zinc-200 border-zinc-700" : "bg-slate-100 hover:bg-slate-200 text-slate-800 border-slate-300"}`}
                  >
                    {totpEnabled ? "Disable TOTP Fallback" : "Enable TOTP Fallback"}
                  </button>
                </div>

                {/* Session Ephemeral Fingerprint */}
                <div className={`p-5 rounded-xl border space-y-3 ${t.card}`}>
                  <div className="flex items-center justify-between">
                    <h3 className="text-xs font-semibold uppercase tracking-wider font-mono flex items-center space-x-2">
                      <Key className="w-4 h-4 text-emerald-500" />
                      <span>Operator Session Key</span>
                    </h3>
                    {keyRotated && (
                      <span className="text-[10px] font-mono text-emerald-500 animate-pulse">
                        Rotated!
                      </span>
                    )}
                  </div>
                  <div className={`p-2.5 rounded border font-mono text-xs flex items-center justify-between ${t.cardSub}`}>
                    <span className="truncate">{sessionFingerprint}</span>
                    <button
                      onClick={handleRotateSessionKey}
                      title="Re-generate Ephemeral Key"
                      className="hover:text-emerald-500 transition-colors ml-2"
                    >
                      <RotateCw className={`w-3.5 h-3.5 ${keyRotated ? "animate-spin text-emerald-500" : ""}`} />
                    </button>
                  </div>
                  <button
                    onClick={handleRotateSessionKey}
                    className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors border ${isDark ? "bg-zinc-800 hover:bg-zinc-700 text-zinc-200 border-zinc-700" : "bg-slate-100 hover:bg-slate-200 text-slate-800 border-slate-300"}`}
                  >
                    Rotate Ephemeral Key
                  </button>
                </div>
              </div>

              {/* Cryptographic RBAC Permissions */}
              <div className={`p-5 rounded-xl border space-y-3 ${t.card}`}>
                <h3 className="text-xs font-semibold uppercase tracking-wider font-mono flex items-center space-x-2">
                  <Shield className="w-4 h-4 text-violet-500" />
                  <span>Cryptographic RBAC Scopes Granted</span>
                </h3>
                <div className="flex flex-wrap gap-2 text-xs font-mono">
                  {[
                    "pki:sign",
                    "acl:modify",
                    "dlp:quarantine",
                    "mesh:provision",
                    "telemetry:tail",
                    "fido2:enforced",
                    "broker:rekey",
                    "crl:publish"
                  ].map((scope) => (
                    <span
                      key={scope}
                      className={`px-2.5 py-1 rounded border ${isDark ? "bg-[#09090b] text-violet-300 border-violet-800/40" : "bg-violet-50 text-violet-700 border-violet-200"}`}
                    >
                      {scope}
                    </span>
                  ))}
                </div>
              </div>

              {/* Active Session Manager */}
              <div className={`p-5 rounded-xl border space-y-4 ${t.card}`}>
                <div className="flex items-center justify-between">
                  <h3 className="text-xs font-semibold uppercase tracking-wider font-mono flex items-center space-x-2">
                    <Clock className="w-4 h-4 text-violet-500" />
                    <span>Active Operator Sessions</span>
                  </h3>
                  {sessions.filter((s) => !s.isCurrent).length > 0 && (
                    <button
                      onClick={handleRevokeOtherSessions}
                      className="text-xs text-rose-500 hover:text-rose-600 font-mono transition-colors"
                    >
                      Revoke Other Sessions
                    </button>
                  )}
                </div>

                <div className="space-y-2 text-xs font-mono">
                  {sessions.map((sess) => (
                    <div
                      key={sess.id}
                      className={`flex items-center justify-between p-3 rounded-lg border ${t.cardSub}`}
                    >
                      <div className="flex items-center space-x-3">
                        <div
                          className={`w-2 h-2 rounded-full ${
                            sess.isCurrent ? "bg-emerald-500" : isDark ? "bg-zinc-600" : "bg-slate-400"
                          }`}
                        />
                        <div>
                          <span className="font-semibold">{sess.device}</span>
                          <div className={`text-[10px] ${t.muted}`}>
                            {sess.ip} • {sess.client}
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center space-x-3">
                        {sess.isCurrent ? (
                          <span className="text-[10px] px-2 py-0.5 rounded bg-emerald-950 text-emerald-400 border border-emerald-800 font-semibold">
                            THIS CONSOLE
                          </span>
                        ) : (
                          <>
                            <span className={`text-[10px] ${t.muted}`}>{sess.activeTime}</span>
                            <button
                              onClick={() => handleTerminateSession(sess.id)}
                              className="text-[10px] px-2 py-0.5 rounded bg-rose-950/60 hover:bg-rose-900 text-rose-300 border border-rose-900/60 transition-colors"
                            >
                              Terminate
                            </button>
                          </>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}