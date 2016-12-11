var P = require('parsimmon')
var fs = require('fs')
var path = require('path')
const util = require('util')


let source = path.resolve(__dirname, process.argv[2]);
let s = fs.readFileSync(source, 'utf-8')


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
        arr_pp.push(s)
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
getCode(code);
Pretty_Printer(arr_pp);
console.log("Pretty Printer:\n");
console.log(res);
