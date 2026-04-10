import SelectDestinationModal from "@/components/share/SelectDestinationModal.vue";
import { createTestingI18n, createTestingVuetify } from "@@/tests/test-utils/setup";
import { BoardExternalReferenceType } from "@api-server";
import { createTestingPinia } from "@pinia/testing";
import { SvsDialog } from "@ui-dialog";
import { mount } from "@vue/test-utils";
import { setActivePinia } from "pinia";
import { VSelect } from "vuetify/components";

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
		destinationType: BoardExternalReferenceType.COURSE,
	};

	beforeEach(() => {
		setActivePinia(createTestingPinia());
	});

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

		const select = wrapper.findComponent(VSelect);
		await select.setValue(course);

		const dialog = wrapper.findComponent(SvsDialog);

		await dialog.vm.$emit("confirm");

		const emitted = wrapper.emitted("next");

		expect(emitted).toBeDefined();
		expect(emitted).toHaveLength(1);
		expect(emitted?.[0][0]).toStrictEqual(course.id);
	});

	it("should not emit value on next if course not selected", async () => {
		const { wrapper } = setup();

		const dialog = wrapper.findComponent(SvsDialog);
		await dialog.vm.$emit("confirm");

		expect(wrapper.emitted("next")).toBeUndefined();
	});

	it("should cancel on dialog cancel", async () => {
		const { wrapper } = setup();

		const dialog = wrapper.findComponent(SvsDialog);

		await dialog.vm.$emit("cancel");
		expect(wrapper.emitted("cancel")).toHaveLength(1);
	});
});
