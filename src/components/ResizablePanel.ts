export class ResizablePanel {
  private dragging = false;
  private editor: HTMLElement;
  private handle: HTMLElement;
  private out: HTMLElement;

  constructor() {
    this.editor = document.getElementById("editor")!;
    this.handle = document.getElementById("handle")!;
    this.out = document.getElementById("out-wrapper")!;
    this.setupEventListeners();
  }

  private clamp(min: number, value: number, max: number): number {
    return Math.max(min, Math.min(value, max));
  }

  private setupEventListeners() {
    this.handle.addEventListener("mousedown", () => {
      this.dragging = true;
    });

    document.addEventListener("mousemove", (e) => {
      if (this.dragging) {
        const editorWidth = this.clamp(20, (e.clientX / window.innerWidth) * 100, 80);
        const outWidth = 100 - editorWidth;

        this.editor.style.width = `${editorWidth}%`;
        this.out.style.width = `${outWidth}%`;
      }
    });

    document.addEventListener("mouseup", () => {
      this.dragging = false;
    });
  }
} 