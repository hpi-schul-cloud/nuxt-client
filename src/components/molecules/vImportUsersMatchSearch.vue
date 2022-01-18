<template>
	<v-card :ripple="false">
		<v-toolbar dark color="primary">
			<v-toolbar-title
				>Verknüpfe <strong>weBBschule-Konto</strong> von
				{{ editedItem.firstName }}
				{{ editedItem.lastName }} mit:</v-toolbar-title
			>
			<v-spacer></v-spacer>
			<v-toolbar-items>
				<v-btn v-if="isDialog" icon dark @click="closeEdit"
					><v-icon>{{ mdiClose }}</v-icon>
				</v-btn>
			</v-toolbar-items>
		</v-toolbar>
		<v-card-text>
			Suche in <strong>{{ this.$theme.short_name }}</strong>
			<base-link
				target="_blank"
				:href="
					editedItem.roleNames.includes('teacher')
						? '/administration/teachers'
						: '/administration/students'
				"
				>bestehendes Benutzerkonten</base-link
			>
			und klicke "Speichern", um das Zusammenführen der Benutzerkonten
			vorzubereiten.
		</v-card-text>
		<v-card-text>
			<v-autocomplete
				v-model="selectedItem"
				item-value="userId"
				:items="items"
				:label="`${this.$theme.short_name} Benutzerkonto suchen`"
				:loading="loading"
				:search-input.sync="searchUser"
				hide-no-data
				hide-selected
				:prepend-inner-icon="mdiAccountSearch"
				return-object
				clearable
				placeholder="Vornamen oder Nachnamen eingeben"
				hint="oder leer lassen, um ein neues Benutzerkonto zu erstellen."
				persistent-hint
				no-data-text="No data found"
				no-filter
			></v-autocomplete>
		</v-card-text>
		<v-expand-transition>
			<v-container>
				<v-divider></v-divider>
				<div v-if="selectedItem">
					Name: {{ selectedItem.firstName }} {{ selectedItem.lastName }}
					<br />
					Rolle: {{ selectedItem.roleNames.join(", ") }}
					<br />
					Nutzername: {{ selectedItem.loginName }}
					<v-divider></v-divider>
				</div>
				<div>
					<br />
					<p>Neuer Nutzername: {{ editedItem.loginName }}</p>
					<p>
						Markiere dieses Konto:
						<v-btn
							v-if="editedItem.flagged"
							v-model="editedItem.flagged"
							icon
							color="primary"
							class="ma-2"
						>
							<v-icon color="primary">{{ mdiFlag }}</v-icon>
						</v-btn>
						<v-btn v-else v-model="editedItem.flagged" icon class="ma-2">
							<v-icon>{{ mdiFlagOutline }}</v-icon>
						</v-btn>
					</p>
				</div>
			</v-container>
		</v-expand-transition>
		<v-card-actions>
			<v-col class="col-6">
				<v-btn text class="primary m-2" @click="saveMatch">
					<v-icon small>{{ mdiContentSave }}</v-icon> Speichern
				</v-btn>
				<v-btn v-if="isDialog" text class="m-2" @click="closeEdit"
					>Abbrechen</v-btn
				>
			</v-col>
			<v-col class="col-6 text-right">
				<v-btn text class="secondary m-2" @click="deleteMatch">
					<v-icon small>{{ mdiDelete }}</v-icon>
					Auswahl löschen
				</v-btn>
			</v-col>
		</v-card-actions>
	</v-card>
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
import BaseLink from "@basecomponents/BaseLink";
import ImportUserModule from "@store/import-users";

export default {
	components: { BaseLink },
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
		};
	},
	computed: {
		items() {
			return this.entries.map((user) => {
				user.text = `${user.firstName} ${user.lastName}`;
				return user;
			});
		},
	},

	watch: {
		async searchUser(val) {
			await this.getDataFromApi(val);
		},
		editedItem() {
			this.getInitMatch();
		},
	},
	created() {
		this.getDataFromApi("");
		this.getInitMatch();
	},
	methods: {
		getInitMatch() {
			if (this.editedItem.match) {
				console.log("initMatch", this.editedItem.match);
				const initMatch = {
					text: `${this.editedItem.match.firstName} ${this.editedItem.match.lastName}`,
					userId: this.editedItem.match.userId,
					firstName: this.editedItem.match.firstName,
					lastName: this.editedItem.match.firstName,
					loginName: this.editedItem.match.loginName,
					roleNames: [], //TODO,
				};
				this.selectedItem = initMatch;
				//return initMatch;
			}
		},
		async getDataFromApi(name) {
			this.loading = true;
			ImportUserModule.setUserSearch(name);
			ImportUserModule.fetchAllUsers().then(() => {
				this.count = ImportUserModule.getUserList.total;
				this.entries = ImportUserModule.getUserList.data;
				this.loading = false;
			});
		},
		closeEdit() {
			this.selectedItem = null;
			this.$emit("close");
		},
		async saveMatch() {
			if (this.selectedItem) {
				this.loading = true;
				await ImportUserModule.saveMatch({
					importUserId: this.editedItem.importUserId,
					userId: this.selectedItem.userId,
				});
				this.loading = false;
				this.$emit("savedMatch");
			}
		},
		deleteMatch() {
			// TODO
			/*
			this.editedIndex = this.importUsers.indexOf(item);
			this.editedItem = Object.assign({}, item);
			// TODO persist in API
			delete this.importUsers[this.editedIndex].match;
       */
			this.closeEdit();
		},
	},
};
</script>
