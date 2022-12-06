with open('../input_06.txt', 'r') as f:
    signals = [line.rstrip() for line in f]


for signal in signals: 
    print(signal)
    unique_signals = [] 
    cnt = 0
    for char in signal:
        # Part one 4 & Part two 14 as length 
        if len(unique_signals) == 14:
            print(cnt)
            break

        if char in unique_signals:
            unique_signals.append(char)
            unique_signals = unique_signals[unique_signals.index(char)+1:]
            cnt += 1
            continue

        unique_signals.append(char)
        cnt += 1

