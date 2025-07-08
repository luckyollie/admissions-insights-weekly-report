import React from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { TrendingUp, AlertCircle, Calendar, Award, BarChart3 } from "lucide-react";

// Placeholder data for charts and tables
type NewsItem = { title: string; date: string; source: string; summary: string };
type PolicyChange = { university: string; policy: string; effective: string; notes?: string };
type Deadline = { university: string; type: string; date: string; notes?: string };
type Ranking = { rank: number; university: string; year2025: number; year2024: number };
type AdmissionRate = { year: number; Harvard: number; MIT: number };

const news: NewsItem[] = [
  { title: "Supreme Court Ends Race-Based Admissions", date: "2024-06-29", source: "NYT", summary: "The U.S. Supreme Court ruled to end affirmative action in college admissions, impacting selective universities nationwide." },
  { title: "FAFSA Overhaul Delayed Again", date: "2024-05-15", source: "Inside Higher Ed", summary: "The Department of Education announces another delay to FAFSA simplification, affecting financial aid timelines." },
];

const policies: PolicyChange[] = [
  { university: "Harvard", policy: "Test-Optional", effective: "Fall 2025", notes: "Extended policy post-pandemic" },
  { university: "MIT", policy: "Test-Required", effective: "Fall 2024", notes: "Reinstated SAT/ACT" },
];

const deadlines: Deadline[] = [
  { university: "Stanford", type: "Regular", date: "2026-01-03" },
  { university: "Yale", type: "Early Action", date: "2025-11-01" },
];

const rankings: Ranking[] = [
  { rank: 1, university: "Princeton", year2025: 1, year2024: 2 },
  { rank: 2, university: "MIT", year2025: 2, year2024: 1 },
];

const admissionRates: AdmissionRate[] = [
  { year: 2015, Harvard: 5.2, MIT: 7.9 },
  { year: 2020, Harvard: 4.6, MIT: 6.7 },
  { year: 2023, Harvard: 3.4, MIT: 4.8 },
];

export const TrendsDashboard: React.FC = () => {
  const [rssNews, setRssNews] = React.useState<any[]>([]);
  const [rssLoading, setRssLoading] = React.useState(true);
  const [rssError, setRssError] = React.useState<string | null>(null);

  React.useEffect(() => {
    const fetchNews = () => {
      setRssLoading(true);
      fetch('/api/rss-proxy')
        .then((res) => {
          if (!res.ok) throw new Error('Failed to fetch RSS feed');
          return res.json();
        })
        .then((data) => {
          if (data.items) setRssNews(data.items);
          setRssLoading(false);
        })
        .catch((err) => {
          setRssError(err.message);
          setRssLoading(false);
        });
    };
    fetchNews(); // Initial fetch
    const interval = setInterval(fetchNews, 24 * 60 * 60 * 1000); // 24 hours
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="space-y-8">
      {/* College Admissions News (Google Alerts RSS) */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-blue-900">
            <AlertCircle className="w-5 h-5 text-blue-700" /> College Admissions News (Google Alerts)
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {rssLoading && <div>Loading news...</div>}
          {rssError && <div className="text-red-500">{rssError}</div>}
          {!rssLoading && !rssError && rssNews.length === 0 && (
            <div>No recent news found.</div>
          )}
          {rssNews.slice(0, 5).map((item, idx) => (
            <div key={idx} className="border-b pb-2 last:border-b-0">
              <div className="flex items-center justify-between text-xs text-slate-500">
                <span>{item.pubDate ? new Date(item.pubDate).toLocaleDateString() : ''}</span>
                <span className="font-semibold">{item.creator || item.author || ''}</span>
              </div>
              <div className="font-medium text-slate-900">
                <a href={item.link} target="_blank" rel="noopener noreferrer" className="hover:underline" 
                  dangerouslySetInnerHTML={{ __html: item.title }} />
              </div>
              {item.contentSnippet && (
                <div className="text-slate-700 text-sm" dangerouslySetInnerHTML={{ __html: item.contentSnippet }} />
              )}
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Test-Optional/Test-Blind Policy Changes */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-blue-900">
            <BarChart3 className="w-5 h-5 text-blue-700" /> Test-Optional / Test-Blind Policy Tracker
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="min-w-full text-sm">
              <thead>
                <tr className="bg-slate-100">
                  <th className="px-3 py-2 text-left">University</th>
                  <th className="px-3 py-2 text-left">Policy</th>
                  <th className="px-3 py-2 text-left">Effective Date</th>
                  <th className="px-3 py-2 text-left">Notes</th>
                </tr>
              </thead>
              <tbody>
                {policies.map((p, idx) => (
                  <tr key={idx} className="border-b last:border-b-0">
                    <td className="px-3 py-2">{p.university}</td>
                    <td className="px-3 py-2">{p.policy}</td>
                    <td className="px-3 py-2">{p.effective}</td>
                    <td className="px-3 py-2">{p.notes}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Application Deadlines */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-blue-900">
            <Calendar className="w-5 h-5 text-blue-700" /> Application Deadlines
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="min-w-full text-sm">
              <thead>
                <tr className="bg-slate-100">
                  <th className="px-3 py-2 text-left">University</th>
                  <th className="px-3 py-2 text-left">Deadline Type</th>
                  <th className="px-3 py-2 text-left">Date</th>
                  <th className="px-3 py-2 text-left">Notes</th>
                </tr>
              </thead>
              <tbody>
                {deadlines.map((d, idx) => (
                  <tr key={idx} className="border-b last:border-b-0">
                    <td className="px-3 py-2">{d.university}</td>
                    <td className="px-3 py-2">{d.type}</td>
                    <td className="px-3 py-2">{d.date}</td>
                    <td className="px-3 py-2">{d.notes || "-"}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Top College Rankings & Shifts */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-blue-900">
            <Award className="w-5 h-5 text-blue-700" /> Top College Rankings & Shifts
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="min-w-full text-sm">
              <thead>
                <tr className="bg-slate-100">
                  <th className="px-3 py-2 text-left">Rank</th>
                  <th className="px-3 py-2 text-left">University</th>
                  <th className="px-3 py-2 text-left">2025</th>
                  <th className="px-3 py-2 text-left">2024</th>
                  <th className="px-3 py-2 text-left">Δ Rank</th>
                </tr>
              </thead>
              <tbody>
                {rankings.map((r, idx) => (
                  <tr key={idx} className="border-b last:border-b-0">
                    <td className="px-3 py-2">{r.rank}</td>
                    <td className="px-3 py-2">{r.university}</td>
                    <td className="px-3 py-2">{r.year2025}</td>
                    <td className="px-3 py-2">{r.year2024}</td>
                    <td className="px-3 py-2">{r.year2025 - r.year2024 > 0 ? `+${r.year2025 - r.year2024}` : r.year2025 - r.year2024}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Admission Rate Trends & Analysis */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-blue-900">
            <TrendingUp className="w-5 h-5 text-blue-700" /> Admission Rate Trends & Analysis
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={250}>
            <LineChart data={admissionRates} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="year" />
              <YAxis domain={[0, 10]} tickFormatter={(v) => `${v}%`} />
              <Tooltip formatter={(value: number) => `${value}%`} />
              <Line type="monotone" dataKey="Harvard" stroke="#1e40af" strokeWidth={2} />
              <Line type="monotone" dataKey="MIT" stroke="#3b82f6" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
          <div className="mt-4 text-sm text-slate-700">
            <p>
              <b>Harvard:</b> 5.2% (2015) → 3.4% (2023)
              <br />
              <b>MIT:</b> 7.9% (2015) → 4.8% (2023)
            </p>
            <p className="mt-2">
              Both universities have seen a significant decline in admission rates over the past decade, reflecting increased selectivity and applicant volume.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default TrendsDashboard;
