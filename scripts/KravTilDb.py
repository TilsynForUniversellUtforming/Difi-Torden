#Usage:
# python KravTilDb.py path/to/file.xlsx

import requests
import json
import openpyxl
import sys
import os.path

# which enviroment to run against. Fill in fields for dev etc if needed
localUrl = "http://localhost:3000/"
devEnvUrl = ""
testEnvUrl = ""
prodEnvUrl = ""

NUMBER_IN_REQ_LIST = "nr_v9"
REQUIREMENT_IN_STANDARD = "req_in_standard"
STANDARD = "standard"
CHAPTER = "chapter_title"
LEVEL = "level"
CATEGORY = "category"


# endpoint path
endpoint = "api/requirements"

def doPostRequest(host, endpoint, data):
    print("sending data to " + host + endpoint)
    r = requests.post(host+endpoint, data = data)
    print("resposne : " + str(r))
    return r
def readRequirementsFromExcelFile(file):
    print("gathering data...")
    data = []
    wb = openpyxl.load_workbook(file)
    sheet = wb.get_active_sheet()
    for row in range(2, sheet.max_row +1):
        row_data = {}
        row_data["user"] = "Admin"
        row_data[NUMBER_IN_REQ_LIST] = sheet['A' + str(row)].value
        row_data[REQUIREMENT_IN_STANDARD] = sheet['B' + str(row)].value
        row_data[STANDARD] = sheet['C' + str(row)].value
        row_data[CHAPTER] = sheet['D' + str(row)].value
        row_data[LEVEL] = sheet['E' + str(row)].value
        row_data[CATEGORY] = sheet['F' + str(row)].value
        data.append(row_data)
    print("Collected " + str(len(data)) + " rows of data.")
    return data
        

if len(sys.argv) < 2:
    print("Need to know where the files is.")
    print("pyton KravTilDb.py path/to/file.xlsx")
    sys.exit()
path = sys.argv[1]
print("looking for " + path)
if not os.path.isfile(path):
    print(path + " is not a valid file")
    sys.exit()
print("Found it!")        

data = readRequirementsFromExcelFile(path)
for row in data:
    doPostRequest(localUrl, endpoint, row)

Print("Done.")
