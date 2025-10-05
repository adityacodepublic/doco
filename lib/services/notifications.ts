"use server";
import { Redis } from "@upstash/redis";

const redis = new Redis({
  url: process.env.UPSTASH_REDIS_REST_URL!,
  token: process.env.UPSTASH_REDIS_REST_TOKEN!,
});

type Department = {
  name: string;
  questions: string[];
  notifications: string[];
};

// Create or Update a Department
export async function saveDepartment(dept: Department) {
  await redis.json.set(`dept:${dept.name}`, "$", dept);
}

// Get One Department
export async function getDepartment(name: string): Promise<Department | null> {
  return (await redis.json.get(`dept:${name}`)) as Department | null;
}

// Get All Departments
export async function getAllDepartments(): Promise<Department[]> {
  const keys = await redis.keys("dept:*");
  const results = await Promise.all(keys.map(k => redis.json.get(k)));
  return results.filter(Boolean) as Department[];
}

// Get All Questions (flattened or grouped)
export async function getAllQuestions() {
  const keys = await redis.keys("dept:*");
  const results = await Promise.all(
    keys.map(async k => ({
      dept: k.replace("dept:", ""),
      questions: ((await redis.json.get(k, "$.questions")) as string[][]).flat(),
    }))
  );
  return results;
}

// Add Question to Department (create dept if doesn't exist)
export async function addQuestionToDepartment(departmentName: string, question: string | string[]) {
  let dept = await getDepartment(departmentName);

  const questionsToAdd = Array.isArray(question) ? question : [question];

  if (!dept) {
    // Create new department if it doesn't exist
    dept = {
      name: departmentName,
      questions: questionsToAdd,
      notifications: [],
    };
  } else {
    // Add question(s) to existing department
    dept.questions = questionsToAdd;
  }

  await saveDepartment(dept);
  return dept;
}

// Add Notification to Department
export async function addNotificationToDepartment(departmentName: string, notification: string | string[]) {
  let dept = await getDepartment(departmentName);

  const notificationsToAdd = Array.isArray(notification) ? notification : [notification];

  if (!dept) {
    // Create new department if it doesn't exist
    dept = {
      name: departmentName,
      questions: [],
      notifications: notificationsToAdd,
    };
  } else {
    // Add notification(s) to existing department
    dept.notifications.push(...notificationsToAdd);
  }

  await saveDepartment(dept);
  return dept;
}

// Get All Notifications
export async function getAllNotifications() {
  const keys = await redis.keys("dept:*");
  const results = await Promise.all(
    keys.map(async k => ({
      dept: k.replace("dept:", ""),
      notifications: (await redis.json.get(k, "$.notifications")) as string[],
    }))
  );
  return results;
}
