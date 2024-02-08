<template>
	<v-list-item :title="item.name">
		<template #prepend v-if="item.logoUrl">
			<!-- v-img cant be used in #prepend any longer, so we use img instead
      <v-img
        cover
        v-if="item.logoUrl"
        :max-height="$props.maxHeight"
        :max-width="$props.maxWidth"
        :src="item.logoUrl"
        class="mx-2"
      />
      -->
			<img :src="item.logoUrl" class="mx-2" :style="getStyle()" />
		</template>
	</v-list-item>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";
import { ExternalToolConfigurationTemplate } from "@/store/external-tool";

export default defineComponent({
	name: "ExternalToolSelectionRow",
	props: {
		item: {
			type: Object as PropType<ExternalToolConfigurationTemplate>,
			required: true,
			default: () => ({}),
		},
		maxHeight: {
			type: [Number, String],
			default: () => 30,
		},
		maxWidth: {
			type: [Number, String],
			default: () => 30,
		},
	},
	setup(props) {
		const getStyle = () => {
			return {
				maxHeight: `${props.maxHeight}px`,
				maxWidth: `${props.maxWidth}px`,
			};
		};

		return {
			getStyle,
		};
	},
});
</script>
