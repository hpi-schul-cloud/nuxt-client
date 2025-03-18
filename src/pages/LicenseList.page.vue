<template>
	<div class="d-flex justify-center">
		<div class="license-list">
			<h1 class="text-h3 d-flex justify-center">
				{{ t("pages.licenseList.title") }}
			</h1>

			<div v-if="licenseNames.length > 0" class="d-flex px-4 pl-7">
				<div>{{ t("pages.licenseList.name") }}</div>
				<v-spacer />
				<div>{{ t("pages.licenseList.componentCount") }}</div>
			</div>
			<div>
				<VTreeview
					:items="licenseList"
					:open-on-click="true"
					:load-children="onExpand"
				>
					<template #title="{ title }">
						<span data-testid="license-title">{{ title }}</span>
					</template>

					<template #append="{ item }">
						<span class="ml-4">{{ item.count }}</span>
					</template>
				</VTreeview>
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import axios from "axios";
import { VTreeview } from "vuetify/labs/VTreeview";
import { useI18n } from "vue-i18n";
import {
	ENV_CONFIG_MODULE_KEY,
	NOTIFIER_MODULE_KEY,
	injectStrict,
} from "@/utils/inject";

const envConfigModule = injectStrict(ENV_CONFIG_MODULE_KEY);
const notifierModule = injectStrict(NOTIFIER_MODULE_KEY);
const licensesUrl = envConfigModule.getEnv.LICENSE_SUMMARY_URL;

const { t } = useI18n();

type LicenseData = {
	[key: string]: {
		components: string[];
		licenseText: string;
	};
};

type TreeViewItem = {
	id: number;
	title: string;
	children?: { id: string; title: string }[];
	count?: number;
};

const response = ref<LicenseData>({});
const licenseNames = ref<string[]>([]);
const licenseList = ref<TreeViewItem[]>([]);

const onExpand = async (args: unknown) => {
	const payload = args as TreeViewItem;

	const item = licenseList.value.find(
		(license) => license.title === payload.title
	);
	if (item?.title !== payload.title) return;
	if (item.children && item.children.length > 0) return;

	item.children = response.value[payload.title].components?.map((component) => {
		return {
			id: component,
			title: component,
		};
	});
};

const fetchLicenseData = async () => {
	try {
		response.value = (await axios.get(licensesUrl as string)).data;
		licenseNames.value = Object.keys(response.value);
	} catch {
		notifierModule.show({
			text: t("error.load"),
			status: "error",
		});
	}

	if (response.value && licenseNames.value.length > 0) {
		let i = 0;
		licenseNames.value.forEach((license) => {
			licenseList.value.push({
				id: i++,
				title: license,
				count: response.value[license].components.length,
				children: [],
			});
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
