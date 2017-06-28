import * as bonjour from 'bonjour';

import { Device } from './Device';

export class DeviceMapper {

    private static linkLocalPrefix = '169.254';

    /**
     * Maps from a Bonjour service to a device.
     */
    public fromService(service: any): Device | undefined {
        // Some of the properties of a service are not exposed by the Bonjour type definitions.
        // Because of this we have to regress back to JavaScript and work with these properties
        // untyped.
        const typedService = service as bonjour.Service;
        if (!typedService) {
            return undefined;
        }

        const addresses = this.getAddresses(service);
        if (!addresses) {
            return undefined;
        }

        const address = this.getAddress(addresses);
        if (!address) {
            return undefined;
        }

        const linkLocalAddress = this.getLinkLocalAddress(addresses);
        if (!linkLocalAddress) {
            return undefined;
        }

        const macAddress = this.getMacAddress(service);
        if (!macAddress) {
            return undefined;
        }

        return new Device(
            address,
            linkLocalAddress,
            typedService.port,
            macAddress,
            typedService.name);
    }

    private getAddresses(service: any): string[] | undefined {
        if (!service.addresses) {
            return undefined;
        }

        return service.addresses as string[];
    }

    private getAddress(addresses: string[]): string | undefined {
        return addresses.find((value) => !value.startsWith(DeviceMapper.linkLocalPrefix));
    }

    private getLinkLocalAddress(addresses: string[]): string | undefined {
        return addresses.find((value) => value.startsWith(DeviceMapper.linkLocalPrefix));
    }

    private getMacAddress(service: any): string | undefined {
        if (!service.txt || !service.txt.macaddress) {
            return undefined;
        }

        return service.txt.macaddress as string;
    }
}
