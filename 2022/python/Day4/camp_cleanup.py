with open('input_04.txt', 'r') as f:
    pairs = [line.rstrip().split(',') for line in f]
    


# Part one
sum_of_overlaps = 0

for pair in pairs:
    first, second = pair[0], pair[1]
    begin_first, end_first, begin_second, end_second = int(first.split('-')[0]), int(first.split('-')[1]), int(second.split('-')[0]), int(second.split('-')[1])

    if begin_first <= begin_second and end_first >= end_second or begin_second <= begin_first and end_second >= end_first: 
        sum_of_overlaps +=1



print(sum_of_overlaps)



# Part two
sum_of_overlaps = 0

for pair in pairs:
    first, second = pair[0], pair[1]
    begin_first, end_first, begin_second, end_second = int(first.split('-')[0]), int(first.split('-')[1]), int(second.split('-')[0]), int(second.split('-')[1])

    if begin_first <= begin_second and end_first >= begin_second or begin_second <= begin_first and end_second >= begin_first: 
        sum_of_overlaps += 1


print(sum_of_overlaps)

