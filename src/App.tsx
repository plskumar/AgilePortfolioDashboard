import React, { useMemo, useState } from "react";
import { Card, CardContent } from "./components/Card";
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";

const navProjects = [
  "All Projects",
  "MedeWorks Core",
  "MedeCommand",
  "MedeAchieve",
  "MedeWorks React",
  "Detect360",
  "Health Fabric",
];

/**
 * DEMO DATA (swap with JIRA-derived metrics)
 * - plannedVsActual: coarse time buckets
 * - sprints: sprint-level committed/completed and scope change
 * - velocity: trend line (often equals completed SP per sprint)
 * - features: only used in per-project view
 */
const portfolio = {
  "MedeWorks Core": {
    devs: 8,
    capacitySP: 320,
    plannedVsActual: [
      { period: "Last Sprint", Planned: 140, Actual: 128 },
      { period: "Last Month", Planned: 420, Actual: 395 },
      { period: "YTD", Planned: 4650, Actual: 4380 },
    ],
    // Committed = initial sprint commitment; AddedScope = points added mid-sprint; Completed = accepted
    sprints: [
      { sprint: "S1", Committed: 72, AddedScope: 6, Completed: 72 },
      { sprint: "S2", Committed: 78, AddedScope: 10, Completed: 78 },
      { sprint: "S3", Committed: 80, AddedScope: 4, Completed: 80 },
      { sprint: "S4", Committed: 76, AddedScope: 8, Completed: 76 },
    ],
    velocity: [
      { sprint: "S1", velocity: 72 },
      { sprint: "S2", velocity: 78 },
      { sprint: "S3", velocity: 80 },
      { sprint: "S4", velocity: 76 },
    ],
    features: [
      { feature: "Reporting Modernization", estSP: 140, devs: 3, availSP: 120, completedSP: 110 },
      { feature: "Data Model Refactor", estSP: 90, devs: 2, availSP: 80, completedSP: 70 },
      { feature: "RBAC Hardening", estSP: 70, devs: 2, availSP: 60, completedSP: 58 },
    ],
  },
  MedeCommand: {
    devs: 6,
    capacitySP: 240,
    plannedVsActual: [
      { period: "Last Sprint", Planned: 110, Actual: 92 },
      { period: "Last Month", Planned: 350, Actual: 300 },
      { period: "YTD", Planned: 3900, Actual: 3320 },
    ],
    sprints: [
      { sprint: "S1", Committed: 58, AddedScope: 12, Completed: 58 },
      { sprint: "S2", Committed: 54, AddedScope: 6, Completed: 54 },
      { sprint: "S3", Committed: 60, AddedScope: 18, Completed: 60 },
      { sprint: "S4", Committed: 56, AddedScope: 10, Completed: 56 },
    ],
    velocity: [
      { sprint: "S1", velocity: 58 },
      { sprint: "S2", velocity: 54 },
      { sprint: "S3", velocity: 60 },
      { sprint: "S4", velocity: 56 },
    ],
    features: [
      { feature: "Admin Console", estSP: 100, devs: 2, availSP: 80, completedSP: 72 },
      { feature: "Alerting Rules", estSP: 85, devs: 2, availSP: 80, completedSP: 60 },
      { feature: "Audit Logs", estSP: 60, devs: 1, availSP: 40, completedSP: 38 },
    ],
  },
  MedeAchieve: {
    devs: 5,
    capacitySP: 200,
    plannedVsActual: [
      { period: "Last Sprint", Planned: 90, Actual: 88 },
      { period: "Last Month", Planned: 280, Actual: 268 },
      { period: "YTD", Planned: 3200, Actual: 3050 },
    ],
    sprints: [
      { sprint: "S1", Committed: 46, AddedScope: 4, Completed: 46 },
      { sprint: "S2", Committed: 50, AddedScope: 6, Completed: 50 },
      { sprint: "S3", Committed: 48, AddedScope: 2, Completed: 48 },
      { sprint: "S4", Committed: 52, AddedScope: 6, Completed: 52 },
    ],
    velocity: [
      { sprint: "S1", velocity: 46 },
      { sprint: "S2", velocity: 50 },
      { sprint: "S3", velocity: 48 },
      { sprint: "S4", velocity: 52 },
    ],
    features: [
      { feature: "Measure Calculation", estSP: 95, devs: 2, availSP: 80, completedSP: 78 },
      { feature: "Care Gap Views", estSP: 70, devs: 2, availSP: 80, completedSP: 62 },
      { feature: "Exports", estSP: 50, devs: 1, availSP: 40, completedSP: 36 },
    ],
  },
  "MedeWorks React": {
    devs: 4,
    capacitySP: 160,
    plannedVsActual: [
      { period: "Last Sprint", Planned: 70, Actual: 64 },
      { period: "Last Month", Planned: 210, Actual: 190 },
      { period: "YTD", Planned: 2400, Actual: 2190 },
    ],
    sprints: [
      { sprint: "S1", Committed: 34, AddedScope: 8, Completed: 34 },
      { sprint: "S2", Committed: 36, AddedScope: 6, Completed: 36 },
      { sprint: "S3", Committed: 38, AddedScope: 10, Completed: 38 },
      { sprint: "S4", Committed: 35, AddedScope: 6, Completed: 35 },
    ],
    velocity: [
      { sprint: "S1", velocity: 34 },
      { sprint: "S2", velocity: 36 },
      { sprint: "S3", velocity: 38 },
      { sprint: "S4", velocity: 35 },
    ],
    features: [
      { feature: "Design System", estSP: 80, devs: 2, availSP: 80, completedSP: 70 },
      { feature: "Routing & Auth", estSP: 55, devs: 1, availSP: 40, completedSP: 36 },
      { feature: "Dashboard UX", estSP: 60, devs: 2, availSP: 80, completedSP: 52 },
    ],
  },
  Detect360: {
    devs: 3,
    capacitySP: 120,
    plannedVsActual: [
      { period: "Last Sprint", Planned: 55, Actual: 48 },
      { period: "Last Month", Planned: 170, Actual: 140 },
      { period: "YTD", Planned: 1900, Actual: 1610 },
    ],
    sprints: [
      { sprint: "S1", Committed: 24, AddedScope: 12, Completed: 24 },
      { sprint: "S2", Committed: 26, AddedScope: 8, Completed: 26 },
      { sprint: "S3", Committed: 22, AddedScope: 10, Completed: 22 },
      { sprint: "S4", Committed: 25, AddedScope: 14, Completed: 25 },
    ],
    velocity: [
      { sprint: "S1", velocity: 24 },
      { sprint: "S2", velocity: 26 },
      { sprint: "S3", velocity: 22 },
      { sprint: "S4", velocity: 25 },
    ],
    features: [
      { feature: "Signal Tuning", estSP: 60, devs: 1, availSP: 40, completedSP: 34 },
      { feature: "Model Packaging", estSP: 55, devs: 1, availSP: 40, completedSP: 40 },
      { feature: "Dashboards", estSP: 40, devs: 1, availSP: 40, completedSP: 28 },
    ],
  },
  "Health Fabric": {
    devs: 4,
    capacitySP: 160,
    plannedVsActual: [
      { period: "Last Sprint", Planned: 78, Actual: 74 },
      { period: "Last Month", Planned: 240, Actual: 228 },
      { period: "YTD", Planned: 2700, Actual: 2565 },
    ],
    sprints: [
      { sprint: "S1", Committed: 36, AddedScope: 4, Completed: 36 },
      { sprint: "S2", Committed: 40, AddedScope: 8, Completed: 40 },
      { sprint: "S3", Committed: 39, AddedScope: 6, Completed: 39 },
      { sprint: "S4", Committed: 41, AddedScope: 10, Completed: 41 },
    ],
    velocity: [
      { sprint: "S1", velocity: 36 },
      { sprint: "S2", velocity: 40 },
      { sprint: "S3", velocity: 39 },
      { sprint: "S4", velocity: 41 },
    ],
    features: [
      { feature: "Integration Adapters", estSP: 70, devs: 2, availSP: 80, completedSP: 64 },
      { feature: "FHIR Mapping", estSP: 65, devs: 1, availSP: 40, completedSP: 40 },
      { feature: "Data Quality Rules", estSP: 55, devs: 1, availSP: 40, completedSP: 34 },
    ],
  },
} as const;

type ProjectName = keyof typeof portfolio;

function sum(nums: number[]) {
  return nums.reduce((a, b) => a + b, 0);
}

function pct(n: number, d: number) {
  if (!d) return 0;
  return (n / d) * 100;
}

function fmtPct(v: number) {
  return `${Math.round(v)}%`;
}

function chipClass(level: "green" | "yellow" | "red") {
  if (level === "green") return "bg-emerald-100 text-emerald-800 border-emerald-200";
  if (level === "yellow") return "bg-amber-100 text-amber-800 border-amber-200";
  return "bg-rose-100 text-rose-800 border-rose-200";
}

function confidenceFromKPIs(k: {
  predictability: number;
  spilloverRate: number;
  scopeChangeRate: number;
  utilization: number;
}) {
  const p = k.predictability;
  const s = k.spilloverRate;
  const c = k.scopeChangeRate;
  const u = k.utilization;

  const pLevel = p >= 0.9 ? "green" : p >= 0.75 ? "yellow" : "red";
  const sLevel = s <= 0.1 ? "green" : s <= 0.25 ? "yellow" : "red";
  const cLevel = c <= 0.15 ? "green" : c <= 0.35 ? "yellow" : "red";
  const uLevel = u >= 0.75 && u <= 1.05 ? "green" : u >= 0.6 && u <= 1.2 ? "yellow" : "red";

  const score =
    0.4 * (pLevel === "green" ? 1 : pLevel === "yellow" ? 0.6 : 0.2) +
    0.25 * (sLevel === "green" ? 1 : sLevel === "yellow" ? 0.6 : 0.2) +
    0.2 * (cLevel === "green" ? 1 : cLevel === "yellow" ? 0.6 : 0.2) +
    0.15 * (uLevel === "green" ? 1 : uLevel === "yellow" ? 0.6 : 0.2);

  const overall = score >= 0.8 ? "green" : score >= 0.55 ? "yellow" : "red";
  return { overall, pLevel, sLevel, cLevel, uLevel, score } as const;
}

function computeKPIs(p: {
  capacitySP: number;
  plannedVsActual: Array<{ period: string; Planned: number; Actual: number }>;
  sprints: Array<{ sprint: string; Committed: number; AddedScope: number; Completed: number }>;
}) {
  const ytd = p.plannedVsActual.find((x) => x.period === "YTD");
  const lastMonth = p.plannedVsActual.find((x) => x.period === "Last Month");

  const committed = sum(p.sprints.map((s) => s.Committed));
  const completed = sum(p.sprints.map((s) => s.Completed));
  const added = sum(p.sprints.map((s) => s.AddedScope));

  const carryoverBySprint = (() => {
    let cum = 0;
    return p.sprints.map((s) => {
      const carry = Math.max(0, s.Committed + s.AddedScope - s.Completed);
      cum += carry;
      return { sprint: s.sprint, Carryover: carry, Cumulative: cum };
    });
  })();

  const totalCarryover = sum(carryoverBySprint.map((x) => x.Carryover));

  const predictability = committed ? completed / committed : 0;
  const spilloverRate = committed ? totalCarryover / committed : 0;
  const scopeChangeRate = committed ? added / committed : 0;

  const utilization = p.capacitySP ? (lastMonth?.Actual ?? 0) / p.capacitySP : 0;
  const confidence = confidenceFromKPIs({ predictability, spilloverRate, scopeChangeRate, utilization });

  return {
    ytdPlanned: ytd?.Planned ?? 0,
    ytdActual: ytd?.Actual ?? 0,
    predictability,
    spilloverRate,
    scopeChangeRate,
    utilization,
    carryoverBySprint,
    confidence,
  };
}

export default function App() {
  const [selectedProject, setSelectedProject] = useState<(typeof navProjects)[number]>("All Projects");
  const isPortfolioView = selectedProject === "All Projects";

  const portfolioTotals = useMemo(() => {
    const items = Object.entries(portfolio).map(([name, v]) => ({ name, ...v }));

    const plannedVsActual = ["Last Sprint", "Last Month", "YTD"].map((period) => {
      const Planned = sum(items.map((x) => x.plannedVsActual.find((p) => p.period === period)?.Planned ?? 0));
      const Actual = sum(items.map((x) => x.plannedVsActual.find((p) => p.period === period)?.Actual ?? 0));
      return { period, Planned, Actual };
    });

    const sprintLabels = ["S1", "S2", "S3", "S4"]; // demo
    const sprints = sprintLabels.map((sprint) => {
      const Committed = sum(items.map((x) => x.sprints.find((s) => s.sprint === sprint)?.Committed ?? 0));
      const AddedScope = sum(items.map((x) => x.sprints.find((s) => s.sprint === sprint)?.AddedScope ?? 0));
      const Completed = sum(items.map((x) => x.sprints.find((s) => s.sprint === sprint)?.Completed ?? 0));
      return { sprint, Committed, AddedScope, Completed };
    });

    const velocity = sprintLabels.map((sprint) => ({
      sprint,
      velocity: sum(items.map((x) => x.velocity.find((v) => v.sprint === sprint)?.velocity ?? 0)),
    }));

    const devs = sum(items.map((x) => x.devs));
    const capacitySP = sum(items.map((x) => x.capacitySP));

    const kpis = computeKPIs({ capacitySP, plannedVsActual, sprints });

    return {
      devs,
      capacitySP,
      plannedVsActual,
      sprints,
      velocity,
      capacityByProject: items.map((x) => ({ name: x.name, devs: x.devs, capacitySP: x.capacitySP })),
      kpis,
    };
  }, []);

  const current = isPortfolioView ? null : portfolio[selectedProject as ProjectName];

  const plannedVsActual = isPortfolioView ? portfolioTotals.plannedVsActual : current!.plannedVsActual;
  const velocity = isPortfolioView ? portfolioTotals.velocity : current!.velocity;
  const sprints = isPortfolioView ? portfolioTotals.sprints : current!.sprints;
  const kpis = isPortfolioView
    ? portfolioTotals.kpis
    : computeKPIs({
        capacitySP: current!.capacitySP,
        plannedVsActual: current!.plannedVsActual,
        sprints: current!.sprints,
      });

  const carryoverChart = kpis.carryoverBySprint;

  // --- Burndown data (ideal vs actual remaining) ---
  const burndownData = (() => {
    const totalCommitted = sum(sprints.map((s) => s.Committed + s.AddedScope));
    let remainingActual = totalCommitted;

    return sprints.map((s, idx, arr) => {
      remainingActual -= s.Completed;
      const ideal = totalCommitted * (1 - idx / Math.max(1, arr.length - 1));
      return { sprint: s.sprint, Ideal: Math.max(0, Math.round(ideal)), Actual: Math.max(0, remainingActual) };
    });
  })();

  const confidenceLabel =
    kpis.confidence.overall === "green" ? "Green" : kpis.confidence.overall === "yellow" ? "Yellow" : "Red";

  return (
    <div style={{ display: "flex", height: "100vh", background: "#eef2f7" }}>
      {/* Sidebar */}
      <aside style={{ width: 280, background: "#0f172a", color: "white", padding: 16 }}>
        <div style={{ fontWeight: 700, fontSize: 18, marginBottom: 10 }}>Portfolio</div>
        <div style={{ fontSize: 12, color: "#cbd5e1", marginBottom: 12 }}>
          Portfolio view aggregates all projects. Project views include feature tracking.
        </div>
        <div style={{ display: "grid", gap: 8 }}>
          {navProjects.map((p) => (
            <div
              key={p}
              onClick={() => setSelectedProject(p)}
              style={{
                cursor: "pointer",
                padding: "10px 12px",
                borderRadius: 10,
                background: selectedProject === p ? "#2563eb" : "transparent",
              }}
            >
              {p}
            </div>
          ))}
        </div>
      </aside>

      {/* Main */}
      <main style={{ flex: 1, padding: 18, overflow: "auto" }}>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 12, alignItems: "center", marginBottom: 14 }}>
          <div style={{ fontSize: 22, fontWeight: 800, color: "#0f172a" }}>
            {selectedProject} – Executive Agile Dashboard
          </div>
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 8,
              padding: "6px 10px",
              borderRadius: 999,
              border: "1px solid #e2e8f0",
              background:
                kpis.confidence.overall === "green"
                  ? "#dcfce7"
                  : kpis.confidence.overall === "yellow"
                  ? "#fef3c7"
                  : "#ffe4e6",
              color:
                kpis.confidence.overall === "green"
                  ? "#065f46"
                  : kpis.confidence.overall === "yellow"
                  ? "#92400e"
                  : "#9f1239",
              fontSize: 12,
              fontWeight: 700,
            }}
          >
            <span
              style={{
                width: 8,
                height: 8,
                borderRadius: 999,
                background:
                  kpis.confidence.overall === "green"
                    ? "#10b981"
                    : kpis.confidence.overall === "yellow"
                    ? "#f59e0b"
                    : "#ef4444",
              }}
            />
            Confidence: {confidenceLabel}
          </div>
        </div>

        {/* KPI cards */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: 12, marginBottom: 14 }}>
          <Card>
            <CardContent>
              <div style={{ fontSize: 12, color: "#64748b" }}>Predictability (Completed / Committed)</div>
              <div style={{ fontSize: 26, fontWeight: 800, color: "#0f172a" }}>{fmtPct(kpis.predictability * 100)}</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent>
              <div style={{ fontSize: 12, color: "#64748b" }}>Spillover (Unfinished / Committed)</div>
              <div style={{ fontSize: 26, fontWeight: 800, color: "#0f172a" }}>{fmtPct(kpis.spilloverRate * 100)}</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent>
              <div style={{ fontSize: 12, color: "#64748b" }}>Scope Change (Added / Committed)</div>
              <div style={{ fontSize: 26, fontWeight: 800, color: "#0f172a" }}>{fmtPct(kpis.scopeChangeRate * 100)}</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent>
              <div style={{ fontSize: 12, color: "#64748b" }}>Utilization (Last Month / Capacity)</div>
              <div style={{ fontSize: 26, fontWeight: 800, color: "#0f172a" }}>{fmtPct(kpis.utilization * 100)}</div>
            </CardContent>
          </Card>
        </div>

        {/* Charts */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(340px, 1fr))", gap: 12, marginBottom: 14 }}>
          <Card>
            <CardContent>
              <div style={{ fontWeight: 700, marginBottom: 6, color: "#334155" }}>Planned vs Actual (Last Sprint / Month / YTD)</div>
              <div style={{ width: "100%", height: 240 }}>
                <ResponsiveContainer>
                  <BarChart data={plannedVsActual}>
                    <XAxis dataKey="period" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="Planned" fill="#60a5fa" />
                    <Bar dataKey="Actual" fill="#34d399" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
              <div style={{ fontSize: 12, color: "#64748b", marginTop: 6 }}>
                Delivery vs Plan (YTD): <b>{fmtPct(pct(kpis.ytdActual, kpis.ytdPlanned))}</b>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent>
              <div style={{ fontWeight: 700, marginBottom: 6, color: "#334155" }}>Velocity</div>
              <div style={{ width: "100%", height: 240 }}>
                <ResponsiveContainer>
                  <LineChart data={velocity}>
                    <XAxis dataKey="sprint" />
                    <YAxis />
                    <Tooltip />
                    <Line dataKey="velocity" stroke="#6366f1" strokeWidth={3} dot={{ r: 3 }} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent>
              <div style={{ fontWeight: 700, marginBottom: 6, color: "#334155" }}>Unfinished SP (Carryover) Accumulation</div>
              <div style={{ width: "100%", height: 240 }}>
                <ResponsiveContainer>
                  <LineChart data={carryoverChart}>
                    <XAxis dataKey="sprint" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line dataKey="Carryover" stroke="#f97316" strokeWidth={2} dot={{ r: 2 }} />
                    <Line dataKey="Cumulative" stroke="#ef4444" strokeWidth={3} dot={{ r: 3 }} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent>
              <div style={{ fontWeight: 700, marginBottom: 6, color: "#334155" }}>Burndown (Ideal vs Actual Remaining)</div>
              <div style={{ width: "100%", height: 240 }}>
                <ResponsiveContainer>
                  <LineChart data={burndownData}>
                    <XAxis dataKey="sprint" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line dataKey="Ideal" stroke="#94a3b8" strokeDasharray="4 4" strokeWidth={2} />
                    <Line dataKey="Actual" stroke="#6366f1" strokeWidth={3} dot={{ r: 3 }} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Portfolio project summary table */}
        {isPortfolioView && (
          <Card>
            <CardContent>
              <div style={{ fontWeight: 800, color: "#334155", marginBottom: 6 }}>Project YTD Summary (Cumulative)</div>
              <div style={{ fontSize: 12, color: "#64748b", marginBottom: 10 }}>
                YTD Planned, YTD Completed, and cumulative unfinished carryover per project.
              </div>

              <div style={{ overflowX: "auto" }}>
                <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13 }}>
                  <thead>
                    <tr style={{ background: "#f1f5f9" }}>
                      {["Project", "Developers", "Capacity (SP)", "YTD Planned", "YTD Completed", "YTD Unfinished", "Confidence"].map((h) => (
                        <th key={h} style={{ textAlign: h === "Project" ? "left" : "center", padding: 10, borderBottom: "1px solid #e2e8f0" }}>
                          {h}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {Object.entries(portfolio).map(([name, p]) => {
                      const k = computeKPIs({ capacitySP: p.capacitySP, plannedVsActual: p.plannedVsActual, sprints: p.sprints });
                      const unfinished = k.carryoverBySprint[k.carryoverBySprint.length - 1]?.Cumulative ?? 0;
                      return (
                        <tr key={name}>
                          <td style={{ padding: 10, borderBottom: "1px solid #e2e8f0", fontWeight: 700, color: "#0f172a" }}>{name}</td>
                          <td style={{ padding: 10, borderBottom: "1px solid #e2e8f0", textAlign: "center" }}>{p.devs}</td>
                          <td style={{ padding: 10, borderBottom: "1px solid #e2e8f0", textAlign: "center" }}>{p.capacitySP}</td>
                          <td style={{ padding: 10, borderBottom: "1px solid #e2e8f0", textAlign: "center" }}>{k.ytdPlanned}</td>
                          <td style={{ padding: 10, borderBottom: "1px solid #e2e8f0", textAlign: "center", fontWeight: 800 }}>{k.ytdActual}</td>
                          <td style={{ padding: 10, borderBottom: "1px solid #e2e8f0", textAlign: "center", fontWeight: 800, color: "#be123c" }}>{unfinished}</td>
                          <td style={{ padding: 10, borderBottom: "1px solid #e2e8f0", textAlign: "center" }}>
                            <span
                              style={{
                                display: "inline-flex",
                                alignItems: "center",
                                gap: 6,
                                padding: "4px 8px",
                                borderRadius: 999,
                                border: "1px solid #e2e8f0",
                                background:
                                  k.confidence.overall === "green"
                                    ? "#dcfce7"
                                    : k.confidence.overall === "yellow"
                                    ? "#fef3c7"
                                    : "#ffe4e6",
                                color:
                                  k.confidence.overall === "green"
                                    ? "#065f46"
                                    : k.confidence.overall === "yellow"
                                    ? "#92400e"
                                    : "#9f1239",
                                fontSize: 12,
                                fontWeight: 800,
                              }}
                            >
                              <span
                                style={{
                                  width: 8,
                                  height: 8,
                                  borderRadius: 999,
                                  background:
                                    k.confidence.overall === "green"
                                      ? "#10b981"
                                      : k.confidence.overall === "yellow"
                                      ? "#f59e0b"
                                      : "#ef4444",
                                }}
                              />
                              {k.confidence.overall.toUpperCase()}
                            </span>
                          </td>
                        </tr>
                      );
                    })}
                    <tr style={{ background: "#f8fafc" }}>
                      <td style={{ padding: 10, fontWeight: 800 }}>Portfolio Total</td>
                      <td style={{ padding: 10, textAlign: "center", fontWeight: 800 }}>{portfolioTotals.devs}</td>
                      <td style={{ padding: 10, textAlign: "center", fontWeight: 800 }}>{portfolioTotals.capacitySP}</td>
                      <td style={{ padding: 10, textAlign: "center", fontWeight: 800 }}>{portfolioTotals.kpis.ytdPlanned}</td>
                      <td style={{ padding: 10, textAlign: "center", fontWeight: 800 }}>{portfolioTotals.kpis.ytdActual}</td>
                      <td style={{ padding: 10, textAlign: "center", fontWeight: 800, color: "#be123c" }}>
                        {portfolioTotals.kpis.carryoverBySprint[portfolioTotals.kpis.carryoverBySprint.length - 1]?.Cumulative ?? 0}
                      </td>
                      <td style={{ padding: 10, textAlign: "center", fontWeight: 800 }}>{portfolioTotals.kpis.confidence.overall.toUpperCase()}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Feature-level: ONLY on project views */}
        {!isPortfolioView && (
          <Card>
            <CardContent>
              <div style={{ fontWeight: 800, color: "#334155", marginBottom: 6 }}>Feature-Level Delivery (Project Only)</div>
              <div style={{ overflowX: "auto" }}>
                <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13 }}>
                  <thead>
                    <tr style={{ background: "#f1f5f9" }}>
                      {["Feature", "Estimated SP", "Devs Assigned", "Available SP", "Completed SP", "Completion %", "Staffing Fit"].map((h) => (
                        <th key={h} style={{ textAlign: h === "Feature" ? "left" : "center", padding: 10, borderBottom: "1px solid #e2e8f0" }}>
                          {h}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {current!.features.map((f) => {
                      const completion = Math.round((f.completedSP / Math.max(1, f.estSP)) * 100);
                      const staffingFit = Math.round((f.availSP / Math.max(1, f.estSP)) * 100);
                      const color = completion >= 90 ? "#059669" : completion >= 70 ? "#d97706" : "#e11d48";
                      return (
                        <tr key={f.feature}>
                          <td style={{ padding: 10, borderBottom: "1px solid #e2e8f0", fontWeight: 700 }}>{f.feature}</td>
                          <td style={{ padding: 10, borderBottom: "1px solid #e2e8f0", textAlign: "center" }}>{f.estSP}</td>
                          <td style={{ padding: 10, borderBottom: "1px solid #e2e8f0", textAlign: "center" }}>{f.devs}</td>
                          <td style={{ padding: 10, borderBottom: "1px solid #e2e8f0", textAlign: "center" }}>{f.availSP}</td>
                          <td style={{ padding: 10, borderBottom: "1px solid #e2e8f0", textAlign: "center", fontWeight: 800 }}>{f.completedSP}</td>
                          <td style={{ padding: 10, borderBottom: "1px solid #e2e8f0", textAlign: "center", fontWeight: 800, color }}>{completion}%</td>
                          <td style={{ padding: 10, borderBottom: "1px solid #e2e8f0", textAlign: "center", fontWeight: 800 }}>{staffingFit}%</td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        )}
      </main>
    </div>
  );
}
