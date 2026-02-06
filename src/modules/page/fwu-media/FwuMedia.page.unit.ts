import FwuMediaPage from "./FwuMedia.page.vue";
import { FwuItemResponse } from "@/generated/fwu-api/v3";
import { createTestingI18n, createTestingVuetify } from "@@/tests/test-utils/setup";
import { createTestingPinia } from "@pinia/testing";
import { SearchField } from "@ui-controls";
import { flushPromises, mount } from "@vue/test-utils";
import { setActivePinia } from "pinia";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { nextTick } from "vue";
import { VProgressCircular } from "vuetify/components";
import { VCard } from "vuetify/components";

const mockFwuData: FwuItemResponse[] = [
	{
		id: "1",
		title: "Mathematics Basics",
		thumbnailUrl: "https://example.com/thumb1.jpg",
		targetUrl: "https://example.com/content1",
	},
	{
		id: "2",
		title: "Physics for Beginners",
		thumbnailUrl: "https://example.com/thumb2.jpg",
		targetUrl: "https://example.com/content2",
	},
	{
		id: "3",
		title: "Biology - Cell Structure",
		thumbnailUrl: "https://example.com/thumb3.jpg",
		targetUrl: "https://example.com/content3",
	},
];

vi.mock("@/generated/fwu-api/v3", () => ({
	FwuApiFactory: () => ({
		fwuLearningContentsControllerGetList: vi.fn().mockResolvedValue({
			data: { data: mockFwuData },
		}),
	}),
}));

const advanceInTime = async (ms = 350) => {
	await flushPromises();
	vi.advanceTimersByTime(ms);
	await nextTick();
};

describe("FwuMediaPage", () => {
	beforeEach(() => {
		vi.clearAllMocks();
		setActivePinia(createTestingPinia());
	});

	const setup = async (advanceAfterLoading = true) => {
		const wrapper = mount(FwuMediaPage, {
			global: { plugins: [createTestingVuetify(), createTestingI18n()] },
		});
		if (advanceAfterLoading) {
			await advanceInTime();
		}
		const searchField = wrapper.find('[data-testid="fwu-search"] input');
		return { wrapper, searchField };
	};

	describe("Data Loading and Display", () => {
		it("should show loading indicator during initial load", async () => {
			const { wrapper } = await setup(false);
			expect(wrapper.findComponent(VProgressCircular).exists()).toBe(true);
		});

		it("should display all FWU items after loading", async () => {
			const { wrapper } = await setup();
			expect(wrapper.findAllComponents(VCard).length).toBe(3);
		});

		it("should display title, thumbnail and link for each item", async () => {
			const { wrapper } = await setup();
			const firstCard = wrapper.findComponent(VCard);
			expect(firstCard.exists()).toBe(true);

			expect(firstCard.attributes("href")).toBe(mockFwuData[0].targetUrl);
			expect(firstCard.text()).toContain(mockFwuData[0].title);
			const img = firstCard.find(".v-img");
			expect(img.exists()).toBe(true);
		});
	});

	describe("Search Functionality", () => {
		it("should render SerachField component", async () => {
			const { wrapper } = await setup();
			const searchField = wrapper.findComponent(SearchField);
			expect(searchField.exists()).toBe(true);
		});

		it("should filter results by title", async () => {
			const { wrapper, searchField } = await setup();
			await advanceInTime();
			expect(wrapper.findAllComponents(VCard).length).toBe(3);

			await searchField.setValue("Mathematics");

			await advanceInTime();
			const cards = wrapper.findAllComponents(VCard);
			expect(cards.length).toBe(1);
			expect(cards[0].text()).toContain("Mathematics");
		});

		it("should ignore case sensitivity in search", async () => {
			const { wrapper, searchField } = await setup();

			await searchField.setValue("PHYSICS");
			await advanceInTime(350);

			const cards = wrapper.findAllComponents(VCard);
			expect(cards.length).toBe(1);
			expect(cards[0].text()).toContain("Physics");
		});

		it("should show all items when search field is empty", async () => {
			const { wrapper, searchField } = await setup();

			await searchField.setValue("Mathematics");
			await advanceInTime(350);

			expect(wrapper.findAllComponents(VCard).length).toBe(1);

			await searchField.setValue("");
			await advanceInTime(350);

			expect(wrapper.findAllComponents(VCard).length).toBe(3);
		});

		it("should support substring search", async () => {
			const { wrapper, searchField } = await setup();

			await searchField.setValue("for");
			await advanceInTime();

			const cards = wrapper.findAllComponents(VCard);
			expect(cards.length).toBe(1);
			expect(cards[0].text()).toContain("for Beginners");
		});
	});
});
