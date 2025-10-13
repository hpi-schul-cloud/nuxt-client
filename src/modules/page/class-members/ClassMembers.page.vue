<template>
	<DefaultWireframe
		:headline="$t('pages.administration.classes.index.title')"
		:breadcrumbs="breadcrumbs"
		max-width="full"
	>
		<template #header>
			<h1 data-testid="admin-class-title">
				{{ title }}
				<span v-show="isExternal" class="text-subtitle-1"> ({{ $t("page-class-members.title.info") }}) </span>
			</h1>
		</template>
		<v-data-table
			:items="items"
			:headers="headers"
			:loading="isLoading"
			:loading-text="$t('common.loading.text')"
			:no-data-text="$t('common.nodata')"
			data-testid="class-members-table"
		>
			<template #[`item.firstName`]="{ item }">
				<span data-testid="class-members-table-firstname">
					{{ item.firstName }}
				</span>
			</template>
			<template #[`item.lastName`]="{ item }">
				<span data-testid="class-members-table-lastname">
					{{ item.lastName }}
				</span>
			</template>
			<template #[`item.roleName`]="{ item }">
				<span data-testid="class-members-table-role">
					{{ item.roleName }}
				</span>
			</template>
		</v-data-table>
		<ClassMembersInfoBox class="mt-5" :system-id="externalSystemId" />
	</DefaultWireframe>
</template>

<script lang="ts">
import ClassMembersInfoBox from "./ClassMembersInfoBox.vue";
import { Breadcrumb } from "@/components/templates/default-wireframe.types";
import DefaultWireframe from "@/components/templates/DefaultWireframe.vue";
import { GroupMapper, GroupUser, useGroupState } from "@data-group";
import { computed, ComputedRef, defineComponent, onMounted } from "vue";
import { useI18n } from "vue-i18n";
import { DataTableHeader } from "vuetify";

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

		const groupName: ComputedRef<string> = computed(() => group.value?.name ?? "");

		const title: ComputedRef<string> = computed(() => `${t("common.labels.class")} '${groupName.value}'`);

		const breadcrumbs: ComputedRef<Breadcrumb[]> = computed(() => [
			{
				title: t("pages.administration.index.title"),
				disabled: true,
			},
			{
				title: t("pages.administration.classes.index.title"),
				to: "/administration/groups/classes",
			},
			{
				title: title.value,
				disabled: true,
			},
		]);

		const externalSystemId: ComputedRef<string | undefined> = computed(() => group.value?.externalSource?.systemId);

		const items: ComputedRef<GroupUserTableData[]> = computed(
			() => group.value?.users.map(mapGroupUserToTableData) ?? []
		);

		const mapGroupUserToTableData = (groupUser: GroupUser): GroupUserTableData => ({
			firstName: groupUser.firstName,
			lastName: groupUser.lastName,
			roleName: t(GroupMapper.getTranslationKey(groupUser.role)),
		});

		const headers: DataTableHeader[] = [
			{
				title: t("common.labels.name"),
				value: "lastName",
				key: "lastName",
			},
			{
				title: t("common.labels.firstName"),
				value: "firstName",
				key: "firstName",
			},
			{
				title: t("common.labels.role"),
				value: "roleName",
				key: "roleName",
			},
		];

		const isExternal: ComputedRef<boolean> = computed(() => !!group.value?.externalSource);

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
