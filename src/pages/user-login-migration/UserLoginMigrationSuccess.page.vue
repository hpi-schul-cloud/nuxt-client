<template>
	<div v-show="!isLoading" class="text-center mx-auto container-max-width">
		<img
			src="@/assets/img/migration/migration_successful.svg"
			:alt="$t('pages.userMigration.success.img.alt')"
		/>
		<h1 class="pl-4 pr-4">
			{{ $t("pages.userMigration.success.title") }}
		</h1>
		<div>
			<p
				class="pa-4"
				data-testId="text-description"
				v-html="
					$t('pages.userMigration.success.description', {
						targetSystem: getSystemName(targetSystem),
					})
				"
			></p>
			<v-btn color="primary" depressed data-testId="btn-proceed" to="/logout">
				{{
					$t("pages.userMigration.backToLogin", {
						targetSystem: getSystemName(targetSystem),
					})
				}}
			</v-btn>
		</div>
	</div>
</template>

<script lang="ts">
import { defineComponent, inject, onMounted, ref, Ref } from "vue";
import SystemsModule from "@/store/systems";
import { System } from "@/store/types/system";

export default defineComponent({
	name: "UserLoginMigrationSuccess",
	props: {
		sourceSystem: {
			type: String,
			required: true,
		},
		targetSystem: {
			type: String,
			required: true,
		},
	},
	setup() {
		const systemsModule: SystemsModule | undefined =
			inject<SystemsModule>("systemsModule");

		const getSystemName = (id: string): string => {
			return (
				systemsModule?.getSystems.find(
					(system: System): boolean => system.id === id
				)?.name ?? ""
			);
		};

		const isLoading: Ref<boolean> = ref(true);

		onMounted(async () => {
			await systemsModule?.fetchSystems();
			isLoading.value = false;
		});

		return {
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
