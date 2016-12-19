{ status: true,
  value: 
   [ [ 'KW_If(1, 1, 3)',
       'Num("0",1, 4, 5)',
       'KW_Then(1, 6, 10)',
       [ 'KW_Skip(1, 11, 15)' ],
       'KW_Else(1, 16, 20)',
       [ 'KW_Skip(1, 21, 25)' ],
       'KW_Fi(1, 26, 28)' ] ] }

Pretty Printer:

if 0 then 
  skip 
else 
  skip 
fi 
