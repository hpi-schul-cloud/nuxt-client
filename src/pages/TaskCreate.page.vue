<template>
	<default-wireframe
		:full-width="false"
		:breadcrumbs="breadcrumbs"
		headline="Create Task"
	>
		<v-form>
			<title-card v-model="name" :label="$t('common.labels.title')" />
			<editor
				v-model="description"
				:label="$t('common.labels.description')"
				mode="simple"
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
				name: name.value,
				description: description.value,
			});
		};

		return { breadcrumbs, name, description, save };
	},
	head() {
		return {
			title: this.$t("common.words.tasks"),
		};
	},
});
</script>
