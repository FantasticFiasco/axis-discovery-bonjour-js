import * as events from 'events';

import { Device } from './';

export class Discovery {

    private readonly eventEmitter = new events.EventEmitter();

    /**
     * Start listen for Bonjour advertisements on all network interface addresses.
     */
    public async start(): Promise<void> {
        throw new Error('Not implemented!');
    }

    /**
     * Stop listening for Bonjour advertisements.
     */
    public async stop(): Promise<void> {
        throw new Error('Not implemented!');
    }

    /**
     * Triggers a new Bonjour search for devices on the network.
     */
    public async search(): Promise<void> {
        throw new Error('Not implemented!');
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
}
