import { useState, useRef, useEffect } from 'react';
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import SEOHead from "../../components/SEOHead";
import Cropper from 'react-easy-crop';

interface Platform {
  id: string;
  name: string;
  icon: string;
  color: string;
  presets: ImagePreset[];
}

interface ImagePreset {
  id: string;
  name: string;
  width: number;
  height: number;
  aspectRatio: number;
  description: string;
  useCase: string;
}

const PLATFORMS: Platform[] = [
  {
    id: "instagram",
    name: "Instagram",
    icon: "📸",
    color: "from-pink-500 to-purple-600",
    presets: [
      { id: "profile", name: "Profile Picture", width: 320, height: 320, aspectRatio: 1, description: "Perfect square for Instagram profile", useCase: "Profile photos" },
      { id: "post", name: "Square Post", width: 1080, height: 1080, aspectRatio: 1, description: "Standard square post", useCase: "Regular posts" },
      { id: "story", name: "Story", width: 1080, height: 1920, aspectRatio: 9/16, description: "Vertical story format", useCase: "Instagram Stories" },
      { id: "reel", name: "Reel", width: 1080, height: 1920, aspectRatio: 9/16, description: "Vertical video format", useCase: "Instagram Reels" },
      { id: "carousel", name: "Carousel", width: 1080, height: 1080, aspectRatio: 1, description: "Square carousel post", useCase: "Multiple image posts" },
    ]
  },
  {
    id: "tiktok",
    name: "TikTok",
    icon: "🎵",
    color: "from-black to-gray-800",
    presets: [
      { id: "profile", name: "Profile Picture", width: 200, height: 200, aspectRatio: 1, description: "TikTok profile photo", useCase: "Profile photos" },
      { id: "video", name: "Video", width: 1080, height: 1920, aspectRatio: 9/16, description: "Vertical video format", useCase: "TikTok videos" },
      { id: "cover", name: "Video Cover", width: 1080, height: 1920, aspectRatio: 9/16, description: "Video thumbnail", useCase: "Video covers" },
    ]
  },
  {
    id: "twitter",
    name: "Twitter/X",
    icon: "🐦",
    color: "from-blue-400 to-blue-600",
    presets: [
      { id: "profile", name: "Profile Picture", width: 400, height: 400, aspectRatio: 1, description: "Twitter profile photo", useCase: "Profile photos" },
      { id: "header", name: "Header Image", width: 1500, height: 500, aspectRatio: 3, description: "Twitter header banner", useCase: "Header images" },
      { id: "post", name: "Post Image", width: 1200, height: 675, aspectRatio: 16/9, description: "Standard post image", useCase: "Tweet images" },
    ]
  },
  {
    id: "facebook",
    name: "Facebook",
    icon: "📘",
    color: "from-blue-600 to-blue-800",
    presets: [
      { id: "profile", name: "Profile Picture", width: 170, height: 170, aspectRatio: 1, description: "Facebook profile photo", useCase: "Profile photos" },
      { id: "cover", name: "Cover Photo", width: 851, height: 315, aspectRatio: 2.7, description: "Facebook cover photo", useCase: "Cover photos" },
      { id: "post", name: "Post Image", width: 1200, height: 630, aspectRatio: 1.91, description: "Standard post image", useCase: "Post images" },
    ]
  },
  {
    id: "linkedin",
    name: "LinkedIn",
    icon: "💼",
    color: "from-blue-700 to-blue-900",
    presets: [
      { id: "profile", name: "Profile Picture", width: 400, height: 400, aspectRatio: 1, description: "LinkedIn profile photo", useCase: "Profile photos" },
      { id: "banner", name: "Banner Image", width: 1584, height: 396, aspectRatio: 4, description: "LinkedIn banner image", useCase: "Banner images" },
      { id: "post", name: "Post Image", width: 1200, height: 627, aspectRatio: 1.91, description: "Standard post image", useCase: "Post images" },
    ]
  },
  {
    id: "youtube",
    name: "YouTube",
    icon: "📺",
    color: "from-red-500 to-red-700",
    presets: [
      { id: "profile", name: "Profile Picture", width: 800, height: 800, aspectRatio: 1, description: "YouTube profile photo", useCase: "Profile photos" },
      { id: "banner", name: "Banner Image", width: 2560, height: 1440, aspectRatio: 16/9, description: "YouTube banner image", useCase: "Channel banners" },
      { id: "thumbnail", name: "Video Thumbnail", width: 1280, height: 720, aspectRatio: 16/9, description: "Video thumbnail", useCase: "Video thumbnails" },
    ]
  }
];

export default function ProfileImageResizer() {
  const [selectedPlatform, setSelectedPlatform] = useState(PLATFORMS[0]);
  const [selectedPreset, setSelectedPreset] = useState(PLATFORMS[0].presets[0]);
  const [image, setImage] = useState<string | null>(null);
  const [originalImage, setOriginalImage] = useState<{ width: number; height: number; file: File } | null>(null);
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState<{ x: number; y: number; width: number; height: number } | null>(null);
  const [showCrop, setShowCrop] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [showInstructions, setShowInstructions] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const handleFileUpload = (file: File) => {
    if (!file.type.startsWith('image/')) {
      alert('Please select an image file');
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      const img = new Image();
      img.onload = () => {
        setOriginalImage({ width: img.naturalWidth, height: img.naturalHeight, file });
        setImage(e.target?.result as string);
        setShowCrop(true);
      };
      img.src = e.target?.result as string;
    };
    reader.readAsDataURL(file);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file) handleFileUpload(file);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const onCropComplete = (croppedArea: { x: number; y: number; width: number; height: number }, croppedAreaPixels: { x: number; y: number; width: number; height: number }) => {
    setCroppedAreaPixels(croppedAreaPixels);
  };

  const applyCrop = async () => {
    if (!image || !croppedAreaPixels || !canvasRef.current) return;

    setIsProcessing(true);
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const img = new Image();
    img.onload = () => {
      canvas.width = selectedPreset.width;
      canvas.height = selectedPreset.height;

      ctx.drawImage(
        img,
        croppedAreaPixels.x,
        croppedAreaPixels.y,
        croppedAreaPixels.width,
        croppedAreaPixels.height,
        0,
        0,
        selectedPreset.width,
        selectedPreset.height
      );

      setIsProcessing(false);
    };
    img.src = image;
  };

  const downloadImage = () => {
    if (!canvasRef.current) return;

    const canvas = canvasRef.current;
    const link = document.createElement('a');
    link.download = `${selectedPlatform.name.toLowerCase()}-${selectedPreset.name.toLowerCase().replace(/\s+/g, '-')}-${Date.now()}.png`;
    link.href = canvas.toDataURL();
    link.click();
  };

  const resetImage = () => {
    setImage(null);
    setOriginalImage(null);
    setShowCrop(false);
    setCrop({ x: 0, y: 0 });
    setZoom(1);
    setCroppedAreaPixels(null);
  };

  const getFileSize = (base64: string): string => {
    const stringLength = base64.length - 'data:image/png;base64,'.length;
    const sizeInBytes = 4 * Math.ceil(stringLength / 3) * 0.75;
    const sizeInKb = sizeInBytes / 1024;
    return sizeInKb > 1024 ? `${(sizeInKb / 1024).toFixed(1)} MB` : `${sizeInKb.toFixed(1)} KB`;
  };

  return (
    <>
      <SEOHead
        title="Profile Picture & Post Image Resizer | ZapTools"
        description="Resize and crop images for Instagram, TikTok, Twitter, and Facebook. Instantly create perfect profile pictures and post images with ZapTools."
        keywords="profile picture resizer, image resizer, instagram image size, tiktok image size, twitter image size, facebook image size"
        url="https://zaptools.tech/tools/profile-image-resizer"
        contentType="tool"
        category="Social Media"
      />
      <Header />
      <main className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-black text-gray-900 mb-4">Profile Picture & Post Image Resizer</h1>
            <p className="text-xl text-gray-700 mb-6">Resize and crop images for all your social media needs</p>
          </div>

          {/* Instructions */}
          <div className="mb-8">
            <button
              type="button"
              className="flex items-center gap-2 font-bold text-blue-700 text-lg focus:outline-none mb-2"
              onClick={() => setShowInstructions(v => !v)}
              aria-expanded={showInstructions}
            >
              <span>ℹ️</span> How to Use
              <svg className={`w-5 h-5 transform transition-transform duration-200 ${showInstructions ? '' : 'rotate-180'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
            </button>
            {showInstructions && (
              <div className="bg-blue-50 border-l-4 border-blue-400 rounded-xl p-6 shadow-sm animate-fade-in">
                <ul className="list-disc list-inside text-sm text-blue-900 space-y-2">
                  <li><strong>Select a platform</strong> to choose from platform-specific presets</li>
                  <li><strong>Choose a preset</strong> for the exact dimensions you need</li>
                  <li><strong>Upload your image</strong> by dragging and dropping or clicking the upload area</li>
                  <li><strong>Crop and adjust</strong> your image to fit the selected dimensions</li>
                  <li><strong>Download</strong> your perfectly sized image</li>
                </ul>
              </div>
            )}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Left Column - Controls */}
            <div className="space-y-6">
              {/* Platform Selector */}
              <div className="bg-white rounded-3xl shadow-xl p-6 border border-gray-100">
                <h2 className="text-xl font-bold text-gray-900 mb-4">Select Platform</h2>
                <div className="grid grid-cols-2 gap-3">
                  {PLATFORMS.map(platform => (
                    <button
                      key={platform.id}
                      onClick={() => {
                        setSelectedPlatform(platform);
                        setSelectedPreset(platform.presets[0]);
                      }}
                      className={`flex items-center gap-3 p-4 rounded-xl font-bold transition-all duration-200 border-2 ${selectedPlatform.id === platform.id ? `bg-gradient-to-r ${platform.color} text-white border-transparent shadow-lg` : 'bg-white text-gray-700 border-gray-200 hover:bg-gray-50'}`}
                    >
                      <span className="text-2xl">{platform.icon}</span>
                      {platform.name}
                    </button>
                  ))}
                </div>
              </div>

              {/* Preset Selector */}
              <div className="bg-white rounded-3xl shadow-xl p-6 border border-gray-100">
                <h2 className="text-xl font-bold text-gray-900 mb-4">Select Preset</h2>
                <div className="space-y-3">
                  {selectedPlatform.presets.map(preset => (
                    <button
                      key={preset.id}
                      onClick={() => setSelectedPreset(preset)}
                      className={`w-full text-left p-4 rounded-xl border-2 transition-all duration-200 ${selectedPreset.id === preset.id ? 'border-blue-500 bg-blue-50' : 'border-gray-200 hover:bg-gray-50'}`}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="font-bold text-gray-900">{preset.name}</h3>
                        <span className="text-sm font-mono text-gray-600">{preset.width} × {preset.height}</span>
                      </div>
                      <p className="text-sm text-gray-600 mb-1">{preset.description}</p>
                      <p className="text-xs text-gray-500">Use case: {preset.useCase}</p>
                    </button>
                  ))}
                </div>
              </div>

              {/* Upload Area */}
              {!image && (
                <div className="bg-white rounded-3xl shadow-xl p-6 border border-gray-100">
                  <h2 className="text-xl font-bold text-gray-900 mb-4">Upload Image</h2>
                  <div
                    className="border-2 border-dashed border-gray-300 rounded-xl p-8 text-center hover:border-blue-400 transition-colors duration-200 cursor-pointer"
                    onDrop={handleDrop}
                    onDragOver={handleDragOver}
                    onClick={() => fileInputRef.current?.click()}
                  >
                    <div className="text-4xl mb-4">📁</div>
                    <p className="text-lg font-semibold text-gray-700 mb-2">Drop your image here</p>
                    <p className="text-sm text-gray-500 mb-4">or click to browse</p>
                    <button className="px-6 py-3 bg-blue-500 text-white font-bold rounded-xl hover:bg-blue-600 transition-colors duration-200">
                      Choose File
                    </button>
                  </div>
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    onChange={(e) => e.target.files?.[0] && handleFileUpload(e.target.files[0])}
                    className="hidden"
                  />
                </div>
              )}

              {/* Image Info */}
              {originalImage && (
                <div className="bg-white rounded-3xl shadow-xl p-6 border border-gray-100">
                  <h2 className="text-xl font-bold text-gray-900 mb-4">Image Information</h2>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Original Size:</span>
                      <span className="font-mono">{originalImage.width} × {originalImage.height}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Target Size:</span>
                      <span className="font-mono">{selectedPreset.width} × {selectedPreset.height}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Aspect Ratio:</span>
                      <span className="font-mono">{selectedPreset.aspectRatio.toFixed(2)}:1</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">File Size:</span>
                      <span className="font-mono">{getFileSize(image || '')}</span>
                    </div>
                  </div>
                </div>
              )}

              {/* Action Buttons */}
              {image && (
                <div className="bg-white rounded-3xl shadow-xl p-6 border border-gray-100">
                  <h2 className="text-xl font-bold text-gray-900 mb-4">Actions</h2>
                  <div className="space-y-3">
                    <button
                      onClick={applyCrop}
                      disabled={isProcessing}
                      className="w-full px-6 py-3 bg-green-500 text-white font-bold rounded-xl hover:bg-green-600 transition-colors duration-200 disabled:opacity-50"
                    >
                      {isProcessing ? '🔄 Processing...' : '✂️ Apply Crop'}
                    </button>
                    <button
                      onClick={downloadImage}
                      disabled={!canvasRef.current}
                      className="w-full px-6 py-3 bg-blue-500 text-white font-bold rounded-xl hover:bg-blue-600 transition-colors duration-200 disabled:opacity-50"
                    >
                      📥 Download Image
                    </button>
                    <button
                      onClick={resetImage}
                      className="w-full px-6 py-3 bg-red-500 text-white font-bold rounded-xl hover:bg-red-600 transition-colors duration-200"
                    >
                      🔄 Reset Image
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Right Column - Preview */}
            <div className="space-y-6">
              {/* Crop Area */}
              {showCrop && image && (
                <div className="bg-white rounded-3xl shadow-xl p-6 border border-gray-100">
                  <h2 className="text-xl font-bold text-gray-900 mb-4">Crop & Preview</h2>
                  <div className="relative bg-gray-100 rounded-xl overflow-hidden" style={{ height: '400px' }}>
                    <Cropper
                      image={image}
                      crop={crop}
                      zoom={zoom}
                      aspect={selectedPreset.aspectRatio}
                      onCropChange={setCrop}
                      onZoomChange={setZoom}
                      onCropComplete={onCropComplete}
                      style={{
                        containerStyle: {
                          width: '100%',
                          height: '100%',
                          backgroundColor: '#f3f4f6',
                        },
                      }}
                    />
                  </div>
                  <div className="mt-4">
                    <label className="block text-sm font-medium text-gray-700 mb-2">Zoom: {zoom.toFixed(2)}x</label>
                    <input
                      type="range"
                      min={1}
                      max={3}
                      step={0.1}
                      value={zoom}
                      onChange={(e) => setZoom(Number(e.target.value))}
                      className="w-full"
                    />
                  </div>
                </div>
              )}

              {/* Final Preview */}
              <div className="bg-white rounded-3xl shadow-xl p-6 border border-gray-100">
                <h2 className="text-xl font-bold text-gray-900 mb-4">Final Preview</h2>
                <div className="bg-gray-100 rounded-xl p-4 flex items-center justify-center min-h-[300px]">
                  {canvasRef.current ? (
                    <canvas
                      ref={canvasRef}
                      className="max-w-full max-h-[280px] rounded-lg shadow-lg"
                    />
                  ) : (
                    <div className="text-center text-gray-500">
                      <div className="text-4xl mb-4">🖼️</div>
                      <p>Apply crop to see preview</p>
                    </div>
                  )}
                </div>
                {canvasRef.current && (
                  <div className="mt-4 text-center">
                    <p className="text-sm text-gray-600">
                      Size: {selectedPreset.width} × {selectedPreset.height} pixels
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
} 