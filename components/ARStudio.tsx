
import React, { useState, useRef, useEffect, useCallback } from 'react';
import { Sparkles, Wand2, Camera, RefreshCw, X, Download } from 'lucide-react';
import { generateLensIdeas, applyAIFilterToImage } from '../services/geminiService';

const ARStudio: React.FC = () => {
  const [prompt, setPrompt] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [ideas, setIdeas] = useState<any[]>([]);
  const [activePreview, setActivePreview] = useState<string | null>(null);
  const [isApplyingFilter, setIsApplyingFilter] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    startCamera();
    return () => stopCamera();
  }, []);

  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: 'user' } });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
    } catch (err) {
      setError("Camera access denied or unavailable.");
    }
  };

  const stopCamera = () => {
    if (videoRef.current && videoRef.current.srcObject) {
      const tracks = (videoRef.current.srcObject as MediaStream).getTracks();
      tracks.forEach(track => track.stop());
    }
  };

  const handleGenerateIdeas = async () => {
    if (!prompt.trim()) return;
    setIsGenerating(true);
    try {
      const results = await generateLensIdeas(prompt);
      setIdeas(results);
    } catch (err) {
      setError("Failed to generate ideas. Please check your API key.");
    } finally {
      setIsGenerating(false);
    }
  };

  const captureAndPreview = async (ideaDescription: string) => {
    if (!videoRef.current || !canvasRef.current) return;
    setIsApplyingFilter(true);
    setError(null);

    const canvas = canvasRef.current;
    const video = videoRef.current;
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    const ctx = canvas.getContext('2d');
    if (ctx) {
      ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
      const base64Image = canvas.toDataURL('image/png').split(',')[1];
      
      try {
        const filteredImage = await applyAIFilterToImage(base64Image, ideaDescription);
        if (filteredImage) {
          setActivePreview(filteredImage);
        }
      } catch (err) {
        setError("Failed to apply AI filter.");
      } finally {
        setIsApplyingFilter(false);
      }
    }
  };

  return (
    <div className="p-8 max-w-7xl mx-auto flex flex-col lg:flex-row gap-8 animate-in fade-in zoom-in-95 duration-700">
      {/* Left: Creator Tool */}
      <div className="flex-1 space-y-8">
        <header>
          <h1 className="text-4xl font-bold mb-4 flex items-center gap-3">
            <Wand2 className="text-violet-500" />
            AI AR Designer
          </h1>
          <p className="text-zinc-400">Describe the vibe of your lens, and let Gemini craft the concept.</p>
        </header>

        <div className="glass p-6 rounded-3xl space-y-4">
          <textarea
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder="e.g. A digital holographic mask that reacts to sound with cyan waves..."
            className="w-full bg-white/5 border border-white/10 rounded-2xl p-4 text-white focus:outline-none focus:ring-2 focus:ring-violet-500 min-h-[120px] transition-all"
          />
          <button
            onClick={handleGenerateIdeas}
            disabled={isGenerating || !prompt}
            className="w-full bg-violet-600 hover:bg-violet-700 disabled:opacity-50 disabled:cursor-not-allowed text-white py-4 rounded-2xl font-bold flex items-center justify-center gap-2 transition-all"
          >
            {isGenerating ? <RefreshCw className="animate-spin" /> : <Sparkles size={20} />}
            {isGenerating ? 'Designing...' : 'Generate Concepts'}
          </button>
        </div>

        {error && (
          <div className="bg-red-500/10 border border-red-500/20 text-red-400 p-4 rounded-2xl text-sm">
            {error}
          </div>
        )}

        <div className="space-y-4">
          <h2 className="text-xl font-bold flex items-center gap-2">
            Suggested Concepts
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {ideas.length === 0 && !isGenerating && (
              <div className="col-span-2 py-12 text-center text-zinc-500 italic border-2 border-dashed border-white/5 rounded-3xl">
                Your AI-generated concepts will appear here.
              </div>
            )}
            {ideas.map((idea, idx) => (
              <div key={idx} className="glass p-5 rounded-2xl group hover:border-violet-500/50 transition-all flex flex-col h-full">
                <span className="text-[10px] uppercase font-black tracking-widest text-violet-400 mb-2">
                  {idea.category}
                </span>
                <h3 className="font-bold text-lg mb-2">{idea.title}</h3>
                <p className="text-sm text-zinc-400 mb-6 flex-1">{idea.description}</p>
                <button
                  onClick={() => captureAndPreview(idea.description)}
                  className="w-full py-2 bg-white/5 hover:bg-white/10 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-2"
                >
                  <Camera size={14} />
                  Try Sample Preview
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Right: Live Preview */}
      <div className="w-full lg:w-[450px] space-y-6">
        <div className="sticky top-8">
          <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
            Live Preview
          </h2>
          <div className="aspect-[3/4] glass rounded-3xl overflow-hidden relative group">
            {!activePreview ? (
              <>
                <video
                  ref={videoRef}
                  autoPlay
                  playsInline
                  className="w-full h-full object-cover grayscale brightness-75 group-hover:grayscale-0 transition-all duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex flex-col justify-end p-8 text-center">
                  <Camera className="mx-auto mb-4 text-white/50 animate-pulse" size={48} />
                  <p className="text-white text-sm font-medium">Capture a concept to see the AI lens preview</p>
                </div>
              </>
            ) : (
              <div className="relative w-full h-full animate-in zoom-in-105 duration-500">
                <img src={activePreview} alt="Preview" className="w-full h-full object-cover" />
                <button
                  onClick={() => setActivePreview(null)}
                  className="absolute top-4 right-4 p-2 bg-black/60 backdrop-blur-md rounded-full border border-white/20 text-white hover:bg-white/10 transition-all"
                >
                  <X size={20} />
                </button>
                <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-3">
                  <button className="bg-violet-600 text-white px-6 py-2 rounded-full font-bold text-sm shadow-xl flex items-center gap-2">
                    <Download size={16} /> Save Lens
                  </button>
                </div>
              </div>
            )}

            {isApplyingFilter && (
              <div className="absolute inset-0 bg-black/60 backdrop-blur-md flex flex-col items-center justify-center text-center p-8 z-20">
                <div className="w-16 h-16 border-4 border-violet-600 border-t-transparent rounded-full animate-spin mb-6" />
                <h3 className="text-xl font-bold mb-2">Applying AI Lens...</h3>
                <p className="text-zinc-400 text-sm">Gemini is rendering your concept onto the frame.</p>
              </div>
            )}
          </div>
          <canvas ref={canvasRef} className="hidden" />
        </div>
      </div>
    </div>
  );
};

export default ARStudio;
