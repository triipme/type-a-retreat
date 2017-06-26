# Type A Retreat

## Installation

Install `brew` 

Install python3: `brew install python3`

Download : `https://bootstrap.pypa.io/get-pip.py` 
and
Install pip: `python get-pip.py`

*Note: You may need to run it with `sudo`

Then

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

## Working

### Start working

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

### Finish working

To save your works to the remote repo so that it can be deployed to the production site, run the `work-finish.sh` script:

```
sh ./work-finish.sh
```

## Deploy

**Just commit code and our continuous delivery script will deploy to production site.**

Manually deploy (should be done automatically by our bot):

```bash
sh ./deploy.sh
```
