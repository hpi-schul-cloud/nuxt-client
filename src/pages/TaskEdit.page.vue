<template>
	<default-wireframe
		:full-width="false"
		:breadcrumbs="breadcrumbs"
		headline="Edit Task"
	>
		<v-form>
			<v-text-field v-model="name" :label="$t('common.labels.title')" />
			<v-textarea
				v-model="description"
				:label="$t('common.labels.description')"
			/>
			<v-btn color="secondary" outlined @click="cancel">
				{{ $t("common.actions.cancel") }}
			</v-btn>
			<v-btn color="primary" outlined @click="remove">
				{{ $t("common.actions.remove") }}
			</v-btn>
			<v-btn class="float-right" color="primary" depressed @click="save">
				{{ $t("common.actions.save") }}
			</v-btn>
		</v-form>
	</default-wireframe>
</template>

<script>
import { inject, ref, onMounted } from "@vue/composition-api";
import { taskModule, tasksModule } from "@/store";
import DefaultWireframe from "@components/templates/DefaultWireframe.vue";

// eslint-disable-next-line vue/require-direct-export
export default {
	name: "TaskCreatePage",
	components: { DefaultWireframe },
	setup(props, context) {
		const router = context.root.$router;
		const route = context.root.$route;
		const i18n = inject("i18n");
		const name = ref("");
		const description = ref("");

		const breadcrumbs = [
			{
				text: i18n.t("common.words.tasks"),
				to: "/tasks",
			},
		];

		const taskId = route.params.id;
		onMounted(async () => {
			// TODO - check for permission

			await taskModule.findTask(taskId);

			const taskData = taskModule.getTaskData;
			name.value = taskData.name;
			description.value = taskData.description.content;
		});

		const save = async () => {
			console.log("hello?", name.value);
			await taskModule.updateTask(taskId, {
				name: name.value,
			});

			//router.go(-1);
		};

		const cancel = () => {
			router.go(-1);
		};

		const remove = async () => {
			await tasksModule.deleteTask(taskId);

			router.go(-1); // TODO - fix return url
		};

		return { breadcrumbs, name, description, save, cancel, remove };
	},
	head() {
		return {
			title: this.$t("common.words.tasks"),
		};
	},
};
</script>
