<template>
	<SvsSuspense :loading="isLoading">
		<div class="text-center mx-auto container-max-width">
			<img src="@/assets/img/migration/migration_error.svg" alt="" />
			<h1 class="px-4">
				{{ t("pages.userMigration.error.title") }}
			</h1>
			<div>
				<p v-if="!multipleUsersFound" data-testid="text-description" class="ma-8">
					{{
						t("pages.userMigration.error.description.fail", {
							targetSystem: systemName,
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
								targetSystem: systemName,
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
	</SvsSuspense>
</template>

<script setup lang="ts">
import { buildPageTitle } from "@/utils/pageTitle";
import { sanitizeUrl } from "@braintree/sanitize-url";
import { useSystem } from "@data-access";
import { useEnvConfig } from "@data-env";
import { useUserLoginMigration } from "@data-user-login-migration";
import { useTitle } from "@vueuse/core";
import { computed, onMounted, ref } from "vue";
import { useI18n } from "vue-i18n";

const props = defineProps<{ targetSchoolNumber?: string; sourceSchoolNumber?: string; multipleUsersFound?: boolean }>();

const { userLoginMigration, fetchLatestUserLoginMigrationForSchool } = useUserLoginMigration();

const targetSystemId = computed(() => userLoginMigration.value?.targetSystemId);
const { systemName, isLoading: isLoadingSystem } = useSystem(targetSystemId);

const { t } = useI18n();

const pageTitle = buildPageTitle(t("pages.userMigration.error.title"));
useTitle(pageTitle);

const isLoadingUserLoginMigration = ref(true);
const isLoading = computed(() => isLoadingUserLoginMigration.value || isLoadingSystem.value);

const getSubject = () => {
	let subject: string = encodeURIComponent("Fehler bei der Migration");
	if (props.sourceSchoolNumber && props.targetSchoolNumber) {
		subject = encodeURIComponent("Schulnummer nicht korrekt");
	}
	return subject;
};

const supportLink = computed(() =>
	sanitizeUrl(`mailto:${useEnvConfig().value.ACCESSIBILITY_REPORT_EMAIL}?subject=${getSubject()}`)
);

onMounted(async () => {
	await fetchLatestUserLoginMigrationForSchool();
	isLoadingUserLoginMigration.value = false;
});
</script>

<style lang="scss" scoped>
.container-max-width {
	max-width: var(--content-max-width);
}
</style>
