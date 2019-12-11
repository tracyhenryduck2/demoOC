import os

def main():
    os.chdir("E:\xampp\php\\")
    
    path_01 = "php-cgi.exe -b 127.0.0.1:9000"

    r_v = os.system(path_01)

    print(r_v)

if __name__ == "__main__":
    main()
