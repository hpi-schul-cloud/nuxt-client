import PrivacySettings from "./PrivacySettings";
import { createTestEnvStore } from "@@/tests/test-utils";
import { createTestingI18n, createTestingVuetify } from "@@/tests/test-utils/setup";
import { createTestingPinia } from "@pinia/testing";
import { setActivePinia } from "pinia";

const generateProps = () => ({
	permissions: {
		teacher: {
			STUDENT_LIST: true,
		},
		student: {
			LERNSTORE_VIEW: true,
		},
	},
	features: {
		rocketChat: true,
		videoconference: true,
	},
});

const searchStrings = {
	studentVisibility: "admin-school-toggle-student-visibility",
	learnStore: "admin-school-toggle-learning-store",
	rocketChat: "toggle_chat",
	videoconference: "toggle_video_conference",
	aiTutor: "toggle_ai_tutor",
};

const getWrapper = (props = generateProps()) =>
	mount(PrivacySettings, {
		global: {
			plugins: [createTestingVuetify(), createTestingI18n()],
		},
		props,
	});

describe("PrivacySettings", () => {
	beforeEach(() => {
		setActivePinia(createTestingPinia());
	});

	describe("env config", () => {
		describe("when env var for visibility is true", () => {
			it("should render visibility switch", () => {
				createTestEnvStore({ TEACHER_STUDENT_VISIBILITY__IS_VISIBLE: true });

				const wrapper = getWrapper();

				expect(wrapper.findAll(`[data-testid=${searchStrings.studentVisibility}]`)).toHaveLength(1);
			});
		});

		describe("when env var for visibility is false", () => {
			it("should not render student visibility switch", () => {
				createTestEnvStore({ TEACHER_STUDENT_VISIBILITY__IS_VISIBLE: false });

				const wrapper = getWrapper();

				expect(wrapper.findAll(`[data-testid=${searchStrings.studentVisibility}]`)).toHaveLength(0);
			});
		});

		describe("when env var for configurability is true", () => {
			it("should enable student visibility switch", () => {
				createTestEnvStore({
					TEACHER_STUDENT_VISIBILITY__IS_CONFIGURABLE: true,
					TEACHER_STUDENT_VISIBILITY__IS_VISIBLE: true,
				});

				const wrapper = getWrapper();

				const studentVisibilitySwitch = wrapper.findComponent(`[data-testid=${searchStrings.studentVisibility}]`);

				expect(studentVisibilitySwitch.props().disabled).toBe(false);
			});
		});

		describe("when env var for configurability is false", () => {
			it("should disable student visibility switch", () => {
				createTestEnvStore({
					TEACHER_STUDENT_VISIBILITY__IS_CONFIGURABLE: false,
					TEACHER_STUDENT_VISIBILITY__IS_VISIBLE: true,
				});

				const wrapper = getWrapper();

				const studentVisibilitySwitch = wrapper.findComponent(`[data-testid=${searchStrings.studentVisibility}]`);

				expect(studentVisibilitySwitch.props().disabled).toBe(true);
			});
		});

		describe("when env vars for learn store are true", () => {
			it("should display learn store switch", () => {
				createTestEnvStore({
					FEATURE_ADMIN_TOGGLE_STUDENT_LERNSTORE_VIEW_ENABLED: true,
					FEATURE_LERNSTORE_ENABLED: true,
				});
				const wrapper = getWrapper();

				expect(wrapper.findAll(`[data-testid=${searchStrings.learnStore}]`)).toHaveLength(1);
			});
		});

		describe("when env vars for learn store are false", () => {
			it("should hide learn store switch", () => {
				createTestEnvStore({
					FEATURE_ADMIN_TOGGLE_STUDENT_LERNSTORE_VIEW_ENABLED: false,
					FEATURE_LERNSTORE_ENABLED: true,
				});
				const wrapper = getWrapper();

				expect(wrapper.findAll(`[data-testid=${searchStrings.learnStore}]`)).toHaveLength(0);
			});
		});

		describe("when env var for videoconference is true", () => {
			it("should display videoconference feature switch", () => {
				createTestEnvStore({ FEATURE_VIDEOCONFERENCE_ENABLED: true });
				const wrapper = getWrapper();

				expect(wrapper.findAll(`[data-testid=${searchStrings.videoconference}]`)).toHaveLength(1);
			});
		});

		describe("when env var for videoconference is false", () => {
			it("should hide videoconference feature switch", () => {
				createTestEnvStore({ FEATURE_VIDEOCONFERENCE_ENABLED: false });
				const wrapper = getWrapper();

				expect(wrapper.findAll(`[data-testid=${searchStrings.videoconference}]`)).toHaveLength(0);
			});
		});

		describe("when env var for aiTutor is true", () => {
			it("should display aiTutor feature switch", () => {
				createTestEnvStore({ FEATURE_AI_TUTOR_ENABLED: true });
				const wrapper = getWrapper();

				expect(wrapper.findAll(`[data-testid=${searchStrings.aiTutor}]`)).toHaveLength(1);
			});
		});

		describe("when env var for aiTutor is false", () => {
			it("should hide aiTutor feature switch", () => {
				createTestEnvStore({ FEATURE_AI_TUTOR_ENABLED: false });
				const wrapper = getWrapper();

				expect(wrapper.findAll(`[data-testid=${searchStrings.aiTutor}]`)).toHaveLength(0);
			});
		});

		describe("when env var for rocketchat is true", () => {
			it("should display rocketchat feature switch", () => {
				createTestEnvStore({ ROCKETCHAT_SERVICE_ENABLED: true });
				const wrapper = getWrapper();

				expect(wrapper.findAll(`[data-testid=${searchStrings.rocketChat}]`)).toHaveLength(1);
			});
		});

		describe("when env var for rocketchat is false", () => {
			it("should hide rocketchat feature switch", () => {
				createTestEnvStore({ ROCKETCHAT_SERVICE_ENABLED: false });
				const wrapper = getWrapper();

				expect(wrapper.findAll(`[data-testid=${searchStrings.rocketChat}]`)).toHaveLength(0);
			});
		});
	});

	describe("default values", () => {
		describe("student visibility switch", () => {
			describe("when configurable", () => {
				it("should be set to true based on school permission", () => {
					createTestEnvStore({
						TEACHER_STUDENT_VISIBILITY__IS_CONFIGURABLE: true,
						TEACHER_STUDENT_VISIBILITY__IS_VISIBLE: true,
					});

					const wrapper = getWrapper(
						Object.assign(generateProps(), {
							permissions: {
								teacher: {
									STUDENT_LIST: true,
								},
							},
						})
					);

					const studentVisibilitySwitch = wrapper.findComponent(`[data-testid=${searchStrings.studentVisibility}]`);

					expect(studentVisibilitySwitch.props().modelValue).toBe(true);
				});

				it("should be set to false based on school permission", () => {
					createTestEnvStore({
						TEACHER_STUDENT_VISIBILITY__IS_CONFIGURABLE: true,
						TEACHER_STUDENT_VISIBILITY__IS_VISIBLE: true,
					});
					const wrapper = getWrapper(
						Object.assign(generateProps(), {
							permissions: {
								teacher: {
									STUDENT_LIST: false,
								},
							},
						})
					);

					const studentVisibilitySwitch = wrapper.findComponent(`[data-testid=${searchStrings.studentVisibility}]`);

					expect(studentVisibilitySwitch.props().modelValue).toBe(false);
				});

				it("should be set to false if no property found on school", () => {
					createTestEnvStore({
						TEACHER_STUDENT_VISIBILITY__IS_CONFIGURABLE: true,
						TEACHER_STUDENT_VISIBILITY__IS_VISIBLE: true,
					});
					const wrapper = getWrapper(
						Object.assign(generateProps(), {
							permissions: {},
						})
					);

					const studentVisibilitySwitch = wrapper.findComponent(`[data-testid=${searchStrings.studentVisibility}]`);

					expect(studentVisibilitySwitch.props().modelValue).toBe(false);
				});
			});

			describe("when not configurable", () => {
				it("should be set to true based on env var", () => {
					createTestEnvStore({
						TEACHER_STUDENT_VISIBILITY__IS_CONFIGURABLE: false,
						TEACHER_STUDENT_VISIBILITY__IS_ENABLED_BY_DEFAULT: true,
						TEACHER_STUDENT_VISIBILITY__IS_VISIBLE: true,
					});

					const wrapper = getWrapper();

					const studentVisibilitySwitch = wrapper.findComponent(`[data-testid=${searchStrings.studentVisibility}]`);

					expect(studentVisibilitySwitch.props().modelValue).toBe(true);
				});

				it("should be set to false based on env var", () => {
					createTestEnvStore({
						TEACHER_STUDENT_VISIBILITY__IS_CONFIGURABLE: false,
						TEACHER_STUDENT_VISIBILITY__IS_ENABLED_BY_DEFAULT: false,
						TEACHER_STUDENT_VISIBILITY__IS_VISIBLE: true,
					});
					const wrapper = getWrapper();

					const studentVisibilitySwitch = wrapper.findComponent(`[data-testid=${searchStrings.studentVisibility}]`);

					expect(studentVisibilitySwitch.props().modelValue).toBe(false);
				});
			});
		});

		describe("learn store switch", () => {
			it("should be set to true based on school permission", () => {
				createTestEnvStore({
					FEATURE_ADMIN_TOGGLE_STUDENT_LERNSTORE_VIEW_ENABLED: true,
					FEATURE_LERNSTORE_ENABLED: true,
				});
				const wrapper = getWrapper(
					Object.assign(generateProps(), {
						permissions: {
							student: {
								LERNSTORE_VIEW: true,
							},
						},
					})
				);

				const learnStoreSwitch = wrapper.findComponent(`[data-testid=${searchStrings.learnStore}]`);

				expect(learnStoreSwitch.props().modelValue).toBe(true);
			});

			it("should be set to false based on school permission", () => {
				createTestEnvStore({
					FEATURE_ADMIN_TOGGLE_STUDENT_LERNSTORE_VIEW_ENABLED: true,
					FEATURE_LERNSTORE_ENABLED: true,
				});
				const wrapper = getWrapper(
					Object.assign(generateProps(), {
						permissions: {
							student: {
								LERNSTORE_VIEW: false,
							},
						},
					})
				);

				const learnStoreSwitch = wrapper.findComponent(`[data-testid=${searchStrings.learnStore}]`);

				expect(learnStoreSwitch.props().modelValue).toBe(false);
			});
		});

		describe("videoconference switch", () => {
			it("should be set to true based on school feature", () => {
				createTestEnvStore({ FEATURE_VIDEOCONFERENCE_ENABLED: true });
				const wrapper = getWrapper(
					Object.assign(generateProps(), {
						features: {
							videoconference: true,
						},
					})
				);

				const videoconferenceSwitch = wrapper.findComponent(`[data-testid=${searchStrings.videoconference}]`);

				expect(videoconferenceSwitch.props().modelValue).toBe(true);
			});

			it("should be set to false based on school feature", () => {
				createTestEnvStore({ FEATURE_VIDEOCONFERENCE_ENABLED: true });

				const wrapper = getWrapper(
					Object.assign(generateProps(), {
						features: {
							videoconference: false,
						},
					})
				);

				const videoconferenceSwitch = wrapper.findComponent(`[data-testid=${searchStrings.videoconference}]`);

				expect(videoconferenceSwitch.props().modelValue).toBe(false);
			});
		});

		describe("rocketchat switch", () => {
			it("should be set to true based on school feature", () => {
				createTestEnvStore({ ROCKETCHAT_SERVICE_ENABLED: true });

				const wrapper = getWrapper(
					Object.assign(generateProps(), {
						features: {
							rocketChat: true,
						},
					})
				);

				const rocketChatSwitch = wrapper.findComponent(`[data-testid=${searchStrings.rocketChat}]`);

				expect(rocketChatSwitch.props().modelValue).toBe(true);
			});

			it("should be set to false based on school feature", () => {
				createTestEnvStore({ ROCKETCHAT_SERVICE_ENABLED: true });
				const wrapper = getWrapper(
					Object.assign(generateProps(), {
						features: {
							rocketChat: false,
						},
					})
				);

				const rocketChatSwitch = wrapper.findComponent(`[data-testid=${searchStrings.rocketChat}]`);

				expect(rocketChatSwitch.props().modelValue).toBe(false);
			});
		});
	});

	describe("events", () => {
		it("should emit on value change for learnstore switch", () => {
			createTestEnvStore({
				FEATURE_ADMIN_TOGGLE_STUDENT_LERNSTORE_VIEW_ENABLED: true,
				FEATURE_LERNSTORE_ENABLED: true,
			});

			const wrapper = getWrapper();
			const learnStoreSwitch = wrapper.findComponent(`[data-testid=${searchStrings.learnStore}]`);

			learnStoreSwitch.vm.$emit("update:modelValue", false);

			let emitted = wrapper.emitted();
			expect(emitted["update-privacy-settings"]).toHaveLength(1);
			expect(emitted["update-privacy-settings"][0][0]).toBe(false);
			expect(emitted["update-privacy-settings"][0][1]).toBe("student.LERNSTORE_VIEW");

			learnStoreSwitch.vm.$emit("update:modelValue", true);

			emitted = wrapper.emitted();
			expect(emitted["update-privacy-settings"]).toHaveLength(2);
			expect(emitted["update-privacy-settings"][1][0]).toBe(true);
			expect(emitted["update-privacy-settings"][1][1]).toBe("student.LERNSTORE_VIEW");
		});

		it("should emit on value change for student visibility switch", () => {
			createTestEnvStore({
				TEACHER_STUDENT_VISIBILITY__IS_CONFIGURABLE: true,
				TEACHER_STUDENT_VISIBILITY__IS_VISIBLE: true,
			});
			const wrapper = getWrapper();

			const studentVisibilitySwitch = wrapper.findComponent(`[data-testid=${searchStrings.studentVisibility}]`);
			studentVisibilitySwitch.vm.$emit("update:modelValue", false);

			let emitted = wrapper.emitted();
			expect(emitted["update-privacy-settings"]).toHaveLength(1);
			expect(emitted["update-privacy-settings"][0][0]).toBe(false);
			expect(emitted["update-privacy-settings"][0][1]).toBe("teacher.STUDENT_LIST");

			studentVisibilitySwitch.vm.$emit("update:modelValue", true);

			emitted = wrapper.emitted();
			expect(emitted["update-privacy-settings"]).toHaveLength(2);
			expect(emitted["update-privacy-settings"][1][0]).toBe(true);
			expect(emitted["update-privacy-settings"][1][1]).toBe("teacher.STUDENT_LIST");
		});

		it("should emit on value change for rocketChat switch", () => {
			createTestEnvStore({ ROCKETCHAT_SERVICE_ENABLED: true });

			const wrapper = getWrapper();

			const rocketChatSwitch = wrapper.findComponent(`[data-testid=${searchStrings.rocketChat}]`);
			rocketChatSwitch.vm.$emit("update:modelValue", false);

			let emitted = wrapper.emitted();
			expect(emitted["update-feature-settings"]).toHaveLength(1);
			expect(emitted["update-feature-settings"][0][0]).toBe(false);
			expect(emitted["update-feature-settings"][0][1]).toBe("rocketChat");

			rocketChatSwitch.vm.$emit("update:modelValue", true);

			emitted = wrapper.emitted();
			expect(emitted["update-feature-settings"]).toHaveLength(2);
			expect(emitted["update-feature-settings"][1][0]).toBe(true);
			expect(emitted["update-feature-settings"][1][1]).toBe("rocketChat");
		});

		it("should emit on value change for videoConference switch", () => {
			createTestEnvStore({ FEATURE_VIDEOCONFERENCE_ENABLED: true });
			const wrapper = getWrapper();

			const videoconferenceSwitch = wrapper.findComponent(`[data-testid=${searchStrings.videoconference}]`);
			videoconferenceSwitch.vm.$emit("update:modelValue", false);

			let emitted = wrapper.emitted();
			expect(emitted["update-feature-settings"]).toHaveLength(1);
			expect(emitted["update-feature-settings"][0][0]).toBe(false);
			expect(emitted["update-feature-settings"][0][1]).toBe("videoconference");

			videoconferenceSwitch.vm.$emit("update:modelValue", true);

			emitted = wrapper.emitted();
			expect(emitted["update-feature-settings"]).toHaveLength(2);
			expect(emitted["update-feature-settings"][1][0]).toBe(true);
			expect(emitted["update-feature-settings"][1][1]).toBe("videoconference");
		});
	});
});
