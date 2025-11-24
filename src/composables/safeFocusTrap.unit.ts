import { useSafeFocusTrap } from "./safeFocusTrap";
import { flushPromises } from "@vue/test-utils";
import { useFocusTrap } from "@vueuse/integrations/useFocusTrap.mjs";
import { Mock } from "vitest";
import { nextTick, Ref, ref } from "vue";
import { useDisplay } from "vuetify";

vi.mock("@vueuse/integrations/useFocusTrap");
vi.mock("vuetify");

describe("safeFocusTrap", () => {
	let pauseMock: Mock;
	let unpauseMock: Mock;
	let deactivateMock: Mock;
	let activateMock: Mock;
	let mobileRef: Ref<boolean>;

	beforeEach(() => {
		pauseMock = vi.fn();
		unpauseMock = vi.fn();
		deactivateMock = vi.fn();
		activateMock = vi.fn();
		mobileRef = ref(false);

		(useDisplay as Mock).mockReturnValue({ mobile: mobileRef });

		(useFocusTrap as Mock).mockReturnValue({
			pause: pauseMock,
			unpause: unpauseMock,
			deactivate: deactivateMock,
			activate: activateMock,
		});
	});

	it("should be call immediately activate when isActiveRef is true", async () => {
		const isActiveRef = ref(true);
		mobileRef.value = false;

		useSafeFocusTrap(isActiveRef, "#some-element");
		await nextTick();

		expect(activateMock).toHaveBeenCalled();
	});

	it("should not call activate on mobile devices", async () => {
		const isActiveRef = ref(true);
		mobileRef.value = true;

		useSafeFocusTrap(isActiveRef, "#some-element");
		await nextTick();

		expect(activateMock).not.toHaveBeenCalled();
	});

	it("should be call immediately deactivate when isActiveRef is false", async () => {
		const isActiveRef = ref(false);
		useSafeFocusTrap(isActiveRef, "#some-element");
		await nextTick();

		expect(deactivateMock).toHaveBeenCalled();
	});

	it("should call activate when isActiveRef changes to true", async () => {
		const isActiveRef = ref(false);
		mobileRef.value = false;

		useSafeFocusTrap(isActiveRef, "#some-element");
		await nextTick();

		isActiveRef.value = true;
		await flushPromises();

		expect(activateMock).toHaveBeenCalled();
	});

	it("should call deactivate when isActiveRef changes to false", async () => {
		const isActiveRef = ref(true);
		mobileRef.value = false;

		useSafeFocusTrap(isActiveRef, "#some-element");
		await nextTick();

		isActiveRef.value = false;
		await flushPromises();

		expect(deactivateMock).toHaveBeenCalled();
	});
});
