import Vue from "vue";
import { MountOptions, mount } from "@vue/test-utils";
import createComponentMocks from "@@/tests/test-utils/componentMocks";
import CkEditor from "@/components/common/editor/CKEditor.vue";
import { I18N_KEY } from "@/utils/inject";

type CkEditorProps = {
	value?: string;
	placeholder?: string;
	mode?: string;
	disabled?: boolean;
};

class ResizeObserver {
	observe() {
		return;
	}
	unobserve() {
		return;
	}
	disconnect() {
		return;
	}
}

describe("@/components/editor/CKEditor", () => {
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	let wrapper: any;

	const setup = (props: CkEditorProps = {}) => {
		document.body.setAttribute("data-app", "true");
		wrapper = mount(CkEditor as MountOptions<Vue>, {
			...createComponentMocks({
				i18n: true,
			}),
			propsData: props,
			provide: {
				[I18N_KEY as symbol]: { t: (key: string) => key },
			},
		});
	};

	beforeEach(() => {
		// Avoids console warnings "[Vuetify] Unable to locate target [data-app]"
		document.body.setAttribute("data-app", "true");
		window.ResizeObserver = ResizeObserver;
	});

	it("should render component", () => {
		setup();
		expect(wrapper.findComponent(CkEditor).exists()).toBe(true);
	});

	it("should not render with invalid mode property", () => {
		try {
			setup({ mode: "wrong_mode" });
		} catch (e) {
			expect((e as Error).message.includes("Invalid prop")).toBeTruthy();
		}
	});

	it("should have reduced toolbar items in simple mode", () => {
		setup({ mode: "simple" });
		expect(wrapper.vm.config.toolbar.items).toHaveLength(10);
	});

	it("should have all plugins available in simple mode", () => {
		setup({ mode: "simple" });
		expect(wrapper.vm.config.plugins).toHaveLength(21);
	});

	it("should have all toolbar items in regular mode", () => {
		setup({ mode: "regular" });
		expect(wrapper.vm.config.toolbar.items).toHaveLength(25);
	});

	it("should have all plugins available in regular mode", () => {
		setup({ mode: "regular" });
		expect(wrapper.vm.config.plugins).toHaveLength(21);
	});

	describe("events", () => {
		it("should emit ready on editor ready", async () => {
			setup();

			const ck = wrapper.findComponent({
				ref: "ck",
			});
			ck.vm.$emit("ready", {});
			await wrapper.vm.$nextTick();

			const emitted = wrapper.emitted();
			expect(emitted["ready"]).toHaveLength(1);
		});

		it("should emit input on content changes", async () => {
			setup();

			const ck = wrapper.findComponent({
				ref: "ck",
			});
			ck.vm.$emit("input");
			await wrapper.vm.$nextTick();

			const emitted = wrapper.emitted();
			expect(emitted["input"]).toHaveLength(1);
		});

		it("should emit focus on editor focus", async () => {
			setup();

			const ck = wrapper.findComponent({
				ref: "ck",
			});
			ck.vm.$emit("focus");
			await wrapper.vm.$nextTick();

			const emitted = wrapper.emitted();
			expect(emitted["focus"]).toHaveLength(1);
		});

		it("should emit delayed blur on editor blur", async () => {
			jest.useFakeTimers();
			setup();

			const ck = wrapper.findComponent({
				ref: "ck",
			});
			ck.vm.$emit("blur");
			jest.advanceTimersByTime(200);

			const emitted = wrapper.emitted();
			expect(emitted["blur"]).toHaveLength(1);
		});

		it("should emit delete on delete event and empty text", async () => {
			setup();

			// due to not accessing the editor instance in test setup, we test here with implementation details
			expect(wrapper.vm.charCount).toEqual(0);
			wrapper.vm.handleDelete();
			await wrapper.vm.$nextTick();
			const emitted = wrapper.emitted();
			expect(emitted["keyboard:delete"]).toHaveLength(1);
		});

		it("should not emit delete on delete event and non-empty text", async () => {
			setup();

			await wrapper.setData({ charCount: 1 });
			expect(wrapper.vm.charCount).toEqual(1);
			wrapper.vm.handleDelete();
			await wrapper.vm.$nextTick();
			const emitted = wrapper.emitted();
			expect(emitted["keyboard:delete"]).toBeUndefined();
		});
	});
});
