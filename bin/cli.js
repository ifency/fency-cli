#! /usr/bin/env node

const { program } = require('commander')
const package=require('../package.json')


//获取package.json的版本号
program.version(package.version,'-v, --version', '获取当前版本号')

//解析命令行的指令
program.parse(process.argv)