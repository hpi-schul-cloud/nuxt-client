import { envConfigModule } from "@/store";
import EnvConfigModule from "@/store/env-config";
import { envsFactory } from "@@/tests/test-utils";
import {
	createTestingI18n,
	createTestingVuetify,
} from "@@/tests/test-utils/setup";
import setupStores from "@@/tests/test-utils/setupStores";
import PrivacySettings from "./PrivacySettings";

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
};

const getWrapper = (props = generateProps()) => {
	return mount(PrivacySettings, {
		global: {
			plugins: [createTestingVuetify(), createTestingI18n()],
		},
		props,
	});
};

describe("PrivacySettings", () => {
	beforeEach(() => {
		setupStores({
			envConfigModule: EnvConfigModule,
		});
	});

	describe("env config", () => {
		describe("when env var for visibility is true", () => {
			it("should render visibility switch", () => {
				const envs = envsFactory.build({
					TEACHER_STUDENT_VISIBILITY__IS_VISIBLE: true,
				});
				envConfigModule.setEnvs(envs);

				const wrapper = getWrapper();

				expect(
					wrapper.findAll(`[data-testid=${searchStrings.studentVisibility}]`)
				).toHaveLength(1);
			});
		});

		describe("when env var for visibility is false", () => {
			it("should not render student visibility switch", () => {
				const envs = envsFactory.build({
					TEACHER_STUDENT_VISIBILITY__IS_VISIBLE: false,
				});
				envConfigModule.setEnvs(envs);

				const wrapper = getWrapper();

				expect(
					wrapper.findAll(`[data-testid=${searchStrings.studentVisibility}]`)
				).toHaveLength(0);
			});
		});

		describe("when env var for configurability is true", () => {
			it("should enable student visibility switch", () => {
				const envs = envsFactory.build({
					TEACHER_STUDENT_VISIBILITY__IS_CONFIGURABLE: true,
					TEACHER_STUDENT_VISIBILITY__IS_VISIBLE: true,
				});
				envConfigModule.setEnvs(envs);

				const wrapper = getWrapper();

				const studentVisibilitySwitch = wrapper.findComponent(
					`[data-testid=${searchStrings.studentVisibility}]`
				);

				expect(studentVisibilitySwitch.props().disabled).toBe(false);
			});
		});

		describe("when env var for configurability is false", () => {
			it("should disable student visibility switch", () => {
				const envs = envsFactory.build({
					TEACHER_STUDENT_VISIBILITY__IS_CONFIGURABLE: false,
					TEACHER_STUDENT_VISIBILITY__IS_VISIBLE: true,
				});
				envConfigModule.setEnvs(envs);

				const wrapper = getWrapper();

				const studentVisibilitySwitch = wrapper.findComponent(
					`[data-testid=${searchStrings.studentVisibility}]`
				);

				expect(studentVisibilitySwitch.props().disabled).toBe(true);
			});
		});

		describe("when env vars for learn store are true", () => {
			it("should display learn store switch", () => {
				const envs = envsFactory.build({
					FEATURE_ADMIN_TOGGLE_STUDENT_LERNSTORE_VIEW_ENABLED: true,
					FEATURE_LERNSTORE_ENABLED: true,
				});
				envConfigModule.setEnvs(envs);
				const wrapper = getWrapper();

				expect(
					wrapper.findAll(`[data-testid=${searchStrings.learnStore}]`)
				).toHaveLength(1);
			});
		});

		describe("when env vars for learn store are false", () => {
			it("should hide learn store switch", () => {
				const envs = envsFactory.build({
					FEATURE_ADMIN_TOGGLE_STUDENT_LERNSTORE_VIEW_ENABLED: false,
					FEATURE_LERNSTORE_ENABLED: true,
				});
				envConfigModule.setEnvs(envs);
				const wrapper = getWrapper();

				expect(
					wrapper.findAll(`[data-testid=${searchStrings.learnStore}]`)
				).toHaveLength(0);
			});
		});

		describe("when env var for videoconference is true", () => {
			it("should display videoconference feature switch", () => {
				const envs = envsFactory.build({
					FEATURE_VIDEOCONFERENCE_ENABLED: true,
				});
				envConfigModule.setEnvs(envs);
				const wrapper = getWrapper();

				expect(
					wrapper.findAll(`[data-testid=${searchStrings.videoconference}]`)
				).toHaveLength(1);
			});
		});

		describe("when env var for videoconference is false", () => {
			it("should hide videoconference feature switch", () => {
				const envs = envsFactory.build({
					FEATURE_VIDEOCONFERENCE_ENABLED: false,
				});
				envConfigModule.setEnvs(envs);
				const wrapper = getWrapper();

				expect(
					wrapper.findAll(`[data-testid=${searchStrings.videoconference}]`)
				).toHaveLength(0);
			});
		});

		describe("when env var for rocketchat is true", () => {
			it("should display rocketchat feature switch", () => {
				const envs = envsFactory.build({
					ROCKETCHAT_SERVICE_ENABLED: true,
				});
				envConfigModule.setEnvs(envs);
				const wrapper = getWrapper();

				expect(
					wrapper.findAll(`[data-testid=${searchStrings.rocketChat}]`)
				).toHaveLength(1);
			});
		});

		describe("when env var for rocketchat is false", () => {
			it("should hide rocketchat feature switch", () => {
				const envs = envsFactory.build({
					ROCKETCHAT_SERVICE_ENABLED: false,
				});
				envConfigModule.setEnvs(envs);
				const wrapper = getWrapper();

				expect(
					wrapper.findAll(`[data-testid=${searchStrings.rocketChat}]`)
				).toHaveLength(0);
			});
		});
	});

	describe("default values", () => {
		describe("student visibility switch", () => {
			describe("when configurable", () => {
				it("should be set to true based on school permission", () => {
					const envs = envsFactory.build({
						TEACHER_STUDENT_VISIBILITY__IS_CONFIGURABLE: true,
						TEACHER_STUDENT_VISIBILITY__IS_VISIBLE: true,
					});
					envConfigModule.setEnvs(envs);
					const wrapper = getWrapper(
						Object.assign(generateProps(), {
							permissions: {
								teacher: {
									STUDENT_LIST: true,
								},
							},
						})
					);

					const studentVisibilitySwitch = wrapper.findComponent(
						`[data-testid=${searchStrings.studentVisibility}]`
					);

					expect(studentVisibilitySwitch.props().modelValue).toBe(true);
				});

				it("should be set to false based on school permission", () => {
					const envs = envsFactory.build({
						TEACHER_STUDENT_VISIBILITY__IS_CONFIGURABLE: true,
						TEACHER_STUDENT_VISIBILITY__IS_VISIBLE: true,
					});
					envConfigModule.setEnvs(envs);
					const wrapper = getWrapper(
						Object.assign(generateProps(), {
							permissions: {
								teacher: {
									STUDENT_LIST: false,
								},
							},
						})
					);

					const studentVisibilitySwitch = wrapper.findComponent(
						`[data-testid=${searchStrings.studentVisibility}]`
					);

					expect(studentVisibilitySwitch.props().modelValue).toBe(false);
				});

				it("should be set to false if no property found on school", () => {
					const envs = envsFactory.build({
						TEACHER_STUDENT_VISIBILITY__IS_CONFIGURABLE: true,
						TEACHER_STUDENT_VISIBILITY__IS_VISIBLE: true,
					});
					envConfigModule.setEnvs(envs);
					const wrapper = getWrapper(
						Object.assign(generateProps(), {
							permissions: {},
						})
					);

					const studentVisibilitySwitch = wrapper.findComponent(
						`[data-testid=${searchStrings.studentVisibility}]`
					);

					expect(studentVisibilitySwitch.props().modelValue).toBe(false);
				});
			});

			describe("when not configurable", () => {
				it("should be set to true based on env var", () => {
					const envs = envsFactory.build({
						TEACHER_STUDENT_VISIBILITY__IS_CONFIGURABLE: false,
						TEACHER_STUDENT_VISIBILITY__IS_ENABLED_BY_DEFAULT: true,
						TEACHER_STUDENT_VISIBILITY__IS_VISIBLE: true,
					});
					envConfigModule.setEnvs(envs);
					const wrapper = getWrapper();

					const studentVisibilitySwitch = wrapper.findComponent(
						`[data-testid=${searchStrings.studentVisibility}]`
					);

					expect(studentVisibilitySwitch.props().modelValue).toBe(true);
				});

				it("should be set to false based on env var", () => {
					const envs = envsFactory.build({
						TEACHER_STUDENT_VISIBILITY__IS_CONFIGURABLE: false,
						TEACHER_STUDENT_VISIBILITY__IS_ENABLED_BY_DEFAULT: false,
						TEACHER_STUDENT_VISIBILITY__IS_VISIBLE: true,
					});
					envConfigModule.setEnvs(envs);
					const wrapper = getWrapper();

					const studentVisibilitySwitch = wrapper.findComponent(
						`[data-testid=${searchStrings.studentVisibility}]`
					);

					expect(studentVisibilitySwitch.props().modelValue).toBe(false);
				});
			});
		});

		describe("learn store switch", () => {
			it("should be set to true based on school permission", () => {
				const envs = envsFactory.build({
					FEATURE_ADMIN_TOGGLE_STUDENT_LERNSTORE_VIEW_ENABLED: true,
					FEATURE_LERNSTORE_ENABLED: true,
				});
				envConfigModule.setEnvs(envs);
				const wrapper = getWrapper(
					Object.assign(generateProps(), {
						permissions: {
							student: {
								LERNSTORE_VIEW: true,
							},
						},
					})
				);

				const learnStoreSwitch = wrapper.findComponent(
					`[data-testid=${searchStrings.learnStore}]`
				);

				expect(learnStoreSwitch.props().modelValue).toBe(true);
			});

			it("should be set to false based on school permission", () => {
				const envs = envsFactory.build({
					FEATURE_ADMIN_TOGGLE_STUDENT_LERNSTORE_VIEW_ENABLED: true,
					FEATURE_LERNSTORE_ENABLED: true,
				});
				envConfigModule.setEnvs(envs);
				const wrapper = getWrapper(
					Object.assign(generateProps(), {
						permissions: {
							student: {
								LERNSTORE_VIEW: false,
							},
						},
					})
				);

				const learnStoreSwitch = wrapper.findComponent(
					`[data-testid=${searchStrings.learnStore}]`
				);

				expect(learnStoreSwitch.props().modelValue).toBe(false);
			});
		});

		describe("videoconference switch", () => {
			it("should be set to true based on school feature", () => {
				const envs = envsFactory.build({
					FEATURE_VIDEOCONFERENCE_ENABLED: true,
				});
				envConfigModule.setEnvs(envs);
				const wrapper = getWrapper(
					Object.assign(generateProps(), {
						features: {
							videoconference: true,
						},
					})
				);

				const videoconferenceSwitch = wrapper.findComponent(
					`[data-testid=${searchStrings.videoconference}]`
				);

				expect(videoconferenceSwitch.props().modelValue).toBe(true);
			});

			it("should be set to false based on school feature", () => {
				const envs = envsFactory.build({
					FEATURE_VIDEOCONFERENCE_ENABLED: true,
				});
				envConfigModule.setEnvs(envs);
				const wrapper = getWrapper(
					Object.assign(generateProps(), {
						features: {
							videoconference: false,
						},
					})
				);

				const videoconferenceSwitch = wrapper.findComponent(
					`[data-testid=${searchStrings.videoconference}]`
				);

				expect(videoconferenceSwitch.props().modelValue).toBe(false);
			});
		});

		describe("rocketchat switch", () => {
			it("should be set to true based on school feature", () => {
				const envs = envsFactory.build({
					ROCKETCHAT_SERVICE_ENABLED: true,
				});
				envConfigModule.setEnvs(envs);
				const wrapper = getWrapper(
					Object.assign(generateProps(), {
						features: {
							rocketChat: true,
						},
					})
				);

				const rocketChatSwitch = wrapper.findComponent(
					`[data-testid=${searchStrings.rocketChat}]`
				);

				expect(rocketChatSwitch.props().modelValue).toBe(true);
			});

			it("should be set to false based on school feature", () => {
				const envs = envsFactory.build({
					ROCKETCHAT_SERVICE_ENABLED: true,
				});
				envConfigModule.setEnvs(envs);
				const wrapper = getWrapper(
					Object.assign(generateProps(), {
						features: {
							rocketChat: false,
						},
					})
				);

				const rocketChatSwitch = wrapper.findComponent(
					`[data-testid=${searchStrings.rocketChat}]`
				);

				expect(rocketChatSwitch.props().modelValue).toBe(false);
			});
		});
	});

	describe("events", () => {
		it("should emit on value change for learnstore switch", () => {
			const envs = envsFactory.build({
				FEATURE_ADMIN_TOGGLE_STUDENT_LERNSTORE_VIEW_ENABLED: true,
				FEATURE_LERNSTORE_ENABLED: true,
			});
			envConfigModule.setEnvs(envs);

			const wrapper = getWrapper();
			const learnStoreSwitch = wrapper.findComponent(
				`[data-testid=${searchStrings.learnStore}]`
			);

			learnStoreSwitch.vm.$emit("update:modelValue", false);

			let emitted = wrapper.emitted();
			expect(emitted["update-privacy-settings"]).toHaveLength(1);
			expect(emitted["update-privacy-settings"][0][0]).toBe(false);
			expect(emitted["update-privacy-settings"][0][1]).toBe(
				"student.LERNSTORE_VIEW"
			);

			learnStoreSwitch.vm.$emit("update:modelValue", true);

			emitted = wrapper.emitted();
			expect(emitted["update-privacy-settings"]).toHaveLength(2);
			expect(emitted["update-privacy-settings"][1][0]).toBe(true);
			expect(emitted["update-privacy-settings"][1][1]).toBe(
				"student.LERNSTORE_VIEW"
			);
		});

		it("should emit on value change for student visibility switch", () => {
			const envs = envsFactory.build({
				TEACHER_STUDENT_VISIBILITY__IS_CONFIGURABLE: true,
				TEACHER_STUDENT_VISIBILITY__IS_VISIBLE: true,
			});
			envConfigModule.setEnvs(envs);
			const wrapper = getWrapper();

			const studentVisibilitySwitch = wrapper.findComponent(
				`[data-testid=${searchStrings.studentVisibility}]`
			);
			studentVisibilitySwitch.vm.$emit("update:modelValue", false);

			let emitted = wrapper.emitted();
			expect(emitted["update-privacy-settings"]).toHaveLength(1);
			expect(emitted["update-privacy-settings"][0][0]).toBe(false);
			expect(emitted["update-privacy-settings"][0][1]).toBe(
				"teacher.STUDENT_LIST"
			);

			studentVisibilitySwitch.vm.$emit("update:modelValue", true);

			emitted = wrapper.emitted();
			expect(emitted["update-privacy-settings"]).toHaveLength(2);
			expect(emitted["update-privacy-settings"][1][0]).toBe(true);
			expect(emitted["update-privacy-settings"][1][1]).toBe(
				"teacher.STUDENT_LIST"
			);
		});

		it("should emit on value change for rocketChat switch", () => {
			const envs = envsFactory.build({
				ROCKETCHAT_SERVICE_ENABLED: true,
			});
			envConfigModule.setEnvs(envs);

			const wrapper = getWrapper();

			const rocketChatSwitch = wrapper.findComponent(
				`[data-testid=${searchStrings.rocketChat}]`
			);
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
			const envs = envsFactory.build({
				FEATURE_VIDEOCONFERENCE_ENABLED: true,
			});
			envConfigModule.setEnvs(envs);
			const wrapper = getWrapper();

			const videoconferenceSwitch = wrapper.findComponent(
				`[data-testid=${searchStrings.videoconference}]`
			);
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
