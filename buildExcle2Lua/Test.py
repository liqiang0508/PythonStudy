import os

listFiles = os.listdir(os.getcwd())
content = "123"
forMat = "txt"
for fileName in listFiles:
    if forMat in fileName:
        print(fileName)
        with open(fileName, "r+") as F:
            data = F.read()
            print("data",data)
            if content in data:
                print("data1", data)
                print("000")
                # F.seek(os.SEEK_END);
                F.seek(0, 2)
                F.write("36")
                F.close()
