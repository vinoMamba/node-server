const argv = require('minimist')(process.argv.slice(2));
const param = {
    filePath: '',
    cacahe: 365,
    address: '127.0.0.1'
}
if (argv._.length === 0) {
    showHelpMessage()
} else {
    param.filePath = argv._[0]
}
//帮助信息
function showHelpMessage() {
    console.log(
        `options:
  -p --port    Setting Port [8080]
  -a --address Setting Address [0.0.0.0]
  -c --cache   Setting Cache-Control [365]
  -h --help    Get Help`
    )
}
export default param