import FormerMembershipsList from "./FormerMembershipsList.vue";
import { createTestingI18n, createTestingVuetify } from "@@/tests/test-utils/setup";
import { useFormerMembershipStore } from "@data-app";
import { createTestingPinia } from "@pinia/testing";
import { mount } from "@vue/test-utils";
import { setActivePinia } from "pinia";
import { beforeEach, describe, expect, it, vi } from "vitest";

describe("FormerMembershipsList", () => {
	const mockItems = [
		{ type: "course" as const, refId: "c-1", name: "Mathe 10", schoolId: "s-1", schoolName: "Alte Schule" },
		{ type: "room" as const, refId: "r-1", name: "Lehrerzimmer", schoolId: "s-1", schoolName: "Alte Schule" },
	];

	beforeEach(() => {
		setActivePinia(createTestingPinia({ stubActions: false }));
	});

	const setup = () => {
		const store = useFormerMembershipStore();
		store.items = [...mockItems];

		const wrapper = mount(FormerMembershipsList, {
			global: {
				plugins: [createTestingVuetify(), createTestingI18n()],
			},
		});
		return { wrapper, store };
	};

	it("renders former membership items with name, school, and actions", () => {
		const { wrapper } = setup();

		const items = wrapper.findAll("[data-testid='former-membership-item']");
		expect(items).toHaveLength(2);

		const names = wrapper.findAll("[data-testid='former-membership-name']");
		expect(names[0].text()).toBe("Mathe 10");
		expect(names[1].text()).toBe("Lehrerzimmer");

		const schools = wrapper.findAll("[data-testid='former-membership-school']");
		expect(schools[0].text()).toBe("Alte Schule");
	});

	it("calls transferMembership on transfer button click", async () => {
		const { wrapper, store } = setup();
		const transferSpy = vi.spyOn(store, "transferMembership").mockResolvedValue(true);

		const transferBtns = wrapper.findAll("[data-testid='former-membership-transfer-btn']");
		await transferBtns[0].trigger("click");

		expect(transferSpy).toHaveBeenCalledWith("course", "c-1", "Mathe 10");
	});

	it("calls discardMembership on discard button click", async () => {
		const { wrapper, store } = setup();
		const discardSpy = vi.spyOn(store, "discardMembership").mockResolvedValue(true);

		const discardBtns = wrapper.findAll("[data-testid='former-membership-discard-btn']");
		await discardBtns[0].trigger("click");

		expect(discardSpy).toHaveBeenCalledWith("course", "c-1", "Mathe 10");
	});
});
