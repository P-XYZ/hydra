import { createTypeUnsafe } from '@polkadot/types/create'
import { SubstrateEvent } from '@joystream/hydra-common'
import { typeRegistry } from '.'
import { u128 } from '@polkadot/types'
import { EthereumAccountId } from '@polkadot/types/interfaces'

export namespace Balances {
  /**
   * Transfer succeeded.
   *
   *  Event parameters: []
   */
  export class TransferEvent {
    public readonly expectedParamTypes = []

    constructor(public readonly ctx: SubstrateEvent) {}

    get params(): [EthereumAccountId, EthereumAccountId, u128] {
      return [
        createTypeUnsafe(typeRegistry, 'EthereumAccountId', [
          this.ctx.params[0].value,
        ]),
        createTypeUnsafe(typeRegistry, 'EthereumAccountId', [
          this.ctx.params[1].value,
        ]),
        createTypeUnsafe(typeRegistry, 'u128', [this.ctx.params[2].value]),
      ]
    }

    validateParams(): boolean {
      if (this.expectedParamTypes.length !== this.ctx.params.length) {
        return false
      }
      let valid = true
      this.expectedParamTypes.forEach((type, i) => {
        if (type !== this.ctx.params[i].type) {
          valid = false
        }
      })
      return valid
    }
  }
}
