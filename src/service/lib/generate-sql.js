'use strict';

class GenerateSql {
  constructor() {
    this.requests = [];
  }

  _isString(value) {
    return typeof value === `string`;
  }

  addInsert(tableName, fieldNames, data) {
    const values = [];
    data.forEach((item) => {
      if (this._isString(item)) {
        values.push(`('${item}')`);
      } else {
        const itemValues = Object.values(item).map((val) => {
          return this._isString(val) ? `'${val}'` : val;
        }).join(`, `);
        values.push(`(${itemValues})`);
      }
    });
    this.requests.push(
        `INSERT INTO ${tableName} (${fieldNames.join(`, `)}) VALUES
        ${values.join(`,\n`)};`
    );
  }

  addComment(comment) {
    this.requests.push(`/*${comment}*/`);
  }

  disabledTriggers(tableName) {
    this.requests.push(`ALTER TABLE ${tableName} DISABLE TRIGGER ALL;`);
  }

  enabledTrigger(tableName) {
    this.requests.push(`ALTER TABLE ${tableName} ENABLE TRIGGER ALL;`);
  }

  compile() {
    return this.requests.join(`\n`);
  }
}

module.exports = GenerateSql;
