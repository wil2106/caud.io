const { Music, Notification } = require('../models')
const { Op } = require('sequelize')
const sequelize = require('../db')

const baseQuery = (orderBy) =>
  `SELECT music.id, music.title, music.nb_forks,
    music.nb_likes, music.nb_listen, music.can_fork,
    users.login, encode(music.image, 'base64') as image,
    music.bpm, music.nb_steps, music.setup_code, music.step_code, music.fk_author
    FROM music, users
    WHERE music.private=false AND music.fk_author=users.id
    order by ${orderBy}
    OFFSET $offset
    LIMIT $limit`

const add = (music) => Music.create(music)


const deleteMusic = id_ => Music.destroy({ 
    where: { id: id_ }
});

const updateMusic = (music, id_) => Music.update( 
  music,
  {where: {id: id_}}
);


const like = (id_) => Music.update({ 
    nb_likes: sequelize.literal('nb_likes + 1')}, {
    where: {id: id_}
});

const fork = (id_) =>
  Music.update(
    {
      nb_forks: sequelize.literal('nb_forks + 1'),
    },
    {
      where: { id: id_ },
    }
  )

const notify = (notification) => Notification.create(notification)

const listen = (id_) =>
  Music.update(
    { nb_listen: sequelize.literal('nb_listen + 1') },
    {
      where: { id: id_ },
    }
  )

const mostLike = (limit, offset) =>
  sequelize.query(baseQuery('nb_likes DESC'), {
    bind: {
      limit,
      offset,
    },
    type: sequelize.QueryTypes.SELECT,
  })

const mostRecent = (limit, offset) =>
  sequelize.query(baseQuery('music."createdAt" DESC'), {
    bind: {
      limit,
      offset,
    },
    type: sequelize.QueryTypes.SELECT,
  })

const mostFork = (limit, offset) =>
  sequelize.query(baseQuery('music.nb_forks DESC'), {
    bind: {
      limit,
      offset,
    },
    type: sequelize.QueryTypes.SELECT,
  })

const mostListen = (limit, offset) =>
  sequelize.query(baseQuery('music.nb_listen DESC'), {
    bind: {
      limit,
      offset,
    },
    type: sequelize.QueryTypes.SELECT,
  })

const searchTitle = (search_, limit, offset) =>
  Music.findAll({
    where: {
      title: { [Op.substring]: search_ },
    },
    limit,
    offset,
  })

const fullMusic = (id_) =>
  sequelize.query(
    `SELECT music.id, music.title, music.nb_forks,
    music.nb_likes, music.nb_listen, music.can_fork,
    users.login, encode(image, 'base64') as image
    FROM music, users
    WHERE music.fk_author=users.id AND music.id=$id`,
    { bind: { id: id_ }, type: sequelize.QueryTypes.SELECT }
  )

  const fullMusics = (ids_) =>
  sequelize.query(
    `SELECT music.id, music.title, music.nb_forks,
    music.nb_likes, music.nb_listen, music.can_fork,
    users.login, encode(image, 'base64') as image
    FROM music, users
    WHERE music.fk_author=users.id AND music.id = ANY($ids)`,
    { bind: { ids: ids_ }, type: sequelize.QueryTypes.SELECT }
  )

const musicContent = (id_) =>
  Music.findAll({
    attributes: ['setup_code', 'step_code'],
    where: {
      id: id_,
      private: false,
    },
  })

module.exports = {
  like,
  notify,
  add,
  updateMusic,
  deleteMusic,
  listen,
  fork,
  mostLike,
  mostRecent,
  mostFork,
  mostListen,
  searchTitle,
  fullMusic,
  fullMusics,
  musicContent,
}
