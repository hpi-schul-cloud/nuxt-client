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
			@keydown.space="onSpacePress"
		>
			<template v-slot:prepend="{ item }">
				<v-icon :class="setCustomClass(item.status)" :data-testid="item.id">
					{{ setIcons(item) }}
				</v-icon>
			</template>
			<template v-slot:label="{ item }">
				<div
					class="treeview-item"
					:class="`treeview-item-${item.status}`"
					tabindex="0"
					:aria-label="getAriaLabel(item)"
					@keydown.space="onSpacePress(item.id)"
				>
					{{ item.name }}
				</div>
			</template>
		</v-treeview>
	</div>
</template>

<script>
import {
	mdiCheck,
	mdiCheckAll,
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
				mdiCheck,
				mdiCheckAll,
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
		setIcons(item) {
			if (item.status === "done" && !item.children) return this.icons.mdiCheck;
			if (item.status === "done") return this.icons.mdiCheckAll;
			if (item.status === "error") return this.icons.mdiAlertCircle;
			if (item.status === "partial") return this.icons.mdiAlert;
		},
		searchExpandedNodes(items) {
			if (!items instanceof Array) return;
			items.forEach((item) => {
				if (item.children && item.status !== "done")
					this.expandedNodes.push(item.id);
				if (item.children) this.searchExpandedNodes(item.children);
			});
		},
		onSpacePress(itemId) {
			if (this.expandedNodes.includes(itemId)) {
				const index = this.expandedNodes.indexOf(itemId);
				this.expandedNodes.splice(index, 1);
				return;
			}
			this.expandedNodes.push(itemId);
		},
		getAriaLabel(item) {
			if (!item.children)
				return this.$t(
					"components.molecules.courseCopyResult.aria.childItem.info",
					{
						itemName: item.name,
						itemStatus: this.$t(`common.labels.${item.status}`),
					}
				);

			if (!this.expandedNodes.includes(item.id)) {
				return this.$t(
					"components.molecules.courseCopyResult.aria.parentItem.info",
					{
						itemName: item.name,
						itemStatus: this.$t(`common.labels.${item.status}`),
						action: this.$t("common.labels.expand"),
					}
				);
			} else {
				return this.$t(
					"components.molecules.courseCopyResult.aria.parentItem.info",
					{
						itemName: item.name,
						itemStatus: this.$t(`common.labels.${item.status}`),
						action: this.$t("common.labels.collapse"),
					}
				);
			}
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
	color: var(--color-secondary);
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
