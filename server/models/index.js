const Sequelize = require('sequelize');
const sequelize = require('../db');

/**
 * User sequelize model
 */
const User = sequelize.define('user', {
    login: Sequelize.STRING,
    password: Sequelize.STRING,
    description: Sequelize.STRING
});

/**
 * Music sequelize model
 */
const Music = sequelize.define('music', {
    title: Sequelize.STRING,
    nb_likes: Sequelize.INTEGER,
    nb_forks: Sequelize.INTEGER,
    nb_listen: Sequelize.INTEGER,
    setup_code: Sequelize.TEXT('long'),
    step_code: Sequelize.TEXT('long'),
    bpm: Sequelize.INTEGER,
    nb_steps: Sequelize.INTEGER,
    can_fork: Sequelize.BOOLEAN,
    private: Sequelize.BOOLEAN,
    image: Sequelize.BLOB
});

/**
 * Sample sequelize model
 */
const Sample = sequelize.define('sample', {
    title: Sequelize.STRING,
    file: Sequelize.BLOB
});

const Library = sequelize.define('library', {});

const Notification = sequelize.define('notification', {
    action: Sequelize.STRING
});

Music.belongsTo(User, {foreignKey: 'fk_author'})

Notification.belongsTo(User, {foreignKey: 'fk_user'})
Notification.belongsTo(User, {foreignKey: 'fk_emitter'})
Notification.belongsTo(Music, {foreignKey: 'fk_music'})

Music.belongsToMany(Sample, { through: Library });
Sample.belongsToMany(Music, { through: Library });


sequelize.sync({ force: true })
  .then(() => {
    console.log(`Database & tables created!`)
})

/**
 * @exports
 */
module.exports = {
    User, Music, Library, Sample, Notification
}
