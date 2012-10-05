(require (planet schematics/schemeunit:3)
  (planet schematics/schemeunit:3/text-ui))


(load "circle-area.ss")


(define non-negative-tests
  (test-suite
    "testing non-negative?"
    (check eq? (non-negative? 3) #t "test-1")
    (check eq? (non-negative? -2) #f "test-2")
    (check eq? (non-negative? "hello") #f "test-3")))

(run-tests non-negative-tests)

(define epsilon 0.001)

(define epsilon-close?
  (lambda (v1 v2)
    (< (abs (- v1 v2)) epsilon)))


(define circle-area-tests
  (test-suite
    "testing circle-area"
    (check epsilon-close? (circle-area 1.0) pi #t)
    (check epsilon-close? (circle-area 1.0) 10 #f)))




    

  
