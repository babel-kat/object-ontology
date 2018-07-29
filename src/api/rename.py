import os

base = './images'

for idx, val in enumerate(os.listdir(base)):
    src = base + '/' + val
    dest = base + '/' + str(idx) + val[-4:]
    os.rename(src, dest)
