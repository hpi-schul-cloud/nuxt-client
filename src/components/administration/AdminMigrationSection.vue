<template>
	<div>
		<h2 class="text-h4 mb-10">
			{{ t("components.administration.adminMigrationSection.headers") }}
		</h2>
		<div
			v-if="!isCurrentDateAfterFinalFinish"
			data-testId="migration-control-section"
		>
			<RenderHTML
				data-testid="text-description"
				:html="
					t('components.administration.adminMigrationSection.description', {
						supportLink,
					})
				"
				component="p"
			/>
			<div v-if="!oauthMigration.oauthMigrationPossible">
				<v-alert light prominent text type="info">
					<RenderHTML
						:html="
							t('components.administration.adminMigrationSection.infoText')
						"
						component="span"
					/>
				</v-alert>
			</div>
			<div v-else>
				<v-alert light prominent text type="info">
					<RenderHTML
						data-testid="migration-active-status"
						:html="
							t(
								'components.administration.adminMigrationSection.migrationActive'
							)
						"
						component="span"
					/>
				</v-alert>
			</div>
			<v-btn
				v-if="isShowStartButton"
				class="my-5 button-start"
				color="primary"
				depressed
				:disabled="!oauthMigration.enableMigrationStart"
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
			/>
		</div>
		<RenderHTML
			v-if="oauthMigration.oauthMigrationFinished"
			class="migration-completion-date"
			data-testid="migration-finished-timestamp"
			:html="
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
			component="p"
		/>
		<migration-warning-card
			value="start"
			v-if="isShowStartWarning"
			data-testid="migration-start-warning-card"
			@start="onToggleShowStartWarning"
			@set="setMigration(true, false)"
		/>
		<migration-warning-card
			value="end"
			v-if="isShowEndWarning"
			data-testid="migration-end-warning-card"
			@end="onToggleShowEndWarning"
			@set="setMigration(false, oauthMigration.oauthMigrationMandatory)"
		/>
		<v-switch
			v-if="
				!isCurrentDateAfterFinalFinish &
				globalFeatureEnableLdapSyncDuringMigration
			"
			:label="
				t(
					'components.administration.adminMigrationSection.enableSyncDuringMigration.label'
				)
			"
			:disabled="!oauthMigration.oauthMigrationPossible"
			v-model="school.features.enableLdapSyncDuringMigration"
			inset
			dense
			class="ml-1"
			data-testid="enable-sync-during-migration-switch"
			@change="setSchoolFeatures"
		/>
		<v-switch
			v-if="globalFeatureShowOutdatedUsers"
			:label="
				t(
					'components.administration.adminMigrationSection.showOutdatedUsers.label'
				)
			"
			v-model="school.features.showOutdatedUsers"
			inset
			dense
			class="ml-1"
			data-testid="show-outdated-users-switch"
			@change="setSchoolFeatures"
		/>
		<p
			v-if="globalFeatureShowOutdatedUsers"
			data-testid="show-outdated-users-description"
		>
			{{
				t(
					"components.administration.adminMigrationSection.showOutdatedUsers.description"
				)
			}}
		</p>
	</div>
</template>

<script lang="ts">
import { MigrationBody } from "@/serverApi/v3";
import SchoolsModule from "@/store/schools";
import { OauthMigration, School } from "@/store/types/schools";
import { ENV_CONFIG_MODULE_KEY, I18N_KEY, injectStrict } from "@/utils/inject";
import dayjs from "dayjs";
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
import VueI18n from "vue-i18n";
import MigrationWarningCard from "./MigrationWarningCard.vue";
import { RenderHTML } from "@feature-render-html";

export default defineComponent({
	name: "AdminMigrationSection",
	components: {
		MigrationWarningCard,
		RenderHTML,
	},
	setup() {
		const i18n = injectStrict(I18N_KEY);
		const envConfigModule = injectStrict(ENV_CONFIG_MODULE_KEY);
		const schoolsModule: SchoolsModule | undefined =
			inject<SchoolsModule>("schoolsModule");
		if (!schoolsModule || !i18n) {
			throw new Error("Injection of dependencies failed");
		}

		onMounted(async () => {
			await schoolsModule.fetchSchoolOAuthMigration();
		});

		// TODO: https://ticketsystem.dbildungscloud.de/browse/BC-443
		const t = (key: string, values?: VueI18n.Values): string =>
			i18n.tc(key, 0, values);

		const oauthMigration: ComputedRef<OauthMigration> = computed(
			() => schoolsModule.getOauthMigration
		);

		const setMigration = async (available: boolean, mandatory: boolean) => {
			const migrationFlags: MigrationBody = {
				oauthMigrationPossible: available,
				oauthMigrationMandatory: mandatory,
				oauthMigrationFinished: !available,
			};
			await schoolsModule.setSchoolOauthMigration(migrationFlags);
			await schoolsModule.fetchSchool();
		};

		const school: ComputedRef<School> = computed(() => schoolsModule.getSchool);
		watch(school, async () => {
			await schoolsModule.fetchSchoolOAuthMigration();
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
		const schoolNumber: ComputedRef<string | undefined> = computed(
			() => schoolsModule.getSchool.officialSchoolNumber
		);
		const getSubject = (): string => {
			const subject = encodeURIComponent(
				`Schule mit der Nummer: ${
					schoolNumber.value ?? "???"
				} soll keine Migration durchführen, Schuladministrator bittet um Unterstützung!`
			);

			return subject;
		};

		const supportLink: ComputedRef<string> = computed(
			() =>
				`mailto:${
					envConfigModule.getAccessibilityReportEmail
				}?subject=${getSubject()}`
		);

		const globalFeatureEnableLdapSyncDuringMigration: ComputedRef<boolean> =
			computed(() => envConfigModule.getEnableLdapSyncDuringMigration);

		const globalFeatureShowOutdatedUsers: ComputedRef<boolean> = computed(
			() => envConfigModule.getShowOutdatedUsers
		);

		const setSchoolFeatures = async () => {
			await schoolsModule.update({
				id: school.value.id,
				features: school.value.features,
			});
		};

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
			supportLink,
			school,
			setSchoolFeatures,
			globalFeatureShowOutdatedUsers,
			globalFeatureEnableLdapSyncDuringMigration,
		};
	},
});
</script>
