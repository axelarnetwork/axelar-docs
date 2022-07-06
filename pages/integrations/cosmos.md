# Add Cosmos based chains to Axelar Network

import Callout from 'nextra-theme-docs/callout'

Tutorial and checklist for integrating cosmos based chains with Axelar

## IBC channel setup

The first step for integrating is to set up a mainnet or testnet IBC channel between the cosmos based chain and Axelar Network. As a pre-requisite, ensure the cosmos chain satisfies the following conditions.

- Stable Network. The network performs rolling updates and IBC channels are preserved between upgrades. Testnets should be stable with no plans of resets
- Multiple Relayers. Many stable relayers can be setup for the IBC channel. For mainnet, 3+ relayers preferred. For testnet, 1 relayer is okay, but 2+ relayers preferred
- Stable Relaying. Make sure the relayer light clients are auto updated frequently so the channel does not expire.
- IBC v2 or higher. The cosmos chain should implement IBC version 2 or later.
- Sufficient unbonding and trusting period. The cosmos chain should have a long enough unbonding and trusting period so that the IBC channel will not expire during short outages.

Check that the cosmos chain satisfies these conditions, and provide supporting info to the Axelar team. Once the Axelar team approves, set up the IBC channel and relayers.

## Add the cosmos chain to Axelar

After the IBC channel is set up and a few test transfers are made, ask the Axelar team to add the cosmos chain as a supported network

## Add asset support

Let the Axelar team know which assets you want to transfer into or out of the added cosmos chain. The cosmos chain should be either integrated with Keplr wallet, or you will need to provide Keplr config and chain info needed for the wallet integration.

