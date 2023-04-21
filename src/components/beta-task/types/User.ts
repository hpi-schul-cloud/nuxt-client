import { UsersList } from "@/serverApi/v3";

export type User = UsersList;

export const COURSE_ASSIGNMENT = "course_assignment";

export type ValidationRule = (value: [] | null) => boolean | string;
