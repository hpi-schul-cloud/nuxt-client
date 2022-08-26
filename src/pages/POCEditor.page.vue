<template>
	<div>
		<default-wireframe headline="POC - Editor TipTap" :full-width="false">
			<div>
				<h3>Math formula render outside editor</h3>
				<div>
					<span class="math-tex">\(x = {-b \pm \sqrt{b^2-4ac} \over 2a}\)</span>
				</div>
				<div>Type <code>MathJax.Hub.Typeset()</code> in console</div>
			</div>
			<div>
				<h2>Editor 1</h2>
				<text-editor
					v-model="staticContent"
					class="mb--md mt--xl-3"
					placeholder-text="Extending tip-tap POC"
					:advanced-features="true"
				/>
				<div style="border: solid 1px green">
					<h3>Render Editor 1</h3>
					<div v-html="staticContent"></div>
				</div>
			</div>
			<hr />
			<div>
				<h2>Editor 2</h2>
				<text-editor
					v-model="staticContent2"
					class="mb--md mt--xl-3"
					placeholder-text="Extending TipTap POC"
					:advanced-toolbar="false"
				/>

				<div style="border: solid 1px green">
					<h3>Render Editor 2</h3>
					<div v-html="staticContent2"></div>
				</div>
			</div>
		</default-wireframe>
	</div>
</template>
<script>
import DefaultWireframe from "@/components/templates/DefaultWireframe.vue";
import TextEditor from "@components/molecules/editor/TextEditor.vue";

export default {
	components: {
		DefaultWireframe,
		TextEditor,
	},
	layout: "defaultVuetify",
	data() {
		return {
			staticContent2: "",
			staticContent: `
<iframe src="https://www.google.com" style="width: 300px; height: 100px">This iframe should be converted into safe text</iframe>
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
<p>Some <a href="http://www.gogle.com">Link</a></p>
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
	<figure class="image"><img src="/files/file?file=6304af4a90126d0f45e16c46&amp;name=1660118574955-katzen.jpg" alt="alt image attr"></figure>
</p>
<p>VIDEO:
	<video src="/files/file?file=6304af4a90126d0f45e16c6f&amp;name=1660126664605-video.mp4" controls="true" controlslist="nodownload"></video>
</p>
<p>AUDIO:</p>
<p><audio src="http://192.168.1.136/musik.mp3" controls="true" controlslist="nodownload"></audio></p>
`,
		};
	},
	mounted() {
		MathJax.Hub.Typeset();
	},
};
</script>
