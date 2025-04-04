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
			>
				<span class="text-h6">{{ initials }}</span>
			</VBtn>
		</template>
		<VList>
			<VListItem data-testid="active-user">
				{{ user.firstName }} {{ user.lastName }} ({{ userRole }})
			</VListItem>
			<VDivider />
			<LanguageMenu />
			<VListItem href="/account" data-testid="account-link">
				{{ $t("global.topbar.settings") }}
			</VListItem>
			<VListItem
				v-if="isExternalLogoutAllowed"
				data-testid="external-logout"
				@click="externalLogout"
			>
				{{ $t("common.labels.logout")
				}}{{ isExternalLogoutAllowed ? ` Bildungscloud & ${systemName}` : "" }}
			</VListItem>
			<VListItem data-testid="logout" @click="logout">
				{{ $t("common.labels.logout")
				}}{{ isExternalLogoutAllowed ? " Bildungscloud" : "" }}
			</VListItem>
		</VList>
	</VMenu>
</template>

<script setup lang="ts">
import {
	computed,
	ComputedRef,
	PropType,
	toRef,
	ref,
	Ref,
	onMounted,
} from "vue";
import { useI18n } from "vue-i18n";
import LanguageMenu from "./LanguageMenu.vue";
import { MeUserResponse } from "@/serverApi/v3";
import {
	injectStrict,
	AUTH_MODULE_KEY,
	ENV_CONFIG_MODULE_KEY,
} from "@/utils/inject";
import { System, useSystemApi } from "@data-system";

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

const { t } = useI18n();
const authModule = injectStrict(AUTH_MODULE_KEY);
const envConfigModule = injectStrict(ENV_CONFIG_MODULE_KEY);
const { getSystem } = useSystemApi();

const userRole = computed(() => {
	return t(`common.roleName.${toRef(props.roleNames).value[0]}`).toString();
});

const initials = computed(() => {
	return props.user.firstName.slice(0, 1) + props.user.lastName.slice(0, 1);
});

const system: Ref<System | undefined> = ref();

const isExternalLogoutAllowed: ComputedRef<boolean> = computed(
	() =>
		envConfigModule.getEnv.FEATURE_EXTERNAL_SYSTEM_LOGOUT_ENABLED &&
		!!authModule.loginSystem &&
		!!system.value?.hasEndSessionEndpoint
);

const systemName: ComputedRef<string> = computed(() => {
	return system.value?.displayName ?? "";
});

onMounted(async () => {
	if (authModule.loginSystem) {
		system.value = await getSystem(authModule.loginSystem);
	}
});

const logout = () => {
	authModule.logout();
};

const externalLogout = () => {
	authModule.externalLogout();
};
</script>

<style scoped>
:deep(.v-list-group__items .v-list-item) {
	padding-inline-start: 16px !important;
}
</style>
