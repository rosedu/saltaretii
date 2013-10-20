How To deploy to Heroku a django app
===

* [prerequisites](https://devcenter.heroku.com/articles/getting-started-with-django#prerequisites)
* [howto deploy django](https://devcenter.heroku.com/articles/getting-started-with-django#deploy-to-heroku)

Additional steps:
* your django apps sould be in root directory
* run `heroku run python manage.py syncdb` or add it to Procfile
