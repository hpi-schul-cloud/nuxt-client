import PrivacySettings from "./PrivacySettings";
import { authModule, envConfigModule } from "@/store";
import setupStores from "@@/tests/test-utils/setupStores";
import EnvConfigModule from "@/store/env-config";
import AuthModule from "@/store/auth";

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
	studentVisibility: ".student-visibility-switch",
	learnStore: ".learnstore-switch",
	rocketChat: ".rocketchat-switch",
	videoconference: ".videoconference-switch",
};

describe("PrivacySettings", () => {
	beforeEach(() => {
		setupStores({
			authModule: AuthModule,
			envConfigModule: EnvConfigModule,
		});
	});

	describe("env config", () => {
		describe("when env var for visibility is true", () => {
			it("should render visibility switch", () => {
				envConfigModule.setEnvs({
					TEACHER_STUDENT_VISIBILITY__IS_VISIBLE: true,
				});

				const wrapper = mount(PrivacySettings, {
					...createComponentMocks({
						i18n: true,
						vuetify: true,
					}),
					propsData: generateProps(),
				});

				expect(wrapper.findAll(searchStrings.studentVisibility)).toHaveLength(
					1
				);
			});
		});
		describe("when env var for visibility is false", () => {
			it("should not render student visibility switch", () => {
				envConfigModule.setEnvs({
					TEACHER_STUDENT_VISIBILITY__IS_VISIBLE: false,
				});

				const wrapper = mount(PrivacySettings, {
					...createComponentMocks({
						i18n: true,
						vuetify: true,
					}),
					propsData: generateProps(),
				});

				expect(wrapper.findAll(searchStrings.studentVisibility)).toHaveLength(
					0
				);
			});
		});
		describe("when env var for configurability is true", () => {
			it("should enable student visibility switch", () => {
				envConfigModule.setEnvs({
					TEACHER_STUDENT_VISIBILITY__IS_CONFIGURABLE: true,
					TEACHER_STUDENT_VISIBILITY__IS_VISIBLE: true,
				});

				const wrapper = mount(PrivacySettings, {
					...createComponentMocks({
						i18n: true,
						vuetify: true,
					}),
					propsData: generateProps(),
				});

				const studentVisibilitySwitch = wrapper.find(
					`${searchStrings.studentVisibility} input`
				);

				expect(studentVisibilitySwitch.element.disabled).toBeFalsy();
			});
		});
		describe("when env var for configurability is false", () => {
			it("should disable student visibility switch", () => {
				envConfigModule.setEnvs({
					TEACHER_STUDENT_VISIBILITY__IS_CONFIGURABLE: false,
					TEACHER_STUDENT_VISIBILITY__IS_VISIBLE: true,
				});

				const wrapper = mount(PrivacySettings, {
					...createComponentMocks({
						i18n: true,
						vuetify: true,
					}),
					propsData: generateProps(),
				});

				const studentVisibilitySwitch = wrapper.find(
					`${searchStrings.studentVisibility} input`
				);

				expect(studentVisibilitySwitch.element.disabled).toBeTruthy();
			});
		});
		describe("when env vars for learn store are true", () => {
			it("should display learn store switch", () => {
				envConfigModule.setEnvs({
					FEATURE_ADMIN_TOGGLE_STUDENT_LERNSTORE_VIEW_ENABLED: true,
					FEATURE_LERNSTORE_ENABLED: true,
				});
				const wrapper = mount(PrivacySettings, {
					...createComponentMocks({
						i18n: true,
						vuetify: true,
					}),
					propsData: generateProps(),
				});

				expect(wrapper.findAll(searchStrings.learnStore)).toHaveLength(1);
			});
		});
		describe("when env vars for learn store are false", () => {
			it("should hide learn store switch", () => {
				envConfigModule.setEnvs({
					FEATURE_ADMIN_TOGGLE_STUDENT_LERNSTORE_VIEW_ENABLED: false,
					FEATURE_LERNSTORE_ENABLED: true,
				});
				const wrapper = mount(PrivacySettings, {
					...createComponentMocks({
						i18n: true,
						vuetify: true,
					}),
					propsData: generateProps(),
				});

				expect(wrapper.findAll(searchStrings.learnStore)).toHaveLength(0);
			});
		});
		describe("when env var for videoconference is true", () => {
			it("should display videoconference feature switch", () => {
				envConfigModule.setEnvs({
					FEATURE_VIDEOCONFERENCE_ENABLED: true,
				});
				const wrapper = mount(PrivacySettings, {
					...createComponentMocks({
						i18n: true,
						vuetify: true,
					}),
					propsData: generateProps(),
				});

				expect(wrapper.findAll(searchStrings.videoconference)).toHaveLength(1);
			});
		});
		describe("when env var for videoconference is false", () => {
			it("should hide videoconference feature switch", () => {
				envConfigModule.setEnvs({
					FEATURE_VIDEOCONFERENCE_ENABLED: false,
				});
				const wrapper = mount(PrivacySettings, {
					...createComponentMocks({
						i18n: true,
						vuetify: true,
					}),
					propsData: generateProps(),
				});

				expect(wrapper.findAll(searchStrings.videoconference)).toHaveLength(0);
			});
		});
		describe("when env var for rocketchat is true", () => {
			it("should display rocketchat feature switch", () => {
				envConfigModule.setEnvs({
					ROCKETCHAT_SERVICE_ENABLED: true,
				});
				const wrapper = mount(PrivacySettings, {
					...createComponentMocks({
						i18n: true,
						vuetify: true,
					}),
					propsData: generateProps(),
				});

				expect(wrapper.findAll(searchStrings.rocketChat)).toHaveLength(1);
			});
		});
		describe("when env var for rocketchat is false", () => {
			it("should hide rocketchat feature switch", () => {
				envConfigModule.setEnvs({
					ROCKETCHAT_SERVICE_ENABLED: false,
				});
				const wrapper = mount(PrivacySettings, {
					...createComponentMocks({
						i18n: true,
						vuetify: true,
					}),
					propsData: generateProps(),
				});

				expect(wrapper.findAll(searchStrings.rocketChat)).toHaveLength(0);
			});
		});
	});

	describe("default values", () => {
		describe("student visibility switch", () => {
			describe("when configurable", () => {
				it("should be set to true based on school permission", () => {
					envConfigModule.setEnvs({
						TEACHER_STUDENT_VISIBILITY__IS_CONFIGURABLE: true,
						TEACHER_STUDENT_VISIBILITY__IS_VISIBLE: true,
					});
					const wrapper = mount(PrivacySettings, {
						...createComponentMocks({
							i18n: true,
							vuetify: true,
						}),
						propsData: Object.assign(generateProps(), {
							permissions: {
								teacher: {
									STUDENT_LIST: true,
								},
							},
						}),
					});

					const studentVisibilitySwitch = wrapper.find(
						`${searchStrings.studentVisibility} input`
					);

					expect(studentVisibilitySwitch.element.checked).toBeTruthy();
				});
				it("should be set to false based on school permission", () => {
					envConfigModule.setEnvs({
						TEACHER_STUDENT_VISIBILITY__IS_CONFIGURABLE: true,
						TEACHER_STUDENT_VISIBILITY__IS_VISIBLE: true,
					});
					const wrapper = mount(PrivacySettings, {
						...createComponentMocks({
							i18n: true,
							vuetify: true,
						}),
						propsData: Object.assign(generateProps(), {
							permissions: {
								teacher: {
									STUDENT_LIST: false,
								},
							},
						}),
					});

					const studentVisibilitySwitch = wrapper.find(
						`${searchStrings.studentVisibility} input`
					);

					expect(studentVisibilitySwitch.element.checked).toBeFalsy();
				});
				it("should be set to false if no property found on school", () => {
					envConfigModule.setEnvs({
						TEACHER_STUDENT_VISIBILITY__IS_CONFIGURABLE: true,
						TEACHER_STUDENT_VISIBILITY__IS_VISIBLE: true,
					});
					const wrapper = mount(PrivacySettings, {
						...createComponentMocks({
							i18n: true,
							vuetify: true,
						}),
						propsData: Object.assign(generateProps(), {
							permissions: {},
						}),
					});

					const studentVisibilitySwitch = wrapper.find(
						`${searchStrings.studentVisibility} input`
					);

					expect(studentVisibilitySwitch.element.checked).toBeFalsy();
				});
			});
			describe("when not configurable", () => {
				it("should be set to true based on env var", () => {
					envConfigModule.setEnvs({
						TEACHER_STUDENT_VISIBILITY__IS_CONFIGURABLE: false,
						TEACHER_STUDENT_VISIBILITY__IS_ENABLED_BY_DEFAULT: true,
						TEACHER_STUDENT_VISIBILITY__IS_VISIBLE: true,
					});
					const wrapper = mount(PrivacySettings, {
						...createComponentMocks({
							i18n: true,
							vuetify: true,
						}),
						propsData: generateProps(),
					});

					const studentVisibilitySwitch = wrapper.find(
						`${searchStrings.studentVisibility} input`
					);

					expect(studentVisibilitySwitch.element.checked).toBeTruthy();
				});
				it("should be set to false based on env var", () => {
					envConfigModule.setEnvs({
						TEACHER_STUDENT_VISIBILITY__IS_CONFIGURABLE: false,
						TEACHER_STUDENT_VISIBILITY__IS_ENABLED_BY_DEFAULT: false,
						TEACHER_STUDENT_VISIBILITY__IS_VISIBLE: true,
					});
					const wrapper = mount(PrivacySettings, {
						...createComponentMocks({
							i18n: true,
							vuetify: true,
						}),
						propsData: generateProps(),
					});

					const studentVisibilitySwitch = wrapper.find(
						`${searchStrings.studentVisibility} input`
					);

					expect(studentVisibilitySwitch.element.checked).toBeFalsy();
				});
			});
		});
		describe("learn store switch", () => {
			it("should be set to true based on school permission", () => {
				envConfigModule.setEnvs({
					FEATURE_ADMIN_TOGGLE_STUDENT_LERNSTORE_VIEW_ENABLED: true,
					FEATURE_LERNSTORE_ENABLED: true,
				});
				const wrapper = mount(PrivacySettings, {
					...createComponentMocks({
						i18n: true,
						vuetify: true,
					}),
					propsData: Object.assign(generateProps(), {
						permissions: {
							student: {
								LERNSTORE_VIEW: true,
							},
						},
					}),
				});

				const learnStoreSwitch = wrapper.find(
					`${searchStrings.learnStore} input`
				);

				expect(learnStoreSwitch.element.checked).toBeTruthy();
			});
			it("should be set to false based on school permission", () => {
				envConfigModule.setEnvs({
					FEATURE_ADMIN_TOGGLE_STUDENT_LERNSTORE_VIEW_ENABLED: true,
					FEATURE_LERNSTORE_ENABLED: true,
				});
				const wrapper = mount(PrivacySettings, {
					...createComponentMocks({
						i18n: true,
						vuetify: true,
					}),
					propsData: Object.assign(generateProps(), {
						permissions: {
							student: {
								LERNSTORE_VIEW: false,
							},
						},
					}),
				});

				const learnStoreSwitch = wrapper.find(
					`${searchStrings.learnStore} input`
				);

				expect(learnStoreSwitch.element.checked).toBeFalsy();
			});
		});
		describe("videoconference switch", () => {
			it("should be set to true based on school feature", () => {
				envConfigModule.setEnvs({
					FEATURE_VIDEOCONFERENCE_ENABLED: true,
				});
				const wrapper = mount(PrivacySettings, {
					...createComponentMocks({
						i18n: true,
						vuetify: true,
					}),
					propsData: Object.assign(generateProps(), {
						features: {
							videoconference: true,
						},
					}),
				});

				const videoconferenceSwitch = wrapper.find(
					`${searchStrings.videoconference} input`
				);

				expect(videoconferenceSwitch.element.checked).toBeTruthy();
			});
			it("should be set to false based on school feature", () => {
				envConfigModule.setEnvs({
					FEATURE_VIDEOCONFERENCE_ENABLED: true,
				});
				const wrapper = mount(PrivacySettings, {
					...createComponentMocks({
						i18n: true,
						vuetify: true,
					}),
					propsData: Object.assign(generateProps(), {
						features: {
							videoconference: false,
						},
					}),
				});

				const videoconferenceSwitch = wrapper.find(
					`${searchStrings.videoconference} input`
				);

				expect(videoconferenceSwitch.element.checked).toBeFalsy();
			});
		});
		describe("rocketchat switch", () => {
			it("should be set to true based on school feature", () => {
				envConfigModule.setEnvs({
					ROCKETCHAT_SERVICE_ENABLED: true,
				});
				const wrapper = mount(PrivacySettings, {
					...createComponentMocks({
						i18n: true,
						vuetify: true,
					}),
					propsData: Object.assign(generateProps(), {
						features: {
							rocketChat: true,
						},
					}),
				});

				const rocketChatSwitch = wrapper.find(
					`${searchStrings.rocketChat} input`
				);

				expect(rocketChatSwitch.element.checked).toBeTruthy();
			});
			it("should be set to false based on school feature", () => {
				envConfigModule.setEnvs({
					ROCKETCHAT_SERVICE_ENABLED: true,
				});
				const wrapper = mount(PrivacySettings, {
					...createComponentMocks({
						i18n: true,
						vuetify: true,
					}),
					propsData: Object.assign(generateProps(), {
						features: {
							rocketChat: false,
						},
					}),
				});

				const rocketChatSwitch = wrapper.find(
					`${searchStrings.rocketChat} input`
				);

				expect(rocketChatSwitch.element.checked).toBeFalsy();
			});
		});
	});

	describe("events", () => {
		it("should emit on value change for learnstore switch", async () => {
			envConfigModule.setEnvs({
				FEATURE_ADMIN_TOGGLE_STUDENT_LERNSTORE_VIEW_ENABLED: true,
				FEATURE_LERNSTORE_ENABLED: true,
			});
			authModule.addUserPermmission("SCHOOL_EDIT");

			const wrapper = mount(PrivacySettings, {
				...createComponentMocks({
					i18n: true,
					vuetify: true,
				}),
				propsData: generateProps(),
			});
			const learnStoreSwitch = wrapper.find(
				`${searchStrings.learnStore} input`
			);
			learnStoreSwitch.trigger("click");
			await wrapper.vm.$nextTick();

			let emitted = wrapper.emitted();
			expect(emitted["update-privacy-settings"]).toHaveLength(1);
			expect(emitted["update-privacy-settings"][0][0]).toBeFalsy();
			expect(emitted["update-privacy-settings"][0][1]).toBe(
				"student.LERNSTORE_VIEW"
			);

			learnStoreSwitch.trigger("click");
			await wrapper.vm.$nextTick();

			emitted = wrapper.emitted();
			expect(emitted["update-privacy-settings"]).toHaveLength(2);
			expect(emitted["update-privacy-settings"][1][0]).toBeTruthy();
			expect(emitted["update-privacy-settings"][1][1]).toBe(
				"student.LERNSTORE_VIEW"
			);
		});
		it("should emit on value change for student visibility switch", async () => {
			envConfigModule.setEnvs({
				TEACHER_STUDENT_VISIBILITY__IS_CONFIGURABLE: true,
				TEACHER_STUDENT_VISIBILITY__IS_VISIBLE: true,
			});
			const wrapper = mount(PrivacySettings, {
				...createComponentMocks({
					i18n: true,
					vuetify: true,
				}),
				propsData: generateProps(),
			});

			const studentVisibilitySwitch = wrapper.find(
				`${searchStrings.studentVisibility} input`
			);
			studentVisibilitySwitch.trigger("click");
			await wrapper.vm.$nextTick();

			let emitted = wrapper.emitted();
			expect(emitted["update-privacy-settings"]).toHaveLength(1);
			expect(emitted["update-privacy-settings"][0][0]).toBeFalsy();
			expect(emitted["update-privacy-settings"][0][1]).toBe(
				"teacher.STUDENT_LIST"
			);

			studentVisibilitySwitch.trigger("click");
			await wrapper.vm.$nextTick();

			emitted = wrapper.emitted();
			expect(emitted["update-privacy-settings"]).toHaveLength(2);
			expect(emitted["update-privacy-settings"][1][0]).toBeTruthy();
			expect(emitted["update-privacy-settings"][1][1]).toBe(
				"teacher.STUDENT_LIST"
			);
		});

		it("should emit on value change for rocketChat switch", async () => {
			envConfigModule.setEnvs({
				ROCKETCHAT_SERVICE_ENABLED: true,
			});
			authModule.addUserPermmission("SCHOOL_EDIT");

			const wrapper = mount(PrivacySettings, {
				...createComponentMocks({
					i18n: true,
					vuetify: true,
				}),
				propsData: generateProps(),
			});

			const rocketChatSwitch = wrapper.find(
				`${searchStrings.rocketChat} input`
			);
			rocketChatSwitch.trigger("click");
			await wrapper.vm.$nextTick();

			let emitted = wrapper.emitted();
			expect(emitted["update-feature-settings"]).toHaveLength(1);
			expect(emitted["update-feature-settings"][0][0]).toBeFalsy();
			expect(emitted["update-feature-settings"][0][1]).toBe("rocketChat");

			rocketChatSwitch.trigger("click");
			await wrapper.vm.$nextTick();

			emitted = wrapper.emitted();
			expect(emitted["update-feature-settings"]).toHaveLength(2);
			expect(emitted["update-feature-settings"][1][0]).toBeTruthy();
			expect(emitted["update-feature-settings"][1][1]).toBe("rocketChat");
		});

		it("should emit on value change for videoConference switch", async () => {
			envConfigModule.setEnvs({
				FEATURE_VIDEOCONFERENCE_ENABLED: true,
			});
			const wrapper = mount(PrivacySettings, {
				...createComponentMocks({
					i18n: true,
					vuetify: true,
				}),
				propsData: generateProps(),
			});

			const videoconferenceSwitch = wrapper.find(
				`${searchStrings.videoconference} input`
			);
			videoconferenceSwitch.trigger("click");
			await wrapper.vm.$nextTick();

			let emitted = wrapper.emitted();
			expect(emitted["update-feature-settings"]).toHaveLength(1);
			expect(emitted["update-feature-settings"][0][0]).toBeFalsy();
			expect(emitted["update-feature-settings"][0][1]).toBe("videoconference");

			videoconferenceSwitch.trigger("click");
			await wrapper.vm.$nextTick();

			emitted = wrapper.emitted();
			expect(emitted["update-feature-settings"]).toHaveLength(2);
			expect(emitted["update-feature-settings"][1][0]).toBeTruthy();
			expect(emitted["update-feature-settings"][1][1]).toBe("videoconference");
		});
	});
});
