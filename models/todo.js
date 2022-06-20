
module.exports = (sequelize, type) => {
  return sequelize.define('todo', {
    id: {
      type: type.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    message: type.STRING,
    state: type.STRING,
    /*B-addAtributes*/

/*Code injected by: Images-addAtributes*/
image: type.STRING
/*Code injected by: Images-addAtributes*/

  })
}