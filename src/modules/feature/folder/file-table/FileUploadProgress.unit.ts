import {
	createTestingI18n,
	createTestingVuetify,
} from "@@/tests/test-utils/setup";
import FileUploadProgress from "./FileUploadProgress.vue";

describe("FileUploadProgress", () => {
	const buildUploadStatsTranslation = (uploaded: string, total: string) => {
		return `${uploaded} von ${total} Dateien hochgeladen`;
	};

	const setupWrapper = (uploadProgress: {
		uploaded: number;
		total: number;
	}) => {
		const wrapper = mount(FileUploadProgress, {
			global: {
				plugins: [
					createTestingVuetify(),
					createTestingI18n({
						messages: {
							en: {
								"pages.folder.uploadstats": buildUploadStatsTranslation(
									"{uploaded}",
									"{total}"
								),
							},
						},
					}),
				],
			},
			props: {
				uploadProgress,
			},
		});

		return { wrapper };
	};

	describe("when upload progress total and uploaded are 0", () => {
		it("should not show v-progress-circular", () => {
			const { wrapper } = setupWrapper({ uploaded: 0, total: 0 });

			expect(
				wrapper.findComponent({ name: "v-progress-circular" }).exists()
			).toBe(false);
		});

		it("should not show v-icon", () => {
			const { wrapper } = setupWrapper({ uploaded: 0, total: 0 });

			expect(wrapper.findComponent({ name: "v-icon" }).exists()).toBe(false);
		});

		it("should not show upload stats text", () => {
			const { wrapper } = setupWrapper({ uploaded: 0, total: 0 });

			const uploadProgressText = wrapper.find(
				"[data-testid='upload-progress']"
			);
			expect(uploadProgressText.exists()).toBe(false);
		});
	});

	describe("when upload progress total > 0 and uploaded < total", () => {
		it("should show v-progress-circular", () => {
			const { wrapper } = setupWrapper({ uploaded: 1, total: 2 });

			expect(
				wrapper.findComponent({ name: "v-progress-circular" }).exists()
			).toBe(true);
		});

		it("should not show v-icon", () => {
			const { wrapper } = setupWrapper({ uploaded: 1, total: 2 });

			expect(wrapper.findComponent({ name: "v-icon" }).exists()).toBe(false);
		});

		it("should show upload stats text", () => {
			const { wrapper } = setupWrapper({ uploaded: 1, total: 2 });

			const uploadProgressText = wrapper.find(
				"[data-testid='upload-progress']"
			);
			expect(uploadProgressText.exists()).toBe(true);
			expect(uploadProgressText.text()).toBe(
				buildUploadStatsTranslation("1", "2")
			);
		});
	});

	describe("when upload progress total > 0 and uploaded = total", () => {
		it("should not show v-progress-circular", () => {
			const { wrapper } = setupWrapper({ uploaded: 2, total: 2 });

			expect(
				wrapper.findComponent({ name: "v-progress-circular" }).exists()
			).toBe(false);
		});

		it("should show v-icon", () => {
			const { wrapper } = setupWrapper({ uploaded: 2, total: 2 });

			expect(wrapper.findComponent({ name: "v-icon" }).exists()).toBe(true);
		});

		it("should show upload stats text", () => {
			const { wrapper } = setupWrapper({ uploaded: 2, total: 2 });

			const uploadProgressText = wrapper.find(
				"[data-testid='upload-progress']"
			);
			expect(uploadProgressText.exists()).toBe(true);
			expect(uploadProgressText.text()).toBe(
				buildUploadStatsTranslation("2", "2")
			);
		});
	});

	describe("when upload progress total and uploaded are initially 0 and then change to 0, 1", () => {
		it("should show v-progress-circular", async () => {
			const { wrapper } = setupWrapper({ uploaded: 0, total: 0 });

			expect(
				wrapper.findComponent({ name: "v-progress-circular" }).exists()
			).toBe(false);

			await wrapper.setProps({ uploadProgress: { uploaded: 0, total: 1 } });

			expect(
				wrapper.findComponent({ name: "v-progress-circular" }).exists()
			).toBe(true);
		});
	});

	describe("when upload progress total and uploaded are initially 1,1 and then change to 0, 0", () => {
		it("should show upload complete icon", async () => {
			const { wrapper } = setupWrapper({ uploaded: 1, total: 1 });

			expect(wrapper.findComponent({ name: "v-icon" }).exists()).toBe(true);

			await wrapper.setProps({ uploadProgress: { uploaded: 0, total: 0 } });

			expect(wrapper.findComponent({ name: "v-icon" }).exists()).toBe(true);
		});

		it("should make the icon disappear after 5 seconds", async () => {
			jest.useFakeTimers();
			const { wrapper } = setupWrapper({ uploaded: 1, total: 1 });

			expect(wrapper.findComponent({ name: "v-icon" }).exists()).toBe(true);

			await wrapper.setProps({ uploadProgress: { uploaded: 0, total: 0 } });

			expect(wrapper.findComponent({ name: "v-icon" }).exists()).toBe(true);

			jest.advanceTimersByTime(5000);
			await wrapper.vm.$nextTick();

			expect(wrapper.findComponent({ name: "v-icon" }).exists()).toBe(false);
		});
	});
});
