export class ConsoleOutput {
  private outElement: HTMLElement;

  constructor() {
    this.outElement = document.getElementById("out")!;
  }

  clear() {
    while (this.outElement.firstChild) {
      this.outElement.removeChild(this.outElement.lastChild!);
    }
  }

  println(value: string) {
    const p = document.createElement("p");
    p.textContent = value;
    this.outElement.appendChild(p);
  }
} 