{ status: true,
  value: 
   [ 'KW_If(1, 1, 3)',
     'WH(" ",1, 3, 4)',
     [ 'Var("x",1, 4, 5)', 'Op("Eq",1, 5, 9)', 'Num("100",1, 9, 12)' ],
     'WH("",1, 13, 13)',
     'KW_Then(1, 13, 17)',
     'WH(" ",1, 17, 18)',
     [ 'Var("x",1, 18, 19)',
       'WH(" ",1, 19, 20)',
       'Assignment(":=",1, 20, 22)',
       'WH(" ",1, 22, 23)',
       [ 'Var("x",1, 23, 24)',
         'Op("Plus",1, 24, 27)',
         'Num("1",1, 27, 28)' ] ],
     'WH("",1, 29, 29)',
     'KW_Else(1, 29, 33)',
     'WH(" ",1, 33, 34)',
     [ 'Var("x",1, 34, 35)',
       'WH(" ",1, 35, 36)',
       'Assignment(":=",1, 36, 38)',
       'WH(" ",1, 38, 39)',
       [ 'Var("x",1, 39, 40)',
         'Op("Minus",1, 40, 43)',
         'Num("1",1, 43, 44)' ] ],
     'WH("",1, 45, 45)',
     'KW_Fi(1, 45, 47)' ] }

Pretty Printer:

if x == 100 then 
  x := x + 1 
else 
  x := x - 1 
fi 
