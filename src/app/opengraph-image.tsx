import { renderSocialImage, socialImageSize } from './social-image';

export const runtime = 'edge';
export const alt = 'Companion 与你同行';
export const size = socialImageSize;
export const contentType = 'image/png';

export default function OGImage() {
  return renderSocialImage();
}
