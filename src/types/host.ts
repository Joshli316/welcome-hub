export interface VolunteerHost {
  id: string;
  name: string;
  photoUrl?: string;
  university: string;
  city: string;
  languages: string[];
  bio: string;
  bioZh: string;
  services: string[]; // e.g. ["airport-pickup", "housing-help", "campus-tour"]
  contactMethod: 'wechat' | 'email' | 'phone';
  contactValue: string;
}
