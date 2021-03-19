import { OptionValues } from 'commander';
import { startServer } from './index';

import { Command } from 'commander';
const program = new Command();
program.version('0.0.1');
type Params = {
    filePath: string,
    cache: string,
    port: string
}
const params: Params = {
    filePath: '',
    cache: '',
    port: ''
};
program
    .option('-p, --port<number>', 'Setting Port')
    .option('-c, --cache<number>', 'Setting Cache-Control')
    .arguments('<filePath>')
    .action((filePath) => {
        params.filePath = filePath;
    });
program.parse(process.argv);

const options: OptionValues = program.opts();
params.port = options['port<number>'];
params.cache = options['cache<number>'];

startServer(params);