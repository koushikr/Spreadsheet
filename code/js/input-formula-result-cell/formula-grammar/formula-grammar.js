// Grammar Specification for Formula Expressions
// =============================================



// ------------------------------------------------------------------------
// Adapted from es3.js written by Chris Double (see copyright notice below)
// ------------------------------------------------------------------------

// Copyright (C) 2007 Chris Double.
// 
// Redistribution and use in source and binary forms, with or without
// modification, are permitted provided that the following conditions are met:
// 
// 1. Redistributions of source code must retain the above copyright notice,
//    this list of conditions and the following disclaimer.
// 
// 2. Redistributions in binary form must reproduce the above copyright notice,
//    this list of conditions and the following disclaimer in the documentation
//    and/or other materials provided with the distribution.
// 
// THIS SOFTWARE IS PROVIDED ``AS IS'' AND ANY EXPRESS OR IMPLIED WARRANTIES,
// INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND
// FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE
// DEVELOPERS AND CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL,
// SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO,
// PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS;
// OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY,
// WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR
// OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF
// ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
//

// Natural Numbers
// ---------------

var DecimalDigit = range("0", "9");
var DecimalDigits = join_action(repeat1(DecimalDigit), "");
var Sign = choice("+", "-");
var IntegerLiteral = action(sequence(optional(Sign), DecimalDigits),
                           function(ast) {
                               var maybeSign = ast[0];
                               var sign = maybeSign ? maybeSign : "";
                               return numExp(parseInt(sign.concat(ast[1])));
                           });

// Identifier
// ----------

var Operator  = action(choice("+", "-", "*", "/"), function(s) {return s;});

var Identifier =  action("x",  function(ast) { return varExp();});

var NumberLiteral   = IntegerLiteral;

var Atomic = choice(Identifier, NumberLiteral);

var Operation = action(wsequence("(", Operator, Atomic, Atomic, ")"),
			   function(ast) {
			       return opExp(ast[1], ast[2], ast[3]);
			   });

var Formula = choice(Atomic, Operation);

// Operator ::= + | - | * | /
// Identifier ::= x
// Atomic ::=     Identifier | NumberLiteral

// Operation ::= (Operator Atomic Atomic)
// Formula ::=   Atomic | Operation
