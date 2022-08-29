export * from './auth'
export * from './roles'
// export * from './users'
export * from './menus'

// （创建出）一个 context，其中所有文件都来自父文件夹及其所有子级文件夹，request 以 `api.ts` 结尾。
// const files = require.context('./', true, /api\.ts$/)
// console.log(files, 'filesfilesfiles')
// let ApiModel: any = {}
// files.keys().forEach((key: any) => {
//     const name = key.replace(/\.\/|\.ts/g, '')
//     ApiModel = { ...ApiModel, ...files(key) }
// })
// console.log(ApiModel)
