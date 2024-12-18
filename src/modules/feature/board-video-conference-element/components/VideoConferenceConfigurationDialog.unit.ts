import { mount, VueWrapper } from "@vue/test-utils";
import {
	createTestingI18n,
	createTestingVuetify,
} from "@@/tests/test-utils/setup";
import VideoConferenceConfigurationDialog from "./VideoConferenceConfigurationDialog.vue";
import { ref } from "vue";

const defaultOptions = ref({
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

		it("should open the dialog when isOpen is true", async () => {
			const wrapper = setup({ isOpen: true });
			await wrapper.vm.$nextTick();
			const dialog = wrapper.find(
				"[data-testid='videoconference-config-dialog']"
			);
			expect(dialog.exists()).toBe(true);
		});

		it("should not render the dialog when isOpen is false", () => {
			const wrapper = setup({ isOpen: false });
			const dialog = wrapper.findComponent(
				"[data-testid='videoconference-config-dialog']"
			);
			expect(dialog.exists()).toBe(false);
		});

		it("should emit 'close' when cancel button is clicked", async () => {
			const wrapper = setup({ isOpen: true });
			const cancelButton = wrapper.findComponent(
				"[data-testid='dialog-cancel']"
			);
			await cancelButton.trigger("click");
			expect(wrapper.emitted()).toHaveProperty("close");
		});

		it("should emit 'start-video-conference' when create button is clicked", async () => {
			const wrapper = setup({ isOpen: true });
			const createButton = wrapper.find("[data-testid='dialog-create']");
			await createButton.trigger("click");
			expect(wrapper.emitted()).toHaveProperty("start-video-conference");
		});

		it("should toggle everyAttendeeJoinsMuted option when checkbox is clicked", async () => {
			const wrapper = setup({ isOpen: true });
			const checkbox = wrapper.find(
				"[data-testid='every-attendee-joins-muted']"
			);
			await checkbox.setValue(true);
			expect(defaultOptions.value.everyAttendeeJoinsMuted).toBe(true);
		});

		it("should toggle moderatorMustApproveJoinRequests option when checkbox is clicked", async () => {
			const wrapper = setup({ isOpen: true });
			const checkbox = wrapper.find(
				"[data-testid='moderator-must-approve-join-requests']"
			);
			await checkbox.setValue(false);
			expect(defaultOptions.value.moderatorMustApproveJoinRequests).toBe(false);
		});

		it("should toggle everybodyJoinsAsModerator option when checkbox is clicked", async () => {
			const wrapper = setup({ isOpen: true });
			const checkbox = wrapper.find(
				"[data-testid='everybody-joins-as-moderator']"
			);
			await checkbox.setValue(true);
			expect(defaultOptions.value.everybodyJoinsAsModerator).toBe(true);
		});
	});
});
