/** Shared utf8-to-binary encoder. */
const encoder: TextEncoder = new TextEncoder();

/** Unstable WebAssembly System Interface. */
export interface WASI_unstable {
  [key: string]: Function;
}

/** Memory descriptor dictating the wasm instance's memory size. */
export interface MemoryDescriptor {
  initial?: number;
  maximum?: number;
}

/** Init a WASI instance powered by deno and ready to be imported into wasm. */
export function init(
  memory: WebAssembly.Memory = new WebAssembly.Memory({ initial: 1 })
): { wasi_unstable: WASI_unstable } {
  // const ptr_lens: Map<number, number> = new Map<number, number>();
  //
  // const ptrs: number[] = [];
  //
  // let free_ptr: number = 0;
  //
  // /** Allocates a block at the tail of a wasm instance's linear memory. */
  // function malloc(len: number): number {
  //   const ptr: number = free_ptr;
  //
  //   if (free_ptr + len > memory.buffer.byteLength) {
  //     // maybe grow memory
  //     return null;
  //   }
  //
  //   free_ptr += len;
  //
  //   ptrs.push(ptr);
  //
  //     ptr_lens.set(ptr, len);
  //
  //   return ptr;
  // }
  //
  // /** Frees the memory block indicated by the pointer. */
  // function free(ptr: number): void {
  //   const ptr_pos: number = ptrs.indexOf(ptr);
  //
  //   if (ptr_pos === ptrs.length - 1) {
  //     const last_busy_ptr: number = ptrs[ptr_pos - 1]
  //
  //     const last_busy_ptr_len: number = ptr_lens.get(last_busy_ptr);
  //
  //     free_ptr = last_busy_ptr + last_busy_ptr_len;
  //   }
  //
  //    ptrs.splice(ptr_pos, 1);
  //
  //   ptr_lens.delete(ptr);
  // }

  return {
    wasi_unstable: {
      args_get(argv: number, argv_buf: number): void {
        const mem: Uint8Array = new Uint8Array(this.memory.buffer);

        for (const arg of Deno.args) {
          const arg_buf: Uint8Array = encoder.encode(arg);

          mem[argv++] = argv_buf;

          mem.subarray(argv_buf).set(arg_buf);

          argv_buf += arg_buf.byteLength;
        }
      },
      args_sizes_get() {},
      clock_res_get() {},
      clock_time_get() {},
      environ_get() {},
      environ_sizes_get() {},
      fd_advise() {},
      fd_allocate() {},
      fd_close() {},
      fd_datasync() {},
      fd_fdstat_get() {},
      fd_fdstat_set_flags() {},
      fd_fdstat_set_rights() {},
      fd_filestat_get() {},
      fd_filestat_set_size() {},
      fd_filestat_set_times() {},
      fd_pread() {},
      fd_prestat_dir_name() {},
      fd_prestat_get() {},
      fd_pwrite() {},
      fd_read() {},
      fd_readdir() {},
      fd_renumber() {},
      fd_seek() {},
      fd_sync() {},
      fd_tell() {},
      fd_write() {},
      path_create_directory() {},
      path_filestat_get() {},
      path_filestat_set_times() {},
      path_link() {},
      path_open() {},
      path_readlink() {},
      path_remove_directory() {},
      path_rename() {},
      path_symlink() {},
      path_unlink_file() {},
      poll_oneoff() {},
      proc_exit() {},
      random_get(buf: number, buf_len: number): void {
        crypto.getRandomValues(
          new Uint8Array(this.memory.buffer).subarray(buf, buf_len)
        );
      },
      sched_yield() {}
    }
  };
}
