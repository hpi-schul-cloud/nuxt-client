<template>
	<div>
		<text-editor v-model="jsonInput" :advanced-features="true" />
	</div>
</template>

<script>
import { defineComponent } from "vue";
import TextEditor from "./editor/TextEditor.vue";

export default defineComponent({
	name: "TiptapProofOfConcept",
	components: {
		TextEditor,
	},
	data() {
		return {
			htmlInput: `<iframe src="https://www.google.com" style="width: 300px; height: 100px">This iframe should be converted into safe text</iframe>
<h2>h1</h2>
<h3>h2</h3>
<p>h3</p>
<p>some
	<strong>bold</strong>
	<i>italic</i>
	<u>underline</u>
	<s>strike-through</s>
	<sub>sub</sub> and
	<sup>sup</sup>
</p>
<p>checking span
	<span style="color:#F44336">color</span> and
	<span style="background-color:#9C27B0">background color</span>
</p>
<blockquote>
	<p>and some blockquote</p>
</blockquote>
<p>come code comes here:
	<code>while (editor) { alert('does it render?') }</code>
</p>
<p>Line:<hr />
</p>
<p>
	<ol>
		<li>ordered list</li>
	</ol>
	<ul>
		<li>unordered list</li>
	</ul>
</p>
<p>symbols $₹₻≡⇒</p>
<p>Some <a href="http://www.google.com">Link</a></p>
<p>
	<figure class="table">
<table>
	<tbody>
	<tr>
			<th>Col 1</th>
			<th>Col 2</th>
			<th>Col 3</th>
		</tr>
		<tr>
			<td>table td 1 1</td>
			<td>table td 1 2</td>
			<td rowspan="2">merged table rows</td>
		</tr>
		<tr>
			<td>table td 2 1</td>
			<td>table td 2 2</td>
		</tr>
	</tbody>
</table>
	</figure>
</p>
<p>Math formula: <span class="math-tex">\\(x = {-b \\pm \\sqrt{b^2-4ac} \\over 3a}\\)</span></p>
<p>IMAGE:
	<figure class="image"><img src="https://icatcare.org/app/uploads/2018/10/What-is-a-cat.png" alt="alt image attr"></figure>
</p>
<p>VIDEO:</p>
	<video src="somevideo.mp4" controls="true" controlslist="nodownload"></video>
<p>AUDIO:</p>
<audio src="http://192.168.1.136/musik.mp3" controls="true" controlslist="nodownload"></audio>`,
			jsonInput: {
				type: "doc",
				content: [
					{
						type: "paragraph",
						content: [
							{
								type: "text",
								text: "This iframe should be converted into safe text",
							},
						],
					},
					{
						type: "heading",
						attrs: { level: 2 },
						content: [{ type: "text", text: "h1" }],
					},
					{
						type: "heading",
						attrs: { level: 3 },
						content: [{ type: "text", text: "h2" }],
					},
					{ type: "paragraph", content: [{ type: "text", text: "h3" }] },
					{
						type: "paragraph",
						content: [
							{ type: "text", text: "some " },
							{ type: "text", marks: [{ type: "bold" }], text: "bold" },
							{ type: "text", text: " " },
							{ type: "text", marks: [{ type: "italic" }], text: "italic" },
							{ type: "text", text: " " },
							{
								type: "text",
								marks: [{ type: "underline" }],
								text: "underline",
							},
							{ type: "text", text: " " },
							{
								type: "text",
								marks: [{ type: "strike" }],
								text: "strike-through",
							},
							{ type: "text", text: " " },
							{ type: "text", marks: [{ type: "subscript" }], text: "sub" },
							{ type: "text", text: " and " },
							{ type: "text", marks: [{ type: "superscript" }], text: "sup" },
						],
					},
					{
						type: "paragraph",
						content: [
							{ type: "text", text: "checking span " },
							{
								type: "text",
								marks: [
									{
										type: "span",
										attrs: { class: null, style: "color:#F44336" },
									},
								],
								text: "color",
							},
							{ type: "text", text: " and " },
							{
								type: "text",
								marks: [
									{
										type: "span",
										attrs: { class: null, style: "background-color:#9C27B0" },
									},
								],
								text: "background color",
							},
						],
					},
					{
						type: "blockquote",
						content: [
							{
								type: "paragraph",
								content: [{ type: "text", text: "and some blockquote" }],
							},
						],
					},
					{
						type: "paragraph",
						content: [
							{ type: "text", text: "come code comes here: " },
							{
								type: "text",
								marks: [{ type: "code" }],
								text: "while (editor) { alert('does it render?') }",
							},
						],
					},
					{ type: "paragraph", content: [{ type: "text", text: "Line:" }] },
					{ type: "horizontalRule" },
					{ type: "paragraph" },
					{ type: "paragraph" },
					{
						type: "orderedList",
						attrs: { start: 1 },
						content: [
							{
								type: "listItem",
								content: [
									{
										type: "paragraph",
										content: [{ type: "text", text: "ordeered list" }],
									},
								],
							},
						],
					},
					{
						type: "bulletList",
						content: [
							{
								type: "listItem",
								content: [
									{
										type: "paragraph",
										content: [{ type: "text", text: "unordered list" }],
									},
								],
							},
						],
					},
					{ type: "paragraph" },
					{
						type: "paragraph",
						content: [{ type: "text", text: "symbols $₹₻≡⇒" }],
					},
					{
						type: "paragraph",
						content: [
							{ type: "text", text: "Some " },
							{
								type: "text",
								marks: [
									{
										type: "link",
										attrs: {
											href: "http://www.google.com",
											target: "_blank",
											class: null,
										},
									},
								],
								text: "Link",
							},
						],
					},
					{ type: "paragraph" },
					{
						type: "table",
						content: [
							{
								type: "tableRow",
								content: [
									{
										type: "tableHeader",
										attrs: { colspan: 1, rowspan: 1, colwidth: null },
										content: [
											{
												type: "paragraph",
												content: [{ type: "text", text: "Col 1" }],
											},
										],
									},
									{
										type: "tableHeader",
										attrs: { colspan: 1, rowspan: 1, colwidth: null },
										content: [
											{
												type: "paragraph",
												content: [{ type: "text", text: "Col 2" }],
											},
										],
									},
									{
										type: "tableHeader",
										attrs: { colspan: 1, rowspan: 1, colwidth: null },
										content: [
											{
												type: "paragraph",
												content: [{ type: "text", text: "Col 3" }],
											},
										],
									},
								],
							},
							{
								type: "tableRow",
								content: [
									{
										type: "tableCell",
										attrs: { colspan: 1, rowspan: 1, colwidth: null },
										content: [
											{
												type: "paragraph",
												content: [{ type: "text", text: "table td 1 1" }],
											},
										],
									},
									{
										type: "tableCell",
										attrs: { colspan: 1, rowspan: 1, colwidth: null },
										content: [
											{
												type: "paragraph",
												content: [{ type: "text", text: "table td 1 2" }],
											},
										],
									},
									{
										type: "tableCell",
										attrs: { colspan: 1, rowspan: 2, colwidth: null },
										content: [
											{
												type: "paragraph",
												content: [{ type: "text", text: "merged table rows" }],
											},
										],
									},
								],
							},
							{
								type: "tableRow",
								content: [
									{
										type: "tableCell",
										attrs: { colspan: 1, rowspan: 1, colwidth: null },
										content: [
											{
												type: "paragraph",
												content: [{ type: "text", text: "table td 2 1" }],
											},
										],
									},
									{
										type: "tableCell",
										attrs: { colspan: 1, rowspan: 1, colwidth: null },
										content: [
											{
												type: "paragraph",
												content: [{ type: "text", text: "table td 2 2" }],
											},
										],
									},
								],
							},
						],
					},
					{ type: "paragraph" },
					{
						type: "paragraph",
						content: [
							{ type: "text", text: "Math formula: " },
							{
								type: "math",
								attrs: {
									class: "math-tex",
									formula: "\\(x = {-b \\pm \\sqrt{b^2-4ac} \\over 3a}\\)",
								},
							},
						],
					},
					{ type: "paragraph", content: [{ type: "text", text: "IMAGE:" }] },
					{
						type: "image",
						attrs: {
							src: "https://icatcare.org/app/uploads/2018/10/What-is-a-cat.png",
							alt: "alt image attr",
							title: null,
						},
					},
					{ type: "paragraph" },
					{ type: "paragraph", content: [{ type: "text", text: "VIDEO:" }] },
					{
						type: "video",
						attrs: {
							src: "somevideo.mp4",
							controls: true,
							controlslist: "nodownload",
						},
					},
					{ type: "paragraph", content: [{ type: "text", text: "AUDIO:" }] },
					{
						type: "audio",
						attrs: {
							src: "http://192.168.1.136/musik.mp3",
							controls: true,
							controlslist: "nodownload",
						},
					},
				],
			},
		};
	},
});
</script>
