import pandas as pd

population_filepath = '../data/population.original.csv'
gdp_filepath = '../data/gdp.original.csv'

population_df = pd.read_csv(population_filepath, delimiter=',', encoding='utf-8')
gdp_df = pd.read_csv(gdp_filepath, delimiter=',', encoding='utf-8')