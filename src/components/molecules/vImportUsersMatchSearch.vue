<template>
	<div>
		<v-card :ripple="false" min-height="550px">
			<v-toolbar dark color="primary">
				<v-toolbar-title>
					Verknüpfe <strong>weBBschule-Konto</strong> mit
					{{ this.$theme.short_name }} Konto
				</v-toolbar-title>
				<v-spacer></v-spacer>
				<v-toolbar-items>
					<v-btn v-if="isDialog" icon dark @click="closeEdit">
						<v-icon>{{ mdiClose }}</v-icon>
					</v-btn>
				</v-toolbar-items>
			</v-toolbar>

			<v-card-text class="mt-5">
				Das webbschule-Konto wird später in die
				{{ this.$theme.short_name }} importiert. Wenn Sie das Konto mit einem
				bestehenden {{ this.$theme.short_name }} Konto verknüpfen möchten, so
				dass die Benutzerdaten erhalten bleiben, wählen Sie hier das
				{{ this.$theme.short_name }} Konto aus. Andernfalls wird dieses als
				neues Konto angeleg.
			</v-card-text>
			<v-card-text>
				<v-row>
					<v-col class="md-6">
						<v-card-title>weBBSchule Konto</v-card-title>
						<v-list-item>
							<v-list-item-content>
								<v-list-item-title
									>{{ editedItem.firstName }}
									{{ editedItem.lastName }}</v-list-item-title
								>
								<v-list-item-subtitle>
									{{ editedItem.roleNames.join(", ") }}</v-list-item-subtitle
								>
								<v-list-item-subtitle
									>Klasse:
									{{ editedItem.classNames.join(", ") }}</v-list-item-subtitle
								>
								<v-list-item-subtitle
									>Nutzername: {{ editedItem.loginName }}</v-list-item-subtitle
								>
							</v-list-item-content>
							<v-list-item-content> </v-list-item-content>
						</v-list-item>
					</v-col>
					<v-col class="md-6">
						<v-card-title>{{ this.$theme.short_name }} Konto</v-card-title>
						<v-list-item>
							<v-list-item-content v-if="selectedItem">
								<v-list-item-title>
									{{ selectedItem.firstName }} {{ selectedItem.lastName }}
								</v-list-item-title>
								<v-list-item-subtitle>
									{{
										selectedItem.roleNames
											? selectedItem.roleNames.join(", ")
											: ""
									}}
								</v-list-item-subtitle>
								<v-list-item-subtitle>
									Nutzername: {{ selectedItem.loginName }}
								</v-list-item-subtitle>
							</v-list-item-content>
							<v-list-item-content v-else-if="editedItem.match">
								<v-list-item-title>
									{{ editedItem.match.firstName }}
									{{ editedItem.match.lastName }}
								</v-list-item-title>
								<v-list-item-subtitle>
									{{
										editedItem.match.roleNames
											? editedItem.match.roleNames.join(", ")
											: ""
									}}
								</v-list-item-subtitle>
								<v-list-item-subtitle>
									Nutzername: {{ editedItem.match.loginName }}
								</v-list-item-subtitle>
							</v-list-item-content>
							<v-list-item-content v-else
								>keine. Benuter wird neu erstellt.</v-list-item-content
							>
						</v-list-item>
						<v-autocomplete
							v-model="selectedItem"
							item-value="userId"
							:items="items"
							:loading="loading"
							:search-input.sync="searchUser"
							hide-no-data
							hide-selected
							:prepend-inner-icon="mdiAccountSearch"
							return-object
							clearable
							label="Benutzerkonto suchen"
							placeholder="Vornamen oder Nachnamen eingeben"
							persistent-hint
							no-data-text="keine Konten gefunden"
							no-filter
							solo
							rounded
							small-chips
						>
							<template v-slot:selection="{ attr, on, item, selected }">
								<v-chip
									v-bind="attr"
									:input-value="selected"
									color="blue-grey"
									class="white--text"
									v-on="on"
								>
									<span>{{ item.firstName }} {{ item.lastName }}</span>
								</v-chip>
							</template>
							<template v-slot:item="{ item }">
								<v-list-item-content max-width="450px">
									<v-list-item-title>
										{{ item.firstName }} {{ item.lastName }}
									</v-list-item-title>
									<v-list-item-subtitle>
										{{ item.roleNames ? item.roleNames.join(", ") : "" }}
									</v-list-item-subtitle>
									<v-list-item-subtitle>
										Nutzername: {{ item.loginName }}
									</v-list-item-subtitle>
								</v-list-item-content>
							</template>
							<template v-slot:append-item>
								<div v-intersect="endIntersect" class="pa-2">mehr...</div>
							</template>
						</v-autocomplete>
					</v-col>
				</v-row>
			</v-card-text>
			<v-card-actions>
				<v-col class="col-6">
					Konto markieren
					<v-btn
						v-if="editedItem.flagged"
						v-model="editedItem.flagged"
						icon
						color="primary"
						class="ma-2"
						aria-label="Markieren"
						aria-labelledby="xxx"
						@click="saveFlag"
					>
						<v-icon color="primary">{{ mdiFlag }}</v-icon>
					</v-btn>
					<v-btn
						v-else
						v-model="editedItem.flagged"
						icon
						class="ma-2"
						@click="saveFlag"
					>
						<v-icon>{{ mdiFlagOutline }}</v-icon>
					</v-btn>
				</v-col>
				<v-col class="col-6 text-right">
					<v-btn
						text
						:class="canSave ? 'primary' : ''"
						class="m-2"
						:disabled="!canSave"
						@click="saveMatch"
					>
						<v-icon small>{{ mdiContentSave }}</v-icon>
						Verknüpfung Speichern
					</v-btn>
					<v-btn
						text
						:class="canDelete ? 'secondary' : ''"
						class="m-2"
						:disabled="!canDelete"
						@click="deleteMatch"
					>
						<v-icon small>{{ mdiDelete }}</v-icon>
						Verknüpfung löschen
					</v-btn>
				</v-col>
			</v-card-actions>
		</v-card>
	</div>
</template>
<script>
import {
	mdiAccountPlus,
	mdiAccountSearch,
	mdiAccountSwitch,
	mdiAccountSwitchOutline,
	mdiClose,
	mdiContentSave,
	mdiDelete,
	mdiFlag,
	mdiFlagOutline,
} from "@mdi/js";
import ImportUserModule from "@store/import-users";

export default {
	components: {},
	props: {
		isDialog: {
			type: Boolean,
		},
		editedIndex: {
			type: Number,
			required: true,
		},
		editedItem: {
			type: Object,

			firstName: {
				type: String,
			},
			lastName: {
				type: String,
			},
			loginName: {
				type: String,
			},
			roleNames: {
				type: Array,
			},
			classNames: {
				type: Array,
			},
			match: {
				type: Object,
			},
			flagged: {
				type: Boolean,
			},
		},
	},
	data() {
		return {
			mdiAccountPlus,
			mdiAccountSearch,
			mdiAccountSwitch,
			mdiAccountSwitchOutline,
			mdiClose,
			mdiContentSave,
			mdiDelete,
			mdiFlag,
			mdiFlagOutline,
			localUser: {
				userId: "",
				firstName: "",
				lastName: "",
				login: "",
				email: "",
				classes: [],
				roles: [],
			},
			entries: [],
			loading: false,
			searchUser: null,
			selectedItem: null,
			total: 5, // TODO 0
			limit: 2, // TODO 25
			skip: 0,
		};
	},
	computed: {
		items() {
			return this.entries.map((user) => {
				user.text = `${user.firstName} ${user.lastName}`;
				return user;
			});
		},
		canSave() {
			if (this.selectedItem === null) {
				return false;
			}
			if (
				this.editedItem.match &&
				this.editedItem.match.userId === this.selectedItem.userId
			) {
				return false;
			}
			return true;
		},
		canDelete() {
			return this.editedItem.match && this.selectedItem === null;
		},
	},
	watch: {
		async searchUser() {
			await this.getDataFromApi();
		},
	},
	created() {
		this.getDataFromApi("");
	},
	methods: {
		async endIntersect(entries, observer, isIntersecting) {
			if (isIntersecting) {
				this.skip += this.limit;
				await this.getDataFromApi();
			}
		},
		async getDataFromApi() {
			this.loading = true;
			ImportUserModule.setUsersLimit(this.limit);
			ImportUserModule.setUsersSkip(this.skip);
			if (this.searchUser !== ImportUserModule.getUserSearch) {
				this.entries = [];
				ImportUserModule.setUserSearch(this.searchUser);
			}
			ImportUserModule.fetchAllUsers().then(() => {
				this.total = ImportUserModule.getUserList.total;

				this.entries = [...this.entries, ...ImportUserModule.getUserList.data];
				this.loading = false;
			});
		},
		closeEdit() {
			this.selectedItem = null;
			this.$emit("close");
		},
		async saveMatch() {
			if (!this.selectedItem) {
				// TODO set error?
				return false;
			}
			await ImportUserModule.saveMatch({
				importUserId: this.editedItem.importUserId,
				userId: this.selectedItem.userId,
			});
			this.$emit("savedMatch");
			this.closeEdit();
		},
		async deleteMatch() {
			if (!this.editedItem.match) {
				return false;
			}
			await ImportUserModule.deleteMatch(this.editedItem.importUserId);
			this.$emit("deletedMatch");
			this.closeEdit();
		},
		async saveFlag() {
			await ImportUserModule.saveFlag({
				importUserId: this.editedItem.importUserId,
				flagged: !this.editedItem.flagged,
			});
			this.editedItem.flagged = !this.editedItem.flagged;
		},
	},
};
</script>
