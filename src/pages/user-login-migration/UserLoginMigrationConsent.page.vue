<template>
	<div v-show="!isLoading" class="text-center mx-auto container-max-width">
		<img src="@/assets/img/migration/move.svg" alt="" />
		<h1 class="px-4">
			{{ t("pages.userMigration.title") }}
		</h1>
		<div>
			<div data-testId="text-description">
				<p>
					{{ t("pages.userMigration.description.firstParagraph.hello") }}
					<span class="d-block">
						{{
							t("pages.userMigration.description.firstParagraph.changeSource")
						}}
					</span>
					<span class="d-block">{{ t(migrationDescription) }}</span>
					<span class="d-block">
						{{
							t("pages.userMigration.description.firstParagraph.loginWith", {
								targetSystem: getSystemName(),
							})
						}}
					</span>
				</p>
				<p>
					{{
						t("pages.userMigration.description.lastParagraph", {
							targetSystem: getSystemName(),
							startMigration: t("pages.userMigration.button.startMigration"),
						})
					}}
				</p>
			</div>
			<div
				v-if="userLoginMigration"
				class="d-flex flex-wrap justify-center mt-8"
			>
				<v-btn
					class="mx-8 mb-8"
					variant="flat"
					data-testId="btn-cancel"
					:to="canSkipMigration ? '/dashboard' : '/logout'"
				>
					{{
						$t(
							canSkipMigration
								? "pages.userMigration.button.skip"
								: "common.actions.logout"
						)
					}}
				</v-btn>
				<v-btn
					class="mx-8 mb-8"
					color="primary"
					variant="flat"
					data-testId="btn-proceed"
					:href="`/login/oauth2/${userLoginMigration.targetSystemId}?migration=true`"
				>
					{{ $t("pages.userMigration.button.startMigration") }}
				</v-btn>
			</div>
		</div>
	</div>
</template>

<script lang="ts">
import SystemsModule from "@/store/systems";
import { System } from "@/store/types/system";
import UserLoginMigrationModule from "@/store/user-login-migrations";
import {
	injectStrict,
	SYSTEMS_MODULE_KEY,
	USER_LOGIN_MIGRATION_MODULE_KEY,
} from "@/utils/inject";
import {
	computed,
	ComputedRef,
	defineComponent,
	onMounted,
	Ref,
	ref,
} from "vue";
import { buildPageTitle } from "@/utils/pageTitle";
import { useTitle } from "@vueuse/core";
import { useI18n } from "vue-i18n";
import { UserLoginMigration } from "@/store/user-login-migration";

export default defineComponent({
	name: "UserLoginMigrationConsent",
	layout: "loggedOut",
	setup() {
		const systemsModule: SystemsModule = injectStrict(SYSTEMS_MODULE_KEY);
		const userLoginMigrationModule: UserLoginMigrationModule = injectStrict(
			USER_LOGIN_MIGRATION_MODULE_KEY
		);
		const { t } = useI18n();

		const pageTitle = buildPageTitle(t("pages.userMigration.title"));
		useTitle(pageTitle);

		const getSystemName = (): string => {
			return (
				systemsModule?.getSystems.find(
					(system: System): boolean =>
						system.id === userLoginMigration.value?.targetSystemId
				)?.name ?? ""
			);
		};
		const userLoginMigration: ComputedRef<UserLoginMigration | undefined> =
			computed(() => userLoginMigrationModule.getUserLoginMigration);

		const migrationDescription: ComputedRef<string> = computed(() => {
			return userLoginMigration.value?.mandatorySince
				? "pages.userMigration.description.firstParagraph.fromSourceMandatory"
				: "pages.userMigration.description.firstParagraph.fromSource";
		});

		const canSkipMigration: ComputedRef<boolean> = computed(() => {
			return !userLoginMigration.value?.mandatorySince;
		});

		const isLoading: Ref<boolean> = ref(true);

		onMounted(async () => {
			await userLoginMigrationModule.fetchLatestUserLoginMigrationForCurrentUser();
			await systemsModule.fetchSystems();
			isLoading.value = false;
		});

		return {
			isLoading,
			migrationDescription,
			canSkipMigration,
			getSystemName,
			userLoginMigration,
			t,
		};
	},
});
</script>

<style lang="scss" scoped>
.container-max-width {
	max-width: var(--content-max-width);
}
</style>
