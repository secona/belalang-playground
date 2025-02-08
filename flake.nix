{
  inputs = {
    nixpkgs.url = "github:nixos/nixpkgs/nixos-unstable";
    flake-utils.url = "github:numtide/flake-utils";
    rust-overlay.url = "github:oxalica/rust-overlay";
  };

  outputs = { nixpkgs, flake-utils, rust-overlay, ... }:
    flake-utils.lib.eachDefaultSystem (system: let
      pkgs = import nixpkgs {
        inherit system;
        overlays = [ (import rust-overlay) ];
      };

      rust-toolchain = pkgs.rust-bin.stable.latest.minimal.override {
        extensions = [ "rust-analysis" "rust-src" "rust-std" ];
        targets = [ "wasm32-unknown-unknown" ];
      };
    in {
      devShells.default = pkgs.mkShell {
        nativeBuildInputs = [
          rust-toolchain
          pkgs.wasm-pack
          pkgs.nodejs
          pkgs.nodePackages.pnpm
        ];
      };
    }
  );
}
