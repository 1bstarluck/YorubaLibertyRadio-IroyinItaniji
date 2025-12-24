
import React, { useState, useRef, useEffect } from 'react';
import CloudArrowDownIcon from '../components/icons/CloudArrowDownIcon';
import TrashIcon from '../components/icons/TrashIcon';
import CalendarIcon from '../components/icons/CalendarIcon';
import { CalendarEvent, Product, Article, Testimonial } from '../types';

const AdminSection: React.FC<{ title: string; children: React.ReactNode }> = ({ title, children }) => (
    <section className="bg-gray-800 p-4 rounded-lg border border-gray-700">
        <h2 className="text-xl font-semibold mb-4 text-yellow-400 border-b border-gray-700 pb-2">{title}</h2>
        {children}
    </section>
);

const ImageUploader: React.FC<{ onImageSelect: (base64: string) => void; initialPreview?: string; label?: string }> = ({ onImageSelect, initialPreview, label }) => {
    const [preview, setPreview] = useState<string | undefined>(initialPreview);
    const fileInputRef = useRef<HTMLInputElement>(null);

    useEffect(() => { setPreview(initialPreview); }, [initialPreview]);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                const base64 = reader.result as string;
                setPreview(base64);
                onImageSelect(base64);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleRemove = () => {
        setPreview(undefined);
        onImageSelect('');
        if (fileInputRef.current) fileInputRef.current.value = "";
    };

    return (
        <div className="space-y-2">
            {label && <label className="block text-sm text-gray-400">{label}</label>}
            <div className="flex items-start space-x-3">
                {preview ? (
                    <div className="relative w-20 h-20 rounded border border-gray-600 overflow-hidden flex-shrink-0">
                        <img src={preview} className="w-full h-full object-cover" alt="Preview" />
                        <button onClick={handleRemove} className="absolute top-0 right-0 bg-red-600 text-white p-1 rounded-bl">
                            <TrashIcon className="w-3 h-3" />
                        </button>
                    </div>
                ) : (
                    <div className="w-20 h-20 border-2 border-dashed border-gray-600 rounded flex items-center justify-center text-gray-500 bg-gray-900/50 flex-shrink-0">
                        <CloudArrowDownIcon className="w-6 h-6" />
                    </div>
                )}
                <input type="file" accept="image/*" ref={fileInputRef} onChange={handleFileChange} className="text-sm text-gray-400 file:mr-2 file:py-1 file:px-2 file:rounded file:border-0 file:bg-gray-700 file:text-white" />
            </div>
        </div>
    );
};

// Generic single image uploader for direct storage keys
const PersistentImageUploader: React.FC<{ storageKey: string; label: string }> = ({ storageKey, label }) => {
    const [preview, setPreview] = useState(localStorage.getItem(storageKey) || '');
    
    const handleSave = (base64: string) => {
        if(base64) {
            localStorage.setItem(storageKey, base64);
            setPreview(base64);
        } else {
            localStorage.removeItem(storageKey);
            setPreview('');
        }
        window.dispatchEvent(new Event('storage'));
    };

    return <ImageUploader initialPreview={preview || undefined} onImageSelect={handleSave} label={label} />;
};

const SiteTextManager: React.FC = () => {
    const [title, setTitle] = useState('');
    const [subtitle, setSubtitle] = useState('');
    const [mission, setMission] = useState('');
    const [vision, setVision] = useState('');
    const [about, setAbout] = useState('');

    useEffect(() => {
        setTitle(localStorage.getItem('site_title') || 'Yoruba Liberty Radio');
        setSubtitle(localStorage.getItem('site_subtitle') || 'IROYIN ITANIJI');
        setMission(localStorage.getItem('site_mission') || 'To provide an unfiltered, international broadcasting platform dedicated to the principles of liberty, self-determination, and cultural preservation for the Yoruba people worldwide.');
        setVision(localStorage.getItem('site_vision') || 'To be the most trusted and influential voice for the Yoruba diaspora, fostering a connected and prosperous global nation built on the foundations of freedom, heritage, and mutual respect.');
        setAbout(localStorage.getItem('site_about') || 'Yoruba Liberty Radio is an independent, international shortwave broadcasting service created to serve as a beacon of truth, liberty, and cultural pride for the Yoruba people across the globe.');
    }, []);

    const save = () => {
        localStorage.setItem('site_title', title);
        localStorage.setItem('site_subtitle', subtitle);
        localStorage.setItem('site_mission', mission);
        localStorage.setItem('site_vision', vision);
        localStorage.setItem('site_about', about);
        window.dispatchEvent(new Event('storage'));
        alert("Site Texts Updated Successfully!");
    };

    return (
        <div className="space-y-4">
             <div className="space-y-2">
                <label className="text-sm text-yellow-400 font-bold">App Main Title</label>
                <input type="text" value={title} onChange={e => setTitle(e.target.value)} className="w-full bg-gray-700 text-white p-2 rounded text-sm" />
             </div>
             <div className="space-y-2">
                <label className="text-sm text-yellow-400 font-bold">App Subtitle / Slogan</label>
                <input type="text" value={subtitle} onChange={e => setSubtitle(e.target.value)} className="w-full bg-gray-700 text-white p-2 rounded text-sm" />
             </div>
             <div className="space-y-2">
                <label className="text-sm text-yellow-400 font-bold">Mission Statement</label>
                <textarea rows={3} value={mission} onChange={e => setMission(e.target.value)} className="w-full bg-gray-700 text-white p-2 rounded text-sm" />
             </div>
             <div className="space-y-2">
                <label className="text-sm text-yellow-400 font-bold">Vision Statement</label>
                <textarea rows={3} value={vision} onChange={e => setVision(e.target.value)} className="w-full bg-gray-700 text-white p-2 rounded text-sm" />
             </div>
             <div className="space-y-2">
                <label className="text-sm text-yellow-400 font-bold">About Us Text</label>
                <textarea rows={4} value={about} onChange={e => setAbout(e.target.value)} className="w-full bg-gray-700 text-white p-2 rounded text-sm" />
             </div>
             <button onClick={save} className="w-full bg-yellow-400 text-black font-bold py-2 rounded text-sm">Save All Texts</button>
        </div>
    );
};

const VideoPlaceholderInput: React.FC = () => {
    const [videoUrl, setVideoUrl] = useState<string>(localStorage.getItem('home_ad_video') || '');

    const handleSave = () => {
        if (videoUrl) {
            localStorage.setItem('home_ad_video', videoUrl);
            alert("Video URL saved!");
        } else {
             localStorage.removeItem('home_ad_video');
             alert("Video URL removed.");
        }
    };

    return (
        <div className="space-y-2 mt-4 pt-4 border-t border-gray-700">
             <h3 className="text-white font-medium">Video Placeholder (Home Ad)</h3>
             <div className="flex space-x-2">
                 <input 
                    type="text" 
                    value={videoUrl}
                    onChange={(e) => setVideoUrl(e.target.value)}
                    placeholder="https://example.com/video.mp4"
                    className="flex-grow bg-gray-700 text-white rounded px-3 py-2 text-sm border border-gray-600 focus:border-yellow-400 outline-none"
                 />
                 <button onClick={handleSave} className="bg-yellow-400 text-black px-4 py-2 rounded font-bold text-sm">Save</button>
             </div>
        </div>
    )
}

const ContactManager: React.FC = () => {
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');

    useEffect(() => {
        setEmail(localStorage.getItem('contact_email') || 'info@yorubalibertyradio.com');
        setPhone(localStorage.getItem('contact_phone') || '+1 (234) 567-890');
    }, []);

    const save = () => {
        localStorage.setItem('contact_email', email);
        localStorage.setItem('contact_phone', phone);
        window.dispatchEvent(new Event('storage'));
        alert("Contact Info Updated");
    };

    return (
        <div className="space-y-3">
            <div className="space-y-1">
                <label className="text-sm text-gray-400">Email Address</label>
                <input type="text" value={email} onChange={e => setEmail(e.target.value)} className="w-full bg-gray-700 text-white p-2 rounded text-sm" />
            </div>
            <div className="space-y-1">
                <label className="text-sm text-gray-400">Phone Number</label>
                <input type="text" value={phone} onChange={e => setPhone(e.target.value)} className="w-full bg-gray-700 text-white p-2 rounded text-sm" />
            </div>
            <button onClick={save} className="bg-yellow-400 text-black px-4 py-2 rounded font-bold text-sm w-full">Update Contact Info</button>
        </div>
    );
}

const TestimonialManager: React.FC = () => {
    const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
    const [name, setName] = useState('');
    const [location, setLocation] = useState('');
    const [text, setText] = useState('');
    const [image, setImage] = useState('');

    useEffect(() => {
        const stored = localStorage.getItem('app_testimonials');
        if (stored) setTestimonials(JSON.parse(stored));
    }, []);

    const save = (items: Testimonial[]) => {
        localStorage.setItem('app_testimonials', JSON.stringify(items));
        setTestimonials(items);
        window.dispatchEvent(new Event('storage'));
    };

    const add = () => {
        if (!name || !text) return;
        const newItem: Testimonial = {
            id: Date.now(),
            name,
            location,
            text,
            imageUrl: image || undefined
        };
        save([...testimonials, newItem]);
        setName(''); setLocation(''); setText(''); setImage('');
    };

    return (
        <div className="space-y-4">
            <div className="bg-gray-900/50 p-3 rounded space-y-2 border border-gray-600">
                <input type="text" value={name} onChange={e => setName(e.target.value)} placeholder="Listener Name" className="w-full bg-gray-700 text-white p-2 rounded text-sm" />
                <input type="text" value={location} onChange={e => setLocation(e.target.value)} placeholder="Location (e.g. London, UK)" className="w-full bg-gray-700 text-white p-2 rounded text-sm" />
                <textarea value={text} onChange={e => setText(e.target.value)} placeholder="Testimonial Message" className="w-full bg-gray-700 text-white p-2 rounded text-sm" rows={2} />
                <ImageUploader onImageSelect={setImage} initialPreview={image} label="Listener Photo (Optional)" />
                <button onClick={add} className="w-full bg-yellow-400 text-black font-bold py-2 rounded text-sm">Add Testimonial</button>
            </div>
             <div className="space-y-2 max-h-60 overflow-y-auto">
                {testimonials.map(t => (
                    <div key={t.id} className="flex justify-between bg-gray-700 p-2 rounded">
                        <div className="w-3/4">
                             <p className="text-white text-sm font-bold truncate">{t.name}</p>
                             <p className="text-xs text-gray-400 truncate">{t.text}</p>
                        </div>
                         <button onClick={() => save(testimonials.filter(i => i.id !== t.id))} className="text-red-400"><TrashIcon className="w-4 h-4"/></button>
                    </div>
                ))}
            </div>
        </div>
    );
};

const CalendarManager: React.FC = () => {
    const [events, setEvents] = useState<CalendarEvent[]>([]);
    const [date, setDate] = useState('');
    const [title, setTitle] = useState('');

    useEffect(() => {
        const stored = localStorage.getItem('calendar_events');
        if (stored) setEvents(JSON.parse(stored));
    }, []);

    const save = (newEvents: CalendarEvent[]) => {
        localStorage.setItem('calendar_events', JSON.stringify(newEvents));
        setEvents(newEvents);
        window.dispatchEvent(new Event('storage'));
    };

    const add = () => {
        if (!date || !title) return;
        const newEvents = [...events, { id: Date.now().toString(), date, title }].sort((a,b) => a.date.localeCompare(b.date));
        save(newEvents);
        setDate(''); setTitle('');
    };

    return (
        <div className="space-y-3">
             <div className="flex gap-2">
                <input type="date" value={date} onChange={e => setDate(e.target.value)} className="bg-gray-700 text-white p-2 rounded w-1/3 text-sm border border-gray-600" />
                <input type="text" value={title} onChange={e => setTitle(e.target.value)} placeholder="Event Title" className="bg-gray-700 text-white p-2 rounded w-2/3 text-sm border border-gray-600" />
                <button onClick={add} className="bg-yellow-400 text-black px-3 rounded font-bold">+</button>
             </div>
             <div className="space-y-2 max-h-40 overflow-y-auto">
                 {events.map(ev => (
                     <div key={ev.id} className="flex justify-between bg-gray-700/50 p-2 rounded text-sm">
                         <span><span className="text-yellow-400 mr-2">{ev.date}</span>{ev.title}</span>
                         <button onClick={() => save(events.filter(e => e.id !== ev.id))} className="text-red-400"><TrashIcon className="w-4 h-4"/></button>
                     </div>
                 ))}
             </div>
        </div>
    );
};

const ShopManager: React.FC = () => {
    const [products, setProducts] = useState<Product[]>([]);
    const [name, setName] = useState('');
    const [price, setPrice] = useState('');
    const [image, setImage] = useState('');

    useEffect(() => {
        const stored = localStorage.getItem('shop_products');
        if(stored) setProducts(JSON.parse(stored));
    }, []);

    const save = (newProds: Product[]) => {
        localStorage.setItem('shop_products', JSON.stringify(newProds));
        setProducts(newProds);
        window.dispatchEvent(new Event('storage'));
    };

    const add = () => {
        if(!name || !price) return;
        const newProd: Product = {
            id: Date.now(),
            name,
            price: parseFloat(price),
            imageUrl: image || 'https://picsum.photos/200'
        };
        save([...products, newProd]);
        setName(''); setPrice(''); setImage('');
    };

    return (
        <div className="space-y-4">
            <div className="bg-gray-900/50 p-3 rounded space-y-2 border border-gray-600">
                <input type="text" value={name} onChange={e => setName(e.target.value)} placeholder="Product Name" className="w-full bg-gray-700 text-white p-2 rounded text-sm" />
                <input type="number" value={price} onChange={e => setPrice(e.target.value)} placeholder="Price" className="w-full bg-gray-700 text-white p-2 rounded text-sm" />
                <ImageUploader onImageSelect={setImage} initialPreview={image} label="Product Image" />
                <button onClick={add} className="w-full bg-yellow-400 text-black font-bold py-2 rounded text-sm">Add Product</button>
            </div>
            <div className="space-y-2">
                {products.map(p => (
                    <div key={p.id} className="flex items-center justify-between bg-gray-700 p-2 rounded">
                        <div className="flex items-center space-x-3">
                            <img src={p.imageUrl} className="w-8 h-8 rounded object-cover" alt="" />
                            <div>
                                <p className="text-white text-sm font-bold">{p.name}</p>
                                <p className="text-xs text-yellow-400">${p.price}</p>
                            </div>
                        </div>
                        <button onClick={() => save(products.filter(i => i.id !== p.id))} className="text-red-400"><TrashIcon className="w-4 h-4"/></button>
                    </div>
                ))}
            </div>
        </div>
    );
}

const NewsManager: React.FC = () => {
    const [articles, setArticles] = useState<Article[]>([]);
    const [title, setTitle] = useState('');
    const [summary, setSummary] = useState('');
    const [category, setCategory] = useState('Diaspora');
    const [image, setImage] = useState('');

    useEffect(() => {
        const stored = localStorage.getItem('news_articles');
        if(stored) setArticles(JSON.parse(stored));
    }, []);

    const save = (newArts: Article[]) => {
        localStorage.setItem('news_articles', JSON.stringify(newArts));
        setArticles(newArts);
        window.dispatchEvent(new Event('storage'));
    };

    const add = () => {
        if(!title || !summary) return;
        const newArt: Article = {
            id: Date.now(),
            title,
            summary,
            category,
            imageUrl: image || 'https://picsum.photos/400/300',
            date: 'Just now'
        };
        save([newArt, ...articles]);
        setTitle(''); setSummary(''); setImage('');
    };

    return (
        <div className="space-y-4">
            <div className="bg-gray-900/50 p-3 rounded space-y-2 border border-gray-600">
                <input type="text" value={title} onChange={e => setTitle(e.target.value)} placeholder="News Headline" className="w-full bg-gray-700 text-white p-2 rounded text-sm" />
                <textarea value={summary} onChange={e => setSummary(e.target.value)} placeholder="Summary" className="w-full bg-gray-700 text-white p-2 rounded text-sm" rows={2} />
                <select value={category} onChange={e => setCategory(e.target.value)} className="w-full bg-gray-700 text-white p-2 rounded text-sm">
                    {['Diaspora', 'Community', 'Youth', 'Arts'].map(c => <option key={c} value={c}>{c}</option>)}
                </select>
                <ImageUploader onImageSelect={setImage} initialPreview={image} label="Article Image" />
                <button onClick={add} className="w-full bg-yellow-400 text-black font-bold py-2 rounded text-sm">Publish News</button>
            </div>
            <div className="space-y-2 max-h-60 overflow-y-auto">
                {articles.map(a => (
                    <div key={a.id} className="flex justify-between bg-gray-700 p-2 rounded">
                        <div className="w-3/4">
                            <p className="text-white text-sm font-bold truncate">{a.title}</p>
                            <span className="text-xs bg-yellow-400/20 text-yellow-400 px-1 rounded">{a.category}</span>
                        </div>
                        <button onClick={() => save(articles.filter(i => i.id !== a.id))} className="text-red-400"><TrashIcon className="w-4 h-4"/></button>
                    </div>
                ))}
            </div>
        </div>
    );
}

const HeroManager: React.FC = () => {
    const [name, setName] = useState('');
    const [title, setTitle] = useState('');
    const [bio, setBio] = useState('');
    
    useEffect(() => {
        const stored = localStorage.getItem('hero_data');
        if(stored) {
            const d = JSON.parse(stored);
            setName(d.name || '');
            setTitle(d.title || '');
            setBio(d.bio || '');
        }
    }, []);

    const save = () => {
        const data = { name, title, bio };
        localStorage.setItem('hero_data', JSON.stringify(data));
        window.dispatchEvent(new Event('storage'));
        alert("Hero Info Updated");
    }

    return (
        <div className="space-y-3">
             <PersistentImageUploader storageKey="hero_image" label="Hero Portrait" />
             <input type="text" value={name} onChange={e => setName(e.target.value)} placeholder="Name (e.g. Funmilayo Ransome-Kuti)" className="w-full bg-gray-700 text-white p-2 rounded text-sm" />
             <input type="text" value={title} onChange={e => setTitle(e.target.value)} placeholder="Title (e.g. Mother of Africa)" className="w-full bg-gray-700 text-white p-2 rounded text-sm" />
             <textarea value={bio} onChange={e => setBio(e.target.value)} placeholder="Biography..." className="w-full bg-gray-700 text-white p-2 rounded text-sm" rows={4} />
             <button onClick={save} className="bg-yellow-400 text-black px-4 py-2 rounded font-bold text-sm w-full">Update Text</button>
        </div>
    )
}

const BackendPage: React.FC = () => {
    return (
        <div className="p-4 space-y-6 pb-24">
            <h1 className="text-3xl font-bold text-white">Admin Panel</h1>
            <p className="text-sm text-gray-400">Manage content. Data is saved to your browser's local storage.</p>

            <AdminSection title="Site Texts & Titles">
                 <SiteTextManager />
            </AdminSection>

            <AdminSection title="General Settings">
                <PersistentImageUploader storageKey="app_logo" label="App Logo (Header)" />
            </AdminSection>

            <AdminSection title="Contact Page Info">
                <ContactManager />
            </AdminSection>

            <AdminSection title="Home Page Ad / Branded Radio">
                <PersistentImageUploader storageKey="home_ad_image" label="Ad/Radio Image" />
                <VideoPlaceholderInput />
            </AdminSection>

             <AdminSection title="Listener Stories (Community)">
                <TestimonialManager />
            </AdminSection>

            <AdminSection title="News & Articles">
                <NewsManager />
            </AdminSection>
            
            <AdminSection title="Marketplace Items">
                <ShopManager />
            </AdminSection>

            <AdminSection title="Akinkanju (Hero) Page">
                 <HeroManager />
            </AdminSection>

            <AdminSection title="Calendar Events">
                <CalendarManager />
            </AdminSection>
        </div>
    );
};

export default BackendPage;
