import { closeBrackets, closeBracketsKeymap } from '@codemirror/autocomplete';
import { defaultKeymap, history, historyKeymap, indentWithTab } from '@codemirror/commands';
import { bracketMatching, indentOnInput } from '@codemirror/language';
import { EditorView, highlightActiveLine, highlightActiveLineGutter, keymap, lineNumbers } from '@codemirror/view';
import { EditorState } from '@codemirror/state';
import * as rs from "belalang-playground";

export class Editor {
  private view: EditorView;

  constructor(initialContent: string) {
    this.view = new EditorView({
      parent: document.getElementById("editor")!,
      state: EditorState.create({
        doc: initialContent,
        extensions: this.createExtensions(),
      }),
    });
  }

  private createExtensions() {
    return [
      bracketMatching(),
      closeBrackets(),
      history(),
      highlightActiveLine(),
      highlightActiveLineGutter(),
      indentOnInput(),
      lineNumbers(),
      keymap.of([
        { key: "Mod-Enter", run: () => this.runCode() },
        indentWithTab,
        ...defaultKeymap,
        ...historyKeymap,
        ...closeBracketsKeymap,
      ]),
    ];
  }

  setContent(content: string) {
    this.view.dispatch(this.view.state.update({
      changes: {
        from: 0,
        to: this.view.state.doc.length,
        insert: content,
      }
    }));
  }

  focus() {
    this.view.focus();
  }

  getContent(): string {
    return this.view.state.doc.toString();
  }

  runCode(): boolean {
    rs.run_code(this.getContent());
    return true;
  }
} 