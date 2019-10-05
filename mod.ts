import { toUint8Array } from "https://deno.land/x/base64/mod.ts"

/** Initializes a WASX crypto kit meant to be an import 4 wasm. */
export function init(
  memory: WebAssembly.Memory = new WebAssembly.Memory({ initial: 1 })
): {
  memory: WebAssembly.Memory;
  constant_time_equal(a: number, b: number, len: number): number;
  // wipe(ptr: number, len: number): void;
  wasi_unstable: {
    random_get(buf: number, buf_len: number): void;
  };
} {
  const constant_time_equal: (a: number, b: number, len: number) => number = new WebAssembly.Instance(
    new WebAssembly.Module(toUint8Array(
      ""
    )), { memory }
  ).exports.constant_time_equal;
  
  return {
    memory,
    constant_time_equal,
    // wipe(ptr: number, len: number): void {},
    wasi_unstable: {
      random_get(buf: number, buf_len: number): void {
        crypto.getRandomValues(
          new Uint8Array(this.memory.buffer).subarray(buf, buf + buf_len)
        );
      }
    }
  };
}
