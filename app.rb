require 'sinatra/base'

class App < Sinatra::Base
  get '/' do
    'Hello World'
  end

  get '/home' do
    'Hello Home'
  end
end
