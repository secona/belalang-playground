use belalang_comp::compiler::CompilerBuilder;
use belalang_core::lexer::Lexer;
use belalang_core::parser::Parser;
use belalang_vm::builtins::{Builtin, BuiltinCollectionBuilder};
use belalang_vm::object::Object;
use belalang_vm::vm::VMBuilder;
use wasm_bindgen::prelude::*;

#[wasm_bindgen]
extern "C" {
    fn println(value: &str);
}

#[wasm_bindgen]
pub fn run_code(input: String) {
    let lexer = Lexer::new(input.as_bytes());
    let mut parser = Parser::new(lexer);

    let program = match parser.parse_program() {
        Ok(program) => program,
        Err(err) => {
            println(&format!("Syntax Error: {}", err));
            return;
        }
    };

    let mut compiler = CompilerBuilder::default().build();
    let code = match compiler.compile_program(program) {
        Ok(code) => code,
        Err(err) => {
            println(&format!("Compile Error: {}", err));
            return;
        }
    };

    let bc = BuiltinCollectionBuilder::default()
        .builtin_function(
            "print".into(),
            Builtin {
                arity: 1,
                function: Box::new(|args| {
                    println(&format!("{}", args.first().unwrap()));
                    Object::Null
                }),
            },
        )
        .build();

    let mut vm = VMBuilder::default().builtin_collection(bc).build();
    if let Err(err) = vm.run(code) {
        println(&format!("Runtime Error: {}", err));
    }
}
