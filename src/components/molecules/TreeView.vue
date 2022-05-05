<template>
	<v-treeview :items="items" color="primary" transition :open.sync="openNodes">
		<template v-slot:label="{ item }">
			<div class="treeview-item" :class="setCustomClass(item.status)">
				{{ item.name }}
			</div>
		</template>
	</v-treeview>
</template>

<script>
export default {
	props: {
		items: {
			type: Array,
			required: true,
		},
		openNodes: {
			type: Array,
			required: false,
			default: () => [],
		},
	},
	data() {
		return {};
	},
	computed: {},
	methods: {
		setCustomClass(itemStatus) {
			return itemStatus !== "done" ? "not-finished" : "";
		},
	},
};
</script>
<style lang="scss" scoped>
@import "~vuetify/src/styles/styles.sass";
@import "@variables";
.not-finished {
	color: var(--color-danger);
}
</style>
