import PrivacySettings from "./PrivacySettings";
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
		messenger: true,
		messengerSchoolRoom: true,
		messengerStudentRoomCreate: true,
	},
});

const searchStrings = {
	studentVisibility: ".student-visibility-switch",
	learnStore: ".learnstore-switch",
	rocketChat: ".rocketchat-switch",
	videoconference: ".videoconference-switch",
	matrixMessenger: ".matrix-messenger-switch",
	messengerSchoolRoom: ".matrix-schoolroom-switch",
	messengerStudentRoomCreate: ".matrix-studentroom-switch",
};

describe("PrivacySettings", () => {
	beforeAll(() => {});

	it(...isValidComponent(PrivacySettings));

	describe("env config", () => {
		it("should display permission switches", () => {
			EnvConfigModule.setEnvs({
				FEATURE_ADMIN_TOGGLE_STUDENT_LERNSTORE_VIEW_ENABLED: true,
				FEATURE_LERNSTORE_ENABLED: true,
				FEATURE_ADMIN_TOGGLE_STUDENT_VISIBILITY_ENABLED: true,
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
			EnvConfigModule.setEnvs({
				FEATURE_ADMIN_TOGGLE_STUDENT_LERNSTORE_VIEW_ENABLED: false,
				FEATURE_LERNSTORE_ENABLED: true,
				FEATURE_ADMIN_TOGGLE_STUDENT_VISIBILITY_ENABLED: false,
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
		it("should display non matrix features", () => {
			EnvConfigModule.setEnvs({
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
		it("should hide non matrix features", () => {
			EnvConfigModule.setEnvs({
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
		it("should display matrix features", () => {
			EnvConfigModule.setEnvs({
				FEATURE_MATRIX_MESSENGER_ENABLED: true,
				MATRIX_MESSENGER__SCHOOL_SETTINGS_VISIBLE: true,
				MATRIX_MESSENGER__STUDENT_ROOM_CREATION: true,
				MATRIX_MESSENGER__SCHOOL_ROOM_ENABLED: true,
			});
			const wrapper = mount(PrivacySettings, {
				...createComponentMocks({
					i18n: true,
					vuetify: true,
				}),
				propsData: generateProps(),
			});

			expect(wrapper.findAll(searchStrings.matrixMessenger)).toHaveLength(1);
			expect(wrapper.findAll(searchStrings.messengerSchoolRoom)).toHaveLength(
				1
			);
			expect(
				wrapper.findAll(searchStrings.messengerStudentRoomCreate)
			).toHaveLength(1);
		});
		it("should hide matrix switches if feature is disabled", () => {
			EnvConfigModule.setEnvs({
				FEATURE_MATRIX_MESSENGER_ENABLED: false,
				MATRIX_MESSENGER__SCHOOL_SETTINGS_VISIBLE: true,
				MATRIX_MESSENGER__STUDENT_ROOM_CREATION: true,
				MATRIX_MESSENGER__SCHOOL_ROOM_ENABLED: true,
			});
			const wrapper = mount(PrivacySettings, {
				...createComponentMocks({
					i18n: true,
					vuetify: true,
				}),
				propsData: generateProps(),
			});

			expect(wrapper.findAll(searchStrings.matrixMessenger)).toHaveLength(0);
			expect(wrapper.findAll(searchStrings.messengerSchoolRoom)).toHaveLength(
				0
			);
			expect(
				wrapper.findAll(searchStrings.messengerStudentRoomCreate)
			).toHaveLength(0);
		});

		it("should hide matrix switches if school settings are disabled", () => {
			EnvConfigModule.setEnvs({
				FEATURE_MATRIX_MESSENGER_ENABLED: true,
				MATRIX_MESSENGER__SCHOOL_SETTINGS_VISIBLE: false,
				MATRIX_MESSENGER__STUDENT_ROOM_CREATION: true,
				MATRIX_MESSENGER__SCHOOL_ROOM_ENABLED: true,
			});
			const wrapper = mount(PrivacySettings, {
				...createComponentMocks({
					i18n: true,
					vuetify: true,
				}),
				propsData: generateProps(),
			});

			expect(wrapper.findAll(searchStrings.matrixMessenger)).toHaveLength(0);
			expect(wrapper.findAll(searchStrings.messengerSchoolRoom)).toHaveLength(
				0
			);
			expect(
				wrapper.findAll(searchStrings.messengerStudentRoomCreate)
			).toHaveLength(0);
		});
		it("should hide school room if feature is disabled", () => {
			EnvConfigModule.setEnvs({
				FEATURE_MATRIX_MESSENGER_ENABLED: true,
				MATRIX_MESSENGER__SCHOOL_SETTINGS_VISIBLE: true,
				MATRIX_MESSENGER__STUDENT_ROOM_CREATION: true,
				MATRIX_MESSENGER__SCHOOL_ROOM_ENABLED: false,
			});
			const wrapper = mount(PrivacySettings, {
				...createComponentMocks({
					i18n: true,
					vuetify: true,
				}),
				propsData: generateProps(),
			});

			expect(wrapper.findAll(searchStrings.matrixMessenger)).toHaveLength(1);
			expect(wrapper.findAll(searchStrings.messengerSchoolRoom)).toHaveLength(
				0
			);
			expect(
				wrapper.findAll(searchStrings.messengerStudentRoomCreate)
			).toHaveLength(1);
		});
		it("should hide student room creation if feature is disabled", () => {
			EnvConfigModule.setEnvs({
				FEATURE_MATRIX_MESSENGER_ENABLED: true,
				MATRIX_MESSENGER__SCHOOL_SETTINGS_VISIBLE: true,
				MATRIX_MESSENGER__STUDENT_ROOM_CREATION: false,
				MATRIX_MESSENGER__SCHOOL_ROOM_ENABLED: true,
			});
			const wrapper = mount(PrivacySettings, {
				...createComponentMocks({
					i18n: true,
					vuetify: true,
				}),
				propsData: generateProps(),
			});

			expect(wrapper.findAll(searchStrings.matrixMessenger)).toHaveLength(1);
			expect(wrapper.findAll(searchStrings.messengerSchoolRoom)).toHaveLength(
				1
			);
			expect(
				wrapper.findAll(searchStrings.messengerStudentRoomCreate)
			).toHaveLength(0);
		});
	});
	describe("default values", () => {
		it("should be correct for permissions (1)", () => {
			EnvConfigModule.setEnvs({
				FEATURE_ADMIN_TOGGLE_STUDENT_LERNSTORE_VIEW_ENABLED: true,
				FEATURE_LERNSTORE_ENABLED: true,
				FEATURE_ADMIN_TOGGLE_STUDENT_VISIBILITY_ENABLED: true,
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
			expect(studentVisibilitySwitch.element.checked).toBeTrue();
			expect(learnStoreSwitch.element.checked).toBeFalse();
		});
		it("should be correct for permissions (2)", () => {
			EnvConfigModule.setEnvs({
				FEATURE_ADMIN_TOGGLE_STUDENT_LERNSTORE_VIEW_ENABLED: true,
				FEATURE_LERNSTORE_ENABLED: true,
				FEATURE_ADMIN_TOGGLE_STUDENT_VISIBILITY_ENABLED: true,
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
			expect(studentVisibilitySwitch.element.checked).toBeFalse();
			expect(learnStoreSwitch.element.checked).toBeTrue();
		});

		it("should be correct for matrix (1)", () => {
			EnvConfigModule.setEnvs({
				FEATURE_MATRIX_MESSENGER_ENABLED: true,
				MATRIX_MESSENGER__SCHOOL_SETTINGS_VISIBLE: true,
				MATRIX_MESSENGER__STUDENT_ROOM_CREATION: true,
				MATRIX_MESSENGER__SCHOOL_ROOM_ENABLED: true,
			});
			const wrapper = mount(PrivacySettings, {
				...createComponentMocks({
					i18n: true,
					vuetify: true,
				}),
				propsData: Object.assign(generateProps(), {
					features: {
						rocketChat: true,
						videoconference: true,
						messenger: true,
						messengerSchoolRoom: false,
						messengerStudentRoomCreate: true,
					},
				}),
			});

			const matrixMessengerSwitch = wrapper.find(
				`${searchStrings.matrixMessenger} input`
			);
			const messengerSchoolRoomSwitch = wrapper.find(
				`${searchStrings.messengerSchoolRoom} input`
			);
			const messengerStudentRoomCreateSwitch = wrapper.find(
				`${searchStrings.messengerStudentRoomCreate} input`
			);
			expect(matrixMessengerSwitch.element.checked).toBeTrue();
			expect(messengerSchoolRoomSwitch.element.checked).toBeFalse();
			expect(messengerStudentRoomCreateSwitch.element.checked).toBeTrue();
		});
		it("should be correct for matrix (2)", () => {
			EnvConfigModule.setEnvs({
				FEATURE_MATRIX_MESSENGER_ENABLED: true,
				MATRIX_MESSENGER__SCHOOL_SETTINGS_VISIBLE: true,
				MATRIX_MESSENGER__STUDENT_ROOM_CREATION: true,
				MATRIX_MESSENGER__SCHOOL_ROOM_ENABLED: true,
			});
			const wrapper = mount(PrivacySettings, {
				...createComponentMocks({
					i18n: true,
					vuetify: true,
				}),
				propsData: Object.assign(generateProps(), {
					features: {
						rocketChat: true,
						videoconference: true,
						messenger: false,
						messengerSchoolRoom: true,
						messengerStudentRoomCreate: false,
					},
				}),
			});

			const matrixMessengerSwitch = wrapper.find(
				`${searchStrings.matrixMessenger} input`
			);
			const messengerSchoolRoomSwitch = wrapper.find(
				`${searchStrings.messengerSchoolRoom} input`
			);
			const messengerStudentRoomCreateSwitch = wrapper.find(
				`${searchStrings.messengerStudentRoomCreate} input`
			);
			expect(matrixMessengerSwitch.element.checked).toBeFalse();
			expect(messengerSchoolRoomSwitch.element.checked).toBeTrue();
			expect(messengerStudentRoomCreateSwitch.element.checked).toBeFalse();
		});
		it("should be correct for non matrix features (1)", () => {
			EnvConfigModule.setEnvs({
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
						messenger: true,
						messengerSchoolRoom: true,
						messengerStudentRoomCreate: true,
					},
				}),
			});

			const rocketChatSwitch = wrapper.find(
				`${searchStrings.rocketChat} input`
			);
			const videoconferenceSwitch = wrapper.find(
				`${searchStrings.videoconference} input`
			);
			expect(rocketChatSwitch.element.checked).toBeFalse();
			expect(videoconferenceSwitch.element.checked).toBeTrue();
		});
		it("should be correct for non matrix features (2)", () => {
			EnvConfigModule.setEnvs({
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
						messenger: true,
						messengerSchoolRoom: true,
						messengerStudentRoomCreate: true,
					},
				}),
			});

			const rocketChatSwitch = wrapper.find(
				`${searchStrings.rocketChat} input`
			);
			const videoconferenceSwitch = wrapper.find(
				`${searchStrings.videoconference} input`
			);
			expect(rocketChatSwitch.element.checked).toBeTrue();
			expect(videoconferenceSwitch.element.checked).toBeFalse();
		});
	});

	describe("events", () => {
		it("should emit on value change for learnstore switch", async () => {
			EnvConfigModule.setEnvs({
				FEATURE_ADMIN_TOGGLE_STUDENT_LERNSTORE_VIEW_ENABLED: true,
				FEATURE_LERNSTORE_ENABLED: true,
				FEATURE_ADMIN_TOGGLE_STUDENT_VISIBILITY_ENABLED: true,
			});
			AuthModule.addUserPermmission("SCHOOL_EDIT");

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
			expect(emitted["update-privacy-settings"][0][0]).toBeFalse();
			expect(emitted["update-privacy-settings"][0][1]).toBe(
				"student.LERNSTORE_VIEW"
			);

			learnStoreSwitch.trigger("click");
			await wrapper.vm.$nextTick();

			emitted = wrapper.emitted();
			expect(emitted["update-privacy-settings"]).toHaveLength(2);
			expect(emitted["update-privacy-settings"][1][0]).toBeTrue();
			expect(emitted["update-privacy-settings"][1][1]).toBe(
				"student.LERNSTORE_VIEW"
			);
		});
		it("should emit on value change for student visibility switch", async () => {
			EnvConfigModule.setEnvs({
				FEATURE_ADMIN_TOGGLE_STUDENT_VISIBILITY_ENABLED: true,
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
			expect(emitted["update-privacy-settings"][0][0]).toBeFalse();
			expect(emitted["update-privacy-settings"][0][1]).toBe(
				"teacher.STUDENT_LIST"
			);

			studentVisibilitySwitch.trigger("click");
			await wrapper.vm.$nextTick();

			emitted = wrapper.emitted();
			expect(emitted["update-privacy-settings"]).toHaveLength(2);
			expect(emitted["update-privacy-settings"][1][0]).toBeTrue();
			expect(emitted["update-privacy-settings"][1][1]).toBe(
				"teacher.STUDENT_LIST"
			);
		});

		it("should emit on value change for rocketChat switch", async () => {
			EnvConfigModule.setEnvs({
				ROCKETCHAT_SERVICE_ENABLED: true,
			});
			AuthModule.addUserPermmission("SCHOOL_EDIT");

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
			expect(emitted["update-feature-settings"][0][0]).toBeFalse();
			expect(emitted["update-feature-settings"][0][1]).toBe("rocketChat");

			rocketChatSwitch.trigger("click");
			await wrapper.vm.$nextTick();

			emitted = wrapper.emitted();
			expect(emitted["update-feature-settings"]).toHaveLength(2);
			expect(emitted["update-feature-settings"][1][0]).toBeTrue();
			expect(emitted["update-feature-settings"][1][1]).toBe("rocketChat");
		});

		it("should emit on value change for videoConference switch", async () => {
			EnvConfigModule.setEnvs({
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
			expect(emitted["update-feature-settings"][0][0]).toBeFalse();
			expect(emitted["update-feature-settings"][0][1]).toBe("videoconference");

			videoconferenceSwitch.trigger("click");
			await wrapper.vm.$nextTick();

			emitted = wrapper.emitted();
			expect(emitted["update-feature-settings"]).toHaveLength(2);
			expect(emitted["update-feature-settings"][1][0]).toBeTrue();
			expect(emitted["update-feature-settings"][1][1]).toBe("videoconference");
		});

		it("should emit on value change for matrix", async () => {
			EnvConfigModule.setEnvs({
				FEATURE_MATRIX_MESSENGER_ENABLED: true,
				MATRIX_MESSENGER__SCHOOL_SETTINGS_VISIBLE: true,
				MATRIX_MESSENGER__STUDENT_ROOM_CREATION: true,
				MATRIX_MESSENGER__SCHOOL_ROOM_ENABLED: true,
			});
			AuthModule.addUserPermmission("SCHOOL_EDIT");

			const wrapper = mount(PrivacySettings, {
				...createComponentMocks({
					i18n: true,
					vuetify: true,
				}),
				propsData: generateProps(),
			});

			const matrixMessengerSwitch = wrapper.find(
				`${searchStrings.matrixMessenger} input`
			);
			const messengerSchoolRoomSwitch = wrapper.find(
				`${searchStrings.messengerSchoolRoom} input`
			);
			const messengerStudentRoomCreateSwitch = wrapper.find(
				`${searchStrings.messengerStudentRoomCreate} input`
			);

			matrixMessengerSwitch.trigger("click");
			messengerSchoolRoomSwitch.trigger("click");
			await wrapper.vm.$nextTick();

			let emitted = wrapper.emitted();
			expect(emitted["update-feature-settings"]).toHaveLength(2);
			expect(emitted["update-feature-settings"][0][0]).toBeFalse();
			expect(emitted["update-feature-settings"][0][1]).toBe("messenger");
			expect(emitted["update-feature-settings"][1][0]).toBeFalse();
			expect(emitted["update-feature-settings"][1][1]).toBe(
				"messengerSchoolRoom"
			);

			messengerSchoolRoomSwitch.trigger("click");
			messengerStudentRoomCreateSwitch.trigger("click");
			await wrapper.vm.$nextTick();

			emitted = wrapper.emitted();
			expect(emitted["update-feature-settings"]).toHaveLength(4);
			expect(emitted["update-feature-settings"][2][0]).toBeTrue();
			expect(emitted["update-feature-settings"][2][1]).toBe(
				"messengerSchoolRoom"
			);
			expect(emitted["update-feature-settings"][3][0]).toBeFalse();
			expect(emitted["update-feature-settings"][3][1]).toBe(
				"messengerStudentRoomCreate"
			);

			matrixMessengerSwitch.trigger("click");
			messengerStudentRoomCreateSwitch.trigger("click");
			await wrapper.vm.$nextTick();

			emitted = wrapper.emitted();
			expect(emitted["update-feature-settings"]).toHaveLength(6);
			expect(emitted["update-feature-settings"][4][0]).toBeTrue();
			expect(emitted["update-feature-settings"][4][1]).toBe("messenger");
			expect(emitted["update-feature-settings"][5][0]).toBeTrue();
			expect(emitted["update-feature-settings"][5][1]).toBe(
				"messengerStudentRoomCreate"
			);
		});
	});
});
