import os

# TODO Implement easier input reading by using os.walk to reduce the amount of arguments needed?
def read_input(path: str, data_type: str, day: str):
    #input_location = path + day
    #f = open("../2022/input/input_01.txt")
    with open("../2022/input/input_01.txt", 'r') as reader:
        print(reader.read())


read_input('a', 'b', 'c')
