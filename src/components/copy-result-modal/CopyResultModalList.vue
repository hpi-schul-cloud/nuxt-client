<template>
	<div>
		<copy-result-modal-list-item
			v-for="(item, index) in items"
			:key="index"
			:item="item"
		></copy-result-modal-list-item>
	</div>
</template>

<script>
import CopyResultModalListItem from "@components/copy-result-modal/CopyResultModalListItem";

export default {
	name: "CopyResultModalList",
	components: { CopyResultModalListItem },
	props: {
		items: {
			type: Array,
			required: true,
			default: () => [],
		},
	},
};
</script>

<!--<style scoped></style>-->
