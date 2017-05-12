from staticjinja import make_site


if __name__ == "__main__":
    context = {'version': '9'}
    site = make_site(
        outpath='output',
        extensions=['jinja2.ext.with_', ],
        staticpaths=['static', ],
        contexts=[('index.html', context)]
    )
    # disable automatic reloading
    site.render(use_reloader=False)
