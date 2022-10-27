<template>
	<default-wireframe
		:full-width="false"
		:breadcrumbs="breadcrumbs"
		headline="Create Task"
	>
		<v-form>
			<v-text-field v-model="name" :label="$t('common.labels.title')" />
			<v-textarea
				v-model="description"
				:label="$t('common.labels.description')"
			/>
			<v-btn color="primary" @click="save">{{
				$t("common.actions.save")
			}}</v-btn>
		</v-form>
	</default-wireframe>
</template>

<script>
import { defineComponent, inject, ref } from "@vue/composition-api";
import { taskModule } from "@/store";
import DefaultWireframe from "@components/templates/DefaultWireframe.vue";

// eslint-disable-next-line vue/require-direct-export
export default defineComponent({
	name: "TaskCreatePage",
	components: { DefaultWireframe },
	setup() {
		const i18n = inject("i18n");
		const name = ref("");
		const description = ref("");

		const breadcrumbs = [
			{
				text: i18n.t("common.words.tasks"),
				to: "/tasks",
			},
		];

		const save = () => {
			taskModule.createTask({
				courseId: "0000dcfbfb5c7a3f00bf21ab",
				name,
				description,
			});
		};

		return { breadcrumbs, name, description, save };
	},
	mounted() {
		// check for permission here or in store?
	},
	head() {
		return {
			title: this.$t("common.words.tasks"),
		};
	},
});
</script>
