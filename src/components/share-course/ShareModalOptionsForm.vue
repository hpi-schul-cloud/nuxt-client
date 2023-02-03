<template>
	<div class="black--text">
		<div class="d-flex justify-space-between">
			<div class="mt-1">
				{{ $t("components.molecules.shareCourse.options.schoolInternally") }}
			</div>
			<v-switch
				v-model="shareOptions.isSchoolInternal"
				data-testid="isSchoolInternal"
				color="primary"
				input-value="true"
				class="my-0 mr-n3"
				inset
				dense
			></v-switch>
		</div>
		<div class="d-flex justify-space-between">
			<div class="mt-1">
				{{ $t("components.molecules.shareCourse.options.expiresInDays") }}
			</div>
			<v-switch
				v-model="shareOptions.hasExpiryDate"
				data-testid="hasExpiryDate"
				color="primary"
				input-value="true"
				class="my-0 mr-n3"
				inset
				dense
			></v-switch>
		</div>
	</div>
</template>

<script>
import { defineComponent, reactive, watch } from "vue";

// eslint-disable-next-line vue/require-direct-export
export default defineComponent({
	name: "ShareModalOptionsForm",
	emits: ["shareOptionsChange"],
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
		};
	},
});
</script>
