import React, { useMemo, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
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
};

function sum(nums) {
  return nums.reduce((a, b) => a + b, 0);
}

function pct(n, d) {
  if (!d) return 0;
  return (n / d) * 100;
}

function fmtPct(v) {
  return `${Math.round(v)}%`;
}

function chipClass(level) {
  if (level === "green") return "bg-emerald-100 text-emerald-800 border-emerald-200";
  if (level === "yellow") return "bg-amber-100 text-amber-800 border-amber-200";
  return "bg-rose-100 text-rose-800 border-rose-200";
}

function confidenceFromKPIs({ predictability, spilloverRate, scopeChangeRate, utilization }) {
  const pLevel = predictability >= 0.9 ? "green" : predictability >= 0.75 ? "yellow" : "red";
  const sLevel = spilloverRate <= 0.1 ? "green" : spilloverRate <= 0.25 ? "yellow" : "red";
  const cLevel = scopeChangeRate <= 0.15 ? "green" : scopeChangeRate <= 0.35 ? "yellow" : "red";
  const uLevel = utilization >= 0.75 && utilization <= 1.05 ? "green" : utilization >= 0.6 && utilization <= 1.2 ? "yellow" : "red";

  const score =
    0.4 * (pLevel === "green" ? 1 : pLevel === "yellow" ? 0.6 : 0.2) +
    0.25 * (sLevel === "green" ? 1 : sLevel === "yellow" ? 0.6 : 0.2) +
    0.2 * (cLevel === "green" ? 1 : cLevel === "yellow" ? 0.6 : 0.2) +
    0.15 * (uLevel === "green" ? 1 : uLevel === "yellow" ? 0.6 : 0.2);

  const overall = score >= 0.8 ? "green" : score >= 0.55 ? "yellow" : "red";
  return { overall, pLevel, sLevel, cLevel, uLevel, score };
}

function computeKPIs({ capacitySP, plannedVsActual, sprints }) {
  const ytd = plannedVsActual.find((x) => x.period === "YTD");
  const lastMonth = plannedVsActual.find((x) => x.period === "Last Month");

  const committed = sum(sprints.map((s) => s.Committed));
  const completed = sum(sprints.map((s) => s.Completed));
  const added = sum(sprints.map((s) => s.AddedScope));

  const carryoverBySprint = (() => {
    let cum = 0;
    return sprints.map((s) => {
      const carry = Math.max(0, s.Committed + s.AddedScope - s.Completed);
      cum += carry;
      return { sprint: s.sprint, Carryover: carry, Cumulative: cum };
    });
  })();

  const totalCarryover = sum(carryoverBySprint.map((x) => x.Carryover));

  const predictability = committed ? completed / committed : 0;
  const spilloverRate = committed ? totalCarryover / committed : 0;
  const scopeChangeRate = committed ? added / committed : 0;

  const utilization = capacitySP ? (lastMonth?.Actual ?? 0) / capacitySP : 0;
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

export default function AgileDashboard() {
  const [selectedProject, setSelectedProject] = useState("All Projects");
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
      kpis,
    };
  }, []);

  const current = isPortfolioView ? null : portfolio[selectedProject];

  const plannedVsActual = isPortfolioView ? portfolioTotals.plannedVsActual : current.plannedVsActual;
  const velocity = isPortfolioView ? portfolioTotals.velocity : current.velocity;
  const sprints = isPortfolioView ? portfolioTotals.sprints : current.sprints;

  const kpis = isPortfolioView
    ? portfolioTotals.kpis
    : computeKPIs({
        capacitySP: current.capacitySP,
        plannedVsActual: current.plannedVsActual,
        sprints: current.sprints,
      });

  const carryoverChart = kpis.carryoverBySprint;

  const burndownData = useMemo(() => {
    const totalCommitted = sum(sprints.map((s) => s.Committed + s.AddedScope));
    let remainingActual = totalCommitted;

    return sprints.map((s, idx, arr) => {
      remainingActual -= s.Completed;
      const ideal = totalCommitted * (1 - idx / Math.max(1, arr.length - 1));
      return {
        sprint: s.sprint,
        Ideal: Math.max(0, Math.round(ideal)),
        Actual: Math.max(0, remainingActual),
      };
    });
  }, [sprints]);

  const confidenceLabel = kpis.confidence.overall === "green" ? "Green" : kpis.confidence.overall === "yellow" ? "Yellow" : "Red";

  return (
    <div className="flex h-screen flex-col bg-gradient-to-br from-slate-100 to-slate-200">
      {/* Top navigation */}
      <header className="sticky top-0 z-10 bg-slate-900 text-white shadow-xl">
        <div className="mx-auto max-w-7xl px-4 py-3">
          <div className="flex flex-col gap-2">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div>
                <div className="text-lg font-semibold">Agile Portfolio Leadership Dashboard</div>
                <div className="text-xs text-slate-300">Switch projects to drill in. Portfolio view aggregates across all projects.</div>
              </div>

              <div className={`inline-flex items-center gap-2 px-2 py-1 rounded-full border text-xs font-semibold ${chipClass(kpis.confidence.overall)}`}>
                <span className={`h-2 w-2 rounded-full ${kpis.confidence.overall === "green" ? "bg-emerald-500" : kpis.confidence.overall === "yellow" ? "bg-amber-500" : "bg-rose-500"}`} />
                Confidence: {confidenceLabel}
              </div>
            </div>

            <div className="flex flex-wrap gap-2">
              {navProjects.map((p) => (
                <button
                  key={p}
                  onClick={() => setSelectedProject(p)}
                  className={`rounded-full px-3 py-1 text-sm transition border ${
                    selectedProject === p
                      ? "bg-blue-600 border-blue-500"
                      : "bg-slate-800 border-slate-700 hover:bg-slate-700"
                  }`}
                >
                  {p}
                </button>
              ))}
            </div>
          </div>
        </div>
      </header>

      {/* Main */}
      <main className="flex-1 overflow-y-auto">
        <div className="mx-auto max-w-7xl p-6">
          <div className="mb-6 flex flex-col gap-2">
            <h1 className="text-2xl font-bold text-slate-800">{selectedProject}</h1>
            <div className="text-sm text-slate-600">
              {isPortfolioView
                ? `Portfolio totals: ${portfolioTotals.devs} developers · ${portfolioTotals.capacitySP} SP capacity`
                : `Team size: ${current.devs} developers · ${current.capacitySP} SP capacity`}
            </div>
          </div>

          {/* EXEC KPIs */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            <Card className="rounded-2xl shadow">
              <CardContent>
                <div className="text-xs text-slate-500">Predictability (Completed / Committed)</div>
                <div className="text-2xl font-bold text-slate-900">{fmtPct(kpis.predictability * 100)}</div>
                <div className={`mt-2 inline-flex px-2 py-1 rounded-full border text-xs font-semibold ${chipClass(kpis.confidence.pLevel)}`}>
                  {String(kpis.confidence.pLevel).toUpperCase()}
                </div>
              </CardContent>
            </Card>

            <Card className="rounded-2xl shadow">
              <CardContent>
                <div className="text-xs text-slate-500">Spillover Rate (Unfinished / Committed)</div>
                <div className="text-2xl font-bold text-slate-900">{fmtPct(kpis.spilloverRate * 100)}</div>
                <div className={`mt-2 inline-flex px-2 py-1 rounded-full border text-xs font-semibold ${chipClass(kpis.confidence.sLevel)}`}>
                  {String(kpis.confidence.sLevel).toUpperCase()}
                </div>
              </CardContent>
            </Card>

            <Card className="rounded-2xl shadow">
              <CardContent>
                <div className="text-xs text-slate-500">Scope Change (Added / Committed)</div>
                <div className="text-2xl font-bold text-slate-900">{fmtPct(kpis.scopeChangeRate * 100)}</div>
                <div className={`mt-2 inline-flex px-2 py-1 rounded-full border text-xs font-semibold ${chipClass(kpis.confidence.cLevel)}`}>
                  {String(kpis.confidence.cLevel).toUpperCase()}
                </div>
              </CardContent>
            </Card>

            <Card className="rounded-2xl shadow">
              <CardContent>
                <div className="text-xs text-slate-500">Capacity Utilization (Last Month)</div>
                <div className="text-2xl font-bold text-slate-900">{fmtPct(kpis.utilization * 100)}</div>
                <div className={`mt-2 inline-flex px-2 py-1 rounded-full border text-xs font-semibold ${chipClass(kpis.confidence.uLevel)}`}>
                  {String(kpis.confidence.uLevel).toUpperCase()}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Core Charts */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
            <Card className="rounded-2xl shadow">
              <CardContent>
                <h3 className="font-semibold mb-2 text-slate-700">Planned vs Actual (Last Sprint / Month / YTD)</h3>
                <ResponsiveContainer width="100%" height={240}>
                  <BarChart data={plannedVsActual}>
                    <XAxis dataKey="period" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="Planned" fill="#60a5fa" />
                    <Bar dataKey="Actual" fill="#34d399" />
                  </BarChart>
                </ResponsiveContainer>
                <div className="mt-2 text-xs text-slate-600">
                  Delivery vs Plan (YTD): <span className="font-semibold">{fmtPct(pct(kpis.ytdActual, kpis.ytdPlanned))}</span>
                </div>
              </CardContent>
            </Card>

            <Card className="rounded-2xl shadow">
              <CardContent>
                <h3 className="font-semibold mb-2 text-slate-700">Velocity</h3>
                <ResponsiveContainer width="100%" height={240}>
                  <LineChart data={velocity}>
                    <XAxis dataKey="sprint" />
                    <YAxis />
                    <Tooltip />
                    <Line dataKey="velocity" stroke="#6366f1" strokeWidth={3} dot={{ r: 3 }} />
                  </LineChart>
                </ResponsiveContainer>
                <div className="mt-2 text-xs text-slate-600">
                  Avg velocity: <span className="font-semibold">{Math.round(sum(velocity.map((v) => v.velocity)) / Math.max(1, velocity.length))} SP</span>
                </div>
              </CardContent>
            </Card>

            <Card className="rounded-2xl shadow">
              <CardContent>
                <h3 className="font-semibold mb-2 text-slate-700">Unfinished SP Accumulation</h3>
                <ResponsiveContainer width="100%" height={240}>
                  <LineChart data={carryoverChart}>
                    <XAxis dataKey="sprint" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line dataKey="Carryover" stroke="#f97316" strokeWidth={2} dot={{ r: 2 }} />
                    <Line dataKey="Cumulative" stroke="#ef4444" strokeWidth={3} dot={{ r: 3 }} />
                  </LineChart>
                </ResponsiveContainer>
                <div className="mt-2 text-xs text-slate-600">
                  Cumulative unfinished: <span className="font-semibold">{carryoverChart[carryoverChart.length - 1]?.Cumulative ?? 0} SP</span>
                </div>
              </CardContent>
            </Card>

            <Card className="rounded-2xl shadow">
              <CardContent>
                <h3 className="font-semibold mb-2 text-slate-700">Sprint Burndown</h3>
                <ResponsiveContainer width="100%" height={240}>
                  <LineChart data={burndownData}>
                    <XAxis dataKey="sprint" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line dataKey="Ideal" stroke="#94a3b8" strokeDasharray="4 4" strokeWidth={2} />
                    <Line dataKey="Actual" stroke="#6366f1" strokeWidth={3} dot={{ r: 3 }} />
                  </LineChart>
                </ResponsiveContainer>
                <div className="mt-2 text-xs text-slate-600">Ideal vs actual remaining across sprints</div>
              </CardContent>
            </Card>
          </div>

          {/* Portfolio: per-project cumulative YTD summary */}
          {isPortfolioView && (
            <Card className="rounded-2xl shadow mb-6">
              <CardContent>
                <h3 className="font-semibold mb-3 text-slate-700">Project YTD Summary (Cumulative)</h3>
                <div className="text-xs text-slate-600 mb-3">
                  Per project: YTD planned SP, YTD completed SP, and cumulative unfinished SP (carryover accumulation across shown sprints).
                </div>

                <div className="overflow-x-auto">
                  <table className="min-w-full text-sm">
                    <thead className="bg-slate-100">
                      <tr>
                        <th className="p-2 text-left">Project</th>
                        <th className="p-2 text-center">Developers</th>
                        <th className="p-2 text-center">Capacity (SP)</th>
                        <th className="p-2 text-center">YTD Planned (SP)</th>
                        <th className="p-2 text-center">YTD Completed (SP)</th>
                        <th className="p-2 text-center">YTD Unfinished (SP)</th>
                        <th className="p-2 text-center">Confidence</th>
                      </tr>
                    </thead>
                    <tbody>
                      {Object.entries(portfolio).map(([name, p]) => {
                        const k = computeKPIs({ capacitySP: p.capacitySP, plannedVsActual: p.plannedVsActual, sprints: p.sprints });
                        const unfinished = k.carryoverBySprint[k.carryoverBySprint.length - 1]?.Cumulative ?? 0;
                        const conf = k.confidence.overall;
                        const confLabel = conf === "green" ? "Green" : conf === "yellow" ? "Yellow" : "Red";
                        return (
                          <tr key={name} className="border-t bg-white">
                            <td className="p-2 text-slate-900 font-semibold">{name}</td>
                            <td className="p-2 text-center">{p.devs}</td>
                            <td className="p-2 text-center">{p.capacitySP}</td>
                            <td className="p-2 text-center">{k.ytdPlanned}</td>
                            <td className="p-2 text-center font-semibold">{k.ytdActual}</td>
                            <td className="p-2 text-center font-semibold text-rose-700">{unfinished}</td>
                            <td className="p-2 text-center">
                              <span className={`inline-flex items-center gap-2 px-2 py-1 rounded-full border text-xs font-semibold ${chipClass(conf)}`}>
                                <span className={`h-2 w-2 rounded-full ${conf === "green" ? "bg-emerald-500" : conf === "yellow" ? "bg-amber-500" : "bg-rose-500"}`} />
                                {confLabel}
                              </span>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Feature-level: ONLY on project views */}
          {!isPortfolioView && (
            <Card className="rounded-2xl shadow">
              <CardContent>
                <div className="flex items-baseline justify-between gap-4 mb-4">
                  <h3 className="font-semibold text-slate-700">Feature-Level Delivery</h3>
                  <div className="text-xs text-slate-600">Project only · estimate, staffing, available capacity and completion</div>
                </div>

                <div className="overflow-x-auto">
                  <table className="min-w-full text-sm">
                    <thead className="bg-slate-100">
                      <tr>
                        <th className="p-2 text-left">Feature</th>
                        <th className="p-2 text-center">Estimated SP</th>
                        <th className="p-2 text-center">Devs Assigned</th>
                        <th className="p-2 text-center">Available SP</th>
                        <th className="p-2 text-center">Completed SP</th>
                        <th className="p-2 text-center">Completion %</th>
                        <th className="p-2 text-center">Staffing Fit</th>
                      </tr>
                    </thead>
                    <tbody>
                      {current.features.map((f) => {
                        const completion = Math.round((f.completedSP / Math.max(1, f.estSP)) * 100);
                        const staffingFit = Math.round((f.availSP / Math.max(1, f.estSP)) * 100);
                        return (
                          <tr key={f.feature} className="border-t">
                            <td className="p-2 text-slate-800">{f.feature}</td>
                            <td className="p-2 text-center">{f.estSP}</td>
                            <td className="p-2 text-center">{f.devs}</td>
                            <td className="p-2 text-center">{f.availSP}</td>
                            <td className="p-2 text-center font-semibold text-slate-900">{f.completedSP}</td>
                            <td className={`p-2 text-center font-semibold ${completion >= 90 ? "text-emerald-600" : completion >= 70 ? "text-amber-600" : "text-rose-600"}`}>
                              {completion}%
                            </td>
                            <td className={`p-2 text-center font-semibold ${staffingFit >= 100 ? "text-emerald-600" : staffingFit >= 85 ? "text-amber-600" : "text-rose-600"}`}>
                              {staffingFit}%
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>

                <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="rounded-xl bg-white border p-3">
                    <div className="text-xs text-slate-500">Total Feature Estimate</div>
                    <div className="text-lg font-semibold text-slate-900">{sum(current.features.map((f) => f.estSP))} SP</div>
                  </div>
                  <div className="rounded-xl bg-white border p-3">
                    <div className="text-xs text-slate-500">Total Available SP</div>
                    <div className="text-lg font-semibold text-slate-900">{sum(current.features.map((f) => f.availSP))} SP</div>
                  </div>
                  <div className="rounded-xl bg-white border p-3">
                    <div className="text-xs text-slate-500">Total Completed SP</div>
                    <div className="text-lg font-semibold text-slate-900">{sum(current.features.map((f) => f.completedSP))} SP</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </main>
    </div>
  );
}
