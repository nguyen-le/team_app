import Ember from 'ember';

export default Ember.Component.extend({
  init: function() {
    const user = localStorage.getItem('user');

    this._super();
    this.setProperties({user: user});
    this.set('color', this.color());
  },

  color: function () {
  },

  user: function() {
    return this.get('user');
  },

  actions: {
    onSubmit() {
      const user = this.get('user');
      const payload = {
        type: 'update',
        timezone: user.timezone
      };
      this.get('websocket').send(JSON.stringify(payload));
    }
  }

});
