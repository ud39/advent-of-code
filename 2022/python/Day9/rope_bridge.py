
with open('input_09.txt', 'r') as f:
    path = [line.strip() for line in f]


def sign(x):
    return (x > 0) - (x < 0)

class HeadKnot:

    def __init__(self, x: int, y: int):
        self.x = x
        self.y = y

    def move(self, direction: str):
        if direction == 'R':
            self.x = self.x + 1
            self.y = self.y

        if direction == 'L':
            self.x = self.x - 1
            self.y = self.y

        if direction == 'U':
            self.x = self.x
            self.y = self.y + 1

        if direction == 'D':
            self.x = self.x
            self.y = self.y - 1

        return self


class Knot(HeadKnot):

    def __init__(self, x, y, visited_place):
        super().__init__(x, y)
        self.visited_place = visited_place
        self.visited_place.add((0, 0))

    def follow_head(self, head_knot: HeadKnot):

        dx = head_knot.x - self.x
        dy = head_knot.y - self.y

        if abs(dx) > 1 or abs(dy) > 1:
            new_x = self.x + sign(dx)
            new_y = self.y + sign(dy)
            self.visited_place.add((new_x, new_y))
            self.x = new_x
            self.y = new_y
            return
        else:
            return self

    def amount_of_visited_place(self):

        return len(self.visited_place)


head = HeadKnot(0, 0)
knot_list = [Knot(0, 0, set()) for _ in range(0, 9)]


def rope_bridge(path: str, head: HeadKnot, knot_list: Knot):

    for move in path:

        move = move.split()
        direction = move[0]
        amount_of_move = int(move[1])

        for _ in range(0, amount_of_move):

            head = head.move(direction)

            for i in range(len(knot_list)):
                if i == 0:
                    knot_list[i].follow_head(head)
                else:
                    knot_list[i].follow_head(knot_list[i-1])

    print(knot_list[len(knot_list)-1].amount_of_visited_place())


rope_bridge(path, head, knot_list)
