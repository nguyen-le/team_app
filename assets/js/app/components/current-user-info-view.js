import Ember from 'ember';

export default Ember.Component.extend({
  init: function() {
    let user;
    if (this.get('user')) {
      user = this.get('user');
    } else {
      user = JSON.parse(localStorage.getItem('user'));
    }

    this._super();
    this.setProperties({user: user});
  },

  color: function() {
    return this.get('user').color;
  }.property('color'),

  initials: function() {
    const names = this.get('user');
    return names.first_name[0] + names.last_name[0];
  }.property('user'),

  actions: {
    onSubmit(event) {
      event.preventDefault();
      const name = event.target[0].value;
      const timezone = event.target[1].value;
      const safeColors = ['6','9','c','f'];
      const rand = function() {
        return Math.floor(Math.random() * 4);
      };
      const randomColor = function() {
        const r = safeColors[rand()];
        const g = safeColors[rand()];
        const b = safeColors[rand()];
        return '#' + r + g + b;
      };
      const color = randomColor();
      const user = {
        name: name,
        timezone: timezone,
        color: color
      };
      const data = Object.assign({}, user, {type: 'create'});
      this.get('websocket').send(JSON.stringify(data));
    },
    onUpdate(event) {
      const timezone = event.target.value;
      const user = Object.assign({}, this.get('user'), {timezone: timezone});
      const data = Object.assign({}, user, {type: 'update'});

      const payload = JSON.stringify(data);
      this.get('websocket').send(payload);
      localStorage.setItem('user', JSON.stringify(user));
      this.set('user', user);
    }
  }
});
