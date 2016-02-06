import Ember from 'ember';

export default Ember.Component.extend({
  color: function () {
    const user = this.get('user');
    if (user) {
      return user.color;
    }
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
