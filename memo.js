// DBに新規にid, title, bodyを保存する処理
const sqlite3 = require('sqlite3')
const dbname = 'memo.sqlite3'
const db = new sqlite3.Database(dbname)

db.serialize(() => {
  db.run('DROP TABLE IF EXISTS memos')
  db.run('CREATE TABLE IF NOT EXISTS memos(id integer, title text, body, text)')
  db.run('INSERT INTO memos(id, title, body) values(?, ?, ?)', 1, 'test1', 'バナナ\nトマト\n牛乳\n')
  db.run('INSERT INTO memos(id, title, body) values(?, ?, ?)', 2, 'test2', 'ティッシュ\n洗剤')
  db.run('INSERT INTO memos(id, title, body) values(?, ?, ?)', 3, 'test3', 'ヨーグルト')
  db.each('SELECT * FROM memos', (err, row) => {
    if (err) console.log(err.message)
    console.log(`${row.id}: ${row.title}: ${row.body}`)
  })
})

db.close()
