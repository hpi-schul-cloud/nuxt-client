<template>
	<div>
		<VTextarea
			class="pa-0 ma-0 v-secondary-lighten1"
			rows="1"
			:label="$t('common.labels.alternativeText')"
			ref="alternativeText"
			@keyup.enter="onEnterAlternativeText"
		></VTextarea>
		<span class="pa-0 mt-n4 v-secondary-darken1">{{
			$t("common.labels.altDescription")
		}}</span>
	</div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import { VTextarea } from "vuetify/lib";

export default defineComponent({
	name: "AlternativeText",
	props: {
		text: { type: String, required: false },
	},
	emits: ["update:alternativeText"],
	setup(props, { emit }) {
		const alternativeText = ref<InstanceType<typeof VTextarea> | null>(null);

		const onEnterAlternativeText = ($event: KeyboardEvent) => {
			console.log(alternativeText);
		};

		return {
			onEnterAlternativeText,
		};
	},
});
</script>
