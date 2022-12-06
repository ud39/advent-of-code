import string

with open('input_03.txt', 'r') as f:
    lines = [line.rstrip() for line in f]

lowercase_map = {}
for index, lowercase in enumerate(list(string.ascii_lowercase)):
    lowercase_map.update({lowercase:index+1}) 

uppercase_map = {}
for index, uppercase in enumerate(list(string.ascii_uppercase)):
    uppercase_map.update({uppercase:index+27}) 

sum_of_double_items = 0
for item in lines:
    
    first_half, second_half = item[:len(item)//2], item[len(item)//2:]
    double_item = set(first_half).intersection(second_half).pop()

    if double_item in lowercase_map:
        sum_of_double_items += lowercase_map[double_item]

    if double_item in uppercase_map:
        sum_of_double_items += uppercase_map[double_item]



print(sum_of_double_items)

sum_of_double_items = 0
for group in range(0, len(lines), 3):
    first, second, third = set(lines[group]), set(lines[group+1]), set(lines[group+2])
    badge = set.intersection(first, second, third).pop()

    if badge in lowercase_map:
        sum_of_double_items += lowercase_map[badge]

    if badge in uppercase_map:
        sum_of_double_items += uppercase_map[badge]
        


print(sum_of_double_items)

    
