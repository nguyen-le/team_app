import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('current-user-info-view', 'Integration | Component | current user info view', {
  integration: true
});

test('it renders', function(assert) {
  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });"

  this.render(hbs`{{current-user-info-view}}`);

  assert.equal(this.$().text().trim(), '');

  // Template block usage:"
  this.render(hbs`
    {{#current-user-info-view}}
      template block text
    {{/current-user-info-view}}
  `);

  assert.equal(this.$().text().trim(), 'template block text');
});
