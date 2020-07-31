module.exports = () => {
    var argv = require('yargs')
        .command('environment', function (yargs) {
            yargs.options({
                location: {
                    demand: true,
                    alias: 'e',
                    type: 'string'
                }
            });
        })
        .help('help')
        .argv;        
    envFileName = argv.e;        
    require('dotenv').config({ path: ".env." + envFileName });
}