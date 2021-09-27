import React from 'react';
import calculate from "../calculate";

test('calculate function', () => {
  const dataExample = [{
    name: 'P',
    alreadyPutted: 3000,
    maxToPut: null
  }, {
    name: 'G',
    alreadyPutted: 1000,
    maxToPut: 1500
  }, {
    name: 'L',
    alreadyPutted: 2000,
    maxToPut: 500
  }];

  const dataEvaluated = calculate(dataExample);

  expect(dataEvaluated[0].toPut).toBe(4000);
  expect(dataEvaluated[1].toPut).toBe(1500);
  expect(dataEvaluated[2].toPut).toBe(500);
});
