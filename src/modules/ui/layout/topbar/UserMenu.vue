<template>
	<VMenu>
		<template v-slot:activator="{ props }">
			<VAvatar
				v-bind="props"
				v-bind.attr="$attrs"
				class="cursor-pointer avatar-background text-white"
			>
				<span class="text-h6">{{ initials }}</span>
			</VAvatar>
		</template>
		<VCard>
			<VList>
				<VListItem class="username">
					{{ user.firstName }} {{ user.lastName }} ({{ userRole }})
				</VListItem>
				<VDivider />
				<language-menu />
				<VListItem href="/account" data-testid="account-link">
					{{ $t("global.topbar.settings") }}
				</VListItem>
				<VListItem
					data-testid="logout"
					@click="() => $emit('action', 'logout')"
				>
					{{ $t("common.labels.logout") }}
				</VListItem>
			</VList>
		</VCard>
	</VMenu>
</template>

<script setup lang="ts">
import { computed, PropType, toRef } from "vue";
import { useI18n } from "vue-i18n";
import LanguageMenu from "@/components/topbar/LanguageMenu.vue";
import { MeUserResponse } from "@/serverApi/v3";

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

const userRole = computed(() => {
	return t(`common.roleName.${toRef(props.roleNames).value[0]}`).toString();
});

const initials = computed(() => {
	return props.user.firstName.slice(0, 1) + props.user.lastName.slice(0, 1);
});
</script>

<style scoped>
.avatar-background {
	background-color: rgba(var(--v-theme-on-background));
}
</style>
