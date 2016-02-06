use Rack::Static,
  url: '/',
  root: 'public',
  index: 'index.html'

use Rack::Static,
  urls: ['/js', '/css'],
  root: 'public'


require './lib/app'
run App
