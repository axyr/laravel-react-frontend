const pluralize = require('pluralize')

module.exports = function (plop) {

    plop.setHelper('dollarVar', function (varName) {
        // This is a bit ugly, but allows to add variables in templates.
        // Could not find another way to play nice with handlebars.
        return '${' + varName
    })

    plop.setGenerator('crud', {
        description: 'Generate CRUD module files',
        prompts: [
            {
                type: 'input',
                name: 'name',
                message: 'Singular resource name (e.g. post, user):',
            },
        ],
        actions: function (input) {
            const singular = input.name.toLowerCase()
            const plural = pluralize(singular)
            const data = {
                singular,
                plural,
                Singular: capitalize(singular),
                Plural: capitalize(plural),
            }

            return [
                {
                    type: 'add',
                    path: `app/routes/${plural}/api.ts`,
                    templateFile: 'app/core/plop/templates/crud/api.ts.hbs',
                    data,
                },
                {
                    type: 'add',
                    path: `app/routes/${plural}/types.d.ts`,
                    templateFile: 'app/core/plop/templates/crud/types.d.ts.hbs',
                    data,
                },
                {
                    type: 'add',
                    path: `app/routes/${plural}/routes.ts`,
                    templateFile: 'app/core/plop/templates/crud/routes.ts.hbs',
                    data,
                },
                {
                    type: 'add',
                    path: `app/routes/${plural}/table-columns.tsx`,
                    templateFile: 'app/core/plop/templates/crud/table-columns.tsx.hbs',
                    data,
                },
                {
                    type: 'add',
                    path: `app/routes/${plural}/${singular}-create.tsx`,
                    templateFile: 'app/core/plop/templates/crud/resource-create.tsx.hbs',
                    data,
                },
                {
                    type: 'add',
                    path: `app/routes/${plural}/${singular}-edit.tsx`,
                    templateFile: 'app/core/plop/templates/crud/resource-edit.tsx.hbs',
                    data,
                },
                {
                    type: 'add',
                    path: `app/routes/${plural}/${plural}.tsx`,
                    templateFile: 'app/core/plop/templates/crud/resources.tsx.hbs',
                    data,
                },
                {
                    type: 'modify',
                    path: 'app/config/nav-items.ts',
                    pattern: /(export const mainNavItems: NavItem\[\] = \[[\s\S]*?)(\n\s*])/,
                    template: `$1\n    {
        title: '{{Plural}}',
        to: '/{{plural}}',
        icon: LayoutGrid,
    },$2`,
                    data,
                },
                {
                    type: 'modify',
                    path: 'app/routes/routes.ts',
                    pattern: /(\n)(?=export default)/,
                    template: `import { {{plural}}Routes } from './routes/{{plural}}/routes';$1`,
                    data,
                }
            ]
        },
    })
}

function capitalize(str) {
    return str.charAt(0).toUpperCase() + str.slice(1)
}