<template>
	<default-wireframe
		:full-width="false"
		:breadcrumbs="breadcrumbs"
		headline="Task Form"
	>
		<v-form class="d-flex flex-column">
			<card-title v-model="name" />
			<template v-for="child in children">
				<component
					:is="componentProps.component"
					:key="child.name"
					v-bind="componentProps.props"
					v-model="componentProps.model"
				></component>
			</template>
			<v-btn
				fab
				color="primary"
				class="align-self-center"
				@click="addComponent"
			>
				<v-icon>{{ mdiPlus }}</v-icon>
			</v-btn>
			<div>
				<v-btn color="secondary" outlined @click="cancel">
					{{ $t("common.actions.cancel") }}
				</v-btn>
				<v-btn class="float-right" color="primary" depressed @click="save">
					{{ $t("common.actions.save") }}
				</v-btn>
			</div>
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
import CardTitle from "@/components/atoms/CardTitle.vue";
import Editor from "@/components/molecules/Editor.vue";
import { mdiPlus } from "@mdi/js";

// eslint-disable-next-line vue/require-direct-export
export default defineComponent({
	name: "TaskCreatePage",
	components: { DefaultWireframe, CardTitle, Editor },
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
		const children = ref([]);
		const componentProps = ref({});

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

			if (description.value !== "") {
				componentProps.value = {
					component: "Editor",
					model: description,
					props: { placeholder: i18n.t("common.labels.description") },
				};

				children.value.push(componentProps.value);
			}
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

		const addComponent = () => {
			componentProps.value = {
				component: "Editor",
				model: description,
				props: { placeholder: i18n.t("common.labels.description") },
			};

			children.value.push(componentProps.value);
		};

		return {
			mdiPlus,
			breadcrumbs,
			name,
			description,
			children,
			componentProps,
			save,
			cancel,
			addComponent,
		};
	},
	head() {
		return {
			title: this.$t("common.words.tasks"),
		};
	},
});
</script>
