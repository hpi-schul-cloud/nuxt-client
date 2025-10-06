<template>
	<div>
		<VDialog v-model="dialogEdit" large max-width="900px" @click:outside="closeEdit">
			<vImportUsersMatchSearch
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
						instance: $theme.name,
						source: sourceSystemName,
					})
				}}

				<br />
				<VIcon>{{ mdiAccountSwitch }}</VIcon>
				{{
					$t("components.organisms.importUsers.legendAdminMatched", {
						instance: $theme.name,
						source: sourceSystemName,
					})
				}}
				<br />
				<VIcon>{{ mdiAccountSwitchOutline }}</VIcon>
				{{
					$t("components.organisms.importUsers.legendAutoMatched", {
						instance: $theme.name,
						source: sourceSystemName,
					})
				}}
				<br />
				<VIcon>{{ mdiFlagOutline }}</VIcon>
				{{
					$t("components.organisms.importUsers.legendFlag", {
						instance: $theme.name,
						source: sourceSystemName,
					})
				}}
			</p>
			<VDivider />
			<br />
		</div>
	</div>
</template>

<script>
import vImportUsersMatchSearch from "@/components/molecules/vImportUsersMatchSearch.vue";
import { ImportUserResponseRoleNamesEnum, SchulcloudTheme } from "@/serverApi/v3";
import { importUsersModule, schoolsModule } from "@/store";
import { MatchedBy } from "@/store/import-users";
import { useEnvConfig } from "@data-env";
import {
	mdiAccountPlus,
	mdiAccountSwitch,
	mdiAccountSwitchOutline,
	mdiAlertCircle,
	mdiFlag,
	mdiFlagOutline,
	mdiPencilOutline,
} from "@icons/material";

export default {
	components: {
		vImportUsersMatchSearch,
	},
	data() {
		return {
			mdiAccountPlus,
			mdiAccountSwitch,
			mdiAccountSwitchOutline,
			mdiAlertCircle,
			mdiFlag,
			mdiFlagOutline,
			mdiPencilOutline,
			MatchedBy,
			loading: false,
			roles: [
				{
					text: this.$t("common.roleName.student"),
					value: ImportUserResponseRoleNamesEnum.Student,
				},
				{
					text: this.$t("common.roleName.teacher"),
					value: ImportUserResponseRoleNamesEnum.Teacher,
				},
				{
					text: this.$t("common.roleName.administrator"),
					value: ImportUserResponseRoleNamesEnum.Admin,
				},
			],
			searchFirstName: "",
			searchLastName: "",
			searchLoginName: "",
			searchRole: null,
			searchClasses: "",
			searchMatchedBy: [MatchedBy.None],
			searchFlagged: false,
			dialogEdit: false,
			options: {
				itemsPerPage: 25,
			},
			defaultItem: {
				firstName: "",
				lastName: "",
				loginName: "",
				roleNames: [],
				classNames: [],
				match: {},
				flagged: false,
			},
			editedIndex: -1,
			delay: 500,
		};
	},
	computed: {
		tableHead() {
			const tableHeaders = [
				{
					title: this.$t("components.organisms.importUsers.tableFirstName"),
					value: "firstName",
					sortable: true,
					headerProps: {
						"data-testid": "head-first-name",
					},
				},
				{
					title: this.$t("components.organisms.importUsers.tableLastName"),
					value: "lastName",
					sortable: true,
					headerProps: {
						"data-testid": "head-last-name",
					},
				},
				{
					title: this.$t("components.organisms.importUsers.tableUserName"),
					value: "loginName",
					sortable: false,
				},
				{
					title: this.$t("components.organisms.importUsers.tableRoles"),
					value: "roleNames",
					sortable: false,
				},
				{
					title: this.$t("components.organisms.importUsers.tableClasses"),
					value: "classNames",
					sortable: false,
				},
				{
					title: this.$t("components.organisms.importUsers.tableMatch", {
						instance: this.$theme.name,
					}),
					value: "match",
					sortable: false,
				},
				{
					title: this.$t("components.organisms.importUsers.tableFlag"),
					value: "flagged",
					sortable: false,
				},
			];
			if (this.isNbc) {
				return tableHeaders.filter((header) => header.value !== "loginName");
			}
			return tableHeaders;
		},
		isNbc() {
			return useEnvConfig().value.SC_THEME.toLowerCase() === SchulcloudTheme.N21;
		},
		canStartMigration() {
			return this.school.inUserMigration && this.school.inMaintenance;
		},
		sourceSystemName() {
			if (useEnvConfig().value.SC_THEME.toLowerCase() === SchulcloudTheme.Brb) {
				return this.$t("pages.administration.migration.brbSchulportal");
			} else if (useEnvConfig().value.SC_THEME.toLowerCase() === SchulcloudTheme.N21) {
				return "moin.schule";
			} else {
				return this.$t("pages.administration.migration.ldapSource");
			}
		},
		editedItem() {
			if (this.editedIndex < 0) {
				return { ...this.defaultItem };
			}
			return this.importUsers[this.editedIndex];
		},
		importUsers() {
			if (importUsersModule.getImportUserList?.data) {
				return importUsersModule.getImportUserList.data;
			}
			return [];
		},
		school() {
			return schoolsModule.getSchool;
		},
		total() {
			return importUsersModule.getTotal;
		},
		totalImportUsers() {
			if (importUsersModule?.getImportUserList?.total) {
				return importUsersModule.getImportUserList.total;
			}
			return 0;
		},
	},
	watch: {
		dialogEdit(val) {
			if (!val) {
				this.closeEdit();
			}
		},
		searchFirstName() {
			this.searchApi();
		},
		searchLastName() {
			this.searchApi();
		},
		searchLoginName() {
			this.searchApi();
		},
		searchRole() {
			this.searchApi();
		},
		searchClasses() {
			this.searchApi();
		},
		searchMatchedBy() {
			this.searchApi();
		},
		searchFlagged() {
			this.searchApi();
		},
		async total(val) {
			if (val > 0) {
				await this.searchApi();
			}
		},
	},
	methods: {
		getRoles(roles) {
			const rolesLables = [];
			if (Array.isArray(roles) && roles.length > 0) {
				if (roles.includes("student")) {
					rolesLables.push(this.$t("common.roleName.student"));
				}
				if (roles.includes("teacher")) {
					rolesLables.push(this.$t("common.roleName.teacher"));
				}
				if (roles.includes("admin")) {
					rolesLables.push(this.$t("common.roleName.administrator"));
				}
			}
			return rolesLables.join(", ");
		},
		getMatchedByIcon(match) {
			if (!match || !match.matchedBy) {
				return mdiAccountPlus;
			}
			if (match.matchedBy === MatchedBy.Auto) {
				return mdiAccountSwitchOutline;
			}
			if (match.matchedBy === MatchedBy.Admin) {
				return mdiAccountSwitch;
			}
		},
		editItem(item) {
			this.editedIndex = this.importUsers.indexOf(item);
			this.dialogEdit = true;
		},
		closeEdit() {
			this.dialogEdit = false;
			this.$nextTick(() => {
				this.editedIndex = -1;
			});
		},
		savedMatch() {
			if (this.searchMatchedBy) {
				this.loading = true;
				this.reloadData();
			}
			this.closeEdit();
		},
		async saveFlag(item) {
			if (this.loading) return false;
			this.loading = true;
			this.editedIndex = this.importUsers.indexOf(item);
			await importUsersModule.saveFlag({
				importUserId: this.editedItem.importUserId,
				flagged: !this.editedItem.flagged,
			});
			if (this.searchFlagged) {
				this.reloadData();
			} else {
				this.loading = false;
			}
		},
		savedFlag() {
			this.loading = true;
			this.reloadData();
		},
		reloadData() {
			setTimeout(() => {
				this.searchApi();
			}, this.delay);
		},
		searchApi() {
			if (!this.canStartMigration) {
				return;
			}
			this.options.page = 1;
			this.getDataFromApi();
		},
		async onUpdateOptions(options) {
			this.options = options;

			await this.getDataFromApi();
		},
		async getDataFromApi() {
			this.loading = true;

			importUsersModule.setFirstName(this.searchFirstName);
			importUsersModule.setLastName(this.searchLastName);
			importUsersModule.setLoginName(this.searchLoginName);
			importUsersModule.setRole(this.searchRole);
			importUsersModule.setClasses(this.searchClasses);
			importUsersModule.setMatch(this.searchMatchedBy);
			importUsersModule.setFlagged(this.searchFlagged);

			importUsersModule.setLimit(this.options.itemsPerPage);
			importUsersModule.setSkip((this.options.page - 1) * this.options.itemsPerPage);

			const sortBy = this.options.sortBy?.length ? this.options.sortBy[0] : { key: "", order: "" };

			importUsersModule.setSortBy(sortBy.key);
			importUsersModule.setSortOrder(sortBy.order);

			await importUsersModule.fetchAllImportUsers();

			this.loading = false;
		},
	},
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
