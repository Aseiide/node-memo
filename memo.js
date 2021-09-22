// 標準入力からtitleとbodyを受け取って変数に格納する
// const title = require("fs").readFileSync("/dev/stdin", "utf8");
// console.log(title);
// const body = require("fs").readFileSync("/dev/stdin", "utf8");
// console.log(body);

// DBに新規にid, title, bodyを保存する処理
const sqlite3 = require('sqlite3')
const dbname = 'memo.sqlite3'
const db = new sqlite3.Database(dbname)

db.serialize(() => {
  db.run('DROP TABLE IF EXISTS memos')
  db.run('CREATE TABLE IF NOT EXISTS memos(id INTEGER PRIMARY KEY autoincrement, title text, body, text)')
  db.run('INSERT INTO memos(id, title, body) values(?, ?, ?)', 1, 'test1', 'バナナ\nトマト\n牛乳\n')
  db.run('INSERT INTO memos(id, title, body) values(?, ?, ?)', 2, 'test2', 'ティッシュ\n洗剤')
  db.run('INSERT INTO memos(id, title, body) values(?, ?, ?)', 3, 'test3', 'ヨーグルト')
  db.each('SELECT * FROM memos', (err, row) => {
    if (err) console.log(err.message)
    console.log(`${row.id}: ${row.title}: ${row.body}`)
  })
})

// 一覧機能: DBに保存されたタイトルを取り出してconsole.logで出力する
db.serialize(() => {
  db.all('SELECT title FROM memos', function (err, rows) {
    if (err) {
      throw err;
    }
    rows.forEach(function (row) {
      console.log(row.title)
    })
  })
})

// 参照機能: 保存されたタイトルを取り出してconsole.logに出力
// それを選択できるようにする
db.serialize(() => {
  db.all('SELECT title FROM memos', function (err, rows) {
    if (err) {
      throw err;
    }
    rows.forEach(function (row) {
      console.log(row.title)
    })
  })
})













db.close()
