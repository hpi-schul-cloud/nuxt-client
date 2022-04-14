<template>
	<div>
		<v-dialog
			v-model="dialogEdit"
			large
			max-width="900px"
			@click:outside="editedItem = defaultItem"
		>
			<v-import-users-match-search
				v-if="dialogEdit"
				:edited-item="editedItem"
				:is-dialog="true"
				@close="closeEdit"
				@saved-match="savedMatch"
				@deleted-match="deletedMatch"
				@saved-flag="savedFlag"
			></v-import-users-match-search>
		</v-dialog>

		<v-alert
			v-if="!canStartMigration"
			colored-border
			type="error"
			elevation="2"
		>
			{{ $t("pages.administration.migration.cannotStart") }}
		</v-alert>

		<div v-else>
			<v-data-table
				v-if="canStartMigration"
				:headers="tableHead"
				:items="importUsers"
				:options.sync="options"
				:server-items-length="totalImportUsers"
				:loading="loading"
				class="table"
				:footer-props="{
					itemsPerPageOptions: [5, 10, 25, 50, 100],
					itemsPerPageText: '',
					pageText: '{0}-{1} von {2}',
				}"
			>
				<template v-slot:loading>
					<v-skeleton-loader
						class="mx-auto"
						width="100%"
						type="table-thead, table-tbody"
					>
					</v-skeleton-loader>
				</template>
				<template v-slot:body.prepend>
					<tr class="head">
						<td class="col-2">
							<v-text-field
								v-model="searchFirstName"
								type="string"
								:label="$t('components.organisms.importUsers.searchFirstName')"
								clearable
								class="searchFirstName"
							></v-text-field>
						</td>
						<td class="col-2">
							<v-text-field
								v-model="searchLastName"
								type="string"
								:label="$t('components.organisms.importUsers.searchLastName')"
								clearable
								class="searchLastName"
							></v-text-field>
						</td>
						<td>
							<v-text-field
								v-model="searchLoginName"
								type="string"
								:label="$t('components.organisms.importUsers.searchUserName')"
								clearable
								class="searchLoginName"
							></v-text-field>
						</td>
						<td>
							<v-select
								v-model="searchRole"
								:items="roles"
								:label="$t('components.organisms.importUsers.searchRole')"
								clearable
								class="searchRole"
							></v-select>
						</td>
						<td>
							<v-text-field
								v-model="searchClasses"
								type="string"
								:label="$t('components.organisms.importUsers.searchClass')"
								clearable
								class="searchClasses"
							></v-text-field>
						</td>
						<td class="col-2">
							<v-btn-toggle v-model="searchMatchedBy" multiple borderless group>
								<v-btn
									icon
									:value="MatchedBy.None"
									:title="
										$t('components.organisms.importUsers.searchUnMatched')
									"
									class="searchMatchedByNone"
								>
									<v-icon
										:color="
											searchMatchedBy.includes(MatchedBy.None)
												? 'primary'
												: 'secondary'
										"
										>{{ mdiAccountPlus }}</v-icon
									>
								</v-btn>
								<v-btn
									icon
									:value="MatchedBy.Admin"
									:title="
										$t('components.organisms.importUsers.searchAdminMatched')
									"
									class="searchMatchedByAdmin"
								>
									<v-icon
										:color="
											searchMatchedBy.includes(MatchedBy.Admin)
												? 'primary'
												: 'secondary'
										"
										>{{ mdiAccountSwitch }}</v-icon
									>
								</v-btn>
								<v-btn
									icon
									:value="MatchedBy.Auto"
									:title="
										$t('components.organisms.importUsers.searchAutoMatched')
									"
									class="searchMatchedByAuto"
								>
									<v-icon
										:color="
											searchMatchedBy.includes(MatchedBy.Auto)
												? 'primary'
												: 'secondary'
										"
										>{{ mdiAccountSwitchOutline }}</v-icon
									>
								</v-btn>
							</v-btn-toggle>
						</td>
						<td>
							<v-btn-toggle v-model="searchFlagged" borderless group>
								<v-btn
									icon
									value="true"
									:title="$t('components.organisms.importUsers.searchFlagged')"
									class="searchFlagged"
								>
									<v-icon :color="searchFlagged ? 'primary' : 'secondary'"
										>{{ searchFlagged ? mdiFlag : mdiFlagOutline }}
									</v-icon>
								</v-btn>
							</v-btn-toggle>
						</td>
					</tr>
				</template>

				<template v-slot:item.roleNames="{ item }">
					<div>
						{{ getRoles(item.roleNames) }}
					</div>
				</template>

				<template v-slot:item.match="{ item }">
					<div class="text-no-wrap md">
						<v-icon small>{{ getMatchedByIcon(item.match) }}</v-icon>
						{{
							item.match
								? `${item.match.firstName} ${item.match.lastName}`
								: $t("components.organisms.importUsers.createNew")
						}}
						<v-btn
							class="ma-2"
							text
							icon
							:title="$t('components.organisms.importUsers.editImportUser')"
							@click="editItem(item)"
						>
							<v-icon small>{{ mdiPencil }}</v-icon>
						</v-btn>
					</div>
				</template>

				<template v-slot:item.flagged="{ item }">
					<v-btn
						icon
						:color="item.flagged ? 'primary' : ''"
						class="ma-2"
						:title="$t('components.organisms.importUsers.flagImportUser')"
						@click="saveFlag(item)"
					>
						<v-icon small :color="item.flagged ? 'primary' : ''">{{
							item.flagged ? mdiFlag : mdiFlagOutline
						}}</v-icon>
					</v-btn>
				</template>
			</v-data-table>

			<p class="text-sm">
				<b>{{ $t("components.organisms.importUsers.legend") }}</b>
				<br />
				<v-icon color="secondary">{{ mdiAccountPlus }}</v-icon>
				{{
					$t("components.organisms.importUsers.legendUnMatched", {
						instance: this.$theme.short_name,
						source: $t("pages.administration.migration.ldapSource"),
					})
				}}

				<br />
				<v-icon color="secondary">{{ mdiAccountSwitch }}</v-icon>
				{{
					$t("components.organisms.importUsers.legendAdminMatched", {
						instance: this.$theme.short_name,
						source: $t("pages.administration.migration.ldapSource"),
					})
				}}
				<br />
				<v-icon color="secondary">{{ mdiAccountSwitchOutline }}</v-icon>
				{{
					$t("components.organisms.importUsers.legendAutoMatched", {
						instance: this.$theme.short_name,
						source: $t("pages.administration.migration.ldapSource"),
					})
				}}
				<br />
				<v-icon color="secondary">{{ mdiFlagOutline }}</v-icon>
				{{
					$t("components.organisms.importUsers.legendFlag", {
						instance: this.$theme.short_name,
						source: $t("pages.administration.migration.ldapSource"),
					})
				}}
			</p>
			<v-divider></v-divider>
			<br />
		</div>
	</div>
</template>

<script>
/* eslint-disable max-lines */
import SchoolsModule from "@/store/schools";
import ImportUsersModule, { MatchedBy } from "@store/import-users";
import vImportUsersMatchSearch from "@components/molecules/vImportUsersMatchSearch";
import {
	mdiAccountPlus,
	mdiAccountSwitch,
	mdiAccountSwitchOutline,
	mdiFlag,
	mdiFlagOutline,
	mdiPencil,
} from "@mdi/js";
import { ImportUserResponseRoleNamesEnum } from "@/serverApi/v3";
import ImportUserModule from "@store/import-users";

export default {
	components: {
		vImportUsersMatchSearch,
	},
	data() {
		return {
			mdiAccountPlus,
			mdiAccountSwitch,
			mdiAccountSwitchOutline,
			mdiFlag,
			mdiFlagOutline,
			mdiPencil,
			MatchedBy,
			loading: false,
			roles: [
				{
					text: this.$t("components.organisms.importUsers.roleStudent"),
					value: ImportUserResponseRoleNamesEnum.Student,
				},
				{
					text: this.$t("components.organisms.importUsers.roleTeacher"),
					value: ImportUserResponseRoleNamesEnum.Teacher,
				},
				{
					text: this.$t("components.organisms.importUsers.roleAdministrator"),
					value: ImportUserResponseRoleNamesEnum.Admin,
				},
			],
			searchFirstName: "",
			searchLastName: "",
			searchLoginName: "",
			searchRole: "",
			searchClasses: "",
			searchMatchedBy: [MatchedBy.None],
			searchFlagged: false,
			dialogEdit: false,
			options: {
				itemsPerPage: 25,
			},
			importUsers: [],
			totalImportUsers: 0,
			defaultItem: {
				firstName: "",
				lastName: "",
				loginName: "",
				roleNames: [],
				classNames: [],
				match: {},
				flagged: false,
			},
			editedItem: {
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
			return [
				{
					text: this.$t("components.organisms.importUsers.tableFirstName"),
					value: "firstName",
					sortable: true,
					class: "head_firstName",
				},
				{
					text: this.$t("components.organisms.importUsers.tableLastName"),
					value: "lastName",
					sortable: true,
					class: "head_lastName",
				},
				{
					text: this.$t("components.organisms.importUsers.tableUserName"),
					value: "loginName",
					sortable: false,
				},
				{
					text: this.$t("components.organisms.importUsers.tableRoles"),
					value: "roleNames",
					sortable: false,
				},
				{
					text: this.$t("components.organisms.importUsers.tableClasses"),
					value: "classNames",
					sortable: false,
				},
				{
					text: this.$t("components.organisms.importUsers.tableMatch"),
					value: "match",
					sortable: false,
				},
				{
					text: this.$t("components.organisms.importUsers.tableFlag"),
					value: "flagged",
					sortable: false,
				},
			];
		},
		canStartMigration() {
			return this.school.inUserMigration && this.school.inMaintenance;
		},
		canFinishMigration() {
			return false;
		},
		school() {
			return SchoolsModule.getSchool;
		},
		total() {
			return ImportUserModule.getTotal;
		},
	},
	watch: {
		dialogEdit(val) {
			val || this.closeEdit();
		},
		options: {
			handler() {
				this.getDataFromApi();
			},
			deep: true,
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
					rolesLables.push(
						this.$t("components.organisms.importUsers.roleStudent")
					);
				}
				if (roles.includes("teacher")) {
					rolesLables.push(
						this.$t("components.organisms.importUsers.roleTeacher")
					);
				}
				if (roles.includes("admin")) {
					rolesLables.push(
						this.$t("components.organisms.importUsers.roleAdministrator")
					);
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
			this.editedItem = Object.assign({}, item);
			this.dialogEdit = true;
		},
		closeEdit() {
			this.dialogEdit = false;
			this.$nextTick(() => {
				this.editedItem = Object.assign({}, this.defaultItem);
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
		deletedMatch() {
			this.importUsers[this.editedIndex].match = null;
			this.importUsers[this.editedIndex].class = "primary";
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
			this.editedItem = Object.assign({}, item);
			const importUser = await ImportUsersModule.saveFlag({
				importUserId: this.editedItem.importUserId,
				flagged: !this.editedItem.flagged,
			});
			if (
				!ImportUsersModule.getBusinessError &&
				importUser.flagged === !this.editedItem.flagged
			) {
				this.importUsers[this.editedIndex].flagged = !this.editedItem.flagged;
			}
			if (this.searchFlagged) {
				this.reloadData();
			} else {
				this.loading = false;
			}
		},
		async savedFlag() {
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
		async getDataFromApi() {
			this.loading = true;

			ImportUsersModule.setFirstName(this.searchFirstName);
			ImportUsersModule.setLastName(this.searchLastName);
			ImportUsersModule.setLoginName(this.searchLoginName);
			ImportUsersModule.setRole(this.searchRole);
			ImportUsersModule.setClasses(this.searchClasses);
			ImportUsersModule.setMatch(this.searchMatchedBy);
			ImportUsersModule.setFlagged(this.searchFlagged);

			ImportUsersModule.setLimit(this.options.itemsPerPage);
			ImportUsersModule.setSkip(
				(this.options.page - 1) * this.options.itemsPerPage
			);
			if (this.options.sortBy) {
				ImportUsersModule.setSortBy(this.options.sortBy[0]);
				ImportUsersModule.setSortOrder(
					this.options.sortDesc[0] ? "desc" : "asc"
				);
			}
			await ImportUsersModule.fetchAllImportUsers();
			this.importUsers = ImportUsersModule.getImportUserList.data;
			this.totalImportUsers = ImportUsersModule.getImportUserList.total;

			this.loading = false;
		},
	},
};
</script>

<style lang="scss" scoped>
$rounded: 50%;
tr.head td {
	border-bottom: calc(2 * var(--border-width)) solid var(--color-secondary) !important;
}
.v-btn--round {
	border-radius: $rounded !important;
}
</style>
