with open('../input/input_08.txt', 'r') as f:
    trees = [line.rstrip() for line in f]


rows, columns = len(trees), len(trees[0])


def create_matrix(rows, columns):
    tree_house = [[0] * columns for i in range(rows)]
    for row in range(rows):
        for column in range(columns):
            tree_house[row][column] = int(trees[row][column])

    return tree_house


def getLargestRowColumn(matrix):
    rowMaxValue = []
    for row in (matrix):
        rowMaxValue.append(max(*row))

    columns = len(matrix[0])
    columnMaxValue = [0] * columns

    for j in range(columns):
        max_value = max(matrix[i][j] for i in range(len(matrix)))
        columnMaxValue[j] = max_value

    return rowMaxValue, columnMaxValue


def getNumberOfVisibleTreesBruteForce(matrix):

    visibleTrees = len(matrix) * 4 - 4

    for i in range(1, len(matrix)-1):
        for j in range(1, len(matrix[0])-1):
            visible = [True] * 4

            for row in range(i-1, -1, -1):
                if matrix[row][j] >= matrix[i][j]:
                    visible[0] = False
                    break

            for row in range(i+1, len(matrix)):
                if matrix[row][j] >= matrix[i][j]:
                    visible[1] = False
                    break

            for column in range(j-1, -1, -1):
                if matrix[i][column] >= matrix[i][j]:
                    visible[2] = False
                    break

            for column in range(j+1, len(matrix)):
                if matrix[i][column] >= matrix[i][j]:
                    visible[3] = False
                    break

            if any(visible):
                visibleTrees += 1

    return visibleTrees


print(getNumberOfVisibleTreesBruteForce(create_matrix(rows, columns)))
