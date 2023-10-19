<template>
	<DefaultWireframe
		:headline="t('pages.administration.classes.index.title')"
		:breadcrumbs="breadcrumbs"
		:full-width="true"
		data-testid="admin-class-title"
	>
		<template #header>
			<h1 class="text-h3">
				{{ title }}
				<span v-show="isExternal" class="text-subtitle-1">
					({{ t("page-class-members.title.info") }})
				</span>
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
		<ClassMembersInfoBox class="mt-12" :system-id="externalSystemId" />
	</DefaultWireframe>
</template>

<script lang="ts">
import { Breadcrumb } from "@/components/templates/default-wireframe.types";
import DefaultWireframe from "@/components/templates/DefaultWireframe.vue";
import { useI18n } from "@/composables/i18n.composable";
import { GroupMapper, GroupUser, useGroupState } from "@data-group";
import { computed, ComputedRef, defineComponent, onMounted } from "vue";
import { DataTableHeader } from "vuetify";
import ClassMembersInfoBox from "./ClassMembersInfoBox.vue";

interface GroupUserTableData {
	firstName: string;
	lastName: string;
	roleName: string;
}

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

		const groupName: ComputedRef<string> = computed(
			() => group.value?.name ?? ""
		);

		const title: ComputedRef<string> = computed(
			() => `${t("common.labels.class")} "${groupName.value}"`
		);

		const breadcrumbs: ComputedRef<Breadcrumb[]> = computed(() => [
			{
				text: t("pages.administration.index.title"),
				href: "/administration/",
			},
			{
				text: t("pages.administration.classes.index.title"),
				href: "/administration/groups/classes/",
			},
			{
				text: title.value,
				disabled: true,
			},
		]);

		const externalSystemId: ComputedRef<string | undefined> = computed(
			() => group.value?.externalSource?.systemId
		);

		const items: ComputedRef<GroupUserTableData[]> = computed(
			() => group.value?.users.map(mapGroupUserToTableData) ?? []
		);

		const mapGroupUserToTableData = (
			groupUser: GroupUser
		): GroupUserTableData => {
			return {
				firstName: groupUser.firstName,
				lastName: groupUser.lastName,
				roleName: t(GroupMapper.getTranslationKey(groupUser.role)),
			};
		};

		const headers: DataTableHeader[] = [
			{
				text: t("common.labels.name"),
				value: "lastName",
			},
			{
				text: t("common.labels.firstName"),
				value: "firstName",
			},
			{
				text: t("common.labels.role"),
				value: "roleName",
			},
		];

		const isExternal: ComputedRef<boolean> = computed(
			() => !!group.value?.externalSource
		);

		return {
			t,
			title,
			externalSystemId,
			groupName,
			breadcrumbs,
			items,
			isLoading,
			headers,
			isExternal,
		};
	},
});
</script>
