<template>
	<div>
		<i18n-t keypath="pages.registrationExternalMembers.steps.welcome.description" scope="global">
			<template #dataProtection>
				<strong>
					{{ t("pages.registrationExternalMembers.steps.welcome.dataProtection") }}
				</strong>
			</template>
			<template #tos>
				<strong>
					{{ t("pages.registrationExternalMembers.steps.welcome.tos") }}
				</strong>
			</template>
		</i18n-t>
	</div>
</template>

<script setup lang="ts">
import { useI18n } from "vue-i18n";
const { t } = useI18n();
</script>
