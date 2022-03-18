import { mount } from "@vue/test-utils";
import RoomLockedCard from "./RoomLockedCard.vue";

declare let createComponentMocks: Function;

const baseTestProps = {
	room: {
		roomId: "456",
		displayColor: "#54616e",
	},
	task: {
		id: "123",
		name: "Private Aufgabe von Marla - mit Kurs, abgelaufen",
		allowed: false,
	},
	ariaLabel:
		"lesson, Link, Test Thema (Mathe) - zum Öffnen die Eingabetaste drücken",
	keyDrag: false,
	dragInProgress: false,
};

const getWrapper: any = (props: object, options?: object) => {
	return mount(RoomLockedCard, {
		...createComponentMocks({
			i18n: true,
			vuetify: true,
		}),
		propsData: props,
		...options,
	});
};

describe("@components/molecules/RoomLockedCard", () => {
	beforeEach(() => {
		document.body.setAttribute("data-app", "true");
	});

	it("should have correct props", () => {
		const wrapper = getWrapper(baseTestProps);

		expect(wrapper.vm.ariaLabel).toStrictEqual(baseTestProps.ariaLabel);
		expect(wrapper.vm.task).toStrictEqual(baseTestProps.task);
		expect(wrapper.vm.room).toStrictEqual(baseTestProps.room);
	});

	it("should have correct title", () => {
		const wrapper = getWrapper(baseTestProps);
		const title = wrapper.find(".title-section");

		expect(title.element.textContent).toContain(
			wrapper.vm.$i18n.t("pages.room.taskCard.label.task")
		);
	});

	it("should show error message when it is clicked", async () => {
		let alertComponent;
		const wrapper = getWrapper(baseTestProps);
		const cardElement = wrapper.find(".locked-card");
		expect(wrapper.vm.alert).toBe(false);
		const timeDuration = wrapper.vm.alertDuration;
		alertComponent = wrapper.findAll(".alert-locked-card");
		expect(alertComponent).toHaveLength(0);

		await cardElement.trigger("click");
		expect(wrapper.vm.alert).toBe(true);
		alertComponent = wrapper.findAll(".alert-locked-card");
		expect(alertComponent).toHaveLength(1);
		await new Promise((time) => setTimeout(time, timeDuration));
		expect(wrapper.vm.alert).toBe(false);
		alertComponent = wrapper.findAll(".alert-locked-card");
		expect(alertComponent).toHaveLength(0);
	});

	it("should NOT show error message if dragging in progress", async () => {
		let alertComponent;
		const wrapper = getWrapper({ ...baseTestProps, dragInProgress: true });
		const cardElement = wrapper.find(".locked-card");

		expect(wrapper.vm.alert).toBe(false);
		alertComponent = wrapper.findAll(".alert-locked-card");
		expect(alertComponent).toHaveLength(0);

		await cardElement.trigger("click");
		expect(wrapper.vm.alert).toBe(false);
		alertComponent = wrapper.findAll(".alert-locked-card");
		expect(alertComponent).toHaveLength(0);
	});

	describe("keypress events", () => {
		it("should call 'handleClick' event when 'enter' key is pressed", async () => {
			const handleClickMock = jest.fn();
			const wrapper = getWrapper(baseTestProps);

			wrapper.vm.handleClick = handleClickMock;

			await wrapper.trigger("keydown.enter");
			expect(handleClickMock).toHaveBeenCalled();
			expect(handleClickMock.mock.calls[0][0].keyCode).toStrictEqual(13);
			expect(handleClickMock.mock.calls[0][0].key).toStrictEqual("Enter");
		});

		it("should call 'onKeyPress' event when 'up, down, space' keys are pressed", async () => {
			const onKeyPressMock = jest.fn();
			const wrapper = getWrapper(baseTestProps);

			wrapper.vm.onKeyPress = onKeyPressMock;

			await wrapper.trigger("keydown.up");
			expect(onKeyPressMock).toHaveBeenCalled();
			expect(onKeyPressMock.mock.calls[0][0].keyCode).toStrictEqual(38);
			expect(onKeyPressMock.mock.calls[0][0].key).toStrictEqual("Up");

			jest.clearAllMocks();
			await wrapper.trigger("keydown.down");
			expect(onKeyPressMock).toHaveBeenCalled();
			expect(onKeyPressMock.mock.calls[0][0].keyCode).toStrictEqual(40);
			expect(onKeyPressMock.mock.calls[0][0].key).toStrictEqual("Down");

			jest.clearAllMocks();
			await wrapper.trigger("keydown.space");
			expect(onKeyPressMock).toHaveBeenCalled();
			expect(onKeyPressMock.mock.calls[0][0].keyCode).toStrictEqual(32);
			expect(onKeyPressMock.mock.calls[0][0].key).toStrictEqual(" ");
			jest.clearAllMocks();
		});

		it("should emit 'tab-pressed' event when 'tab' key is pressed", async () => {
			const wrapper = getWrapper(baseTestProps);

			await wrapper.trigger("keydown.tab");

			const emitted = wrapper.emitted();
			expect(emitted["tab-pressed"]).toHaveLength(1);
		});
	});
});
