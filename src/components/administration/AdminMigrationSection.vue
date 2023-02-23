<template>
	<div>
		<h2 class="text-h4 mb-10">
			{{ t("components.administration.adminMigrationSection.headers") }}
		</h2>
		<p
			v-html="t('components.administration.adminMigrationSection.description')"
		></p>
		<div v-if="!isMigrationAvailable">
			<v-alert light prominent text type="info">
				<span
					v-html="t('components.administration.adminMigrationSection.infoText')"
				/>
			</v-alert>
		</div>
		<div v-else>
			<v-alert light prominent text type="info">
				<span
					v-html="
						t('components.administration.adminMigrationSection.migrationActive')
					"
				/>
			</v-alert>
		</div>
		<v-btn
			v-if="isShowStartButton"
			class="my-5 button-start"
			color="primary"
			depressed
			:disabled="!isMigrationEnabled"
			data-testid="migration-start-button"
			@click="onToggleShowStartWarning"
		>
			{{
				t(
					"components.administration.adminMigrationSection.migrationEnableButton.label"
				)
			}}
		</v-btn>

		<v-btn
			v-if="isShowEndButton"
			class="my-5 button-end"
			color="primary"
			depressed
			:disabled="!isMigrationAvailable"
			data-testid="migration-end-button"
			@click="onToggleShowEndWarning"
		>
			{{
				t(
					"components.administration.adminMigrationSection.migrationEndButton.label"
				)
			}}
		</v-btn>

		<v-switch
			v-show="isShowMandatorySwitch"
			:label="
				t(
					'components.administration.adminMigrationSection.mandatorySwitch.label'
				)
			"
			:disabled="!isMigrationAvailable"
			:true-value="true"
			:false-value="false"
			:value="isMigrationMandatory"
			inset
			dense
			class="ml-1"
			data-testid="migration-mandatory-switch"
			@change="setMigration(true, !isMigrationMandatory)"
		></v-switch>

		<p
			v-if="oauthMigrationFinished"
			class="migration-completion-date"
			data-testid="migration-finished-timestamp"
		>
			{{
				t(
					"components.administration.adminMigrationSection.oauthMigrationFinished.text",
					{
						date: dayjs(oauthMigrationFinished).format("DD.MM.YYYY"),
						time: dayjs(oauthMigrationFinished).format("HH:mm"),
					}
				)
			}}
		</p>

		<migration-start-warning-card
			v-if="isShowStartWarning"
			data-testid="migration-start-warning-card"
			@start="onToggleShowStartWarning"
			@set="setMigration(true, isMigrationMandatory)"
		></migration-start-warning-card>

		<migration-end-warning-card
			v-if="isShowEndWarning"
			data-testid="migration-end-warning-card"
			@end="onToggleShowEndWarning"
			@set="setMigration(false, isMigrationMandatory)"
		></migration-end-warning-card>
	</div>
</template>

<script lang="ts">
import {
	computed,
	ComputedRef,
	defineComponent,
	inject,
	onMounted,
	ref,
	Ref,
} from "vue";
import SchoolsModule from "@/store/schools";
import VueI18n from "vue-i18n";
import { MigrationBody } from "@/serverApi/v3";
import MigrationStartWarningCard from "@/components/administration/MigrationStartWarningCard.vue";
import MigrationEndWarningCard from "@/components/administration/MigrationEndWarningCard.vue";
import dayjs from "dayjs";

// eslint-disable-next-line vue/require-direct-export
export default defineComponent({
	name: "AdminMigrationSection",
	components: { MigrationStartWarningCard, MigrationEndWarningCard },
	setup() {
		const i18n: VueI18n | undefined = inject<VueI18n>("i18n");
		const schoolsModule: SchoolsModule | undefined =
			inject<SchoolsModule>("schoolsModule");
		if (!schoolsModule || !i18n) {
			throw new Error("Injection of dependencies failed");
		}

		onMounted(async () => {
			await schoolsModule.fetchSchoolOAuthMigration();
		});

		// TODO: https://ticketsystem.dbildungscloud.de/browse/BC-443
		const t = (key: string, values?: VueI18n.Values | undefined): string => {
			const translateResult = i18n.t(key, values);
			if (typeof translateResult === "string") {
				return translateResult;
			}
			return "unknown translation-key:" + key;
		};

		const isMigrationEnabled: ComputedRef<boolean> = computed(
			() => schoolsModule.getOauthMigration.enableMigrationStart
		);

		const isMigrationAvailable: ComputedRef<boolean> = computed(
			() => schoolsModule.getOauthMigration.oauthMigrationPossible
		);

		const isMigrationMandatory: ComputedRef<boolean> = computed(
			() => schoolsModule.getOauthMigration.oauthMigrationMandatory
		);

		const oauthMigrationFinished: ComputedRef<string> = computed(
			() => schoolsModule.getOauthMigration.oauthMigrationFinished ?? ""
		);

		const setMigration = (available: boolean, mandatory: boolean) => {
			const migrationFlags: MigrationBody = {
				oauthMigrationPossible: available,
				oauthMigrationMandatory: mandatory,
				oauthMigrationFinished: !available,
			};
			schoolsModule.setSchoolOauthMigration(migrationFlags);
		};

		const isShowEndWarning: Ref<boolean> = ref(false);

		const onToggleShowEndWarning = () => {
			isShowEndWarning.value = !isShowEndWarning.value;
		};

		const isShowStartWarning: Ref<boolean> = ref(false);

		const onToggleShowStartWarning = () => {
			isShowStartWarning.value = !isShowStartWarning.value;
		};

		const isShowStartButton: ComputedRef<boolean> = computed(
			() =>
				!isMigrationAvailable.value &&
				!isShowEndWarning.value &&
				!isShowStartWarning.value
		);

		const isShowEndButton: ComputedRef<boolean> = computed(
			() =>
				isMigrationAvailable.value &&
				!isShowEndWarning.value &&
				!isShowStartWarning.value
		);

		const isShowMandatorySwitch: ComputedRef<boolean> = computed(
			() => !isShowEndWarning.value && !isShowStartWarning.value
		);

		return {
			isMigrationEnabled,
			setMigration,
			isMigrationAvailable,
			isMigrationMandatory,
			t,
			isShowEndWarning,
			onToggleShowEndWarning,
			isShowStartWarning,
			onToggleShowStartWarning,
			oauthMigrationFinished,
			isShowStartButton,
			isShowEndButton,
			isShowMandatorySwitch,
			dayjs,
		};
	},
});
</script>
