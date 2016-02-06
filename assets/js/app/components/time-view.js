import Ember from 'ember';

export default Ember.Component.extend({
  init: function() {
    this._super.apply(this, arguments);
  },

  timezone: function() {
    return this.get('timezone');
  }.property('timezone')
});
