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
		it("should display permission switches", () => {
			envConfigModule.setEnvs({
				FEATURE_ADMIN_TOGGLE_STUDENT_LERNSTORE_VIEW_ENABLED: true,
				FEATURE_LERNSTORE_ENABLED: true,
				TEACHER_STUDENT_VISIBILITY__IS_CONFIGURABLE: true,
			});
			const wrapper = mount(PrivacySettings, {
				...createComponentMocks({
					i18n: true,
					vuetify: true,
				}),
				propsData: generateProps(),
			});

			expect(wrapper.findAll(searchStrings.studentVisibility)).toHaveLength(1);
			expect(wrapper.findAll(searchStrings.learnStore)).toHaveLength(1);
		});
		it("should hide permission switches", () => {
			envConfigModule.setEnvs({
				FEATURE_ADMIN_TOGGLE_STUDENT_LERNSTORE_VIEW_ENABLED: false,
				FEATURE_LERNSTORE_ENABLED: true,
				TEACHER_STUDENT_VISIBILITY__IS_CONFIGURABLE: false,
			});
			const wrapper = mount(PrivacySettings, {
				...createComponentMocks({
					i18n: true,
					vuetify: true,
				}),
				propsData: generateProps(),
			});

			expect(wrapper.findAll(searchStrings.studentVisibility)).toHaveLength(0);
			expect(wrapper.findAll(searchStrings.learnStore)).toHaveLength(0);
		});
		it("should display videoconference and rocketchat feature", () => {
			envConfigModule.setEnvs({
				FEATURE_VIDEOCONFERENCE_ENABLED: true,
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
			expect(wrapper.findAll(searchStrings.videoconference)).toHaveLength(1);
		});
		it("should hide videoconference and rocketchat feature", () => {
			envConfigModule.setEnvs({
				FEATURE_VIDEOCONFERENCE_ENABLED: false,
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
			expect(wrapper.findAll(searchStrings.videoconference)).toHaveLength(0);
		});

	});
	describe("default values", () => {
		it("should be correct for permissions (1)", () => {
			envConfigModule.setEnvs({
				FEATURE_ADMIN_TOGGLE_STUDENT_LERNSTORE_VIEW_ENABLED: true,
				FEATURE_LERNSTORE_ENABLED: true,
				TEACHER_STUDENT_VISIBILITY__IS_CONFIGURABLE: true,
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
						student: {
							LERNSTORE_VIEW: false,
						},
					},
				}),
			});

			const studentVisibilitySwitch = wrapper.find(
				`${searchStrings.studentVisibility} input`
			);
			const learnStoreSwitch = wrapper.find(
				`${searchStrings.learnStore} input`
			);
			expect(studentVisibilitySwitch.element.checked).toBeTruthy();
			expect(learnStoreSwitch.element.checked).toBeFalsy();
		});
		it("should be correct for permissions (2)", () => {
			envConfigModule.setEnvs({
				FEATURE_ADMIN_TOGGLE_STUDENT_LERNSTORE_VIEW_ENABLED: true,
				FEATURE_LERNSTORE_ENABLED: true,
				TEACHER_STUDENT_VISIBILITY__IS_CONFIGURABLE: true,
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
						student: {
							LERNSTORE_VIEW: true,
						},
					},
				}),
			});

			const studentVisibilitySwitch = wrapper.find(
				`${searchStrings.studentVisibility} input`
			);
			const learnStoreSwitch = wrapper.find(
				`${searchStrings.learnStore} input`
			);
			expect(studentVisibilitySwitch.element.checked).toBeFalsy();
			expect(learnStoreSwitch.element.checked).toBeTruthy();
		});

		it("should be correct for non matrix features (1)", () => {
			envConfigModule.setEnvs({
				FEATURE_VIDEOCONFERENCE_ENABLED: true,
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
						videoconference: true,
					},
				}),
			});

			const rocketChatSwitch = wrapper.find(
				`${searchStrings.rocketChat} input`
			);
			const videoconferenceSwitch = wrapper.find(
				`${searchStrings.videoconference} input`
			);
			expect(rocketChatSwitch.element.checked).toBeFalsy();
			expect(videoconferenceSwitch.element.checked).toBeTruthy();
		});
		it("should be correct for non matrix features (2)", () => {
			envConfigModule.setEnvs({
				FEATURE_VIDEOCONFERENCE_ENABLED: true,
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
						videoconference: false,
					},
				}),
			});

			const rocketChatSwitch = wrapper.find(
				`${searchStrings.rocketChat} input`
			);
			const videoconferenceSwitch = wrapper.find(
				`${searchStrings.videoconference} input`
			);
			expect(rocketChatSwitch.element.checked).toBeTruthy();
			expect(videoconferenceSwitch.element.checked).toBeFalsy();
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
