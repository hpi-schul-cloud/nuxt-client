<template>
	<default-wireframe
		:full-width="false"
		:breadcrumbs="breadcrumbs"
		headline="Task Form"
	>
		<v-form class="d-flex flex-column">
			<card-title v-model="name" :label="$t('common.labels.title')" />
			<v-card v-for="child in children" :key="child.name" class="mb-6">
				<v-btn fab outlined color="secondary" x-small class="delete-btn">
					<v-icon size="18">{{ mdiTrashCanOutline }}</v-icon>
				</v-btn>
				<component
					:is="child.component"
					v-bind="child.props"
					v-model="child.model.value"
				/>
			</v-card>
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
	reactive,
	onBeforeMount,
	onMounted,
} from "@vue/composition-api";
import { taskModule, authModule } from "@/store";
import DefaultWireframe from "@components/templates/DefaultWireframe.vue";
import CardTitle from "@/components/atoms/CardTitle.vue";
import Editor from "@/components/molecules/Editor.vue";
import { mdiPlus, mdiTrashCanOutline } from "@mdi/js";

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

		const i18n = inject("i18n");
		const breadcrumbs = [
			{
				text: i18n.t("common.words.tasks"),
				to: "/tasks",
			},
		];

		const name = ref("");
		const description = reactive([]);
		const children = reactive([]);

		const route = context.root.$route;
		const taskId = route.params.id;
		onMounted(async () => {
			if (taskId) {
				await taskModule.findTask(taskId);
			}
			const taskData = taskModule.getTaskData;

			name.value = taskData.name;
			const desc = taskData.description.content || taskData.description; // TODO - clean this up

			// TODO - iterate
			createChild(desc);
		});

		const createChild = (desc) => {
			description.push(ref(desc));
			const child = {
				component: "Editor",
				model: ref(description[description.length - 1]),
				props: { placeholder: i18n.t("common.labels.description") },
			};

			children.push(child);
		};

		const addComponent = () => {
			createChild("");
		};

		const save = () => {
			console.log(description);
			const newTaskData = {
				name: name.value,
				description: description[0].value,
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

		return {
			mdiPlus,
			mdiTrashCanOutline,
			breadcrumbs,
			name,
			description,
			children,
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

<style lang="scss" scoped>
.delete-btn {
	position: absolute;
	top: -5px;
	right: -20px;
	background-color: var(--v-white-base);
}
</style>
