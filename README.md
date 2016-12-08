# Type A Retreat

## Installation

Because `staticjinja` engine has import issue in `python3`, we should use `python 2` for this.

If you're using `virtualenv`:

```
mkvirtualenv -p python2 ceo-retreat
workon ceo-retreat
```

Then install requirements:

```
pip install -r requirements
```

## Developement

Run script to auto build when has change:

```
python watch.py
```

This will generate HTML and copy static files to `output` directory.

To run server for previewing:

```
# python 2
python -m SimpleHTTPServer

# python 3
python -m http.server
```

## Deploy

>TODO

Currently deploy using `s3_website` with `s3_website push`