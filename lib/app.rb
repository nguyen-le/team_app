require 'json'
require 'sinatra/base'
require 'sinatra-websocket'

class App < Sinatra::Base
  @@sockets = []
  @@times = ['America/Los Angeles', 'America/Dallas', 'America/Montreal', 'Europe/London']
  @@teams_cache = {
    1 => {id: 1, first_name: 'Luke', last_name: 'Skywalker', timezone: @@times[0], color: 'orange'},
    2 => {id: 2, first_name: 'Han', last_name: 'Solo', timezone: @@times[0], color: 'yellow'},
    3 => {id: 3, first_name: 'JarJar', last_name: 'Binks', timezone: @@times[2], color: '#c6c'}
  }

  get '/socket' do
    if request.websocket?
      request.websocket do |ws|

        ws.onopen do
          @@sockets << ws
          publish_to_sockets
        end

        ws.onmessage do |msg|
          data = JSON.parse(msg)
          if data['type'] == 'create'
            colors = ['6', '9', 'c', 'f']
            name_array = data['name'].split(' ')
            if (@@times.include? data['timezone']) && name_array.length >= 2
              user_data = {
                id: @@teams_cache.length + 1,
                first_name: name_array[0],
                last_name: name_array[-1],
                color: data['color'] || '#'.concat(colors.sample(3).join('')),
                timezone: data['timezone']
              }
              @@teams_cache[user_data[:id]] = user_data
            end
            response = {type: 'identity', data: user_data}
            ws.send(JSON.dump(response))
          elsif data['type'] == 'update'
            @@teams_cache[data['id']] = data
          end
          publish_to_sockets
        end

        ws.onclose do
          @@sockets.delete(ws)
        end

      end
    end
  end

  def publish_to_sockets
    payload = {
      type: 'refresh',
      data: @@teams_cache.values
    }
    @@sockets.each do |socket|
      socket.send(JSON.dump(payload));
    end
  end
end
