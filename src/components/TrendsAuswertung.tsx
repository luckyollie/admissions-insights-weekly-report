
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

export const TrendsAuswertung = () => {
  return (
    <div className="space-y-6">
      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-slate-600">Total Applications</p>
                <p className="text-2xl font-bold text-slate-900">5,560</p>
                <div className="flex items-center mt-2">
                  <TrendingUp className="h-4 w-4 text-green-500 mr-1" />
                  <span className="text-sm text-green-600">+12% vs last month</span>
                </div>
              </div>
              <Users className="h-8 w-8 text-blue-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-slate-600">Acceptance Rate</p>
                <p className="text-2xl font-bold text-slate-900">34.2%</p>
                <div className="flex items-center mt-2">
                  <TrendingDown className="h-4 w-4 text-red-500 mr-1" />
                  <span className="text-sm text-red-600">-2.1% vs last month</span>
                </div>
              </div>
              <Award className="h-8 w-8 text-green-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-slate-600">Test-Optional</p>
                <p className="text-2xl font-bold text-slate-900">80%</p>
                <div className="flex items-center mt-2">
                  <TrendingUp className="h-4 w-4 text-green-500 mr-1" />
                  <span className="text-sm text-green-600">+5% vs last month</span>
                </div>
              </div>
              <BookOpen className="h-8 w-8 text-purple-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-slate-600">Yield Rate</p>
                <p className="text-2xl font-bold text-slate-900">28.7%</p>
                <div className="flex items-center mt-2">
                  <AlertCircle className="h-4 w-4 text-yellow-500 mr-1" />
                  <span className="text-sm text-yellow-600">Stable</span>
                </div>
              </div>
              <TrendingUp className="h-8 w-8 text-yellow-500" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Applications Trend */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <TrendingUp className="h-5 w-5" />
              <span>Weekly Application Trends</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={admissionsTrends}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="week" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="applications" stroke="#3b82f6" strokeWidth={3} />
                <Line type="monotone" dataKey="acceptances" stroke="#10b981" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* School Types Distribution */}
        <Card>
          <CardHeader>
            <CardTitle>Application Distribution by School Type</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={schoolTypes}
                  cx="50%"
                  cy="50%"
                  outerRadius={100}
                  fill="#8884d8"
                  dataKey="value"
                  label={({ name, value }) => `${name}: ${value}%`}
                >
                  {schoolTypes.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Major Trends */}
      <Card>
        <CardHeader>
          <CardTitle>Popular Majors & Growth Trends</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {majorTrends.map((major, index) => (
              <div key={index} className="flex items-center justify-between p-4 bg-slate-50 rounded-lg">
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-medium text-slate-900">{major.major}</h4>
                    <div className="flex items-center space-x-2">
                      <Badge variant={major.growth > 0 ? "default" : "destructive"}>
                        {major.growth > 0 ? "+" : ""}{major.growth}%
                      </Badge>
                      <span className="text-sm text-slate-600">{major.applications.toLocaleString()} apps</span>
                    </div>
                  </div>
                  <Progress 
                    value={Math.abs(major.growth) * 5} 
                    className="h-2"
                  />
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Key Insights */}
      <Card>
        <CardHeader>
          <CardTitle>Key Insights This Week</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 bg-blue-50 rounded-lg border-l-4 border-blue-500">
              <h4 className="font-semibold text-blue-900 mb-2">Test-Optional Policies Continue Rising</h4>
              <p className="text-blue-800 text-sm">80% of applications now submitted without standardized test scores, up 5% from last month.</p>
            </div>
            <div className="p-4 bg-green-50 rounded-lg border-l-4 border-green-500">
              <h4 className="font-semibold text-green-900 mb-2">STEM Fields Show Strong Growth</h4>
              <p className="text-green-800 text-sm">Computer Science and Healthcare programs seeing 15-18% increase in applications.</p>
            </div>
            <div className="p-4 bg-yellow-50 rounded-lg border-l-4 border-yellow-500">
              <h4 className="font-semibold text-yellow-900 mb-2">Acceptance Rates Tightening</h4>
              <p className="text-yellow-800 text-sm">Overall acceptance rate down 2.1% as competition intensifies across all tiers.</p>
            </div>
            <div className="p-4 bg-purple-50 rounded-lg border-l-4 border-purple-500">
              <h4 className="font-semibold text-purple-900 mb-2">Early Decision Impact</h4>
              <p className="text-purple-800 text-sm">Early decision applications up 23%, suggesting strategic shift in student behavior.</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
