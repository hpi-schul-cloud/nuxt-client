<template>
	<default-wireframe
		:full-width="false"
		:breadcrumbs="breadcrumbs"
		headline="Task Form"
	>
		<v-form>
			<title-card v-model="name" :label="$t('common.labels.title')" />
			<editor
				v-model="description"
				:label="$t('common.labels.description')"
			></editor>
			<v-btn color="secondary" outlined @click="cancel">
				{{ $t("common.actions.cancel") }}
			</v-btn>
			<v-btn class="float-right" color="primary" depressed @click="save">
				{{ $t("common.actions.save") }}
			</v-btn>
		</v-form>
	</default-wireframe>
</template>

<script>
import {
	defineComponent,
	inject,
	ref,
	onBeforeMount,
	onMounted,
} from "@vue/composition-api";
import { taskModule, authModule } from "@/store";
import DefaultWireframe from "@components/templates/DefaultWireframe.vue";
import TitleCard from "@components/atoms/TitleCard.vue";
import Editor from "@/components/molecules/Editor.vue";

// eslint-disable-next-line vue/require-direct-export
export default defineComponent({
	name: "TaskCreatePage",
	components: { DefaultWireframe, TitleCard, Editor },
	setup(props, context) {
		const router = context.root.$router;
		onBeforeMount(() => {
			if (
				!authModule.getUserPermissions.includes("HOMEWORK_CREATE".toLowerCase())
			) {
				router.go(-1);
			}
		});

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
			await taskModule.findTask(taskId);
			const taskData = taskModule.getTaskData;
			name.value = taskData.name;
			description.value = taskData.description.content;
		});

		const save = () => {
			const newTaskData = {
				name: name.value,
				description: description.value,
			};

			if (!taskId) {
				taskModule.createTask(newTaskData);
			} else {
				taskModule.updateTask(newTaskData);
			}

			//router.go(-1);
		};

		const cancel = () => {
			router.go(-1);
		};

		return { breadcrumbs, name, description, save, cancel };
	},
	head() {
		return {
			title: this.$t("common.words.tasks"),
		};
	},
});
</script>
