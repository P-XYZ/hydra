import {
  BlockTimestamp,
  BlockHook,
  HookType,
} from '../generated/graphql-server/model'

// run 'NODE_URL=<RPC_ENDPOINT> EVENTS=<comma separated list of events> yarn codegen:mappings-types'
// to genenerate typescript classes for events, such as Balances.TransferEvent
import BN from 'bn.js'
import { BlockContext, StoreContext } from '@joystream/hydra-common'

const start = Date.now()
const blockTime = 0
const totalEvents = 0
let totalBlocks = 0

export async function preHook({
  block: { height, timestamp, hash },
  store,
}: BlockContext & StoreContext): Promise<void> {
  const hook = new BlockHook()

  const ts = new BlockTimestamp()

  ts.blockNumber = new BN(height)
  ts.id = hash
  ts.timestamp = new BN(timestamp)

  await store.save<BlockTimestamp>(ts)
  hook.timestamp = ts
  hook.blockNumber = new BN(height)
  hook.type = HookType.PRE
  await store.save<BlockHook>(hook)
}

export async function postHook({
  block: { height, hash },
  store,
}: BlockContext & StoreContext): Promise<void> {
  const hook = new BlockHook()
  hook.blockNumber = new BN(height)

  hook.timestamp = <BlockTimestamp>(
    await store.get(BlockTimestamp, { where: { id: hash } })
  )
  hook.type = HookType.POST

  await store.save<BlockHook>(hook)
  totalBlocks++
  benchmark()
}

function benchmark() {
  const millis = Date.now() - start
  if (totalEvents % 10 === 0) {
    console.log(`seconds elapsed = ${Math.floor(millis / 1000)}`)
    console.log(
      `Everage event time ms: ${millis / totalEvents}, block exec time ms: ${
        blockTime / totalBlocks
      }, total events: ${totalEvents}, total blocks: ${totalBlocks}`
    )
  }
}
