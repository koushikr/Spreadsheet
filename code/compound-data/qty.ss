;; This code example shows how elementary (nonmutable) data
;; types can be defined using lists.  This is *not* the
;; preferred way of doing datatypes in Scheme.  Our goal is
;; to illustrate datatypes using stuff we already know and
;; building all things we want in the process.  (We don't
;; use define-struct for this reason.)


;; This lecture is about defining your own data types.  The
;; datatype that you define could be a compound datatype,
;; which means that it could consist of components which
;; come from other datatypes.

;; Defining a new datatype means that you need to provide
;; definitions for the following

;; * type predicate :  how to identify an element of that datatype

;; * constructor function: how to build an element of that dataype

;; * accessor function: how to access components of a compound dataype

;; * equality predicate:

;; * operations 



;; From numbers to physical quantities
;; -----------------------------------


;;; ---------------------------------------
;;; ---------------------------------------

;; In the real world, computations like
;; area, perimeter, etc. work on
;; physical quantities.  Physical
;; quanties have units.  Units combine a
;; unit-system (like the metric MKS or
;; the FPS or the CGS) with dimensions.


;; Dimensions
;; ==========

;; A dimension is a triple with exponent
;; values for length, mass and time.  We
;; represent a dimension as a list of 4
;; elements.  The first element is a
;; tag, which identifies that the data
;; is a dimension.  The next three
;; elements are numbers, identifying the
;; numerical dimensions of length, mass
;; and time, respectively.

;; Examples
;; (<tag> <l> <m> <t>)
;; (dim 1 0 0) represents length
;; (dim 0 1 0) represents mass
;; (dim 0 0 1) represents time

;;  (dim 2 0 0) represents ___?____

;;  (dim 1 0 -1) represents __?___

;;  (dim 3 0 0) represents ___? __

;;  (dim  -3 1 0) represents ___?____


;; Type Predicate
;; ---------------
;; dim? : any -> boolean?

(define dim?
  (lambda (u)
    (and
      (list? u)
      (= (length u) 4)
      (eq? (list-ref u 0) 'dim)
      (number? (list-ref u 1))     ;; length
      (number? (list-ref u 2))     ;; mass
      (number? (list-ref u 3)))))  ;; time


;; Constructor
;; ------------
;; make-dim: [number?  number? number?] -> dim?
;; --------------------------------------------

(define make-dim
  (lambda (l m t)
    (list 'dim l m t)))

;; (dim? (make-dim 1 2 3)) => #t

;; Projectors
;; ----------

;; dim-length: dim? -> number?
;; ----------------------------

(define dim-length
  (lambda (dim)
    (list-ref dim 1)))


;; dim-mass: dim? -> number?
;; -------------------------
(define dim-mass
  (lambda (dim)
    (list-ref dim 2)))

;; dim-time: dim? -> number?
;; -------------------------
(define dim-time
  (lambda (dim)
    (list-ref dim 3)))



;; test
; (dim? (make-dim x y z)) => #t
; (dim-length (make-dim x y z)) = x
; (dim-mass (make-dim x y z)) = y
; (dim-time (make-dim x y z)) = z
; (number? (dim-time (make-dim x y z))) => #t
; (dim-equal? (make-dim x y z) (make-dim x y z)) => #t




;; Equality Predicate
;; ------------------

;; dim-equal? : [dim? dim?] -> bool

(define dim-equal?
  (lambda (d1 d2)
    (and
      (= (dim-length d1) (dim-length d2))
      (= (dim-mass d1) (dim-mass d2))
      (= (dim-time d1) (dim-time d2)))))

;; Fundamental dimensions
;; ----------------------

(define *length*         (make-dim 1 0 0))
(define *mass*           (make-dim 0 1 0))
(define *time*           (make-dim 0 0 1))


;; Predicates to identify fundamental dimensions
;; ---------------------------------------------

;; dim-length? : dim? -> bool
;; --------------------------
(define dim-length?
  (lambda (u)
    (dim-equal? u *length*)))

;; dim-mass? : dim? -> bool
;; ------------------------
(define dim-mass?
  (lambda (u)
    (dim-equal? u *mass*)))

;; dim-time? : dim? -> bool
;; ------------------------
(define dim-time?
  (lambda (u)
    (dim-equal? u *time*)))

;; Algebra on dimensions
;; ---------------------

;; dim-multiply : [dim? dim?] -> dim?

(define dim-multiply
  (lambda (d1 d2)
    (make-dim
      (+ (dim-length d1) (dim-length d2))
      (+ (dim-mass d1) (dim-mass d2))
      (+ (dim-time d1) (dim-time d2)))))

;; dim-divide : [dim? dim?] -> dim?

(define dim-divide
  (lambda (d1 d2)
    (make-dim
      (- (dim-length d1) (dim-length d2))
      (- (dim-mass d1) (dim-mass d2))
      (- (dim-time d1) (dim-time d2)))))

;; Some derived dimensions of importance
;; -------------------------------------

(define *distance* *length*)
(define *area* (dim-multiply *length* *length*))
(define *volume* (dim-multiply *area* *length*))
(define *speed* (dim-divide *length* *time*))
(define *acceleration*
  (dim-divide *speed* *time*))

(define *density* (dim-divide *mass* *volume*))

(define *force*
  (dim-multiply *mass* *acceleration*))

(define *pressure*
  (dim-divide *force* *area*))

(define *work*
  (dim-multiply *force* *distance*))

(define *energy* *work*)

(define *power*
  (dim-divide *work* *time*))


;; Dimensionless
;; -------------
(define *dimensionless* (make-dim 0 0 0))

;; Predicates identifying useful dimensions
;; ----------------------------------------

;; dim-area? : dim? -> bool
;; ------------------------

(define dim-area?
  (lambda (u)
    (dim-equal? u *area*)))


(define dim-dimensionless?
  (lambda (u)
    (dim-equal? u *dimensionless*)))

;;; -----------------------------------------

;;; Unit systems
;;; ============

;;; Unit systems are standards for the units in which
;;; physical quantities are measured.  Three well known
;;; standards are MKS: (also called SI Standard
;;; Internationale): metre, kilogram, second, CGS:
;;; centimetre, gram, second and FPS: foot, pound, second:

;;; We represent a unit system by a tuple with a symbol,
;;; which is one of mks, cgs, or fps.


;; Type Predicate
;; --------------
;; unit? : any -> boolean?

(define unit?
  (lambda (u)
    (or
      (eq? u 'mks)
      (eq? u 'cgs)
      (eq? u 'fps))))
      

;;; ----------------------
;;; ----------------------

;; Quantity
;; ========

;; A quantity (qty) consists of a magnitude, a unit-system
;; and a dimension.

;; E.g.,

;; (qty <number> <unit-system> <dim>)

;; Type predicate
;; --------------

;; qty? : any -> boolean?

(define qty?
  (lambda (thing)
    (and
      (list? thing)
      (= (length thing) 4)
      (eq? (list-ref thing 0) 'qty)
      (number? (list-ref thing 1))
      (unit? (list-ref thing 2))
      (dim? (list-ref thing 3)))))

;; Constructor
;; -----------

;; make-qty : [number? unit? dim?] -> qty?

(define make-qty
  (lambda (mag unit dim)
    (list 'qty mag unit dim)))

;; (make-qty 3.0 'mks (make-dim 1 0 0))


;; Accessors
;; ---------

;; qty-mag  : qty? -> number?
;; --------------------------

(define qty-mag
  (lambda (qty)
    (list-ref qty 1)))

;; qty-unit : qty? -> unit?
;; ------------------------

(define qty-unit
  (lambda (qty)
    (list-ref qty 2)))

;; qty-dim : qty? -> dim?
;; -----------------------

(define qty-dim
  (lambda (qty)
    (list-ref qty 3)))


;; Some useful MKS quantities
;; ---------------------------

;; metre: number? -> qty?
(define metre
  (lambda (v)
    (make-qty v 'mks *length*)))

(define meter metre)

(define kilogram
  (lambda (v)
    (make-qty v 'mks *mass*)))

(define kg kilogram)

(define second
  (lambda (v)
    (make-qty v 'mks *time*)))

(define sec second)


;; Some quantities in MKS
;; =======================
(define speed-of-light
  (make-qty (* 3 (expt 10 8)) 'mks *speed*))

(define gravity
  (make-qty 9.8 'mks *acceleration*))


;; Magnitudes
;; ----------

(define pi 3.14159)


;; Qty algebra
;; ============

;; Two quantities are (mutually) scalable, or convertible if
;; their dimensions are identical.

;; Eg., the quantities one pound and one
;; kilogram are convertible (the scaling
;; factor from pound to kilogram is
;; roughly 1 pound = 0.454 kilograms.

;; Two quantities are ADDABLE if they
;; are scalable and if their units are
;; identical.  Eg., 1 kilo and 1 gram
;; are scalable, but not addable.

;; qtys-scalable? : [qty? qty?] -> bool
;; ---------------------------------------

(define qtys-scalable?
  (lambda (q1 q2)
    (dim-equal? (qty-dim q1) (qty-dim q2))))

;; (qtys-scalable? (meter 3) (meter 2)) => #t
;; (qtys-scalable? (meter 3) (foot 2)) => #t

;; To do binary operations on
;; quantities, we require that their
;; units be the same.  This is usually
;; not a problem, because there are
;; standard numerical factors to convert
;; one unit system into another.

;; Eg. 1 metre = 3.281 feet
;;     1 kilo  = 2.205 pounds
;;     1 kg    = 1000 grams, etc.

;; qtys-unit=? : [qty? qty?] -> bool

(define qtys-unit=?
  (lambda (q1 q2)
    (eq? (qty-unit q1) (qty-unit q2))))


;; qtys-addable? : [qty? qty?] -> bool
;; ----------------------------------
(define qtys-addable?
  (lambda (q1 q2)
    (and
      (qtys-scalable? q1 q2)
      (qtys-unit=? q1 q2))))

;; qty-add : [qty? qty?]   -> qty?
;; qty-add : qtys-addable? -> qty?
;; ------------------------------
(define qty-add
  (lambda (q1 q2)
    (make-qty
      (+ (qty-mag q1) (qty-mag q2))
      (qty-unit q1)
      (qty-dim q1))))

;; qtys-multipliable? : [qty? qty?] -> boolean?
;; ----------------------------------------
(define qtys-multipliable?
  (lambda (q1 q2)
    (qtys-unit=? q1 q2)))


;; qty-multiply : qtys-multipliable? -> qty?
;; ----------------------------------------
(define qty-multiply
  (lambda (q1 q2)
    (make-qty
      (* (qty-mag q1) (qty-mag q2))
      (qty-unit q1)
      (dim-multiply (qty-dim q1) (qty-dim q2)))))

;; qty-square : qty? -> qty?
;; ------------------------
(define qty-square
  (lambda (q)
    (qty-multiply q q)))


;; qty-length? : qty? -> bool
;; --------------------------
(define qty-length?
  (lambda (qty)
    (dim-length? (qty-dim qty))))


;; qty-area? : qty? -> bool
;; --------------------------
(define qty-area?
  (lambda (qty)
    (dim-area? (qty-dim qty))))

;; Dimensionless quantities
;; ------------------------

(define unit?
  (lambda (u)
    (or
      (eq? u 'mks)
      (eq? u 'cgs)
      (eq? u 'fps)
      (eq? '_))))

(define unit-any?
  (lambda (u)
    (eq? u '_)))

(define make-dimensionless-qty
  (lambda (mag)
    (make-qty mag '_ *dimensionless*)))

;; [unit? unit?] -> bool?
;; -------------------
(define units-compatible?
  (lambda (u1 u2)
    (or
      (unit-any? u1)
      (unit-any? u2)
      (unit-equal? u1 u2))))


;; units-multiply : units-compatible? -> unit?
;; -------------------------------------------
(define units-multiply
  (lambda (u1 u2)
    (cond
      [(unit-any? u1) u2]
      [(unit-any? u2) u1]
      [else u1])))
      


;; qtys-multipliable? : [qty? qty?] -> bool
;; ----------------------------------------

(define qtys-multipliable?
  (lambda (q1 q2)
    (units-compatible?
      (qty-unit q1) (qty-unit q2))))


;; qty-multiply : qtys-multipliable? -> qty
;; ----------------------------------------

(define qty-multiply
  (lambda (q1 q2)
    (make-qty
      (* (qty-mag q1) (qty-mag q2))
      (units-multiply
        (qty-unit q1) (qty-unit q2))
      (dim-multiply
        (qty-dim q1) (qty-dim q2)))))


(define *pi-qty*
  (make-dimensionless-qty 3.14159))

;; circle-area: qty-length? -> qty-area?
;; -------------------------------------
(define circle-area
  (lambda (radius)  ;; radius is a quantity
    (qty-multiply
      *pi-qty*
      (qty-square radius))))
      

;; Light Year
;; ----------

;; seconds-in-year : 

(define seconds-in-year
  (sec
    (*
      60 ;; seconds/min
      60 ;; min/hr
      24 ;; hr/day
      365))) ;; days/year

;; light-year : 
(define light-year
  (qty-multiply
    speed-of-light
    seconds-in-year))


