import re

with open('../input_07.txt', 'r') as f:
    commands_executions = [line.rstrip() for line in f]

current_location = []
dirs = {}
current_line = 0


def get_sizes(ls_of_files : list[str]):
    sizes = [] 
    for cmd in ls_of_files:
        if "$" in cmd:
            return sizes
        if cmd[0] != 'd':
            sizes.append(int(cmd.split(' ')[0]))

    return sizes


def sum_of_files(dirs):
    return sum(filter(lambda v: v <= 100000, dirs.values()))


while current_line < len(commands_executions):
    cmd_exc = commands_executions[current_line]

    if cmd_exc[0] == "$" and 'c' in cmd_exc and '.' not in cmd_exc:
        current_location.append("".join(current_location) + cmd_exc.split(' ')[-1])
        if current_location[-1] not in dirs:
            dirs.update({current_location[-1]: 0})
        current_line += 1 
        continue

    if cmd_exc[0] == "$" and 'ls' in cmd_exc:
        content = get_sizes(commands_executions[current_line+1:]) 
        for loc in current_location:
            for cont in content:
                dirs[loc] = dirs[loc] + cont
        current_line += 1
        continue

    if cmd_exc[0] == "$" and 'c' in cmd_exc and '.' in cmd_exc:
        del current_location[-1]
        current_line += 1 
        continue


    current_line += 1

# Part one
print(sum_of_files(dirs=dirs))

# Part two
unused_space = 70000000 - max(dirs.values())
sorted_sizes = sorted(dirs.items(), key=lambda x:x[1])
smallest_dir = 0
for sizes in sorted_sizes:
    if unused_space + int(sizes[1]) > 30000000:
        smallest_dir = sizes[1]
        break


print(unused_space)
print(smallest_dir)




