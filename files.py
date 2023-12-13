import os

def create_folder(folder_path):
    if not os.path.exists(folder_path):
        os.makedirs(folder_path)
        print(f"Folder '{folder_path}' created.")
    else:
        print(f"Folder '{folder_path}' already exists.")


folders_to_create = ["Tasks/romani","Tasks/Sara","Tasks/Ziad","Tasks/Abdalah","Tasks/Rawan","Tasks/Mohammed","Tasks/Mohaned","Tasks/Reham","Tasks/Ahmed"]

for folder_path in folders_to_create:
    create_folder(folder_path)
