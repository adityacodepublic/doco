"use client";

import { useEffect, useId, useMemo, useState } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Plus, X, Save, Loader2 } from "lucide-react";
import { addQuestionToDepartment } from "@/lib/services/notifications";
import { useMorphik } from "@/contexts/morphik-context";
import { useFolders } from "@/hooks/useFolders";
import { useRouter } from "next/navigation";

const notificationFormSchema = z.object({
  departments: z
    .array(
      z.object({
        dept: z.string().min(1, "Department name is required"),
        questions: z.array(z.string().min(1, "Question cannot be empty")).min(1, "At least one question is required"),
      })
    )
    .min(1, "At least one department is required"),
});

type NotificationFormData = z.infer<typeof notificationFormSchema>;

interface NotificationsModalProps {
  initialValues?: NotificationFormData;
  trigger?: React.ReactNode;
  onSuccess?: () => void;
}

export function NotificationsModal({ trigger, onSuccess, initialValues }: NotificationsModalProps) {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { apiBaseUrl, authToken } = useMorphik();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const effectiveApiUrl = useMemo(() => {
    return apiBaseUrl;
  }, [apiBaseUrl]);

  const { folders } = useFolders({
    apiBaseUrl: effectiveApiUrl,
    authToken,
  });

  const initial = useMemo(
    () => ({
      departments: folders.map(folder => ({
        dept: folder.name,
        questions: initialValues?.departments.find(d => d.dept === folder.name)?.questions ?? [""],
      })),
    }),
    [folders, initialValues]
  );

  const {
    register,
    control,
    handleSubmit,
    reset,
    formState: { errors },
    watch,
    setValue,
  } = useForm<NotificationFormData>({
    resolver: zodResolver(notificationFormSchema),
    defaultValues: {
      departments: [
        {
          dept: "",
          questions: [""],
        },
      ],
    },
  });

  // Update form values when folders data becomes available
  useEffect(() => {
    if (initial && folders.length > 0) {
      reset(initial);
    }
  }, [initial]);

  const {
    fields: departmentFields,
    append: appendDepartment,
    remove: removeDepartment,
  } = useFieldArray({
    control,
    name: "departments",
  });

  const addDepartment = () => {
    appendDepartment({
      dept: "",
      questions: [""],
    });
  };

  const addQuestion = (departmentIndex: number) => {
    const currentQuestions = watch(`departments.${departmentIndex}.questions`) || [];
    setValue(`departments.${departmentIndex}.questions`, [...currentQuestions, ""]);
  };

  const removeQuestion = (departmentIndex: number, questionIndex: number) => {
    const currentQuestions = watch(`departments.${departmentIndex}.questions`) || [];
    if (currentQuestions.length > 1) {
      const newQuestions = currentQuestions.filter((_, index) => index !== questionIndex);
      setValue(`departments.${departmentIndex}.questions`, newQuestions);
    }
  };

  const onSubmit = async (data: NotificationFormData) => {
    setIsSubmitting(true);
    try {
      // Process each department
      for (const department of data.departments) {
        await addQuestionToDepartment(department.dept, department.questions);
      }

      // Reset form and close modal
      reset();
      setIsOpen(false);
      onSuccess?.();
    } catch (error) {
      console.error("Error submitting notification questions:", error);
      // You can add toast notification here for error handling
    } finally {
      setIsSubmitting(false);
      router.refresh();
    }
  };

  const handleClose = () => {
    setIsOpen(false);
    reset();
  };

  if (!mounted) {
    return null;
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        {trigger || (
          <Button variant="default" onClick={() => setIsOpen(true)}>
            <Plus className="mr-2 h-4 w-4" />
            Add Notification Triggers
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className="max-h-[80vh] max-w-4xl overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-3xl font-semibold">Add Notification Trigger Questions</DialogTitle>
          <DialogDescription>
            Add questions, for which you want to receive notifications <br />
            eg- Notify when engineering team has flagged an upcoming change. <br />
            &emsp; &nbsp; Notify whenever a safety bulletin is released.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {departmentFields.map((department, departmentIndex) => {
            const questions = watch(`departments.${departmentIndex}.questions`) || [""];

            return (
              <Card key={department.id} className="p-4">
                <CardContent className="space-y-4 p-0">
                  {/* <div className="flex items-center justify-between">
                    {departmentFields.length > 1 && (
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={() => removeDepartment(departmentIndex)}
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    )}
                  </div> */}

                  {/* Department Name */}
                  <div className="space-y-2">
                    <Label className="text-lg font-semibold" htmlFor={`departments.${departmentIndex}.dept`}>
                      {department.dept}
                    </Label>
                    {/* <Input
                      {...register(`departments.${departmentIndex}.dept`)}
                      placeholder="Enter department name"
                      className={errors.departments?.[departmentIndex]?.dept ? "border-red-500" : ""}
                    />
                    {errors.departments?.[departmentIndex]?.dept && (
                      <p className="text-sm text-red-500">{errors.departments[departmentIndex]?.dept?.message}</p>
                    )} */}
                  </div>

                  {/* <Separator /> */}

                  {/* Questions */}
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <Label className="text-base">Questions</Label>
                      <Button type="button" variant="outline" size="sm" onClick={() => addQuestion(departmentIndex)}>
                        <Plus className="mr-1 h-4 w-4" />
                        Add Question
                      </Button>
                    </div>

                    {questions.map((_, questionIndex) => {
                      return (
                        <div key={questionIndex} className="flex items-center space-x-2">
                          <div className="flex-1">
                            <div className="*:not-first:mt-2">
                              <div className="relative">
                                <Input
                                  className="peer ps-28"
                                  type="text"
                                  {...register(`departments.${departmentIndex}.questions.${questionIndex}`)}
                                  placeholder={`Question ${questionIndex + 1}`}
                                />
                                <span className="pointer-events-none absolute inset-y-0 start-0 flex items-center justify-center border-r px-3 text-sm text-muted-foreground peer-disabled:opacity-50">
                                  Notify when
                                </span>
                              </div>
                            </div>
                            {errors.departments?.[departmentIndex]?.questions?.[questionIndex] && (
                              <p className="mt-1 text-sm text-red-500">
                                {errors.departments[departmentIndex]?.questions?.[questionIndex]?.message}
                              </p>
                            )}
                          </div>
                          {questions.length > 1 && (
                            <Button
                              type="button"
                              variant="outline"
                              size="sm"
                              onClick={() => removeQuestion(departmentIndex, questionIndex)}
                            >
                              <X className="h-4 w-4" />
                            </Button>
                          )}
                        </div>
                      );
                    })}

                    {errors.departments?.[departmentIndex]?.questions && (
                      <p className="text-sm text-red-500">At least one question is required</p>
                    )}
                  </div>
                </CardContent>
              </Card>
            );
          })}

          {/* Add Department Button */}
          {/* <Button type="button" variant="outline" onClick={addDepartment} className="w-full">
            <Plus className="mr-2 h-4 w-4" />
            Add Another Department
          </Button> */}

          {/* Form-level errors */}
          {errors.departments && <p className="text-sm text-red-500">At least one department is required</p>}

          {/* Submit buttons */}
          <div className="flex justify-end space-x-2 pt-4">
            <Button type="button" variant="outline" onClick={handleClose}>
              Cancel
            </Button>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Saving...
                </>
              ) : (
                <>
                  <Save className="mr-2 h-4 w-4" />
                  Save Questions
                </>
              )}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
