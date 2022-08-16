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
			default: () => undefined,
		},
		baseUrl: {
			type: String,
			default: () => "",
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
			if (type === CopyApiResponseTypeEnum.Board)
				return this.$t("common.words.learnContent");
			if (type === CopyApiResponseTypeEnum.Content)
				return this.$t("components.molecules.copyResult.label.content");
			if (type === CopyApiResponseTypeEnum.Course)
				return this.$t("common.labels.room");
			if (type === CopyApiResponseTypeEnum.CoursegroupGroup)
				return this.$t("common.words.courseGroups");
			if (type === CopyApiResponseTypeEnum.File)
				return this.$t("components.molecules.copyResult.label.file");
			if (type === CopyApiResponseTypeEnum.FileGroup)
				return this.$t("components.molecules.copyResult.label.files");
			if (type === CopyApiResponseTypeEnum.Leaf)
				return this.$t("components.molecules.copyResult.label.leaf");
			if (type === CopyApiResponseTypeEnum.LernstoreMaterial)
				return "Missing name for Lernstore Material";
			if (type === CopyApiResponseTypeEnum.LernstoreMaterialGroup)
				return this.$t(
					"components.molecules.copyResult.label.lernstoreMaterialGroup"
				);
			if (type === CopyApiResponseTypeEnum.Lesson)
				return this.$t("common.words.topics");
			if (type === CopyApiResponseTypeEnum.LessonContentGeogebra)
				return "Geogebra";
			if (type === CopyApiResponseTypeEnum.LessonContentEtherpad)
				return "Etherpad";
			if (type === CopyApiResponseTypeEnum.LessonContentText)
				return "i18n text";
			if (type === CopyApiResponseTypeEnum.LessonContentNexboard)
				return "Nexboard";
			if (type === CopyApiResponseTypeEnum.LessonContentLernstore)
				return this.$t("common.words.lernstore");
			if (type === CopyApiResponseTypeEnum.LessonContentTask)
				return this.$t("common.words.task");
			if (type === CopyApiResponseTypeEnum.LessonContentGroup)
				return this.$t(
					"components.molecules.copyResult.label.lessonContentGroup"
				);
			if (type === CopyApiResponseTypeEnum.LtitoolGroup)
				return this.$t("components.molecules.copyResult.label.ltiToolsGroup");
			if (type === CopyApiResponseTypeEnum.Metadata)
				return this.$t("components.molecules.copyResult.metadata");
			if (type === CopyApiResponseTypeEnum.SubmissionGroup)
				return this.$t("components.molecules.copyResult.label.submissions");
			if (type === CopyApiResponseTypeEnum.Task)
				return this.$t("common.words.task");
			if (type === CopyApiResponseTypeEnum.TaskGroup)
				return this.$t("common.words.tasks");
			if (type === CopyApiResponseTypeEnum.TimeGroup)
				return this.$t("components.molecules.copyResult.label.timeGroup");
			if (type === CopyApiResponseTypeEnum.UserGroup)
				return this.$t("components.molecules.copyResult.label.userGroup");

			return "unknown label";
		},
	},
};
</script>

<style lang="scss" scoped>
.list-none {
	list-style-type: none;
}
</style>
