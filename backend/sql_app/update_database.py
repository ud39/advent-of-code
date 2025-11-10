# Script that goes through initial available solutions to setup database

import os
import re


"Add all available logos"

"Root directory to access other files"
os.chdir('.')

root_app_dir = os.getcwd()
available_years = [
    folder for folder in os.listdir() if re.match(r"2\d{3}$", folder)]

for year in available_years:
    year_dir = os.path.join(root_app_dir, year)
    languages = os.listdir(year_dir)
    for lang in languages:
        lang_dir = os.path.join(year_dir, lang)
        solutions = os.listdir(lang_dir)
        print(solutions)
