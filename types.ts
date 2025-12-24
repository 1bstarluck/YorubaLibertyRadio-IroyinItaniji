
export enum Page {
    Home = '/',
    Radio = '/radio',
    Podcasts = '/podcasts',
    PodcastDetail = '/podcasts/:podcastId',
    News = '/news',
    More = '/more',
    Shop = '/shop',
    Contact = '/contact',
    QA = '/qa',
    Analytics = '/analytics',
    Admin = '/admin',
    Mission = '/mission',
    Vision = '/vision',
    YorubaHero = '/akinkanju-yoruba',
    Widgets = '/widgets',
    AboutUs = '/about-us',
    Donate = '/donate',
    Settings = '/settings',
    Music = '/music',
    Cart = '/cart',
    Checkout = '/checkout',
    Community = '/community',
}

export interface Article {
    id: number;
    title: string;
    summary: string;
    imageUrl: string;
    category: string;
    date: string;
}

export interface Episode {
    id: number;
    title: string;
    description: string;
    duration: string;
    audioUrl: string;
    releaseDate: string;
}

export interface Podcast {
    id: number;
    title: string;
    author: string;
    description: string;
    imageUrl: string;
    episodes: Episode[];
}

export interface DownloadedEpisode {
    episodeId: number;
    podcast: Podcast;
    episode: Episode;
    audioData: Blob;
}

export interface MusicTrack {
    id: number;
    title: string;
    artist: string;
    imageUrl: string;
    audioUrl: string;
}

export interface Product {
    id: number;
    name: string;
    price: number;
    imageUrl: string;
}

export interface CartItem {
    product: Product;
    quantity: number;
}

export interface Testimonial {
    id: number;
    name: string;
    location: string;
    text: string;
    imageUrl?: string;
}

export interface CalendarEvent {
    id: string;
    date: string; // YYYY-MM-DD
    title: string;
}
