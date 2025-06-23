import { mount, VueWrapper } from "@vue/test-utils";
import {
	createTestingI18n,
	createTestingVuetify,
} from "@@/tests/test-utils/setup";
import VideoConferenceConfigurationDialog from "./VideoConferenceConfigurationDialog.vue";
import { ref } from "vue";
import { VDialog } from "vuetify/lib/components/index";
import { VideoConferenceOptions } from "@/store/types/video-conference";

const defaultOptions = ref<VideoConferenceOptions>({
	everyAttendeeJoinsMuted: false,
	everybodyJoinsAsModerator: false,
	moderatorMustApproveJoinRequests: true,
});

describe("VideoConferenceConfigurationDialog", () => {
	let wrapper: VueWrapper<
		InstanceType<typeof VideoConferenceConfigurationDialog>
	>;
	const setup = (props: { isOpen: boolean }) => {
		wrapper = mount(VideoConferenceConfigurationDialog, {
			global: {
				plugins: [createTestingVuetify(), createTestingI18n()],
				stubs: { UseFocusTrap: true },
				renderStubDefaultSlot: true,
			},
			props: {
				options: defaultOptions.value,
				...props,
			},
			attachTo: document.body,
		});

		return wrapper;
	};

	afterEach(() => {
		wrapper.unmount(); // otherwise tests break when running all tests, necessary due focus trap
	});

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
	});
});
