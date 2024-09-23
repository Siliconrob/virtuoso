import Code from "code";
// @ts-ignore
import Lab from "lab";
import {getItemDetails} from "../src/Search";
import testValues from "./data";

const expect = Code.expect;
// @ts-ignore
const lab = exports.lab = Lab.script();

lab.test('gets ticket by id', async () => {
  const expected = testValues.item; 
  const id = 1;
  const results = {
    test: await getItemDetails(id, true),
    live: await getItemDetails(id)
  };
  expect(results.test).to.equal(expected);
  expect(results.live).to.not.equal(expected);
});