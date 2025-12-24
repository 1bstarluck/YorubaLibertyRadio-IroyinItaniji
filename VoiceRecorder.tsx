
import React, { useState, useRef, useEffect } from 'react';
import MicrophoneIcon from './icons/MicrophoneIcon';
import StopIcon from './icons/StopIcon';
import SendIcon from './icons/SendIcon';
import TrashIcon from './icons/TrashIcon';

type RecordingStatus = 'inactive' | 'recording' | 'recorded' | 'sending' | 'error';

const VoiceRecorder: React.FC = () => {
    const [status, setStatus] = useState<RecordingStatus>('inactive');
    const [audioURL, setAudioURL] = useState<string | null>(null);
    const [timer, setTimer] = useState(0);
    const mediaRecorderRef = useRef<MediaRecorder | null>(null);
    const audioChunksRef = useRef<Blob[]>([]);
    const timerIntervalRef = useRef<number | null>(null);

    // WHATSAPP CONFIGURATION
    const WHATSAPP_NUMBER = "12024609270";

    useEffect(() => {
        return () => {
            if (timerIntervalRef.current) clearInterval(timerIntervalRef.current);
            if (mediaRecorderRef.current?.stream) {
                mediaRecorderRef.current.stream.getTracks().forEach(track => track.stop());
            }
        };
    }, []);

    const startRecording = async () => {
        try {
            const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
            setStatus('recording');
            mediaRecorderRef.current = new MediaRecorder(stream);
            audioChunksRef.current = [];

            mediaRecorderRef.current.ondataavailable = event => {
                audioChunksRef.current.push(event.data);
            };

            mediaRecorderRef.current.onstop = () => {
                const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/webm' });
                const url = URL.createObjectURL(audioBlob);
                setAudioURL(url);
                setStatus('recorded');
                stream.getTracks().forEach(track => track.stop());
            };

            mediaRecorderRef.current.start();
            setTimer(0);
            timerIntervalRef.current = window.setInterval(() => {
                setTimer(prev => prev + 1);
            }, 1000);

        } catch (err) {
            console.error('Error accessing microphone:', err);
            setStatus('error');
        }
    };

    const stopRecording = () => {
        if (mediaRecorderRef.current && status === 'recording') {
            mediaRecorderRef.current.stop();
            if (timerIntervalRef.current) clearInterval(timerIntervalRef.current);
        }
    };

    const handleSend = () => {
        setStatus('sending');
        
        // 1. Download the file so the user can attach it
        if (audioURL) {
            const a = document.createElement('a');
            a.href = audioURL;
            a.download = `voice_message_${new Date().getTime()}.webm`;
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
        }

        // 2. Open WhatsApp
        setTimeout(() => {
            const message = encodeURIComponent("Hello, I have recorded a voice message for Yoruba Liberty Radio. I am attaching it now.");
            const waUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${message}`;
            window.open(waUrl, '_blank');
            
            reset();
        }, 1000);
    };

    const reset = () => {
        setStatus('inactive');
        if (audioURL) URL.revokeObjectURL(audioURL);
        setAudioURL(null);
        setTimer(0);
        if (timerIntervalRef.current) clearInterval(timerIntervalRef.current);
    };

    const formatTime = (seconds: number) => {
        const minutes = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    };

    const renderControls = () => {
        switch (status) {
            case 'recording':
                return (
                    <div className="flex flex-col items-center animate-pulse">
                        <p className="text-xl font-mono text-yellow-400 mb-2 font-bold">{formatTime(timer)}</p>
                        <button
                            onClick={stopRecording}
                            className="bg-red-600 text-white rounded-full h-16 w-16 flex items-center justify-center shadow-[0_0_20px_rgba(220,38,38,0.7)] border-4 border-gray-800"
                            aria-label="Stop recording"
                        >
                            <StopIcon className="w-8 h-8" />
                        </button>
                        <p className="text-[10px] text-red-400 mt-2 uppercase tracking-widest">Recording...</p>
                    </div>
                );
            case 'recorded':
                return (
                    <div className="w-full space-y-3">
                        <audio src={audioURL || ''} controls className="w-full h-8" />
                        <div className="flex justify-center space-x-4">
                            <button onClick={reset} className="bg-gray-700 text-gray-300 p-3 rounded-full hover:bg-red-900/50 hover:text-red-400 transition-colors">
                                <TrashIcon className="w-5 h-5" />
                            </button>
                            <button onClick={handleSend} className="bg-[#25D366] text-white py-2 px-6 rounded-full hover:bg-green-500 shadow-lg transition-colors flex items-center space-x-2">
                                <SendIcon className="w-5 h-5" />
                                <span className="font-bold text-sm">WhatsApp</span>
                            </button>
                        </div>
                        <p className="text-[10px] text-gray-400">Attach downloaded file in WhatsApp.</p>
                    </div>
                );
             case 'sending':
                return <p className="text-yellow-400 text-sm font-semibold animate-bounce">Opening WhatsApp...</p>;
            case 'error':
                 return <p className="text-red-500 text-xs text-center">Check mic permissions.</p>;
            case 'inactive':
            default:
                return (
                    <div className="flex flex-col items-center group">
                        <button
                            onClick={startRecording}
                            className="bg-red-600 text-white rounded-full h-16 w-16 flex items-center justify-center shadow-[0_0_15px_rgba(220,38,38,0.5)] transition-all transform group-hover:scale-110 group-hover:shadow-[0_0_25px_rgba(220,38,38,0.8)] border-4 border-gray-800"
                            aria-label="Start recording"
                        >
                            <MicrophoneIcon className="w-8 h-8" />
                        </button>
                        <p className="text-[10px] text-gray-400 mt-2 group-hover:text-white transition-colors">Tap to Record</p>
                    </div>
                );
        }
    };

    return (
        <div className="bg-gray-800 p-4 rounded-xl border border-gray-700 text-center shadow-lg">
            <h3 className="font-bold text-white text-sm mb-3">Voice Message to Studio</h3>
            <div className="flex flex-col items-center justify-center min-h-[100px]">
                {renderControls()}
            </div>
        </div>
    );
};

export default VoiceRecorder;
