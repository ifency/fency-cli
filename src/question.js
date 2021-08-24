
const fse=require('fs-extra')

const create = [
  {
      name:'conf',
      type:'confirm',
      message:'🆕 是否创建新的项目？'
  },{
      name:'name',
      message:'👉 请输入项目名称:',
      validate:function(val){
        if(!val){
          return '亲，你忘了输入项目的名称哦～'
        }
        if(fse.existsSync(val)){
          return '当前目录已存在同名的项目，请更换项目名'
        }
        return true
      },
      when: res => Boolean(res.conf)
  },{
    name:'desc',
    message:'💬 请输入项目的描述:',
    when:res=>Boolean(res.conf)
  },{
      name:'template',
      type:'list',
      message:'🔜 请选择一个框架?',
      choices:[
        {
          key:'a',
          name:'普通通用框架',
          value:'', //前台通用框架的git地址
        },
        {
          key:'b',
          name:'中后台通用框架',
          value:'', //中后台的通用框架git地址
        }
      ],
      filter:function(val){
        return val.toLowerCase()
      },
      when: res =>{
        // console.log("🚀 ~ file: question.js ~ line 47 ~ res", res)
        Boolean(res.conf)
      } 
  }
]

const git=[
  {
    name:'username',
    type:'input',
    message:'请输入您的gitlab邮箱地址:',
    validate:function(val){
      if(!val){
        return '亲，请输入您的邮箱地址哦，不然访问不到～'
      }
      return true
    }
  },
  {
    name:'password',
    type:'password',
    message:'请输入您的密码:',
    validate:function(val){
      if(!val){
        return '亲，您还没输入你的密哦～'
      }
      return true
    },
    // when: res => Boolean(res.conf)
  }
]
const pushGit=[
  {
    name:'url',
    type:'input',
    message:'🌲 请输入远程仓库的地址:',
  }
]

module.exports={
  create,
  git,
  pushGit
}