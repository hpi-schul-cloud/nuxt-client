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
						targetSystem: getSystemName(targetSystem),
					})
				}}
				<span class="d-block">
					{{ t("pages.userMigration.success.description.loginAgain") }}
				</span>
			</p>
			<v-btn color="primary" variant="flat" data-testId="btn-proceed" to="/logout">
				{{
					t("pages.userMigration.success.login", {
						targetSystem: getSystemName(targetSystem),
					})
				}}
			</v-btn>
		</div>
	</div>
</template>

<script lang="ts">
import SystemsModule from "@/store/systems";
import { System } from "@/store/types/system";
import { injectStrict, SYSTEMS_MODULE_KEY } from "@/utils/inject";
import { buildPageTitle } from "@/utils/pageTitle";
import { useTitle } from "@vueuse/core";
import { defineComponent, onMounted, Ref, ref } from "vue";
import { useI18n } from "vue-i18n";

export default defineComponent({
	name: "UserLoginMigrationSuccess",
	props: {
		targetSystem: {
			type: String,
			required: true,
		},
	},
	setup() {
		const systemsModule: SystemsModule = injectStrict(SYSTEMS_MODULE_KEY);
		const { t } = useI18n();

		const pageTitle = buildPageTitle(t("pages.userMigration.success.title"));
		useTitle(pageTitle);

		const getSystemName = (id: string): string =>
			systemsModule?.getSystems.find((system: System): boolean => system.id === id)?.name ?? "";

		const isLoading: Ref<boolean> = ref(true);

		onMounted(async () => {
			await systemsModule?.fetchSystems();
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
	max-width: var(--content-max-width);
}
</style>
