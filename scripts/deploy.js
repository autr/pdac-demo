import ghpages from 'gh-pages'

ghpages.publish(
    '__sapper__/export/pdac-demo',
    {
        branch: 'master',
        repo: 'https://github.com/autr/pdac-demo.git',
        user: {
            name: 'autr',
            email: '<your-github-email>'
        }
    },
    () => {
        console.log('Deploy Complete!')
    }
)