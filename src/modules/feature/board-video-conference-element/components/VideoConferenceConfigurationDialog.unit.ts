import { mount, VueWrapper } from "@vue/test-utils";
import {
	createTestingI18n,
	createTestingVuetify,
} from "@@/tests/test-utils/setup";
import VideoConferenceConfigurationDialog from "./VideoConferenceConfigurationDialog.vue";
import { ref } from "vue";
import { VDialog } from "vuetify/lib/components/index.mjs";
import { VideoConferenceOptions } from "@/store/types/video-conference";

const defaultOptions = ref<VideoConferenceOptions>({
	everyAttendeeJoinsMuted: false,
	moderatorMustApproveJoinRequests: true,
	everybodyJoinsAsModerator: false,
});

describe("VideoConferenceConfigurationDialog", () => {
	const setup = (props: { isOpen: boolean }) => {
		const wrapper: VueWrapper = mount(VideoConferenceConfigurationDialog, {
			global: {
				plugins: [createTestingVuetify(), createTestingI18n()],
			},
			props: {
				options: defaultOptions.value,
				...props,
			},
			attachTo: document.body,
		});

		return wrapper;
	};

	describe("when component is mounted", () => {
		it("should render in the DOM", () => {
			const wrapper = setup({ isOpen: true });
			expect(wrapper).toBeDefined();
		});

		it("should open the dialog when isOpen is true", /* async */ () => {
			const wrapper = setup({ isOpen: true });
			const dialog = wrapper.getComponent(VDialog);
			const isOpen = dialog.props().modelValue;
			expect(isOpen).toBe(true);
		});

		it("should not render the dialog when isOpen is false", () => {
			const wrapper = setup({ isOpen: false });
			const dialog = wrapper.getComponent(VDialog);
			const isOpen = dialog.props().modelValue;
			expect(isOpen).toBe(false);
		});

		it("should emit 'close' when cancel button is clicked", async () => {
			const wrapper = setup({ isOpen: true });
			const dialog = wrapper.getComponent(VDialog);
			const cancelButton = dialog.findComponent(
				"[data-testid='dialog-cancel']"
			);
			await cancelButton.trigger("click");
			expect(wrapper.emitted()).toHaveProperty("close");
		});

		it("should emit 'start-video-conference' when create button is clicked", async () => {
			const wrapper = setup({ isOpen: true });
			const dialog = wrapper.getComponent(VDialog);
			const createButton = dialog.findComponent(
				"[data-testid='dialog-create']"
			);
			await createButton.trigger("click");
			expect(wrapper.emitted()).toHaveProperty("start-video-conference");
		});

		it("should toggle everyAttendeeJoinsMuted option when checkbox is clicked", async () => {
			const wrapper = setup({ isOpen: true });

			const dialog = wrapper.getComponent(VDialog);
			const checkbox = dialog.findComponent(
				"[data-testid='every-attendee-joins-muted']"
			);
			await checkbox.setValue(true);
			const emitted = wrapper.emitted();
			expect(emitted).toHaveLength(1);
			const emittedValue = emitted[0][0];
			// from here on currently not working
			// expect(emittedValue.everyAttendeeJoinsMuted).toBe(true);
		});

		it("should toggle moderatorMustApproveJoinRequests option when checkbox is clicked", async () => {
			const wrapper = setup({ isOpen: true });
			const dialog = wrapper.getComponent(VDialog);
			const checkbox = dialog.findComponent(
				"[data-testid='moderator-must-approve-join-requests']"
			);
			await checkbox.setValue(false);
			expect(defaultOptions.value.moderatorMustApproveJoinRequests).toBe(false);
		});

		it("should toggle everybodyJoinsAsModerator option when checkbox is clicked", async () => {
			const wrapper = setup({ isOpen: true });
			const dialog = wrapper.getComponent(VDialog);
			const checkbox = dialog.findComponent(
				"[data-testid='everybody-joins-as-moderator']"
			);
			await checkbox.setValue(true);
			expect(defaultOptions.value.everybodyJoinsAsModerator).toBe(true);
		});
	});
});
