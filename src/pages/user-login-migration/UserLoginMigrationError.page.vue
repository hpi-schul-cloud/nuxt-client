<template>
	<div v-show="!isLoading" class="text-center mx-auto container-max-width">
		<img src="@/assets/img/migration/migration_error.svg" alt="" />
		<h1 class="px-4">
			{{ t("pages.userMigration.error.title") }}
		</h1>
		<div>
			<p v-if="!multipleUsersFound" data-testid="text-description" class="ma-8">
				{{
					t("pages.userMigration.error.description.fail", {
						targetSystem: getSystemName(),
					})
				}}
				<span class="d-block">
					<i18n-t
						keypath="pages.userMigration.error.description.support"
						scope="global"
					>
						<a :href="supportLink">{{
							t("pages.userMigration.error.description.support.link")
						}}</a>
					</i18n-t>
				</span>
			</p>
			<p v-else data-testid="text-multiple-users-found" class="ma-8">
				{{ t("pages.userMigration.error.multipleUsersFound") }}
				<span class="d-block">
					<i18n-t
						keypath="pages.userMigration.error.description.support"
						scope="global"
					>
						<a :href="supportLink">{{
							t("pages.userMigration.error.description.support.link")
						}}</a>
					</i18n-t>
				</span>
			</p>
			<p
				v-if="targetSchoolNumber && sourceSchoolNumber"
				data-testid="text-schoolnumber-mismatch"
			>
				{{ t("pages.userMigration.error.schoolNumberMismatch.information") }}
				<span class="d-block font-weight-bold">
					{{
						t(
							"pages.userMigration.error.schoolNumberMismatch.information.schoolNumber",
							{
								targetSystem: getSystemName(),
								targetSchoolNumber,
								sourceSchoolNumber,
							}
						)
					}}
				</span>
			</p>
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
import SystemsModule from "@/store/systems";
import { System } from "@/store/types/system";
import {
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
import { UserLoginMigration } from "@/store/user-login-migration";
import { useI18n } from "vue-i18n";
import { sanitizeUrl } from "@braintree/sanitize-url";
import { useEnvConfig } from "@data-env";

export default defineComponent({
	name: "UserLoginMigrationError",
	props: {
		targetSchoolNumber: {
			type: String,
			required: false,
			default: "",
		},
		sourceSchoolNumber: {
			type: String,
			required: false,
			default: "",
		},
		multipleUsersFound: {
			type: Boolean,
			required: false,
		},
	},
	setup(props) {
		const systemsModule: SystemsModule = injectStrict(SYSTEMS_MODULE_KEY);
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

		const supportLink: ComputedRef<string> = computed(() =>
			sanitizeUrl(
				`mailto:${
					useEnvConfig().value.ACCESSIBILITY_REPORT_EMAIL
				}?subject=${getSubject()}`
			)
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
