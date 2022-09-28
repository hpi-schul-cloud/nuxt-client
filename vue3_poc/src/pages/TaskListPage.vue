<template>
	<h1>Aufgaben</h1>
	<v-card v-for="task in tasks" :key="task.id" class="my-6">
		<v-card-item>
			<div>
				<div class="text-overline mb-1">{{ task.courseName }}</div>
				<div class="text-h6 mb-1">{{ task.name }}</div>
			</div>
		</v-card-item>
	</v-card>
	<!-- <pre>{{ tasks }}</pre> -->
</template>
<script lang="ts">
import {
	Configuration,
	TaskApiFactory,
	TaskListResponse,
	TaskResponse,
} from "@/serverApi/v3";
import { useAuthStore } from "@/store/auth";
import { AxiosResponse } from "axios";
import { defineComponent, onMounted, Ref, ref } from "vue";

export default defineComponent({
	name: "TaskListPage",
	setup() {
		const tasks: Ref<TaskResponse[]> = ref([]);

		const authStore = useAuthStore();

		const api = TaskApiFactory(
			new Configuration({ accessToken: authStore.getAccessToken }),
			"/api/v3"
		);

		onMounted(async () => {
			await api
				.taskControllerFindAll()
				.then(
					(response: AxiosResponse<TaskListResponse>) =>
						(tasks.value = response.data.data)
				);
		});

		return { tasks };
	},
});
</script>
