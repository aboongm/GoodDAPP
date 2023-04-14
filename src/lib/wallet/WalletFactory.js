// @flow
import Web3 from 'web3'
import Config from '../../config/config'
import SoftwareWalletProvider from './SoftwareWalletProvider'

export type WalletConfig = {
  network_id: number,
  httpWeb3provider: string,
  httpProviderStrategy: string,
  websocketWeb3Provider: string,
  web3Transport: string,
}
const networkToId = network => {
  switch (network) {
    case 'fuse':
    case 'staging':
    case 'production':
      return '122'
    default:
      return '4447'
  }
}

export default class WalletFactory {
  static create(walletConf: WalletConfig): Promise<Web3> {
    const { httpProviderStrategy } = Config

    let provider: SoftwareWalletProvider = new SoftwareWalletProvider({
      ...Config.ethereum[networkToId(Config.network)],
      httpProviderStrategy,
      ...walletConf,
    })

    return provider.ready
  }
}
