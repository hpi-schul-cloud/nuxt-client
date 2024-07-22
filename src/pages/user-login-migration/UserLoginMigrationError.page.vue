<template>
	<div v-show="!isLoading" class="text-center mx-auto container-max-width">
		<img src="@/assets/img/migration/migration_error.svg" alt="" />
		<h1 class="pl-4 pr-4">
			{{ $t("pages.userMigration.error.title") }}
		</h1>
		<div>
			<RenderHTML
				class="pa-4"
				data-testId="text-description"
				v-if="!multipleUsersFound"
				:html="
					$t('pages.userMigration.error.description', {
						targetSystem: getSystemName(),
						instance: this.$theme.name,
						supportLink,
					})
				"
				component="p"
			/>
			<RenderHTML
				data-testId="text-multiple-users-found"
				v-else
				:html="
					$t('pages.userMigration.error.multipleUsersFound', {
						targetSystem: getSystemName(),
						instance: this.$theme.name,
						supportLink,
					})
				"
				component="p"
			/>
			<RenderHTML
				data-testId="text-schoolnumber-mismatch"
				v-if="targetSchoolNumber && sourceSchoolNumber"
				:html="
					$t('pages.userMigration.error.schoolNumberMismatch', {
						targetSystem: getSystemName(),
						targetSchoolNumber,
						sourceSchoolNumber,
					})
				"
				component="p"
			/>
			<v-btn
				color="primary"
				variant="flat"
				data-testId="btn-proceed"
				to="/logout"
			>
				{{ $t("pages.userMigration.backToLogin") }}
			</v-btn>
		</div>
	</div>
</template>

<script lang="ts">
import { RenderHTML } from "@feature-render-html";
import SystemsModule from "@/store/systems";
import { System } from "@/store/types/system";
import {
	ENV_CONFIG_MODULE_KEY,
	injectStrict,
	SYSTEMS_MODULE_KEY,
	USER_LOGIN_MIGRATION_MODULE_KEY,
} from "@/utils/inject";
import { buildPageTitle } from "@/utils/pageTitle";
import { useTitle } from "@vueuse/core";
import {
	computed,
	ComputedRef,
	defineComponent,
	onMounted,
	Ref,
	ref,
} from "vue";
import UserLoginMigrationModule from "@/store/user-login-migrations";
import EnvConfigModule from "@/store/env-config";
import { UserLoginMigration } from "@/store/user-login-migration";
import { useI18n } from "vue-i18n";

export default defineComponent({
	name: "UserLoginMigrationError",
	components: { RenderHTML },
	props: {
		targetSchoolNumber: {
			type: String,
			required: false,
		},
		sourceSchoolNumber: {
			type: String,
			required: false,
		},
		multipleUsersFound: {
			type: Boolean,
			required: false,
		},
	},
	setup(props) {
		const systemsModule: SystemsModule = injectStrict(SYSTEMS_MODULE_KEY);
		const envConfigModule: EnvConfigModule = injectStrict(
			ENV_CONFIG_MODULE_KEY
		);
		const userLoginMigrationModule: UserLoginMigrationModule = injectStrict(
			USER_LOGIN_MIGRATION_MODULE_KEY
		);
		const { t } = useI18n();

		const pageTitle = buildPageTitle(t("pages.userMigration.error.title"));
		useTitle(pageTitle);

		const getSystemName = (): string => {
			return (
				systemsModule?.getSystems.find(
					(system: System): boolean =>
						system.id === userLoginMigration.value?.targetSystemId
				)?.name ?? ""
			);
		};

		const isLoading: Ref<boolean> = ref(true);

		const getSubject = (): string => {
			let subject: string = encodeURIComponent("Fehler bei der Migration");
			if (props.sourceSchoolNumber && props.targetSchoolNumber) {
				subject = encodeURIComponent("Schulnummer nicht korrekt");
			}
			return subject;
		};

		const supportLink: ComputedRef<string> = computed(
			() =>
				`mailto:${
					envConfigModule.getAccessibilityReportEmail
				}?subject=${getSubject()}`
		);

		const userLoginMigration: ComputedRef<UserLoginMigration | undefined> =
			computed(() => userLoginMigrationModule.getUserLoginMigration);

		onMounted(async () => {
			await systemsModule?.fetchSystems();
			await userLoginMigrationModule?.fetchLatestUserLoginMigrationForCurrentUser();
			isLoading.value = false;
		});

		return {
			isLoading,
			supportLink,
			getSystemName,
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
