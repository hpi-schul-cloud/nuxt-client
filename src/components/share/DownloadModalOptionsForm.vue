<template>
	<div class="black--text">
		<div class="d-flex justify-space-between">
			<div class="mt-1">
				{{ $t("components.molecules.download.options.isV_1_1") }}
			</div>
			<v-switch
				v-model="downloadOptions.isV_1_1"
				data-testid="isV_1_1"
				color="primary"
				input-value="true"
				class="my-0 mr-n3"
				inset
				dense
			/>
		</div>
		<div class="d-flex justify-space-between">
			<div class="mt-1">
				{{ $t("components.molecules.download.options.isV_1_3") }}
			</div>
			<v-switch
				v-model="downloadOptions.isV_1_3"
				data-testid="isV_1_3"
				color="primary"
				input-value="true"
				class="my-0 mr-n3"
				inset
				dense
			/>
		</div>
	</div>
</template>

<script>
import { defineComponent, reactive, watch } from "vue";
// import { ShareTokenBodyParamsParentTypeEnum } from "@/serverApi/v3/api";

// eslint-disable-next-line vue/require-direct-export
export default defineComponent({
	name: "DownloadModalOptionsForm",
	emits: ["onDownloadOptionsChange"],
	props: {
		// type: {
		// 	type: String,
		// 	required: true,
		// 	validator: (type) =>
		// 		Object.values(ShareTokenBodyParamsParentTypeEnum).includes(type),
		// },
	},
	setup(props, { emit }) {
		const downloadOptions = reactive({
			isV_1_1: true,
			isV_1_3: false,
		});

		watch(downloadOptions, (newValue) => {
			emit("download-options-change", newValue);
		});

		emit("download-options-change", downloadOptions);
		return {
			downloadOptions,
		};
	},
});
</script>
