<template>
	<SvsDialog
		v-model="showModal"
		:title="$t('components.molecules.AddContentModal')"
		confirm-btn-lang-key="common.actions.add"
		:confirm-btn-disabled="!isSendEnabled"
		@cancel="closeModal"
		@confirm="addToLesson"
	>
		<template #content>
			<VSelect
				v-model="selectedCourse"
				return-object
				item-value="_id"
				item-title="name"
				:items="coursesOptions"
				:label="$t('pages.content.label.chooseACourse')"
				data-testid="topicSelector"
			/>
			<VFadeTransition>
				<VSelect
					v-show="!!(selectedCourse || {})._id"
					v-model="selectedLesson"
					return-object
					item-value="_id"
					item-title="name"
					:items="lessonsOptions"
					:label="$t('pages.content.label.chooseALessonTopic')"
					:no-data-text="$t('pages.content.placeholder.noLessonTopic')"
					data-testid="courseSelector"
				/>
			</VFadeTransition>
		</template>
	</SvsDialog>
</template>

<script>
import { contentModule } from "@/store";
import { SvsDialog } from "@ui-dialog";
import { mapGetters } from "vuex";

export default {
	components: {
		SvsDialog,
	},
	props: {
		title: { type: String, default: "" },
		url: { type: String, default: "" },
		client: { type: String, default: "Schul-Cloud" },
		items: { type: Array, default: () => [] },
		showCopyModal: {
			type: Boolean,
			required: true,
		},
		contentid: {
			type: String,
			default: "",
		},
	},
	emits: ["update:show-copy-modal", "close"],
	data() {
		return {
			selectedCourse: undefined,
			selectedLesson: undefined,
		};
	},
	computed: {
		...mapGetters("courses", {
			coursesOptions: "getCoursesOptions",
		}),
		lessons() {
			return contentModule.getLessonsGetter;
		},
		isSendEnabled() {
			return this.selectedLesson?._id !== undefined;
		},
		lessonsOptions() {
			return this.lessons?.data?.map((lesson) => ({
				_id: lesson._id,
				name: lesson.name,
			}));
		},
		showModal: {
			get() {
				return this.showCopyModal;
			},
			set(value) {
				if (!value) {
					this.closeModal();
				}
			},
		},
	},
	watch: {
		selectedCourse(to, from) {
			this.selectedLesson = undefined;
			if (to) {
				this.findLessons(to);
			} else if (!to && !!from) {
				contentModule.clearLessons();
			}
		},
	},
	methods: {
		closeModal() {
			this.$emit("update:show-copy-modal", false);
			this.clearState();
		},
		addToLesson() {
			this.$emit("close");
			const payload = {
				lessonId: this.selectedLesson._id,
				event: this.$eventBus,
				material: [],
			};
			if (this.items.length > 0) {
				this.items.forEach((element) => {
					payload.material.push({
						title: element.title,
						client: element.client,
						url: element.url,
					});
				});
			} else {
				payload.material = {
					title: this.title,
					client: this.client,
					url: this.url,
				};
			}
			contentModule.addToLesson(payload);
			this.closeModal();
		},
		findLessons(course) {
			contentModule.getLessons(course._id);
		},
		clearState() {
			this.selectedCourse = undefined;
			this.selectedLesson = undefined;
		},
	},
};
</script>
