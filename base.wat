(module
  (memory (import "memory"))
  
  (func $wasi_unstable_random_get (import "wasi_unstable.random_get") (param $buf i32) (param $buf_len i32))
 
  (func $equal (param $a i32) (param $b i32) (param $len i32) (result i32)

    (block $end_loop
      (loop $start_loop
        (br_if $end_loop (i32.eqz (get_local $len)))
        
        ;; TODO

        (set_local $len (i32.sub (get_local $len) (i32.const 1)))
        (br $start_loop)
      )
    )
  )
  
  (func $wipe (param $buf i32) (param $len i32)
    ;; TODO
  )
  
  ;; 
)