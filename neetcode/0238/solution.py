from ast import List
from functools import reduce 

class Solution:

        def productExceptSelf(self, nums: list[int]) -> list[int]:
            OFFSET: int = 30
            prodArray: List[int] = [-1] * 61 #instead of using a hashmap, we have such a small range we may as well use a regular array
            uniques: List[int] = []
            result: List[int] = []

            for x in nums:
                prodArray[x + OFFSET] += 1 # only accepts numbers between -30 and 30
            
            #print(prodArray)
            for i in range(0, len(prodArray)):
                if(prodArray[i] > -1):
                    uniques.append(i - OFFSET)
            
            i: int = -OFFSET
            prodBase: int = 1 #lowest a product can be 
            for x in prodArray:
                if(x > 0): #if its zero, sure its there, but it wont contribute to base
                    #print("there are", x, " ", i, "s, product is ", pow(i, x))
                    prodBase *= pow(i, x)
                i += 1

            j: int = 0
            for x in nums:
                # multiply by all the uniques that arent it
                uniquesDiff: List[int] = list(filter(lambda y: y != x, uniques))
                #print(uniquesDiff)
                result.append(prodBase * reduce(lambda a, b: a * b,uniquesDiff))
                j += 1
                

            return result

def __main__():
    print(Solution.productExceptSelf(Solution, [2,2,1]))

__main__()