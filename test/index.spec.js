// importamos la funcion que vamos a testear

import MockFirebase from 'mock-cloud-firestore';

// import { myFunction } from "../src/lib/index";

describe('myFunction', () => {
  it('debería ser una función', () => {
    expect(typeof myFunction).toBe('function');
  });
});
