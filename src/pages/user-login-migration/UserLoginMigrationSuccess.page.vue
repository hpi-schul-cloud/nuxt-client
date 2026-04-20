<template>
	<div v-show="!isLoading" class="text-center mx-auto container-max-width">
		<img src="@/assets/img/migration/migration_successful.svg" alt="" />
		<h1 class="px-4">
			{{ t("pages.userMigration.success.title") }}
		</h1>
		<div>
			<p class="ma-8" data-testid="text-description">
				{{
					t("pages.userMigration.success.description", {
						targetSystem: systemName,
					})
				}}
				<span class="d-block">
					{{ t("pages.userMigration.success.description.loginAgain") }}
				</span>
			</p>
			<VBtn color="primary" variant="flat" data-testId="btn-proceed" to="/logout">
				{{
					t("pages.userMigration.success.login", {
						targetSystem: systemName,
					})
				}}
			</VBtn>
		</div>
	</div>
</template>

<script setup lang="ts">
import { buildPageTitle } from "@/utils/pageTitle";
import { useSystem } from "@data-system";
import { useTitle } from "@vueuse/core";
import { onMounted, Ref, ref } from "vue";
import { useI18n } from "vue-i18n";

const { targetSystem } = defineProps<{ targetSystem: string }>();

// TODO: How to handle this?
// eslint-disable-next-line vue/no-setup-props-reactivity-loss
const { systemName } = useSystem(targetSystem);

const { t } = useI18n();

const pageTitle = buildPageTitle(t("pages.userMigration.success.title"));
useTitle(pageTitle);

const isLoading: Ref<boolean> = ref(true);

onMounted(async () => {
	isLoading.value = false;
});
</script>

<style lang="scss" scoped>
.container-max-width {
	max-width: var(--content-max-width);
}
</style>
