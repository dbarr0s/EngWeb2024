import json
import requests

datasets = ["datasets/dataset-extra1.json",
            "datasets/dataset-extra2.json", 
            "datasets/dataset-extra3.json"]

api_url = "http://localhost:2024/pessoas"

for dataset in datasets:
    with open(dataset, 'r', encoding='utf-8') as file:
        data = json.load(file)  # Carrega o JSON completo
        pessoas = data  # Acessa a lista de pessoas
        
        for pessoa in pessoas:
            try:
                response = requests.post(api_url, json=pessoa)
                if response.status_code == 200:
                    print(f"POST {pessoa['nome']}, Response: {response.status_code}")
                else:
                    print(f"POST {pessoa['nome']}, Response: {response.status_code}, Error: {response.text}")
            except requests.exceptions.RequestException as e:
                print(f"Erro ao enviar POST para {api_url}: {e}")
