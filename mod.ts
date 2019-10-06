/** Initializes a WASX crypto kit meant to be an import 4 wasm. */
export function init(
  memory: WebAssembly.Memory = new WebAssembly.Memory({ initial: 1 })
): {
  memory: WebAssembly.Memory;
  wasi_unstable: { random_get(buf: number, buf_len: number): void; };
} {
  return {
    memory,
    wasi_unstable: {
      random_get(buf: number, buf_len: number): void {
        crypto.getRandomValues(
          new Uint8Array(this.memory.buffer).subarray(buf, buf + buf_len)
        );
      }
    }
  };
}
