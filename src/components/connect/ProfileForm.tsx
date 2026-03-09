'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { MyProfile, interestOptions, degreeLevelOptions } from '@/types/peer';

interface ProfileFormProps {
  initialProfile?: MyProfile | null;
  onSubmit: (profile: MyProfile) => void;
}

export default function ProfileForm({ initialProfile, onSubmit }: ProfileFormProps) {
  const t = useTranslations('connect.profile');
  const tCommon = useTranslations('common');
  const tInterests = useTranslations('connect.interests');
  const tDegree = useTranslations('connect.degrees');

  const [name, setName] = useState(initialProfile?.name ?? '');
  const [university, setUniversity] = useState(initialProfile?.university ?? '');
  const [city, setCity] = useState(initialProfile?.city ?? '');
  const [major, setMajor] = useState(initialProfile?.major ?? '');
  const [degreeLevel, setDegreeLevel] = useState(initialProfile?.degreeLevel ?? 'masters');
  const [arrivalSemester, setArrivalSemester] = useState(initialProfile?.arrivalSemester ?? 'Fall 2026');
  const [interests, setInterests] = useState<string[]>(initialProfile?.interests ?? []);
  const [languages, setLanguages] = useState(initialProfile?.languages.join(', ') ?? '中文, English');
  const [bio, setBio] = useState(initialProfile?.bio ?? '');
  const [contactMethod, setContactMethod] = useState<'wechat' | 'email'>(initialProfile?.contactMethod ?? 'wechat');
  const [contactValue, setContactValue] = useState(initialProfile?.contactValue ?? '');

  function toggleInterest(interest: string) {
    setInterests(prev =>
      prev.includes(interest)
        ? prev.filter(i => i !== interest)
        : prev.length < 6 ? [...prev, interest] : prev
    );
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const profile: MyProfile = {
      id: initialProfile?.id ?? `peer-${Date.now()}`,
      name,
      university,
      city,
      major,
      degreeLevel,
      arrivalSemester,
      interests,
      languages: languages.split(',').map(l => l.trim()).filter(Boolean),
      bio,
      contactMethod,
      contactValue,
      createdAt: initialProfile?.createdAt ?? new Date().toISOString().split('T')[0],
    };
    onSubmit(profile);
  }

  const inputClass = 'w-full px-3 py-2 rounded-lg border border-border bg-white text-sm focus:outline-none focus:ring-2 focus:ring-primary-300 focus:border-primary-400';
  const labelClass = 'block text-sm font-medium mb-1';

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Name + University row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className={labelClass}>{t('name')} *</label>
          <input type="text" value={name} onChange={e => setName(e.target.value)} required className={inputClass} placeholder={t('namePlaceholder')} />
        </div>
        <div>
          <label className={labelClass}>{t('university')} *</label>
          <input type="text" value={university} onChange={e => setUniversity(e.target.value)} required className={inputClass} placeholder={t('universityPlaceholder')} />
        </div>
      </div>

      {/* City + Major */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className={labelClass}>{t('city')} *</label>
          <input type="text" value={city} onChange={e => setCity(e.target.value)} required className={inputClass} placeholder={t('cityPlaceholder')} />
        </div>
        <div>
          <label className={labelClass}>{t('major')} *</label>
          <input type="text" value={major} onChange={e => setMajor(e.target.value)} required className={inputClass} placeholder={t('majorPlaceholder')} />
        </div>
      </div>

      {/* Degree + Arrival */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className={labelClass}>{t('degreeLevel')}</label>
          <select value={degreeLevel} onChange={e => setDegreeLevel(e.target.value as MyProfile['degreeLevel'])} className={inputClass}>
            {degreeLevelOptions.map(d => (
              <option key={d} value={d}>{tDegree(d)}</option>
            ))}
          </select>
        </div>
        <div>
          <label className={labelClass}>{t('arrivalSemester')}</label>
          <input type="text" value={arrivalSemester} onChange={e => setArrivalSemester(e.target.value)} className={inputClass} placeholder="Fall 2026" />
        </div>
      </div>

      {/* Interests */}
      <div>
        <label className={labelClass}>{t('interests')} ({t('selectUpTo', { max: 6 })})</label>
        <div className="flex flex-wrap gap-2 mt-2">
          {interestOptions.map(interest => (
            <button
              key={interest}
              type="button"
              onClick={() => toggleInterest(interest)}
              className={`px-3 py-1.5 rounded-full text-sm border transition-colors ${
                interests.includes(interest)
                  ? 'bg-primary-500 text-white border-primary-500'
                  : 'bg-white border-border text-muted hover:border-primary-300'
              }`}
            >
              {tInterests(interest)}
            </button>
          ))}
        </div>
      </div>

      {/* Languages */}
      <div>
        <label className={labelClass}>{t('languages')}</label>
        <input type="text" value={languages} onChange={e => setLanguages(e.target.value)} className={inputClass} placeholder="中文, English" />
        <p className="text-xs text-muted mt-1">{t('languagesHint')}</p>
      </div>

      {/* Bio */}
      <div>
        <label className={labelClass}>{t('bio')}</label>
        <textarea
          value={bio}
          onChange={e => setBio(e.target.value)}
          rows={3}
          maxLength={200}
          className={inputClass}
          placeholder={t('bioPlaceholder')}
        />
        <p className="text-xs text-muted mt-1">{bio.length}/200</p>
      </div>

      {/* Contact */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className={labelClass}>{t('contactMethod')}</label>
          <select value={contactMethod} onChange={e => setContactMethod(e.target.value as 'wechat' | 'email')} className={inputClass}>
            <option value="wechat">{tCommon('wechat')}</option>
            <option value="email">{tCommon('email')}</option>
          </select>
        </div>
        <div>
          <label className={labelClass}>{t('contactValue')} *</label>
          <input
            type="text"
            value={contactValue}
            onChange={e => setContactValue(e.target.value)}
            required
            className={inputClass}
            placeholder={contactMethod === 'wechat' ? t('wechatPlaceholder') : t('emailPlaceholder')}
          />
        </div>
      </div>

      <button
        type="submit"
        className="w-full sm:w-auto px-6 py-3 bg-primary-500 text-white rounded-xl font-semibold hover:bg-primary-600 transition-colors"
      >
        {initialProfile ? t('updateProfile') : t('createProfile')}
      </button>
    </form>
  );
}
