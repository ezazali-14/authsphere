const fs = require('fs');

const code = `import React, { useState, useEffect } from "react";
import {
  LayoutDashboard, Cpu, KeyRound, ShieldAlert, Sliders, FileText,
  Award, Bell, Settings, User, LogOut, Search, AlertTriangle,
  RefreshCw, Zap, Activity, CheckCircle2, Radio
} from "lucide-react";

export default function App() {
  const [tab, setTab] = useState("overview");
  const [attack, setAttack] = useState(false);
  const [activeCount, setActiveCount] = useState(1248);

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveCount(p => p + (Math.random() > 0.5 ? 1 : -1));
    }, 3000);
    return () => clearInterval(timer);
  }, []);

  const [devices, setDevices] = useState([
    { id: "SNX-ESP32-0002", sku: "ESP32-WROOM-32D", ip: "10.50.250.175", cipher: "ECC-secp256r1", trust: 99, status: "ACTIVE" },
    { id: "SNX-ESP32-0004", sku: "ESP32-S3-DevKit", ip: "10.50.250.200", cipher: "ECC-secp256r1", trust: 97, status: "ACTIVE" },
    { id: "SNX-GW-RPI4-01", sku: "RPi 4 Model B", ip: "10.50.250.101", cipher: "TLS 1.2 / SHA-256", trust: 100, status: "ACTIVE" },
    { id: "SNX-ESP32-0001", sku: "ESP32-C3-MINI", ip: "10.50.250.112", cipher: "RSA-2048 (Deprecated)", trust: 0, status: "REVOKED" }
  ]);

  const [logs, setLogs] = useState([
    { id: 1, time: "18:24:12", type: "INFO", src: "AuthSphere-CA", msg: "Mutual TLS handshake verified via ECC-secp256r1 (34ms)." },
    { id: 2, time: "18:25:01", type: "INFO", src: "Mosquitto", msg: "Dynamic ACL applied for 'snx/telemetry' [Read/Write authorized]." },
    { id: 3, time: "18:26:22", type: "AI-EVAL", src: "Nakshatra-AI", msg: "Gemini 2.0 Flash evaluated 1,000 MQTT frames. Anomaly score: 0.001." }
  ]);

  const triggerAttack = () => {
    setAttack(true);
    setDevices(d => d.map(x => x.id === "SNX-ESP32-0004" ? { ...x, status: "QUARANTINED", trust: 15 } : x));
    setLogs(l => [{ id: Date.now(), time: new Date().toLocaleTimeString(), type: "CRITICAL", src: "Nakshatra-DLP", msg: "DLP LEAK INTERCEPTED: Credit card PAN found in SNX-ESP32-0004! Node isolated at broker." }, ...l]);
  };

  const resolveAttack = () => {
    setAttack(false);
    setDevices(d => d.map(x => x.id === "SNX-ESP32-0004" ? { ...x, status: "ACTIVE", trust: 97 } : x));
    setLogs(l => [{ id: Date.now(), time: new Date().toLocaleTimeString(), type: "INFO", src: "AuthSphere-CA", msg: "Zero-Touch re-attestation challenge validated. Node SNX-ESP32-0004 restored." }, ...l]);
  };

  const revokeDevice = (id) => {
    setDevices(d => d.map(x => x.id === id ? { ...x, status: "REVOKED", trust: 0 } : x));
    setLogs(l => [{ id: Date.now(), time: new Date().toLocaleTimeString(), type: "CRITICAL", src: "AuthSphere-CA", msg: "Node " + id + " revoked. Added to CRL. Broker cut-off enforced." }, ...l]);
  };

  return (