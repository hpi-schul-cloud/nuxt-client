<template>
	<div class="text-black">
		<div class="d-flex justify-space-between">
			<div class="mt-1">
				{{ $t("components.molecules.share.options.schoolInternally") }}
			</div>
			<v-switch
				v-model="shareOptions.isSchoolInternal"
				data-testid="isSchoolInternal"
				:value="true"
				class="my-0 mr-n3"
				:true-icon="mdiCheck"
			/>
		</div>
		<div class="d-flex justify-space-between">
			<div class="mt-1">
				{{ $t("components.molecules.share.options.expiresInDays") }}
			</div>
			<v-switch
				v-model="shareOptions.hasExpiryDate"
				data-testid="hasExpiryDate"
				:value="true"
				class="my-0 mr-n3"
				:true-icon="mdiCheck"
			/>
		</div>
	</div>
</template>

<script>
import { defineComponent, reactive, watch } from "vue";
import { ShareTokenBodyParamsParentTypeEnum } from "@/serverApi/v3/api";
import { mdiCheck } from "@mdi/js";

// eslint-disable-next-line vue/require-direct-export
export default defineComponent({
	name: "ShareModalOptionsForm",
	emits: ["shareOptionsChange"],
	props: {
		type: {
			type: String,
			required: true,
			validator: (type) =>
				Object.values(ShareTokenBodyParamsParentTypeEnum).includes(type),
		},
	},
	setup(props, { emit }) {
		const shareOptions = reactive({
			isSchoolInternal: true,
			hasExpiryDate: true,
		});

		watch(shareOptions, (newValue) => {
			emit("share-options-change", newValue);
		});

		emit("share-options-change", shareOptions);
		return {
			shareOptions,
			mdiCheck,
		};
	},
});
</script>
