with open('input_01.txt', 'r') as f:
    lines = [line.rstrip() for line in f]

number_of_elves = lines.count('') + 1
carry_calories = []
sum_of_snacks = 0
for snack in lines:
    if snack == '':
        carry_calories.append(sum_of_snacks)
        sum_of_snacks = 0
    else:
        sum_of_snacks += int(snack)

carry_calories.sort(reverse=True)
print(sum(carry_calories[:3]))

