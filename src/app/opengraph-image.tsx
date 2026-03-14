import { ImageResponse } from 'next/og';

// OG image generated from code — no need for a static PNG file.
// Next.js renders this JSX to a 1200×630 image at /opengraph-image.
export const runtime = 'edge';
export const alt = 'Companion 与你同行';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default function OGImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          padding: '80px',
          backgroundColor: '#fdfbf7',
          fontFamily: 'Georgia, serif',
        }}
      >
        {/* Accent bar at top */}
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            height: '6px',
            backgroundColor: '#d4763a',
          }}
        />

        {/* Main title */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '16px',
          }}
        >
          <div
            style={{
              fontSize: '72px',
              fontWeight: 400,
              color: '#1a1612',
              lineHeight: 1.1,
              letterSpacing: '-0.01em',
            }}
          >
            Companion
          </div>
          <div
            style={{
              fontSize: '64px',
              fontWeight: 400,
              color: '#d4763a',
              lineHeight: 1.1,
            }}
          >
            与你同行
          </div>
        </div>

        {/* Subtitle */}
        <div
          style={{
            fontSize: '24px',
            color: '#6b645c',
            marginTop: '32px',
            lineHeight: 1.5,
            maxWidth: '700px',
            fontFamily: 'system-ui, sans-serif',
          }}
        >
          Practical resources and community for Chinese international students in the US
        </div>

        {/* Decorative dots */}
        <div
          style={{
            position: 'absolute',
            bottom: '60px',
            right: '80px',
            display: 'flex',
            gap: '12px',
          }}
        >
          <div style={{ width: '12px', height: '12px', borderRadius: '50%', backgroundColor: '#d4763a' }} />
          <div style={{ width: '12px', height: '12px', borderRadius: '50%', backgroundColor: '#d4763a', opacity: 0.5 }} />
          <div style={{ width: '12px', height: '12px', borderRadius: '50%', backgroundColor: '#d4763a', opacity: 0.25 }} />
        </div>
      </div>
    ),
    { ...size }
  );
}
