import Vue from "vue";

export const striphtml = (value) => {
	const div = document.createElement("div");
	div.innerHTML = value;
	const text = div.textContent || div.innerText || "";
	return text;
};

Vue.filter("striphtml", striphtml);
