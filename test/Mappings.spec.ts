import * as chai from 'chai';

import { Device } from './../src/';
import { mapFromService } from './../src/Mappings';
import { AxisService } from './AxisService';

const should = chai.should();

describe('when mapping to device', () => {

    describe('#fromService', () => {

        it('should map service to device', function() {
            // Arrange
            const service = new AxisService(
                [ '192.168.1.102', '169.254.129.36' ],
                'Lobby',
                80,
                'ACCC8E270AD8');

            // Act
            const actual = mapFromService(service);

            // Assert
            should.exist(actual);
            (actual as Device).address.should.equal('192.168.1.102');
            (actual as Device).linkLocalAddress.should.equal('169.254.129.36');
            (actual as Device).port.should.equal(80);
            (actual as Device).macAddress.should.equal('ACCC8E270AD8');
            (actual as Device).friendlyName.should.equal('Lobby');
        });

        it('should not map service without addressses', function() {
            // Arrange
            const service = new AxisService(
                [],
                'Lobby',
                80,
                'ACCC8E270AD8');

            // Act
            const actual = mapFromService(service);

            // Assert
            should.not.exist(actual);
        });

        it('should not map service without address', function() {
            // Arrange
            const service = new AxisService(
                [ '169.254.129.36' ],    // Only link local address
                'Lobby',
                80,
                'ACCC8E270AD8');

            // Act
            const actual = mapFromService(service);

            // Assert
            should.not.exist(actual);
        });

        it('should not map service without link local address', function() {
            // Arrange
            const service = new AxisService(
                [ '192.168.1.102' ],     // Only address
                'Lobby',
                80,
                'ACCC8E270AD8');

            // Act
            const actual = mapFromService(service);

            // Assert
            should.not.exist(actual);
        });

        it('should map service with MAC address in lower letters', function() {
            // Arrange
            const service = new AxisService(
                [ '192.168.1.102', '169.254.129.36' ],
                'Lobby',
                80,
                'accc8e270ad8');

            // Act
            const actual = mapFromService(service);

            // Assert
            should.exist(actual);
            (actual as Device).macAddress.should.equal('ACCC8E270AD8');
        });

        it('should not map service without MAC address', function() {
            // Arrange
            const service = new AxisService(
                [ '192.168.1.102', '169.254.129.36' ],
                'Lobby',
                80,
                undefined);

            // Act
            const actual = mapFromService(service);

            // Assert
            should.not.exist(actual);
        });
    });
});
