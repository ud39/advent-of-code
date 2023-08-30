
with open('input_10.txt', 'r') as f:
    signals = [line.rstrip() for line in f]


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


print(sum(signal_strength(signals)))
