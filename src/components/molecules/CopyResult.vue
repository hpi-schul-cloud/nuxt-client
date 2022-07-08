<template>
	<div v-if="succesAll">
		<v-icon data-testid="copy-status-success-all">mdiCheckAll</v-icon>
		{{ $t("components.molecules.copyResult.successfullyCopied") }}
	</div>
	<div v-else>
		<v-treeview
			:expand-icon="icons.mdiChevronDown"
			:items="items"
			color="primary"
			transition
			:open="expandedNodes"
			item-children="elements"
			item-key="index"
			dense
			@keydown.space="onSpacePress"
		>
			<template #prepend="{ item }">
				<v-icon :class="setCustomClass(item.feStatus)" :data-testid="item.id">
					{{ setIcons(item) }}
				</v-icon>
			</template>
			<template #label="{ item }">
				<div
					class="treeview-item"
					:class="`treeview-item-${item.feStatus}`"
					tabindex="0"
					:ariaLabel="getAriaLabel(item)"
					@keydown.space="onSpacePress(item.index)"
				>
					{{ getItemTitle(item) }}
				</div>
			</template>
		</v-treeview>
	</div>
</template>

<script lang="ts">
import {
	CopyApiResponseStatusEnum,
	CopyApiResponseTypeEnum,
} from "@/serverApi/v3";
import {
	mdiCheck,
	mdiCheckAll,
	mdiAlert,
	mdiAlertCircle,
	mdiChevronDown,
} from "@mdi/js";
import { defineComponent } from "@nuxtjs/composition-api";
import type { PropType } from "vue";
import { TranslateResult } from "vue-i18n";
import { PreparedCopyApiResponse } from "@/store/copy-process";

const ClassEnum = {
	FINISHED: "finished",
	NOT_FINISHED: "not-finished",
	PARTIAL: "partial",
};

export default defineComponent({
	props: {
		items: {
			type: Array, // () => Array<PreparedCopyApiResponse>(), // () => Array<PreparedCopyApiResponse>(),
			// type: Array as PropType<PreparedCopyApiResponse[]>,
			required: true,
		},
		succesAll: {
			type: Boolean,
		},
	},
	data(): { icons: any; expandedNodes: number[] } {
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
		this.searchExpandedNodes(this.items as PreparedCopyApiResponse[]);
	},

	methods: {
		setCustomClass(itemStatus: CopyApiResponseStatusEnum) {
			if (itemStatus === CopyApiResponseStatusEnum.Success)
				return ClassEnum.FINISHED;
			if (itemStatus === CopyApiResponseStatusEnum.Failure)
				return ClassEnum.NOT_FINISHED;
			if (itemStatus === CopyApiResponseStatusEnum.Partial)
				return ClassEnum.PARTIAL;
		},
		setIcons(item: PreparedCopyApiResponse) {
			if (item.feStatus === CopyApiResponseStatusEnum.Success)
				return this.icons.mdiCheck;
			if (item.feStatus === CopyApiResponseStatusEnum.Failure)
				return this.icons.mdiAlertCircle;
			if (item.feStatus === CopyApiResponseStatusEnum.Partial)
				return this.icons.mdiAlert;
		},
		searchExpandedNodes(items: PreparedCopyApiResponse[]) {
			items.forEach((item) => {
				if (item.elements && item.status !== CopyApiResponseStatusEnum.Success)
					this.expandedNodes.push(item.index);
				if (item.elements) this.searchExpandedNodes(item.elements);
			});
		},
		onSpacePress(itemId: number) {
			if (this.expandedNodes.includes(itemId)) {
				const index = this.expandedNodes.indexOf(itemId);
				this.expandedNodes.splice(index, 1);
				return;
			}
			this.expandedNodes.push(itemId);
		},
		getItemTitle(item: PreparedCopyApiResponse): TranslateResult {
			const titles: Record<CopyApiResponseTypeEnum, TranslateResult> = {
				BOARD: this.$t("common.labels.room"),
				CONTENT: this.$t("components.molecules.copyResult.label.content"),
				COURSE: this.$t("common.labels.room"),
				COURSEGROUP_GROUP: this.$t("common.words.courseGroups"),
				FILE: this.$t("components.molecules.copyResult.label.file"),
				FILE_GROUP: this.$t("components.molecules.copyResult.label.files"),
				LEAF: this.$t("components.molecules.copyResult.label.leaf"),
				LESSON: `${this.$t("common.words.topics")} - ${item.title}`,
				LESSON_CONTENT: this.$t(
					"components.molecules.copyResult.label.lessonContent"
				),
				LESSON_CONTENT_GROUP: this.$t(
					"components.molecules.copyResult.label.lessonContentGroup"
				),
				LTITOOL_GROUP: this.$t(
					"components.molecules.copyResult.label.ltiToolsGroup"
				),
				METADATA: this.$t("components.molecules.copyResult.metadata"),
				SUBMISSION_GROUP: this.$t(
					"components.molecules.copyResult.label.submissions"
				),
				TASK: `${this.$t("common.words.task")} - ${item.title}`,
				TIME_GROUP: this.$t("components.molecules.copyResult.label.timeGroup"),
				USER_GROUP: this.$t("components.molecules.copyResult.label.userGroup"),
			};

			if (item.type === CopyApiResponseTypeEnum.FileGroup) {
				return item.status === CopyApiResponseStatusEnum.NotImplemented
					? this.$t("components.molecules.copyResult.fileCopy.error")
					: titles[item.type];
			}

			if (item.type === CopyApiResponseTypeEnum.File && item.title) {
				return item.title;
			}

			return titles[item.type];
		},
		getAriaLabel(item: PreparedCopyApiResponse) {
			if (!item.elements) {
				return this.$t("components.molecules.copyResult.aria.childItem.info", {
					itemTitle: item.title,
					itemStatus: this.$t(`common.labels.${item.feStatus}`),
				});
			}

			if (!this.expandedNodes.includes(item.index)) {
				return this.$t("components.molecules.copyResult.aria.parentItem.info", {
					itemTitle: item.title,
					itemStatus: this.$t(`common.labels.${item.feStatus}`),
					includedItems: item.elements.length,
					action: this.$t("common.labels.expand"),
				});
			}

			return this.$t("components.molecules.copyResult.aria.parentItem.info", {
				itemTitle: item.title,
				itemStatus: this.$t(`common.labels.${item.feStatus}`),
				includedItems: item.elements.length,
				action: this.$t("common.labels.collapse"),
			});
		},
	},
});
</script>
<style lang="scss" scoped>
@import "~vuetify/src/styles/styles.sass";
@import "@styles";
.treeview-item-failure {
	color: var(--color-danger-dark);
	white-space: normal;
}
.not-finished {
	color: var(--color-danger-dark);
}
.finished {
	color: var(--color-secondary);
}
.partial {
	color: var(--color-accent);
}
</style>
