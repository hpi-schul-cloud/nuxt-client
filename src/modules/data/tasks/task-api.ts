import { $axios } from "@/utils/api";
import { TaskResponse } from "@api-server";

export type TaskResponseWithSettings = TaskResponse & {
	lessonId?: string;
	publicSubmissions?: boolean;
	teamSubmissions?: boolean;
	maxTeamMembers?: number;
};

export type TaskWriteParams = {
	name: string;
	description?: string;
	availableDate?: string;
	dueDate?: string;
	private?: boolean;
	publicSubmissions?: boolean;
	teamSubmissions?: boolean;
	maxTeamMembers?: number;
	courseId?: string;
	lessonId?: string;
};

export const getTask = async (taskId: string) =>
	(await $axios.get<TaskResponseWithSettings>(`/v3/tasks/${taskId}`)).data;

export const createTask = async (params: TaskWriteParams) =>
	(await $axios.post<TaskResponseWithSettings>("/v3/tasks", params)).data;

export const updateTask = async (taskId: string, params: TaskWriteParams) =>
	(await $axios.patch<TaskResponseWithSettings>(`/v3/tasks/${taskId}`, params)).data;
