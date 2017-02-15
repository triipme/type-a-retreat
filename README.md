# Type A Retreat

## Installation

Install automatically using installing script:

```bash
sh ./install.sh
```

What it does:

- Install `virtualenvwrapper`
- Create a virtualenv named `type-a-retreat`
- Install dependencies in `requirements.txt`

Or you can install it manually:

Because `staticjinja` engine has import issue in `python3`, we should use `python 2` for this.

If you're using `virtualenv`:

```
mkvirtualenv -p python2 ceo-retreat
workon ceo-retreat
```

Then install requirements:

```
pip install -r requirements.txt
```

## Developement


Run script to auto build when has change:

```bash
sh ./work.sh
```

This will generate HTML and copy static files to `output` directory.

In another terminal window, run server for previewing:

```
sh ./preview.sh
```


```
# python 2
python -m SimpleHTTPServer

# python 3
python -m http.server
```

## Deploy

Just commit code and our continuous delivery script will deploy to production site.

Manually deploy:

```bash
sh ./deploy.sh
```
