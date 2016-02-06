import Ember from 'ember';

export default Ember.Component.extend({
  init: function() {
    this._super.apply(this, arguments);

    this.ws = new WebSocket('ws://localhost:3000/socket');
    this.ws.onmessage = (event) => {
      const data = JSON.parse(event.data);
      if (data.type === 'refresh') {
        let teams = [];
        let timezones = {};
        data.data.forEach((user) => {
          if (timezones[user.timezone] === undefined) {
            timezones[user.timezone] = {timezone: user.timezone, users: []};
          }
          timezones[user.timezone]['users'].push(user);
        });
        for (let timezone in timezones) {
          teams.push(timezones[timezone]);
        }
        window.e = teams;
        this.set('teams', teams);
      }
    };
  }

});
