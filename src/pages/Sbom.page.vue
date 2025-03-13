<template>
	<div class="ma-16">
		<h1>SBOM</h1>

		<div v-for="(license, index) in licenseList" :key="index">
			<div>
				<v-expansion-panels>
					<v-expansion-panel :title="license.licenseName" />
				</v-expansion-panels>
			</div>

			<br />
		</div>
	</div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import { envConfigModule } from "@/store";

const licensesUrl = envConfigModule.getEnv.LICENSE_SUMMARY_URL as string;

interface LicenceData {
	[key: string]: {
		components: string[];
		licenseText: string;
	};
}

const licenceData = ref<LicenceData>({});
const licenseNameList = ref<string[]>([]);
const licenseList = ref<unknown[]>([]);

onMounted(async () => {
	const response = await fetch(licensesUrl).then((res) => res.json());
	licenceData.value = response;
	licenseNameList.value = Object.keys(response);
	if (licenseNameList.value.length > 0) {
		licenseList.value = licenseNameList.value.map((license) => {
			return {
				licenseName: license,
				components: licenceData.value[license].components,
				licenseText: licenceData.value[license].licenseText,
			};
		});
	}
});
</script>
