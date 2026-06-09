import { useState } from 'react'

export default function VideoPlayer({ video, watched, onMarkWatched }) {
  const [iframeError, setIframeError] = useState(false)
  const hasVideo = video.videoId && video.videoId !== null

  return (
    <div style={{
      background: 'var(--surface)',
      borderRadius: 'var(--radius)',
      border: `2px solid ${watched ? 'var(--secondary)' : 'var(--border-light)'}`,
      overflow: 'hidden',
      transition: 'border-color 0.2s',
    }}>
      {/* Video area */}
      {hasVideo && !iframeError ? (
        <div style={{ position: 'relative', paddingBottom: '56.25%', background: '#000' }}>
          <iframe
            src={`https://www.youtube.com/embed/${video.videoId}?rel=0&modestbranding=1&color=white`}
            style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', border: 'none' }}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            onError={() => setIframeError(true)}
            title={video.title}
          />
        </div>
      ) : (
        // Placeholder when no video ID is configured
        <div style={{
          background: 'linear-gradient(135deg, #1B4F72 0%, #2E86AB 100%)',
          padding: '32px 20px',
          textAlign: 'center',
          minHeight: 160,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 12,
        }}>
          <div style={{ fontSize: 40 }}>📹</div>
          <div style={{ color: 'white', fontFamily: 'var(--font-heading)', fontWeight: 700, fontSize: 15 }}>
            Video Not Yet Configured
          </div>
          <div style={{ color: 'rgba(255,255,255,0.75)', fontSize: 12, maxWidth: 300, lineHeight: 1.6 }}>
            To add this video: search YouTube for<br />
            <span style={{ color: '#7DDECC', fontWeight: 600 }}>"{video.suggestedSearch}"</span>
            <br />then paste the video ID into <code style={{ background: 'rgba(0,0,0,0.3)', padding: '1px 5px', borderRadius: 4, fontSize: 11 }}>procedures.js</code>
          </div>
          <a
            href={`https://www.youtube.com/results?search_query=${encodeURIComponent(video.suggestedSearch)}`}
            target="_blank"
            rel="noreferrer"
            style={{
              background: '#FF0000',
              color: 'white',
              padding: '8px 16px',
              borderRadius: 8,
              textDecoration: 'none',
              fontSize: 12,
              fontWeight: 700,
              display: 'flex',
              alignItems: 'center',
              gap: 6,
              marginTop: 4,
            }}
          >
            ▶ Search on YouTube
          </a>
        </div>
      )}

      {/* Video info + watched button */}
      <div style={{ padding: '14px 16px', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 12 }}>
        <div style={{ flex: 1 }}>
          <div style={{ fontFamily: 'var(--font-heading)', fontWeight: 700, fontSize: 14, marginBottom: 3 }}>
            {video.title}
          </div>
          <div style={{ fontSize: 12, color: 'var(--text-muted)', lineHeight: 1.5 }}>{video.description}</div>
          <div style={{ fontSize: 11, color: 'var(--text-muted)', marginTop: 4 }}>⏱ {video.duration}</div>
        </div>
        <button
          onClick={onMarkWatched}
          disabled={watched}
          style={{
            flexShrink: 0,
            padding: '8px 14px',
            borderRadius: 8,
            border: 'none',
            cursor: watched ? 'default' : 'pointer',
            fontWeight: 700,
            fontSize: 12,
            background: watched ? 'var(--secondary-pale)' : 'var(--primary)',
            color: watched ? 'var(--secondary)' : 'white',
            transition: 'all 0.2s',
            whiteSpace: 'nowrap',
          }}
        >
          {watched ? '✓ Watched' : 'Mark Watched'}
        </button>
      </div>
    </div>
  )
}
