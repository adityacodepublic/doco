"use client";

import { useState, useEffect } from "react";
import { useHeader } from "@/contexts/header-context";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, Filter, Plus, BookOpen } from "lucide-react";

export default function LearningsPage() {
  const { setCustomBreadcrumbs } = useHeader();

  const [searchQuery, setSearchQuery] = useState("");

  // Set breadcrumbs when component mounts
  useEffect(() => {
    setCustomBreadcrumbs([
      { label: "Home", href: "/" },
      { label: "Knowledge Center" },
    ]);
  }, [setCustomBreadcrumbs]);

  return (
    <div className="container mx-auto p-6 max-w-4xl">
      <div className="flex flex-col space-y-8">
        {/* Header */}
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Tackling Knowledge Attrition
          </h1>
          <p className="text-xl text-muted-foreground">
            Preserving Institutional Memory for Organizational Resilience
          </p>
        </div>

        {/* Introduction */}
        <Card className="border-l-4 border-blue-500">
          <CardContent className="pt-6">
            <p className="text-lg leading-relaxed">
              Knowledge attrition is a silent but costly challenge for many organizations. Over time, 
              invaluable insights, experiences, and operational know-how become locked in static documents, 
              spreadsheets, or, worse, in the minds of individual employees. When key personnel retire, 
              transfer, or leave, this institutional memory often disappears, taking years of expertise 
              and lessons learned with it.
            </p>
          </CardContent>
        </Card>

        {/* Why it Happens */}
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl font-semibold text-blue-700">
              Why Knowledge Attrition Happens
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="p-4 bg-blue-50 rounded-lg">
              <h3 className="font-semibold text-blue-800 mb-2">
                <span className="inline-flex items-center justify-center w-6 h-6 bg-blue-100 text-blue-600 rounded-full text-sm mr-2">1</span>
                Static Documentation
              </h3>
              <p>Critical processes and insights are stored in outdated files, PDFs, or shared drives that rarely get updated.</p>
            </div>
            <div className="p-4 bg-blue-50 rounded-lg">
              <h3 className="font-semibold text-blue-800 mb-2">
                <span className="inline-flex items-center justify-center w-6 h-6 bg-blue-100 text-blue-600 rounded-full text-sm mr-2">2</span>
                Limited Knowledge Sharing
              </h3>
              <p>Teams often work in silos, preventing knowledge from flowing across departments.</p>
            </div>
            <div className="p-4 bg-blue-50 rounded-lg">
              <h3 className="font-semibold text-blue-800 mb-2">
                <span className="inline-flex items-center justify-center w-6 h-6 bg-blue-100 text-blue-600 rounded-full text-sm mr-2">3</span>
                Dependence on Individuals
              </h3>
              <p>Organizations rely on "tribal knowledge," leaving them vulnerable when employees depart.</p>
            </div>
          </CardContent>
        </Card>

        {/* The Impact */}
        <Card className="bg-gradient-to-br from-blue-50 to-white">
          <CardHeader>
            <CardTitle className="text-2xl font-semibold text-red-600">
              The Impact of Knowledge Loss
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-4">
              {[
                {
                  title: "Operational Inefficiency",
                  description: "Teams reinvent solutions, wasting time and resources.",
                  icon: "🔄"
                },
                {
                  title: "Onboarding Challenges",
                  description: "New employees spend longer learning processes that could have been documented.",
                  icon: "👥"
                },
                {
                  title: "Decision-Making Gaps",
                  description: "Lack of historical insight leads to repeated mistakes and missed opportunities.",
                  icon: "📉"
                },
                {
                  title: "Erosion of Competitive Advantage",
                  description: "Organizations fail to leverage lessons learned, slowing growth and innovation.",
                  icon: "🏆"
                }
              ].map((item, index) => (
                <div key={index} className="p-4 bg-white rounded-lg shadow-sm border border-gray-100">
                  <div className="text-2xl mb-2">{item.icon}</div>
                  <h3 className="font-semibold text-gray-800 mb-1">{item.title}</h3>
                  <p className="text-sm text-gray-600">{item.description}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Solutions */}
        <Card className="border-t-4 border-green-500">
          <CardHeader>
            <CardTitle className="text-2xl font-semibold text-green-700">
              Solutions to Preserve Knowledge
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {[
              {
                title: "Dynamic Knowledge Repositories",
                description: "Move beyond static files to cloud-based, searchable knowledge hubs that are regularly updated."
              },
              {
                title: "Documentation Culture",
                description: "Encourage teams to document processes, decisions, and lessons learned as part of daily workflows."
              },
              {
                title: "Mentorship Programs",
                description: "Pair experienced staff with newer employees to facilitate tacit knowledge sharing."
              },
              {
                title: "Collaboration Tools",
                description: "Implement platforms that allow real-time sharing, commenting, and version control."
              },
              {
                title: "Regular Reviews",
                description: "Periodically audit and refresh knowledge to keep it relevant and actionable."
              }
            ].map((item, index) => (
              <div key={index} className="flex items-start space-x-4 p-3 hover:bg-green-50 rounded-lg transition-colors">
                <div className="flex-shrink-0 mt-1">
                  <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center text-green-600">
                    {index + 1}
                  </div>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-800">{item.title}</h3>
                  <p className="text-gray-600">{item.description}</p>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Conclusion */}
        <div className="bg-blue-50 p-6 rounded-xl border border-blue-100">
          <p className="text-lg text-center text-blue-800">
            By institutionalizing knowledge capture and making information easily accessible, 
            organizations can safeguard their intellectual capital, enhance efficiency, and 
            ensure continuity even as personnel changes occur.
          </p>
          <p className="mt-4 text-center font-medium text-blue-900">
            In short, preserving knowledge isn't just about saving information—it's about 
            maintaining the organization's long-term resilience and growth.
          </p>
        </div>

        {/* Search and Actions */}
        <div className="flex flex-col space-y-4 md:flex-row md:items-center md:justify-between md:space-y-0">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Search learnings..."
              className="pl-10"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <div className="flex space-x-2">
            <Button variant="outline">
              <Filter className="mr-2 h-4 w-4" />
              Filter
            </Button>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              New Learning
            </Button>
          </div>
        </div>

        {/* Content */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {/* Example Learning Card */}
          <Card className="hover:shadow-md transition-shadow">
            <CardHeader className="pb-2">
              <div className="flex items-center space-x-2">
                <div className="bg-primary/10 p-2 rounded-lg">
                  <BookOpen className="h-5 w-5 text-primary" />
                </div>
                <CardTitle className="text-lg">Getting Started</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Learn the basics of using this platform to organize your knowledge and insights.
              </p>
              <div className="mt-4 flex justify-between items-center text-xs text-muted-foreground">
                <span>2 days ago</span>
                <span>5 min read</span>
              </div>
            </CardContent>
          </Card>

          {/* Empty State */}
          <Card className="border-dashed border-2 border-muted-foreground/20 hover:border-primary/50 transition-colors flex items-center justify-center min-h-[200px] bg-muted/20">
            <CardContent className="flex flex-col items-center justify-center p-6 text-center">
              <BookOpen className="h-8 w-8 text-muted-foreground mb-2" />
              <h3 className="text-lg font-medium">No learnings yet</h3>
              <p className="text-sm text-muted-foreground mb-4">Start by adding your first learning</p>
              <Button size="sm">
                <Plus className="mr-2 h-4 w-4" />
                Add Learning
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
