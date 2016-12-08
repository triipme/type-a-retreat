from staticjinja import make_site


if __name__ == "__main__":
    site = make_site(
        outpath='output',
        extensions=['jinja2.ext.with_',],
        staticpaths=['static',]
    )
    # enable automatic reloading
    site.render(use_reloader=True)