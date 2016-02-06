use Rack::Static,
  url: '/',
  root: 'public',
  index: 'index.html'

use Rack::Static,
  urls: ['/assets'],
  root: 'public'


require './lib/app'
run App
