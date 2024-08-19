# author: romanyn36 
# about: manage files in folder
import os
import sys
import shutil
import glob
import re
#rename file that start with the N number to new_N number 

def rename_file(N,n):
    for file in os.listdir():
        if file.startswith(f'{N}'):
            # get name of file after N
            name = file[len(str(N)):]
            print(name)
            shutil.move(file, f'{n}{name}')
for i in range(6,11):
    # rename_file(i,i-1)
    pass
# get files name in folder and save them in txt file
def get_files_name():
    with open('files.txt','w') as f:
        for file in os.listdir():
            f.write(file+'\n')

# get_files_name()