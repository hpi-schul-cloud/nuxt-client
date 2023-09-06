<template>
	<div v-show="!isLoading" class="text-center mx-auto container-max-width">
		<img src="@/assets/img/migration/move.svg" alt="" />
		<h1 class="pl-4 pr-4">
			{{ t("pages.userMigration.title") }}
		</h1>
		<div>
			<RenderHTML
				class="pa-4"
				data-testId="text-description"
				:html="
					t(migrationDescription, {
						targetSystem: getSystemName(),
						startMigration: t('pages.userMigration.button.startMigration'),
					})
				"
				component="p"
			/>
			<div
				v-if="isNewLoginFlowEnabled"
				class="d-flex flex-wrap justify-center mt-8"
			>
				<v-btn
					class="mx-8 mb-8"
					depressed
					data-testId="btn-cancel"
					:to="canSkipMigration ? '/dashboard' : '/logout'"
				>
					{{
						t(
							canSkipMigration
								? "pages.userMigration.button.skip"
								: "common.actions.logout"
						)
					}}
				</v-btn>
				<v-btn
					class="mx-8 mb-8"
					color="primary"
					depressed
					data-testId="btn-proceed"
					:href="`/login/oauth2/${userLoginMigration.targetSystemId}?migration=true`"
				>
					{{ t("pages.userMigration.button.startMigration") }}
				</v-btn>
			</div>
			<div v-else class="d-flex flex-wrap justify-center mt-8">
				<v-btn
					class="mx-8 mb-8"
					depressed
					data-testId="btn-cancel"
					:to="cancelLink"
				>
					{{
						t(
							canSkipMigration
								? "pages.userMigration.button.skip"
								: "common.actions.logout"
						)
					}}
				</v-btn>
				<v-btn
					class="mx-8 mb-8"
					color="primary"
					depressed
					data-testId="btn-proceed"
					:href="proceedLink"
				>
					{{ $t("pages.userMigration.button.startMigration") }}
				</v-btn>
			</div>
		</div>
	</div>
</template>

<script lang="ts">
import { RenderHTML } from "@feature-render-html";
import SystemsModule from "@/store/systems";
import { System } from "@/store/types/system";
import UserLoginMigrationModule from "@/store/user-login-migrations";
import {
	ENV_CONFIG_MODULE_KEY,
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
import {
	MigrationPageOrigin,
	UserLoginMigration,
} from "@/store/user-login-migration";
import { useI18n } from "vue-i18n";

export default defineComponent({
	name: "UserLoginMigrationConsent",
	layout: "loggedOut",
	components: { RenderHTML },
	props: {
		origin: String,
	},
	setup(props) {
		const systemsModule: SystemsModule = injectStrict(SYSTEMS_MODULE_KEY);
		const userLoginMigrationModule: UserLoginMigrationModule = injectStrict(
			USER_LOGIN_MIGRATION_MODULE_KEY
		);
		const envConfigModule = injectStrict(ENV_CONFIG_MODULE_KEY);
		const { t } = useI18n();

		const pageTitle = buildPageTitle(t("pages.userMigration.title"));
		useTitle(pageTitle);

		const getSystemName = (): string => {
			return (
				systemsModule?.getSystems.find(
					(system: System): boolean =>
						system.id === userLoginMigration.value.targetSystemId
				)?.name ?? ""
			);
		};

		const isNewLoginFlowEnabled = !!envConfigModule.getClientUserLoginMigration;

		const proceedLink: ComputedRef<string | undefined> = computed(
			() => userLoginMigrationModule?.getMigrationLinks.proceedLink
		);
		const cancelLink: ComputedRef<string | undefined> = computed(
			() => userLoginMigrationModule?.getMigrationLinks.cancelLink
		);

		const userLoginMigration: ComputedRef<UserLoginMigration> = computed(
			() => userLoginMigrationModule?.getUserLoginMigration
		);

		const pageType: ComputedRef<MigrationPageOrigin> = computed(() => {
			if (props.origin === userLoginMigration.value.targetSystemId) {
				return MigrationPageOrigin.START_FROM_TARGET_SYSTEM;
			} else {
				return userLoginMigration.value.mandatorySince
					? MigrationPageOrigin.START_FROM_SOURCE_SYSTEM_MANDATORY
					: MigrationPageOrigin.START_FROM_SOURCE_SYSTEM;
			}
		});

		const migrationDescription: ComputedRef<string> = computed(() => {
			if (props.origin === userLoginMigration.value.targetSystemId) {
				return "pages.userMigration.description.fromTarget";
			} else {
				return userLoginMigration.value.mandatorySince
					? "pages.userMigration.description.fromSourceMandatory"
					: "pages.userMigration.description.fromSource";
			}
		});

		const canSkipMigration: ComputedRef<boolean> = computed(() => {
			return !userLoginMigration.value.mandatorySince;
		});

		const isLoading: Ref<boolean> = ref(true);

		onMounted(async () => {
			await userLoginMigrationModule?.fetchLatestUserLoginMigrationForCurrentUser();
			await systemsModule?.fetchSystems();
			if (
				!isNewLoginFlowEnabled &&
				userLoginMigration.value.sourceSystemId &&
				pageType.value
			) {
				await userLoginMigrationModule?.fetchMigrationLinks({
					pageType: pageType.value,
					sourceSystem: userLoginMigration.value.sourceSystemId,
					targetSystem: userLoginMigration.value.targetSystemId,
				});
			}
			isLoading.value = false;
		});

		return {
			t,
			isLoading,
			migrationDescription,
			canSkipMigration,
			proceedLink,
			cancelLink,
			getSystemName,
			isNewLoginFlowEnabled,
			userLoginMigration,
		};
	},
});
</script>

<style lang="scss" scoped>
.container-max-width {
	max-width: var(--size-content-width-max);
}
</style>
