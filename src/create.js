/*
 * @Author: xll
 * @Date: 2021-05-24 14:04:24
 * @LastEditors: xll
 * @LastEditTime: 2021-05-24 15:24:20
 * @Description: 
 */
const download = require('download-git-repo')
const ora = require('ora')
const fse = require('fs-extra')
const handlebars = require('handlebars')
const myChalk = require('../utils/chalk')

const { red, yellow, green } = myChalk

function createProject(project) {
    console.log("🚀 ~ file: create.js ~ line 17 ~ createProject ~ project", project)
    //获取用户输入，选择的信息
  const { template, name, desc } = project;

  const spinner = ora("正在拉取框架...");
  spinner.start();
  download(template, name, { clone: true }, async function (err) {
    if (err) {
      red(err);
      spinner.text = red(`拉取失败. ${err}`)
      spinner.fail()
      process.exit(1);
    } else {
      spinner.text = green(`拉取成功...`)
      spinner.succeed()
      spinner.text = yellow('请稍等，. 正在替换package.json中的项目名称、描述...')
      const multiMeta={
        project_name: name,
        project_desc: desc
      }

      const multiFiles=[
        `${name}/package.json`
      ]
      // 用条件循环把模板字符替换到文件去
      for (var i = 0; i < multiFiles.length; i++) {
        // 这里记得 try {} catch {} 哦，以便出错时可以终止掉 Spinner
        try {
          // 等待读取文件
          const multiFilesContent = await fse.readFile(multiFiles[i], 'utf8')
          // 等待替换文件，handlebars.compile(原文件内容)(模板字符)
          const multiFilesResult = await handlebars.compile(multiFilesContent)(multiMeta)
          // 等待输出文件
          await fse.outputFile(multiFiles[i], multiFilesResult)
        } catch (err) {
          // 如果出错，Spinner 就改变文字信息
          spinner.text = red(`项目创建失败. ${err}`)
          // 终止等待动画并显示 X 标志
          spinner.fail()
          // 退出进程
          process.exit(1)
        }
      }
       // 如果成功，Spinner 就改变文字信息
       spinner.text = yellow(`项目已创建成功！`)
       // 终止等待动画并显示 ✔ 标志
       spinner.succeed()
    }
  });
}

module.exports = createProject