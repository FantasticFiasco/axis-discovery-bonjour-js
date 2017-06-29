import * as bonjour from 'bonjour';
import * as events from 'events';

export class AxisService extends events.EventEmitter implements bonjour.Service {
    constructor(addresses: string[], name: string, port: number, macAddress: string| undefined) {
        super();

        this.addresses = addresses;
        this.name = name;
        this.port = port;

        if (macAddress) {
            this.txt = {
                macaddress: macAddress
            };
        } else {
            this.txt = {}
        }
    }

    addresses: string[];
    name: string;
    type: string = 'axis-video';
    subtypes: string[] = [];
    protocol: string = 'udp';
    host: string = '';
    port: number;
    fqdn: string = '';
    txt: Object;
    published: boolean = true;

    stop(_: () => any): void {}
    start(): void {}
}
