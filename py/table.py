import pandas as pd

def export_statistics():
    population_filepath = '../data/population.original.csv'
    gdp_filepath = '../data/gdp.original.csv'
    
    population_df = pd.read_csv(population_filepath, delimiter=',', encoding='utf-8')
    gdp_df = pd.read_csv(gdp_filepath, delimiter=',', encoding='utf-8')
    
    population_df_japan = population_df[(population_df['Country or Area'] == 'Japan') & 
                                        (population_df['Variant'] == 'Medium')]
    
    population_df_china = population_df[(population_df['Country or Area'] == 'China') & 
                                        (population_df['Variant'] == 'Medium')]
    
    gdp_df_japan = gdp_df[(gdp_df['Country or Area'] == 'Japan') & 
                            (gdp_df['Item'] == 'Gross Domestic Product (GDP)')]
    
    gdp_df_china = gdp_df[(gdp_df['Country or Area'] == 'China (mainland)') & 
                            (gdp_df['Item'] == 'Gross Domestic Product (GDP)')]
    
    population_df_japan = population_df_japan[['Year(s)', 'Value']]
    population_df_japan = population_df_japan.rename(columns={'Value': 'Japan'})
    
    population_df_china = population_df_china[['Year(s)', 'Value']]
    population_df_china = population_df_china.rename(columns={'Value': 'China'})
    
    population_df = population_df_japan.merge(population_df_china, on='Year(s)')
    population_df = population_df.rename(columns={'Year(s)': 'Year'})
    
    gdp_df_japan = gdp_df_japan[['Year', 'Value']]
    gdp_df_japan = gdp_df_japan.rename(columns={'Value': 'Japan'})
    
    gdp_df_china = gdp_df_china[['Year', 'Value']]
    gdp_df_china = gdp_df_china.rename(columns={'Value': 'China'})
    
    gdp_df = gdp_df_japan.merge(gdp_df_china, on='Year')
    
    population_statistics_df = population_df.describe() \
                                            .reset_index() \
                                            .rename(columns={'index': 'Attrib'})
                                            
    population_statistics_df['Attrib'] = 'population_' + population_statistics_df['Attrib']              
    
    gdp_statistics_df = gdp_df.describe() \
                              .reset_index() \
                              .rename(columns={'index': 'Attrib'})
                              
    gdp_statistics_df['Attrib'] = 'gdp_' + gdp_statistics_df['Attrib']
    
    statistics_df = pd.concat([population_statistics_df, gdp_statistics_df])
    
    statistics_df.to_json('../data/statistics.json', orient='records')

if __name__ == '__main__':
    export_statistics()
