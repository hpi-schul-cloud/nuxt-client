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
					<i18n-t keypath="pages.userMigration.error.description.support" scope="global">
						<a :href="supportLink">{{ t("pages.userMigration.error.description.support.link") }}</a>
					</i18n-t>
				</span>
			</p>
			<p v-else data-testid="text-multiple-users-found" class="ma-8">
				{{ t("pages.userMigration.error.multipleUsersFound") }}
				<span class="d-block">
					<i18n-t keypath="pages.userMigration.error.description.support" scope="global">
						<a :href="supportLink">{{ t("pages.userMigration.error.description.support.link") }}</a>
					</i18n-t>
				</span>
			</p>
			<p v-if="targetSchoolNumber && sourceSchoolNumber" data-testid="text-schoolnumber-mismatch">
				{{ t("pages.userMigration.error.schoolNumberMismatch.information") }}
				<span class="d-block font-weight-bold">
					{{
						t("pages.userMigration.error.schoolNumberMismatch.information.schoolNumber", {
							targetSystem: getSystemName(),
							targetSchoolNumber,
							sourceSchoolNumber,
						})
					}}
				</span>
			</p>
			<VBtn color="primary" variant="flat" data-testId="btn-proceed" to="/logout">
				{{ $t("pages.userMigration.backToLogin") }}
			</VBtn>
		</div>
	</div>
</template>

<script setup lang="ts">
import SystemsModule from "@/store/systems";
import { System } from "@/store/types/system";
import { injectStrict, SYSTEMS_MODULE_KEY } from "@/utils/inject";
import { buildPageTitle } from "@/utils/pageTitle";
import { sanitizeUrl } from "@braintree/sanitize-url";
import { useEnvConfig } from "@data-env";
import { useUserLoginMigration } from "@data-user-login-migration";
import { useTitle } from "@vueuse/core";
import { computed, ComputedRef, onMounted, Ref, ref } from "vue";
import { useI18n } from "vue-i18n";

const props = defineProps<{ targetSchoolNumber?: string; sourceSchoolNumber?: string; multipleUsersFound?: boolean }>();

const systemsModule: SystemsModule = injectStrict(SYSTEMS_MODULE_KEY);
const { userLoginMigration, fetchLatestUserLoginMigrationForSchool } = useUserLoginMigration();

const { t } = useI18n();

const pageTitle = buildPageTitle(t("pages.userMigration.error.title"));
useTitle(pageTitle);

const getSystemName = (): string =>
	systemsModule?.getSystems.find((system: System): boolean => system.id === userLoginMigration.value?.targetSystemId)
		?.name ?? "";

const isLoading: Ref<boolean> = ref(true);

const getSubject = (): string => {
	let subject: string = encodeURIComponent("Fehler bei der Migration");
	if (props.sourceSchoolNumber && props.targetSchoolNumber) {
		subject = encodeURIComponent("Schulnummer nicht korrekt");
	}
	return subject;
};

const supportLink: ComputedRef<string> = computed(() =>
	sanitizeUrl(`mailto:${useEnvConfig().value.ACCESSIBILITY_REPORT_EMAIL}?subject=${getSubject()}`)
);

onMounted(async () => {
	await systemsModule?.fetchSystems();
	await fetchLatestUserLoginMigrationForSchool();
	isLoading.value = false;
});
</script>

<style lang="scss" scoped>
.container-max-width {
	max-width: var(--content-max-width);
}
</style>
