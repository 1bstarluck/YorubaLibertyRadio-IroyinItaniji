
import { Podcast } from '../types';

export const dummyPodcastsData: Podcast[] = [
  { 
    id: 1, 
    title: 'Ìtàn Àwọn Akọni', 
    author: 'Yoruba Liberty Radio',
    description: 'A deep dive into the inspiring stories and legacies of historical and modern-day Yoruba heroes. Each episode explores their challenges, triumphs, and impact on our culture.',
    imageUrl: 'https://picsum.photos/seed/pod1/400/400',
    episodes: [
      { id: 101, title: 'The Legacy of Oduduwa', description: 'Exploring the mythical and historical accounts of the progenitor of the Yoruba race.', releaseDate: '2023-10-01', duration: '45 min', audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3' },
      { id: 102, title: 'Moremi Ajasoro: The Heroine of Ife', description: 'The story of the courageous queen who saved her people.', releaseDate: '2023-10-08', duration: '52 min', audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3' },
      { id: 103, title: 'Funmilayo Ransome-Kuti: A Voice for Women', description: 'The life of the pioneering activist and educator.', releaseDate: '2023-10-15', duration: '48 min', audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3' },
    ]
  },
  { 
    id: 2, 
    title: 'Èdè Yorùbá 101', 
    author: 'Ile Iwe Radio',
    description: 'Your weekly dose of Yoruba language lessons. From basic greetings to complex proverbial sayings, we make learning fun and accessible for everyone, everywhere.',
    imageUrl: 'https://picsum.photos/seed/pod2/400/400',
    episodes: [
      { id: 201, title: 'Greetings and Introductions', description: 'Learn the essential greetings for every time of day.', releaseDate: '2023-10-03', duration: '30 min', audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-4.mp3' },
      { id: 202, title: 'Mastering the Tones', description: 'An introduction to the tonal nature of the Yoruba language.', releaseDate: '2023-10-10', duration: '35 min', audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-5.mp3' },
    ]
  },
  { 
    id: 3, 
    title: 'Owo & Iṣowo', 
    author: 'Diaspora Network',
    description: 'Conversations on finance, entrepreneurship, and wealth creation for the modern Yoruba professional and business owner, both at home and in the diaspora.',
    imageUrl: 'https://picsum.photos/seed/pod3/400/400',
    episodes: [
      { id: 301, title: 'Investing in the Nigerian Stock Exchange', description: 'A beginner\'s guide to getting started.', releaseDate: '2023-10-05', duration: '60 min', audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-6.mp3' },
      { id: 302, title: 'From Side Hustle to Empire', description: 'Interview with a successful Yoruba entrepreneur.', releaseDate: '2023-10-12', duration: '75 min', audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-7.mp3' },
    ]
  },
  { id: 4, title: 'Nigeria Politics Today', author: 'Liberty Roundtable', description: 'A deep dive into current events.', imageUrl: 'https://picsum.photos/seed/pod4/400/400', episodes: [] },
  { id: 5, title: 'Diaspora Voices', author: 'Global Connect', description: 'Connecting Yoruba people worldwide.', imageUrl: 'https://picsum.photos/seed/pod5/400/400', episodes: [] },
  { id: 6, title: 'Health and Wellness', author: 'Dr. Ayo', description: 'Tips for a healthy life.', imageUrl: 'https://picsum.photos/seed/pod6/400/400', episodes: [] },
];
