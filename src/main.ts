import './main.css'
import { ResizablePanel } from './components/ResizablePanel';
import { ConsoleOutput } from './components/ConsoleOutput';
import { CodeExamples } from './components/CodeExamples';
import { Editor } from './components/Editor';

class App {
  private editor: Editor;
  private console: ConsoleOutput;
  private examples: CodeExamples;

  constructor() {
    this.editor = new Editor(`print("Hello, World!");`);
    this.console = new ConsoleOutput();
    this.examples = new CodeExamples(this.editor);
    new ResizablePanel();
    this.exposeGlobalFunctions();
  }

  private exposeGlobalFunctions() {
    (window as any).runCode = () => this.editor.runCode();
    (window as any).clearConsole = () => this.console.clear();
    (window as any).println = (value: string) => this.console.println(value);
    (window as any).exampleSelector = () => this.examples.handleSelection();
  }
}

// Initialize the application
new App();
