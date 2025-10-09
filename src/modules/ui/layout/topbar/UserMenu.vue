<template>
	<VMenu :width="isExternalLogoutAllowed ? 'auto' : '215'">
		<template #activator="{ props: menuProps }">
			<VBtn
				v-bind="menuProps"
				v-bind.attr="$attrs"
				icon
				data-testid="user-menu-btn"
				class="bg-surface-variant"
				size="small"
				@click="onMenuBtnClicked"
			>
				<span class="text-h4">{{ initials }}</span>
			</VBtn>
		</template>
		<VList>
			<VListItem data-testid="active-user"> {{ user.firstName }} {{ user.lastName }} ({{ userRole }}) </VListItem>
			<VDivider />
			<LanguageMenu />
			<VListItem href="/account" data-testid="account-link">
				{{ $t("global.topbar.settings") }}
			</VListItem>
			<VListItem
				v-if="isExternalLogoutAllowed"
				data-testid="external-logout"
				:disabled="isSessionTokenExpired"
				@click="externalLogout"
			>
				{{ $t("common.labels.logout") }}{{ isExternalLogoutAllowed ? ` Bildungscloud & ${systemName}` : "" }}
			</VListItem>
			<VListItem data-testid="logout" @click="logout">
				{{ $t("common.labels.logout") }}{{ isExternalLogoutAllowed ? " Bildungscloud" : "" }}
			</VListItem>
		</VList>
	</VMenu>
</template>

<script setup lang="ts">
import LanguageMenu from "./LanguageMenu.vue";
import { MeUserResponse } from "@/serverApi/v3";
import { useAppStore, useAppStoreRefs } from "@data-app";
import { useEnvConfig } from "@data-env";
import { useOAuthApi } from "@data-oauth";
import { System, useSystemApi } from "@data-system";
import { computed, onMounted, PropType, Ref, ref, toRef } from "vue";
import { useI18n } from "vue-i18n";

const props = defineProps({
	user: {
		type: Object as PropType<MeUserResponse>,
		required: true,
	},
	roleNames: {
		type: Array as PropType<string[]>,
		required: true,
	},
});

const { systemId } = useAppStoreRefs();

const { t } = useI18n();
const { getSystem } = useSystemApi();
const { getSessionTokenExpiration } = useOAuthApi();

const userRole = computed(() => t(`common.roleName.${toRef(props.roleNames).value[0]}`).toString());

const initials = computed(() => props.user.firstName.slice(0, 1) + props.user.lastName.slice(0, 1));

const system: Ref<System | undefined> = ref();

const isExternalLogoutAllowed = computed(
	() =>
		useEnvConfig().value.FEATURE_EXTERNAL_SYSTEM_LOGOUT_ENABLED &&
		!!systemId.value &&
		!!system.value?.hasEndSessionEndpoint
);

const systemName = computed(() => system.value?.displayName ?? "");

const now = ref(new Date());

const sessionTokenExpiration: Ref<Date | undefined> = ref();

const isSessionTokenExpired = computed(
	() => !sessionTokenExpiration.value || now.value >= sessionTokenExpiration.value
);

onMounted(async () => {
	if (systemId.value) {
		system.value = await getSystem(systemId.value);
	}
	if (isExternalLogoutAllowed.value) {
		sessionTokenExpiration.value = await getSessionTokenExpiration();
	}
});

const onMenuBtnClicked = () => {
	now.value = new Date();
};

const logout = () => {
	useAppStore().logout();
};

const externalLogout = () => {
	useAppStore().externalLogout();
};
</script>

<style scoped>
:deep(.v-list-group__items .v-list-item) {
	padding-inline-start: 16px !important;
}
</style>
