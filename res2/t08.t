{ status: true,
  value: 
   [ [ 'KW_Read(1, 1, 5)', 'Var("n",1, 6, 7)' ],
     'Colon(1, 7, 8)',
     [ [ 'KW_If(2, 1, 3)',
         [ 'Var("n",2, 4, 5)', 'Op("Leq",2, 5, 9)', 'Num("0",2, 9, 10)' ],
         'KW_Then(3, 1, 5)',
         [ 'KW_Skip(3, 6, 10)' ],
         'KW_Else(4, 1, 5)',
         [ [ 'Var("res",5, 3, 6)',
             'Assignment(":=",5, 7, 9)',
             'Num("1",5, 10, 11)' ],
           'Colon(5, 11, 12)',
           [ [ 'Var("i",6, 3, 4)',
               'Assignment(":=",6, 5, 7)',
               'Num("1",6, 8, 9)' ],
             'Colon(6, 9, 10)',
             [ [ 'KW_While(7, 3, 8)',
                 [ 'Var("i",7, 9, 10)',
                   'Op("Leq",7, 10, 14)',
                   'Var("n",7, 14, 15)' ],
                 'KW_Do(7, 16, 18)',
                 [ [ 'Var("res",8, 5, 8)',
                     'Assignment(":=",8, 9, 11)',
                     [ 'Var("res",8, 12, 15)',
                       'Op("Multi",8, 15, 18)',
                       'Var("i",8, 18, 19)' ] ],
                   'Colon(8, 19, 20)',
                   [ [ 'Var("i",9, 5, 6)',
                       'Assignment(":=",9, 7, 9)',
                       [ 'Var("i",9, 10, 11)',
                         'Op("Plus",9, 11, 14)',
                         'Num("1",9, 14, 15)' ] ] ] ],
                 'Colon(9, 15, 16)',
                 'KW_Od(10, 3, 5)' ] ] ] ],
         'KW_Fi(11, 1, 3)' ],
       'Colon(11, 3, 4)',
       [ [ 'KW_Write(12, 1, 6)', 'Var("res",12, 7, 10)' ] ] ] ] }

Pretty Printer:

read n;
if n <= 0 then 
  skip 
else
  res := 1;
  i := 1;
  while i <= n do 
    res := res * i;
    i := i + 1;    
  od
fi;
write res 
