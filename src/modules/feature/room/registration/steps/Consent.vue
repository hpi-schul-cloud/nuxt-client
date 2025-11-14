<template>
	<p>
		{{ t("pages.registrationExternalMembers.steps.declarationOfConsent.firstParagraph", { instance }) }}
	</p>
	<i18n-t keypath="pages.registrationExternalMembers.steps.declarationOfConsent.secondParagraph" scope="global" tag="p">
		<template #userName>
			<strong>Teresa Tischlerin</strong>
		</template>
	</i18n-t>
	<div class="d-flex flex-column ga-5 checkbox-container">
		<VCheckbox v-model="isPrivacyPolicyAccepted" :rules="validationRules" data-testid="privacy-policy-checkbox">
			<template #label>
				<div class="d-flex flex-column ga-1">
					<strong>
						Ich erkläre mich damit einverstanden, dass meine personenbezogenen Daten zum Zwecke der Registrierung und
						Nutzung der dBildungscloud verarbeitet und gespeichert werden. Ich habe die Datenschutzerklärung und die
						Nutzungsbedingungen gelesen und akzeptiere diese.
					</strong>

					<span class="text-medium-emphasis">
						Nulla consequat massa quis enim. Donec pede justo, fringilla vel, aliquet nec, vulputate eget, arcu. In enim
						justo, rhoncus ut, imperdiet a, venenatis vitae, justo. Nullam dictum felis eu pede mollis pretium. Integer
						tincidunt. Cras dapibus. Vivamus elementum semper nisi. Aenean vulputate eleifend tellus. Aenean leo ligula,
						porttitor eu, consequat vitae, eleifend ac, enim. Aliquam lorem ante, dapibus in, viverra quis, feugiat a,
						tellus. Phasellus viverra nulla ut metus varius laoreet. Quisque rutrum. Aenean imperdiet. Etiam ultricies
						nisi vel augue. Curabitur ullamcorper ultricies nisi. Nam eget dui. Etiam rhoncus..
					</span>
				</div>
			</template>
		</VCheckbox>
		<VCheckbox v-model="isTermsOfUseAccepted" :rules="validationRules" data-testid="terms-of-use-checkbox">
			<template #label>
				<i18n-t
					keypath="pages.registrationExternalMembers.steps.declarationOfConsent.checkbox.termsOfUse"
					scope="global"
					tag="strong"
				>
					<template #termsOfUse>
						<a href="/termsofuse" target="_blank" rel="noopener"> {{ t("common.words.termsOfUse") }}</a>
					</template>
					<template #instance>
						{{ instance }}
					</template>
				</i18n-t>
			</template>
		</VCheckbox>
	</div>
</template>
<script setup lang="ts">
import { useEnvConfig } from "@data-env";
import { isRequired } from "@util-validators";
import { computed } from "vue";
import { useI18n } from "vue-i18n";

const isTermsOfUseAccepted = defineModel("isTermsOfUseAccepted", { type: Boolean, required: true });
const isPrivacyPolicyAccepted = defineModel("isPrivacyPolicyAccepted", { type: Boolean, required: true });

const { t } = useI18n();
const instance = computed(() => useEnvConfig().value.SC_TITLE);

const validationRules = [
	isRequired(t("pages.registrationExternalMembers.steps.declarationOfConsent.validation.required")), // Talk to UX about error message
];
</script>

<style scoped lang="scss">
.checkbox-container .v-checkbox {
	:deep(.v-selection-control) {
		align-items: flex-start;
	}

	:deep(.v-label) {
		margin-top: 8px;
		align-items: flex-start;
	}
}
</style>
