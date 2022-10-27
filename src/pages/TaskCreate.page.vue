<template>
	<default-wireframe
		:full-width="false"
		:breadcrumbs="breadcrumbs"
		headline="Create Task"
	>
		<v-form>
			<v-text-field v-model="title" label="Title" />
			<v-textarea v-model="description" label="Description" />
			<v-btn color="primary">{{ $t("common.actions.save") }}</v-btn>
		</v-form>
	</default-wireframe>
</template>

<script>
import { defineComponent, inject } from "@vue/composition-api";
import DefaultWireframe from "@components/templates/DefaultWireframe.vue";

// eslint-disable-next-line vue/require-direct-export
export default defineComponent({
	name: "TaskCreatePage",
	components: { DefaultWireframe },
	setup() {
		const i18n = inject("i18n");

		const breadcrumbs = [
			{
				text: i18n.t("common.words.tasks"),
				to: "/tasks",
			},
		];

		return { breadcrumbs, title: "", description: "" };
	},
	head() {
		return {
			title: this.$t("common.words.tasks"),
		};
	},
});
</script>
