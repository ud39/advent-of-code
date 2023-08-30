
with open('input_10.txt', 'r') as f:
    signals = [line.rstrip() for line in f]


# Part One
def signal_strength(signals):

    initial_value = 1
    current_cycle = 1
    signal_strengths = []
    check_strength = 20

    for sig in signals:

        if 'noop' in sig:

            if current_cycle % check_strength == 0:
                signal_strengths.append(current_cycle * initial_value)
                current_cycle = current_cycle + 1
                check_strength = check_strength + 40
            else:
                current_cycle = current_cycle + 1
                continue

        else:
            for _ in range(0, 2):
                if current_cycle % check_strength == 0:
                    signal_strengths.append(current_cycle * initial_value)
                    current_cycle = current_cycle + 1
                    check_strength = check_strength + 40
                else:
                    current_cycle = current_cycle + 1

            initial_value = initial_value + int(sig.split(' ')[1])

    return signal_strengths


# Part Two
def decode_signal(signals):

    initial_value = 1
    current_cycle = 0
    i = 0
    rows = 6
    amount_of_cycles = 40
    signal_grid = [['' for _ in range(amount_of_cycles)] for _ in range(rows)]

    for sig in signals:

        if 'noop' in sig:
            if abs(current_cycle - initial_value) <= 1:
                signal_grid[i][current_cycle] = '#'
            else:
                signal_grid[i][current_cycle] = '.'

            current_cycle = (current_cycle + 1) % 40
            if current_cycle == 0:
                i = (i + 1) % rows
        else:
            for _ in range(0, 2):
                if abs(current_cycle - initial_value) <= 1:
                    signal_grid[i][current_cycle] = '#'
                else:
                    signal_grid[i][current_cycle] = '.'

                current_cycle = (current_cycle + 1) % 40
                if current_cycle == 0:
                    i = (i + 1) % rows

            initial_value = initial_value + int(sig.split(' ')[1])

    return signal_grid


message = decode_signal(signals)

for row in message:
    print(row)
