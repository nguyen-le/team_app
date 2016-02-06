import Ember from 'ember';

export default Ember.Component.extend({
  color: function () {
    let color;
    const user = this.get('user');
    if (user.color) {
      color = user.color;
    } else {
      const safeColors = ['66','99','cc','ff'];
      const rand = function() {
        return Math.floor(Math.random() * 4);
      };
      const randomColor = function() {
        const r = safeColors[rand()];
        const g = safeColors[rand()];
        const b = safeColors[rand()];
        return '#' + r + g + b;
      };
      color = randomColor();
    }
    return color;
  }.property('color'),

  initials: function() {
    const user = this.get('user');
    if (user) {
      return user.first_name[0] + user.last_name[0];
    }
  }.property('initials'),

  name: function() {
    const user = this.get('user');
    if (user) {
      return user.first_name + ' ' + user.last_name;
    }
  }.property('user')
});
