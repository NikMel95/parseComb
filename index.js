var P = require('parsimmon')
var fs = require('fs')
var path = require('path')
const util = require('util')



var OPERATORMAP = [
  
  {type: pref, ops: parseOperatorsExp({Negative: '-'})},
  {type: left, ops: parseOperatorsExp({Assignment: ':='})},
  {type: left, ops: parseOperatorsExp({Eq: '=='})},
  {type: left, ops: parseOperatorsExp({Uneq: '!='})},
  {type: left, ops: parseOperatorsExp({Leq: '<='})},
  {type: left, ops: parseOperatorsExp({Greq: '>='})},
  {type: left, ops: parseOperatorsExp({Multi: '*'})},
  {type: left, ops: parseOperatorsExp({Div: '/'})},
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
let Comment = (obj) => {
  
  return `Comment("${obj.value}",${obj.start.line}, ${obj.start.column}, ${obj.end.column})`
}
//.mark().map((obj) => Bracket(obj))
let pIf = P.string('if').mark().map((obj) => keywordLex(obj))

let pFi = P.string('fi').mark().map((obj) => keywordLex(obj))
let pThen = P.string('then').mark().map((obj) => keywordLex(obj))
let pElse = P.string('else').mark().map((obj) => keywordLex(obj))
let pSkip = P.string('skip').mark().map((obj) => keywordLex(obj)).skip(P.optWhitespace)
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


let whitespace = P.regexp(/\s*/)
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

    return P.seq(pLB,parseJoinedExp,pRB)
      .or(VarOrNum);
  });


var OPERATORMAP_Parser =
  OPERATORMAP.reduce(function(a, l) {
    return l.type(l.ops, a);
  }, parseExp);

//end parse exp
let parseJoinedExp = whpspace(OPERATORMAP_Parser);

 
   

//let pComments = P.seq(P.string("(*").skip(whitespace),P.regexp(/.*/).skip(whitespace),P.string("*)")).mark().map((obj) => Comment(obj))
let pComments = P.regexp(/\(\*\s(.*)\s\*\)/m).skip(whitespace).mark().map((obj) => Comment(obj))

let parseRead = P.seq(pRead.skip(whitespace), indentifier)
let parseWrite = P.seq(pWrite.skip(whitespace), parseJoinedExp)
let parseDoWhile = P.lazy(() => {
  return P.seq(pWhile.skip(whitespace), parseJoinedExp.skip(whitespace), pDo.skip(whitespace), parseAll.skip(
    whitespace), pOd)
})
//parse If Then
let parseIfThen = P.lazy(() => {
  return P.seq(pIf,whitespace,parseJoinedExp.skip(whitespace), pThen.skip(whitespace),parseAll, whitespace,pFi)
})
//parse If Then Else
let parseIfThenElse = P.lazy(() => {
  return P.seq(pIf.skip(whitespace),parseJoinedExp.skip(whitespace), pThen.skip(whitespace),parseAll, whitespace,pElse.skip(whitespace),parseAll.skip(whitespace),pFi)
})
//parse If Then Else Together
let parseIfThenElseTogether = P.lazy(() => {
  return P.alt(parseIfThenElse)
})
let parseAssignment = P.seq(indentifier.skip(whitespace),pAssignment.skip(whitespace), parseJoinedExp)
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
      P.seq(pComments.skip(whitespace),parseAll),
      P.seq(parseStatement, pColon.skip(whitespace), parseAll),
      P.seq(parseStatement.skip(whitespace))

    )
})

let mainParse = P.lazy(() => {
  return parseAll
})

let source = path.resolve(__dirname, process.argv[2])
let result = mainParse.parse(fs.readFileSync(source, 'utf8'))
let rs = util.inspect(result, {depth: null, colors: 'auto'});
let rs1 = util.inspect(result,{depth:null});
console.log(rs1)


const OPERATORMAP1 = {
  'Plus':'+' ,
  'Minus':'-' ,
  'Multi':'*' ,
  'Div':'/' ,
  'Mod':'%',
  'Eq':'==',
  'Uneq':'!=' ,
  'Gr':'>' ,
  'Greq':'>=',
  'Less':'<',
  'Leq':'<=' ,
  'And':'&&' ,
  'Or':'||',
  'Negative':'-'
}




var s = rs1.split("value:")[1];

s = s.replace(/}/g,"")
s = s.replace(/"/g,'\\"')
s = s.replace(/'/g,"\"")



let code = JSON.parse(s);
var res = "";
var arr_pp = [];

function getCode(json_arr) {
  
  for(c in json_arr) {
      
      if (json_arr[c] instanceof Object) {

          getCode(json_arr[c]);
          continue;
      }
     
     
     var s = keyWord(json_arr[c]);
     if(s!=''){
        arr_pp.push(s);
        
     }
     

  }
  
}

function keyWord(c){
  if(c.search(/KW_Fi/i) == 0){
    return 'fi';
  }
  else if(c.search(/KW_If/i) == 0){
    return 'if';
  }
  else if(c.search(/KW_Do/i) == 0){
    return 'do';
  }
  else if(c.search(/KW_Od/i) == 0){
    return 'od';
  }
  else if(c.search(/KW_Then/i) == 0){
    return 'then';
  }
  else if(c.search(/KW_Else/i) == 0){
    return 'else';
  }
  else if(c.search(/KW_While/i) == 0){
    return 'while';
  }
  else if(c.search(/KW_Read/i) == 0){
    return 'read';
  }
  else if(c.search(/KW_Write/i) == 0){
    return 'write';
  }
  else if(c.search(/KW_Skip/i) == 0){
    return 'skip';
  }
  else if(c.search(/Colon/i) == 0){
    return ';';
  }
  else if(c.search(/Assignment/i) == 0){
    return ':=';
  }
  else if(c.search(/Var/i) == 0 || c.search(/Num/i) == 0){
    var von = c.split("(")[1].split(",")[0]
    von = von.replace(/"/g,'')
    return von;
  }
  else if(c.search(/Bracket/i) == 0){
    
    var n = c.split('"');
    
    return n[1];
  }
  else if(c.search(/Op/i) == 0){
    var von = c.split("(")[1].split(",")[0]
    von = von.replace(/"/g,'')
    return OPERATORMAP1[von];
  }
   else if(c.search(/Comment/i) == 0){
    var von = c.split("(\"")[1].split('"')[0]
    return von;
  }
  else{
    return '';
  }
  
}

function Ntab(c){
  var s = "";
  for(var i = 0;i<c;i++){
    s += " ";
  }
  return s;
}
var one_check = false;
function Pretty_Printer(arr){
  var l = arr.length;
  var level = 0;
  for (var i = 0;i < l;i++){
    
    if(arr[i] == "then" || arr[i] == "do"){
      res += arr[i] + " ";  
      level++;
      res += "\n" + Ntab(level*2);
    }
    else if(arr[i] == "fi" || arr[i] == "od"  || arr[i] == "else"){
      res += "\n";
      
      level--;
      res +=  Ntab(level*2) + arr[i] + " ";
      if(arr[i] == "else"){
        
        level ++;
        res += "\n" + Ntab(level*2);
      }
    }
    else if(arr[i] == "if"){
      res +=  arr[i] + " ";
    }
    else if(arr[i] == ";"){
      res += arr[i] + "\n" + Ntab(level*2);

    }
    else if(arr[i] == "("){
      res += arr[i]

    }else{

      
      if(arr[i+1] == ";"){
        res += arr[i];
      } 
      else if(arr[i+1] == ")"){
        res += arr[i];
      } else{
        res +=  arr[i] + " ";
      }       
    } 
  }
}
if(process.argv[3] == "-p"){
  getCode(code);
  
  
  Pretty_Printer(arr_pp);
  console.log("\nPretty Printer:\n");
  console.log(res); 
}




