<template>
	<div v-if="item !== undefined">
		<div class="d-flex flex-row align-center">
			{{ elementTypeName }} &middot;&nbsp;
			<a :href="item.url" target="_blank">{{ breadcrumbTitle }}</a>
		</div>
		<ul class="ml-4 mb-4 pl-1">
			<li
				v-for="element in aggregatedElements()"
				:key="element.type"
				class="element-info"
				data-testid="copy-result-list-item-element-info"
			>
				<span>
					{{ element.count }} {{ element.type }}
					<span v-if="element.count === 1 && element.title">
						&middot;&nbsp;{{ element.title }}</span
					>
				</span>
			</li>
		</ul>
	</div>
</template>

<script>
import { CopyApiResponseTypeEnum } from "@/serverApi/v3";
import { mdiChevronLeft, mdiMenuRight } from "@icons/material";

export default {
	name: "CopyResultModalListItem",
	props: {
		item: {
			type: Object,
			required: true,
		},
	},
	data() {
		return {
			mdiChevronLeft,
			mdiMenuRight,
		};
	},
	computed: {
		elements() {
			return this.item?.elements || [];
		},
		breadcrumbTitle() {
			return (
				this.item.title || this.$t("components.molecules.copyResult.label.link")
			);
		},
		elementTypeName() {
			return this.getElementTypeName(this.item.type);
		},
	},
	methods: {
		getElementType(element) {
			return this.getElementTypeName(element.type);
		},
		getElementTitle(element) {
			return element.title ?? "";
		},
		getElementTypeName(type) {
			switch (type) {
				case CopyApiResponseTypeEnum.Board:
					return this.$t("common.words.learnContent");
				case CopyApiResponseTypeEnum.Content:
					return this.$t("components.molecules.copyResult.label.content");
				case CopyApiResponseTypeEnum.Course:
					return this.$t("common.labels.room");
				case CopyApiResponseTypeEnum.CoursegroupGroup:
					return this.$t("common.words.courseGroups");
				case CopyApiResponseTypeEnum.File:
					return this.$t("components.molecules.copyResult.label.file");
				case CopyApiResponseTypeEnum.FileGroup:
					return this.$t("components.molecules.copyResult.label.files");
				case CopyApiResponseTypeEnum.Leaf:
					return this.$t("components.molecules.copyResult.label.leaf");
				case CopyApiResponseTypeEnum.LernstoreMaterial:
					return this.$t(
						"components.molecules.copyResult.label.lernstoreMaterial"
					);
				case CopyApiResponseTypeEnum.LernstoreMaterialGroup:
					return this.$t(
						"components.molecules.copyResult.label.lernstoreMaterialGroup"
					);
				case CopyApiResponseTypeEnum.Lesson:
					return this.$t("common.words.topic");
				case CopyApiResponseTypeEnum.LessonContentGeogebra:
					return this.$t("components.molecules.copyResult.label.geogebra");
				case CopyApiResponseTypeEnum.LessonContentEtherpad:
					return this.$t("components.molecules.copyResult.label.etherpad");
				case CopyApiResponseTypeEnum.CollaborativeTextEditorElement:
					return this.$t("components.molecules.copyResult.label.etherpad");
				case CopyApiResponseTypeEnum.LessonContentText:
					return this.$t("components.molecules.copyResult.label.text");
				case CopyApiResponseTypeEnum.LessonContentLernstore:
					return this.$t("common.words.lernstore");
				case CopyApiResponseTypeEnum.LessonContentTask:
					return this.$t("common.words.task");
				case CopyApiResponseTypeEnum.LessonContentGroup:
					return this.$t(
						"components.molecules.copyResult.label.lessonContentGroup"
					);
				case CopyApiResponseTypeEnum.Metadata:
					return this.$t("components.molecules.copyResult.metadata");
				case CopyApiResponseTypeEnum.SubmissionGroup:
					return this.$t("components.molecules.copyResult.label.submissions");
				case CopyApiResponseTypeEnum.Task:
					return this.$t("common.words.task");
				case CopyApiResponseTypeEnum.TaskGroup:
					return this.$t("common.words.tasks");
				case CopyApiResponseTypeEnum.TimeGroup:
					return this.$t("components.molecules.copyResult.label.timeGroup");
				case CopyApiResponseTypeEnum.UserGroup:
					return this.$t("components.molecules.copyResult.label.userGroup");
				case CopyApiResponseTypeEnum.Columnboard:
					return this.$t("components.molecules.copyResult.label.columnBoard");
				case CopyApiResponseTypeEnum.DrawingElement:
					return this.$t("components.molecules.copyResult.label.tldraw");
				case CopyApiResponseTypeEnum.ExternalToolElement:
					return this.$t("components.molecules.copyResult.label.toolElements");
				default:
					return this.$t("components.molecules.copyResult.label.unknown");
			}
		},
		aggregatedElements() {
			const elementMap = new Map();
			for (const element of this.elements) {
				const typeName = this.getElementType(element);
				if (elementMap.has(typeName)) {
					const data = elementMap.get(typeName);
					data.count++;
					data.title = "";
					elementMap.set(typeName, data);
				} else {
					elementMap.set(typeName, { count: 1, title: element.title });
				}
			}
			return Array.from(elementMap).map(([type, { count, title }]) => ({
				type,
				count,
				title,
			}));
		},
	},
};
</script>

<style lang="scss" scoped>
.list-none {
	list-style-type: disc;
}
</style>
