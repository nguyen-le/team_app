import Ember from 'ember';

export default Ember.Component.extend({
  init: function() {
    this._super();
    this.has_time = false;
    const passTime = this.passTime;
    this.time_interval = setInterval(passTime.bind(this), 1000);
  },

  willDestroyElement: function () {
    clearInterval(this.time_interval);
  },

  timezone: function() {
    return this.get('timezone');
  }.property('timezone'),

  passTime: function() {
    const date = new Date;
    const date_moment = moment(date);
    const timezone = this.get('timezone');
    const formatted_time =
      date_moment.tz(timezone.replace(' ', '_')).format('ddd hh:mm:ss a');
    this.has_time = true;
    this.set('time', formatted_time);
  },

  time: function() {
    if (this.has_time === false) {
      return '';
    } else {
      return this.get('time');
    }
  }.property('time')
});
