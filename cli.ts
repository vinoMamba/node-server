import {program} from 'commander';

program
    .option('-f, --fileName <fileName>')
    .option('-p, --port <port>', 'Listen One Port')
    .option('-c, --cache <number>', 'Setting Cache-Control')
    .option('-p, --port <port>', 'listen one port');

program.parse(process.argv);