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
    setCustomBreadcrumbs([{ label: "Home", href: "/" }, { label: "Knowledge Center" }]);
  }, [setCustomBreadcrumbs]);

  return (
    <div className="container mx-auto max-w-4xl p-6">
      <div className="flex flex-col space-y-8">
        {/* Header */}
        <div className="space-y-4">
          <h1 className="bg-gradient-to-r from-gray-600 to-stone-600 bg-clip-text text-4xl font-semibold text-transparent">
            Tackling Knowledge Attrition
          </h1>
          <p className="text-xl text-muted-foreground">Preserving Institutional Memory for Organizational Resilience</p>
        </div>

        {/* Search and Actions */}
        <div className="flex flex-col space-y-4 md:flex-row md:items-center md:justify-between md:space-y-0">
          <div className="relative max-w-md flex-1">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Search learnings..."
              className="pl-10"
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
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
          <Card className="transition-shadow hover:shadow-md">
            <CardHeader className="pb-2">
              <div className="flex items-center space-x-2">
                <div className="rounded-lg bg-primary/10 p-2">
                  <BookOpen className="h-5 w-5 text-primary" />
                </div>
                <CardTitle className="text-lg">Getting Started</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Learn the basics of using this platform to organize your knowledge and insights.
              </p>
              <div className="mt-4 flex items-center justify-between text-xs text-muted-foreground">
                <span>2 days ago</span>
                <span>5 min read</span>
              </div>
            </CardContent>
          </Card>

          {/* Empty State */}
          <Card className="flex min-h-[200px] items-center justify-center border-2 border-dashed border-muted-foreground/20 bg-muted/20 transition-colors hover:border-primary/50">
            <CardContent className="flex flex-col items-center justify-center p-6 text-center">
              <BookOpen className="mb-2 h-8 w-8 text-muted-foreground" />
              <h3 className="text-lg font-medium">No learnings yet</h3>
              <p className="mb-4 text-sm text-muted-foreground">Start by adding your first learnings</p>
              <Button size="sm">
                <Plus className="mr-2 h-4 w-4" />
                Add Learning
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Introduction */}
        <Card className="border-l-4 border-blue-500">
          <CardContent className="pt-6">
            <p className="text-lg leading-relaxed">
              Knowledge attrition is a silent but costly challenge for many organizations. Over time, invaluable
              insights, experiences, and operational know-how become locked in static documents, spreadsheets, or,
              worse, in the minds of individual employees. When key personnel retire, transfer, or leave, this
              institutional memory often disappears, taking years of expertise and lessons learned with it.
            </p>
          </CardContent>
        </Card>

        {/* Solutions */}
        {/* <Card className="border-t-4 border-green-500">
          <CardHeader>
            <CardTitle className="text-2xl font-semibold text-green-700">Solutions to Preserve Knowledge</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {[
              {
                title: "Dynamic Knowledge Repositories",
                description:
                  "Move beyond static files to cloud-based, searchable knowledge hubs that are regularly updated.",
              },
              {
                title: "Documentation Culture",
                description:
                  "Encourage teams to document processes, decisions, and lessons learned as part of daily workflows.",
              },
              {
                title: "Mentorship Programs",
                description: "Pair experienced staff with newer employees to facilitate tacit knowledge sharing.",
              },
              {
                title: "Collaboration Tools",
                description: "Implement platforms that allow real-time sharing, commenting, and version control.",
              },
              {
                title: "Regular Reviews",
                description: "Periodically audit and refresh knowledge to keep it relevant and actionable.",
              },
            ].map((item, index) => (
              <div
                key={index}
                className="flex items-start space-x-4 rounded-lg p-3 transition-colors hover:bg-green-50"
              >
                <div className="mt-1 flex-shrink-0">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-green-100 text-green-600">
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
        </Card> */}

        {/* Conclusion */}
        <div className="rounded-xl border border-blue-100 bg-blue-50 p-6">
          <p className="text-center text-lg text-blue-800">
            By institutionalizing knowledge capture and making information easily accessible, organizations can
            safeguard their intellectual capital, enhance efficiency, and ensure continuity even as personnel changes
            occur.
          </p>
          <p className="mt-4 text-center font-medium text-blue-900">
            In short, preserving knowledge isn&apos;t just about saving information—it&apos;s about maintaining the
            organization&apos;s long-term resilience and growth.
          </p>
        </div>
      </div>
    </div>
  );
}
