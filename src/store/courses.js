import mergeDeep from "@/utils/merge-deep";
import serviceTemplate from "@/utils/service-template";
const base = serviceTemplate("courses");

const module = mergeDeep(base, {
	actions: {
		async removeCourseItem({ dispatch }, courseItem) {
			let successDeleteNotification;
			let unsuccesfullDeleteNotification;
			try {
				if (courseItem.type === "homework") {
					await dispatch("homeworks/remove", courseItem.id, { root: true });
					successDeleteNotification = this.app.i18n.t(
						"pages.courses._id.homework.deleteSuccess"
					);
					unsuccesfullDeleteNotification = this.app.i18n.t(
						"pages.courses._id.homework.deleteError"
					);
				} else {
					await dispatch("lessons/remove", courseItem.id, { root: true });
					successDeleteNotification = this.app.i18n.t(
						"pages.courses._id.editorDocument.deleteSuccess"
					);
					unsuccesfullDeleteNotification = this.app.i18n.t(
						"pages.courses._id.editorDocument.deleteError"
					);
				}
				this.$toast.success(successDeleteNotification);
			} catch (err) {
				this.$toast.error(unsuccesfullDeleteNotification);
			}
		},
	},
	getters: {
		getCoursesOptions: (state) => {
			return state.list
				.filter((course) => course.isArchived === false)
				.map((course) => {
					return {
						_id: course._id,
						name: course.name,
					};
				});
		},
	},
});

export default module;
