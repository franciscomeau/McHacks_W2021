# Well Seasoned
##  Learn about which foods are in season with this bubbly chrome extension. Compatible with all the top recipe sites!
<br/>

## What it does
---
How many times have you gone on a recipe site and said to yourself "Gee I wish I knew if this recipe can be made with fresh produce in vogue this season"? 
### Well you and the millions of other families need to wish no more. We have made a chrome extension that can be run on most major recipe webpages and provides a breakdown of the "freshness" of the recipe your stomach desires! 
Simply install the extension, go to a recipe website and find out if what you're eating is hip this season or not.

## Features
---
* A breakdown of which of the ingredients are in season and which are not
* List of all the ingredients in the recipe for ease of access
* A Season-O-Meter (patent pending) that lets you see exactly how fresh you're eating.

## Steps to run
--- 
### Backend
Locally:
```
cd backend
pip install requirements.txt
python server.py
````
If you have heroku set up:

```
git subtree push --prefix backend heroku master
```
### Frontend
```
1. Go to chrome extensions and enable developer mode.
2. Click on **Load unpacked** and upload the frontend folder.
3. Enable the extension and enjoy
```

> Subway just tells you to eat fresh, we make sure you do