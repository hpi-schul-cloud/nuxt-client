<template>
	<div v-show="!isLoading" class="text-center mx-auto container-max-width">
		<img src="@/assets/img/migration/migration_successful.svg" alt="" />
		<h1 class="pl-4 pr-4">
			{{ t("pages.userMigration.success.title") }}
		</h1>
		<div>
			<RenderHTML
				class="pa-4"
				data-testId="text-description"
				:html="
					t('pages.userMigration.success.description', {
						targetSystem: getSystemName,
					})
				"
				component="p"
			/>
			<v-btn color="primary" depressed data-testId="btn-proceed" to="/logout">
				{{
					t("pages.userMigration.success.login", {
						targetSystem: getSystemName,
					})
				}}
			</v-btn>
		</div>
	</div>
</template>

<script lang="ts">
import {
	computed,
	ComputedRef,
	defineComponent,
	onMounted,
	ref,
	Ref,
} from "vue";
import SystemsModule from "@/store/systems";
import { System } from "@/store/types/system";
import { RenderHTML } from "@feature-render-html";
import { useI18n } from "@/composables/i18n.composable";
import { buildPageTitle } from "@/utils/pageTitle";
import { useTitle } from "@vueuse/core";
import UserLoginMigrationModule from "@/store/user-login-migration";
import {
	injectStrict,
	SYSTEMS_MODULE_KEY,
	USER_LOGIN_MIGRATION_MODULE_KEY,
} from "@/utils/inject";
import { UserLoginMigration } from "@/store/types/user-login-migration";

export default defineComponent({
	name: "UserLoginMigrationSuccess",
	components: { RenderHTML },
	component: { RenderHTML },
	setup() {
		const systemsModule: SystemsModule = injectStrict(SYSTEMS_MODULE_KEY);
		const userLoginMigrationModule: UserLoginMigrationModule = injectStrict(
			USER_LOGIN_MIGRATION_MODULE_KEY
		);
		const { t } = useI18n();

		const pageTitle = buildPageTitle(t("pages.userMigration.success.title"));
		useTitle(pageTitle);

		const getSystemName: ComputedRef<string> = computed(
			() =>
				systemsModule?.getSystems.find(
					(system: System): boolean =>
						system.id === userLoginMigration.value.targetSystemId
				)?.name ?? ""
		);

		const isLoading: Ref<boolean> = ref(true);

		const userLoginMigration: ComputedRef<UserLoginMigration> = computed(
			() => userLoginMigrationModule.getUserLoginMigration
		);

		onMounted(async () => {
			await systemsModule?.fetchSystems();
			await userLoginMigrationModule?.getLatestUserLoginMigrationForCurrentUser();
			isLoading.value = false;
		});

		return {
			t,
			isLoading,
			getSystemName,
		};
	},
});
</script>

<style lang="scss" scoped>
.container-max-width {
	max-width: var(--size-content-width-max);
}
</style>
