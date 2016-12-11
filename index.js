var P = require('parsimmon')
var fs = require('fs')
var path = require('path')
const util = require('util')



var OPERATORMAP = [
  
  {type: pref, ops: parseOperatorsExp({Negative: '-'})},

  {type: left, ops: parseOperatorsExp({Eq: '=='})},
  {type: left, ops: parseOperatorsExp({Uneq: '!='})},
  {type: left, ops: parseOperatorsExp({Leq: '<='})},
  {type: left, ops: parseOperatorsExp({Greq: '>='})},
  {type: left, ops: parseOperatorsExp({Multi: '*'})},
  {type: left, ops: parseOperatorsExp({Divide: '/'})},
  {type: left, ops: parseOperatorsExp({Plus: '+'})},
  {type: left, ops: parseOperatorsExp({Minus: '-'})},
  {type: left, ops: parseOperatorsExp({And: '&&'})},
  {type: left, ops: parseOperatorsExp({Or: '||'})},
  {type: left, ops: parseOperatorsExp({Mod: '%'})},
    {type: left, ops: parseOperatorsExp({Less: '<'})},
  {type: left, ops: parseOperatorsExp({Gr: '>'})},
];

function whpspace(parserJe) {
  return P.optWhitespace.then(parserJe).skip(P.optWhitespace);
}

function parseOperatorsExp(ops) {

  var keys = Object.keys(ops).sort();
  var ps = keys.map(function(k) {
    return whpspace(P.string(ops[k])).result(k);
  });

  return P.alt.apply(null, ps).mark().map((obj) => Op(obj));
}

String.prototype.capitalize = function() {
  return this.charAt(0).toUpperCase() + this.slice(1);
}

let keywordLex = (obj) => {
  return `KW_${obj.value.capitalize()}(${obj.start.line}, ${obj.start.column}, ${obj.end.column})`
}

let lColon = (obj) => {
  return `Colon(${obj.start.line}, ${obj.start.column}, ${obj.end.column})`
}
let Num = (obj) => {
  return `Num("${obj.value}",${obj.start.line}, ${obj.start.column}, ${obj.end.column})`
}
let Op = (obj) => {
  
  return `Op("${obj.value}",${obj.start.line}, ${obj.start.column}, ${obj.end.column})`
}
let Var = (obj) => {
  return `Var("${obj.value}",${obj.start.line}, ${obj.start.column}, ${obj.end.column})`
}
let Assignment = (obj) => {
  return `Assignment("${obj.value}",${obj.start.line}, ${obj.start.column}, ${obj.end.column})`
}
let Bracket = (obj) => {
  
  return `Bracket("${obj.value}",${obj.start.line}, ${obj.start.column}, ${obj.end.column})`
}
let WH = (obj) => {
  
  return `WH("${obj.value}",${obj.start.line}, ${obj.start.column}, ${obj.end.column})`
}

let pIf = P.string('if').mark().map((obj) => keywordLex(obj))

let pFi = P.string('fi').mark().map((obj) => keywordLex(obj))
let pThen = P.string('then').mark().map((obj) => keywordLex(obj))
let pElse = P.string('else').mark().map((obj) => keywordLex(obj))
let pSkip = P.string('skip').mark().map((obj) => keywordLex(obj))
let pDo = P.string('do').mark().map((obj) => keywordLex(obj))
let pWhile = P.string('while').mark().map((obj) => keywordLex(obj))
let pWrite = P.string('write').mark().map((obj) => keywordLex(obj))
let pOd = P.string('od').mark().map((obj) => keywordLex(obj))
let pRead = P.string('read').mark().map((obj) => keywordLex(obj))
let pColon = P.string(';').mark().map((obj) => lColon(obj))
let pNum = P.digits.mark().map((obj) => Num(obj))
let pAssignment = P.string(':=').mark().map((obj) => Assignment(obj))
let pLB = P.string("(").mark().map((obj) => Bracket(obj))
let pRB = P.string(")").mark().map((obj) => Bracket(obj))

let whitespace = P.regexp(/\s*/m).mark().map((obj) => WH(obj))
let indentifier = P.regexp(/(?!read|write|skip|do|while|if|then|else|fi|od)[a-zA-Z_][a-zA-Z0-9_]*/).desc('identifier').mark().map((obj) => Var(obj))

let VarOrNum = P.alt(indentifier, pNum)

//parse exp()



function pref(op, next) {
  let parser = P.lazy(() => {
    return P.seq(op, parser).or(next);
  });
  return parser;
}



function left(op, next) {

  return P.seqMap(
    next,
    P.seq(op, next).many(),
    function(f, r) {
      return r.reduce(function(acc, ch) {
        var op = ch[0];
        var another = ch[1];
        return [acc,op, another];
      }, f);
    }
  );
}

let parseExp =
  P.lazy(() => {
    return pLB
      .then(parseJoinedExp)
      .skip(pRB)
      .or(VarOrNum);
  });


var OPERATORMAP_Parser =
  OPERATORMAP.reduce(function(a, l) {
    return l.type(l.ops, a);
  }, parseExp);

//end parse exp
let parseJoinedExp = whpspace(OPERATORMAP_Parser);

 
   

let parseRead = P.seq(pRead, whitespace, indentifier)
let parseWrite = P.seq(pWrite, whitespace, parseJoinedExp)
let parseDoWhile = P.lazy(() => {
  return P.seq(pWhile, whitespace, parseJoinedExp, whitespace, pDo, whitespace, parseAll,
    whitespace, pOd)
})
//parse If Then
let parseIfThen = P.lazy(() => {
  return P.seq(pIf,whitespace,parseJoinedExp,whitespace, pThen,whitespace,parseAll, whitespace,pFi)
})
//parse If Then Else
let parseIfThenElse = P.lazy(() => {
  return P.seq(pIf,whitespace,parseJoinedExp,whitespace, pThen,whitespace,parseAll, whitespace,pElse,whitespace,parseAll,whitespace,pFi)
})
//parse If Then Else Together
let parseIfThenElseTogether = P.lazy(() => {
  return P.alt(parseIfThen,parseIfThenElse)
})
let parseAssignment = P.seq(indentifier, whitespace,pAssignment , whitespace, parseJoinedExp)
let parseStatement = P.lazy(() => {
  return P.alt(
      parseIfThenElseTogether,
      pSkip,
      parseRead,
      parseWrite,
      parseDoWhile,
      parseAssignment
    )
})

let parseAll = P.lazy(() => {
  return P.alt(
      P.seq(parseStatement, pColon, whitespace, parseAll),
      parseStatement
    )
})

let mainParse = P.lazy(() => {
  return parseAll
})

let source = path.resolve(__dirname, process.argv[2])
let result = mainParse.parse(fs.readFileSync(source, 'utf-8'))

console.log(util.inspect(result, {depth: null, colors: 'auto'}))




