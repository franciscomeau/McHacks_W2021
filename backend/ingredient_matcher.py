import re
import json
from recipe_scrapers import scrape_me

with open('seasons_to_produce.json') as f:
  SEASONS_TO_PRODUCE = json.load(f)

with open('produce_to_seasons.json') as f:
  PRODUCE_TO_SEASONS = json.load(f)

ALL_INGREDIENTS = [ing for l in SEASONS_TO_PRODUCE.values() for ing in l]

MONTHS = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']

FILTER_WORDS = ['can', 'cans', 'canned', 'black pepper', 'cayenne pepper', 'paste', 'frozen', 'flakes', 'juice', 'zest', 'powder']


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


def get_recipe_title_from_url(url):
  return scrape_me(url).title()


def check_seasonality(recipe_ingredients, month):
  in_season = SEASONS_TO_PRODUCE[MONTHS[month - 1]]
  seasonality_dict = {}
  for rec_ing in recipe_ingredients:
    if any([re.search(r'\b{}\b'.format(filter_word), rec_ing, re.IGNORECASE) for filter_word in FILTER_WORDS]):
      seasonality_dict[rec_ing] = {'in_season': 'N/A', 'ingredient': None, 'seasons': []}
    elif any([re.search(stem_produce(in_season_ing), rec_ing, re.IGNORECASE) for in_season_ing in in_season]):
      best_match = max([in_season_ing for in_season_ing in in_season if re.search(stem_produce(in_season_ing), rec_ing, re.IGNORECASE)], key=len)
      seasonality_dict[rec_ing] = {'in_season': 'In season', 'ingredient': best_match, 'seasons': PRODUCE_TO_SEASONS[best_match]}
    elif any([re.search(stem_produce(ing), rec_ing, re.IGNORECASE) for ing in ALL_INGREDIENTS]):
      best_match = max([ing for ing in ALL_INGREDIENTS if re.search(stem_produce(ing), rec_ing, re.IGNORECASE)], key=len)
      seasonality_dict[rec_ing] = {'in_season': 'Not in season', 'ingredient': best_match, 'seasons': PRODUCE_TO_SEASONS[best_match]}
    else:
      seasonality_dict[rec_ing] = {'in_season': 'N/A', 'ingredient': None, 'seasons': []}
  return seasonality_dict


if __name__ == '__main__':
  import pprint
  pp = pprint.PrettyPrinter(indent=2)
  url = 'https://www.allrecipes.com/recipe/272814/grapefruit-marmalade/'
  recipe_ingredients = get_ingredients_from_url(url)
  pp.pprint(check_seasonality(recipe_ingredients, 12))
