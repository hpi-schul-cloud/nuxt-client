<template>
	<default-wireframe
		:full-width="false"
		:breadcrumbs="breadcrumbs"
		headline="Create Task"
	>
		<v-form>
			<v-text-field v-model="name" :label="$t('common.labels.title')" />
			<editor
				v-model="description"
				:label="$t('common.labels.description')"
				mode="simple"
			></editor>
			<v-btn color="primary" @click="save">{{
				$t("common.actions.save")
			}}</v-btn>
		</v-form>
	</default-wireframe>
</template>

<script lang="ts">
import { defineComponent, inject, ref } from "vue";
import DefaultWireframe from "@/components/templates/DefaultWireframe.vue";
import Editor from "@/components/molecules/Editor.vue";
import VueI18n from "vue-i18n";
import TasksModule from "@/store/tasks";
import { useTitle } from "@vueuse/core";

// eslint-disable-next-line vue/require-direct-export
export default defineComponent({
	name: "TaskCreatePage",
	components: { DefaultWireframe, Editor },
	setup() {
		const i18n = inject<VueI18n | undefined>("i18n");
		const tasksModule = inject<TasksModule | undefined>("tasksModule");

		if (i18n === undefined) {
			throw new Error("i18n module undefined"); // NUXT_REMOVAL throw createApplicationError()
		}
		if (tasksModule === undefined) {
			throw new Error("tasksModule module undefined"); // NUXT_REMOVAL throw createApplicationError()
		}

		const name = ref("");
		const description = ref("");

		useTitle(i18n.tc("common.words.tasks"));

		const breadcrumbs = [
			{
				text: i18n.t("common.words.tasks"),
				to: "/tasks",
			},
		];

		const save = () => {
			// tasksModule.createTask({
			// 	courseId: "0000dcfbfb5c7a3f00bf21ab",
			// 	name: name.value,
			// 	description: description.value,
			// });
		};

		return { breadcrumbs, name, description, save };
	},
});
</script>
