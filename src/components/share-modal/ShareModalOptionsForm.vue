<template>
	<div class="black--text">
		<div class="d-flex justify-space-between">
			<div class="mt-1">
				{{ $t("components.molecules.shareCourse.options.schoolInternally") }}
			</div>
			<v-switch
				ref="switch-school-internally"
				v-model="shareOptions.schoolInternally"
				color="primary"
				value
				input-value="true"
				class="ma-0"
			></v-switch>
		</div>
		<div class="d-flex justify-space-between">
			<div class="mt-1">
				{{ $t("components.molecules.shareCourse.options.expiresInSevenDays") }}
			</div>
			<v-switch
				ref="expires-in-seven-days"
				v-model="shareOptions.expiresInSevenDays"
				color="primary"
				value
				input-value="true"
				class="ma-0"
			></v-switch>
		</div>
	</div>
</template>

<script>
import { defineComponent, reactive, watch } from "@vue/composition-api";

export default defineComponent({
	name: "ShareModalOptionsForm",
	emits: ["shareOptionsChange"],
	setup(props, { emit }) {
		const shareOptions = reactive({
			schoolInternally: true,
			expiresInSevenDays: true,
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
