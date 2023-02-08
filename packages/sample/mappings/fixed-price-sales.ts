// run 'NODE_URL=<RPC_ENDPOINT> EVENTS=<comma separated list of events> yarn codegen:mappings-types'
// to genenerate typescript classes for events, such as Balances.TransferEvent
import { Nft } from './generated/types'
import { EventContext, StoreContext } from '@joystream/hydra-common'
import {
  FixedPriceSaleEventDto,
  FixedPriceSaleEventMethod,
  TokenIdDto,
} from './sync-service/dto'
import { syncFixedPriceSale } from './sync-service/sync-service'

export async function nftFixedPriceSaleList({
  event,
  block,
  extrinsic,
}: EventContext & StoreContext): Promise<void> {
  const [tokens, listingId, marketplaceId, price, paymentAsset, seller] =
    new Nft.FixedPriceSaleListEvent(event).params

  const tokensDto: TokenIdDto[] = []
  for (const token of tokens) {
    tokensDto.push({
      collectionId: token[0].toString(),
      serialNumber: token[1].toString(),
    })
  }
  // step: call sync service
  const dto = new FixedPriceSaleEventDto()
  dto.eventMethod = FixedPriceSaleEventMethod.FixedPriceSaleList
  dto.blockHash = block.hash
  dto.blockHeight = block.height
  dto.extrinsicHash = extrinsic?.hash
  dto.txIndex = event.indexInBlock
  dto.tokens = tokensDto
  dto.listingId = listingId.toString()
  dto.marketplaceId = marketplaceId.toString()
  dto.seller = seller.toString()
  dto.price = price.toString()
  dto.paymentAsset = paymentAsset.toString()
  await syncFixedPriceSale(dto)
}

export async function nftFixedPriceSaleComplete({
  event,
  block,
  extrinsic,
}: EventContext & StoreContext): Promise<void> {
  const [tokens, listingId, price, paymentAsset, buyer, seller] =
    new Nft.FixedPriceSaleCompleteEvent(event).params

  const tokensDto: TokenIdDto[] = []
  for (const token of tokens) {
    tokensDto.push({
      collectionId: token[0].toString(),
      serialNumber: token[1].toString(),
    })
  }
  // step: call sync service
  const dto = new FixedPriceSaleEventDto()
  dto.eventMethod = FixedPriceSaleEventMethod.FixedPriceSaleComplete
  dto.blockHash = block.hash
  dto.blockHeight = block.height
  dto.extrinsicHash = extrinsic?.hash
  dto.txIndex = event.indexInBlock
  dto.tokens = tokensDto
  dto.listingId = listingId.toString()
  dto.seller = seller.toString()
  dto.buyer = buyer.toString()
  dto.price = price.toString()
  dto.paymentAsset = paymentAsset.toString()
  await syncFixedPriceSale(dto)
}
