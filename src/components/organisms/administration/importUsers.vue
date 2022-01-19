<template>
	<div>
		<v-dialog v-model="dialogEdit" large max-width="900px">
			<v-import-users-match-search
				:edited-item="editedItem"
				:is-dialog="true"
				:edited-index="editedIndex"
				@close="closeEdit"
				@savedMatch="savedMatch"
				@deletedMatch="deletedMatch"
			></v-import-users-match-search>
		</v-dialog>

		<v-container v-if="canStartMigration">
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
				}"
			>
				<template v-slot:body.prepend>
					<tr class="head">
						<td>
							<v-text-field
								v-model="searchFirstName"
								type="string"
								label="Suche nach Vorname"
								clearable
							></v-text-field>
						</td>
						<td>
							<v-text-field
								v-model="searchLastName"
								type="string"
								label="Suche nach Nachname"
								clearable
							></v-text-field>
						</td>
						<td>
							<v-text-field
								v-model="searchLoginName"
								type="string"
								label="Suche nach Nuzername"
								clearable
							></v-text-field>
						</td>
						<td>
							<v-select
								v-model="searchRole"
								:items="roles"
								label="Rolle wähle"
								clearable
							></v-select>
						</td>
						<td>
							<v-text-field
								v-model="searchClasses"
								type="string"
								label="Suche nach Klasse"
								clearable
							></v-text-field>
						</td>
						<td>
							<v-btn-toggle v-model="searchMatchedBy" multiple borderless group>
								<v-btn icon value="none" title="nicht verknüpft" color="">
									<v-icon
										:color="
											searchMatchedBy.includes('none') ? 'primary' : 'secondary'
										"
										>{{ mdiAccountPlus }}</v-icon
									>
								</v-btn>
								<v-btn icon value="admin" title="von admin verknüpft" color="">
									<v-icon
										:color="
											searchMatchedBy.includes('admin')
												? 'primary'
												: 'secondary'
										"
										>{{ mdiAccountSwitch }}</v-icon
									>
								</v-btn>
								<v-btn icon value="auto" title="automatisch verknüpft" color="">
									<v-icon
										:color="
											searchMatchedBy.includes('auto') ? 'primary' : 'secondary'
										"
										>{{ mdiAccountSwitchOutline }}</v-icon
									>
								</v-btn>
							</v-btn-toggle>
						</td>
						<td>
							<v-btn-toggle v-model="searchFlagged" borderless group>
								<v-btn icon value="true">
									<v-icon :color="searchFlagged ? 'primary' : 'secondary'">{{
										mdiFlag
									}}</v-icon>
								</v-btn>
							</v-btn-toggle>
						</td>
					</tr>
				</template>

				<template v-slot:item.match="{ item }">
					<div class="text-no-wrap">
						<v-icon small>{{ getMatchedByIcon(item.match) }}</v-icon>
						{{
							item.match
								? `${item.match.firstName} ${item.match.lastName}`
								: "Neu erstellen"
						}}
						<v-btn
							class="ma-2"
							text
							icon
							title="bearbeite"
							@click="editItem(item)"
						>
							<v-icon small>{{ mdiPencil }}</v-icon>
						</v-btn>
					</div>
				</template>

				<template v-slot:item.flagged="{ item }">
					<v-btn
						v-if="item.flagged"
						icon
						color="primary"
						class="ma-2"
						title="markiere"
					>
						<v-icon small color="primary">{{ mdiFlag }}</v-icon>
					</v-btn>
					<v-btn v-else icon class="ma-2" title="markiere">
						<v-icon small>{{ mdiFlagOutline }}</v-icon>
					</v-btn>
				</template>
			</v-data-table>

			<p class="text-sm">
				<b>Legende</b>
				<br />
				<v-icon color="secondary">{{ mdiAccountPlus }}</v-icon>
				{{ this.$theme.short_name }} Benutzer nicht gefunden. Das Konto wird neu
				erstellt.
				<br />
				<v-icon color="secondary">{{ mdiAccountSwitch }}</v-icon> Konto von
				Admin mit {{ this.$theme.short_name }} Benutzer verknüpft.
				<br />
				<v-icon color="secondary">{{ mdiAccountSwitchOutline }}</v-icon> Konto
				automatish mit {{ this.$theme.short_name }} Benutzer vverknüpft.
			</p>
			<v-divider></v-divider>
			<br />
		</v-container>

		<v-alert v-else light prominent text type="error">{{
			$t("pages.administration.migration.cannotStart")
		}}</v-alert>
	</div>
</template>

<script>
import SchoolsModule from "@/store/schools";
import ImportUserModule from "@store/import-users";
import vImportUsersMatchSearch from "@components/molecules/vImportUsersMatchSearch";
import {
	mdiAccountPlus,
	mdiAccountSwitch,
	mdiAccountSwitchOutline,
	mdiFlag,
	mdiFlagOutline,
	mdiPencil,
} from "@mdi/js";
import Vue from "vue";
export default Vue.extend({
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
			loading: false,
			roles: ["student", "teacher", "admin"],
			search: "",
			searchFirstName: "",
			searchLastName: "",
			searchLoginName: "",
			searchRole: "",
			searchClasses: "",
			searchMatchedBy: ["none"],
			searchFlagged: false,
			dialogEdit: false,
			dialogDelete: false,
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
		};
	},
	computed: {
		tableHead() {
			return [
				{
					text: "Vorname",
					value: "firstName",
					sortable: true,
				},
				{ text: "Nachname", value: "lastName", sortable: true },
				{ text: "Nutzername", value: "loginName", sortable: false },
				{ text: "Rollen", value: "roleNames", sortable: false },
				{ text: "Klassen", value: "classNames", sortable: false },
				{ text: "Konten verknüpfen", value: "match", sortable: false },
				{ text: "Markieren", value: "flagged", sortable: false },
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
	},
	watch: {
		dialogEdit(val) {
			console.log("dialogEdit", val);
			val || this.closeEdit();
		},
		options: {
			async handler() {
				await this.getDataFromApi();
			},
			deep: true,
		},
		async searchFirstName() {
			await this.searchApi();
		},
		async searchLastName() {
			await this.searchApi();
		},
		async searchLoginName() {
			await this.searchApi();
		},
		async searchRole() {
			await this.searchApi();
		},
		async searchClasses() {
			await this.searchApi();
		},
		async searchMatchedBy() {
			await this.searchApi();
		},
		async searchFlagged() {
			await this.searchApi();
		},
	},
	methods: {
		getMatchedByIcon(match) {
			if (!match || !match.matchedBy) {
				return mdiAccountPlus;
			}
			if (match.matchedBy === "auto") {
				return mdiAccountSwitchOutline;
			}
			if (match.matchedBy === "admin") {
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
		async savedMatch() {
			// TODO should reset page?
			await this.searchApi();
			this.closeEdit();
		},
		async deletedMatch() {
			// TODO should reset page?
			await this.searchApi();
			this.closeEdit();
		},
		async searchApi() {
			this.options.page = 1;
			await this.getDataFromApi();
		},
		async getDataFromApi() {
			this.loading = true;

			ImportUserModule.setFirstName(this.searchFirstName);
			ImportUserModule.setLastName(this.searchLastName);
			ImportUserModule.setLoginName(this.searchLoginName);
			ImportUserModule.setRole(this.searchRole);
			ImportUserModule.setClasses(this.searchClasses);

			if (this.searchMatchedBy) {
				ImportUserModule.setMatch(this.searchMatchedBy);
			}
			ImportUserModule.setFlagged(this.searchFlagged);

			ImportUserModule.setLimit(this.options.itemsPerPage);
			ImportUserModule.setSkip(
				(this.options.page - 1) * this.options.itemsPerPage
			);
			if (this.options.sortBy) {
				ImportUserModule.setSortBy(this.options.sortBy[0]);
				ImportUserModule.setSortOrder(
					this.options.sortDesc[0] ? "desc" : "asc"
				);
			}

			ImportUserModule.fetchAllImportUsers().then(() => {
				this.importUsers = ImportUserModule.getImportUserList.data;
				this.totalImportUsers = ImportUserModule.getImportUserList.total;
				this.loading = false;
			});
		},
	},
});
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
