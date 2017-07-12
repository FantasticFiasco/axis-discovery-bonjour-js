import * as expect from '@fantasticfiasco/expect';
import * as bonjour from 'bonjour';
import * as events from 'events';

import { Device } from './';
import { log } from './Log';
import { mapFromService } from './Mappings';
import { getIPv4Addresses } from './NetworkInterface';

/**
 * Class responsible for discovering Axis cameras on the network.
 */
export class Discovery {

    private readonly eventEmitter = new events.EventEmitter();
    private bonjour?: bonjour.Bonjour;
    private browser?: bonjour.Browser;

    /**
     * Start listen for device advertisements on all network interface
     * addresses.
     */
    public start() {
        expect.toNotExist(this.bonjour, 'Discovery has already been started');
        expect.toNotExist(this.browser, 'Discovery has already been started');

        log('Discovery#start');

        this.setup();
    }

    /**
     * Stop listening for device advertisements.
     */
    public stop() {
        expect.toExist(this.bonjour, 'Discovery has not been started');
        expect.toExist(this.browser, 'Discovery has not been started');

        log('Discovery#stop');

        this.teardown();
    }

    /**
     * Triggers a new search for devices on the network.
     */
    public search() {
        expect.toExist(this.browser, 'Discovery has not been started');

        log('Discovery#search');

        (this.browser as bonjour.Browser).update();
    }

    /**
     * Register a callback that is invoked when a device is found on the
     * network.
     */
    public onHello(callback: (device: Device) => void) {
        this.eventEmitter.on('hello', (device: Device) => callback(device));
    }

    /**
     * Register a callback that is invoked when a device intentionally is
     * disconnecting from the network.
     */
    public onGoodbye(callback: (device: Device) => void) {
        this.eventEmitter.on('goodbye', (device: Device) => callback(device));
    }

    private onUp(service: bonjour.Service) {
        log('Discovery#onUp - %s', service.host);

        const device = mapFromService(service);
        if (device) {
            this.eventEmitter.emit('hello', device);
        } else {
            log('Discovery#onUp - unable to map %o', service);
        }
    }

    private onDown(service: bonjour.Service) {
        log('Discovery#onDown - %s', service.host);

        const device = mapFromService(service);
        if (device) {
            this.eventEmitter.emit('goodbye', device);
        } else {
            log('Discovery#onDown - unable to map %o', service);
        }
    }

    private setup() {
        const addresses = getIPv4Addresses();
        log('Discovery#setup - interface addresses: %o', addresses);

        // The type definitions are not in sync with the fork of Bonjour I am
        // depending on, that's why we have to go to the dark side
        const untypedBonjour: any = bonjour;
        this.bonjour =  untypedBonjour({ interface: addresses }) as bonjour.Bonjour;

        this.browser = this.bonjour.find({ type: 'axis-video' });
        this.browser.on('up', (service: bonjour.Service) => this.onUp(service));
        this.browser.on('down', (service: bonjour.Service) => this.onDown(service));
    }

    private teardown() {
        (this.browser as bonjour.Browser).removeAllListeners('up');
        (this.browser as bonjour.Browser).removeAllListeners('down');
        (this.browser as bonjour.Browser).stop();
        this.browser = undefined;

        (this.bonjour as bonjour.Bonjour).destroy();
        this.bonjour = undefined;
    }
}
