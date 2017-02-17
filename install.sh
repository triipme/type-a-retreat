#!/usr/bin/env bash

pip install virtualenvwrapper > /dev/null 2>&1 && \
source $VIRTUALENVWRAPPER_SCRIPT > /dev/null 2>&1 && \
mkvirtualenv -p python2 type-a-retreat && \
workon type-a-retreat
pip install -r requirements.txt
gem install s3_website