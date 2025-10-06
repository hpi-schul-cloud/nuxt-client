import kjua from "kjua";

const printStyles = (optionalStyles) => `<style>
	@page {
		size: A4;
		margin: 16px;
	}
	body {
		font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Ubuntu, Helvetica Neue, Arial, sans-serif;
	}
	${optionalStyles}
</style>`;

const getPageHtml = (head, body) => `<html><head>${head}</head><body>${body}</body></html>`;

const getQRCodeBase64Image = (text) => kjua({ text: text, render: "canvas" }).toDataURL();

const print = (content, styles = "") => {
	const w = window.open();
	w.document.write(getPageHtml(printStyles(styles), content));
	w.document.close();
	/* eventListener is needed to give the browser some rendering time for the image */
	w.addEventListener("load", () => {
		w.focus();
		w.print();
		// why is this timeout required?
		setTimeout(() => {
			w.close();
		}, 500);
	});
};

const printQRs = (items = []) => {
	const styles = `
		.part{
			border: 1px solid #aaa;
			width: 4cm;
			float: left;
			padding: 8px;
			margin: 4px;
		}
		.qr-code{ width: 100% !important; height: auto !important; }
		.qr-content{
			font-size: 0.7em;
			opacity: 0.7;
			width: 100%;
			word-break:
			break-all;
			word-break: break-word;
			margin: 2px 0 0;
		}
		.title{ margin: 4px 0; font-size: 1.25em; font-weight: bold; }
		.description{
			font-size: 1em;
			color: #555;
			margin: 0;
			word-break: break-all;
			word-break: break-word;
		}`;
	let content = "";
	if (items.length === 0) {
		content = "Keine Einträge zu drucken."; // TODO: develop concept to use language files here
	} else {
		content = items
			.map((item) => {
				const QRCodeBase64Image = getQRCodeBase64Image(item.qrContent);
				return `<div class="part">
					<div class="image-wrapper">
						<img class="qr-code" alt="${item.qrContent}" src="${QRCodeBase64Image}" width="200" height="200">
						<div class="qr-content">${item.qrContent}</div>
					</div>
					${item.title ? `<h4 class="title">${item.title}</h4>` : ""}
					${item.description ? `<p class="description">${item.description}</p>` : ""}
				</div>`;
			})
			.join("\n");
	}
	return print(content, styles);
};

export default {
	methods: {
		$_print: print,
		$_printQRs: printQRs,
	},
};
