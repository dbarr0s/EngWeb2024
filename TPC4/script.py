import json
import os

def jsonFixer(data):
    new_data = []
    periodos = {}
    periodo_id = 0

    for entry in data["compositores"]:
        try:
            if "periodo" in entry and entry["periodo"] != "":
                periodo = entry["periodo"]
                if periodo not in periodos:
                    periodo_id += 1
                    periodos[periodo] = {"id": str(periodo_id), "nome": periodo}
                
                entry["periodo"] = periodos[periodo]["nome"]
                new_data.append(entry)

        except json.JSONDecodeError as e:
            print(f"Error decoding JSON: {e}. Skipping entry: {entry}")

    periodos = list(periodos.values())

    return new_data, periodos

def main():
    file_path = os.path.abspath("compositores.json")
    with open(file_path, 'r', encoding='utf-8') as file:
        data = json.load(file)
    comp, periodos = jsonFixer(data)
    
    json_fixed = {
        "compositores": comp,
        "periodos": periodos,
    }

    with open("compUpdate.json", 'w', encoding='utf-8') as file:
        json.dump(json_fixed, file, indent=2)

if __name__ == "__main__":
    main()