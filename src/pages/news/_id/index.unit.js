import index from "./index";

describe("@pages/news/_id/index", () => {
	it(...isValidPage(index, { news: { title: "testTitle" } }));
});
