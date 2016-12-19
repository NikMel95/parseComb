{ status: true,
  value: 
   [ [ 'KW_Read(1, 1, 5)', 'Var("x",1, 6, 7)' ],
     'Colon(1, 7, 8)',
     [ [ 'KW_If(1, 9, 11)',
         [ 'Var("y",1, 12, 13)',
           'Op("Plus",1, 13, 16)',
           [ 'Num("1",1, 16, 17)',
             'Op("Eq",1, 17, 21)',
             'Var("x",1, 21, 22)' ] ],
         'KW_Then(1, 23, 27)',
         [ [ 'KW_Write(1, 28, 33)', 'Var("y",1, 34, 35)' ] ],
         '',
         'KW_Else(1, 36, 40)',
         [ 'KW_Skip(1, 41, 45)' ],
         'KW_Fi(1, 46, 48)' ] ] ] }

Pretty Printer:

read x;
if y + 1 == x then 
  write y 
else 
  skip 
fi 
