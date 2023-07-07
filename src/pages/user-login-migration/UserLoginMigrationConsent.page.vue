<template>
	<div v-show="!isLoading" class="text-center mx-auto container-max-width">
		<img
			src="@/assets/img/migration/move.svg"
			:alt="$t('pages.userMigration.consent.img.alt').toString()"
		/>
		<h1 class="pl-4 pr-4">
			{{ $t("pages.userMigration.title") }}
		</h1>
		<div>
			<RenderHTML
				class="pa-4"
				data-testId="text-description"
				:html="
					$t(migrationDescription, {
						targetSystem: getSystemName(targetSystem),
						startMigration: $t('pages.userMigration.button.startMigration'),
					}).toString()
				"
				component="p"
			/>
			<div
				v-if="isNewLoginFlowEnabled"
				class="d-flex flex-wrap justify-center mt-8"
			>
				<v-btn
					class="mx-8 mb-8"
					depressed
					data-testId="btn-cancel"
					:to="canSkipMigration ? '/dashboard' : '/logout'"
				>
					{{
						$t(
							canSkipMigration
								? "pages.userMigration.button.skip"
								: "common.actions.logout"
						)
					}}
				</v-btn>
				<v-btn
					class="mx-8 mb-8"
					color="primary"
					depressed
					data-testId="btn-proceed"
					:href="`/login/oauth2/${targetSystem}?migration=true`"
				>
					{{ $t("pages.userMigration.button.startMigration") }}
				</v-btn>
			</div>
			<div v-else class="d-flex flex-wrap justify-center mt-8">
				<v-btn
					class="mx-8 mb-8"
					depressed
					data-testId="btn-cancel"
					:to="cancelLink"
				>
					{{
						$t(
							canSkipMigration
								? "pages.userMigration.button.skip"
								: "common.actions.logout"
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
import RenderHTML from "@/components/common/render-html/RenderHTML.vue";
import SystemsModule from "@/store/systems";
import { System } from "@/store/types/system";
import { MigrationPageOrigin } from "@/store/types/user-login-migration";
import UserLoginMigrationModule from "@/store/user-login-migration";
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
	name: "UserLoginMigrationConsent",
	layout: "loggedOut",
	components: { RenderHTML },
	props: {
		sourceSystem: {
			type: String,
		},
		targetSystem: {
			type: String,
			required: true,
		},
		origin: {
			type: String,
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
		const envConfigModule = injectStrict(ENV_CONFIG_MODULE_KEY);

		const getSystemName = (id: string): string => {
			return (
				systemsModule?.getSystems.find(
					(system: System): boolean => system.id === id
				)?.name ?? ""
			);
		};

		const isNewLoginFlowEnabled = !!envConfigModule.getClientUserLoginMigration;

		const proceedLink: ComputedRef<string | undefined> = computed(
			() => userMigrationModule?.getMigrationLinks.proceedLink
		);
		const cancelLink: ComputedRef<string | undefined> = computed(
			() => userMigrationModule?.getMigrationLinks.cancelLink
		);

		let pageType: MigrationPageOrigin;
		let migrationDescription: string;
		let canSkipMigration = false;
		if (props.origin === props.targetSystem) {
			pageType = MigrationPageOrigin.START_FROM_TARGET_SYSTEM;
			migrationDescription = "pages.userMigration.description.fromTarget";
		} else {
			pageType = props.mandatory
				? MigrationPageOrigin.START_FROM_SOURCE_SYSTEM_MANDATORY
				: MigrationPageOrigin.START_FROM_SOURCE_SYSTEM;
			migrationDescription = props.mandatory
				? "pages.userMigration.description.fromSourceMandatory"
				: "pages.userMigration.description.fromSource";
			canSkipMigration = !props.mandatory;
		}

		const isLoading: Ref<boolean> = ref(true);

		onMounted(async () => {
			await systemsModule?.fetchSystems();
			if (!isNewLoginFlowEnabled && props.sourceSystem) {
				await userMigrationModule?.fetchMigrationLinks({
					pageType,
					sourceSystem: props.sourceSystem,
					targetSystem: props.targetSystem,
				});
			}
			isLoading.value = false;
		});

		return {
			isLoading,
			migrationDescription,
			canSkipMigration,
			proceedLink,
			cancelLink,
			getSystemName,
			isNewLoginFlowEnabled,
		};
	},
});
</script>

<style lang="scss" scoped>
.container-max-width {
	max-width: var(--size-content-width-max);
}
</style>
