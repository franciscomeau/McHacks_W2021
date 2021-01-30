import re
import json
from recipe_scrapers import scrape_me

with open('seasons_to_produce.json') as f:
  SEASONS_TO_PRODUCE = json.load(f)

with open('produce_to_seasons.json') as f:
  PRODUCE_TO_SEASONS = json.load(f)

ALL_INGREDIENTS = [ing for l in SEASONS_TO_PRODUCE.values() for ing in l]

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
  in_season = SEASONS_TO_PRODUCE[MONTHS[month - 1]]
  seasonality_dict = {}
  for rec_ing in recipe_ingredients:
    if any([re.search(r'\b{}\b'.format(filter_word), rec_ing, re.IGNORECASE) for filter_word in FILTER_WORDS]):
      seasonality_dict[rec_ing] = {'in_season': 'N/A', 'ingredient': None, 'seasons': []}
    elif any([re.search(stem_produce(in_season_ing), rec_ing, re.IGNORECASE) for in_season_ing in in_season]):
      first_match = next(in_season_ing for in_season_ing in in_season if re.search(stem_produce(in_season_ing), rec_ing, re.IGNORECASE))
      seasonality_dict[rec_ing] = {'in_season': 'In season', 'ingredient': first_match, 'seasons': PRODUCE_TO_SEASONS[first_match]}
    elif any([re.search(stem_produce(ing), rec_ing, re.IGNORECASE) for ing in ALL_INGREDIENTS]):
      first_match = next(ing for ing in ALL_INGREDIENTS if re.search(stem_produce(ing), rec_ing, re.IGNORECASE))
      seasonality_dict[rec_ing] = {'in_season': 'Not in season', 'ingredient': first_match, 'seasons': PRODUCE_TO_SEASONS[first_match]}
    else:
      seasonality_dict[rec_ing] = {'in_season': 'N/A', 'ingredient': None, 'seasons': []}
  return seasonality_dict


if __name__ == '__main__':
  # print(ALL_INGREDIENTS)
  url = 'https://www.allrecipes.com/recipe/77194/bolognese-stuffed-bell-peppers/?internalSource=hub%20recipe&referringContentType=Search&clickId=cardslot%209'
  recipe_ingredients = get_ingredients_from_url(url)
  print(check_seasonality(recipe_ingredients, 1))
