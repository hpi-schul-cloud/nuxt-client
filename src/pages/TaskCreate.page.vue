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
import { inject, ref, onBeforeMount } from "@vue/composition-api";
import { taskModule, authModule } from "@/store";
import DefaultWireframe from "@components/templates/DefaultWireframe.vue";

// eslint-disable-next-line vue/require-direct-export
export default {
	name: "TaskCreatePage",
	components: { DefaultWireframe },
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

		const save = async () => {
			await taskModule.createTask({
				name: name.value,
				description: description.value,
			});

			router.go(-1);
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
};
</script>
