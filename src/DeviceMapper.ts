import * as bonjour from 'bonjour';

import { Device } from './Device';

export class DeviceMapper {

    private static linkLocalPrefix = '169.254';

    /**
     * Maps from a Bonjour service to a device.
     */
    public fromService(service: bonjour.Service): Device | undefined {
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
            service.port,
            macAddress.toUpperCase(),
            service.name);
    }

    private getAddresses(service: any): string[] | undefined {
        if (!service.addresses ||
            service.addresses instanceof Array === false) {
            return undefined;
        }

        for (const address of service.addresses) {
            if (typeof address !== 'string') {
                return undefined;
            }
        }

        return service.addresses;
    }

    private getAddress(addresses: string[]): string | undefined {
        return addresses.find((address) => !address.startsWith(DeviceMapper.linkLocalPrefix));
    }

    private getLinkLocalAddress(addresses: string[]): string | undefined {
        return addresses.find((address) => address.startsWith(DeviceMapper.linkLocalPrefix));
    }

    private getMacAddress(service: any): string | undefined {
        if (!service.txt ||
            !service.txt.macaddress ||
            typeof service.txt.macaddress !== 'string') {
            return undefined;
        }

        return service.txt.macaddress;
    }
}
