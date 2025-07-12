const pluralize = require('pluralize');

module.exports = function (plop) {
    plop.setHelper('dollarVar', function (varName) {
        return '${' + varName;
    });

    plop.setGenerator('crud', {
        description: 'Generate CRUD module files',
        prompts: [
            {
                type: 'input',
                name: 'name',
                message: 'Singular resource name (e.g. post, user, DataSource):',
            },
        ],
        actions: function (input) {
            const pascalSingular = capitalize(input.name)
            const pascalPlural = pluralize(pascalSingular)

            const kebabSingular = toKebabCase(pascalSingular)
            const kebabPlural = pluralize(kebabSingular)

            const camelSingular = toCamelCase(pascalSingular)
            const camelPlural = pluralize(camelSingular)

            const titleSingular = humanize(pascalSingular)
            const titlePlural = humanize(pascalPlural)

            const data = {
                kebabSingular,
                kebabPlural,
                pascalSingular,
                pascalPlural,
                camelSingular,
                camelPlural,
                titleSingular,
                titlePlural,
            }

            return [
                {
                    type: 'add',
                    path: `app/routes/${kebabPlural}/api.ts`,
                    templateFile: 'app/core/plop/templates/crud/api.ts.hbs',
                    data,
                },
                {
                    type: 'add',
                    path: `app/routes/${kebabPlural}/types.d.ts`,
                    templateFile: 'app/core/plop/templates/crud/types.d.ts.hbs',
                    data,
                },
                {
                    type: 'add',
                    path: `app/routes/${kebabPlural}/routes.ts`,
                    templateFile: 'app/core/plop/templates/crud/routes.ts.hbs',
                    data,
                },
                {
                    type: 'add',
                    path: `app/routes/${kebabPlural}/table-columns.tsx`,
                    templateFile: 'app/core/plop/templates/crud/table-columns.tsx.hbs',
                    data,
                },
                {
                    type: 'add',
                    path: `app/routes/${kebabPlural}/${kebabSingular}-create.tsx`,
                    templateFile: 'app/core/plop/templates/crud/resource-create.tsx.hbs',
                    data,
                },
                {
                    type: 'add',
                    path: `app/routes/${kebabPlural}/${kebabSingular}-edit.tsx`,
                    templateFile: 'app/core/plop/templates/crud/resource-edit.tsx.hbs',
                    data,
                },
                {
                    type: 'add',
                    path: `app/routes/${kebabPlural}/${kebabPlural}.tsx`,
                    templateFile: 'app/core/plop/templates/crud/resources.tsx.hbs',
                    data,
                },
                {
                    type: 'modify',
                    path: 'app/config/nav-items.ts',
                    pattern: /(export const mainNavItems: NavItem\[\] = \[[\s\S]*?)(\n\s*])/,
                    template: `$1\n    {
        title: '{{titlePlural}}',
        to: '/{{kebabPlural}}',
        icon: LayoutGrid,
    },$2`,
                    data,
                },
                {
                    type: 'modify',
                    path: 'app/routes.ts',
                    pattern: /(\n)(?=export default)/,
                    template: `\nimport { {{camelSingular}}Routes } from './routes/{{kebabPlural}}/routes'$1`,
                    data,
                },
                {
                    type: 'modify',
                    path: 'app/routes.ts',
                    pattern: /(layout\('core\/layouts\/authenticated-layout\.tsx', \[\n(?:.*\n)*?)(\s*\]\))/,
                    template: `$1        ...{{camelSingular}}Routes,\n$2`,
                    data,
                }
            ];
        },
    });
};


function capitalize(str) {
    return str.charAt(0).toUpperCase() + str.slice(1)
}

function toKebabCase(str) {
    return str
        .replace(/([a-z])([A-Z])/g, '$1-$2')
        .replace(/[\s_]+/g, '-')
        .toLowerCase()
}

function toCamelCase(str) {
    const s = str.replace(/[-_\s]+(.)?/g, (_, c) => (c ? c.toUpperCase() : ''))
    return s.charAt(0).toLowerCase() + s.slice(1)
}

function humanize(str) {
    return str.replace(/([a-z])([A-Z])/g, '$1 $2')
}