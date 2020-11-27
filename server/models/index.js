const Sequelize = require('sequelize');
const sequelize = require('../db');

const User = sequelize.define('user', {
    login: Sequelize.STRING,
    password: Sequelize.STRING,
    description: Sequelize.STRING
});

const Music = sequelize.define('music', {
    title: Sequelize.STRING,
    nb_likes: Sequelize.INTEGER,
    nb_forks: Sequelize.INTEGER,
    nb_listen: Sequelize.INTEGER,
    setup_code: Sequelize.STRING,
    step_code: Sequelize.STRING,
    can_fork: Sequelize.BOOLEAN,
    private: Sequelize.BOOLEAN,
    image: Sequelize.BLOB
});


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


sequelize.sync({ force: false })
  .then(() => {
    console.log(`Database & tables created!`)
    Sample
    .create({ title: 'test_sample' })
    .then(function(samp) {
        console.log('test sample created')
    })
})

module.exports = {
    User, Music, Library, Sample, Notification
}
