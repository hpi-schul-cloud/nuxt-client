import {
	createTestingI18n,
	createTestingVuetify,
} from "@@/tests/test-utils/setup";
import { createMock } from "@golevelup/ts-jest";
import { mdiSync } from "@icons/material";
import { mount } from "@vue/test-utils";
import { VBadge } from "vuetify/lib/components/index";
import vRoomAvatar from "./vRoomAvatar.vue";

const mockData = {
	id: "456",
	title: "Bio 12c",
	shortTitle: "Bi",
	displayColor: "#ffffff",
	xPosition: 5,
	yPosition: 2,
	startDate: "2019-12-07T23:00:00.000Z",
	untilDate: "2020-12-16T23:00:00.000Z",
	titleDate: "2019/20",
	href: "/rooms/456",
	isSynchronized: false,
};

jest.mock("vue-router");

describe("vRoomAvatar", () => {
	const setup = (optionalProps: object = {}) => {
		const wrapper = mount(vRoomAvatar, {
			global: {
				plugins: [createTestingVuetify(), createTestingI18n()],
			},
			props: {
				item: mockData,
				size: "4em",
				showBadge: true,
				draggable: true,
				...optionalProps,
			},
		});
		return { wrapper };
	};
	beforeEach(() => {
		window.location.pathname = "";
	});

	it("should display the title but NOT the date title", () => {
		const { wrapper } = setup();
		const labelElement = wrapper.find(".subtitle").element as HTMLElement;

		expect(labelElement).toBeTruthy();
		expect(labelElement.innerHTML).toContain("Bio 12c");
		expect(labelElement.innerHTML).not.toContain("2019/2020");
	});

	it("should NOT display the title", async () => {
		const { wrapper } = setup({ condenseLayout: true });

		expect(wrapper.find(".subtitle").exists()).toBeFalsy();
	});

	it("should display the short title", () => {
		const { wrapper } = setup();
		const shortLabelElement = wrapper.find(".single-avatar")
			.element as HTMLElement;

		expect(shortLabelElement).toBeTruthy();
		expect(shortLabelElement.innerHTML).toStrictEqual("Bi");
	});

	it("should display the badge", async () => {
		const { wrapper } = setup({ item: { ...mockData, notification: true } });
		const badgeElement = wrapper.findComponent({ name: "VBadge" });

		expect(badgeElement.props().modelValue).toBe(true);
	});

	it("should display the synchronized badge", async () => {
		const { wrapper } = setup({ item: { ...mockData, isSynchronized: true } });
		const badgeElement = wrapper.findComponent(VBadge);

		expect(badgeElement.props().icon).toBe(mdiSync);
	});

	it("should NOT display the badge", () => {
		const { wrapper } = setup();
		const badgeElement = wrapper.findComponent({ name: "VBadge" });

		expect(badgeElement.props().modelValue).toBe(false);
	});

	it("should display the correct color and size", async () => {
		const { wrapper } = setup();
		const avatarComponent = wrapper.findComponent({ name: "VBtn" });

		expect(avatarComponent.props().color).toStrictEqual("#ffffff");
		expect(avatarComponent.props().size).toStrictEqual("4em");
	});

	it("should redirect to room page", async () => {
		Object.defineProperty(window, "location", {
			value: {
				href: "",
			},
			writable: true,
		});

		const { wrapper } = setup();
		const avatarComponent = wrapper.findComponent({ name: "VAvatar" });

		await avatarComponent.trigger("click");

		expect(window.location.href).toStrictEqual(mockData.href);
	});

	it("should redirect to room page if keyboard event triggered", async () => {
		Object.defineProperty(window, "location", {
			value: {
				href: "",
			},
			writable: true,
		});

		const { wrapper } = setup();
		const avatarComponent = wrapper.findComponent({ name: "VBtn" });

		await avatarComponent.trigger("keypress.enter");

		expect(window.location.href).toStrictEqual(mockData.href);
	});

	it("should not redirect to room page if condenseLayout props is true", async () => {
		Object.defineProperty(window, "location", {
			set: jest.fn(),
			get: () => createMock<Location>(),
		});
		const locationSpy = jest.spyOn(window, "location", "set");
		const { wrapper } = setup({ condenseLayout: true });

		const avatarComponent = wrapper.findComponent({ name: "VAvatar" });

		await avatarComponent.trigger("click");

		expect(locationSpy).not.toHaveBeenCalled();
	});

	it("should display the title AND the date title", () => {
		const propData = {
			item: {
				id: "123",
				title: "History",
				shortTitle: "Hi",
				displayColor: "#EF6C00",
				startDate: "2015-07-31T22:00:00.000Z",
				untilDate: "2018-07-30T22:00:00.000Z",
				titleDate: "2015-2018",
				searchText: "History 2015-2018",
				isArchived: true,
			},
		};

		const { wrapper } = setup(propData);
		const element = wrapper.find(".subtitle").element as HTMLElement;

		expect(element).toBeTruthy();
		expect(element.innerHTML).toContain("History");
		expect(element.innerHTML).toContain("2015-2018");
	});

	describe("drag and drop", () => {
		it("should emit 'dragStart' event when it started dragging", async () => {
			const { wrapper } = setup();
			const avatarComponent = wrapper.findComponent({ name: "VAvatar" });

			await avatarComponent.trigger("dragstart");
			const startDragEvent = wrapper.emitted("startDrag");

			expect(wrapper.vm.isDragging).toBe(true);
			expect(startDragEvent).toHaveLength(1);
			expect(startDragEvent && startDragEvent[0][0]).toStrictEqual(mockData);
		});

		it("should emit 'drop' event when an element dropped onto it", async () => {
			const { wrapper } = setup();
			const avatarComponent = wrapper.findComponent({ name: "VAvatar" });

			await avatarComponent.trigger("drop");

			expect(wrapper.emitted()).toHaveProperty("drop");
		});

		it("should NOT emit 'dragStart' event if 'draggable' prop is set false", async () => {
			const { wrapper } = setup({ draggable: false });
			const avatarComponent = wrapper.findComponent({ name: "VAvatar" });

			await avatarComponent.trigger("dragstart");
			const startDragEvent = wrapper.emitted("startDrag");

			expect(startDragEvent).toBe(undefined);
		});

		it("should emit 'dragenter' event when draging over component", async () => {
			const { wrapper } = setup();
			const avatarComponent = wrapper.findComponent({ name: "VAvatar" });

			await avatarComponent.trigger("dragenter");

			expect(wrapper.vm.isDragging).toBe(false);
		});

		it("should emit 'dragend' event when draging ended", async () => {
			const { wrapper } = setup();
			const avatarComponent = wrapper.findComponent({ name: "VAvatar" });

			await avatarComponent.trigger("dragend");

			expect(wrapper.vm.isDragging).toBe(false);
			expect(wrapper.emitted()).toHaveProperty("dragend");
		});
	});

	describe("on long running course copies", () => {
		const longRunningCourseProps = {
			item: {
				id: "123",
				title: "History (1)",
				shortTitle: "Hi",
				displayColor: "#EF6C00",
				startDate: "2023-01-30T22:00:00.000Z",
				untilDate: "2023-02-15T22:00:00.000Z",
				copyingSince: "2023-01-30T22:00:00.000Z",
				searchText: "History (1)",
				isArchived: true,
			},
		};

		it("should display info and not title", () => {
			const { wrapper } = setup(longRunningCourseProps);

			const element = wrapper.find(".subtitle").element as HTMLElement;

			expect(element.innerHTML.trim()).toContain(
				"components.molecules.copyResult.courseCopy.info"
			);
			expect(element.className).toContain("text-grey");
			expect(element.className).toContain("text-darken-1");
		});

		it("should display avatar in grey", () => {
			const { wrapper } = setup(longRunningCourseProps);

			const avatarComponent = wrapper.findComponent({ name: "VBtn" });

			expect(avatarComponent.attributes().class.split(" ")).toContain(
				"grey-lighten-2"
			);
		});
	});
});
