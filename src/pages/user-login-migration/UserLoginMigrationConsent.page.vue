<template>
	<SvsSuspense :loading="isLoading">
		<div class="text-center mx-auto container-max-width">
			<img src="@/assets/img/migration/move.svg" alt="" />
			<h1 class="px-4">
				{{ t("pages.userMigration.title") }}
			</h1>
			<div>
				<div data-testId="text-description">
					<p>
						{{ t("pages.userMigration.description.firstParagraph.hello") }}
						<span class="d-block">
							{{ t("pages.userMigration.description.firstParagraph.changeSource") }}
						</span>
						<span class="d-block">{{ t(migrationDescription) }}</span>
						<span class="d-block">
							{{
								t("pages.userMigration.description.firstParagraph.loginWith", {
									targetSystem: systemName,
								})
							}}
						</span>
					</p>
					<p>
						{{
							t("pages.userMigration.description.lastParagraph", {
								targetSystem: systemName,
								startMigration: t("pages.userMigration.button.startMigration"),
							})
						}}
					</p>
				</div>
				<div v-if="userLoginMigration" class="d-flex flex-wrap justify-center mt-8">
					<VBtn
						class="mx-8 mb-8"
						variant="flat"
						data-testId="btn-cancel"
						:to="canSkipMigration ? '/dashboard' : '/logout'"
					>
						{{ $t(canSkipMigration ? "pages.userMigration.button.skip" : "common.actions.logout") }}
					</VBtn>
					<VBtn
						class="mx-8 mb-8"
						color="primary"
						variant="flat"
						data-testId="btn-proceed"
						:href="`/login/oauth2/${userLoginMigration.targetSystemId}?migration=true`"
					>
						{{ $t("pages.userMigration.button.startMigration") }}
					</VBtn>
				</div>
			</div>
		</div>
	</SvsSuspense>
</template>

<script setup lang="ts">
import { buildPageTitle } from "@/utils/pageTitle";
import { useSystem } from "@data-system";
import { useUserLoginMigration } from "@data-user-login-migration";
import { SvsSuspense } from "@ui-containers";
import { useTitle } from "@vueuse/core";
import { computed, onMounted, ref } from "vue";
import { useI18n } from "vue-i18n";

const { userLoginMigration, fetchLatestUserLoginMigrationForSchool } = useUserLoginMigration();

const targetSystemId = computed(() => userLoginMigration.value?.targetSystemId);
const { systemName, isLoading: isLoadingSystem } = useSystem(targetSystemId);
const { t } = useI18n();

const pageTitle = buildPageTitle(t("pages.userMigration.title"));
useTitle(pageTitle);

const migrationDescription = computed(() =>
	userLoginMigration.value?.mandatorySince
		? "pages.userMigration.description.firstParagraph.fromSourceMandatory"
		: "pages.userMigration.description.firstParagraph.fromSource"
);

const canSkipMigration = computed(() => !userLoginMigration.value?.mandatorySince);

const isLoadingUserLoginMigration = ref(true);
const isLoading = computed(() => isLoadingUserLoginMigration.value || isLoadingSystem.value);

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
