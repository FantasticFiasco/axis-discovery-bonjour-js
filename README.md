# axis-discovery-bonjour

[![Build Status](https://travis-ci.org/FantasticFiasco/axis-discovery-bonjour-js.svg?branch=master)](https://travis-ci.org/FantasticFiasco/axis-discovery-bonjour-js)
[![Coverage Status](https://coveralls.io/repos/github/FantasticFiasco/axis-discovery-bonjour-js/badge.svg)](https://coveralls.io/github/FantasticFiasco/axis-discovery-bonjour-js)
[![npm version](https://img.shields.io/npm/v/axis-discovery-bonjour.svg)](https://www.npmjs.com/package/axis-discovery-bonjour)
[![dependencies Status](https://david-dm.org/FantasticFiasco/axis-discovery-bonjour-js/status.svg)](https://david-dm.org/FantasticFiasco/axis-discovery-bonjour-js)
[![devDependencies Status](https://david-dm.org/FantasticFiasco/axis-discovery-bonjour-js/dev-status.svg)](https://david-dm.org/FantasticFiasco/axis-discovery-bonjour-js?type=dev)

A Node.js Bonjour client library written in TypeScript capable of searching for [Axis Communication](http://www.axis.com) cameras.

To also find cameras on the network using SSDP (UPnP), please see [axis-discovery](https://github.com/FantasticFiasco/axis-discovery-js).

## Table of contents

- [Super simple to use](#super-simple-to-use)
- [Installation](#installation)
- [Family of packages](#family-of-packages)
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
# or
yarn add axis-discovery-bonjour
```

## Family of packages

The following NPM packages have been created to provide a smooth experience with devices from Axis Communications.

- [axis-discovery](https://github.com/FantasticFiasco/axis-discovery-js) - A Node.js client library written in TypeScript capable of searching for Axis Communication cameras using Bonjour and SSDP (UPnP).
    - `axis-discovery-bonjour` - This package
    - [axis-discovery-ssdp](https://github.com/FantasticFiasco/axis-discovery-ssdp-js) - A Node.js SSDP (UPnP) client library written in TypeScript capable of searching for Axis Communication cameras.
- [axis-configuration](https://github.com/FantasticFiasco/axis-configuration-js) - A Node.js library written in TypeScript capable of configuring Axis Communication cameras.


## API

### `Discovery`

The `Discovery` class is the main class in the package. With it you can register for changes to cameras on the network and respond accordingly when a camera is found on, or intentionally disconnects from, the network.

```javascript
class Discovery {
    /**
     * Start listen for device advertisements on all network interface
     * addresses.
     */
    start(): void;

    /**
     * Stop listening for device advertisements.
     */
    stop(): void;

    /**
     * Triggers a new search for devices on the network.
     */
    search(): void;

    /**
     * Register a callback that is invoked when a device is found on the
     * network.
     */
    onHello(callback: (device: Device) => void): void;

    /**
     * Register a callback that is invoked when a device intentionally is
     * disconnecting from the network.
     */
    onGoodbye(callback: (device: Device) => void): void;
}
```

### `Device`

The `Device` class is a immutable description of a camera on the network.

```javascript
/**
 * Class describing a device on the network.
 */
class Device {
    /**
     * Gets the address.
     */
    readonly address: string;

    /**
     * Gets the link local address.
     * For more information regarding link local addresses, please see
     * [Wikipedia]{@link https://wikipedia.org/wiki/Link-local_address}.
     */
    readonly linkLocalAddress: string;

    /**
     * Gets the port.
     */
    readonly port: number;

    /**
     * Gets the MAC address. In most situations this is identical to the
     * serial number. The exceptions are the Axis products which bundle
     * multiple physical devices into a single casing with a shared network
     * interface. Because of the shared network interface they also share
     * the same MAC address.
     */
    readonly macAddress: string;

    /**
     * Gets the short description for the end user.
     */
    readonly friendlyName: string;
}

```

## Credit

Thank you [JetBrains](https://www.jetbrains.com/) for your important initiative to support the open source community with free licenses to your products.

![JetBrains](./doc/resources/jetbrains.png)
