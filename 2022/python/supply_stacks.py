import re

with open('input_05.txt', 'r') as f:
    lines = [line.rstrip() for line in f]


# Create stacks
stacks = {}
for i in range(1, 10):
    stacks.update({i:[]})


for line in lines:
    end_of_stacks = line.replace(" ", "")
    if end_of_stacks == "":
        break

    end_of_line = 0
    stack = 1
    while end_of_line < len(line):
        if line[end_of_line] == '[':
            stacks[stack].append(line[end_of_line+1])
            stack += 1
            end_of_line += 4
        else:
            stack += 1
            end_of_line += 4


# Read moves
moves = []
for line in lines:
    if len(line) == 0 or line[0] != 'm': 
        continue

    moves.append(line)
    

for move in moves:
    number_of_stacks, _from, _to = re.findall(r'\d+', move)
    number_of_stacks, _from, _to = int(number_of_stacks), int(_from), int(_to)
    stacks[_to] = stacks[_from][:number_of_stacks] + stacks[_to]
    stacks[_from] = stacks[_from][number_of_stacks:]


print(stacks)
