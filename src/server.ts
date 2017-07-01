import { Device, Discovery } from './';

const discovery = new Discovery();

discovery.onHello((device: Device) => {
    console.log(`${new Date().toLocaleTimeString()} - Hello from ${device.serialNumber} on ${device.address}`);
});

discovery.onGoodbye((device: Device) => {
    console.log(`${new Date().toLocaleTimeString()} - Goodbye from ${device.serialNumber} on ${device.address}`);
});

discovery.start()
    .then(() => discovery.search());
