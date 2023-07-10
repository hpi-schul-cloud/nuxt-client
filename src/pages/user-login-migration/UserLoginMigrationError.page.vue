<template>
	<div v-show="!isLoading" class="text-center mx-auto container-max-width">
		<img
			src="@/assets/img/migration/migration_error.svg"
			:alt="$t('pages.userMigration.error.img.alt').toString()"
		/>
		<h1 class="pl-4 pr-4">
			{{ $t("pages.userMigration.error.title") }}
		</h1>
		<div>
			<RenderHTML
				class="pa-4"
				data-testId="text-description"
				:html="
					$t('pages.userMigration.error.description', {
						targetSystem: getSystemName(targetSystem),
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
						targetSystem: getSystemName(targetSystem),
						targetSchoolNumber,
						sourceSchoolNumber,
					})
				"
				component="p"
			/>
			<v-btn color="primary" depressed data-testId="btn-proceed" to="/logout">
				{{ $t("pages.userMigration.backToLogin") }}
			</v-btn>
		</div>
	</div>
</template>

<script lang="ts">
import RenderHTML from "@/components/common/render-html/RenderHTML.vue";
import SystemsModule from "@/store/systems";
import { System } from "@/store/types/system";
import { ENV_CONFIG_MODULE_KEY, injectStrict } from "@/utils/inject";
import {
	ComputedRef,
	Ref,
	computed,
	defineComponent,
	inject,
	onMounted,
	ref,
} from "vue";

export default defineComponent({
	name: "UserLoginMigrationError",
	component: { RenderHTML },
	props: {
		targetSystem: {
			type: String,
			required: true,
		},
		targetSchoolNumber: {
			type: String,
			required: false,
		},
		sourceSchoolNumber: {
			type: String,
			required: false,
		},
	},
	setup(props) {
		const systemsModule: SystemsModule | undefined =
			inject<SystemsModule>("systemsModule");
		const envConfigModule = injectStrict(ENV_CONFIG_MODULE_KEY);

		const getSystemName = (id: string): string => {
			return (
				systemsModule?.getSystems.find(
					(system: System): boolean => system.id === id
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

		onMounted(async () => {
			await systemsModule?.fetchSystems();
			isLoading.value = false;
		});

		return {
			isLoading,
			supportLink,
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
