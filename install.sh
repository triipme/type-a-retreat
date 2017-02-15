#!/usr/bin/env bash

pip install virtualenvwrapper
source $VIRTUALENVWRAPPER_SCRIPT
mkvirtualenv -p python2 type-a-retreat
workon type-a-retreat
pip install -r requirements.txt
gem install s3_website