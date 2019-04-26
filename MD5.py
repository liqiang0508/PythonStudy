import hashlib
import sys

if __name__ == '__main__':
    if len(sys.argv)!= 2:
        sys.exit('argv error!')

    m = hashlib.md5()
    n = 1024*4
    inp = open(sys.argv[1],'rb')
    while True:
        buf = inp.read(n)
        if buf:
            m.update(buf)
        else:
            break
    print(m.hexdigest())
