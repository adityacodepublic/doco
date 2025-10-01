import { CardMapping } from "@/components/notifications/card-mapping";

export default function Home() {
  const cards = [
    {
      cardTitle: "Quick Navigation",
      contents: [
        { title: "Dashboard", href: "/dashboard" },
        { title: "Analytics", href: "/analytics" },
        { title: "Settings", href: "/settings" },
        { title: "Profile", href: "/profile" },
      ],
    },
    {
      cardTitle: "Team Management",
      contents: [
        { title: "Team Members", href: "/team/members" },
        { title: "Roles & Permissions", href: "/team/roles" },
        { title: "Invitations", href: "/team/invitations" },
        { title: "Activity Log", href: "/team/activity" },
      ],
    },
    {
      cardTitle: "Resources",
      contents: [
        { title: "Documentation", href: "/docs" },
        { title: "API Reference", href: "/api" },
        { title: "Support", href: "/support" },
        { title: "Community", href: "/community" },
        { title: "Changelog", href: "/changelog" },
        { title: "Status", href: "/status" },
      ],
    },
  ];

  return (
    <main className="min-h-screen py-12">
      <CardMapping />
    </main>
  );
}
