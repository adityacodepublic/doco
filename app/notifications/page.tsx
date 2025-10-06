import { NotificationsModal } from "@/components/notifications";
import { Card, CardMapping } from "@/components/notifications/card-mapping";
import { Separator } from "@/components/ui/separator";
import { getAllDepartments, getAllQuestions } from "@/lib/services/notifications";
import { tryCatch } from "@/lib/tryCatch";
import z from "zod";

export const dynamic = "force-dynamic";

export default async function Home() {
  const notificationSchema = z.object({
    title: z.string().min(1),
    href: z.string(),
  });

  const dept = await getAllDepartments();

  const questions = { departments: dept.map(d => ({ dept: d.name, questions: d.questions })) };

  const notifications: Card[] = await Promise.all(
    dept.map(async d => {
      const parsed = await Promise.all(
        d.notifications.map(async n => {
          const result = await tryCatch(Promise.resolve(notificationSchema.parse(JSON.parse(n))));
          if (result.data) return result.data;
        })
      );
      const notify = parsed.filter(item => item !== undefined);
      return { cardTitle: d.name, contents: notify };
    })
  );

  return (
    <main className="min-h-screen">
      <div className="flex flex-wrap items-center justify-between space-y-3 p-5">
        <h1 className="bg-gradient-to-r from-gray-800 to-stone-600 bg-clip-text py-2 text-4xl font-semibold text-transparent">
          Unified Notification Hub
        </h1>
        <div className="mb-4">
          <NotificationsModal initialValues={questions} />
        </div>
        <p className="text-xl text-muted-foreground">
          Streamline critical updates and announcements across departments. <br />
          Instantly surface actionable information, break down communication silos, and ensure compliance by
          centralizing notifications—from regulatory bulletins to shift-specific alerts—so nothing is missed and
          everyone stays informed.
        </p>
      </div>
      <Separator />
      <CardMapping cards={notifications} />
    </main>
  );
}
