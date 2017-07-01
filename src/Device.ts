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
         * The link local address.
         * For more information regarding link local addresses, please see
         * [here]{@link https://wikipedia.org/wiki/Link-local_address}.
         */
        readonly linkLocalAddress: string,
        /**
         * The port.
         */
        readonly port: number,
        /**
         * The MAC address. In most situations this is identical to the serial number. The
         * exceptions are the Axis products which bundle multiple physical devices into a single
         * casing with a shared network interface. Because of the shared network interface they
         * also share the same MAC address.
         */
        readonly macAddress: string,
        /**
         * The short description for the end user.
         */
        readonly friendlyName: string) {
    }
}
