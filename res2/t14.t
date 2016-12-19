{ status: true,
  value: 
   [ [ 'KW_If(1, 1, 3)',
       'Var("x",1, 4, 5)',
       'KW_Then(1, 6, 10)',
       [ 'KW_Skip(1, 11, 15)',
         'Colon(1, 15, 16)',
         [ [ 'Var("x",2, 1, 2)',
             'Assignment(":=",2, 2, 4)',
             'Num("1",2, 4, 5)' ],
           'Colon(2, 5, 6)',
           [ [ 'KW_Read(3, 1, 5)', 'Var("y",3, 6, 7)' ],
             'Colon(3, 7, 8)',
             [ [ 'KW_Write(4, 1, 6)',
                 [ 'Var("y",4, 7, 8)',
                   'Op("Multi",4, 8, 11)',
                   [ 'Bracket("(",4, 11, 12)',
                     [ 'Num("1",4, 12, 13)',
                       'Op("Or",4, 13, 17)',
                       'Var("z",4, 17, 18)' ],
                     'Bracket(")",4, 18, 19)' ] ] ] ] ] ] ],
       'Colon(4, 19, 20)',
       'KW_Else(6, 1, 5)',
       [ 'KW_Skip(6, 6, 10)',
         'Colon(6, 10, 11)',
         [ 'KW_Skip(6, 12, 16)',
           'Colon(6, 16, 17)',
           [ 'KW_Skip(6, 18, 22)' ] ] ],
       'KW_Fi(7, 1, 3)' ] ] }

Pretty Printer:

if x then 
  skip;
  x := 1;
  read y;
  write y * (1 || z);  
else
  skip;
  skip;
  skip 
fi
