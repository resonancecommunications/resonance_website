import { readFile } from 'node:fs/promises'
import { ImageResponse } from 'next/og'
import { brandSvgDataUri } from '@/lib/brand-svg'

const size = { width: 1200, height: 630 }

/**
 * Branded Open Graph image: /api/og?title=…&label=…
 * Used for every page without an editor-supplied sharing image, including projects.
 */
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const title = (searchParams.get('title') || 'Resonance Communications').slice(0, 110)
  const label = (searchParams.get('label') || '').slice(0, 40)

  const [light, bold, logo] = await Promise.all([
    readFile(new URL('./fonts/BricolageGrotesque-Light.ttf', import.meta.url)),
    readFile(new URL('./fonts/BricolageGrotesque-Bold.ttf', import.meta.url)),
    brandSvgDataUri('horizontalDark'),
  ])

  return new ImageResponse(
    <div
      style={{
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        padding: 72,
        color: '#F8F8F8',
        backgroundColor: '#03140F',
        backgroundImage:
          'radial-gradient(ellipse 70% 60% at 85% 115%, rgba(1,210,178,0.55), rgba(1,210,178,0.08) 55%, transparent 75%), linear-gradient(160deg, #062A22 0%, #03140F 50%, #010101 100%)',
        fontFamily: 'Bricolage',
      }}
    >
      {label ? (
        <div style={{ display: 'flex' }}>
          <div
            style={{
              backgroundColor: '#01D2B2',
              color: '#010101',
              fontWeight: 700,
              fontSize: 20,
              letterSpacing: 3,
              textTransform: 'uppercase',
              padding: '10px 18px',
            }}
          >
            {label}
          </div>
        </div>
      ) : (
        <div style={{ display: 'flex' }} />
      )}
      <div
        style={{
          display: 'flex',
          fontSize: title.length > 60 ? 64 : 80,
          fontWeight: 300,
          lineHeight: 1.02,
          letterSpacing: -2,
          color: '#01D2B2',
          maxWidth: 1000,
        }}
      >
        {title}
      </div>
      {/* Official horizontal logo (white wordmark, teal mark), unmodified */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={logo} width={276} height={55} alt="" />
    </div>,
    {
      ...size,
      fonts: [
        { name: 'Bricolage', data: light, weight: 300, style: 'normal' },
        { name: 'Bricolage', data: bold, weight: 700, style: 'normal' },
      ],
      headers: {
        'Cache-Control': 'public, max-age=86400, s-maxage=604800, stale-while-revalidate=86400',
      },
    },
  )
}
