<template>
	<div v-show="hasData" class="text-center mx-auto">
		<img
			src="@/assets/img/migration/migration.svg"
			alt="migration error logo"
		/>
		<h1 class="pl-4 pr-4">
			{{ $t("pages.userMigration.error.title") }}
		</h1>
		<div>
			<p
				class="pa-4"
				data-testId="text-description"
				v-html="
					$t('pages.userMigration.error.description', {
						sourceSystem: getSystemName(sourceSystem),
						targetSystem: getSystemName(targetSystem),
					})
				"
			></p>
			<v-btn color="primary" depressed data-testId="btn-proceed" to="/logout">
				{{ $t("pages.userMigration.backToLogin") }}
			</v-btn>
		</div>
	</div>
</template>

<script lang="ts">
import { defineComponent, inject, onMounted, ref, Ref } from "vue";
import SystemsModule from "@/store/systems";
import { System } from "@/store/types/system";

export default defineComponent({
	name: "UserLoginMigrationError",
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

		const hasData: Ref<boolean> = ref(false);

		onMounted(async () => {
			await systemsModule?.fetchSystems();
			hasData.value = true;
		});

		return {
			hasData,
			getSystemName,
		};
	},
});
</script>

<style lang="scss" scoped></style>
