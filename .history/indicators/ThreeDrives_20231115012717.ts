#McDon030 4 / 23 / 2020
#Larry Pes added tolerance for choppy markets - default is .04 and no more than .07 for choppy markets.Additions && notes are:
## order should be XAB, ABC, BCD, XAD and ABCD
## 3drives
def hf0 = 1.130 - tol;  ##XAB1
def hf1 = 1.618 + tol;  ##XAB2
def hf2 = 0.500 - tol;  ##ABC1
def hf3 = 0.786 + tol;  ##ABC2
def hf4 = 1.000;      ##ABCD1   #note: should be a second ABCD in PRZ as this is ABCD1 and ABCD2 == 1.27
def hf5 = 1.270 - tol;  ##XAD1
def hf6 = 2.618 + tol;  ##XAD2
def hf7 = 1.130 - tol;  ##BCD1
def hf8 = 1.618 + tol; ##BCD2


## Cypher
def hf0 = 0.382 - tol;  ##XAB1
def hf1 = 0.618 + tol;  ##XAB2
def hf2 = 1.130 - tol;  ##ABC1
def hf3 = 1.414 + tol;  ##ABC2
def hf4 = 1.000;      ##ABCD1   #note: should be a second ABCD in PRZ as this is ABCD1 and ABCD2 == 1.27
def hf5 = 0.786 - tol;  ##XAD1
def hf6 = 0.786 + tol;  ##XAD2
def hf7 = 1.272 - tol;  ##BCD1
def hf8 = 2.000 + tol; ##BCD2