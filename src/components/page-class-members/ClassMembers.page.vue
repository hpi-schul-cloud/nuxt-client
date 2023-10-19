<template>
	<DefaultWireframe
		:headline="t('pages.administration.classes.index.title')"
		:breadcrumbs="breadcrumbs"
		:full-width="true"
		data-testid="admin-class-title"
	>
		<template #header>
			<h1 class="text-h3">
				Klasse ABC
				<span class="text-subtitle-1"
					>(importiert aus einem externen System)</span
				>
			</h1>
		</template>
		<v-data-table
			:disable-pagination="true"
			:hide-default-footer="true"
			:items="items"
			:headers="headers"
			:loading="isLoading"
			:loading-text="t('common.loading.text')"
			:no-data-text="t('common.nodata')"
			data-testid="class-members-table"
		></v-data-table>
		<ClassMembersInfoBox style="margin-top: 50px" />
	</DefaultWireframe>
</template>

<script lang="ts">
import DefaultWireframe from "@/components/templates/DefaultWireframe.vue";
import { defineComponent, onMounted, ref } from "vue";
import { useI18n } from "@/composables/i18n.composable";
import { Breadcrumb } from "@/components/templates/default-wireframe.types";
import ClassMembersInfoBox from "@/components/ui-class-members/ClassMembersInfoBox.vue";
import { useGroupState } from "@data-group";

export default defineComponent({
	components: { ClassMembersInfoBox, DefaultWireframe },
	props: {
		groupId: {
			type: String,
			required: true,
		},
	},
	setup(props) {
		const { fetchGroup, group, isLoading } = useGroupState();

		onMounted(() => {
			fetchGroup(props.groupId);
		});

		const { t } = useI18n();

		const breadcrumbs: Breadcrumb[] = [
			{
				text: t("pages.administration.index.title"),
				href: "/administration/",
			},
			{
				text: t("pages.administration.classes.index.title"),
				href: "/administration/groups/classes/",
			},
			{
				text: "Klasse",
				disabled: true,
			},
		];

		const items = ref(group.value?.users ?? []);
		const headers = ref([
			{
				text: "Name",
				value: "name",
			},
			{
				text: "Vorname",
				value: "vorname",
			},
			{
				text: "Rolle",
				value: "role",
			},
		]);

		return {
			t,
			breadcrumbs,
			items,
			isLoading,
			headers,
		};
	},
});
</script>
