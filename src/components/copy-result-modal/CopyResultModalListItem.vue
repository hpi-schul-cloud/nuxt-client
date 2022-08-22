<template>
	<div v-if="item !== undefined">
		<div class="d-flex flex-row align-items-center">
			<v-icon> {{ mdiChevronLeft }} </v-icon>
			<v-breadcrumbs
				class="pl-0 py-0 mr-8 pr-4 truncate parent-info"
				:items="[
					{
						href: item.url,
						text: breadcrumbTitle,
						target: '_blank',
						disabled: false,
					},
				]"
			></v-breadcrumbs>
		</div>
		<ul class="mb-4 pl-1">
			<li
				v-for="(e, index) of elements"
				:key="index"
				class="list-none truncate d-block element-info"
			>
				<v-icon x-small class="mr-1"> {{ mdiMenuRight }} </v-icon>
				<span class="black--text">{{ getElementTitle(e) }}</span>
			</li>
		</ul>
	</div>
</template>

<script>
import { CopyApiResponseTypeEnum } from "@/serverApi/v3";
import { mdiChevronLeft, mdiMenuRight } from "@mdi/js";

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
			const title = this.item.title ? ` - ${this.item.title}` : "";
			return this.getElementTypeName(this.item.type) + title;
		},
	},
	methods: {
		getElementTitle(element) {
			const title = element.title ? " - " + element.title : "";
			return this.getElementTypeName(element.type) + title;
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
					return this.$t("common.words.topics");
				case CopyApiResponseTypeEnum.LessonContentGeogebra:
					return this.$t("components.molecules.copyResult.label.geogebra");
				case CopyApiResponseTypeEnum.LessonContentEtherpad:
					return this.$t("components.molecules.copyResult.label.etherpad");
				case CopyApiResponseTypeEnum.LessonContentText:
					return this.$t("components.molecules.copyResult.label.text");
				case CopyApiResponseTypeEnum.LessonContentNexboard:
					return this.$t("components.molecules.copyResult.label.nexboard");
				case CopyApiResponseTypeEnum.LessonContentLernstore:
					return this.$t("common.words.lernstore");
				case CopyApiResponseTypeEnum.LessonContentTask:
					return this.$t("common.words.task");
				case CopyApiResponseTypeEnum.LessonContentGroup:
					return this.$t(
						"components.molecules.copyResult.label.lessonContentGroup"
					);
				case CopyApiResponseTypeEnum.LtitoolGroup:
					return this.$t("components.molecules.copyResult.label.ltiToolsGroup");
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
				default:
					return this.$t("components.molecules.copyResult.label.unknown");
			}
		},
	},
};
</script>

<style lang="scss" scoped>
.list-none {
	list-style-type: none;
}
</style>
