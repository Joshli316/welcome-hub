import Card from '@/components/ui/Card';
import { useTranslations } from 'next-intl';

interface WeChatGroupCardProps {
  name: string;
  description: string;
  qrPlaceholder?: boolean; // In real app, would use actual QR code image
}

export default function WeChatGroupCard({ name, description, qrPlaceholder = true }: WeChatGroupCardProps) {
  const t = useTranslations('community.wechat');
  const tCommon = useTranslations('common');

  return (
    <Card className="text-center">
      <h3 className="font-semibold mb-2">{name}</h3>
      <p className="text-sm text-muted mb-4">{description}</p>
      {qrPlaceholder && (
        <div className="mx-auto w-32 h-32 bg-warm-100 rounded-lg flex items-center justify-center text-muted text-xs border-2 border-dashed border-warm-300">
          {tCommon('qrCode')}
        </div>
      )}
      <p className="text-xs text-muted mt-3">{t('scanToJoin')}</p>
    </Card>
  );
}
