import type { Media } from '@/payload-types'
import Image from 'next/image'

export function isMedia(value: unknown): value is Media {
  return typeof value === 'object' && value !== null
}

export function getMediaSrc(media: Media): string | null {
  if (media.url) {
    return media.url
  }

  if (media.filename) {
    return `/api/media/file/${media.filename}`
  }

  return null
}

export function hasRenderableMedia(value: unknown): boolean {
  return isMedia(value) && getMediaSrc(value) !== null
}

export function MediaImage({
  media,
  alt,
  className,
  width,
  height,
}: {
  media: unknown
  alt: string
  className?: string
  width: number
  height: number
}) {
  if (!isMedia(media)) {
    return null
  }

  const src = getMediaSrc(media)

  if (!src) {
    return null
  }

  const isSvg = src.endsWith('.svg') || media.mimeType === 'image/svg+xml'

  return (
    <Image
      src={src}
      alt={media.alt || alt}
      width={media.width ?? width}
      height={media.height ?? height}
      className={className}
      unoptimized={isSvg}
    />
  )
}
