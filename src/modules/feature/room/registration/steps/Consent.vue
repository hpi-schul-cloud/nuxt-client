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
								<a :href="currentInstanceTexts.privacyPolicyLink" target="_blank" rel="noopener">
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
							<template #instanceTitle>{{ currentInstanceTexts.title }}</template>
							<template #email>
								<a
									:href="`mailto:${currentInstanceTexts.email}?subject=${currentInstanceTexts.emailSubject}`"
									target="_blank"
									rel="noopener"
								>
									{{ currentInstanceTexts.email }}
								</a>
							</template>
							<template #faqLink>
								<a :href="currentInstanceTexts.faqLink" target="_blank" rel="noopener">
									{{ t("global.topbar.loggedOut.actions.faq") }}
								</a>
							</template>
						</i18n-t>
						<!-- {{ t("pages.registrationExternalMembers.steps.declarationOfConsent.checkbox.consent.subtext") }} -->
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
import { SchulcloudTheme } from "@/serverApi/v3";
import { useEnvConfig } from "@data-env";
import { isRequired } from "@util-validators";
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
const instance = computed<SchulcloudTheme>(() => envConfig.value.SC_THEME);

const instanceTextsMap: Record<SchulcloudTheme, Record<string, string>> = {
	[SchulcloudTheme.N21]: {
		title: "Niedersächsische Bildungscloud",
		termOfUseLink: "https://niedersachsen.cloud/termsofuse",
		email: "ticketsystem@niedersachsen.support",
		emailSubject: "Niedersächsische Bildungscloud Anfrage",
		privacyPolicyLink: "https://niedersachsen.cloud/privacypolicy",
		faqLink: "https://blog.dbildungscloud.de/faq-zum-datenschutz/",
	},
	[SchulcloudTheme.Brb]: {
		title: "Brandenburgische Bildungscloud",
		termOfUseLink: "/terms-of-use-brandenburg",
		email: "brb@xxx.de",
		emailSubject: "Brandenburgische Bildungscloud Anfrage",
		privacyPolicyLink: "/privacy-policy-brandenburg",
		faqLink: "/faq-brandenburg",
	},
	[SchulcloudTheme.Default]: {
		title: "Default Bildungscloud",
		termOfUseLink: "/terms-of-use-default",
		email: "default@xxx.de",
		emailSubject: "Default Bildungscloud Anfrage",
		privacyPolicyLink: "/privacy-policy-default",
		faqLink: "/faq-default",
	},
	[SchulcloudTheme.Thr]: {
		title: "Thüringer Bildungscloud",
		termOfUseLink: "/terms-of-use-thueringen",
		email: "thueringen@xxx.de",
		emailSubject: "Thüringer Bildungscloud Anfrage",
		privacyPolicyLink: "/privacy-policy-thueringen",
		faqLink: "/faq-thueringen",
	},
};

const currentInstanceTexts = computed(() => instanceTextsMap[instance.value]);

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
