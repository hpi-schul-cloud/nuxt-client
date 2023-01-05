<template>
	<default-wireframe
		:full-width="false"
		:breadcrumbs="breadcrumbs"
		headline="Task Form"
	>
		<v-form class="d-flex flex-column">
			<task-title-element
				v-model="name"
				:editable="editable"
				:placeholder="$t('common.labels.title')"
			/>
			<draggable
				v-model="children"
				:animation="400"
				:delay="touchDelay"
				handle=".handle"
				ghost-class="ghost"
				chosen-class="chosen"
				drag-class="drag"
				@start="startDragging"
				@end="endDragging"
			>
				<task-content-element
					v-for="(child, index) in children"
					:key="index"
					@delete-element="deleteElement(index)"
				>
					<component
						:is="child.component"
						v-bind="child.props"
						v-model="child.model"
						:disabled="dragInProgress"
					/>
				</task-content-element>
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
import { useRouter, useRoute } from "@nuxtjs/composition-api";
import VueI18n from "vue-i18n";
import { taskModule, authModule } from "@/store";
import { useDrag } from "@/composables/drag";
import draggable from "vuedraggable";
import DefaultWireframe from "@components/templates/DefaultWireframe.vue";
import TaskTitleElement from "@/components/task-form/TaskTitleElement.vue";
import TaskContentElement from "@/components/task-form/TaskContentElement.vue";
import TaskTextElement from "@/components/task-form/TaskTextElement.vue";
import { mdiPlus } from "@mdi/js";

type Element = {
	component: string;
	model: string;
	props: Object;
};

// TODO - unit tests!
export default defineComponent({
	name: "TaskForm",
	components: {
		DefaultWireframe,
		TaskTitleElement,
		TaskContentElement,
		TaskTextElement,
		draggable,
	},
	setup() {
		const router = useRouter();
		// TODO - FIX THIS, can this be a navigation guard?
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
		const route = useRoute().value;

		const editable = true;

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
				props: {
					placeholder: i18n.t("common.labels.description"),
					editable: editable,
				},
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
			editable,
		};
	},
	// TODO - should not use this, because it's nuxt
	// @ts-ignore
	head() {
		return {
			title: this.$t("common.words.tasks"),
		};
	},
});
</script>

<style lang="scss" scoped>
.chosen {
	border: dashed thin var(--v-grey-base);
}

.drag {
	border: dashed thin var(--v-grey-lighten2);
	opacity: 1;
}

.ghost {
	opacity: 1;
}
</style>
