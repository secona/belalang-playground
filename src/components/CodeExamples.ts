import { Editor } from './Editor';

export class CodeExamples {
  private examples: Record<string, string> = {
    "Hello World": `print("Hello, World!");`,
    "Variables": `# Declare variables using the \`:=\` operator
# Currently, Belalang only supports integers, floats, and strings
int_var := 123;
flo_var := 44.2;
str_var := "Hello, World!";

# Print variables to the console using the builtin \`print\` function
print(int_var);
print(flo_var);
print(str_var);

# Assign new values to existing variables using the \`=\` operator
int_var = 1;
flo_var = 1.4;
str_var = "Hello, Mom!";

# Print the new values of the variables
print(int_var);
print(flo_var);
print(str_var);`,
    "If-Else If-Else": `# Variable declaration and assignment
price := 50;

# Conditional statement example
if price < 30 {
    print("very cheap");
} else if (price < 40) {
    print("not so cheap");
} else {
    print("very not cheap");
}

# Using if as an expression
status := if price < 30 {
    "very cheap"
} else if price < 40 {
    "not so cheap"
} else {
    "very not cheap"
};

# Print the status
print(status);`,
    "Functions": `# Functions are declared like variables using the \`fn\` keyword
# Define a function to add two numbers
add := fn(x, y) {
    return x + y;
};

# Call the add function and print the result
print(add(1, 2));

# You can also take advantage of expressions to return values
# Define a function to multiply two numbers using an expression
mul := fn(x, y) { x * y };

# Call the mul function and print the result
print(mul(3, 4));`,
    "While Loops": `# While loops are declared with the \`while\` keyword.
i := 0;
while i < 10 {
  print(i);
  i = i + 1;
}`,
    "Factorial": `# Recursions!
fact := fn(n) {
  # The base case
  if (n < 2) {
    return 1;
  }
  
  # The recursive case
  return n * fact(n - 1);
};

print(fact(5));`
  };

  private selector: HTMLSelectElement;
  private editor: Editor;

  constructor(editor: Editor) {
    this.selector = document.getElementById("example-selector") as HTMLSelectElement;
    this.editor = editor;
    this.initializeSelector();
  }

  private initializeSelector() {
    for (const key in this.examples) {
      const option = document.createElement("option");
      option.value = key;
      option.append(key);
      this.selector.appendChild(option);
    }
  }

  getExample(name: string): string {
    return this.examples[name];
  }

  handleSelection() {
    const selectedExample = this.examples[this.selector.value];
    this.editor.setContent(selectedExample);
    this.editor.focus();
    this.selector.selectedIndex = 0;
  }
} 