'use strict';
var sshin = require('./app');
const inquirer = require('inquirer');
const homedir = require('os').homedir();

// ignore console logs
const spy = jest.spyOn(console,'log').mockReturnValue()

jest.mock("inquirer");
jest.mock('child_process');

for (const argv of [
  ['node','js','-F=./mock/mockconfig'],
  ['node','js','-F= ./mock/mockconfig '],
  ['node','js','-F',' ./mock/mockconfig '],
  ['node','js','-F','./mock/mockconfig'],
  ]) {
  test(`should be ok with custom config file: ${argv}`, async () => {
    expect.assertions(2);
    inquirer.prompt = (questions) => {
      expect(questions[0].choices[0].value).toEqual('somehost');
      expect(questions[0].choices[1].value).toEqual('someotherhost');
      return Promise.resolve({ host: 'somehost'});
    }
    await sshin.exec(argv);
  });
}

test(`should exit gracefully on missing config file`, async () => {
  expect.assertions(1);
  
  await expect(sshin.exec(['node','js','-F','./mock/nosuchconfig'])).rejects.toEqual(
    'Failed to read or parse config file. Make sure the file exists: ./mock/nosuchconfig'
  );
});