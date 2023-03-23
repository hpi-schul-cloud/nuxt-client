<template>
	<div>
		<h2 class="text-h4 mb-10">
			{{ t("components.administration.adminMigrationSection.headers") }}
		</h2>
		<p
			v-html="t('components.administration.adminMigrationSection.description')"
		></p>
		<div v-if="!oauthMigration.oauthMigrationPossible">
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
			:disabled="
				!oauthMigration.enableMigrationStart || isCurrentDateAfterFinalFinish
			"
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
			:disabled="!oauthMigration.oauthMigrationPossible"
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
			:disabled="!oauthMigration.oauthMigrationPossible"
			:true-value="true"
			:false-value="false"
			:value="oauthMigration.oauthMigrationMandatory"
			inset
			dense
			class="ml-1"
			data-testid="migration-mandatory-switch"
			@change="setMigration(true, !oauthMigration.oauthMigrationMandatory)"
		></v-switch>

		<p
			v-if="oauthMigration.oauthMigrationFinished"
			class="migration-completion-date"
			data-testid="migration-finished-timestamp"
			v-html="
				t(finalFinishText, {
					date: dayjs(oauthMigration.oauthMigrationFinished).format(
						'DD.MM.YYYY'
					),
					time: dayjs(oauthMigration.oauthMigrationFinished).format('HH:mm'),
					finishDate: dayjs(oauthMigration.oauthMigrationFinalFinish).format(
						'DD.MM.YYYY'
					),
					finishTime: dayjs(oauthMigration.oauthMigrationFinalFinish).format(
						'HH:mm'
					),
				})
			"
		></p>

		<migration-warning-card
			value="start"
			v-if="isShowStartWarning"
			data-testid="migration-start-warning-card"
			@start="onToggleShowStartWarning"
			@set="setMigration(true, false)"
		></migration-warning-card>

		<migration-warning-card
			value="end"
			v-if="isShowEndWarning"
			data-testid="migration-end-warning-card"
			@end="onToggleShowEndWarning"
			@set="setMigration(false, oauthMigration.oauthMigrationMandatory)"
		></migration-warning-card>
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
	watch,
} from "vue";
import SchoolsModule from "@/store/schools";
import VueI18n from "vue-i18n";
import { MigrationBody } from "@/serverApi/v3";
import dayjs from "dayjs";
import { OauthMigration, School } from "@/store/types/schools";
import MigrationWarningCard from "./MigrationWarningCard.vue";

export default defineComponent({
	name: "AdminMigrationSection",
	components: {
		MigrationWarningCard,
	},
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

		const oauthMigration: ComputedRef<OauthMigration> = computed(
			() => schoolsModule.getOauthMigration
		);

		const oauthMigrationFinalFinish: ComputedRef<string> = computed(
			() => schoolsModule.getOauthMigration.oauthMigrationFinalFinish ?? ""
		);

		const setMigration = (available: boolean, mandatory: boolean) => {
			const migrationFlags: MigrationBody = {
				oauthMigrationPossible: available,
				oauthMigrationMandatory: mandatory,
				oauthMigrationFinished: !available,
			};
			schoolsModule.setSchoolOauthMigration(migrationFlags);
		};

		const school: ComputedRef<School> = computed(() => schoolsModule.getSchool);
		watch(school, () => {
			schoolsModule.fetchSchoolOAuthMigration();
		});

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
				!oauthMigration.value.oauthMigrationPossible &&
				!isShowEndWarning.value &&
				!isShowStartWarning.value
		);

		const isShowEndButton: ComputedRef<boolean> = computed(
			() =>
				oauthMigration.value.oauthMigrationPossible &&
				!isShowEndWarning.value &&
				!isShowStartWarning.value
		);

		const isShowMandatorySwitch: ComputedRef<boolean> = computed(
			() => !isShowEndWarning.value && !isShowStartWarning.value
		);

		const isCurrentDateAfterFinalFinish: ComputedRef<boolean> = computed(() => {
			if (schoolsModule.getOauthMigration.oauthMigrationFinalFinish) {
				return (
					Date.now() >=
					new Date(
						schoolsModule.getOauthMigration.oauthMigrationFinalFinish
					).getTime()
				);
			} else {
				return false;
			}
		});

		const finalFinishText: ComputedRef<string> = computed(() => {
			if (isCurrentDateAfterFinalFinish.value) {
				return "components.administration.adminMigrationSection.oauthMigrationFinished.textComplete";
			} else {
				return "components.administration.adminMigrationSection.oauthMigrationFinished.text";
			}
		});

		return {
			oauthMigration,
			setMigration,
			t,
			isShowEndWarning,
			onToggleShowEndWarning,
			isShowStartWarning,
			onToggleShowStartWarning,
			isShowStartButton,
			isShowEndButton,
			isShowMandatorySwitch,
			isCurrentDateAfterFinalFinish,
			finalFinishText,
			dayjs,
		};
	},
});
</script>
