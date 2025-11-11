with open('input_02.txt', 'r') as f:
    lines = [line.rstrip() for line in f]

rock_paper_scissors = {'A': 1, 'B': 2, 'C': 3}
what_to_play = {'X': 'A', 'Y': 'B', 'Z': 'C'}
outcome = {'AA': 3, 'AB': 6, 'AC': 0, 'BB': 3, 'BA': 0, 'BC': 6, 'CC': 3, 'CA': 6, 'CB': 0}

outcome_mod = {'AX': 'C', 'AY': 'A', 'AZ': 'B', 'BX': 'A', 'BY': 'B', 'BZ': 'C', 'CX': 'B', 'CY': 'C', 'CZ': 'A'}
    
sum_of_rnd = 0
for rnd in lines:
    rnd = rnd.split(' ')
    opp, me = rnd[0], rnd[1] 
    play_value, play_choice = rock_paper_scissors[outcome_mod[opp + me]], outcome_mod[opp + me]
    outcome_value = outcome[opp + play_choice]
    sum_of_rnd += outcome_value + play_value


print(sum_of_rnd)
