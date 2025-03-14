<template>
	<default-wireframe headline="Open Source Licences" max-width="short">
		<VTreeview
			:items="licenseList"
			:open-on-click="true"
			:load-children="onOpen"
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

const licensesUrl = envConfigModule.getEnv.LICENSE_SUMMARY_URL as string;

type LicenceData = {
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
const response = ref<LicenceData>({});
const licenseNames = ref<string[]>([]);
const licenseList = ref<TreeViewItem[]>([]);

const onOpen = async (payload: TreeViewItem) => {
	loading.value = true;
	await new Promise((resolve) => {
		const item = licenseList.value.find(
			(license) => license.title === payload.title
		);
		if (item?.title !== payload.title) return;
		if (item.children && item.children.length > 0) return;

		item.children = response.value[payload.title].components?.map(
			(component) => {
				return {
					id: component,
					title: component,
				};
			}
		);
		return resolve(true);
	});

	await new Promise((resolve) => {
		setTimeout(() => {
			loading.value = false;
			return resolve(true);
		}, 0);
	});
};

onMounted(async () => {
	response.value = await axios.get(licensesUrl).then((res) => res.data);
	licenseNames.value = Object.keys(response.value);

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
});
</script>
