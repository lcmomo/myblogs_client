/** @type {*} */
const fs = require('fs');
const path = require('path');


const uploadPath = path.resolve(__dirname, '../upload');
const outputPath = path.resolve(__dirname, '../output');

/**
 *
 *
 * @param {String} filePath 文件路径
 * @return {Promise} 
 */
function findOrCreateFilePath (filePath) {
  return new Promise((resolve, reject) => {
    try {
      const exist = fs.existsSync(filePath);
      if (exist) {
        resolve(true);
      } else {
        fs.mkdirSync(filePath);
        console.log(`${filePath}路径创建成功`);
        resolve(true);
      }

    } catch (error) {
      reject(false);
    }
  }
  )
}

/**
 *
 *解析上传的文件的前缀
 * @param {string} filePath
 */
function decodeFile (filePath) {

}

/**
   * @func createFileContent 创建文章前缀
   * @param {Object} article
   * @return {String} 返回生成后的字符串
   * render just like:
    ---
      title: mysql - 对 table 的操作
      date: 2018-08-03 21:37:37
      categories: HTML-CSS
      tags:
        - HTML
        - canvas
    ---

    ...
*/
function createFileContent({ title, content, createdAt, categories, tags }) {
  /**
   * 生成分类、标签字符串的方法
   * @param {Array} list
   * @return {String}
   */
  function _generateTag(list) {
    const newList = list.reduce((list, item) => {
      list.push(item.name)
      return list
    }, [])

    if (newList.length === 1) {
      return newList[0]
    } else {
      return newList.map(name => `\n - ${name}`).join('')
    }
  }

  function _transferTitle(str) {
    if (/(\[)|(\])/g.test(str)) {
      return `'${str}'`
    } else {
      return str
    }
  }

  const prefix = [
    '---',
    `title: ${_transferTitle(title)}`,
    `date: ${createdAt}`,
    `categories: ${_generateTag(categories)}`,
    `tags: ${_generateTag(tags)}`,
    '---\n',
    content
  ]

  return prefix.join('\n')
}


/**
 *创建md文件
 *
 * @param {*} article
 */
async function generateFile(article) {
  return new Promise((resolve, reject) => {
    findOrCreateFilePath(outputPath).then(() => {
      const fileName = `${article.title}.md`;
      const writeFilePath = `${outputPath}/${fileName}`;
      const fileContent = createFileContent(article);
      fs.writeFile(writeFilePath, fileContent, function(err) {
        if (err) {
          reject()
          throw err;
        }
        fs.readFile(writeFilePath, function (err, data) {
          if (err) {
            throw err;
          }
          resolve({ filePath: writeFilePath, fileName})
        })
      })
    })
  })

}


module.exports = {
  uploadPath, // 上传目录
  outputPath, // 导出目录
  decodeFile,
  generateFile // 生成 md 文件
}