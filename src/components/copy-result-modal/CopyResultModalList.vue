<template>
	<div>
		<copy-result-modal-list-item
			v-for="(item, index) in items"
			:key="index"
			:item="item"
		/>
	</div>
</template>

<script>
import CopyResultModalListItem from "@/components/copy-result-modal/CopyResultModalListItem";

export default {
	name: "CopyResultModalList",
	components: { CopyResultModalListItem },
	props: {
		items: {
			type: Array,
			required: true,
		},
	},
};
</script>
