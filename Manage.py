import os
def create_folder(folder_path):
    if not os.path.exists(folder_path):
        os.makedirs(folder_path)
        print(f"Folder '{folder_path}' created.")
    else:
        print(f"Folder '{folder_path}' already exists.")

import os

def create_readme_in_folders(folder_path,file):
    # get member name
    memeberName=folder_path.split('/')[1]

    readme_path = os.path.join(folder_path,file)
    # os.remove(readme_path)
    # return
    with open(readme_path, "w") as readme_file:
        # Write content to the README file
        readme_file.write(f"# Welcome to {memeberName}'s Task Folder")
        print(f"README.md created successfully in '{readme_path}'.")


folders_to_create = ["Tasks/romani","Tasks/Sara","Tasks/Ziad","Tasks/Abdalah","Tasks/Rawan","Tasks/Mohammed","Tasks/Mohaned","Tasks/Reham","Tasks/Ahmed"]

for folder_path in folders_to_create:
    #create folders
    # create_folder(folder_path)
    
    #create README 
    file= "README.md"
    create_readme_in_folders(folder_path,file)
