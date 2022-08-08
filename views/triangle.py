n = 17
m = n
for i in range(n,0,-1):
    print(n * " ",end=" ")
    if i != m:
        for j in range(1,i+1):
            if j == 1 or j == i:
                print("#",end=' ')
            else:
                print(" ",end=" ")
    else:
        for j in range(1,i+1):
            print("#",end=' ')
    n+=1
    print()


# for k in range(n-1,0,-1):
#     for l in range(1,k+1):
#         print(l, end=' ')
#     print()