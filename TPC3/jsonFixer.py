import json

def jsonFixer(data):
    lines = data.strip().split('\n')
    new_data = []
    atores_set = set()
    generos_set = set()

    for line in lines:
        try:
            entry = json.loads(line)

            if 'genres' in entry:
                generos_set.update(genre for genre in entry['genres'] if genre)

            if 'cast' in entry:
                atores_set.update(actor for actor in entry['cast'] if actor)

            if entry.get('cast') and entry.get('genres'):
                new_data.append(entry)

        except json.JSONDecodeError as e:
            print(f"Error decoding JSON: {e}. Skipping line: {line}")

    atores = [{"nome": actor} for actor in atores_set]
    generos = [{"nome": genre} for genre in generos_set]

    return new_data, atores, generos

def main():
    with open("C:/Users/Diogo Barros/OneDrive - Universidade do Minho/Ambiente de Trabalho/3ºANO/2_Semestre/EWEB/EngWeb2024/TPC3/data/filmes.json", 'r', encoding='utf-8') as file:
        data = file.read()
        data, atores, generos = jsonFixer(data)
    
    new_data = {
        "filmes": data,
        "atores": atores,
        "generos": generos
    }


    with open("C:/Users/Diogo Barros/OneDrive - Universidade do Minho/Ambiente de Trabalho/3ºANO/2_Semestre/EWEB/EngWeb2024/TPC3/data/fixed_filmes.json", 'w', encoding='utf-8') as file:
        json.dump(new_data, file, indent=2)
    
if __name__ == "__main__":
    main()
