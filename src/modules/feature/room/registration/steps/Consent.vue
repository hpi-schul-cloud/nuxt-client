<template>
	<p>
		{{ t("pages.registrationExternalMembers.steps.declarationOfConsent.firstParagraph", { instanceTitle }) }}
	</p>
	<i18n-t keypath="pages.registrationExternalMembers.steps.declarationOfConsent.secondParagraph" scope="global" tag="p">
		<template #userName>
			<strong>{{ userName }}</strong>
		</template>
	</i18n-t>
	<div class="d-flex flex-column ga-5 checkbox-container">
		<VCheckbox v-model="isPrivacyPolicyAccepted" :rules="validationRules" data-testid="privacy-policy-checkbox">
			<template #label>
				<div class="d-flex flex-column ga-1">
					<strong>
						<i18n-t
							keypath="pages.registrationExternalMembers.steps.declarationOfConsent.checkbox.consent"
							scope="global"
						>
							<template #dataProtectionLink>
								<a href="/privacypolicy" target="_blank" rel="noopener">
									{{ t("common.words.privacyPolicy") }}
								</a>
							</template>
						</i18n-t>
					</strong>
					<span class="text-medium-emphasis">
						<i18n-t
							keypath="pages.registrationExternalMembers.steps.declarationOfConsent.checkbox.consent.subtext"
							scope="global"
						>
							<template #instanceTitle>{{ instituteTitle }}</template>
							<template #email>
								<a :href="sanitizedSupportEmail">
									{{ instituteSupportEmail }}
								</a>
							</template>
							<template #faqLink>
								<a href="https://blog.dbildungscloud.de/faq-zum-datenschutz/" target="_blank" rel="noopener">
									{{ t("global.topbar.loggedOut.actions.faq") }}
								</a>
							</template>
						</i18n-t>
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
					<template #instanceTitle>
						{{ instanceTitle }}
					</template>
				</i18n-t>
			</template>
		</VCheckbox>
	</div>
</template>
<script setup lang="ts">
import { sanitizeUrl } from "@braintree/sanitize-url";
import { useEnvConfig, useEnvStore } from "@data-env";
import { isRequired } from "@util-validators";
import { storeToRefs } from "pinia";
import { computed } from "vue";
import { useI18n } from "vue-i18n";

const isTermsOfUseAccepted = defineModel("isTermsOfUseAccepted", { type: Boolean, required: true });
const isPrivacyPolicyAccepted = defineModel("isPrivacyPolicyAccepted", { type: Boolean, required: true });

type Props = {
	userName: string;
};

defineProps<Props>();

const { t } = useI18n();
const envConfig = useEnvConfig();
const instanceTitle = computed(() => envConfig.value.SC_TITLE);
const { instituteTitle, instituteSupportEmail } = storeToRefs(useEnvStore());
const EMAIL_SUBJECT = "Bildungscloud Anfrage";

const sanitizedSupportEmail = computed(() =>
	sanitizeUrl(`mailto:${instituteSupportEmail.value}?subject=${EMAIL_SUBJECT}`)
);

const validationRules = [
	// isRequired(t("pages.registrationExternalMembers.steps.declarationOfConsent.validation.required")), // Talk to UX about error message
	isRequired(""),
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
