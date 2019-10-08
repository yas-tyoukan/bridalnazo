const router = require('express').Router();
const config = require('../../../utils/config');

const TYPE_GRASS = 'megane_is_good';
const TYPE_RING = 'yubiwa_is_beautiful';

/**
 * アカウント
 */
router.route('/')
  .post((req, res, next) => {
    const { body } = req;
    const { name, type } = body;

    // エラーチェック
    if (!name || name.length >= 128) {
      res.status(400).json({
        message: 'invalid name',
      });
      return;
    }
    if (!type || (type !== TYPE_GRASS && type !== TYPE_RING)) {
      res.status(400).json({
        message: 'invalid type',
      });
      return;
    }

    config.pool.query(
      'insert into accounts (name, type) values (?, ?)',
      [name, type],
      (err) => {
        if (err) {
          return next(err);
        }
        res.json({ result: true });
      },
    );
  })
  .get((req, res, next) => config.pool.query(
    'select * from accounts order by created_at desc',
    (err, rows) => {
      if (err) {
        return next(err);
      }
      res.json(rows);
    },
  ))
  .delete((req, res, next) => config.pool.query(
    'delete from accounts',
    (err, rows) => {
      if (err) {
        return next(err);
      }
      res.json(rows);
    },
  ));

module.exports = router;
