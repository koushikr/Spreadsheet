(require (planet schematics/schemeunit:3)
  (planet schematics/schemeunit:3/text-ui))


(load "qty.ss")


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
    (< (abs (- v1 v2))) epsilon))


(define circle-area-tests
  (test-suite
    "testing circle-area?"
    (check eq? (non-negative? 3) #t "test-1")
    (check eq? (non-negative? -2) #f "test-2")
    (check eq? (non-negative? "hello") #f "test-3")))




    

  
