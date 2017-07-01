import * as expect from '@fantasticfiasco/expect';
import * as bonjour from 'bonjour';
import * as events from 'events';

import { Device } from './';
import { DeviceMapper } from './DeviceMapper';

/**
 * Class responsible for discovering Axis cameras on the network.
 */
export class Discovery {

    private readonly eventEmitter = new events.EventEmitter();
    private readonly deviceMapper = new DeviceMapper();
    private bonjour?: bonjour.Bonjour;
    private browser?: bonjour.Browser;

    /**
     * Start listen for Bonjour advertisements on all network interface addresses.
     */
    public start() {
        expect.toNotExist(this.bonjour, 'Discovery has already been started');
        expect.toNotExist(this.browser, 'Discovery has already been started');

        this.bonjour = bonjour();

        this.browser = this.bonjour.find({ type: 'axis-video' });
        this.browser.on('up', (service: bonjour.Service) => this.onUp(service));
        this.browser.on('down', (service: bonjour.Service) => this.onDown(service));
    }

    /**
     * Stop listening for Bonjour advertisements.
     */
    public stop() {
        expect.toExist(this.bonjour, 'Discovery has not been started');
        expect.toExist(this.browser, 'Discovery has not been started');

        (this.browser as bonjour.Browser).stop();
        (this.bonjour as bonjour.Bonjour).destroy();

        this.browser = undefined;
        this.bonjour = undefined;
    }

    /**
     * Triggers a new Bonjour search for devices on the network.
     */
    public search() {
        expect.toExist(this.browser, 'Discovery has not been started');

        (this.browser as bonjour.Browser).update();
    }

    /**
     * Register a callback that is invoked when a device is found on the network.
     */
    public onHello(callback: (device: Device) => void) {
        this.eventEmitter.on('hello', (device: Device) => callback(device));
    }

    /**
     * Register a callback that is invoked when a device intentionally is disconnecting from the
     * network.
     */
    public onGoodbye(callback: (device: Device) => void) {
        this.eventEmitter.on('goodbye', (device: Device) => callback(device));
    }

    private onUp(service: bonjour.Service) {
        const device = this.deviceMapper.fromService(service);
        if (device) {
            this.eventEmitter.emit('hello', device);
        }
    }

    private onDown(service: bonjour.Service) {
        const device = this.deviceMapper.fromService(service);
        if (device) {
            this.eventEmitter.emit('goodbye', device);
        }
    }
}
