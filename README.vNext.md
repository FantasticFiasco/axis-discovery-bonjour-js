# axis-discovery-bonjour

[![Build Status](https://travis-ci.org/FantasticFiasco/axis-discovery-bonjour.svg?branch=master)](https://travis-ci.org/FantasticFiasco/axis-discovery-bonjour)
[![Coverage Status](https://coveralls.io/repos/github/FantasticFiasco/axis-discovery-bonjour/badge.svg)](https://coveralls.io/github/FantasticFiasco/axis-discovery-bonjour)
[![npm version](https://img.shields.io/npm/v/axis-discovery-bonjour.svg)](https://www.npmjs.com/package/axis-discovery-bonjour)
[![Greenkeeper badge](https://badges.greenkeeper.io/FantasticFiasco/axis-discovery-bonjour.svg)](https://greenkeeper.io/)
[![dependencies Status](https://david-dm.org/FantasticFiasco/axis-discovery-bonjour/status.svg)](https://david-dm.org/FantasticFiasco/axis-discovery-bonjour)
[![devDependencies Status](https://david-dm.org/FantasticFiasco/axis-discovery-bonjour/dev-status.svg)](https://david-dm.org/FantasticFiasco/axis-discovery-bonjour?type=dev)

A Node.js Bonjour client library written in TypeScript capable of searching for [Axis Communication](http://www.axis.com) cameras.

## Table of contents

- [Super simple to use](#super-simple-to-use)
- [Installation](#installation)
- [API](#api)
- [Credit](#credit)

---

## Super simple to use

```javascript
import * as bonjour from 'axis-discovery-bonjour';

const discovery = new bonjour.Discovery();

discovery.onHello((device: bonjour.Device) => {
    console.log(`Hello from ${device.address}`);
});

discovery.onGoodbye((device: bonjour.Device) => {
    console.log(`Goodbye from ${device.address}`);
});

discovery.start();
discovery.search();
```

## Installation

```sh
npm install axis-discovery-bonjour
```

## API

### `Discovery`

The `Discovery` class is the main class in the package. With it you can register for changes to cameras on the network and respond accordingly when a camera is found on, or intentionally disconnects from, the network.

```javascript
class Discovery {
    /**
     * Start listen for Bonjour advertisements on all network interface addresses.
     */
    start(): void;

    /**
     * Stop listening for Bonjour advertisements.
     */
    stop(): void;

    /**
     * Triggers a new Bonjour search for devices on the network.
     */
    search(): void;

    /**
     * Register a callback that is invoked when a device is found on the network.
     */
    onHello(callback: (device: Device) => void): void;

    /**
     * Register a callback that is invoked when a device intentionally is disconnecting from the
     * network.
     */
    onGoodbye(callback: (device: Device) => void): void;
}
```

### `Device`

The `Device` class is a immutable description of a camera on the network.

```javascript
class Device {
    /**
     * The address.
     */
    readonly address: string;

    /**
     * The link local address.
     * For more information regarding link local addresses, please see
     * [here]{@link https://wikipedia.org/wiki/Link-local_address}.
     */
    readonly linkLocalAddress: string;

    /**
     * The port.
     */
    readonly port: number;

    /**
     * The MAC address. In most situations this is identical to the serial number. The
     * exceptions are the Axis products which bundle multiple physical devices into a single
     * casing with a shared network interface. Because of the shared network interface they
     * also share the same MAC address.
     */
    readonly macAddress: string;

    /**
     * The short description for the end user.
     */
    readonly friendlyName: string;
}
```

## Credit

Thank you [JetBrains](https://www.jetbrains.com/) for your important initiative to support the open source community with free licenses to your products.

![JetBrains](./doc/resources/jetbrains.png)
