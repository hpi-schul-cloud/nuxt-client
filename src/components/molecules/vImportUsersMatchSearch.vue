<template>
	<div>
		<VCard :ripple="false">
			<VToolbar dark color="primary">
				<VToolbarTitle>
					{{
						$t("components.molecules.importUsersMatch.title", {
							instance: $theme.name,
							source: ldapSource,
						})
					}}
				</VToolbarTitle>
				<VToolbarItems>
					<VBtn
						v-if="isDialog"
						:aria-label="$t('common.labels.close')"
						:icon="mdiClose"
						@click="closeEdit"
					/>
				</VToolbarItems>
			</VToolbar>

			<VCardText class="mt-5">
				{{
					$t(
						isNbc
							? "components.molecules.importUsersMatch.subtitle.nbc"
							: "components.molecules.importUsersMatch.subtitle",
						{
							instance: $theme.name,
							source: ldapSource,
						}
					)
				}}
			</VCardText>
			<VCardText class="px-5">
				<VRow>
					<VCol class="md-6">
						<VCardTitle>{{ ldapSource }}</VCardTitle>
						<VListItem>
							<div data-testid="edited-item">
								<VListItemTitle data-testid="edited-item-fullname">
									{{ `${editedItem.firstName} ${editedItem.lastName}` }}
								</VListItemTitle>
								<VListItemSubtitle>
									{{ mapRoleNames(editedItem.roleNames) }}
								</VListItemSubtitle>
								<VListItemSubtitle
									v-if="editedItem.classNames && editedItem.classNames.length"
								>
									{{
										`${$t(
											"components.organisms.importUsers.tableClasses"
										)}: ${editedItem.classNames.join(", ")}`
									}}
								</VListItemSubtitle>
								<VListItemSubtitle
									v-if="!isNbc"
									data-testid="edited-item-username"
									>{{
										`${$t("components.organisms.importUsers.tableUserName")}: ${
											editedItem.loginName
										}`
									}}
								</VListItemSubtitle>
							</div>
						</VListItem>
					</VCol>
					<VCol class="md-6">
						<VCardTitle>{{ $theme.name }}</VCardTitle>
						<VListItem>
							<div v-if="selectedItem">
								<VListItemTitle>
									{{ `${selectedItem.firstName} ${selectedItem.lastName}` }}
								</VListItemTitle>
								<VListItemSubtitle>
									{{ mapRoleNames(selectedItem.roleNames) }}
								</VListItemSubtitle>
								<VListItemSubtitle v-if="!isNbc">
									{{
										`${$t("components.organisms.importUsers.tableUserName")}: ${
											selectedItem.loginName
										}`
									}}
								</VListItemSubtitle>
							</div>
							<div v-else-if="editedItem.match">
								<VListItemTitle>
									{{
										`${editedItem.match.firstName} ${editedItem.match.lastName}`
									}}
								</VListItemTitle>
								<VListItemSubtitle>
									{{ mapRoleNames(editedItem.match.roleNames) }}
								</VListItemSubtitle>
								<VListItemSubtitle v-if="!isNbc">
									{{
										`${$t("components.organisms.importUsers.tableUserName")}: ${
											editedItem.match.loginName
										}`
									}}
								</VListItemSubtitle>
							</div>
							<div v-else>
								<template v-if="!isNbc">
									{{ $t("components.molecules.importUsersMatch.unMatched") }}
								</template>
								<template v-else>
									{{
										$t("components.molecules.importUsersMatch.unMatched.nbc")
									}}
								</template>
							</div>
						</VListItem>
						<VAutocomplete
							v-model="selectedItem"
							class="px-4 mt-2"
							item-value="userId"
							item-title="text"
							:items="items"
							:loading="loading"
							v-model:search="searchUser"
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
							variant="solo"
							rounded
						>
							<template #item="{ item, props }">
								<VListItem style="max-width: 450px" v-bind="props">
									<VListItemSubtitle>
										{{ mapRoleNames(item.raw.roleNames) }}
									</VListItemSubtitle>
									<VListItemSubtitle v-if="!isNbc">
										{{
											`${$t(
												"components.organisms.importUsers.tableUserName"
											)}: ${item.raw.loginName}`
										}}
									</VListItemSubtitle>
								</VListItem>
							</template>
							<template #append-item>
								<div v-intersect="endIntersect" class="pa-2" />
							</template>
						</VAutocomplete>
					</VCol>
				</VRow>
			</VCardText>
			<VCardActions class="px-4">
				<VCol class="col-6 pa-0"
					>{{ $t("components.molecules.importUsersMatch.flag") }}
					<VBtn
						v-model="flagged"
						icon
						:color="flagged ? 'primary' : ''"
						class="ma-2"
						data-testid="flag-button"
						@click="saveFlag"
					>
						<VIcon color="primary">
							{{ flagged ? mdiFlag : mdiFlagOutline }}
						</VIcon>
					</VBtn>
				</VCol>
				<VCol class="col-6 text-right pa-0">
					<VBtn
						variant="text"
						:class="canSave ? 'primary' : ''"
						class="m-2"
						:disabled="!canSave"
						data-testid="save-match-btn"
						@click="saveMatch"
					>
						<VIcon size="small">{{ mdiContentSave }}</VIcon>
						{{ $t("components.molecules.importUsersMatch.saveMatch") }}
					</VBtn>
					<VBtn
						variant="text"
						:class="canDelete ? 'secondary' : ''"
						class="m-2"
						:disabled="!canDelete"
						data-testid="delete-match-btn"
						@click="deleteMatch"
					>
						<VIcon size="small">{{ mdiDelete }}</VIcon>
						{{ $t("components.molecules.importUsersMatch.deleteMatch") }}
					</VBtn>
				</VCol>
			</VCardActions>
		</VCard>
	</div>
</template>
<script>
import {
	mdiAccountSearch,
	mdiClose,
	mdiContentSave,
	mdiDelete,
	mdiFlag,
	mdiFlagOutline,
} from "@mdi/js";
import { importUsersModule } from "@/store";

export default {
	components: {},
	props: {
		isDialog: {
			type: Boolean,
		},
		ldapSource: {
			type: String,
			required: true,
		},
		editedItem: {
			type: Object,
			default: () => ({
				firstName: "",
				lastName: "",
				loginName: "",
				roleNames: [],
				classNames: [],
				match: {},
				flagged: false,
			}),
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
				default: [],
			},
			match: {
				type: Object,
			},
			flagged: {
				type: Boolean,
			},
		},
		isNbc: {
			type: Boolean,
			default: false,
		},
	},
	data() {
		return {
			mdiAccountSearch,
			mdiClose,
			mdiContentSave,
			mdiDelete,
			mdiFlag,
			mdiFlagOutline,
			entries: [],
			loading: false,
			flagged: false,
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
		this.flagged = this.editedItem.flagged;
		this.getDataFromApi();
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
			importUsersModule.setUsersLimit(this.limit);
			importUsersModule.setUsersSkip(this.skip);
			if (this.searchUser !== importUsersModule.getUserSearch) {
				this.entries = [];
				importUsersModule.setUserSearch(this.searchUser);
			}
			importUsersModule.fetchAllUsers().then(() => {
				this.total = importUsersModule.getUserList.total;

				this.entries = [...this.entries, ...importUsersModule.getUserList.data];
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
			const importUser = await importUsersModule.saveMatch({
				importUserId: this.editedItem.importUserId,
				userId: this.selectedItem.userId,
			});
			if (
				!importUsersModule.getBusinessError &&
				importUser.match &&
				importUser.match.userId === this.selectedItem.userId
			) {
				this.$emit("saved-match");
				this.closeEdit();
			}
		},
		async deleteMatch() {
			if (!this.editedItem.match || !this.editedItem.match.userId) {
				return false;
			}
			const importUser = await importUsersModule.deleteMatch(
				this.editedItem.importUserId
			);
			if (
				!importUsersModule.getBusinessError &&
				importUser.match === undefined
			) {
				this.$emit("deleted-match");
				this.closeEdit();
			}
		},
		async saveFlag() {
			const importUser = await importUsersModule.saveFlag({
				importUserId: this.editedItem.importUserId,
				flagged: !this.flagged,
			});
			if (
				!importUsersModule.getBusinessError &&
				importUser.flagged === !this.flagged
			) {
				this.flagged = !this.flagged;
				this.$emit("saved-flag");
			}
		},
		mapRoleNames(roleNames) {
			if (!roleNames) {
				return "";
			}
			return roleNames
				.map((role) => {
					switch (role) {
						case "student":
							return this.$t("common.roleName.student");
						case "teacher":
							return this.$t("common.roleName.teacher");
						case "admin":
							return this.$t("common.roleName.administrator");
						case "expert":
							return this.$t("common.roleName.expert");
						case "superhero":
							return this.$t("common.roleName.superhero");
						default:
							return role;
					}
				})
				.join(", ");
		},
	},
};
</script>
<style scoped>
.v-dialog--active {
	overflow-y: hidden !important;
}
</style>
