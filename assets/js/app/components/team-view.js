import Ember from 'ember';

export default Ember.Component.extend({
  init: function() {
    this._super.apply(this, arguments);

    //this.ws = new WebSocket('ws://' + location.host + '/socket');
    this.ws = new WebSocket('ws://localhost:3000/socket');
    this.ws.onmessage = (event) => {
      const response = JSON.parse(event.data);
      if (response.type === 'refresh') {
        let teams = [];
        let timezones = {};
        response.data.forEach((user) => {
          if (timezones[user.timezone] === undefined) {
            timezones[user.timezone] = {timezone: user.timezone, users: []};
          }
          timezones[user.timezone]['users'].push(user);
        });
        for (let timezone in timezones) {
          teams.push(timezones[timezone]);
        }
        if (response.data.length === 3) {
          localStorage.clear();
        }
        this.set('teams', teams);
      } else if (response.type === 'identity') {
        localStorage.setItem('user', JSON.stringify(response.data));
        this.set('user', response.data);
      }
      this.rerender();
    };
  }

});
