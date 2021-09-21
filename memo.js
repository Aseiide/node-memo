// 既存のJSONファイルから取り出す処理

const fs = require('fs')
// const data = JSON.parse(fs.readFileSync('./memos.json', 'utf8'))
//
// console.log(data.memos[0])
// console.log(data.memos[0].title)
// console.log(data.memos[0].body)
//
// data.memos.forEach(value => {
//   console.log(value.body)
// })

// JSONファイルに新規追加する処理
const jsonObject = JSON.parse(fs.readFileSync('./memos.json', 'utf8'))

const testMemo = {
  memos: [
    {
      id: 4,
      title: 'test4',
      body: 'aaa\nbbb\nccc'
    }
  ]
}
const data = JSON.stringify(testMemo)
console.log(data)
fs.writeFileSync('./memos.json', data)
