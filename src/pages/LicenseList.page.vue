<template>
	<v-container class="align-center d-flex justify-center w-100">
		<div class="license-list w-100">
			<h1 class="d-flex justify-center">
				{{ t("pages.licenseList.title") }}
			</h1>
			<p>{{ t("pages.licenseList.introduction") }}</p>

			<v-expansion-panels multiple class="w-100 pb-9">
				<v-expansion-panel
					v-for="[name, item] in Object.entries(licenseData)"
					:key="name"
				>
					<v-expansion-panel-title>
						<div class="text-h4">{{ name }}</div>
						<template #actions="{ expanded }">
							<v-icon :icon="expanded ? mdiMinus : mdiPlus" />
						</template>
					</v-expansion-panel-title>
					<v-expansion-panel-text>
						<p style="white-space: pre-line">{{ item.licenseText }}</p>
						<p class="font-weight-bold">
							{{ t("pages.licenseList.packageIntroduction") }}
						</p>
						<div class="ga-2">
							<v-chip
								v-for="componentName in item.components"
								:key="componentName"
								label
								class="ma-1"
							>
								{{ componentName }}
							</v-chip>
						</div>
					</v-expansion-panel-text>
				</v-expansion-panel>
			</v-expansion-panels>
		</div>
	</v-container>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import axios from "axios";
import { useI18n } from "vue-i18n";
import {
	ENV_CONFIG_MODULE_KEY,
	NOTIFIER_MODULE_KEY,
	injectStrict,
} from "@/utils/inject";
import { mdiMinus, mdiPlus } from "@icons/material";

const envConfigModule = injectStrict(ENV_CONFIG_MODULE_KEY);
const notifierModule = injectStrict(NOTIFIER_MODULE_KEY);
const { t } = useI18n();

type LicenseDetails = {
	components: string[];
	licenseText: string;
};
type LicenseData = Record<string, LicenseDetails>;

const licenseData = ref<LicenseData>({});

const removeVersionNumbers = (data: LicenseData): LicenseData => {
	const result: LicenseData = {};
	for (const [licenseName, licenseDetails] of Object.entries(data)) {
		const components = licenseDetails.components.map((component) => {
			return component.replace(/@[\d.]+$/, "");
		});

		result[licenseName] = {
			components: [...new Set(components)],
			licenseText: licenseDetails.licenseText,
		};
	}
	return result;
};

const fetchLicenseData = async () => {
	try {
		const licensesUrl = envConfigModule.getEnv.LICENSE_SUMMARY_URL;
		if (!licensesUrl) throw new Error("License summary URL is not defined");

		licenseData.value = removeVersionNumbers(
			(await axios.get(licensesUrl as string)).data
		);
	} catch {
		notifierModule.show({
			text: t("error.load"),
			status: "error",
		});
	}
};

onMounted(async () => {
	fetchLicenseData();
});
</script>

<style lang="scss" scoped>
.license-list {
	max-width: 720px;
}
</style>
