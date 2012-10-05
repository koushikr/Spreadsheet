;; circle-area

;; Problem statement
;; ------------------

;; circle-area takes a number which
;; denotes the radius and returns a
;; number that denotes the area of the
;; circle with that radius.

;; Examples
;; --------

;; (circle-area 0) => 0
;; (circle-area 1) => 3.14  (approx.)


;; Signature
;; ---------
;; circle-area : non-negative? -> non-negative?

(define circle-area
  (lambda (r)
    (* pi r r)))


;; non-negative? as a type
;; =======================


;; Signature
;; ----------
;; non-negative : any -> boolean?


(define non-negative?
  (lambda (v)
    (and (number? v)
      (>= v 0))))


