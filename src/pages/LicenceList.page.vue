<template>
	<default-wireframe headline="Open Source License List" max-width="short">
		<div
			class="d-flex align-center justify-space-between px-4 pl-12"
			style="max-width: 100%"
		>
			<div>License Name</div>
			<v-spacer />

			<div>Component Count</div>
		</div>
		<VTreeview
			:items="licenseList"
			:open-on-click="true"
			:load-children="onExpand"
			:loading-icon="'$loading'"
		>
			<template #append="{ item }">
				<span>{{ item.count }}</span>
			</template>
		</VTreeview>
	</default-wireframe>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import { envConfigModule } from "@/store";
import axios from "axios";
import { VTreeview } from "vuetify/labs/VTreeview";
import DefaultWireframe from "@/components/templates/DefaultWireframe.vue";
// import { useI18n } from "vue-i18n";

const licensesUrl = envConfigModule.getEnv.LICENSE_SUMMARY_URL as string;
// const { t } = useI18n(); TODO: use i18n

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

const loading = ref<boolean>(false);
const response = ref<LicenseData>({});
const licenseNames = ref<string[]>([]);
const licenseList = ref<TreeViewItem[]>([]);

const onExpand = async (args: unknown): Promise<void> => {
	const payload = args as TreeViewItem;
	loading.value = true;

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

	await new Promise((resolve) => {
		setTimeout(() => {
			loading.value = false;
			return resolve(true);
		}, 0);
	});
};

const fetchlicenseData = async () => {
	try {
		response.value = (await axios.get(licensesUrl)).data;
		licenseNames.value = Object.keys(response.value);
	} catch {
		// eslint-disable-next-line no-console
		console.error("Failed to fetch license data");
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
	fetchlicenseData();
});
</script>
