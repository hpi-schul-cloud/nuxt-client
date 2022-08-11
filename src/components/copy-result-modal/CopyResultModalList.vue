<template>
	<div>
		<template v-for="(item, index) in items">
			<copy-result-modal-list-item
				:key="index"
				:item="item"
				:base-url="baseUrl"
			></copy-result-modal-list-item>
		</template>
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
		baseUrl: {
			type: String,
			default: () => "",
		},
	},
};
</script>

<!--<style scoped></style>-->
