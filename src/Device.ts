/**
 * Class describing a device on the network.
 */
export class Device {
    constructor(
        /**
         * The address.
         */
        readonly address: string,
        /**
         * The serial number.
         */
        readonly serialNumber: string | undefined) {
        }
}
