{ status: true,
  value: 
   [ 'KW_If(1, 1, 3)',
     'WH("\n",1, 3, 1)',
     [ [ 'Bracket("(",2, 1, 2)',
         [ 'Var("x",2, 2, 3)', 'Op("Plus",2, 3, 6)', 'Num("1",2, 6, 7)' ],
         'Bracket(")",2, 7, 8)' ],
       'Op("Less",2, 8, 10)',
       'Num("2",2, 10, 11)' ],
     'WH("",2, 12, 12)',
     'KW_Then(2, 12, 16)',
     'WH(" ",2, 16, 17)',
     [ 'KW_Write(2, 17, 22)',
       'WH(" ",2, 22, 23)',
       'Var("x",2, 23, 24)' ],
     'WH("",3, 1, 1)',
     'KW_Fi(3, 1, 3)' ] }

Pretty Printer:

if (x + 1) < 2 then 
  write x 
fi 
