n = 10
for i in range(1,n,2):
    print(n*" ",end=" ")
    for j in range(1,i+1):
        print(j,end=" ")
    for k in range(i+3,1,-2):
        print(k,end=" ")
    print()

#       1
#   1   3   1
# 1  3   5   3  1

    