<template>
	<VMenu max-width="215">
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
				{{ $t("common.labels.logout") }}
			</VListItem>
		</VList>
	</VMenu>
</template>

<script setup lang="ts">
import { computed, PropType, toRef } from "vue";
import { useI18n } from "vue-i18n";
import LanguageMenu from "./LanguageMenu.vue";
import { MeUserResponse } from "@/serverApi/v3";
import { injectStrict, AUTH_MODULE_KEY } from "@/utils/inject";

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

const userRole = computed(() => {
	return t(`common.roleName.${toRef(props.roleNames).value[0]}`).toString();
});

const initials = computed(() => {
	return props.user.firstName.slice(0, 1) + props.user.lastName.slice(0, 1);
});

const logout = () => {
	authModule.logout();
};
</script>
