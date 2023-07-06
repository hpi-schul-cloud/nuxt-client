import createComponentMocks from "@@/tests/test-utils/componentMocks";
import { mount } from "@vue/test-utils";
import SelectCourseModal from "@/components/share/SelectCourseModal.vue";
import { I18N_KEY } from "@/utils/inject";

describe("@components/share/SelectCourseModal", () => {
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
	};

	const getWrapper = (attrs: any = { propsData }) => {
		const wrapper = mount(SelectCourseModal, {
			...createComponentMocks({
				i18n: true,
			}),
			provide: {
				[I18N_KEY.valueOf()]: { t: (key: string) => key },
			},
			...attrs,
		});

		return wrapper;
	};

	beforeEach(() => {
		// Avoids console warnings "[Vuetify] Unable to locate target [data-app]"
		document.body.setAttribute("data-app", "true");
	});

	it("should not render without required props", () => {
		console.error = jest.fn();

		getWrapper({});

		expect(console.error).toBeCalledWith(
			expect.stringContaining("Missing required prop:")
		);
	});

	it("should render with props", () => {
		const wrapper = getWrapper();
		expect(wrapper).toBeTruthy();
	});

	it("should emit input value on next", async () => {
		const wrapper = getWrapper();

		const select: any = wrapper.findComponent({ name: "v-select" }).vm;
		select.selectItem(course);

		const dialog = wrapper.findComponent({
			ref: "dialog",
		});
		await dialog.vm.$emit("next");

		const emitted = wrapper.emitted("next");

		expect(emitted).not.toBeUndefined();
		expect(emitted).toHaveLength(1);
		expect(emitted?.[0][0]).toStrictEqual(course.id);
	});

	it("should not emit value on next if course not selected", async () => {
		const wrapper = getWrapper();
		const dialog = wrapper.findComponent({
			ref: "dialog",
		});

		await dialog.vm.$emit("next");

		expect(wrapper.emitted("next")).toBeUndefined();
	});

	it("should cancel on dialog cancel", async () => {
		const wrapper = getWrapper();
		const dialog = wrapper.findComponent({
			ref: "dialog",
		});

		await dialog.vm.$emit("dialog-canceled");
		expect(wrapper.emitted("cancel")).toHaveLength(1);
	});
});
