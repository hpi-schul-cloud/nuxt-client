<template>
	<VMenu :width="isExternalLogoutAllowed ? 'auto' : '215'">
		<template v-slot:activator="{ props }">
			<VBtn
				v-bind="props"
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
			<VListItem data-testid="logout" @click="logout">
				{{ $t("common.labels.logout")
				}}{{ isExternalLogoutAllowed ? " Bildungscloud" : "" }}
			</VListItem>
			<VListItem
				v-if="isExternalLogoutAllowed"
				data-testid="external-logout"
				@click="externalLogout"
			>
				{{ $t("common.labels.logout")
				}}{{ isExternalLogoutAllowed ? ` Bildungscloud & ${systemName}` : "" }}
			</VListItem>
		</VList>
	</VMenu>
</template>

<script setup lang="ts">
import { computed, onMounted, PropType, Ref, ref, toRef } from "vue";
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

const system = useSystemApi();

const userRole = computed(() => {
	return t(`common.roleName.${toRef(props.roleNames).value[0]}`).toString();
});

const initials = computed(() => {
	return props.user.firstName.slice(0, 1) + props.user.lastName.slice(0, 1);
});

const isExternalLogoutAllowed: Ref<boolean> = ref(false);

const systemName: Ref<string> = ref("");

const logout = () => {
	authModule.logout();
};

const externalLogout = () => {
	authModule.externalLogout();
};

const setSystemValuesFromJwt = async (jwt: string): Promise<void> => {
	const jwtPayload = JSON.parse(atob(jwt.split(".")[1]));
	if (!("systemId" in jwtPayload) && !jwtPayload.systemId) {
		return;
	}

	const fetchedSystem: System | undefined = await system.getSystem(
		jwtPayload.systemId
	);

	if (!fetchedSystem || !fetchedSystem.alias) {
		return;
	}

	console.info(JSON.stringify(fetchedSystem));
	console.info(
		"Feature flag",
		envConfigModule.getEnv.FEATURE_EXTERNAL_SYSTEM_LOGOUT_ENABLED
	);

	isExternalLogoutAllowed.value =
		fetchedSystem.alias === "SANIS" &&
		envConfigModule.getEnv.FEATURE_EXTERNAL_SYSTEM_LOGOUT_ENABLED;
	systemName.value = fetchedSystem.displayName;
};

onMounted(async () => {
	const jwt = authModule.getAccessToken;
	if (jwt) {
		try {
			await setSystemValuesFromJwt(jwt);
		} catch (err) {
			console.error(err);
			isExternalLogoutAllowed.value = false;
			systemName.value = "";
		}
	}
});
</script>

<style scoped>
:deep(.v-list-group__items .v-list-item) {
	padding-inline-start: 16px !important;
}
</style>
