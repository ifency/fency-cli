
const execa = require('execa')
const ora = require('ora')
const spinner = ora('git pushing...\n')
const myChalk = require('../utils/chalk')

const { red, green } =myChalk

async function push(gitRemote) {
  const runCMD = (command, args) => {
    if (!args) {
      [command, ...args] = command.split(/\s+/);
    }
    return execa(command, args).catch((err) => {
      spinner.fail(
        red(
          "推送失败，请检查远程仓库地址对不对"
        )
      );
    });
  };
  await runCMD("echo unicorns");
  await runCMD("git init");
  await runCMD(`git remote add origin ${gitRemote}`);
  await runCMD("git add .");
  await runCMD("git commit -m init");
  spinner.start();
  await runCMD("git push origin master").then((res) => {
    if (res) {
      spinner.stop();
      console.log();
      console.log(
        green(
          "  🎉  推送成功辣～\n" +
            "  \n" +
            "  😀  可以愉快开始打码，愿神兽保佑你，写的代码永无bug\n"
        )
      );
    }
  });
}

module.exports = {
    push
}