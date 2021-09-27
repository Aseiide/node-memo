const readline = require('readline')
const {Select} = require('enquirer')
const argv = require('minimist')(process.argv)
const sqlite3 = require('sqlite3')
const dbname = 'memo.sqlite3'
const db = new sqlite3.Database(dbname)


db.run('CREATE TABLE IF NOT EXISTS memos(id INTEGER PRIMARY KEY autoincrement, title text, body, text)')

async function main(lFlag = false, dFlag = false) {
  const memo = new Memo()
  const storage = new Storage()
  if (lFlag || dFlag) {
    memo.displayTitle(storage, dFlag)
  } else {
    await memo.getText()
    await storage.insertDB(memo)
    memo.displayTitle(storage)
  }
}

class Memo {
  constructor(id, title, body) {
    this.id = id
    this.title = title
    this.body = body
  }

  getText() {
    return new Promise(resolve => {
      const lines = []
      const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
      })

      rl.on('line', (line) => {
        lines.push(line)
      })

      rl.on('close', async () => {
        this.title = lines.shift()
        this.body = lines.join('/;:')
        return resolve
      })
    })
  }

  displayTitle(storage, dFlag = false) {
    const msg = dFlag ? '削除するメモを選択してください' : '閲覧するメモを選択してください'
    const ary = storage.selectTitles()
    const prompt = new Select({
      name: 'color',
      message: msg,
      choices: ary
    })

    prompt.run()
      .then(answer => dFlag ? storage.deleteMemo(answer) : storage.selectBody)
  }
}


class Storage {
  insertDB(memo) {
    return new Promise(resolve => {
      const query = db.prepare('INSERT INTO memos(id, title, body) VALUES(?, ?, ?)')
      query.run([memo.id, memo.title, memo.body])
    })
  }

  selectTitles() {
    return new Promise(resolve => {
      db.all('SELECT title FROM memos id', function (err, rows) {
        if (err) {
          console.log(err)
        } else {
          return resolve(rows.map(x => x.title))
        }
      })
    })
  }

  selectBody(title) {
    console.log(title.toString())
    db.each('SELECT * FROM memos where title = ?', title, function (err, row) {
      if (err) {
        console.log(err)
      } else {
        row.content.split('/;:').forEach(element => {
          console.log(element)
        })
      }
    })
  }

  deleteMemo(title) {
    console.log('deleted')
    db.run('DELETE FROM memos where title = ?', title)
  }
}

main(argv.l, argv.d)
