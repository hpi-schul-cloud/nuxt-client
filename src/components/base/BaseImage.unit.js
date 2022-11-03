import BaseImage from "./BaseImage";
describe("@/components/base/BaseImage", () => {
	it("can render jpg images", () => {
		const testImgSrc = "blubb.jpg";
		const testImgAlt = "test image";
		const testImgHeight = "111px";
		const wrapper = mount(BaseImage, {
			propsData: {
				imgSrc: testImgSrc,
				imgAlt: testImgAlt,
				imgHeight: testImgHeight,
				fill: "red",
			},
		});

		expect(wrapper.find("img").attributes("src")).toBe(testImgSrc);
		expect(wrapper.find("img").attributes("alt")).toBe(testImgAlt);
		expect(wrapper.find("img").attributes("style")).toBe(
			"max-height: " + testImgHeight + ";"
		);

		expect(wrapper.find("svg").exists()).toBe(false);
	});
});
