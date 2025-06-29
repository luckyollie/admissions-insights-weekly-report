
import { useState } from "react";
import { TrendsAuswertung } from "@/components/TrendsAuswertung";
import { NewsletterGenerator } from "@/components/NewsletterGenerator";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BookOpen, TrendingUp, Mail, School } from "lucide-react";

const Index = () => {
  const [activeTab, setActiveTab] = useState("trends");

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      {/* Header */}
      <header className="bg-white border-b border-slate-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-3">
              <div className="bg-blue-900 p-2 rounded-lg">
                <School className="h-6 w-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-slate-900">EduTrends Pro</h1>
                <p className="text-sm text-slate-600">College Admissions Intelligence</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="text-right">
                <p className="text-sm font-medium text-slate-900">Dr. Sarah Mitchell</p>
                <p className="text-xs text-slate-600">Head of School</p>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <Card className="bg-gradient-to-r from-blue-900 to-blue-800 text-white">
            <CardContent className="p-8">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-3xl font-bold mb-2">Weekly Admissions Report</h2>
                  <p className="text-blue-100 text-lg">
                    Stay ahead of college admissions trends with data-driven insights and professional newsletters.
                  </p>
                </div>
                <div className="hidden md:block">
                  <BookOpen className="h-16 w-16 text-blue-200" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Navigation Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-2 lg:w-96">
            <TabsTrigger value="trends" className="flex items-center space-x-2">
              <TrendingUp className="h-4 w-4" />
              <span>Trends Analysis</span>
            </TabsTrigger>
            <TabsTrigger value="newsletter" className="flex items-center space-x-2">
              <Mail className="h-4 w-4" />
              <span>Newsletter Draft</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="trends">
            <TrendsAuswertung />
          </TabsContent>

          <TabsContent value="newsletter">
            <NewsletterGenerator />
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

export default Index;
