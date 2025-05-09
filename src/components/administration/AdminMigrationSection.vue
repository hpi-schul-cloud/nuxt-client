<template>
	<div v-if="!isGracePeriodExpired" data-testId="migration-control-section">
		<div data-testid="text-description">
			<p class="mb-0">
				{{
					t(
						"components.administration.adminMigrationSection.description.firstPart"
					)
				}}
			</p>
			<p>
				{{
					t(
						"components.administration.adminMigrationSection.description.secondPart"
					)
				}}
			</p>
			<i18n-t
				keypath="components.administrationSection.description.support"
				scope="global"
				tag="p"
				class="text-red font-weight-bold"
			>
				<a :href="supportLink" data-testid="support-link">
					{{ t("components.administrationSection.description.support.link") }}
				</a>
			</i18n-t>
			<i18n-t
				keypath="components.administrationSection.description.moreInformation"
				scope="global"
				tag="p"
			>
				<a
					data-testid="migration-blog-link"
					href="https://blog.niedersachsen.cloud/umzug"
					target="_blank"
					rel="noopener"
				>
					{{
						t(
							"components.administrationSection.description.moreInformation.link"
						)
					}}
				</a>
			</i18n-t>
		</div>
		<div v-if="isStartButtonVisible">
			<InfoAlert data-testid="migration-info-text">
				<p>
					{{
						t(
							"components.administration.adminMigrationSection.infoText.firstParagraph"
						)
					}}
				</p>
				<p>
					{{
						t(
							"components.administration.adminMigrationSection.infoText.secondParagraph"
						)
					}}
				</p>
				<i18n-t
					keypath="components.administration.adminMigrationSection.infoText.thirdParagraph"
					scope="global"
					tag="p"
				>
					<a :href="contactEmailLink">
						{{ t("components.administrationSection.description.support.link") }}
					</a>
				</i18n-t>
				<p class="text-red">
					{{
						t(
							"components.administration.adminMigrationSection.infoText.fourthParagraph"
						)
					}}
				</p>
			</InfoAlert>
		</div>
		<div v-else-if="isMigrationActive">
			<InfoAlert data-testid="migration-active-status">
				{{
					t("components.administration.adminMigrationSection.migrationActive")
				}}
			</InfoAlert>
		</div>
		<v-btn
			v-if="isStartButtonVisible"
			class="my-4 button-start"
			color="primary"
			variant="flat"
			:disabled="!officialSchoolNumber"
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
			v-if="isEndButtonVisible"
			class="my-4 button-end"
			color="primary"
			variant="flat"
			:disabled="!isMigrationActive"
			data-testid="migration-end-button"
			@click="onToggleShowEndWarning"
		>
			{{
				t(
					"components.administration.adminMigrationSection.migrationEndButton.label"
				)
			}}
		</v-btn>
		<v-alert
			v-if="error && error.message"
			type="error"
			:icon="mdiAlertCircle"
			data-testid="error-alert"
		>
			<div class="alert-text">
				<span data-testid="migration-error-text">
					{{ t(getBusinessErrorTranslationKey(error)!) }}
				</span>
			</div>
		</v-alert>
		<v-switch
			v-show="isShowMandatorySwitch"
			:label="
				t(
					'components.administration.adminMigrationSection.mandatorySwitch.label'
				)
			"
			:disabled="!isMigrationActive"
			:true-value="true"
			:false-value="false"
			:true-icon="mdiCheck"
			:model-value="isMigrationMandatory"
			class="ml-1"
			data-testid="migration-mandatory-switch"
			@update:model-value="setMigrationMandatory(!isMigrationMandatory)"
		/>
	</div>

	<migration-warning-card
		v-if="isStartWarningVisible"
		value="start"
		data-testid="migration-start-warning-card"
		@start="onToggleShowStartWarning"
		@set="onStartMigration()"
	/>

	<migration-warning-card
		v-if="isEndWarningVisible"
		value="end"
		data-testid="migration-end-warning-card"
		@end="onToggleShowEndWarning"
		@set="onCloseMigration()"
	/>

	<div
		v-if="
			userLoginMigration &&
			userLoginMigration.closedAt &&
			userLoginMigration.finishedAt
		"
		class="migration-completion-date"
		data-testid="migration-finished-timestamp"
	>
		<p class="mb-0">
			{{
				t(
					"components.administration.adminMigrationSection.oauthMigrationFinished.text.firstParagraph",
					{
						date: dayjs(userLoginMigration.closedAt).format("DD.MM.YYYY"),
						time: dayjs(userLoginMigration.closedAt).format("HH:mm"),
					}
				)
			}}
		</p>
		<p>
			{{
				t(`${latestMigration}.secondParagraph`, {
					finishDate: dayjs(userLoginMigration.finishedAt).format("DD.MM.YYYY"),
					finishTime: dayjs(userLoginMigration.finishedAt).format("HH:mm"),
				})
			}}
		</p>
	</div>

	<v-switch
		v-if="!isGracePeriodExpired && globalFeatureEnableLdapSyncDuringMigration"
		v-model="school.featureObject.enableLdapSyncDuringMigration"
		:label="
			t(
				'components.administration.adminMigrationSection.enableSyncDuringMigration.label'
			)
		"
		:disabled="!isMigrationActive"
		class="ml-1"
		:true-icon="mdiCheck"
		data-testid="enable-sync-during-migration-switch"
		@update:model-value="setSchoolFeatures"
	/>

	<template v-if="showMigrationWizard && !isMigrationFinished">
		<v-btn
			:disabled="!isMigrationActive || !isSchoolMigrated"
			class="my-4"
			color="primary"
			variant="flat"
			data-testid="migration-wizard-button"
			:to="{ name: 'administration-migration' }"
		>
			{{
				t(
					"components.administration.adminMigrationSection.migrationWizardButton.label"
				)
			}}
		</v-btn>
		<p>
			{{
				t(
					"components.administration.adminMigrationSection.migrationWizardButton.description"
				)
			}}
		</p>
	</template>

	<v-switch
		v-if="globalFeatureShowOutdatedUsers"
		v-model="school.featureObject.showOutdatedUsers"
		:label="
			t(
				'components.administration.adminMigrationSection.showOutdatedUsers.label'
			)
		"
		class="ml-1"
		:true-icon="mdiCheck"
		data-testid="show-outdated-users-switch"
		@update:model-value="setSchoolFeatures"
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
</template>

<script lang="ts">
import { mdiAlertCircle, mdiCheck } from "@icons/material";
import { useUserLoginMigrationMappings } from "@/composables/user-login-migration-mappings.composable";
import { BusinessError } from "@/store/types/commons";
import { School } from "@/store/types/schools";
import { UserLoginMigration } from "@/store/user-login-migration";
import {
	ENV_CONFIG_MODULE_KEY,
	injectStrict,
	SCHOOLS_MODULE_KEY,
	USER_LOGIN_MIGRATION_MODULE_KEY,
} from "@/utils/inject";
import { mapSchoolFeatureObjectToArray } from "@/utils/school-features";
import dayjs from "dayjs";
import {
	computed,
	ComputedRef,
	defineComponent,
	onMounted,
	ref,
	Ref,
} from "vue";
import { useI18n } from "vue-i18n";
import MigrationWarningCard from "./MigrationWarningCard.vue";
import { InfoAlert } from "@ui-alert";
import { sanitizeUrl } from "@braintree/sanitize-url";

export default defineComponent({
	name: "AdminMigrationSection",
	components: {
		MigrationWarningCard,
		InfoAlert,
	},
	setup() {
		const { t } = useI18n();
		const envConfigModule = injectStrict(ENV_CONFIG_MODULE_KEY);
		const schoolsModule = injectStrict(SCHOOLS_MODULE_KEY);
		const userLoginMigrationModule = injectStrict(
			USER_LOGIN_MIGRATION_MODULE_KEY
		);

		onMounted(async () => {
			await userLoginMigrationModule.fetchLatestUserLoginMigrationForSchool();
		});

		const userLoginMigration: ComputedRef<UserLoginMigration | undefined> =
			computed(() => userLoginMigrationModule.getUserLoginMigration);

		const isMigrationActive: ComputedRef<boolean> = computed(
			() =>
				!!userLoginMigration.value?.startedAt &&
				!userLoginMigration.value.closedAt
		);

		const isMigrationMandatory: ComputedRef<boolean> = computed(
			() => !!userLoginMigration.value?.mandatorySince
		);

		const error: ComputedRef<BusinessError | undefined> = computed(() =>
			userLoginMigrationModule.getBusinessError.message
				? userLoginMigrationModule.getBusinessError
				: undefined
		);

		const { getBusinessErrorTranslationKey } = useUserLoginMigrationMappings();

		const onStartMigration = () => {
			if (userLoginMigration.value) {
				userLoginMigrationModule.restartUserLoginMigration();
			} else {
				userLoginMigrationModule.startUserLoginMigration();
			}
		};

		const setMigrationMandatory = (mandatory: boolean) => {
			userLoginMigrationModule.setUserLoginMigrationMandatory(mandatory);
		};

		const onCloseMigration = () => {
			userLoginMigrationModule.closeUserLoginMigration();
		};

		const school: ComputedRef<School> = computed(() => schoolsModule.getSchool);

		const isEndWarningVisible: Ref<boolean> = ref(false);

		const onToggleShowEndWarning = () => {
			isEndWarningVisible.value = !isEndWarningVisible.value;
		};

		const isStartWarningVisible: Ref<boolean> = ref(false);

		const onToggleShowStartWarning = () => {
			isStartWarningVisible.value = !isStartWarningVisible.value;
		};

		const isEndButtonVisible: ComputedRef<boolean> = computed(
			() =>
				isMigrationActive.value &&
				!isEndWarningVisible.value &&
				!isStartWarningVisible.value
		);

		const isStartButtonVisible: ComputedRef<boolean> = computed(
			() =>
				!isEndButtonVisible.value &&
				!isEndWarningVisible.value &&
				!isStartWarningVisible.value
		);

		const isShowMandatorySwitch: ComputedRef<boolean> = computed(
			() => !isEndWarningVisible.value && !isStartWarningVisible.value
		);

		const isGracePeriodExpired: ComputedRef<boolean> = computed(() => {
			if (userLoginMigration.value?.finishedAt) {
				return (
					Date.now() >= new Date(userLoginMigration.value.finishedAt).getTime()
				);
			}

			return false;
		});

		const latestMigration: ComputedRef<string> = computed(() => {
			if (isGracePeriodExpired.value) {
				return "components.administration.adminMigrationSection.oauthMigrationFinished.textComplete";
			} else {
				return "components.administration.adminMigrationSection.oauthMigrationFinished.text";
			}
		});

		const officialSchoolNumber: ComputedRef<string | undefined> = computed(
			() => schoolsModule.getSchool.officialSchoolNumber
		);

		const getSubject = (): string => {
			const subject = encodeURIComponent(
				`Schule mit der Nummer: ${
					officialSchoolNumber.value ?? "???"
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

		const isSchoolMigrated: ComputedRef<boolean> = computed(() => {
			let hasTargetSystem = false;

			if (userLoginMigration.value?.targetSystemId) {
				hasTargetSystem = schoolsModule.getSchool.systemIds.includes(
					userLoginMigration.value.targetSystemId
				);
			}

			return hasTargetSystem;
		});

		const showMigrationWizard: ComputedRef<boolean> = computed(
			() => !!envConfigModule.getEnv.FEATURE_SHOW_MIGRATION_WIZARD
		);

		const isMigrationFinished: ComputedRef<boolean> = computed(
			() => !!userLoginMigration.value?.finishedAt
		);

		const setSchoolFeatures = async () => {
			await schoolsModule.update({
				id: school.value.id,
				props: {
					features: mapSchoolFeatureObjectToArray(school.value.featureObject),
				},
			});
		};

		const contactEmailLink: ComputedRef<string> = computed(() =>
			sanitizeUrl(
				`mailto:${envConfigModule.getContactEmail}}?subject=Schulnummer nicht korrekt`
			)
		);

		return {
			userLoginMigration,
			onStartMigration,
			setMigrationMandatory,
			onCloseMigration,
			t,
			isEndWarningVisible,
			onToggleShowEndWarning,
			isStartWarningVisible,
			onToggleShowStartWarning,
			isStartButtonVisible,
			isEndButtonVisible,
			isShowMandatorySwitch,
			isGracePeriodExpired,
			latestMigration,
			dayjs,
			supportLink,
			school,
			setSchoolFeatures,
			globalFeatureShowOutdatedUsers,
			globalFeatureEnableLdapSyncDuringMigration,
			officialSchoolNumber,
			isMigrationActive,
			isMigrationMandatory,
			mdiCheck,
			showMigrationWizard,
			isMigrationFinished,
			isSchoolMigrated,
			error,
			getBusinessErrorTranslationKey,
			mdiAlertCircle,
			contactEmailLink,
		};
	},
});
</script>

<style lang="scss" scoped>
.alert-text {
	color: rgba(var(--v-theme-on-background)) !important;
	line-height: var(--line-height-lg) !important;
}
</style>
