const chalk=require('chalk')
// import chalk from 'chalk'

const colors=['green','blue','yellow','red','white']

const myChalk={}

colors.forEach(color=>{
  myChalk[color]=function(text,isConsole=true){
    return isConsole ? console.log(chalk[color](text)):chalk[color](text)
  }
})


module.exports = myChalk