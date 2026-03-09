import { PeerProfile } from '@/types/peer';
import Card from '@/components/ui/Card';
import Badge from '@/components/ui/Badge';
import MatchScore from './MatchScore';
import { useTranslations } from 'next-intl';

interface PeerCardProps {
  peer: PeerProfile;
  matchScore?: number; // only shown if user has a profile
}

export default function PeerCard({ peer, matchScore }: PeerCardProps) {
  const t = useTranslations('connect');
  const tCommon = useTranslations('common');
  const tInterests = useTranslations('connect.interests');
  const tDegree = useTranslations('connect.degrees');

  const contactLabel = peer.contactMethod === 'wechat'
    ? `${tCommon('wechat')}: ${peer.contactValue}`
    : peer.contactValue;

  return (
    <Card className="flex flex-col h-full">
      <div className="flex items-start justify-between mb-3">
        {/* Avatar + name */}
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-full bg-sky-100 text-sky-700 flex items-center justify-center text-xl font-bold">
            {peer.name.charAt(0)}
          </div>
          <div>
            <h3 className="font-semibold text-lg leading-tight">{peer.name}</h3>
            <p className="text-xs text-muted">{tDegree(peer.degreeLevel)} · {peer.major}</p>
          </div>
        </div>
        {matchScore !== undefined && <MatchScore score={matchScore} size="sm" />}
      </div>

      <p className="text-xs text-muted mb-2">
        📍 {peer.city} · {peer.university}
      </p>
      <p className="text-xs text-muted mb-3">
        📅 {peer.arrivalSemester}
      </p>

      <p className="text-sm text-foreground mb-3 flex-1">{peer.bio}</p>

      {/* Interests */}
      <div className="flex flex-wrap gap-1.5 mb-3">
        {peer.interests.slice(0, 4).map(interest => (
          <Badge key={interest} variant="sky">{tInterests(interest)}</Badge>
        ))}
        {peer.interests.length > 4 && (
          <Badge variant="default">+{peer.interests.length - 4}</Badge>
        )}
      </div>

      {/* Languages */}
      <p className="text-xs text-muted mb-3">🗣 {peer.languages.join(', ')}</p>

      {/* Contact */}
      {peer.contactMethod === 'email' ? (
        <a
          href={`mailto:${peer.contactValue}`}
          className="text-center px-4 py-2 bg-sky-500 text-white rounded-lg text-sm font-medium hover:bg-sky-600 transition-colors"
        >
          {t('contact')}
        </a>
      ) : (
        <div className="text-center px-4 py-2 bg-sky-50 border border-sky-200 rounded-lg text-sm text-sky-700">
          {contactLabel}
        </div>
      )}
    </Card>
  );
}
