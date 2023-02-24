with open('../input_08.txt', 'r') as f:
    trees = [line.rstrip() for line in f] 




rows, columns = len(trees), len(trees[0])

def create_matrix(rows, columns):
    tree_house = [[0] * columns for i in range(rows)] 
    for row in range(rows):
        for column in range(columns):
            tree_house[row][column] = int(trees[row][column])

    
    return tree_house

print(create_matrix(rows, columns))
