<template>
	<div>
		<v-dialog v-model="dialogDelete" max-width="500px">
			<v-card>
				<v-card-title class="text-h5"
					>Are you sure you want to delete this item?</v-card-title
				>
				<v-card-actions>
					<v-spacer></v-spacer>
					<v-btn text @click="closeDelete">Cancel</v-btn>
					<v-btn text @click="deleteItemConfirm">OK</v-btn>
					<v-spacer></v-spacer>
				</v-card-actions>
			</v-card>
		</v-dialog>

		<v-dialog v-model="dialogEdit" max-width="500px">
			<v-card>
				<v-card-title>
					<span class="text-h5">{{ editMatch }}</span>
				</v-card-title>
				<v-card-text>
					<v-container>
						<v-row>
							<v-col cols="12" sm="6" md="4">
								<v-autocomplete
									v-model="editedItem.match"
									:items="getLocalUsersSelect()"
									color="white"
									item-text="name"
									label="Local accounts"
								></v-autocomplete>
							</v-col>
						</v-row>
					</v-container>
				</v-card-text>
				<v-card-actions>
					<v-spacer></v-spacer>
					<v-btn text @click="closeEdit"> Cancel </v-btn>
					<v-btn text @click="saveEdit"> Save </v-btn>
				</v-card-actions>
			</v-card>
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
					<tr>
						<td>
							<v-text-field
								v-model="searchFirstName"
								type="string"
								label="Search first name"
								clearable
							></v-text-field>
						</td>
						<td>
							<v-text-field
								v-model="searchLastName"
								type="string"
								label="Search last name"
								clearable
							></v-text-field>
						</td>
						<td>
							<v-text-field
								v-model="searchLoginName"
								type="string"
								label="Search login Name"
								clearable
							></v-text-field>
						</td>
						<td>
							<v-select
								v-model="searchRole"
								:items="roles"
								label="Select Role"
								clearable
							></v-select>
						</td>
						<td>
							<v-text-field
								v-model="searchClasses"
								type="string"
								label="Search Class"
								clearable
							></v-text-field>
						</td>
						<td>
							<v-btn-toggle v-model="searchMatchedBy" :multiple="true">
								<v-btn value="none">
									<v-icon>{{ mdiAccountPlus }}</v-icon>
								</v-btn>
								<v-btn value="admin">
									<v-icon>{{ mdiAccountSwitch }}</v-icon>
								</v-btn>
								<v-btn value="auto">
									<v-icon>{{ mdiAccountSwitchOutline }}</v-icon>
								</v-btn>
							</v-btn-toggle>
						</td>
						<td>
							<v-btn
								v-if="searchFlagged"
								icon
								value="true"
								color="red"
								@click="searchFlagged = !searchFlagged"
							>
								<v-icon>{{ mdiFlag }}</v-icon>
							</v-btn>
							<v-btn
								v-else
								value="false"
								icon
								@click="searchFlagged = !searchFlagged"
							>
								<v-icon>{{ mdiFlagOutline }}</v-icon>
							</v-btn>
						</td>
					</tr>
				</template>

				<template v-slot:item.loginName="{ item }">
					{{ item.loginName }}
				</template>

				<template v-slot:item.match="{ item }">
					<div class="text-no-wrap">
						<v-icon small>{{ getMatchedByIcon(item.match) }}</v-icon>
						{{ getMatch(item.match) }}
						<v-btn class="ma-2" text icon color="">
							<v-icon small @click="editItem(item)">{{ mdiPencil }}</v-icon>
						</v-btn>
					</div>
				</template>

				<template v-slot:item.flagged="{ item }">
					<v-btn v-if="item.flagged" icon color="red">
						<v-icon small>{{ mdiFlag }}</v-icon>
					</v-btn>
					<v-btn v-else icon color="">
						<v-icon small>{{ mdiFlagOutline }}</v-icon>
					</v-btn>
				</template>
			</v-data-table>
		</v-container>

		<v-alert v-else light prominent text type="error">{{
			$t("pages.administration.migration.cannotStart")
		}}</v-alert>
	</div>
</template>

<script>
import SchoolsModule from "@/store/schools";
import ImportUserModule from "@store/import-users";
import {
	mdiAccountPlus,
	mdiAccountSwitch,
	mdiAccountSwitchOutline,
	mdiDelete,
	mdiFlag,
	mdiFlagOutline,
	mdiPencil,
} from "@mdi/js";
import Vue from "vue";
export default Vue.extend({
	data() {
		return {
			mdiAccountPlus,
			mdiAccountSwitch,
			mdiAccountSwitchOutline,
			mdiDelete,
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
			localUsersMock: [
				{
					_id: {
						$oid: "0000d213816abba584714c0a",
					},
					firstName: "Thorsten",
					lastName: "Test",
					email: "admin@schul-cloud.org",
					updatedAt: {
						$date: "2021-12-13T17:28:00.309Z",
					},
					createdAt: {
						$date: "2017-01-01T00:06:37.148Z",
					},
					roles: ["administrator"],
				},
				{
					_id: {
						$oid: "0000d213816abba584714c0b",
					},
					firstName: "Janno",
					lastName: "Jura",
					email: "janno.jura@schul-cloud.org",
					updatedAt: {
						$date: "2020-10-21T15:47:29.456Z",
					},
					createdAt: {
						$date: "2017-01-01T00:06:37.148Z",
					},
					roles: ["administrator"],
				},
				{
					_id: {
						$oid: "0000d224816abba584714c9c",
					},
					firstName: "Marla",
					lastName: "Mathe",
					email: "schueler@schul-cloud.org",
					updatedAt: {
						$date: "2020-10-21T15:47:29.456Z",
					},
					createdAt: {
						$date: "2017-01-01T00:06:37.148Z",
					},
					roles: ["student"],
				},
				{
					_id: {
						$oid: "0000d231816abba584714c9c",
					},
					email: "superhero@schul-cloud.org",
					firstName: "Super",
					lastName: "Hero",
					updatedAt: {
						$date: "2020-10-21T15:47:29.456Z",
					},
					createdAt: {
						$date: "2017-01-01T00:06:37.148Z",
					},
					roles: ["superhero"],
				},
				{
					_id: {
						$oid: "0000d231816abba584714c9e",
					},
					firstName: "Cord",
					lastName: "Carl",
					email: "lehrer@schul-cloud.org",
					updatedAt: {
						$date: "2020-10-21T15:47:29.456Z",
					},
					createdAt: {
						$date: "2017-01-01T00:06:37.148Z",
					},
					roles: ["teacher"],
				},
				{
					_id: {
						$oid: "58b40278dac20e0645353e3a",
					},
					firstName: "Waldemar",
					lastName: "Wunderlich",
					updatedAt: {
						$date: "2020-10-21T15:47:29.456Z",
					},
					createdAt: {
						$date: "2017-01-01T00:06:37.148Z",
					},
					email: "waldemar.wunderlich@schul-cloud.org",
					roles: ["student"],
				},
				{
					_id: {
						$oid: "599ec14d8e4e364ec18ff46d",
					},
					updatedAt: {
						$date: "2020-10-21T15:47:29.456Z",
					},
					createdAt: {
						$date: "2017-08-24T12:06:37.148Z",
					},
					email: "demo-schueler@schul-cloud.org",
					firstName: "Fritz",
					lastName: "Schmidt",
					roles: ["demoStudent"],
				},
				{
					_id: {
						$oid: "599ec1688e4e364ec18ff46e",
					},
					updatedAt: {
						$date: "2020-10-21T15:47:29.456Z",
					},
					createdAt: {
						$date: "2017-08-24T12:07:04.416Z",
					},
					email: "demo-lehrer@schul-cloud.org",
					firstName: "Erika",
					lastName: "Meier",
					roles: ["demoTeacher"],
				},
				{
					_id: {
						$oid: "59ad4c412b442b7f81810285",
					},
					updatedAt: {
						$date: "2020-10-21T15:47:29.456Z",
					},
					createdAt: {
						$date: "2017-09-04T12:51:13.952Z",
					},
					email: "klara.fall@schul-cloud.org",
					firstName: "Klara",
					lastName: "Fall",
					roles: ["teacher"],
				},
				{
					_id: {
						$oid: "59ae89b71f513506904e1cc9",
					},
					updatedAt: {
						$date: "2020-10-21T15:47:29.457Z",
					},
					createdAt: {
						$date: "2017-09-05T11:25:43.556Z",
					},
					email: "paula.meyer@schul-cloud.org",
					firstName: "Paula",
					lastName: "Meyer",
					roles: ["student"],
				},
			],
			importUsers: [],
			localUsers: [],
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
					text: "First Name",
					value: "firstName",
					sortable: true,
				},
				{ text: "Last Name", value: "lastName", sortable: true },
				{ text: "Login", value: "loginName", sortable: false },
				{ text: "Roles", value: "roleNames", sortable: false },
				{ text: "Classes", value: "classNames", sortable: false },
				{ text: "Match", value: "match", sortable: false },
				{ text: "Flagged", value: "flagged", sortable: false },
			];
		},
		editMatch() {
			console.log("editMatch", this.editedIndex);
			//if (this.importUsers[this.editedIndex].match) {
			//return 'Change match';
			//}
			return "Find match";
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
		dialogDelete(val) {
			console.log(`dialogDelete ${val}`);
			val || this.closeDelete();
		},
		options: {
			async handler() {
				await this.getDataFromApi();
			},
			deep: true,
		},
		async searchFirstName() {
			this.options.page = 1;
			await this.getDataFromApi();
		},
		async searchLastName() {
			this.options.page = 1;
			await this.getDataFromApi();
		},
		async searchLoginName() {
			this.options.page = 1;
			await this.getDataFromApi();
		},
		async searchRole() {
			this.options.page = 1;
			await this.getDataFromApi();
		},
		async searchClasses() {
			this.options.page = 1;
			await this.getDataFromApi();
		},
		async searchMatchedBy() {
			this.options.page = 1;
			await this.getDataFromApi();
		},
		async searchFlagged() {
			this.options.page = 1;
			await this.getDataFromApi();
		},
	},
	methods: {
		getFlagColor() {
			return this.searchFlagged ? "red" : "";
		},
		getMatch(match) {
			if (match) {
				return `${match.firstName} ${match.lastName}`;
			}
			return "Neu erstellen";
		},
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
		deleteItem(item) {
			this.editedIndex = this.importUsers.indexOf(item);
			this.editedItem = Object.assign({}, item);
			this.dialogDelete = true;
		},
		deleteItemConfirm() {
			// TODO persist in API
			delete this.importUsers[this.editedIndex].match;
			this.closeDelete();
		},
		closeDelete() {
			this.dialogDelete = false;
			this.$nextTick(() => {
				this.editedItem = Object.assign({}, this.defaultItem);
				this.editedIndex = -1;
			});
		},
		editItem(item) {
			console.log(`editItem`, item);
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
		saveEdit() {
			if (this.editedIndex > -1) {
				// TODO
				//Object.assign(this.desserts[this.editedIndex], this.editedItem)
			} else {
				// this.importUsers.push(this.editedItem)
			}
			this.close();
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

			ImportUserModule.fetchAllElements().then(() => {
				this.importUsers = ImportUserModule.getImportUserList.data;
				this.totalImportUsers = ImportUserModule.getImportUserList.total;
				this.loading = false;
			});
		},

		getLocalUsersSelect() {
			// TODO fetch from API
			const localUsers = this.localUsersMock.map((user) => {
				return {
					value: user._id.$oid,
					name: `${user.firstName} ${user.lastName}`,
				};
			});
			console.log("getLocalUsersSelect", localUsers);
			return localUsers;
		},
	},
});
</script>

<style lang="scss">
.theme--light.v-data-table
	> .v-data-table__wrapper
	> table
	> thead
	> tr:last-child
	> th {
	border-bottom: calc(2 * var(--border-width)) solid var(--color-secondary);
}
</style>
