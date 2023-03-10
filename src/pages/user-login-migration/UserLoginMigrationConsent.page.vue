<template>
	<div v-show="hasData" class="text-center mx-auto container-max-width">
		<img src="@/assets/img/migration/move.svg" alt="migration logo" />
		<h1 class="pl-4 pr-4">
			{{ $t("pages.userMigration.title") }}
		</h1>
		<div>
			<p
				class="pa-4"
				data-testId="text-description"
				v-html="
					$t(migrationDescription, {
						sourceSystem: getSystemName(sourceSystem),
						targetSystem: getSystemName(targetSystem),
					})
				"
			></p>
			<div class="d-flex flex-wrap justify-center mt-8">
				<v-btn
					class="mx-8 mb-8"
					depressed
					data-testId="btn-cancel"
					:to="cancelLink"
				>
					{{
						$t(
							mandatory
								? "common.actions.logout"
								: "pages.userMigration.button.skip"
						)
					}}
				</v-btn>
				<v-btn
					class="mx-8 mb-8"
					color="primary"
					depressed
					data-testId="btn-proceed"
					:href="proceedLink"
				>
					{{ $t("pages.userMigration.button.startMigration") }}
				</v-btn>
			</div>
		</div>
	</div>
</template>

<script lang="ts">
import SystemsModule from "@/store/systems";
import UserLoginMigrationModule from "@/store/user-login-migration";
import { System } from "@/store/types/system";
import { MigrationPageOrigin } from "@/store/types/user-login-migration";
import {
	computed,
	ComputedRef,
	defineComponent,
	inject,
	onMounted,
	Ref,
	ref,
} from "vue";

export default defineComponent({
	name: "UserLoginMigrationConsent",
	layout: "loggedOut",
	props: {
		sourceSystem: {
			type: String,
			required: true,
		},
		targetSystem: {
			type: String,
			required: true,
		},
		origin: {
			type: String,
			required: true,
		},
		mandatory: {
			type: Boolean,
		},
	},
	setup(props) {
		const systemsModule: SystemsModule | undefined =
			inject<SystemsModule>("systemsModule");
		const userMigrationModule: UserLoginMigrationModule | undefined =
			inject<UserLoginMigrationModule>("userLoginMigrationModule");

		const getSystemName = (id: string): string => {
			return (
				systemsModule?.getSystems.find(
					(system: System): boolean => system.id === id
				)?.name ?? ""
			);
		};

		const proceedLink: ComputedRef<string | undefined> = computed(
			() => userMigrationModule?.getMigrationLinks.proceedLink
		);
		const cancelLink: ComputedRef<string | undefined> = computed(
			() => userMigrationModule?.getMigrationLinks.cancelLink
		);

		let pageType: MigrationPageOrigin;
		let migrationDescription: string;
		if (props.origin === props.sourceSystem) {
			pageType = props.mandatory
				? MigrationPageOrigin.START_FROM_SOURCE_SYSTEM_MANDATORY
				: MigrationPageOrigin.START_FROM_SOURCE_SYSTEM;
			migrationDescription = props.mandatory
				? "pages.userMigration.description.fromSourceMandatory"
				: "pages.userMigration.description.fromSource";
		} else {
			pageType = MigrationPageOrigin.START_FROM_TARGET_SYSTEM;
			migrationDescription = "pages.userMigration.description.fromTarget";
		}

		const hasData: Ref<boolean> = ref(false);

		onMounted(async () => {
			await systemsModule?.fetchSystems();
			await userMigrationModule?.fetchMigrationLinks({
				pageType,
				sourceSystem: props.sourceSystem,
				targetSystem: props.targetSystem,
			});
			hasData.value = true;
		});

		return {
			hasData,
			migrationDescription,
			proceedLink,
			cancelLink,
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
