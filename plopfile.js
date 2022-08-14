module.exports = function (plop) {
    // create your generators here
    plop.setGenerator('view', {
        description: '开始快速创建页面及路由模板',
        prompts: [
            {
                type: 'input',
                name: 'name',
                message: '输入创建名称(一级菜单*)'
            },
            {
                type: 'input',
                name: 'children',
                message: '输入创建名称(二级菜单)'
            }
        ], // array of inquirer prompts
        actions: function (data) {
            let Viewpath = ''
            let Routerpath = ''
            let templateFile = ''
            let routerFile = ''
            if (data.children) {
                Viewpath = `src/pages/main/{{name}}/{{children}}/index.vue`
                Routerpath = `src/router/main/{{name}}/{{children}}.ts`
                templateFile = `plop-templates/view_2.hbs`
                routerFile = `plop-templates/router_2.hbs`
            } else {
                Viewpath = `src/pages/main/{{name}}/index.vue`
                Routerpath = `src/router/main/{{name}}/{{name}}.ts`
                templateFile = `plop-templates/view_1.hbs`
                routerFile = `plop-templates/router_1.hbs`
            }
            return [
                {
                    type: 'add',
                    path: Viewpath,
                    templateFile: templateFile
                },
                {
                    type: 'add',
                    path: Routerpath,
                    templateFile: routerFile
                }
            ]
        } // array of actions
    })
    plop.setGenerator('store', {
        description: '开始快速创建状态管理模板',
        prompts: [
            {
                type: 'input',
                name: 'name',
                message: '输入创建状态ID'
            }
        ],
        actions: function (data) {
            return [
                {
                    type: 'add',
                    path: 'src/store/{{name}}/index.ts',
                    templateFile: 'plop-templates/store.hbs'
                },
                {
                    type: 'add',
                    path: 'src/store/{{name}}/types.ts'
                }
            ]
        } // array of actions
    })
    plop.setGenerator('api', {
        description: '开始快速创建API模板',
        prompts: [
            {
                type: 'input',
                name: 'name',
                message: '输入创建API模块'
            }
        ],
        actions: function (data) {
            return [
                {
                    type: 'add',
                    path: 'src/api/{{name}}/index.ts',
                    templateFile: 'plop-templates/api.hbs'
                },
                {
                    type: 'add',
                    path: 'src/api/{{name}}/types.ts'
                }
            ]
        } // array of actions
    })
}
