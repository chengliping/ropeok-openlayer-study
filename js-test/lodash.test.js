import _ from 'lodash';
describe('lodash', function() {
  it('isnull', function() {
    expect(_.isEmpty(1)).toEqual(true);
  });
});
