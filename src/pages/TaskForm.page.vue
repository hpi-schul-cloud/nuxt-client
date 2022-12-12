<template>
	<default-wireframe
		:full-width="false"
		:breadcrumbs="breadcrumbs"
		headline="Task Form"
	>
		<v-form class="d-flex flex-column">
			<card-title v-model="name" :label="$t('common.labels.title')" />
			<draggable
				v-model="children"
				:animation="400"
				:delay="touchDelay"
				handle=".handle"
				@start="startDragging"
				@end="endDragging"
			>
				<v-card v-for="(child, index) in children" :key="index" class="mb-6">
					<v-btn
						fab
						outlined
						color="secondary"
						x-small
						class="delete-element-btn"
						@click="deleteElement(index)"
					>
						<v-icon size="18">{{ mdiTrashCanOutline }}</v-icon>
					</v-btn>
					<v-btn
						v-if="isDraggable"
						fab
						outlined
						color="secondary"
						x-small
						class="drag-element-btn handle"
					>
						<v-icon size="18">{{ mdiDragHorizontalVariant }}</v-icon>
					</v-btn>
					<component
						:is="child.component"
						v-bind="child.props"
						v-model="child.model"
						:disabled="dragInProgress"
					/>
				</v-card>
			</draggable>
			<v-btn fab color="primary" class="align-self-center" @click="addElement">
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
	inject,
	ref,
	computed,
	onBeforeMount,
	onMounted,
} from "@vue/composition-api";
import { taskModule, authModule } from "@/store";
import DefaultWireframe from "@components/templates/DefaultWireframe.vue";
import CardTitle from "@/components/atoms/CardTitle.vue";
import Editor from "@/components/molecules/Editor.vue";
import { mdiPlus, mdiTrashCanOutline, mdiDragHorizontalVariant } from "@mdi/js";
import { useDrag } from "@/composables/drag";
import draggable from "vuedraggable";

export default {
	name: "TaskCreatePage",
	components: { DefaultWireframe, CardTitle, Editor, draggable },
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
		const children = ref([]);

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
			const child = {
				component: "Editor",
				model: desc,
				props: { placeholder: i18n.t("common.labels.description") },
			};

			children.value.push(child);
		};

		const addElement = () => {
			createChild("");
		};

		const deleteElement = (index) => {
			children.value.splice(index, 1);
		};

		const save = () => {
			console.log(children);
			const newTaskData = {
				name: name.value,
				description: children.value[0].model,
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

		const { touchDelay, startDragging, endDragging, dragInProgress } =
			useDrag();

		const isDraggable = computed(() => children.value.length > 1);

		return {
			mdiPlus,
			mdiTrashCanOutline,
			mdiDragHorizontalVariant,
			breadcrumbs,
			name,
			children,
			save,
			cancel,
			addElement,
			deleteElement,
			touchDelay,
			startDragging,
			endDragging,
			dragInProgress,
			isDraggable,
		};
	},
	head() {
		return {
			title: this.$t("common.words.tasks"),
		};
	},
};
</script>

<style lang="scss" scoped>
.delete-element-btn {
	position: absolute;
	top: -5px;
	right: -20px;
	background-color: var(--v-white-base);
}

.drag-element-btn {
	position: absolute;
	left: -40px;
	background-color: var(--v-white-base);
}
</style>
