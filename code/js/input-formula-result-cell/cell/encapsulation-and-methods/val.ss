;; Scheme Implementation of a simple objects using closures
;; ========================================================

;; Object is a list of closures that share the same lexical environment
;; --------------------------------------------------------------------



;; Usage

;; (define c1 (mkC 5))

;; (define c1.get-var (list-ref c1 0))
;; (define c1.get-var (list-ref c1 1))

;; (c1.get-var)  => 5
;; (c1.set-var 3)
;; (c1.get-var) => 3

(define mkC
  (lambda (init-x)   ;; delta
    (let ([x init-x])  ;; epsilon       
      (let ([get-var (lambda ()  ;; gamma
                       x)]   ;; epsilon . delta . G
            [set-var (lambda (v)
                       (set! x v))])      ;; x = v
        (list get-var set-var)))))


;; Alternate implementation, where the object is a closure
;; -------------------------------------------------------

;; Usage:

;; (define c2 (mkC 5))

;; (c2 'get)  => 5
;; (c2 'set 3)
;; (c2 'get) => 3

(define mkC
  (lambda (init-x)   ;; delta
    (let ([x init-x])  ;; epsilon
      (lambda (msg . args)
        (cond
          [(eq? msg 'get) x]
          [(eq? msg 'set)
           (let ([v (car args)])
             (set! x v))]
          [else (error 'mkC "sorry, cannot understand message")])))))



               


