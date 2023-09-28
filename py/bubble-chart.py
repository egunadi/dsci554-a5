import pandas as pd

def export_population_gdp():
    population_filepath = '../data/population.original.csv'
    gdp_filepath = '../data/gdp.original.csv'
    
    population_df = pd.read_csv(population_filepath, delimiter=',', encoding='utf-8')
    gdp_df = pd.read_csv(gdp_filepath, delimiter=',', encoding='utf-8')
    
    population_df_japan = population_df[(population_df['Country or Area'] == 'Japan') & 
                                        (population_df['Variant'] == 'Medium')]
    
    population_df_korea = population_df[(population_df['Country or Area'] == 'Republic of Korea') & 
                                        (population_df['Variant'] == 'Medium')]
    
    gdp_df_japan = gdp_df[(gdp_df['Country or Area'] == 'Japan') & 
                            (gdp_df['Item'] == 'Gross Domestic Product (GDP)')]
    
    gdp_df_korea = gdp_df[(gdp_df['Country or Area'] == 'Republic of Korea') & 
                            (gdp_df['Item'] == 'Gross Domestic Product (GDP)')]
    
    population_df_japan = population_df_japan[['Year(s)', 'Value']]
    population_df_japan = population_df_japan.rename(columns={'Value': 'Japan'})
    
    population_df_korea = population_df_korea[['Year(s)', 'Value']]
    population_df_korea = population_df_korea.rename(columns={'Value': 'Korea'})
    
    population_df = population_df_japan.merge(population_df_korea, on='Year(s)')
    population_df = population_df.rename(columns={'Year(s)': 'Year'})
    
    gdp_df_japan = gdp_df_japan[['Year', 'Value']]
    gdp_df_japan = gdp_df_japan.rename(columns={'Value': 'Japan'})
    
    gdp_df_korea = gdp_df_korea[['Year', 'Value']]
    gdp_df_korea = gdp_df_korea.rename(columns={'Value': 'Korea'})
    
    gdp_df = gdp_df_japan.merge(gdp_df_korea, on='Year')
    
    population_df_unpivot = pd.melt(population_df, id_vars='Year', value_vars=['Japan', 'Korea'])
    population_df_unpivot = population_df_unpivot.rename(columns={'variable': 'Country', 'value': 'Population'})
    
    gdp_df_unpivot = pd.melt(gdp_df, id_vars='Year', value_vars=['Japan', 'Korea'])
    gdp_df_unpivot = gdp_df_unpivot.rename(columns={'variable': 'Country', 'value': 'GDP'})
    
    combined_df = population_df_unpivot.merge(gdp_df_unpivot, on=['Year','Country'])
    
    combined_df = combined_df[combined_df['Year'].isin([1970, 1980, 1990, 2000, 2010, 2020])]
    
    combined_df.to_json('../data/population_gdp.json', orient='records')

if __name__ == '__main__':
    export_population_gdp()
