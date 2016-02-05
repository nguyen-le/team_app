import Ember from 'ember';

let user_groups = [
  {
    timezone: 'America/Los Angeles',
    users: ['Luke', 'Han']
  },
  {
    timezone: 'America/Montreal',
    users: ['Leia']
  }
];

export default Ember.Route.extend({
  model() {
    return user_groups;
  }
});
