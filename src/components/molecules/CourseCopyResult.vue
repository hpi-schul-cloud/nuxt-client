<template>
	<div>
		<v-progress-circular
			v-if="showSpinner"
			indeterminate
			size="72"
			width="6"
			color="secondary"
			class="spinner"
		></v-progress-circular>
		<v-treeview
			:expand-icon="icons.mdiChevronDown"
			:items="items"
			color="primary"
			transition
			:open="expandedNodes"
		>
			<template v-slot:label="{ item }">
				<div class="treeview-item">
					<v-icon :class="setCustomClass(item.status)" :data-testid="item.id">
						{{ setIcons(item.status) }}
					</v-icon>
					{{ item.name }}
				</div>
			</template>
		</v-treeview>
	</div>
</template>

<script>
import {
	mdiCheckCircle,
	mdiAlert,
	mdiAlertCircle,
	mdiChevronDown,
} from "@mdi/js";
export default {
	props: {
		items: {
			type: Array,
			required: true,
			default: () => [],
		},
		showSpinner: {
			type: Boolean,
		},
	},
	data() {
		return {
			icons: {
				mdiCheckCircle,
				mdiAlert,
				mdiAlertCircle,
				mdiChevronDown,
			},
			expandedNodes: [],
		};
	},
	created() {
		this.searchExpandedNodes(this.items);
	},
	methods: {
		setCustomClass(itemStatus) {
			if (itemStatus === "done") return "finished";
			if (itemStatus === "error") return "not-finished";
			if (itemStatus === "partial") return "partial";
		},
		setIcons(itemStatus) {
			if (itemStatus === "done") return this.icons.mdiCheckCircle;
			if (itemStatus === "error") return this.icons.mdiAlertCircle;
			if (itemStatus === "partial") return this.icons.mdiAlert;
		},
		searchExpandedNodes(items) {
			if (!items instanceof Array) return;
			items.forEach((item) => {
				if (item.children && item.status !== "done")
					this.expandedNodes.push(item.id);
				if (item.children) this.searchExpandedNodes(item.children);
			});
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
	color: var(--color-success);
}
.partial {
	color: var(--color-accent);
}
.spinner {
	position: absolute;
	right: 0;
	left: 0;
	margin-right: auto;
	margin-left: auto;
}
</style>
