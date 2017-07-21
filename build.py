from staticjinja import make_site
import argparse

parser = argparse.ArgumentParser(description='Watch and/or build project')
parser.add_argument('--watch', action='store_true')
args = parser.parse_args()
should_watch = args.watch

if __name__ == "__main__":
    context = {'version': '19'}
    site = make_site(
        outpath='output',
        extensions=['jinja2.ext.with_', ],
        staticpaths=['static', ],
        contexts=[
        	('index.html', context),
        	('about/index.html', context),
        	('the-science-behind/index.html', context),
        	('timeline/index.html', context),
            ('jp/index.html', context),
            ('jp/about/index.html', context),
            ('jp/the-science-behind/index.html', context),
            ('jp/timeline/index.html', context)
        ]
    )
    site.render(use_reloader=should_watch)
