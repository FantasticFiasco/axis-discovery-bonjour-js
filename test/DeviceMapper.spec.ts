import * as chai from 'chai';

import { Device } from './../src/';
import { DeviceMapper } from './../src/DeviceMapper';

const should = chai.should();

describe('when mapping to device', () => {

    const deviceMapper = new DeviceMapper();

    describe('#fromService', () => {

        it('should map service to device', function() {
            // Arrange
            const service = {
                addresses: [ '192.168.1.102', '169.254.129.36' ],
                name: 'Lobby',
                port: 80,
                txt: { macaddress: 'ACCC8E270AD8' },
            };

            // Act
            const actual = deviceMapper.fromService(service);

            // Assert
            should.exist(actual);
            (actual as Device).address.should.equal('192.168.1.102');
            (actual as Device).linkLocalAddress.should.equal('169.254.129.36');
            (actual as Device).port.should.equal(80);
            (actual as Device).macAddress.should.equal('ACCC8E270AD8');
            (actual as Device).friendlyName.should.equal('Lobby');
        });

        it('should not map object not being a service', function() {
            // Arrange
            const service = {
                // Missing the 'name' property expected on 'bonjour.Service'
                port: 80
            };

            // Act
            const actual = deviceMapper.fromService(service);

            // Assert
            should.not.exist(actual);
        });

        it('should not map service without addressses', function() {
            // Arrange
            const service = {
                name: 'Lobby',
                port: 80,
                txt: { macaddress: 'ACCC8E270AD8' },
            };

            // Act
            const actual = deviceMapper.fromService(service);

            // Assert
            should.not.exist(actual);
        });

        it('should not map service with addressses of wrong type', function() {
            // Arrange
            const service = {
                addresses: [ 1, 2 ],
                name: 'Lobby',
                port: 80,
                txt: { macaddress: 'ACCC8E270AD8' },
            };

            // Act
            const actual = deviceMapper.fromService(service);

            // Assert
            should.not.exist(actual);
        });

        it('should not map service with empty addressses', function() {
            // Arrange
            const service = {
                addresses: [ ],
                name: 'Lobby',
                port: 80,
                txt: { macaddress: 'ACCC8E270AD8' },
            };

            // Act
            const actual = deviceMapper.fromService(service);

            // Assert
            should.not.exist(actual);
        });

        it('should not map service without address', function() {
            // Arrange
            const service = {
                addresses: [ '169.254.129.36' ],
                name: 'Lobby',
                port: 80,
                txt: { macaddress: 'ACCC8E270AD8' },
            };

            // Act
            const actual = deviceMapper.fromService(service);

            // Assert
            should.not.exist(actual);
        });

        it('should not map service without link local address', function() {
            // Arrange
            const service = {
                addresses: [ '192.168.1.102' ],
                name: 'Lobby',
                port: 80,
                txt: { macaddress: 'ACCC8E270AD8' },
            };

            // Act
            const actual = deviceMapper.fromService(service);

            // Assert
            should.not.exist(actual);
        });

        it('should not map service without MAC address', function() {
            // Arrange
            const service = {
                addresses: [ '192.168.1.102', '169.254.129.36' ],
                name: 'Lobby',
                port: 80,
                txt: { },
            };

            // Act
            const actual = deviceMapper.fromService(service);

            // Assert
            should.not.exist(actual);
        });

        it('should not map service with MAC address of wrong type', function() {
            // Arrange
            const service = {
                addresses: [ '192.168.1.102', '169.254.129.36' ],
                name: 'Lobby',
                port: 80,
                txt: { macaddress: 1 },
            };

            // Act
            const actual = deviceMapper.fromService(service);

            // Assert
            should.not.exist(actual);
        });
    });
});
