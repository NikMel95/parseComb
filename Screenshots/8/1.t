{ status: true,
  value: 
   [ [ 'Var("x",1, 1, 2)',
       'WH(" ",1, 2, 3)',
       'Assignment(":=",1, 3, 5)',
       'WH(" ",1, 5, 6)',
       'Num("10000",1, 6, 11)' ],
     'Colon(1, 11, 12)',
     'WH(" ",1, 12, 13)',
     [ [ 'Var("y",1, 13, 14)',
         'WH(" ",1, 14, 15)',
         'Assignment(":=",1, 15, 17)',
         'WH(" ",1, 17, 18)',
         'Num("2",1, 18, 19)' ],
       'Colon(1, 19, 20)',
       'WH(" ",1, 20, 21)',
       [ 'KW_While(1, 21, 26)',
         'WH(" ",1, 26, 27)',
         [ 'Bracket("(",1, 27, 28)',
           [ 'Var("x",1, 28, 29)',
             'Op("Uneq",1, 29, 31)',
             'Num("100",1, 31, 34)' ],
           'Bracket(")",1, 34, 35)' ],
         'WH("",1, 36, 36)',
         'KW_Do(1, 36, 38)',
         'WH(" ",1, 38, 39)',
         [ 'Var("x",1, 39, 40)',
           'WH(" ",1, 40, 41)',
           'Assignment(":=",1, 41, 43)',
           'WH(" ",1, 43, 44)',
           [ 'Var("x",1, 44, 45)',
             'Op("Div",1, 45, 48)',
             'Num("10",1, 48, 50)' ] ],
         'WH("",1, 51, 51)',
         'KW_Od(1, 51, 53)' ] ] ] }

Pretty Printer:

x := 10000;
y := 2;
while (x != 100) do 
  x := x / 10 
od 