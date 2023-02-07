import axios from 'axios'
import { FixedPriceSaleEventDto } from './dto'

const baseSyncServiceUrl =
  process.env.SYNC_SERVICE_BASE_URL || 'http://localhost:3000'

export async function syncFixedPriceSale(
  event: FixedPriceSaleEventDto
): Promise<string> {
  await axios.post(`${baseSyncServiceUrl}/fixed-price-sale-events`, [event])
  return ''
}
