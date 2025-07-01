
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, PieChart, Pie, Cell } from "recharts";
import { TrendingUp, TrendingDown, AlertCircle, Users, BookOpen, Award } from "lucide-react";

const admissionsTrends = [
  { week: "Week 1", applications: 1250, acceptances: 425, testOptional: 75 },
  { week: "Week 2", applications: 1380, acceptances: 468, testOptional: 78 },
  { week: "Week 3", applications: 1420, acceptances: 482, testOptional: 82 },
  { week: "Week 4", applications: 1510, acceptances: 513, testOptional: 85 },
];

const schoolTypes = [
  { name: "Private Universities", value: 45, color: "#1e40af" },
  { name: "Public Universities", value: 35, color: "#3b82f6" },
  { name: "Liberal Arts Colleges", value: 20, color: "#60a5fa" },
];

const majorTrends = [
  { major: "Computer Science", growth: 18, applications: 2840 },
  { major: "Healthcare", growth: 15, applications: 2120 },
  { major: "Business", growth: -5, applications: 1890 },
  { major: "Engineering", growth: 12, applications: 2340 },
  { major: "Liberal Arts", growth: -8, applications: 1450 },
];

import React, { useEffect, useState } from "react";
import Fuse from "fuse.js";

// Helper: Extracts bullet points with unique, relevant emojis from trends paragraph
function extractTrendBullets(paragraph: string): string[] {
  if (!paragraph) return [];
  const emojiMap: { [key: string]: string } = {
    "growth": "📈",
    "increase": "📈",
    "up": "📈",
    "fafsa": "💰",
    "financial aid": "💰",
    "test-optional": "📝",
    "selective": "🎯",
    "selectivity": "🎯",
    "competition": "🏆",
    "competitive": "🏆",
    "demographic": "👥",
    "demographics": "👥",
    "application volume": "🔢",
    "volume": "🔢",
    "record": "⭐",
    "economic": "💹",
    "economy": "💹",
    "deadline": "⏰",
    "trend": "📊",
    "policy": "📜",
    "school": "🏫",
  };
  // Order of keys matters for specificity
  const keys = [
    "fafsa", "financial aid", "test-optional", "growth", "increase", "up", "selective", "selectivity", "competition", "competitive", "demographic", "demographics", "application volume", "volume", "record", "economic", "economy", "deadline", "trend", "policy", "school"
  ];
  // Split on period followed by space or end of string
  const rawBullets = paragraph.split(/\.( |$)/).map(s => s.trim()).filter(Boolean);
  return rawBullets.map(line => {
    let emoji = "•";
    const lower = line.toLowerCase();
    for (const key of keys) {
      if (lower.includes(key)) {
        emoji = emojiMap[key];
        break;
      }
    }
    return `${emoji} ${line}`;
  });
}


export const TrendsAuswertung = () => {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Acceptance rates search state
  const [acceptanceSearch, setAcceptanceSearch] = useState("");

  // Fuzzy search for acceptance rates
  let filteredAcceptanceRates: any[] = [];
  if (data && data.acceptanceRates) {
    const ivyLeagues = [
      "Harvard University",
      "Yale University",
      "Princeton University",
      "Columbia University",
      "Brown University",
      "Dartmouth College",
      "University of Pennsylvania",
      "Cornell University"
    ];
    if (!acceptanceSearch.trim()) {
      filteredAcceptanceRates = data.acceptanceRates.filter((item: any) =>
        ivyLeagues.some(ivy => item.school.toLowerCase().includes(ivy.toLowerCase()))
      );
    } else {
      // Fuzzy search using Fuse.js
      const Fuse = require('fuse.js');
      const fuse = new Fuse(data.acceptanceRates, {
        keys: ['school'],
        threshold: 0.4
      });
      const results = fuse.search(acceptanceSearch.trim());
      filteredAcceptanceRates = results.map((result: any) => result.item);
    }
  }


  useEffect(() => {
    setLoading(true);
    setError(null);
    fetch("/api/get-report-data")
      .then(async (res) => {
        if (!res.ok) throw new Error("Failed to fetch report data");
        return res.json();
      })
      .then((json) => {
        setData(json);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message || "Unknown error");
        setLoading(false);
      });
  }, []);

  function formatTimestamp(ts?: string) {
    if (!ts) return "-";
    const date = new Date(ts);
    return date.toLocaleString(undefined, {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  }

  return (
    <div className="space-y-6">
      {/* Data freshness banner */}
      <div className="flex items-center justify-between bg-blue-50 border border-blue-200 rounded-lg px-4 py-2 mb-2">
        <span className="text-blue-900 font-medium text-sm">
          {loading ? "Loading latest trends..." : error ? "Failed to load data" : `Last updated: ${formatTimestamp(data?.lastFetched)}`}
        </span>
        {error && <span className="text-red-600 text-xs">{error}</span>}
      </div>

      {/* Content */}
      {loading ? (
        <div className="text-center text-slate-500 py-12">Loading report...</div>
      ) : error ? (
        <div className="text-center text-red-600 py-12">{error}</div>
      ) : data ? (
        <>
          {/* Key Metrics */}
          {/* Key Metrics */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {data.keyMetrics && data.keyMetrics.map((metric: any, idx: number) => (
              <Card key={idx}>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-slate-600">{metric.title}</p>
                      <p className="text-2xl font-bold text-slate-900">{metric.value}</p>
                      <div className="flex items-center mt-2">
                        {metric.change === "increase" ? (
                          <TrendingUp className="h-4 w-4 text-green-500 mr-1" />
                        ) : metric.change === "decrease" ? (
                          <TrendingDown className="h-4 w-4 text-red-500 mr-1" />
                        ) : (
                          <AlertCircle className="h-4 w-4 text-yellow-500 mr-1" />
                        )}
                        <span className={`text-sm ${metric.change === "increase" ? "text-green-600" : metric.change === "decrease" ? "text-red-600" : "text-yellow-600"}`}>{metric.change}</span>
                      </div>
                    </div>
                    {/* Icon can be improved by mapping to metric.title */}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Application Trends (bulleted, with emojis) */}
          <Card>
            <CardHeader>
              <CardTitle>Application Trends Overview</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="list-disc pl-6 space-y-2 text-slate-800 text-base">
                {extractTrendBullets(data.applicationTrends).map((item, idx) => (
                  <li key={idx}>{item}</li>
                ))}
              </ul>
            </CardContent>
          </Card>

          {/* Acceptance Rates with Search */}
          <Card>
            <CardHeader>
              <CardTitle>Acceptance Rates</CardTitle>
              <div className="mt-2">
                <input
                  type="text"
                  placeholder="Search university (e.g. National University of Singapore)"
                  className="border border-slate-300 rounded px-3 py-1 w-full text-sm focus:outline-none focus:ring-2 focus:ring-blue-200"
                  value={acceptanceSearch}
                  onChange={e => setAcceptanceSearch(e.target.value)}
                />
              </div>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="min-w-full text-left text-sm">
                  <thead>
                    <tr>
                      <th className="px-2 py-1 font-semibold text-slate-700">School</th>
                      <th className="px-2 py-1 font-semibold text-slate-700">Rate</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredAcceptanceRates.map((item: any, idx: number) => (
                      <tr key={idx}>
                        <td className="px-2 py-1">{item.school}</td>
                        <td className="px-2 py-1">{item.rate}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                {filteredAcceptanceRates.length === 0 && (
                  <div className="text-slate-500 text-sm py-4 text-center">No results found.</div>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Popular Majors */}
          <Card>
            <CardHeader>
              <CardTitle>Popular Majors</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2">
                {data.popularMajors && data.popularMajors.map((major: string, idx: number) => (
                  <Badge key={idx} variant="default">{major}</Badge>
                ))}
              </div>
            </CardContent>
          </Card>
        </>
      ) : null}
    </div>
  );
};

// (Removed obsolete static sections. All content now comes from Gemini-powered API.)
