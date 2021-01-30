import json

with open('seasons_to_produce.json') as f:
  SEASONS = json.load(f)

produce_to_seasons = {}
for season in SEASONS:
  for produce in SEASONS[season]:
    if produce not in produce_to_seasons:
      produce_to_seasons[produce] = [season]
    else:
      produce_to_seasons[produce].append(season)

with open('produce_to_seasons.json', 'w') as f:
  json.dump(produce_to_seasons, f, indent=4)
