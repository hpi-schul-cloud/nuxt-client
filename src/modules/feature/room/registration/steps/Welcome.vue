<template>
	<div class="mb-10">
		<i18n-t keypath="pages.registrationExternalMembers.steps.welcome.heading" scope="global">
			<template #instance>
				{{ instance }}
			</template>
			<template #dataProtection>
				<a href="/privacypolicy" target="_blank" rel="noopener">
					{{ t("common.words.privacyPolicy") }}
				</a>
			</template>
			<template #tos>
				<a href="/termsofuse" target="_blank" rel="noopener"> {{ t("common.words.termsOfUse") }}</a>
			</template>
		</i18n-t>
	</div>
</template>

<script setup lang="ts">
import { useEnvConfig } from "@data-env";
import { computed } from "vue";
import { useI18n } from "vue-i18n";
const { t } = useI18n();
const instance = computed(() => useEnvConfig().value.SC_TITLE);
</script>
