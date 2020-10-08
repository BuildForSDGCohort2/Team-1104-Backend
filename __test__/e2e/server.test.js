const HttpStatus = require('http-status-codes');
const build = require('../../src/app.js');

test('default route [GET `/`]', async () => {
  const app = build();
  const res = await app.inject({
    method: 'GET',
    url: '/'
  });

  expect(res.statusCode).toEqual(HttpStatus.OK);
  expect(JSON.parse(res.payload)).toEqual(
    expect.objectContaining({
      status: 'success',
      data: { Hello: 'DigiVet World' }
    })
  );
});
