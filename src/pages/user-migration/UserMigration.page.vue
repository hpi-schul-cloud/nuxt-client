<template>
	<div v-show="hasData" class="text-center mx-auto">
		<img src="@assets/img/migration/migration.svg" alt=""/>
		<h1 class="pl-4 pr-4">
			{{ $t("pages.userMigration.title") }}
		</h1>
		<div>
			<p
				class="text-left pa-4"
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
										? "pages.userMigration.button.logout"
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
import { useApplicationError } from "@/composables/application-error.composable";
import SystemsModule from "@/store/systems";
import { HttpStatusCode } from "@/store/types/http-status-code.enum";
import UserMigrationModule from "@/store/user-migration";
import { System } from "@store/types/system";
import { MigrationPageOrigin } from "@store/types/user-migration";
import {
	computed,
	ComputedRef,
	ref,
	Ref,
	defineComponent,
	inject,
	onMounted,
} from "@vue/composition-api";

export default defineComponent({
	name: "UserMigration",
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
		const { createApplicationError } = useApplicationError();
		if (!props.targetSystem || !props.sourceSystem || !props.origin) {
			throw createApplicationError(HttpStatusCode.BadRequest);
		}

		const systemsModule: SystemsModule | undefined =
			inject<SystemsModule>("systemsModule");
		const userMigrationModule: UserMigrationModule | undefined =
			inject<UserMigrationModule>("userMigrationModule");
		if (!systemsModule || !userMigrationModule) {
			throw createApplicationError(
				HttpStatusCode.InternalServerError,
				"error.generic",
				"Injection of dependencies failed"
			);
		}

		const getSystemName = (id: string): string => {
			return (
				systemsModule.getSystems.find(
					(system: System): boolean => system.id === id
				)?.name ?? ""
			);
		};

		const proceedLink: ComputedRef<string> = computed(
			() => userMigrationModule.getMigrationLinks.proceedLink
		);
		const cancelLink: ComputedRef<string> = computed(
			() => userMigrationModule.getMigrationLinks.cancelLink
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
		} else if (props.origin === props.targetSystem) {
			pageType = MigrationPageOrigin.START_FROM_TARGET_SYSTEM;
			migrationDescription = "pages.userMigration.description.fromTarget";
		} else {
			throw createApplicationError(
				HttpStatusCode.BadRequest,
				"error.400",
				`Unknown origin system ${props.origin}. Expected ${props.sourceSystem} or ${props.targetSystem}`
			);
		}

		const hasData: Ref<boolean> = ref(false);

		onMounted(async () => {
			await Promise.all([
				systemsModule.fetchSystems(),
				userMigrationModule.fetchMigrationLinks({
					pageType,
					sourceSystem: props.sourceSystem,
					targetSystem: props.targetSystem,
				}),
			]);
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
