<!-- eslint-disable max-lines -->
<template>
	<default-wireframe
		:headline="$t('pages.administration.migration.title')"
		:full-width="true"
		:breadcrumbs="breadcrumbs"
	>
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

		<v-row>
			<v-col cols="12" md="3">
				<v-text-field
					v-model="search"
					:prepend-inner-icon="mdiMagnify"
					label="Filter"
					single-line
					hide-details
					dense
					clearable
				></v-text-field>
			</v-col>
			<v-col cols="12" md="9">
				<v-checkbox
					v-model="matchedBy"
					class="float-left"
					label="unmatched"
					value=""
					dense
				></v-checkbox>
				<v-checkbox
					v-model="matchedBy"
					class="float-left"
					label="manual"
					value="admin"
					dense
				></v-checkbox>
				<v-checkbox
					v-model="matchedBy"
					class="float-left"
					label="automatic"
					value="auto"
					dense
				></v-checkbox>
			</v-col>
		</v-row>

		<v-data-table
			v-if="canStartMigration"
			dense
			:headers="tableHead"
			:items="importUsers"
			:items-per-page="25"
			:options.sync="options"
			:server-items-length="totalImportUsers"
			class="table"
			:search="search"
      :footer-props="{
        itemsPerPageOptions: [5, 10, 25, 50, 100, -1],
      }"
		>
			<template v-slot:item.ldapDn="{ item }">
				{{ getAccount(item.ldapDn) }}
			</template>

			<template v-slot:item.match="{ item }">
				<v-icon small>{{ getMatchedByIcon(item.match) }}</v-icon>
				{{ getMatch(item.match) }}
				<v-icon small @click="editItem(item)">{{ mdiPencil }}</v-icon>
				<v-icon small @click="deleteItem(item)">{{ mdiDelete }}</v-icon>
			</template>
		</v-data-table>

		<v-alert v-else light prominent text type="error">{{
			$t("pages.administration.migration.cannotStart")
		}}</v-alert>
	</default-wireframe>
</template>

<script>
import DefaultWireframe from "@components/templates/DefaultWireframe.vue";
import SchoolsModule from "@/store/schools";
import {
	mdiDelete,
	mdiPencil,
	mdiAccountArrowRight,
	mdiAccountArrowLeftOutline,
	mdiAccountOffOutline,
	mdiMagnify,
} from "@mdi/js";

export default {
	components: {
		DefaultWireframe,
	},
	layout: "defaultVuetify",
	data() {
		return {
			matchedBy: ["admin", "auto", ""],
			mdiDelete,
			mdiPencil,
			mdiAccountArrowRight,
			mdiMagnify,
			breadcrumbs: [
				{
					text: this.$t("pages.administration.index.title"),
					href: "/administration/",
				},
			],
			dialogEdit: false,
			dialogDelete: false,
			search: "",
			options: {},
			importUsersMock: [
				{
					_id: {
						$oid: "61b22f1ff2eef8a520c25632",
					},
					firstName: "Gulien-Marlo",
					lastName: "Amann",
					ldapDn:
						"uid=gulien-marlo1,cn=schueler,cn=users,ou=100001,dc=training,dc=ucs",
					roles: ["student"],
					classNames: ["11/4"],
					match: {
						userId: {
							$oid: "0000d224816abba584714c9c",
						},
						matchedBy: "admin",
					},
				},
				{
					_id: {
						$oid: "61b22f1ff2eef8a520c25634",
					},
					firstName: "Helen",
					lastName: "Alt",
					ldapDn:
						"uid=helena1,cn=schueler,cn=users,ou=100001,dc=training,dc=ucs",
					roles: ["administrator", "teacher"],
					classNames: ["11/5", "11/4"],
				},
				{
					_id: {
						$oid: "61b22f1ff2eef8a520c25636",
					},
					firstName: "Adrian",
					lastName: "Amann",
					ldapDn:
						"uid=adriana1,cn=schueler,cn=users,ou=100001,dc=training,dc=ucs",
					roles: ["teacher"],
					classNames: ["11/3"],
					match: {
						userId: {
							$oid: "0000d231816abba584714c9e",
						},
						matchedBy: "auto",
					},
				},
				{
					_id: {
						$oid: "61b22f1ff2eef8a520c25638",
					},
					firstName: "Fabian",
					lastName: "Anders",
					ldapDn:
						"uid=fabiana1,cn=schueler,cn=users,ou=100001,dc=training,dc=ucs",
					roles: ["student"],
					classNames: ["11/6"],
				},
				{
					_id: {
						$oid: "61b22f1ff2eef8a520c2563a",
					},
					firstName: "Cedric",
					lastName: "Apel",
					ldapDn:
						"uid=cedrica1,cn=schueler,cn=users,ou=100001,dc=training,dc=ucs",
					roles: ["student"],
					classNames: ["12/1"],
				},
				{
					_id: {
						$oid: "61b22f1ff2eef8a520c25640",
					},
					firstName: "Maditha",
					lastName: "Arndt",
					ldapDn:
						"uid=madithaa1,cn=schueler,cn=users,ou=100001,dc=training,dc=ucs",
					roles: ["student"],
					classNames: ["8c"],
				},
				{
					_id: {
						$oid: "61b22f1ff2eef8a520c25642",
					},
					firstName: "Leon",
					lastName: "Arnold",
					ldapDn:
						"uid=leona1,cn=schueler,cn=users,ou=100001,dc=training,dc=ucs",
					roles: ["student"],
					classNames: ["12/4"],
				},
				{
					_id: {
						$oid: "61b22f1ff2eef8a520c25644",
					},
					firstName: "Rahel",
					lastName: "Auer",
					ldapDn:
						"uid=rahela1,cn=schueler,cn=users,ou=100001,dc=training,dc=ucs",
					roles: ["student"],
					classNames: ["8b"],
				},
			],
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
			tableHead: [
				{
					text: "First Name",
					value: "firstName",
					sortable: true,
					align: "start",
          class: "head"
				},
				{ text: "Last Name", value: "lastName", sortable: true },
				{ text: "Account", value: "ldapDn" },
				{ text: "Roles", value: "roles", sortable: true },
				{ text: "Classes", value: "classNames", sortable: true },
				{ text: "Action", value: "match" },
			],
			defaultItem: {
				firstName: "",
				lastName: "",
				account: "",
				roles: [],
				classNames: [],
				match: {},
			},
			editedItem: {
				firstName: "",
				lastName: "",
				account: "",
				roles: [],
				classNames: [],
				match: {},
			},
			editedIndex: -1,
		};
	},
	computed: {
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
			handler() {
				this.getDataFromApi();
			},
			deep: true,
		},
		search() {
			this.getDataFromApi();
		},
	},
	methods: {
		getMatch(match) {
			if (!match || !match.userId) {
				return "";
			}
			console.log(match);
			// TODO fetch data about user
			const matchedUser = this.localUsersMock.find(
				(user) => user._id["$oid"] === match.userId["$oid"]
			);
			if (matchedUser) {
				return `${matchedUser.firstName} ${matchedUser.lastName}`;
			}
			return "";
		},
		getMatchedByIcon(match) {
			if (!match || !match.matchedBy) {
				return mdiAccountOffOutline;
			}
			console.log("getMatchedByIcon", match);
			if (match.matchedBy === "auto") {
				return mdiAccountArrowLeftOutline;
			}
			if (match.matchedBy === "admin") {
				return mdiAccountArrowRight;
			}
		},
		deleteItem(item) {
			console.log("deleteItem", item);
			this.editedIndex = this.importUsers.indexOf(item);
			this.editedItem = Object.assign({}, item);
			this.dialogDelete = true;
		},
		deleteItemConfirm() {
			// TODO persist in API
			console.log(this.importUsers[this.editedIndex]);
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
		getAccount(ldapDn) {
			const attributes = ldapDn.split(",");
			return attributes[0].replace("uid=", "");
		},
		getDataFromApi() {
			this.loading = true;

			console.log("filter", this.search);
			console.log("options", this.options);
			console.log("matchedBy", this.matchedBy);

			this.fakeApiCall().then((data) => {
				this.importUsers = data.items;
				this.totalImportUsers = data.total;
				this.loading = false;
			});
		},
		/**
		 * TODO call API instead
		 */
		fakeApiCall() {
			return new Promise((resolve) => {
				const { sortBy, sortDesc, page, itemsPerPage } = this.options;

				let items = this.importUsersMock;
				const total = items.length;

				if (sortBy.length === 1 && sortDesc.length === 1) {
					items = items.sort((a, b) => {
						const sortA = a[sortBy[0]];
						const sortB = b[sortBy[0]];

						if (sortDesc[0]) {
							if (sortA < sortB) return 1;
							if (sortA > sortB) return -1;
							return 0;
						} else {
							if (sortA < sortB) return -1;
							if (sortA > sortB) return 1;
							return 0;
						}
					});
				}

				if (itemsPerPage > 0) {
					items = items.slice((page - 1) * itemsPerPage, page * itemsPerPage);
				}

				setTimeout(() => {
					resolve({
						items,
						total,
					});
				}, 1000);
			});
		},
		getLocalUsersSelect() {
			const localUsers = this.localUsersMock.map((user) => {
				const obj = {
					value: user._id.$oid,
					name: `${user.firstName} ${user.lastName}`,
				};
				return obj;
			});
			console.log("getLocalUsersSelect", localUsers);
			return localUsers;
		},
	},
	head() {
		return {
			title: this.$t("pages.administration.migration.title"),
		};
	},
};
</script>
<style lang="scss">
@import "~vuetify/src/styles/styles.sass";
@import "@styles";
.theme--light.v-data-table > .v-data-table__wrapper > table > thead > tr:last-child > th {
  border-bottom: calc(2 * var(--border-width)) solid var(--color-secondary) ;
}
</style>
