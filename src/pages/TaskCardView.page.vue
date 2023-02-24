<template>
	<default-wireframe
		:full-width="false"
		:breadcrumbs="breadcrumbs"
		headline="Task Card"
	>
		<v-form class="d-flex flex-column" v-if="taskCardPermission">
			<card-element-wrapper v-model="title.model" v-bind="title.props" />
			<card-element-list v-model="elements" :permission="taskCardPermission" />
		</v-form>
	</default-wireframe>
</template>

<script lang="ts">
import { defineComponent, inject, ref, onMounted, computed } from "vue";
import { useRouter, useRoute } from "vue-router/composables";
import VueI18n from "vue-i18n";
import { taskCardModule } from "@/store";
import DefaultWireframe from "@/components/templates/DefaultWireframe.vue";
import CardElementWrapper from "@/components/card-elements/CardElementWrapper.vue";
import CardElementList from "@/components/card-elements/CardElementList.vue";
import {
	CardElement,
	CardElementComponentEnum,
} from "@/store/types/card-element";
import { CardElementResponseCardElementTypeEnum } from "@/serverApi/v3";
import AuthModule from "@/store/auth";

// TODO - unit tests!
export default defineComponent({
	name: "TaskCardView",
	components: {
		DefaultWireframe,
		CardElementWrapper,
		CardElementList,
	},
	setup() {
		// const router = useRouter();

		const i18n: VueI18n | undefined = inject<VueI18n>("i18n");
		const authModule: AuthModule | undefined = inject<AuthModule>("authModule");
		if (!i18n || !authModule) {
			throw new Error("Injection of dependencies failed");
		}
		const breadcrumbs = [
			{
				text: i18n.t("common.words.tasks"),
				to: "/tasks",
			},
		];

		const title = ref<CardElement>({
			id: "",
			type: CardElementResponseCardElementTypeEnum.Title,
			model: "",
		});
		const elements = ref<CardElement[]>([]);
		const route = useRoute();

		onMounted(async () => {
			const taskCardId =
				route.name === "task-card-view" ? route.params.id : undefined;
			if (taskCardId) {
				await taskCardModule.findTaskCard(taskCardId);
			}
			const taskCardData = taskCardModule.getTaskCardData;
			taskCardData.cardElements.forEach((cardElement) => {
				if (
					cardElement.cardElementType ===
					CardElementResponseCardElementTypeEnum.Title
				) {
					title.value = {
						id: cardElement.id,
						type: CardElementResponseCardElementTypeEnum.Title,
						model: cardElement.content.value,
						props: {
							component: CardElementComponentEnum.Title,
							placeholder: i18n.t(
								"components.cardElement.titleElement.placeholder"
							) as string,
							editable: false,
						},
					};
					return;
				}

				elements.value.push({
					id: cardElement.id,
					type: CardElementResponseCardElementTypeEnum.RichText,
					model: cardElement.content.value,
					props: {
						component: CardElementComponentEnum.RichText,
						placeholder: i18n.t(
							"components.cardElement.richTextElement.placeholder"
						) as string,
						editable: false,
					},
				});
			});
		});

		const getUserPermissions = ref(authModule.getUserPermissions);

		const taskCardPermission = computed(() => {
			if (getUserPermissions.value.includes("task_card_edit")) return "edit";
			if (getUserPermissions.value.includes("task_card_view")) return "view";
			return undefined;
		});

		return {
			breadcrumbs,
			title,
			elements,
			taskCardPermission,
		};
	},
	mounted() {
		document.title = this.$t("common.words.tasks") as string;
	},
});
</script>
