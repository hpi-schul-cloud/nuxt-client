import VideoConferenceConfigurationDialog from "./VideoConferenceConfigurationDialog.vue";
import { createTestingI18n, createTestingVuetify } from "@@/tests/test-utils/setup";
import { createTestingPinia } from "@pinia/testing";
import { Dialog } from "@ui-dialog";
import { mount } from "@vue/test-utils";
import { setActivePinia } from "pinia";

describe("VideoConferenceConfigurationDialog", () => {
	beforeEach(() => {
		setActivePinia(createTestingPinia());
	});

	const setup = (isOpen: boolean) =>
		mount(VideoConferenceConfigurationDialog, {
			global: {
				plugins: [createTestingVuetify(), createTestingI18n()],
			},
			props: {
				options: {
					everyAttendeeJoinsMuted: false,
					everybodyJoinsAsModerator: false,
					moderatorMustApproveJoinRequests: true,
				},
				modelValue: isOpen,
			},
		});

	describe("when component is mounted", () => {
		it("should emit 'start-video-conference' when create button is clicked", async () => {
			const wrapper = setup(true);
			const dialog = wrapper.getComponent(Dialog);
			dialog.vm.$emit("confirm");
			expect(wrapper.emitted()).toHaveProperty("start-video-conference");
		});
	});
});
