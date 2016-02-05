import Ember from 'ember';

export default Ember.Component.extend({
  timezone: function() {
    return this.get('team').timezone;
  }.property('team'),

  users: function() {
    return this.get('team').users;
  }.property('team')
});
