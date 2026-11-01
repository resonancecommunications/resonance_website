import { ImageResponse } from 'next/og'
import { brandSvgDataUri } from '@/lib/brand-svg'

export const size = { width: 180, height: 180 }
export const contentType = 'image/png'

/** Apple touch icon: official near-black RC mark on Connection Teal. */
export default async function AppleIcon() {
  const mark = await brandSvgDataUri('iconBlack')
  return new ImageResponse(
    <div
      style={{
        width: '100%',
        height: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#01D2B2',
      }}
    >
      <img src={mark} width={108} height={78} alt="" />
    </div>,
    size,
  )
}
