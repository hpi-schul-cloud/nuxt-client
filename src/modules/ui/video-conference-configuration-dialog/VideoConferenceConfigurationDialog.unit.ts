import VideoConferenceConfigurationDialog from "./VideoConferenceConfigurationDialog.vue";
import { createTestingI18n, createTestingVuetify } from "@@/tests/test-utils/setup";
import { VideoConferenceOptionsResponse } from "@api-server";
import { createTestingPinia } from "@pinia/testing";
import { SvsDialog } from "@ui-dialog";
import { mount } from "@vue/test-utils";
import { setActivePinia } from "pinia";
import { ref } from "vue";

const defaultOptions = ref<VideoConferenceOptionsResponse>({
	everyAttendeeJoinsMuted: false,
	everybodyJoinsAsModerator: false,
	moderatorMustApproveJoinRequests: true,
});

describe("VideoConferenceConfigurationDialog", () => {
	beforeEach(() => {
		setActivePinia(createTestingPinia());
	});

	const setup = (props: { isOpen: boolean }) =>
		mount(VideoConferenceConfigurationDialog, {
			global: {
				plugins: [createTestingVuetify(), createTestingI18n()],
			},
			props: {
				options: defaultOptions.value,
				...props,
			},
		});

	describe("when component is mounted", () => {
		it("should render in the DOM", () => {
			const wrapper = setup({ isOpen: true });
			expect(wrapper).toBeDefined();
		});

		it("should open the dialog when isOpen is true", /* async */ () => {
			const wrapper = setup({ isOpen: true });
			const dialog = wrapper.getComponent(SvsDialog);
			const isOpen = dialog.props().modelValue;
			expect(isOpen).toBe(true);
		});

		it("should not render the dialog when isOpen is false", () => {
			const wrapper = setup({ isOpen: false });
			const dialog = wrapper.getComponent(SvsDialog);
			const isOpen = dialog.props().modelValue;
			expect(isOpen).toBe(false);
		});

		it("should emit 'close' when cancel button is clicked", async () => {
			const wrapper = setup({ isOpen: true });
			const dialog = wrapper.getComponent(SvsDialog);
			dialog.vm.$emit("cancel");
			expect(wrapper.emitted()).toHaveProperty("close");
		});

		it("should emit 'start-video-conference' when create button is clicked", async () => {
			const wrapper = setup({ isOpen: true });
			const dialog = wrapper.getComponent(SvsDialog);
			dialog.vm.$emit("confirm");
			expect(wrapper.emitted()).toHaveProperty("start-video-conference");
		});
	});
});
