<template>
	<div>
		<VDialog v-model="dialogEdit" large max-width="900px" @click:outside="closeEdit">
			<ImportUsersMatchSearch
				v-if="dialogEdit"
				:edited-item="editedItem"
				:is-dialog="true"
				:ldap-source="sourceSystemName"
				:is-nbc="isNbc"
				@close="closeEdit"
				@saved-match="savedMatch"
				@saved-flag="savedFlag"
			/>
		</VDialog>

		<VAlert v-if="!canStartMigration" type="error" :icon="mdiAlertCircle" elevation="2">
			{{ $t("pages.administration.migration.cannotStart") }}
		</VAlert>

		<div v-else>
			<VDataTableServer
				v-if="canStartMigration"
				:headers="tableHead"
				:items="importUsers"
				:items-length="totalImportUsers"
				:loading="loading"
				class="table"
				:items-per-page="25"
				:items-per-page-options="[5, 10, 25, 50, 100]"
				@update:options="onUpdateOptions"
			>
				<template #loading>
					<VSkeletonLoader class="mx-auto" width="100%" type="table-thead, table-tbody" />
				</template>
				<template #[`body.prepend`]>
					<tr class="head">
						<td class="col-2">
							<VTextField
								v-model="searchFirstName"
								type="string"
								:label="$t('components.organisms.importUsers.searchFirstName')"
								clearable
								data-testid="search-first-name"
							/>
						</td>
						<td class="col-2">
							<VTextField
								v-model="searchLastName"
								type="string"
								:label="$t('components.organisms.importUsers.searchLastName')"
								clearable
								data-testid="search-last-name"
							/>
						</td>
						<td v-if="!isNbc">
							<VTextField
								v-model="searchLoginName"
								type="string"
								:label="$t('components.organisms.importUsers.searchUserName')"
								clearable
								data-testid="search-login-name"
							/>
						</td>
						<td>
							<VSelect
								v-model="searchRole"
								:items="roles"
								item-title="text"
								item-value="value"
								:label="$t('components.organisms.importUsers.searchRole')"
								clearable
								data-testid="search-role"
							/>
						</td>
						<td>
							<v-text-field
								v-model="searchClasses"
								type="string"
								:label="$t('components.organisms.importUsers.searchClass')"
								clearable
								data-testid="search-classes"
							/>
						</td>
						<td class="col-2">
							<VBtnToggle v-model="searchMatchedBy" multiple>
								<VBtn
									icon
									variant="text"
									:value="MatchedBy.None"
									:title="$t('components.organisms.importUsers.searchUnMatched')"
									data-testid="search-matched-by-none"
								>
									<VIcon
										:color="searchMatchedBy.includes(MatchedBy.None) ? 'primary' : 'rgba(var(--v-theme-on-background))'"
									>
										{{ mdiAccountPlus }}
									</VIcon>
								</VBtn>
								<VBtn
									icon
									variant="text"
									:value="MatchedBy.Admin"
									:title="$t('components.organisms.importUsers.searchAdminMatched')"
									data-testid="search-matched-by-admin"
								>
									<VIcon
										:color="
											searchMatchedBy.includes(MatchedBy.Admin) ? 'primary' : 'rgba(var(--v-theme-on-background))'
										"
									>
										{{ mdiAccountSwitch }}
									</VIcon>
								</VBtn>
								<VBtn
									icon
									variant="text"
									:value="MatchedBy.Auto"
									:title="$t('components.organisms.importUsers.searchAutoMatched')"
									data-testid="search-matched-by-auto"
								>
									<VIcon
										:color="searchMatchedBy.includes(MatchedBy.Auto) ? 'primary' : 'rgba(var(--v-theme-on-background))'"
									>
										{{ mdiAccountSwitchOutline }}
									</VIcon>
								</VBtn>
							</VBtnToggle>
						</td>
						<td>
							<VBtnToggle v-model="searchFlagged" class="w-100">
								<VBtn
									icon
									variant="text"
									value="true"
									:title="$t('components.organisms.importUsers.searchFlagged')"
									class="mx-auto"
									data-testid="search-flagged"
								>
									<VIcon :color="searchFlagged ? 'primary' : 'rgba(var(--v-theme-on-background))'">
										{{ searchFlagged ? mdiFlag : mdiFlagOutline }}
									</VIcon>
								</VBtn>
							</VBtnToggle>
						</td>
					</tr>
				</template>

				<template #[`item.roleNames`]="{ item }">
					<div>
						{{ getRoles(item.roleNames) }}
					</div>
				</template>

				<template #[`item.classNames`]="{ item }">
					{{ item.classNames?.join(", ") }}
				</template>

				<template #[`item.match`]="{ item }">
					<div class="text-no-wrap md">
						<VIcon size="small">{{ getMatchedByIcon(item.match) }}</VIcon>
						{{
							item.match
								? `${item.match.firstName} ${item.match.lastName}`
								: $t("components.organisms.importUsers.createNew")
						}}
						<VBtn
							class="ma-2"
							variant="text"
							icon
							:title="$t('components.organisms.importUsers.editImportUser')"
							@click="editItem(item)"
						>
							<VIcon size="small">{{ mdiPencilOutline }}</VIcon>
						</VBtn>
					</div>
				</template>

				<template #[`item.flagged`]="{ item }">
					<VBtn
						icon
						variant="text"
						:color="item.flagged ? 'primary' : ''"
						class="d-block mx-auto my-2"
						:title="$t('components.organisms.importUsers.flagImportUser')"
						@click="saveFlag(item)"
					>
						<VIcon size="small" :color="item.flagged ? 'primary' : ''">
							{{ item.flagged ? mdiFlag : mdiFlagOutline }}
						</VIcon>
					</VBtn>
				</template>
			</VDataTableServer>

			<p class="text-sm">
				<b>{{ $t("components.organisms.importUsers.legend") }}</b>
				<br />
				<VIcon>{{ mdiAccountPlus }}</VIcon>
				{{
					$t("components.organisms.importUsers.legendUnMatched", {
						instance: instanceName,
						source: sourceSystemName,
					})
				}}

				<br />
				<VIcon>{{ mdiAccountSwitch }}</VIcon>
				{{
					$t("components.organisms.importUsers.legendAdminMatched", {
						instance: instanceName,
						source: sourceSystemName,
					})
				}}
				<br />
				<VIcon>{{ mdiAccountSwitchOutline }}</VIcon>
				{{
					$t("components.organisms.importUsers.legendAutoMatched", {
						instance: instanceName,
						source: sourceSystemName,
					})
				}}
				<br />
				<VIcon>{{ mdiFlagOutline }}</VIcon>
				{{
					$t("components.organisms.importUsers.legendFlag", {
						instance: instanceName,
						source: sourceSystemName,
					})
				}}
			</p>
			<VDivider />
			<br />
		</div>
	</div>
</template>

<script setup lang="ts">
import ImportUsersMatchSearch from "./ImportUsersMatchSearch.vue";
import { importUsersModule, schoolsModule } from "@/store";
import { MatchedBy } from "@/store/import-users";
import {
	ImportUserResponse,
	ImportUserResponseRoleNames,
	SchulcloudTheme,
	UserMatchResponse,
	UserMatchResponseMatchedBy,
} from "@api-server";
import { useEnvConfig, useEnvStore } from "@data-env";
import {
	mdiAccountPlus,
	mdiAccountSwitch,
	mdiAccountSwitchOutline,
	mdiAlertCircle,
	mdiFlag,
	mdiFlagOutline,
	mdiPencilOutline,
} from "@icons/material";
import { computed, nextTick, ref, watch } from "vue";
import { useI18n } from "vue-i18n";

const { t } = useI18n();

const loading = ref(false);
const roles = [
	{ text: t("common.roleName.student"), value: ImportUserResponseRoleNames.STUDENT },
	{ text: t("common.roleName.teacher"), value: ImportUserResponseRoleNames.TEACHER },
	{ text: t("common.roleName.administrator"), value: ImportUserResponseRoleNames.ADMIN },
];
const searchFirstName = ref("");
const searchLastName = ref("");
const searchLoginName = ref("");
const searchRole = ref<string | null>(null);
const searchClasses = ref("");
const searchMatchedBy = ref<MatchedBy[]>([MatchedBy.None]);
const searchFlagged = ref(false);
const dialogEdit = ref(false);
type DataTableOptions = {
	itemsPerPage: number;
	page?: number;
	sortBy?: Array<{ key: string; order?: boolean | "asc" | "desc" }>;
};
const options = ref<DataTableOptions>({
	itemsPerPage: 25,
});
const defaultItem: ImportUserResponse = {
	importUserId: "",
	firstName: "",
	lastName: "",
	loginName: "",
	roleNames: [],
	classNames: [],
	flagged: false,
};
const editedIndex = ref(-1);
const delay = 500;

const instanceName = computed(() => useEnvStore().instanceName);
const isNbc = computed(() => useEnvConfig().value.SC_THEME.toLowerCase() === SchulcloudTheme.N21);
const importUsers = computed(() => importUsersModule.getImportUserList?.data ?? []);
const school = computed(() => schoolsModule.getSchool);
const total = computed(() => importUsersModule.getTotal);
const totalImportUsers = computed(() => importUsersModule?.getImportUserList?.total ?? 0);
const canStartMigration = computed(() => school.value.inUserMigration && school.value.inMaintenance);
const sourceSystemName = computed(() => {
	const theme = useEnvConfig().value.SC_THEME.toLowerCase();
	if (theme === SchulcloudTheme.BRB) {
		return t("pages.administration.migration.brbSchulportal");
	} else if (theme === SchulcloudTheme.N21) {
		return "moin.schule";
	} else {
		return t("pages.administration.migration.ldapSource");
	}
});
const editedItem = computed<ImportUserResponse>(() => {
	if (editedIndex.value < 0) {
		return { ...defaultItem };
	}
	return importUsers.value[editedIndex.value];
});
const tableHead = computed(() => {
	const headers = [
		{
			title: t("components.organisms.importUsers.tableFirstName"),
			value: "firstName",
			sortable: true,
			headerProps: { "data-testid": "head-first-name" },
		},
		{
			title: t("components.organisms.importUsers.tableLastName"),
			value: "lastName",
			sortable: true,
			headerProps: { "data-testid": "head-last-name" },
		},
		{
			title: t("components.organisms.importUsers.tableUserName"),
			value: "loginName",
			sortable: false,
		},
		{
			title: t("components.organisms.importUsers.tableRoles"),
			value: "roleNames",
			sortable: false,
		},
		{
			title: t("components.organisms.importUsers.tableClasses"),
			value: "classNames",
			sortable: false,
		},
		{
			title: t("components.organisms.importUsers.tableMatch", {
				instance: instanceName.value,
			}),
			value: "match",
			sortable: false,
		},
		{
			title: t("components.organisms.importUsers.tableFlag"),
			value: "flagged",
			sortable: false,
		},
	];
	if (isNbc.value) {
		return headers.filter((header) => header.value !== "loginName");
	}
	return headers;
});

watch(dialogEdit, (val) => {
	if (!val) closeEdit();
});
watch(searchFirstName, () => searchApi());
watch(searchLastName, () => searchApi());
watch(searchLoginName, () => searchApi());
watch(searchRole, () => searchApi());
watch(searchClasses, () => searchApi());
watch(searchMatchedBy, () => searchApi());
watch(searchFlagged, () => searchApi());
watch(total, async (val) => {
	if (val > 0) {
		await searchApi();
	}
});

const getRoles = (roleNames: string[]) => {
	const labels: string[] = [];
	if (Array.isArray(roleNames) && roleNames.length > 0) {
		if (roleNames.includes("student")) labels.push(t("common.roleName.student"));
		if (roleNames.includes("teacher")) labels.push(t("common.roleName.teacher"));
		if (roleNames.includes("admin")) labels.push(t("common.roleName.administrator"));
	}
	return labels.join(", ");
};

const getMatchedByIcon = (match: UserMatchResponse | undefined) => {
	if (!match || !match.matchedBy) return mdiAccountPlus;
	if (match.matchedBy === UserMatchResponseMatchedBy.AUTO) return mdiAccountSwitchOutline;
	if (match.matchedBy === UserMatchResponseMatchedBy.ADMIN) return mdiAccountSwitch;
};

const editItem = (item: ImportUserResponse) => {
	editedIndex.value = importUsers.value.indexOf(item);
	dialogEdit.value = true;
};

const closeEdit = () => {
	dialogEdit.value = false;
	nextTick(() => {
		editedIndex.value = -1;
	});
};

const getDataFromApi = async () => {
	loading.value = true;

	importUsersModule.setFirstName(searchFirstName.value);
	importUsersModule.setLastName(searchLastName.value);
	importUsersModule.setLoginName(searchLoginName.value);
	importUsersModule.setRole(searchRole.value as ImportUserResponseRoleNames);
	importUsersModule.setClasses(searchClasses.value);
	importUsersModule.setMatch(searchMatchedBy.value);
	importUsersModule.setFlagged(searchFlagged.value);

	importUsersModule.setLimit(options.value.itemsPerPage);
	importUsersModule.setSkip(((options.value.page ?? 1) - 1) * options.value.itemsPerPage);

	const sortBy = options.value.sortBy?.length ? options.value.sortBy[0] : { key: "", order: undefined };

	importUsersModule.setSortBy(sortBy.key);
	const sortOrder = sortBy.order === "asc" || sortBy.order === "desc" ? sortBy.order : undefined;
	importUsersModule.setSortOrder(sortOrder);

	await importUsersModule.fetchAllImportUsers();

	loading.value = false;
};

const searchApi = async () => {
	if (!canStartMigration.value) return;
	options.value.page = 1;
	await getDataFromApi();
};

const reloadData = () => {
	setTimeout(() => searchApi(), delay);
};

const onUpdateOptions = async (newOptions: DataTableOptions) => {
	options.value = newOptions;
	await getDataFromApi();
};

const savedMatch = () => {
	if (searchMatchedBy.value) {
		loading.value = true;
		reloadData();
	}
	closeEdit();
};

const saveFlag = async (item: ImportUserResponse) => {
	if (loading.value) return false;
	loading.value = true;
	editedIndex.value = importUsers.value.indexOf(item);
	await importUsersModule.saveFlag({
		importUserId: editedItem.value.importUserId,
		flagged: !editedItem.value.flagged,
	});
	if (searchFlagged.value) {
		reloadData();
	} else {
		loading.value = false;
	}
};

const savedFlag = () => {
	loading.value = true;
	reloadData();
};
</script>

<style lang="scss" scoped>
$rounded: 50%;

tr.head td {
	border-bottom: 2px solid rgba(var(--v-theme-on-background)) !important;
}

.v-btn--round {
	border-radius: $rounded !important;
}
</style>
