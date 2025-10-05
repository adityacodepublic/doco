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
      <div className="flex flex-wrap items-center justify-between">
        <h2 className="mb-4 text-2xl font-bold">Notifications Management</h2>
        <div className="mb-4">
          <NotificationsModal initialValues={questions} />
        </div>
      </div>
      <Separator />
      <CardMapping cards={notifications} />
    </main>
  );
}
