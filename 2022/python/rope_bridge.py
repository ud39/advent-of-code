
with open('input_09.txt', 'r') as f:
    lines = [line.strip() for line in f]

possible_moves = {
    'R': 1,
    'L': -1,
    'U': 1,
    'D': -1
}


def adjacent(head, tail):
    if abs(head[0] - tail[0]) > 1 or abs(head[1] - tail[1]) > 1:
        return True
    else:
        return False


def rope_bridge_one(path):

    head = (0, 0)
    tail = (0, 0)

    number_of_touch_points = 1
    visited_places = set()
    visited_places.add((0, 0))

    for move in path:

        move = move.split()
        direction = move[0]
        amount_of_move = int(move[1])

        if direction == 'R' or direction == 'L':
            for i in range(0, amount_of_move):
                head = (head[0] + 1 * possible_moves[direction], head[1])

                if abs(head[0] - tail[0]) > 1 and abs(head[1] - tail[1]) == 1:
                    tail = (tail[0] + 1 * possible_moves[direction], head[1])
                    visited_places.add(tail)
                    number_of_touch_points = number_of_touch_points + 1
                    continue
                if adjacent(head, tail):
                    tail = (tail[0] + 1 * possible_moves[direction], tail[1])
                    visited_places.add(tail)
                    number_of_touch_points = number_of_touch_points + 1
        else:
            for i in range(0, amount_of_move):
                head = (head[0], head[1] + 1 * possible_moves[direction])

                if abs(head[1] - tail[1]) > 1 and abs(head[0] - tail[0]) == 1:
                    tail = (head[0], tail[1] + 1 * possible_moves[direction])
                    visited_places.add(tail)
                    number_of_touch_points = number_of_touch_points + 1
                    continue
                if adjacent(head, tail):
                    tail = (tail[0], tail[1] + 1 * possible_moves[direction])
                    visited_places.add(tail)
                    number_of_touch_points = number_of_touch_points + 1

    print(visited_places)
    return len(visited_places)


rope_bridge_one(lines)
