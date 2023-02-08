import { createTypeUnsafe } from '@polkadot/types/create'
import { SubstrateEvent } from '@joystream/hydra-common'
import { typeRegistry } from '.'

import { Option, Vec, u128, u32 } from '@polkadot/types'
import { Codec } from '@polkadot/types/types'
import { EthereumAccountId } from '@polkadot/types/interfaces'

export namespace Nft {
  /**
   * A fixed price sale has been listed
   *
   *  Event parameters: []
   */
  export class FixedPriceSaleListEvent {
    public readonly expectedParamTypes = []

    constructor(public readonly ctx: SubstrateEvent) {}

    get params(): [
      Vec<[u32, u32] & Codec>,
      u128,
      Option<u32>,
      u128,
      u32,
      EthereumAccountId
    ] {
      return [
        createTypeUnsafe(typeRegistry, 'Vec<(u32,u32)>', [
          this.ctx.params[0].value,
        ]),
        createTypeUnsafe(typeRegistry, 'u128', [this.ctx.params[1].value]),
        createTypeUnsafe(typeRegistry, 'Option<u32>', [
          this.ctx.params[2].value,
        ]),
        createTypeUnsafe(typeRegistry, 'u128', [this.ctx.params[3].value]),
        createTypeUnsafe(typeRegistry, 'u32', [this.ctx.params[4].value]),
        createTypeUnsafe(typeRegistry, 'EthereumAccountId', [
          this.ctx.params[5].value,
        ]),
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

  /**
   * A fixed price sale has completed
   *
   *  Event parameters: []
   */
  export class FixedPriceSaleCompleteEvent {
    public readonly expectedParamTypes = []

    constructor(public readonly ctx: SubstrateEvent) {}

    get params(): [
      Vec<[u32, u32] & Codec>,
      u128,
      u128,
      u32,
      EthereumAccountId,
      EthereumAccountId
    ] {
      return [
        createTypeUnsafe(typeRegistry, 'Vec<(u32,u32)>', [
          this.ctx.params[0].value,
        ]),
        createTypeUnsafe(typeRegistry, 'u128', [this.ctx.params[1].value]),
        createTypeUnsafe(typeRegistry, 'u128', [this.ctx.params[2].value]),
        createTypeUnsafe(typeRegistry, 'u32', [this.ctx.params[3].value]),
        createTypeUnsafe(typeRegistry, 'EthereumAccountId', [
          this.ctx.params[4].value,
        ]),
        createTypeUnsafe(typeRegistry, 'EthereumAccountId', [
          this.ctx.params[5].value,
        ]),
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
