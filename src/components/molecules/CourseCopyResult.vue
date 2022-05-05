<template>
	<v-treeview :items="items" color="primary" transition :open.sync="openNodes">
		<template v-slot:label="{ item }">
			<div class="treeview-item" :class="setCustomClass(item.status)">
				<v-icon :class="setCustomClass(item.status)">
					{{ setIcons(item.status) }}
				</v-icon>
				{{ item.name }}
			</div>
		</template>
	</v-treeview>
</template>

<script>
import { mdiCheck, mdiMinus, mdiClose } from "@mdi/js";
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
		return {
			icons: {
				mdiCheck,
				mdiMinus,
				mdiClose,
			},
		};
	},
	methods: {
		setCustomClass(itemStatus) {
			let status = null;
			if (itemStatus === "done") status = "finished";
			if (itemStatus === "error") status = "not-finished";
			if (itemStatus === "partial") status = "partial";
			return status;
		},
		setIcons(itemStatus) {
			let icon = null;
			if (itemStatus === "done") icon = this.icons.mdiCheck;
			if (itemStatus === "error") icon = this.icons.mdiClose;
			if (itemStatus === "partial") icon = this.icons.mdiMinus;

			return icon;
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
.finished {
	color: var(--color-success-dark);
}
.partial {
	color: var(--color-accent-dark);
}
</style>
