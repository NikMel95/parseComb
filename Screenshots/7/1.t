{ status: true,
  value: 
   [ [ 'Var("x",1, 1, 2)',
       'WH(" ",1, 2, 3)',
       'Assignment(":=",1, 3, 5)',
       'WH(" ",1, 5, 6)',
       'Num("1",1, 6, 7)' ],
     'Colon(1, 7, 8)',
     'WH(" ",1, 8, 9)',
     [ [ 'Var("y",1, 9, 10)',
         'WH(" ",1, 10, 11)',
         'Assignment(":=",1, 11, 13)',
         'WH(" ",1, 13, 14)',
         'Num("2",1, 14, 15)' ],
       'Colon(1, 15, 16)',
       'WH(" ",1, 16, 17)',
       [ 'KW_While(1, 17, 22)',
         'WH(" ",1, 22, 23)',
         [ [ 'Bracket("(",1, 23, 24)',
             [ 'Var("x",1, 24, 25)',
               'Op("Uneq",1, 25, 29)',
               'Num("100",1, 29, 32)' ],
             'Bracket(")",1, 32, 33)' ],
           'Op("And",1, 33, 37)',
           [ 'Bracket("(",1, 37, 38)',
             [ 'Var("y",1, 38, 39)',
               'Op("Eq",1, 39, 43)',
               'Num("2",1, 43, 44)' ],
             'Bracket(")",1, 44, 45)' ] ],
         'WH("",1, 46, 46)',
         'KW_Do(1, 46, 48)',
         'WH(" ",1, 48, 49)',
         [ 'Var("x",1, 49, 50)',
           'WH(" ",1, 50, 51)',
           'Assignment(":=",1, 51, 53)',
           'WH(" ",1, 53, 54)',
           [ 'Var("x",1, 54, 55)',
             'Op("Plus",1, 55, 58)',
             'Num("1",1, 58, 59)' ] ],
         'WH("",1, 60, 60)',
         'KW_Od(1, 60, 62)' ] ] ] }

Pretty Printer:

x := 1;
y := 2;
while (x != 100) && (y == 2) do 
  x := x + 1 
od 