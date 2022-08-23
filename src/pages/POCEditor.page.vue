<template>
	<div>
		<default-wireframe headline="POC - Editor TipTap" :full-width="false">
			<div>
				<h3>Math formula render</h3>
				<div>
					<span class="math-tex">\(x = {-b \pm \sqrt{b^2-4ac} \over 2a}\)</span>
				</div>
				<div>
					When $a \ne 0$, there are two solutions to \(ax^2 + bx + c = 0\) and
					they are $$x = {-b \pm \sqrt{b^2-4ac} \over 2a}.$$
				</div>
			</div>
			<div>
				<h2>Editor 1</h2>

				<text-editor
					v-model="staticContent"
					class="mb--md mt--xl-3"
					placeholder-text="Extending tip-tap POC"
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
import TextEditor from "@components/molecules/TextEditor.vue";

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

	<p>Wichtig ist, dass ihr die Zeilenlänge im Blick behaltet und eingreift</p>
	<h2>Die ideale Zeilenlänge für ebsites (H1) Ώ😎</h2>
	<p>Im Web werden circa. 45 – 75 Zeichen pro Zeile als ideal <strong>bezeichnet</strong>. Betrachtet diese Werte aber bitte nicht zu dogmatisch – Google spricht beispielweise von maximal 70 – 80 Zeichen je Zeile.</p>
	<h3>Die ideale Zeilenlänge für Websites (H2)</h3>
	<p><em>Im Web werden circa. 45 – 75 Zeichen pro Zeile als ideal bezeichnet. Betrachtet diese Werte aber bitte nicht zu dogmatisch – Google spricht beispielweise von maximal 70 – 80 Zeichen je Zeile.</em></p>
	<p>Die ideale Zeilenlänge für Websites (H3)</p>
	<p>Im Web <u>werden </u>circa. 45 – 75 <s>Zeichen </s>pro Zeile als ideal bezeichnet. Betrachtet diese Werte aber bitte nicht zu dogmatisch – Google spricht beispielweise von maximal 70 – 80 Zeichen je Zeile.</p>
	<ol>
	   <li>
	      <p>Im Web werden circa. 45 – 75 Zeichen pro Zeile als ideal bezeichnet.</p>
	   </li>
	   <li>
	      <p>Betrachtet diese Werte aber bitte nicht zu dogmatisch –</p>
	   </li>
	</ol>
	<ul>
	   <li>
	      <p>Betrachtet diese Werte aber bitte nicht zu dogmatisch –</p>
	   </li>
	   <li>
	      <p>Google spricht beispielweise von maximal 70 – 80 Zeichen je Zeile. W</p>
	   </li>
	</ul>
	<blockquote>
	   <p>Our posturings, our imagined self-importance, the delusion that we have some privileged position in the Universe, are challenged by this point of pale light. Our planet is a lonely speck in the great enveloping cosmic dark. In our obscurity, in all this vastness, there is no hint that help will come from elsewhere to save us from ourselves.</p>
	</blockquote>
	<p><code>var myElement = document.getElementById("intro");</code></p>
	<hr contenteditable="false">
	<p>$€¥©°ĒņŊ</p>
	<p><span class="math-tex">\(x = {-b \pm \sqrt{b^2-4ac} \over 2a}\)</span></p>
	<div class="tableWrapper">
	   <table style="min-width: 100px;">
	      <colgroup>
	         <col>
	         <col>
	         <col>
	         <col>
	      </colgroup>
	      <tbody>
	         <tr>
	            <td colspan="1" rowspan="1">
	               <p>wieder&nbsp;</p>
	            </td>
	            <td colspan="1" rowspan="1">
	               <p>wieder&nbsp;</p>
	            </td>
	            <td colspan="1" rowspan="1">
	               <p>wieder&nbsp;</p>
	            </td>
	            <td colspan="1" rowspan="1">
	               <p>wieder&nbsp;</p>
	            </td>
	         </tr>
	         <tr>
	            <td colspan="1" rowspan="1">
	               <p>wieder&nbsp;</p>
	            </td>
	            <td colspan="1" rowspan="1">
	               <p>wieder&nbsp;</p>
	            </td>
	            <td colspan="1" rowspan="1">
	               <p>wieder&nbsp;</p>
	            </td>
	            <td colspan="1" rowspan="1">
	               <p>wieder&nbsp;</p>
	            </td>
	         </tr>
	         <tr>
	            <td colspan="1" rowspan="1">
	               <p>&nbsp;</p>
	            </td>
	            <td colspan="1" rowspan="1">
	               <p>&nbsp;</p>
	            </td>
	            <td colspan="1" rowspan="1">
	               <p>&nbsp;</p>
	            </td>
	            <td colspan="1" rowspan="1">
	               <p>&nbsp;</p>
	            </td>
	         </tr>
	         <tr>
	            <td colspan="1" rowspan="1">
	               <p>&nbsp;</p>
	            </td>
	            <td colspan="1" rowspan="1">
	               <p>&nbsp;</p>
	            </td>
	            <td colspan="1" rowspan="1">
	               <p>&nbsp;</p>
	            </td>
	            <td colspan="1" rowspan="1">
	               <p>&nbsp;</p>
	            </td>
	         </tr>
	      </tbody>
	   </table>
	</div>
	<p><a href="http://www.gogle.com">Link</a></p>
	<img src="/files/file?file=630348f6a37aa0001d6ad913&amp;name=katzen.jpg" alt="alt1" contenteditable="false" draggable="true">`,
		};
	},
};
</script>
