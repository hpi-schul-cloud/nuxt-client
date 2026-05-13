<template>
	<VMenu :width="isExternalLogoutAllowed ? 'auto' : '215'">
		<template #activator="{ props: menuProps }">
			<VBtn
				v-bind="{ ...menuProps, ...safariAriaOwnsWorkaround }"
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
import { MeUserResponse } from "@api-server";
import { useSystem } from "@data-access";
import { useAppStore, useAppStoreRefs } from "@data-app";
import { useEnvConfig } from "@data-env";
import { safariAriaOwnsWorkaround } from "@util-device-detection";
import { computed, PropType, ref, toRef } from "vue";
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
const { systemName, sessionTokenExpiration } = useSystem(systemId);

const userRole = computed(() => t(`common.roleName.${toRef(props.roleNames).value[0]}`).toString());

const initials = computed(() => props.user.firstName.slice(0, 1) + props.user.lastName.slice(0, 1));

const isExternalLogoutAllowed = computed(
	() => useEnvConfig().value.FEATURE_EXTERNAL_SYSTEM_LOGOUT_ENABLED && !!isSessionTokenExpired.value
);

const isSessionTokenExpired = ref(false);

const onMenuBtnClicked = () => {
	const now = new Date();
	isSessionTokenExpired.value = !sessionTokenExpiration.value || now >= sessionTokenExpiration.value;
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
