import SelectDestinationModal from "@/components/share/SelectDestinationModal.vue";
import { BoardExternalReferenceType } from "@/serverApi/v3";
import { createTestingI18n, createTestingVuetify } from "@@/tests/test-utils/setup";
import { mount } from "@vue/test-utils";

describe("@components/share/SelectDestinationModal", () => {
	const course = {
		id: "1234",
		title: "Mathe",
		shortTitle: "Ma",
		displayColor: "#54616e",
	};
	const propsData = {
		isOpen: true,
		parentName: "TestParentName",
		parentType: "lesson",
		courses: [course],
		destinations: [],
		destinationType: BoardExternalReferenceType.Course,
	};

	const setup = () => {
		const wrapper = mount(SelectDestinationModal, {
			global: {
				plugins: [createTestingVuetify(), createTestingI18n()],
			},
			props: propsData,
		});

		return { wrapper };
	};

	it("should render with props", () => {
		const { wrapper } = setup();

		expect(wrapper).toBeTruthy();
	});

	it("should emit input value on next", async () => {
		const { wrapper } = setup();

		const select = wrapper.findComponent({ name: "v-select" });
		await select.setValue(course);

		const dialog = wrapper.findComponent({
			ref: "dialog",
		});

		const nextButton = dialog.findComponent('[data-testid="dialog-next"]');
		await nextButton.trigger("click");

		const emitted = wrapper.emitted("next");

		expect(emitted).toBeDefined();
		expect(emitted).toHaveLength(1);
		expect(emitted?.[0][0]).toStrictEqual(course.id);
	});

	it("should not emit value on next if course not selected", async () => {
		const { wrapper } = setup();

		const dialog = wrapper.findComponent({
			ref: "dialog",
		});

		await dialog.vm.$emit("next");

		expect(wrapper.emitted("next")).toBeUndefined();
	});

	it("should cancel on dialog cancel", async () => {
		const { wrapper } = setup();

		const dialog = wrapper.findComponent({
			ref: "dialog",
		});

		await dialog.vm.$emit("dialog-canceled");
		expect(wrapper.emitted("cancel")).toHaveLength(1);
	});
});
