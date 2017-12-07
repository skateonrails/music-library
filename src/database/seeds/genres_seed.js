/* eslint-disable */
const { DateTime } = require('luxon');

exports.seed = (knex, Promise) => {
  // Deletes ALL existing entries
  return knex('genres').del()
    .then(() => {
      // Inserts seed entries
      return knex('genres').insert([
        { name: 'dubstep', created_at: DateTime.local(), updated_at: DateTime.local() },
        { name: 'trap', created_at: DateTime.local(), updated_at: DateTime.local() },
        { name: 'drum and bass', created_at: DateTime.local(), updated_at: DateTime.local() },
      ]);
    });
};
