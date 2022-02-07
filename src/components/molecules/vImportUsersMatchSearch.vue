<template>
	<div>
		<v-card :ripple="false" min-height="550px">
			<v-toolbar dark color="primary">
				<v-toolbar-title>
					{{
						$t("components.molecules.importUsersMatch.title", {
							instance: this.$theme.short_name,
							source: $t("pages.administration.migration.ldapSource"),
						})
					}}
				</v-toolbar-title>
				<v-spacer></v-spacer>
				<v-toolbar-items>
					<v-btn v-if="isDialog" icon dark @click="closeEdit">
						<v-icon>{{ mdiClose }}</v-icon>
					</v-btn>
				</v-toolbar-items>
			</v-toolbar>

			<v-card-text class="mt-5">
				{{
					$t("components.molecules.importUsersMatch.subtitle", {
						instance: this.$theme.short_name,
						source: $t("pages.administration.migration.ldapSource"),
					})
				}}
			</v-card-text>
			<v-card-text>
				<v-row>
					<v-col class="md-6">
						<v-card-title>{{
							$t("pages.administration.migration.ldapSource")
						}}</v-card-title>
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
									>{{ $t("components.organisms.importUsers.tableClasses") }}:
									{{ editedItem.classNames.join(", ") }}</v-list-item-subtitle
								>
								<v-list-item-subtitle
									>{{ $t("components.organisms.importUsers.tableUserName") }}:
									{{ editedItem.loginName }}</v-list-item-subtitle
								>
							</v-list-item-content>
							<v-list-item-content> </v-list-item-content>
						</v-list-item>
					</v-col>
					<v-col class="md-6">
						<v-card-title>{{ this.$theme.short_name }}</v-card-title>
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
									{{ $t("components.organisms.importUsers.tableUserName") }}:
									{{ selectedItem.loginName }}
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
									{{ $t("components.organisms.importUsers.tableUserName") }}:
									{{ editedItem.match.loginName }}
								</v-list-item-subtitle>
							</v-list-item-content>
							<v-list-item-content v-else>{{
								$t("components.molecules.importUsersMatch.unMatched")
							}}</v-list-item-content>
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
							:label="$t('components.molecules.importUsersMatch.search')"
							:placeholder="$t('components.molecules.importUsersMatch.write')"
							persistent-hint
							:no-data-text="
								$t('components.molecules.importUsersMatch.notFound')
							"
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
										{{ $t("components.organisms.importUsers.tableUserName") }}:
										{{ item.loginName }}
									</v-list-item-subtitle>
								</v-list-item-content>
							</template>
							<template v-slot:append-item>
								<div v-intersect="endIntersect" class="pa-2"></div>
							</template>
						</v-autocomplete>
					</v-col>
				</v-row>
			</v-card-text>
			<v-card-actions>
				<v-col class="col-6">
					{{ $t("components.molecules.importUsersMatch.flag") }}
					<v-btn
						v-if="editedItem.flagged"
						v-model="editedItem.flagged"
						icon
						color="primary"
						class="ma-2"
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
						{{ $t("components.molecules.importUsersMatch.saveMatch") }}
					</v-btn>
					<v-btn
						text
						:class="canDelete ? 'secondary' : ''"
						class="m-2"
						:disabled="!canDelete"
						@click="deleteMatch"
					>
						<v-icon small>{{ mdiDelete }}</v-icon>
						{{ $t("components.molecules.importUsersMatch.deleteMatch") }}
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
import ImportUsersModule from "@store/import-users";

export default {
	components: {},
	props: {
		isDialog: {
			type: Boolean,
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
			total: 0,
			limit: 10,
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
			this.skip = 0;
			await this.getDataFromApi();
		},
	},
	created() {
		this.getDataFromApi("");
	},
	methods: {
		async endIntersect(entries, observer, isIntersecting) {
			if (isIntersecting) {
				if (this.total > this.items.length) {
					this.skip += this.limit;
					await this.getDataFromApi();
				}
			}
		},
		async getDataFromApi() {
			this.loading = true;
			ImportUsersModule.setUsersLimit(this.limit);
			ImportUsersModule.setUsersSkip(this.skip);
			if (this.searchUser !== ImportUsersModule.getUserSearch) {
				this.entries = [];
				ImportUsersModule.setUserSearch(this.searchUser);
			}
			ImportUsersModule.fetchAllUsers().then(() => {
				this.total = ImportUsersModule.getUserList.total;

				this.entries = [...this.entries, ...ImportUsersModule.getUserList.data];
				this.loading = false;
			});
		},
		closeEdit() {
			this.selectedItem = null;
			this.$emit("close");
		},
		async saveMatch() {
			if (!this.selectedItem) {
				return false;
			}
			await ImportUsersModule.saveMatch({
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
			await ImportUsersModule.deleteMatch(this.editedItem.importUserId);
			this.$emit("deletedMatch");
			this.closeEdit();
		},
		async saveFlag() {
			const importUser = await ImportUsersModule.saveFlag({
				importUserId: this.editedItem.importUserId,
				flagged: !this.editedItem.flagged,
			});
			this.editedItem.flagged = importUser.flagged;
			this.$emit("savedFlag");
		},
	},
};
</script>
