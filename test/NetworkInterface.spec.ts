import { networkInterfaces } from 'os';

import { getIPv4Addresses } from './../src/NetworkInterface';
import * as mocks from './NetworkInterface.mock';

describe('NetworkInterface', () => {

    describe('#getIPv4Addresses', () => {

        beforeAll(() => {
            jest.mock('os');

        });

        test('should return addresses from one network interface', () => {
            // Arrange
            const networkInterfacesMock: any = networkInterfaces;
            networkInterfacesMock.mockResolvedValue(mocks.NETWORK_INTERFACE_WITH_TWO_ADDRESSES);

            // Act
            const addresses = getIPv4Addresses();

            // Assert
            expect(addresses).toEqual(['1.1.1.1', '2.2.2.2']);
        });

        test('should return addresses from multiple network interfaces', () => {
            // Arrange
            const networkInterfacesMock: any = networkInterfaces;
            networkInterfacesMock.mockResolvedValue(mocks.NETWORK_INTERFACES_WITH_TWO_ADDRESSES);

            // Act
            const addresses = getIPv4Addresses();

            // Assert
            expect(addresses).toEqual(['1.1.1.1', '2.2.2.2']);
        });

        test('should not return internal addresses', () => {
            // Arrange
            const networkInterfacesMock: any = networkInterfaces;
            networkInterfacesMock.mockResolvedValue(mocks.NETWORK_INTERFACES_WITH_INTERNAL_ADDRESSES);

            // Act
            const addresses = getIPv4Addresses();

            // Assert
            expect(Object.keys(addresses)).toHaveLength(0);
        });

        test('should not return IPv6 addresses', () => {
            // Arrange
            const networkInterfacesMock: any = networkInterfaces;
            networkInterfacesMock.mockResolvedValue(mocks.NETWORK_INTERFACES_WITH_IPV6_ADDRESSES);

            // Act
            const addresses = getIPv4Addresses();

            // Assert
            expect(Object.keys(addresses)).toHaveLength(0);
        });

        test('should not fail on systems without network interfaces', () => {
            // Arrange
            const networkInterfacesMock: any = networkInterfaces;
            networkInterfacesMock.mockResolvedValue(mocks.NO_NETWORK_INTERFACES);

            // Act
            const addresses = getIPv4Addresses();

            // Assert
            expect(Object.keys(addresses)).toHaveLength(0);
        });
    });
});
