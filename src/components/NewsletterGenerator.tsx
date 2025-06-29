
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { toast } from "@/hooks/use-toast";
import { Copy, Send, RefreshCw, Mail, Download } from "lucide-react";

const generateNewsletterContent = () => {
  return `Subject: Weekly College Admissions Intelligence - Key Trends & Strategic Insights

Dear Fellow Educators and Parents,

I hope this message finds you well as we navigate another dynamic week in the college admissions landscape. As we approach the heart of application season, I'm pleased to share some significant trends and insights that will help inform our guidance to students and families.

**Executive Summary**
This week's data reveals a 12% increase in total applications across all institutional tiers, with particularly notable shifts in student preferences and strategic behaviors that warrant our attention.

**Key Developments This Week**

🎯 **Test-Optional Momentum Accelerates**
We're witnessing a remarkable milestone: 80% of all applications are now submitted without standardized test scores, representing a 5% increase from just last month. This trend underscores the fundamental shift in how institutions evaluate academic merit and how students present their capabilities.

*Strategic Implication:* We must continue emphasizing holistic application development, focusing on essays, extracurriculars, and authentic student voice to help our students stand out in this new landscape.

📈 **STEM Fields Drive Application Growth**
Computer Science programs are experiencing an 18% surge in applications, closely followed by Healthcare-related majors at 15% growth. This reflects broader economic trends and the continued appeal of career-focused education.

*Consideration for Counselors:* While these fields show strong interest, we should prepare students for increased competition and encourage exploration of related but less saturated disciplines.

⚠️ **Competitive Landscape Intensifies**
Overall acceptance rates have declined by 2.1% this month, signaling tighter competition across all institutional categories. This trend is particularly pronounced at mid-tier institutions as students expand their application portfolios.

📊 **Early Decision Strategy Shift**
Perhaps most significantly, we're seeing a 23% increase in Early Decision applications, suggesting families are becoming more strategic about securing admission through binding commitments.

**Institutional Distribution Insights**
Our analysis shows application flow remains concentrated:
• Private Universities: 45% of total applications
• Public Universities: 35% of total applications  
• Liberal Arts Colleges: 20% of total applications

**Recommendations for School Leadership**

1. **Counseling Resource Allocation**: Given the complexity of the current landscape, consider increasing one-on-one counseling time, particularly for students targeting competitive programs.

2. **Test Preparation Strategy**: While test-optional policies dominate, students should still prepare for standardized tests as strategic tools for merit aid and competitive differentiation.

3. **Application Portfolio Guidance**: Encourage thoughtful school list construction with appropriate reach, match, and safety balance, particularly given tightening acceptance rates.

4. **Early Application Counseling**: Help families understand the implications of Early Decision commitments while exploring Early Action opportunities strategically.

**Looking Ahead**
As we move through the remainder of application season, I anticipate continued volatility in these trends. The intersection of economic uncertainty, demographic shifts, and evolving institutional priorities creates both challenges and opportunities for our students.

I encourage ongoing dialogue with your college counseling teams about these developments and their implications for your specific student populations. Please don't hesitate to reach out if you'd like to discuss any of these trends in greater detail or explore collaborative approaches to supporting our students through this complex process.

Thank you for your continued dedication to student success and educational excellence.

Warm regards,

Dr. Sarah Mitchell  
Head of School  
EduTrends Pro

*P.S. Next week's report will include detailed analysis of financial aid trends and their correlation with application behaviors—data that's proving increasingly crucial for strategic planning.*

---
*This report is compiled from aggregate data across 500+ institutions and represents trends observed in the current admissions cycle. Individual institutional experiences may vary.*`;
};

export const NewsletterGenerator = () => {
  const [newsletter, setNewsletter] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [isGenerated, setIsGenerated] = useState(false);

  const handleGenerate = async () => {
    setIsGenerating(true);
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    const content = generateNewsletterContent();
    setNewsletter(content);
    setIsGenerated(true);
    setIsGenerating(false);
    
    toast({
      title: "Newsletter Generated Successfully",
      description: "Your professional newsletter is ready for review and distribution.",
    });
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(newsletter);
    toast({
      title: "Copied to Clipboard",
      description: "Newsletter content has been copied to your clipboard.",
    });
  };

  const handleSend = () => {
    toast({
      title: "Newsletter Prepared",
      description: "Newsletter is ready for your email platform distribution.",
    });
  };

  const handleRegenerate = async () => {
    setIsGenerating(true);
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    const content = generateNewsletterContent();
    setNewsletter(content);
    setIsGenerating(false);
    
    toast({
      title: "Newsletter Regenerated",
      description: "Fresh content generated with updated insights.",
    });
  };

  return (
    <div className="space-y-6">
      {/* Generator Controls */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Mail className="h-5 w-5" />
            <span>Professional Newsletter Generator</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col sm:flex-row gap-4">
            <Button 
              onClick={handleGenerate} 
              disabled={isGenerating}
              size="lg"
              className="flex-1"
            >
              {isGenerating ? (
                <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
              ) : (
                <Mail className="h-4 w-4 mr-2" />
              )}
              {isGenerating ? "Generating Newsletter..." : "Generate Weekly Newsletter"}
            </Button>
            
            {isGenerated && (
              <>
                <Button onClick={handleRegenerate} variant="outline" size="lg">
                  <RefreshCw className="h-4 w-4 mr-2" />
                  Regenerate
                </Button>
                <Button onClick={handleCopy} variant="outline" size="lg">
                  <Copy className="h-4 w-4 mr-2" />
                  Copy
                </Button>
                <Button onClick={handleSend} size="lg">
                  <Send className="h-4 w-4 mr-2" />
                  Prepare to Send
                </Button>
              </>
            )}
          </div>
          
          {isGenerated && (
            <div className="mt-4 flex flex-wrap gap-2">
              <Badge variant="secondary">Professional Tone</Badge>
              <Badge variant="secondary">Data-Driven</Badge>
              <Badge variant="secondary">Strategic Insights</Badge>
              <Badge variant="secondary">Actionable Recommendations</Badge>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Newsletter Preview */}
      {(newsletter || isGenerating) && (
        <Card>
          <CardHeader>
            <CardTitle>Newsletter Preview</CardTitle>
          </CardHeader>
          <CardContent>
            {isGenerating ? (
              <div className="flex items-center justify-center p-12">
                <div className="text-center">
                  <RefreshCw className="h-8 w-8 animate-spin mx-auto mb-4 text-blue-500" />
                  <p className="text-slate-600">Analyzing trends and generating professional content...</p>
                </div>
              </div>
            ) : (
              <div className="space-y-4">
                <Textarea
                  value={newsletter}
                  onChange={(e) => setNewsletter(e.target.value)}
                  className="min-h-[600px] font-mono text-sm"
                  placeholder="Your generated newsletter will appear here..."
                />
                
                <Separator />
                
                <div className="flex justify-between items-center text-sm text-slate-600">
                  <span>Word count: {newsletter.split(' ').length} words</span>
                  <span>Estimated read time: {Math.ceil(newsletter.split(' ').length / 200)} minutes</span>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      )}

      {/* Newsletter Features */}
      <Card>
        <CardHeader>
          <CardTitle>Newsletter Features</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 bg-blue-50 rounded-lg">
              <h4 className="font-semibold text-blue-900 mb-2">Professional Voice</h4>
              <p className="text-blue-800 text-sm">Written in the authoritative yet accessible tone of an experienced educational leader.</p>
            </div>
            <div className="p-4 bg-green-50 rounded-lg">
              <h4 className="font-semibold text-green-900 mb-2">Data-Driven Insights</h4>
              <p className="text-green-800 text-sm">Incorporates current trends and statistics to support strategic recommendations.</p>
            </div>
            <div className="p-4 bg-purple-50 rounded-lg">
              <h4 className="font-semibold text-purple-900 mb-2">Actionable Guidance</h4>
              <p className="text-purple-800 text-sm">Provides specific recommendations for counselors, parents, and institutional leadership.</p>
            </div>
            <div className="p-4 bg-orange-50 rounded-lg">
              <h4 className="font-semibold text-orange-900 mb-2">Strategic Focus</h4>
              <p className="text-orange-800 text-sm">Addresses both immediate tactical considerations and longer-term strategic planning.</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
