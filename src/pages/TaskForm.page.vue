<template>
	<default-wireframe
		:full-width="false"
		:breadcrumbs="breadcrumbs"
		headline="Task Form"
	>
		<v-form class="d-flex flex-column">
			<task-title-element v-model="name" :label="$t('common.labels.title')" />
			<draggable
				v-model="children"
				:animation="400"
				:delay="touchDelay"
				handle=".handle"
				@start="startDragging"
				@end="endDragging"
			>
				<div v-for="(child, index) in children" :key="index">
					<component
						:is="child.component"
						v-bind="child.props"
						v-model="child.model"
						:drag-in-progress="dragInProgress"
						@delete-element="deleteElement(index)"
					/>
				</div>
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

<script lang="ts">
import {
	defineComponent,
	inject,
	ref,
	// computed,
	onBeforeMount,
	onMounted,
} from "@vue/composition-api";
import VueI18n from "vue-i18n";
import { taskModule, authModule } from "@/store";
import { useDrag } from "@/composables/drag";
import draggable from "vuedraggable";
import DefaultWireframe from "@components/templates/DefaultWireframe.vue";
import TaskTitleElement from "@/components/task-form/TaskTitleElement.vue";
import TaskTextElement from "@/components/task-form/TaskTextElement.vue";
import CKEditor from "@/components/task-form/CKEditor.vue";
import { mdiPlus } from "@mdi/js";

type Element = {
	component: string;
	model: string;
	props: Object;
};

export default defineComponent({
	name: "TaskForm",
	components: {
		DefaultWireframe,
		TaskTitleElement,
		TaskTextElement,
		CKEditor,
		draggable,
	},
	setup(props, context) {
		// TODO - useRouter, useRoute aus vue compo, with defineComponent
		const router = context.root.$router;
		// TODO - can this be a navigation guard?
		onBeforeMount(() => {
			if (
				!authModule.getUserPermissions.includes("HOMEWORK_CREATE".toLowerCase())
			) {
				router.go(-1);
			}
		});

		const i18n: VueI18n | undefined = inject<VueI18n>("i18n");
		if (!i18n) {
			throw new Error("Injection of dependencies failed");
		}
		const breadcrumbs = [
			{
				text: i18n.t("common.words.tasks"),
				to: "/tasks",
			},
		];

		const name = ref("");
		const children = ref<Element[]>([]);
		const route = context.root.$route;

		onMounted(async () => {
			const taskId = route.name === "task-edit" ? route.params.id : undefined;
			if (taskId) {
				await taskModule.findTask(taskId);
			}

			const taskData = taskModule.getTaskData;
			name.value = taskData.name;
			const desc = taskData.description.content;

			// TODO - iterate
			createChild(desc);
		});

		const createChild = (desc: string) => {
			const child = {
				component: "TaskTextElement",
				model: desc,
				props: { placeholder: i18n.t("common.labels.description") },
			};

			children.value.push(child);
		};

		const addElement = () => {
			createChild("");
		};

		const deleteElement = (index: number) => {
			children.value.splice(index, 1);
		};

		const save = () => {
			const newTaskData = {
				name: name.value,
				description: children.value[0].model,
			};

			if (route.name === "task-new") {
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

		// TODO - why is length not reactive when children is reactive not ref
		// TODO - is this necessary?
		// const isDraggable = computed(() => children.value.length > 1);

		return {
			mdiPlus,
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
			// isDraggable,
		};
	},
	// TODO - should not use this, because it's nuxt
	head() {
		return {
			title: this.$t("common.words.tasks"),
		};
	},
});
</script>
