'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';

export default function Home() {
  const [prompt, setPrompt] = useState('');
  const [style, setStyle] = useState('shonen');
  const [duration, setDuration] = useState(5);
  const [fps, setFps] = useState(24);
  const [isGenerating, setIsGenerating] = useState(false);
  const [progress, setProgress] = useState(0);
  const [generatedVideo, setGeneratedVideo] = useState<string | null>(null);

  const animeStyles = [
    { id: 'shonen', name: 'Shonen', desc: 'Action-packed, vibrant colors' },
    { id: 'shoujo', name: 'Shoujo', desc: 'Romantic, soft pastels' },
    { id: 'cyberpunk', name: 'Cyberpunk', desc: 'Neon lights, futuristic' },
    { id: 'studio-ghibli', name: 'Studio Ghibli', desc: 'Whimsical, detailed' },
    { id: 'seinen', name: 'Seinen', desc: 'Dark, mature themes' },
    { id: 'chibi', name: 'Chibi', desc: 'Cute, exaggerated features' },
  ];

  const handleGenerate = async () => {
    if (!prompt.trim()) return;

    setIsGenerating(true);
    setProgress(0);
    setGeneratedVideo(null);

    // Simulate video generation process
    const totalSteps = 100;
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= totalSteps) {
          clearInterval(interval);
          return totalSteps;
        }
        return prev + 1;
      });
    }, 50);

    // Simulate API call
    setTimeout(() => {
      clearInterval(interval);
      setProgress(100);
      // Create a demo canvas video
      const canvas = document.createElement('canvas');
      canvas.width = 1280;
      canvas.height = 720;
      const ctx = canvas.getContext('2d');

      if (ctx) {
        // Create gradient background based on style
        const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
        if (style === 'shonen') {
          gradient.addColorStop(0, '#FF6B6B');
          gradient.addColorStop(1, '#4ECDC4');
        } else if (style === 'shoujo') {
          gradient.addColorStop(0, '#FFB6D9');
          gradient.addColorStop(1, '#D4A5FF');
        } else if (style === 'cyberpunk') {
          gradient.addColorStop(0, '#0D1B2A');
          gradient.addColorStop(1, '#FF006E');
        } else if (style === 'studio-ghibli') {
          gradient.addColorStop(0, '#88D498');
          gradient.addColorStop(1, '#87CEEB');
        } else if (style === 'seinen') {
          gradient.addColorStop(0, '#2C3E50');
          gradient.addColorStop(1, '#8B0000');
        } else {
          gradient.addColorStop(0, '#FFC0CB');
          gradient.addColorStop(1, '#FFE4E1');
        }

        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        // Add text
        ctx.fillStyle = 'white';
        ctx.font = 'bold 48px Arial';
        ctx.textAlign = 'center';
        ctx.shadowColor = 'rgba(0, 0, 0, 0.8)';
        ctx.shadowBlur = 10;
        ctx.fillText(prompt, canvas.width / 2, canvas.height / 2);

        ctx.font = '24px Arial';
        ctx.fillText(`Style: ${animeStyles.find(s => s.id === style)?.name}`, canvas.width / 2, canvas.height / 2 + 60);
        ctx.fillText(`${duration}s @ ${fps}fps`, canvas.width / 2, canvas.height / 2 + 100);
      }

      setGeneratedVideo(canvas.toDataURL('image/png'));
      setIsGenerating(false);
    }, 5000);
  };

  return (
    <div className="min-h-screen p-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h1 className="text-6xl font-bold mb-4 bg-gradient-to-r from-purple-400 via-pink-500 to-blue-500 bg-clip-text text-transparent">
            Anime Video Generator
          </h1>
          <p className="text-xl text-gray-300">Transform your ideas into stunning anime-style videos</p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Left Panel - Controls */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="space-y-6"
          >
            {/* Prompt Input */}
            <div>
              <label className="block text-lg font-semibold mb-2">Video Prompt</label>
              <textarea
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                placeholder="Describe your anime scene... (e.g., 'A hero with spiky hair charging up an energy attack')"
                className="w-full h-32 p-4 rounded-lg bg-gray-800/50 border border-purple-500/30 focus:border-purple-500 focus:outline-none resize-none"
              />
            </div>

            {/* Style Selection */}
            <div>
              <label className="block text-lg font-semibold mb-3">Anime Style</label>
              <div className="grid grid-cols-2 gap-3">
                {animeStyles.map((s) => (
                  <motion.button
                    key={s.id}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setStyle(s.id)}
                    className={`p-4 rounded-lg border-2 transition-all ${
                      style === s.id
                        ? 'border-purple-500 bg-purple-500/20 glow'
                        : 'border-gray-700 bg-gray-800/30 hover:border-purple-500/50'
                    }`}
                  >
                    <div className="font-bold">{s.name}</div>
                    <div className="text-sm text-gray-400">{s.desc}</div>
                  </motion.button>
                ))}
              </div>
            </div>

            {/* Duration Slider */}
            <div>
              <label className="block text-lg font-semibold mb-2">
                Duration: {duration}s
              </label>
              <input
                type="range"
                min="3"
                max="30"
                value={duration}
                onChange={(e) => setDuration(Number(e.target.value))}
                className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer accent-purple-500"
              />
            </div>

            {/* FPS Selection */}
            <div>
              <label className="block text-lg font-semibold mb-2">Frame Rate</label>
              <div className="flex gap-3">
                {[12, 24, 30, 60].map((f) => (
                  <motion.button
                    key={f}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setFps(f)}
                    className={`flex-1 py-3 rounded-lg border-2 font-bold transition-all ${
                      fps === f
                        ? 'border-purple-500 bg-purple-500/20'
                        : 'border-gray-700 bg-gray-800/30 hover:border-purple-500/50'
                    }`}
                  >
                    {f} fps
                  </motion.button>
                ))}
              </div>
            </div>

            {/* Generate Button */}
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={handleGenerate}
              disabled={isGenerating || !prompt.trim()}
              className={`w-full py-4 rounded-lg font-bold text-lg transition-all ${
                isGenerating || !prompt.trim()
                  ? 'bg-gray-700 cursor-not-allowed'
                  : 'anime-gradient glow hover:shadow-2xl'
              }`}
            >
              {isGenerating ? 'Generating...' : 'Generate Video'}
            </motion.button>

            {/* Progress Bar */}
            {isGenerating && (
              <div className="space-y-2">
                <div className="w-full bg-gray-700 rounded-full h-3 overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${progress}%` }}
                    className="h-full anime-gradient"
                  />
                </div>
                <div className="text-center text-sm text-gray-400">
                  Processing frames... {progress}%
                </div>
              </div>
            )}
          </motion.div>

          {/* Right Panel - Preview */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="space-y-4"
          >
            <div className="bg-gray-800/30 rounded-lg border border-purple-500/30 p-6 min-h-[600px] flex items-center justify-center">
              {generatedVideo ? (
                <div className="space-y-4 w-full">
                  <img
                    src={generatedVideo}
                    alt="Generated anime video preview"
                    className="w-full rounded-lg shadow-2xl"
                  />
                  <div className="flex gap-3">
                    <motion.a
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      href={generatedVideo}
                      download="anime-video.png"
                      className="flex-1 py-3 rounded-lg bg-green-600 hover:bg-green-700 text-center font-bold transition-all"
                    >
                      Download
                    </motion.a>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => setGeneratedVideo(null)}
                      className="flex-1 py-3 rounded-lg bg-gray-700 hover:bg-gray-600 font-bold transition-all"
                    >
                      New Video
                    </motion.button>
                  </div>
                </div>
              ) : (
                <div className="text-center space-y-4">
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
                    className="inline-block text-6xl"
                  >
                    🎬
                  </motion.div>
                  <div className="text-gray-400">
                    {isGenerating
                      ? 'Creating your anime masterpiece...'
                      : 'Your generated video will appear here'}
                  </div>
                </div>
              )}
            </div>

            {/* Info Cards */}
            <div className="grid grid-cols-3 gap-3">
              <div className="bg-gray-800/30 rounded-lg p-4 border border-purple-500/20 text-center">
                <div className="text-2xl font-bold text-purple-400">{duration}s</div>
                <div className="text-xs text-gray-400">Duration</div>
              </div>
              <div className="bg-gray-800/30 rounded-lg p-4 border border-purple-500/20 text-center">
                <div className="text-2xl font-bold text-purple-400">{fps}</div>
                <div className="text-xs text-gray-400">FPS</div>
              </div>
              <div className="bg-gray-800/30 rounded-lg p-4 border border-purple-500/20 text-center">
                <div className="text-2xl font-bold text-purple-400">{duration * fps}</div>
                <div className="text-xs text-gray-400">Frames</div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Footer */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="mt-12 text-center text-gray-500 text-sm"
        >
          <p>Powered by AI • Create stunning anime videos in seconds</p>
        </motion.div>
      </div>
    </div>
  );
}
