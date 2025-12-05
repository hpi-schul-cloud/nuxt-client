<template>
	<div>
		<VCard :ripple="false">
			<VToolbar dark color="primary">
				<VToolbarTitle>
					{{
						$t("components.molecules.importUsersMatch.title", {
							instance: theme.name,
							source: ldapSource,
						})
					}}
				</VToolbarTitle>
				<VToolbarItems>
					<VBtn v-if="isDialog" :aria-label="$t('common.labels.close')" :icon="mdiClose" @click="closeEdit" />
				</VToolbarItems>
			</VToolbar>

			<VCardText class="mt-5">
				{{
					$t(
						isNbc
							? "components.molecules.importUsersMatch.subtitle.nbc"
							: "components.molecules.importUsersMatch.subtitle",
						{
							instance: theme.name,
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
									{{ isNbc ? externalRoleText : "" }}
								</VListItemSubtitle>
								<VListItemSubtitle v-if="editedItem.classNames && editedItem.classNames.length">
									{{ `${$t("components.organisms.importUsers.tableClasses")}: ${editedItem.classNames.join(", ")}` }}
								</VListItemSubtitle>
								<VListItemSubtitle v-if="!isNbc" data-testid="edited-item-username"
									>{{ `${$t("components.organisms.importUsers.tableUserName")}: ${editedItem.loginName}` }}
								</VListItemSubtitle>
							</div>
						</VListItem>
					</VCol>
					<VCol class="md-6">
						<VCardTitle>{{ theme.name }}</VCardTitle>
						<VListItem>
							<div v-if="selectedItem">
								<VListItemTitle>
									{{ `${selectedItem.firstName} ${selectedItem.lastName}` }}
								</VListItemTitle>
								<VListItemSubtitle>
									{{ mapRoleNames(selectedItem.roleNames) }}
								</VListItemSubtitle>
								<VListItemSubtitle v-if="!isNbc">
									{{ `${$t("components.organisms.importUsers.tableUserName")}: ${selectedItem.loginName}` }}
								</VListItemSubtitle>
							</div>
							<div v-else-if="editedItem.match">
								<VListItemTitle>
									{{ `${editedItem.match.firstName} ${editedItem.match.lastName}` }}
								</VListItemTitle>
								<VListItemSubtitle>
									{{ mapRoleNames(editedItem.match.roleNames) }}
								</VListItemSubtitle>
								<VListItemSubtitle v-if="!isNbc">
									{{ `${$t("components.organisms.importUsers.tableUserName")}: ${editedItem.match.loginName}` }}
								</VListItemSubtitle>
							</div>
							<div v-else>
								<template v-if="!isNbc">
									{{ $t("components.molecules.importUsersMatch.unMatched") }}
								</template>
								<template v-else>
									{{ $t("components.molecules.importUsersMatch.unMatched.nbc") }}
								</template>
							</div>
						</VListItem>
						<VAutocomplete
							v-model="selectedItem"
							v-model:search="searchUser"
							class="px-4 mt-2"
							item-value="userId"
							:item-title="(user) => `${user.firstName} ${user.lastName}`"
							:items="entries"
							:loading="loading"
							hide-no-data
							hide-selected
							:prepend-inner-icon="mdiAccountSearch"
							return-object
							clearable
							:label="$t('components.molecules.importUsersMatch.search')"
							:placeholder="$t('components.molecules.importUsersMatch.write')"
							persistent-hint
							:no-data-text="$t('components.molecules.importUsersMatch.notFound')"
							no-filter
							variant="solo"
							rounded
						>
							<template #item="{ item, props: itemProps }">
								<VListItem style="max-width: 450px" v-bind="itemProps">
									<VListItemSubtitle>
										{{ mapRoleNames(item.raw.roleNames) }}
									</VListItemSubtitle>
									<VListItemSubtitle v-if="!isNbc">
										{{ `${$t("components.organisms.importUsers.tableUserName")}: ${item.raw.loginName}` }}
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
					<VBtn variant="text" class="m-2" :disabled="!canDelete" data-testid="delete-match-btn" @click="deleteMatch">
						<VIcon size="small">{{ mdiDelete }}</VIcon>
						{{ $t("components.molecules.importUsersMatch.deleteMatch") }}
					</VBtn>
				</VCol>
			</VCardActions>
		</VCard>
	</div>
</template>

<script setup lang="ts">
import { ImportUserResponse, UserMatchResponse } from "@/serverApi/v3";
import { importUsersModule } from "@/store";
import { injectStrict, THEME_KEY } from "@/utils/inject";
import { mdiAccountSearch, mdiClose, mdiContentSave, mdiDelete, mdiFlag, mdiFlagOutline } from "@icons/material";
import { useDebounceFn } from "@vueuse/core";
import { computed, ComputedRef, onMounted, PropType, Ref, ref, watch } from "vue";
import { useI18n } from "vue-i18n";

const props = defineProps({
	isDialog: {
		type: Boolean,
	},
	ldapSource: {
		type: String,
		required: true,
	},
	editedItem: {
		type: Object as PropType<ImportUserResponse>,
		default: () => ({
			firstName: "",
			lastName: "",
			loginName: "",
			roleNames: [],
			classNames: [],
			match: {},
			flagged: false,
			externalRoleNames: [],
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
});

const emit = defineEmits<{
	(e: "close"): void;
	(e: "saved-match"): void;
	(e: "saved-flag"): void;
	(e: "deleted-match"): void;
}>();

const { t } = useI18n();

const theme = injectStrict(THEME_KEY);

const entries: Ref<UserMatchResponse[]> = ref([]);
const loading: Ref<boolean> = ref(false);
const flagged = ref(false);
const searchUser: Ref<string> = ref("");
const selectedItem: Ref<UserMatchResponse | null> = ref(null);
const total: Ref<number> = ref(0);
const limit: Ref<number> = ref(10);
const skip: Ref<number> = ref(0);

const schulconnexExternalRoleNamesMapping: Record<string, string> = {
	Lehr: t("components.molecules.importUsersMatch.externalRoleName.schulconnex.teacher"),
	Lern: t("components.molecules.importUsersMatch.externalRoleName.schulconnex.student"),
	Leit: t("components.molecules.importUsersMatch.externalRoleName.schulconnex.manager"),
	OrgAdmin: t("components.molecules.importUsersMatch.externalRoleName.schulconnex.orgAdmin"),
};

const canSave: ComputedRef<boolean> = computed(() => {
	if (selectedItem.value === null) {
		return false;
	}

	if (props.editedItem.match && props.editedItem.match.userId === selectedItem.value?.userId) {
		return false;
	}

	return true;
});

const canDelete: ComputedRef<boolean | undefined> = computed(
	() => props.editedItem.match && selectedItem.value === null
);

const externalRoleText: ComputedRef<string> = computed(() => {
	let role = t("components.molecules.importUsersMatch.externalRoleName.none");
	if (props.editedItem.externalRoleNames?.length) {
		role = mapExternalRoleNames(props.editedItem.externalRoleNames);
	}

	const text = `(${t("common.labels.role")} ${props.ldapSource}: ${role})`;
	return text;
});

const getDataFromApi = async (append = false) => {
	loading.value = true;

	importUsersModule.setUsersLimit(limit.value);
	importUsersModule.setUsersSkip(skip.value);
	importUsersModule.setUserSearch(searchUser.value);

	await importUsersModule.fetchAllUsers();

	total.value = importUsersModule.getUserList.total;

	if (append) {
		entries.value.push(...importUsersModule.getUserList.data);
	} else {
		entries.value = importUsersModule.getUserList.data;
	}

	loading.value = false;
};

const getDataFromApiThrottled = useDebounceFn(() => getDataFromApi(), 1000, {
	maxWait: 1000,
});

watch(searchUser, (newValue: string, oldValue: string) => {
	if (newValue !== oldValue) {
		skip.value = 0;

		getDataFromApiThrottled();
	}
});

const endIntersect = async (isIntersecting: boolean) => {
	if (isIntersecting && total.value > entries.value.length) {
		skip.value += limit.value;

		await getDataFromApi(true);
	}
};

const closeEdit = () => {
	selectedItem.value = null;
	emit("close");
};

const saveMatch = async () => {
	if (!selectedItem.value) {
		return false;
	}
	const importUser = await importUsersModule.saveMatch({
		importUserId: props.editedItem.importUserId,
		userId: selectedItem.value.userId,
	});
	if (
		!importUsersModule.getBusinessError &&
		importUser?.match &&
		importUser.match.userId === selectedItem.value.userId
	) {
		emit("saved-match");
		closeEdit();
	}
};

const deleteMatch = async () => {
	if (!props.editedItem.match || !props.editedItem.match.userId) {
		return false;
	}
	const importUser = await importUsersModule.deleteMatch(props.editedItem.importUserId);
	if (!importUsersModule.getBusinessError && importUser?.match === undefined) {
		emit("deleted-match");
		closeEdit();
	}
};

const saveFlag = async () => {
	const importUser = await importUsersModule.saveFlag({
		importUserId: props.editedItem.importUserId,
		flagged: !flagged.value,
	});

	if (!importUsersModule.getBusinessError && importUser?.flagged === !flagged.value) {
		flagged.value = !flagged.value;
		emit("saved-flag");
	}
};

const mapRoleNames = (roleNames: unknown[]) => {
	if (!roleNames) {
		return "";
	}
	return roleNames
		.map((role) => {
			switch (role) {
				case "student":
					return t("common.roleName.student");
				case "teacher":
					return t("common.roleName.teacher");
				case "admin":
					return t("common.roleName.administrator");
				case "expert":
					return t("common.roleName.expert");
				case "superhero":
					return t("common.roleName.superhero");
				default:
					return role;
			}
		})
		.join(", ");
};

const mapExternalRoleNames = (externalRoleNames: string[]) =>
	externalRoleNames
		.map((role) => {
			if (props.isNbc) {
				const userFriendlyRoleName = schulconnexExternalRoleNamesMapping[role];
				if (!userFriendlyRoleName) {
					return role;
				}
				return userFriendlyRoleName;
			}
			return role;
		})
		.join(", ");

onMounted(async () => {
	flagged.value = props.editedItem.flagged;

	await getDataFromApi();
});
</script>

<style scoped>
.v-dialog--active {
	overflow-y: hidden !important;
}
</style>
