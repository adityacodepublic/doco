"use client";
import React, { useState } from "react";
import {
  Bell,
  Search,
  Upload,
  FileText,
  AlertTriangle,
  TrendingUp,
  Users,
  Clock,
  Filter,
  Download,
  Share2,
  Archive,
  ChevronRight,
  Calendar,
  Building2,
  Shield,
  Wrench,
  ShoppingCart,
  Users2,
  Briefcase,
  FileCheck,
  Train,
  Zap,
  CheckCircle2,
  Globe,
  BarChart3,
  PieChart as PieChartIcon,
  Activity,
  Mail,
  Database,
  MessageSquare,
  ScanLine,
  BookOpen,
  Settings,
  LayoutDashboard,
} from "lucide-react";
import {
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
  AreaChart,
  Area,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

// Mock Data
const mockDocuments = [
  {
    id: 1,
    title: "Depot-3 Electrical Safety Audit Q2-2025",
    type: "Safety",
    department: "Safety",
    priority: "High",
    summary:
      "Comprehensive electrical safety inspection at Depot-3 revealed 3 critical issues requiring immediate attention. Power distribution panels need upgrades.",
    timestamp: "2 hours ago",
    language: "EN",
    source: "Email",
    status: "Action Required",
  },
  {
    id: 2,
    title: "Vendor Invoice #KM-2025-4782",
    type: "Procurement",
    department: "Procurement",
    priority: "Medium",
    summary:
      "Invoice from Siemens India for rolling stock spare parts totaling ₹12,45,000. Payment due within 15 days.",
    timestamp: "4 hours ago",
    language: "EN",
    source: "Maximo",
    status: "Pending Approval",
  },
  {
    id: 3,
    title: "CMRS Circular 2025/08 - Rolling Stock Inspection",
    type: "Regulatory",
    department: "Operations",
    priority: "High",
    summary: "New guidelines for quarterly rolling stock inspection protocols. Compliance deadline: March 31, 2025.",
    timestamp: "6 hours ago",
    language: "EN",
    source: "Email",
    status: "Review Required",
  },
  {
    id: 4,
    title: "HR Policy Update - Leave Encashment",
    type: "HR",
    department: "HR",
    priority: "Low",
    summary:
      "Updated leave encashment policy for employees completing 5+ years of service. Effective from April 1, 2025.",
    timestamp: "8 hours ago",
    language: "EN",
    source: "SharePoint",
    status: "Informational",
  },
  {
    id: 5,
    title: "Aluva Station Platform Extension - Engineering Drawing Rev 3.2",
    type: "Engineering",
    department: "Engineering",
    priority: "Medium",
    summary:
      "Revised engineering drawings for Platform 2 extension showing updated dimensions and structural modifications.",
    timestamp: "1 day ago",
    language: "EN",
    source: "SharePoint",
    status: "Under Review",
  },
  {
    id: 6,
    title: "മാസിക അറ്റകുറ്റപ്പണി റിപ്പോർട്ട് - ജനുവരി 2025",
    type: "Maintenance",
    department: "Maintenance",
    priority: "Low",
    summary: "Monthly maintenance report covering all metro stations. Overall system availability: 99.2%.",
    timestamp: "1 day ago",
    language: "ML",
    source: "Maximo",
    status: "Completed",
  },
];

const categoryData = [
  { name: "Engineering", value: 342, color: "#4F46E5" },
  { name: "Maintenance", value: 287, color: "#F59E0B" },
  { name: "Safety", value: 198, color: "#10B981" },
  { name: "Procurement", value: 156, color: "#8B5CF6" },
  { name: "Regulatory", value: 134, color: "#EF4444" },
  { name: "HR", value: 98, color: "#3B82F6" },
  { name: "Legal", value: 67, color: "#6366F1" },
];

const volumeTrendData = [
  { date: "Oct 1", documents: 78 },
  { date: "Oct 2", documents: 92 },
  { date: "Oct 3", documents: 105 },
  { date: "Oct 4", documents: 88 },
  { date: "Oct 5", documents: 115 },
  { date: "Oct 6", documents: 127 },
];

const sourceDistribution = [
  { source: "Email", count: 456, color: "#4F46E5" },
  { source: "Maximo", count: 389, color: "#10B981" },
  { source: "SharePoint", count: 312, color: "#F59E0B" },
  { source: "WhatsApp", count: 178, color: "#8B5CF6" },
  { source: "Scans", count: 147, color: "#EF4444" },
];

const departmentActivity = [
  { department: "Operations", documents: 142, active: true },
  { department: "Engineering", documents: 128, active: true },
  { department: "Safety", documents: 97, active: true },
  { department: "Maintenance", documents: 86, active: false },
  { department: "Procurement", documents: 73, active: true },
  { department: "Finance", documents: 54, active: false },
];

const priorityAlerts = [
  {
    id: 1,
    title: "Fire Safety Compliance Audit Due",
    department: "Safety",
    deadline: "3 days",
    urgency: "critical",
  },
  {
    id: 2,
    title: "Vendor Contract Renewal - Signaling Systems",
    department: "Procurement",
    deadline: "7 days",
    urgency: "high",
  },
  {
    id: 3,
    title: "CMRS Quarterly Inspection Report Submission",
    department: "Operations",
    deadline: "12 days",
    urgency: "medium",
  },
  {
    id: 4,
    title: "Annual Track Maintenance Schedule",
    department: "Maintenance",
    deadline: "15 days",
    urgency: "medium",
  },
];

const knowledgeMetrics = [
  { title: "Technical SOPs Digitized", value: 847, trend: "+12%" },
  { title: "Expert Insights Captured", value: 234, trend: "+8%" },
  { title: "Most Referenced Doc", value: "Station Emergency Protocols", trend: "156 refs" },
];

export default function Home() {
  const [language, setLanguage] = useState<"EN" | "ML">("EN");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedFilter, setSelectedFilter] = useState("All");

  const getDepartmentIcon = (dept: string) => {
    switch (dept) {
      case "Engineering":
        return <Wrench className="h-4 w-4" />;
      case "Safety":
        return <Shield className="h-4 w-4" />;
      case "Procurement":
        return <ShoppingCart className="h-4 w-4" />;
      case "HR":
        return <Users2 className="h-4 w-4" />;
      case "Operations":
        return <Train className="h-4 w-4" />;
      case "Maintenance":
        return <Wrench className="h-4 w-4" />;
      default:
        return <FileText className="h-4 w-4" />;
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "High":
        return "bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300 border-red-200 dark:border-red-800";
      case "Medium":
        return "bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-300 border-yellow-200 dark:border-yellow-800";
      case "Low":
        return "bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300 border-green-200 dark:border-green-800";
      default:
        return "bg-gray-100 dark:bg-gray-800/50 text-gray-700 dark:text-gray-300 border-gray-200 dark:border-gray-700";
    }
  };

  const getUrgencyColor = (urgency: string) => {
    switch (urgency) {
      case "critical":
        return "border-l-red-500 bg-red-50/50 dark:bg-red-950/30 dark:border-l-red-400";
      case "high":
        return "border-l-orange-500 bg-orange-50/50 dark:bg-orange-950/30 dark:border-l-orange-400";
      case "medium":
        return "border-l-yellow-500 bg-yellow-50/50 dark:bg-yellow-950/30 dark:border-l-yellow-400";
      default:
        return "border-l-blue-500 bg-blue-50/50 dark:bg-blue-950/30 dark:border-l-blue-400";
    }
  };

  const getSourceIcon = (source: string) => {
    switch (source) {
      case "Email":
        return <Mail className="h-4 w-4" />;
      case "Maximo":
        return <Database className="h-4 w-4" />;
      case "SharePoint":
        return <Building2 className="h-4 w-4" />;
      case "WhatsApp":
        return <MessageSquare className="h-4 w-4" />;
      case "Scans":
        return <ScanLine className="h-4 w-4" />;
      default:
        return <FileText className="h-4 w-4" />;
    }
  };

  return (
    <div className="-m-4 min-h-screen bg-gradient-to-br from-sky-50 via-blue-50 to-white dark:from-gray-950 dark:via-slate-900 dark:to-gray-900 md:-m-6">
      {/* Header */}
      <header className="border-b border-gray-200/50 bg-white/70 shadow-sm backdrop-blur-lg dark:border-gray-700/50 dark:bg-gray-900/70">
        <div className="mx-auto max-w-[1800px] px-6 py-4">
          <div className="flex items-center justify-between">
            {/* Logo and Title */}
            <div className="flex items-center gap-4">
              {/* <div className="relative h-12 w-12">
                <Image src="/doco-logos/black.png" alt="KMRL Logo" fill className="object-contain dark:hidden" />
                <Image src="/doco-logos/white.png" alt="KMRL Logo" fill className="object-contain hidden dark:block" />
              </div> */}
              <div>
                <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">KMRL Document Intelligence</h1>
                <p className="text-sm text-gray-600 dark:text-gray-400">Kochi Metro Rail Limited</p>
              </div>
            </div>

            {/* Right Section */}
            <div className="flex items-center gap-4">
              {/* Language Toggle */}
              <button
                onClick={() => setLanguage(language === "EN" ? "ML" : "EN")}
                className="flex items-center gap-2 rounded-lg border border-gray-200 bg-white/80 px-4 py-2 shadow-sm transition-all duration-200 hover:bg-white dark:border-gray-700 dark:bg-gray-800/80 dark:hover:bg-gray-800"
              >
                <Globe className="h-4 w-4 text-gray-600 dark:text-gray-400" />
                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">{language}</span>
              </button>

              {/* Notifications */}
              {/* <button className="relative rounded-lg border border-gray-200 dark:border-gray-700 bg-white/80 dark:bg-gray-800/80 p-2 shadow-sm transition-all duration-200 hover:bg-white dark:hover:bg-gray-800">
                <Bell className="h-5 w-5 text-gray-600 dark:text-gray-400" />
                <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-xs font-semibold text-white">
                  7
                </span>
              </button> */}

              {/* User Profile */}
              <div className="flex items-center gap-3 rounded-lg border border-gray-200 bg-white/80 px-4 py-2 shadow-sm dark:border-gray-700 dark:bg-gray-800/80">
                <div className="flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-br from-indigo-500 to-purple-500">
                  <span className="text-sm font-semibold text-white">RK</span>
                </div>
                <div className="text-left">
                  <div className="text-sm font-medium text-gray-900 dark:text-gray-100">Rajesh Kumar</div>
                  <div className="text-xs text-gray-600 dark:text-gray-400">Chief Engineer - Operations</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="mx-auto max-w-[1800px] px-6 py-8">
        {/* Key Metrics Row */}
        <div className="mb-8 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-5">
          {/* Metric Card 1 */}
          <div className="group relative overflow-hidden rounded-2xl border border-gray-200/50 bg-white/70 p-6 shadow-lg backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl dark:border-gray-700/50 dark:bg-gray-800/70">
            <div className="absolute right-0 top-0 -mr-16 -mt-16 h-32 w-32 rounded-full bg-gradient-to-br from-blue-500/10 to-transparent dark:from-blue-500/20" />
            <div className="relative">
              <div className="mb-3 flex items-center justify-between">
                <div className="rounded-lg bg-blue-100 p-2 dark:bg-blue-900/50">
                  <FileText className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                </div>
                <TrendingUp className="h-4 w-4 text-green-500" />
              </div>
              <div className="mb-1 text-3xl font-bold text-gray-900 dark:text-gray-100">2,847</div>
              <div className="text-sm text-gray-600 dark:text-gray-400">Documents This Month</div>
              <div className="mt-2 text-xs font-medium text-green-600 dark:text-green-400">+18% from last month</div>
            </div>
          </div>

          {/* Metric Card 2 */}
          <div className="group relative overflow-hidden rounded-2xl border border-gray-200/50 bg-white/70 p-6 shadow-lg backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl dark:border-gray-700/50 dark:bg-gray-800/70">
            <div className="absolute right-0 top-0 -mr-16 -mt-16 h-32 w-32 rounded-full bg-gradient-to-br from-orange-500/10 to-transparent dark:from-orange-500/20" />
            <div className="relative">
              <div className="mb-3 flex items-center justify-between">
                <div className="rounded-lg bg-orange-100 p-2 dark:bg-orange-900/50">
                  <AlertTriangle className="h-5 w-5 text-orange-600 dark:text-orange-400" />
                </div>
                <Clock className="h-4 w-4 text-orange-500" />
              </div>
              <div className="mb-1 text-3xl font-bold text-gray-900 dark:text-gray-100">23</div>
              <div className="text-sm text-gray-600 dark:text-gray-400">Pending Actions</div>
              <div className="mt-2 text-xs font-medium text-orange-600 dark:text-orange-400">Require attention</div>
            </div>
          </div>

          {/* Metric Card 3 */}
          <div className="group relative overflow-hidden rounded-2xl border border-gray-200/50 bg-white/70 p-6 shadow-lg backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl dark:border-gray-700/50 dark:bg-gray-800/70">
            <div className="absolute right-0 top-0 -mr-16 -mt-16 h-32 w-32 rounded-full bg-gradient-to-br from-purple-500/10 to-transparent dark:from-purple-500/20" />
            <div className="relative">
              <div className="mb-3 flex items-center justify-between">
                <div className="rounded-lg bg-purple-100 p-2 dark:bg-purple-900/50">
                  <FileCheck className="h-5 w-5 text-purple-600 dark:text-purple-400" />
                </div>
                <Calendar className="h-4 w-4 text-purple-500" />
              </div>
              <div className="mb-1 text-3xl font-bold text-gray-900 dark:text-gray-100">5</div>
              <div className="text-sm text-gray-600 dark:text-gray-400">Compliance Items</div>
              <div className="mt-2 text-xs font-medium text-purple-600 dark:text-purple-400">Due within 7 days</div>
            </div>
          </div>

          {/* Metric Card 4 */}
          <div className="group relative overflow-hidden rounded-2xl border border-gray-200/50 bg-white/70 p-6 shadow-lg backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl dark:border-gray-700/50 dark:bg-gray-800/70">
            <div className="absolute right-0 top-0 -mr-16 -mt-16 h-32 w-32 rounded-full bg-gradient-to-br from-green-500/10 to-transparent dark:from-green-500/20" />
            <div className="relative">
              <div className="mb-3 flex items-center justify-between">
                <div className="rounded-lg bg-green-100 p-2 dark:bg-green-900/50">
                  <Users className="h-5 w-5 text-green-600 dark:text-green-400" />
                </div>
                <Activity className="h-4 w-4 text-green-500" />
              </div>
              <div className="mb-1 text-3xl font-bold text-gray-900 dark:text-gray-100">8</div>
              <div className="text-sm text-gray-600 dark:text-gray-400">Active Departments</div>
              <div className="mt-2 text-xs font-medium text-green-600 dark:text-green-400">
                Cross-team collaboration
              </div>
            </div>
          </div>

          {/* Metric Card 5 */}
          <div className="group relative overflow-hidden rounded-2xl border border-gray-200/50 bg-white/70 p-6 shadow-lg backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl dark:border-gray-700/50 dark:bg-gray-800/70">
            <div className="absolute right-0 top-0 -mr-16 -mt-16 h-32 w-32 rounded-full bg-gradient-to-br from-indigo-500/10 to-transparent dark:from-indigo-500/20" />
            <div className="relative">
              <div className="mb-3 flex items-center justify-between">
                <div className="rounded-lg bg-indigo-100 p-2 dark:bg-indigo-900/50">
                  <CheckCircle2 className="h-5 w-5 text-indigo-600 dark:text-indigo-400" />
                </div>
                <Zap className="h-4 w-4 text-indigo-500" />
              </div>
              <div className="mb-1 text-3xl font-bold text-gray-900 dark:text-gray-100">94%</div>
              <div className="text-sm text-gray-600 dark:text-gray-400">Processing Accuracy</div>
              <div className="mt-2 text-xs font-medium text-indigo-600 dark:text-indigo-400">AI-powered insights</div>
            </div>
          </div>
        </div>

        {/* Main Grid Layout */}
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          {/* Left Column - Document Stream */}
          <div className="space-y-6 lg:col-span-2">
            {/* Search and Filters */}
            <div className="rounded-2xl border border-gray-200/50 bg-white/70 p-6 shadow-lg backdrop-blur-sm dark:border-gray-700/50 dark:bg-gray-800/70">
              <div className="flex flex-col gap-4 md:flex-row">
                {/* Search Bar */}
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400 dark:text-gray-500" />
                  <input
                    type="text"
                    placeholder="Search documents, departments, or keywords..."
                    value={searchQuery}
                    onChange={e => setSearchQuery(e.target.value)}
                    className="w-full rounded-xl border border-gray-200 bg-white/80 py-3 pl-11 pr-4 text-gray-900 transition-all placeholder:text-gray-500 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:border-gray-600 dark:bg-gray-700/80 dark:text-gray-100 dark:placeholder:text-gray-400"
                  />
                </div>

                {/* Filter Buttons */}
                <div className="flex gap-2 overflow-x-auto pb-2 md:pb-0">
                  {["All", "Safety", "Engineering", "Urgent"].map(filter => (
                    <button
                      key={filter}
                      onClick={() => setSelectedFilter(filter)}
                      className={`whitespace-nowrap rounded-lg px-4 py-2 text-sm font-medium transition-all ${
                        selectedFilter === filter
                          ? "bg-indigo-600 text-white shadow-md"
                          : "border border-gray-200 bg-white/80 text-gray-700 hover:bg-white dark:border-gray-600 dark:bg-gray-700/80 dark:text-gray-300 dark:hover:bg-gray-700"
                      }`}
                    >
                      {filter}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Document Stream */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h2 className="flex items-center gap-2 text-xl font-bold text-gray-900 dark:text-gray-100">
                  <Activity className="h-5 w-5 text-indigo-600 dark:text-indigo-400" />
                  Recent Documents
                </h2>
                <button className="flex items-center gap-1 text-sm font-medium text-indigo-600 hover:text-indigo-700 dark:text-indigo-400 dark:hover:text-indigo-300">
                  View All
                  <ChevronRight className="h-4 w-4" />
                </button>
              </div>

              {mockDocuments.map(doc => (
                <div
                  key={doc.id}
                  className="group cursor-pointer rounded-2xl border border-gray-200/50 bg-white/70 p-6 shadow-lg backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl dark:border-gray-700/50 dark:bg-gray-800/70"
                >
                  <div className="mb-3 flex items-start justify-between">
                    <div className="flex flex-1 items-start gap-3">
                      <div
                        className={`rounded-lg p-2 ${
                          doc.type === "Safety"
                            ? "bg-green-100 dark:bg-green-900/50"
                            : doc.type === "Engineering"
                              ? "bg-blue-100 dark:bg-blue-900/50"
                              : doc.type === "Procurement"
                                ? "bg-purple-100 dark:bg-purple-900/50"
                                : doc.type === "Maintenance"
                                  ? "bg-orange-100 dark:bg-orange-900/50"
                                  : doc.type === "HR"
                                    ? "bg-cyan-100 dark:bg-cyan-900/50"
                                    : "bg-red-100 dark:bg-red-900/50"
                        }`}
                      >
                        {getDepartmentIcon(doc.department)}
                      </div>
                      <div className="flex-1">
                        <h3 className="mb-2 font-semibold text-gray-900 transition-colors group-hover:text-indigo-600 dark:text-gray-100 dark:group-hover:text-indigo-400">
                          {doc.title}
                        </h3>
                        <p className="mb-3 line-clamp-2 text-sm text-gray-600 dark:text-gray-400">{doc.summary}</p>

                        {/* Tags */}
                        <div className="mb-3 flex flex-wrap gap-2">
                          <span
                            className={`rounded-full border px-3 py-1 text-xs font-medium ${getPriorityColor(doc.priority)}`}
                          >
                            {doc.priority} Priority
                          </span>
                          <span className="rounded-full border border-gray-200 bg-gray-100 px-3 py-1 text-xs font-medium text-gray-700 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-300">
                            {doc.department}
                          </span>
                          <span className="flex items-center gap-1 rounded-full border border-blue-200 bg-blue-100 px-3 py-1 text-xs font-medium text-blue-700 dark:border-blue-800 dark:bg-blue-900/50 dark:text-blue-300">
                            {getSourceIcon(doc.source)}
                            {doc.source}
                          </span>
                          <span className="rounded-full border border-purple-200 bg-purple-100 px-3 py-1 text-xs font-medium text-purple-700 dark:border-purple-800 dark:bg-purple-900/50 dark:text-purple-300">
                            {doc.language}
                          </span>
                        </div>

                        {/* Footer */}
                        <div className="flex items-center justify-between">
                          <span className="flex items-center gap-1 text-xs text-gray-500 dark:text-gray-400">
                            <Clock className="h-3 w-3" />
                            {doc.timestamp}
                          </span>
                          <div className="flex items-center gap-2">
                            <button className="group/btn rounded-lg p-2 transition-colors hover:bg-indigo-50 dark:hover:bg-indigo-900/30">
                              <Download className="h-4 w-4 text-gray-600 group-hover/btn:text-indigo-600 dark:text-gray-400 dark:group-hover/btn:text-indigo-400" />
                            </button>
                            <button className="group/btn rounded-lg p-2 transition-colors hover:bg-indigo-50 dark:hover:bg-indigo-900/30">
                              <Share2 className="h-4 w-4 text-gray-600 group-hover/btn:text-indigo-600 dark:text-gray-400 dark:group-hover/btn:text-indigo-400" />
                            </button>
                            <button className="group/btn rounded-lg p-2 transition-colors hover:bg-indigo-50 dark:hover:bg-indigo-900/30">
                              <Archive className="h-4 w-4 text-gray-600 group-hover/btn:text-indigo-600 dark:text-gray-400 dark:group-hover/btn:text-indigo-400" />
                            </button>
                            <button className="rounded-lg bg-indigo-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-indigo-700">
                              View Details
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Document Volume Trends */}
            <div className="rounded-2xl border border-gray-200/50 bg-white/70 p-6 shadow-lg backdrop-blur-sm dark:border-gray-700/50 dark:bg-gray-800/70">
              <h2 className="mb-6 flex items-center gap-2 text-xl font-bold text-gray-900 dark:text-gray-100">
                <BarChart3 className="h-5 w-5 text-indigo-600 dark:text-indigo-400" />
                Document Volume Trends
              </h2>
              <ResponsiveContainer width="100%" height={250}>
                <AreaChart data={volumeTrendData}>
                  <defs>
                    <linearGradient id="colorDocs" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#4F46E5" stopOpacity={0.3} />
                      <stop offset="95%" stopColor="#4F46E5" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" className="dark:stroke-gray-700" />
                  <XAxis dataKey="date" tick={{ fontSize: 12, fill: "#6B7280" }} className="dark:fill-gray-400" />
                  <YAxis tick={{ fontSize: 12, fill: "#6B7280" }} className="dark:fill-gray-400" />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "rgba(255, 255, 255, 0.9)",
                      border: "1px solid #E5E7EB",
                      borderRadius: "8px",
                      boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
                    }}
                  />
                  <Area
                    type="monotone"
                    dataKey="documents"
                    stroke="#4F46E5"
                    strokeWidth={2}
                    fillOpacity={1}
                    fill="url(#colorDocs)"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Right Column */}
          <div className="space-y-6">
            {/* Priority Alerts */}
            <div className="rounded-2xl border border-gray-200/50 bg-white/70 p-6 shadow-lg backdrop-blur-sm dark:border-gray-700/50 dark:bg-gray-800/70">
              <h2 className="mb-4 flex items-center gap-2 text-xl font-bold text-gray-900 dark:text-gray-100">
                <AlertTriangle className="h-5 w-5 text-orange-600 dark:text-orange-400" />
                Priority Alerts
              </h2>
              <div className="space-y-3">
                {priorityAlerts.map(alert => (
                  <div
                    key={alert.id}
                    className={`rounded-xl border-l-4 p-4 ${getUrgencyColor(alert.urgency)} cursor-pointer backdrop-blur-sm transition-all hover:shadow-md`}
                  >
                    <h3 className="mb-2 text-sm font-semibold text-gray-900 dark:text-gray-100">{alert.title}</h3>
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-gray-600 dark:text-gray-400">{alert.department}</span>
                      <span className="font-medium text-gray-900 dark:text-gray-100">Due in {alert.deadline}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Category Breakdown */}
            <div className="rounded-2xl border border-gray-200/50 bg-white/70 p-6 shadow-lg backdrop-blur-sm dark:border-gray-700/50 dark:bg-gray-800/70">
              <h2 className="mb-6 flex items-center gap-2 text-xl font-bold text-gray-900 dark:text-gray-100">
                <PieChartIcon className="h-5 w-5 text-indigo-600 dark:text-indigo-400" />
                Document Categories
              </h2>
              <ResponsiveContainer width="100%" height={200}>
                <PieChart>
                  <Pie
                    data={categoryData}
                    cx="50%"
                    cy="50%"
                    innerRadius={50}
                    outerRadius={80}
                    paddingAngle={3}
                    dataKey="value"
                  >
                    {categoryData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "rgba(255, 255, 255, 0.9)",
                      border: "1px solid #E5E7EB",
                      borderRadius: "8px",
                      boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
                    }}
                  />
                </PieChart>
              </ResponsiveContainer>
              <div className="mt-4 grid grid-cols-2 gap-2">
                {categoryData.map(cat => (
                  <div key={cat.name} className="flex items-center gap-2">
                    <div className="h-3 w-3 rounded-full" style={{ backgroundColor: cat.color }} />
                    <span className="text-xs text-gray-600 dark:text-gray-400">
                      {cat.name} ({cat.value})
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Department Activity */}
            <div className="rounded-2xl border border-gray-200/50 bg-white/70 p-6 shadow-lg backdrop-blur-sm dark:border-gray-700/50 dark:bg-gray-800/70">
              <h2 className="mb-4 flex items-center gap-2 text-xl font-bold text-gray-900 dark:text-gray-100">
                <Building2 className="h-5 w-5 text-indigo-600 dark:text-indigo-400" />
                Department Activity
              </h2>
              <div className="space-y-3">
                {departmentActivity.map(dept => (
                  <div key={dept.department} className="space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-medium text-gray-900 dark:text-gray-100">{dept.department}</span>
                        {dept.active && (
                          <div className="flex items-center gap-1">
                            <div className="h-2 w-2 animate-pulse rounded-full bg-green-500" />
                            <span className="text-xs text-green-600 dark:text-green-400">Active</span>
                          </div>
                        )}
                      </div>
                      <span className="text-sm font-semibold text-indigo-600 dark:text-indigo-400">
                        {dept.documents}
                      </span>
                    </div>
                    <div className="h-2 w-full overflow-hidden rounded-full bg-gray-200 dark:bg-gray-700">
                      <div
                        className="h-full rounded-full bg-gradient-to-r from-indigo-500 to-purple-500 transition-all duration-500"
                        style={{ width: `${(dept.documents / 150) * 100}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Document Sources */}
            <div className="rounded-2xl border border-gray-200/50 bg-white/70 p-6 shadow-lg backdrop-blur-sm dark:border-gray-700/50 dark:bg-gray-800/70">
              <h2 className="mb-6 flex items-center gap-2 text-xl font-bold text-gray-900 dark:text-gray-100">
                <Database className="h-5 w-5 text-indigo-600 dark:text-indigo-400" />
                Document Sources
              </h2>
              <ResponsiveContainer width="100%" height={200}>
                <BarChart data={sourceDistribution} layout="vertical">
                  <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" className="dark:stroke-gray-700" />
                  <XAxis type="number" tick={{ fontSize: 12, fill: "#6B7280" }} className="dark:fill-gray-400" />
                  <YAxis
                    dataKey="source"
                    type="category"
                    tick={{ fontSize: 12, fill: "#6B7280" }}
                    className="dark:fill-gray-400"
                  />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "rgba(255, 255, 255, 0.9)",
                      border: "1px solid #E5E7EB",
                      borderRadius: "8px",
                      boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
                    }}
                  />
                  <Bar dataKey="count" radius={[0, 8, 8, 0]}>
                    {sourceDistribution.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>

            {/* Knowledge Retention */}
            <div className="rounded-2xl border border-gray-200/50 bg-white/70 p-6 shadow-lg backdrop-blur-sm dark:border-gray-700/50 dark:bg-gray-800/70">
              <h2 className="mb-4 flex items-center gap-2 text-xl font-bold text-gray-900 dark:text-gray-100">
                <BookOpen className="h-5 w-5 text-indigo-600 dark:text-indigo-400" />
                Knowledge Retention
              </h2>
              <div className="space-y-4">
                {knowledgeMetrics.map((metric, idx) => (
                  <div
                    key={idx}
                    className="rounded-xl border border-indigo-100 bg-gradient-to-r from-indigo-50 to-purple-50 p-4 dark:border-indigo-800 dark:from-indigo-950/50 dark:to-purple-950/50"
                  >
                    <div className="mb-1 text-sm text-gray-600 dark:text-gray-400">{metric.title}</div>
                    <div className="flex items-end justify-between">
                      <div className="text-2xl font-bold text-gray-900 dark:text-gray-100">{metric.value}</div>
                      <span className="text-sm font-medium text-green-600 dark:text-green-400">{metric.trend}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Quick Actions Panel */}
        {/* <div className="mt-6 rounded-2xl bg-gradient-to-r from-indigo-500 to-purple-600 p-8 shadow-lg dark:from-indigo-600 dark:to-purple-700">
          <h2 className="mb-6 text-2xl font-bold text-white">Quick Actions</h2>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-4">
            <button className="flex items-center gap-3 rounded-xl border border-white/20 bg-white/20 p-4 text-white backdrop-blur-sm transition-all duration-200 hover:bg-white/30">
              <Upload className="h-5 w-5" />
              <span className="font-medium">Upload Document</span>
            </button>
            <button className="flex items-center gap-3 rounded-xl border border-white/20 bg-white/20 p-4 text-white backdrop-blur-sm transition-all duration-200 hover:bg-white/30">
              <BarChart3 className="h-5 w-5" />
              <span className="font-medium">Generate Report</span>
            </button>
            <button className="flex items-center gap-3 rounded-xl border border-white/20 bg-white/20 p-4 text-white backdrop-blur-sm transition-all duration-200 hover:bg-white/30">
              <Calendar className="h-5 w-5" />
              <span className="font-medium">Schedule Digest</span>
            </button>
            <button className="flex items-center gap-3 rounded-xl border border-white/20 bg-white/20 p-4 text-white backdrop-blur-sm transition-all duration-200 hover:bg-white/30">
              <BookOpen className="h-5 w-5" />
              <span className="font-medium">Knowledge Base</span>
            </button>
          </div>
        </div> */}
      </main>
    </div>
  );
}
