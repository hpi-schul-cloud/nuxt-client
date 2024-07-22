import { extractDataAttribute } from "./extractDataAttribute.util";

const getRandomId = () => "id" + Math.random();

describe("extractDataAttribute", () => {
	describe("when data-attribute can not be found anywhere", () => {
		it("should return undefined", async () => {
			document.body.innerHTML = `<div id="element"></div>`;

			const el = document.getElementById("element");
			const columnId = extractDataAttribute(el, "columnId");

			expect(columnId).toBeUndefined();
		});
	});

	describe("when data-attribute exists on the element itself", () => {
		it("should return the value", async () => {
			const id = getRandomId();
			document.body.innerHTML = `<div id="element" data-column-id="${id}"></div>`;

			const el = document.getElementById("element");
			const columnId = extractDataAttribute(el, "columnId");

			expect(columnId).toBe(id);
		});
	});

	describe("when data-attribute exists on the parent element itself", () => {
		it("should return the value", async () => {
			const id = getRandomId();
			document.body.innerHTML = `
                <ul data-column-id="${id}">
                    <li id="element"></li>
                </ul>`;

			const el = document.getElementById("element");
			const columnId = extractDataAttribute(el, "columnId");

			expect(columnId).toBe(id);
		});
	});

	describe("when data-attribute exists on on of the ancestor elements itself", () => {
		it("should return the value", async () => {
			const id = getRandomId();
			document.body.innerHTML = `
            <div class="column" data-column-id="${id}">
                <div class="card data-card-id="c1">
                    <ul class="card-elements">
                        <li id="element"></li>
                    </ul>
                </div>
            </div>`;

			const el = document.getElementById("element");
			const columnId = extractDataAttribute(el, "columnId");

			expect(columnId).toBe(id);
		});
	});
});
