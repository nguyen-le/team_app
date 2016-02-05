import Ember from 'ember';

export default Ember.Component.extend({
  user: function() {
    return this.get('user');
  }.property('user')
});
