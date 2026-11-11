import FormerMembershipsBanner from "./FormerMembershipsBanner.vue";
import FormerMembershipsList from "./FormerMembershipsList.vue";
import { createTestingI18n, createTestingVuetify } from "@@/tests/test-utils/setup";
import { useFormerMembershipStore } from "@data-app";
import { createTestingPinia } from "@pinia/testing";
import { mount } from "@vue/test-utils";
import { setActivePinia } from "pinia";
import { beforeEach, describe, expect, it, vi } from "vitest";

describe("FormerMembershipsBanner", () => {
	const mockItems = [
		{ type: "course" as const, refId: "c-1", name: "Mathe 10", schoolId: "s-1", schoolName: "Alte Schule" },
		{ type: "room" as const, refId: "r-1", name: "Lehrerzimmer", schoolId: "s-1", schoolName: "Alte Schule" },
	];

	beforeEach(() => {
		setActivePinia(createTestingPinia({ stubActions: false }));
	});

	const setup = (items = mockItems, isDismissed = false) => {
		const store = useFormerMembershipStore();
		vi.spyOn(store, "fetchFormerMemberships").mockImplementation(async () => {
			store.items = [...items];
			return items;
		});
		store.items = [...items];
		store.isDismissed = isDismissed;

		const wrapper = mount(FormerMembershipsBanner, {
			global: {
				plugins: [createTestingVuetify(), createTestingI18n()],
			},
		});
		return { wrapper, store };
	};

	it("fetches former memberships on mount", () => {
		const { store } = setup();
		expect(store.fetchFormerMemberships).toHaveBeenCalled();
	});

	it("does not render when there are no former memberships", () => {
		const { wrapper } = setup([]);
		expect(wrapper.find("[data-testid='former-memberships-banner']").exists()).toBe(false);
	});

	it("does not render when dismissed", () => {
		const { wrapper } = setup(mockItems, true);
		expect(wrapper.find("[data-testid='former-memberships-banner']").exists()).toBe(false);
	});

	it("renders banner when former memberships exist", () => {
		const { wrapper } = setup();
		expect(wrapper.find("[data-testid='former-memberships-banner']").exists()).toBe(true);
		expect(wrapper.find("[data-testid='former-memberships-banner-title']").exists()).toBe(true);
	});

	it("calls transferAllMemberships on transfer all button click", async () => {
		const { wrapper, store } = setup();
		const transferAllSpy = vi.spyOn(store, "transferAllMemberships").mockResolvedValue({
			total: 2,
			transferred: 2,
			failed: 0,
			results: [],
		});

		const btn = wrapper.find("[data-testid='transfer-all-btn']");
		await btn.trigger("click");

		expect(transferAllSpy).toHaveBeenCalled();
	});

	it("toggles details list when clicking toggle details button", async () => {
		const { wrapper } = setup();

		expect(wrapper.findComponent(FormerMembershipsList).exists()).toBe(false);

		const toggleBtn = wrapper.find("[data-testid='toggle-details-btn']");
		await toggleBtn.trigger("click");

		expect(wrapper.findComponent(FormerMembershipsList).exists()).toBe(true);

		await toggleBtn.trigger("click");
		expect(wrapper.findComponent(FormerMembershipsList).exists()).toBe(false);
	});

	it("dismisses the banner when close button is clicked", async () => {
		const { wrapper, store } = setup();
		const dismissSpy = vi.spyOn(store, "dismissBanner");

		const closeBtn = wrapper.find("[data-testid='dismiss-banner-btn']");
		await closeBtn.trigger("click");

		expect(dismissSpy).toHaveBeenCalled();
	});
});
