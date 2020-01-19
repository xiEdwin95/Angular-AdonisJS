'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class LocationSchema extends Schema {
  up () {
    this.create('locations', (table) => {
      table.increments()
      table.timestamps()
      table.string('name')
      table.text('description')
      table.decimal('lat',[11],[8])
      table.decimal('lon',[11],[8])
      table.string('url')
      


    })
  }

  down () {
    this.drop('locations')
  }
}

module.exports = LocationSchema
