import re
import json
from recipe_scrapers import scrape_me

with open('seasons.json') as f:
  SEASONS = json.load(f)

# for season in SEASONS:
#   SEASONS[season] = [stem_produce_words(ing) for ing in SEASONS[season]]

ALL_INGREDIENTS = [ing for l in SEASONS.values() for ing in l]

MONTHS = ['jan', 'feb', 'mar', 'apr', 'may', 'jun', 'jul', 'aug', 'sep', 'oct', 'nov', 'dec']

FILTER_WORDS = ['can', 'cans', 'canned', 'black pepper', 'cayenne pepper', 'paste', 'frozen', 'flakes']


def stem_produce(word):
  if word.endswith('ies'):
    return word[:-3]
  if word.endswith('oes'):
    return word[:-2]
  if word.endswith('s'):
    return word[:-1]
  return word


def get_ingredients_from_url(url):
  return scrape_me(url).ingredients()


def check_seasonality(recipe_ingredients, month):
  in_season = SEASONS[MONTHS[month - 1]]
  seasonality_dict = {}
  for rec_ing in recipe_ingredients:
    if any([re.search(r'\b{}\b'.format(filter_word), rec_ing, re.IGNORECASE) for filter_word in FILTER_WORDS]):
      seasonality_dict[rec_ing] = 'N/A'
    elif any([re.search(stem_produce(in_season_ing), rec_ing, re.IGNORECASE) for in_season_ing in in_season]):
      seasonality_dict[rec_ing] = 'In season'
    elif any([re.search(stem_produce(ing), rec_ing, re.IGNORECASE) for ing in ALL_INGREDIENTS]):
      seasonality_dict[rec_ing] = 'Not in season'
    else:
      seasonality_dict[rec_ing] = 'N/A'
  return seasonality_dict


if __name__ == '__main__':
  # print(ALL_INGREDIENTS)
  url = 'https://www.allrecipes.com/recipe/238989/vegan-tuscan-white-beans/?internalSource=recipe%20hub&referringContentType=Search&clickId=cardslot%2054'
  recipe_ingredients = get_ingredients_from_url(url)
  print(check_seasonality(recipe_ingredients, 1))