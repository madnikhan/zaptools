import { useState, useRef, useEffect, useCallback } from 'react';
import { DndContext, closestCenter, PointerSensor, useSensor, useSensors, DragEndEvent } from '@dnd-kit/core';
import { arrayMove, SortableContext, useSortable, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import Head from 'next/head';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import JSZip from 'jszip';
import Cropper from 'react-easy-crop';

// Import piexifjs with type assertion
const piexif = require('piexifjs') as any;

type ImageItem = {
  file: File;
  originalUrl: string;
  trueOriginalUrl: string;
  compressedUrl: string | null;
  originalSize: number;
  compressedSize: number | null;
  isProcessing: boolean;
  format: string;
  width: number;
  height: number;
  resizeWidth: string;
  resizeHeight: string;
  formatOverride?: string;
};

// BeforeAfterSlider component
function BeforeAfterSlider({ originalUrl, compressedUrl }: { originalUrl: string, compressedUrl: string | null }) {
  const [sliderPos, setSliderPos] = useState(50);
  const [aspectRatio, setAspectRatio] = useState(1);
  const imgRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    if (!originalUrl) return;
    const img = new window.Image();
    img.src = originalUrl;
    img.onload = () => {
      if (img.naturalWidth && img.naturalHeight) {
        setAspectRatio(img.naturalWidth / img.naturalHeight);
      }
    };
  }, [originalUrl]);

  // Prevent drag events from interfering with slider interaction
  const handleSliderInteraction = (e: React.MouseEvent | React.TouchEvent) => {
    e.stopPropagation();
    e.preventDefault();
  };

  const isSame = !compressedUrl || compressedUrl === originalUrl;

  return (
    <div
      className="relative w-full bg-gray-200 dark:bg-gray-700 rounded overflow-hidden select-none"
      style={{ aspectRatio: `${aspectRatio}` }}
      onMouseDown={handleSliderInteraction}
      onTouchStart={handleSliderInteraction}
    >
      {/* Original image (always visible) */}
      <img ref={imgRef} src={originalUrl} alt="Original" className="absolute top-0 left-0 w-full h-full object-contain" style={{ zIndex: 1 }} />
      {/* Compressed image (visible up to sliderPos%) */}
      {compressedUrl && (
        <div
          className="absolute top-0 left-0 h-full"
          style={{ width: `${sliderPos}%`, overflow: 'hidden', zIndex: 2 }}
        >
          <img src={compressedUrl} alt="Compressed" className="w-full h-full object-contain" />
        </div>
      )}
      {/* Slider handle */}
      <input
        type="range"
        min={0}
        max={100}
        value={sliderPos}
        onChange={e => setSliderPos(Number(e.target.value))}
        onMouseDown={handleSliderInteraction}
        onTouchStart={handleSliderInteraction}
        className="absolute bottom-2 left-2 right-2 w-[calc(100%-1rem)] z-10"
        aria-label="Before and after comparison slider"
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={sliderPos}
        aria-valuetext={`${sliderPos}% compressed image shown`}
      />
      {/* Vertical divider */}
      <div
        className="absolute top-0 bottom-0"
        style={{ left: `${sliderPos}%`, width: 2, background: 'rgba(59,130,246,0.7)', zIndex: 5 }}
      />
      {isSame && (
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 bg-yellow-100 text-yellow-800 text-xs px-3 py-1 rounded shadow z-20">
          No after image yet. Try compressing or cropping!
        </div>
      )}
    </div>
  );
}

export default function ImageCompressor() {
  const [images, setImages] = useState<ImageItem[]>([]);
  const [compression, setCompression] = useState(0.7); // 0.1 - 1.0
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [globalFormat, setGlobalFormat] = useState('auto');
  const [darkMode, setDarkMode] = useState(false);
  const [showWatermark, setShowWatermark] = useState(false);
  const [showCrop, setShowCrop] = useState<{ idx: number, open: boolean }>({ idx: -1, open: false });
  const [showPreview, setShowPreview] = useState<{ idx: number, open: boolean }>({ idx: -1, open: false });
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState<{ x: number; y: number; width: number; height: number } | null>(null);
  const [watermarkText, setWatermarkText] = useState('ZapTools');
  const [watermarkPosition, setWatermarkPosition] = useState('bottom-right');
  const [removeMetadata, setRemoveMetadata] = useState(false);
  const [imageHistory, setImageHistory] = useState<Array<Array<typeof images[0]>>>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const [shareableLink, setShareableLink] = useState<string | null>(null);
  const [isGeneratingLink, setIsGeneratingLink] = useState(false);
  const [compressionProgress, setCompressionProgress] = useState<{ [key: number]: number }>({});
  const sensors = useSensors(useSensor(PointerSensor));
  const [showFeatureSummary, setShowFeatureSummary] = useState(false);

  // Save current state to history
  const saveToHistory = useCallback((newImages: typeof images) => {
    const newHistory = imageHistory.slice(0, historyIndex + 1);
    newHistory.push(JSON.parse(JSON.stringify(newImages)));
    setImageHistory(newHistory);
    setHistoryIndex(newHistory.length - 1);
  }, [imageHistory, historyIndex]);

  // Handle file upload (multiple)
  const handleFiles = useCallback((fileList: FileList | null) => {
    if (!fileList || fileList.length === 0) return;
    const newImages = Array.from(fileList).map((imgFile) => {
      const url = URL.createObjectURL(imgFile);
      return {
        file: imgFile,
        originalUrl: url,
        trueOriginalUrl: url,
        compressedUrl: null,
        originalSize: imgFile.size,
        compressedSize: null,
        isProcessing: false,
        format: imgFile.type,
        width: 0,
        height: 0,
        resizeWidth: '',
        resizeHeight: '',
        formatOverride: undefined,
      };
    });
    setImages((prev) => [...prev, ...newImages]);
    saveToHistory([...images, ...newImages]);
  }, [images, saveToHistory]);

  // Compress image using canvas
  const handleCompress = useCallback(async () => {
    if (images.length === 0) return;
    setImages((prev) => prev.map(img => ({
      ...img,
      isProcessing: true
    })));
    setCompressionProgress({});
    try {
      const updatedImages = await Promise.all(images.map(async (img, idx) => {
        setCompressionProgress(prev => ({ ...prev, [idx]: 10 }));
        const imgElement = new window.Image();
        imgElement.src = img.originalUrl;
        await new Promise((resolve, reject) => {
          imgElement.onload = resolve;
          imgElement.onerror = reject;
        });
        setCompressionProgress(prev => ({ ...prev, [idx]: 30 }));
        
        const canvas = document.createElement('canvas');
        let targetWidth = imgElement.naturalWidth;
        let targetHeight = imgElement.naturalHeight;
        
        // Apply resize if specified
        if (img.resizeWidth && img.resizeHeight) {
          targetWidth = parseInt(img.resizeWidth);
          targetHeight = parseInt(img.resizeHeight);
        } else if (img.resizeWidth) {
          const ratio = imgElement.naturalHeight / imgElement.naturalWidth;
          targetWidth = parseInt(img.resizeWidth);
          targetHeight = Math.round(targetWidth * ratio);
        } else if (img.resizeHeight) {
          const ratio = imgElement.naturalWidth / imgElement.naturalHeight;
          targetHeight = parseInt(img.resizeHeight);
          targetWidth = Math.round(targetHeight * ratio);
        }
        
        canvas.width = targetWidth;
        canvas.height = targetHeight;
        const ctx = canvas.getContext('2d');
        if (!ctx) throw new Error('Failed to get canvas context');
        ctx.drawImage(imgElement, 0, 0, targetWidth, targetHeight);
        setCompressionProgress(prev => ({ ...prev, [idx]: 60 }));
        
        // Apply watermark if enabled
        if (showWatermark) {
          applyWatermark(ctx, canvas);
        }
        setCompressionProgress(prev => ({ ...prev, [idx]: 80 }));
        
        // Use original type if possible, else fallback to jpeg
        let type = img.format;
        if (!['image/jpeg', 'image/webp', 'image/png'].includes(type)) type = 'image/jpeg';
        // PNG compression is not supported by canvas, so always use jpeg/webp for output
        if (type === 'image/png') type = 'image/jpeg';
        
        const dataUrl = canvas.toDataURL(type, compression);
        const dataUrlWithoutMetadata = removeImageMetadata(dataUrl);
        const bin = atob(dataUrl.split(',')[1]);
        const compressedSize = bin.length;
        setCompressionProgress(prev => ({ ...prev, [idx]: 100 }));
        
        return {
          ...img,
          compressedUrl: dataUrlWithoutMetadata,
          compressedSize: compressedSize,
          isProcessing: false
        };
      }));
      
      setImages(updatedImages);
      saveToHistory(updatedImages);
    } catch (err) {
      console.error('Compression error:', err);
      alert('Failed to compress images.');
      setImages((prev) => prev.map(img => ({
        ...img,
        isProcessing: false
      })));
    } finally {
      setCompressionProgress({});
    }
  }, [images, compression, showWatermark, saveToHistory]);

  // Download compressed image
  const handleDownload = useCallback(() => {
    if (images.length === 0) return;
    if (!images[0].compressedUrl) return;
    const a = document.createElement('a');
    a.href = images[0].compressedUrl;
    a.download = images[0].file.name ? `compressed-${images[0].file.name}` : 'compressed-image.jpg';
    document.body.appendChild(a);
    a.click();
    setTimeout(() => document.body.removeChild(a), 100);
  }, [images]);

  // Undo last action
  const handleUndo = useCallback(() => {
    if (historyIndex > 0) {
      setHistoryIndex(historyIndex - 1);
      const newImages = JSON.parse(JSON.stringify(imageHistory[historyIndex - 1]));
      setImages(newImages.map((img: ImageItem) => ({
        ...img,
        trueOriginalUrl: img.trueOriginalUrl || img.originalUrl
      })));
    }
  }, [historyIndex, imageHistory]);

  // Redo action
  const handleRedo = useCallback(() => {
    if (historyIndex < imageHistory.length - 1) {
      setHistoryIndex(historyIndex + 1);
      const newImages = JSON.parse(JSON.stringify(imageHistory[historyIndex + 1]));
      setImages(newImages.map((img: ImageItem) => ({
        ...img,
        trueOriginalUrl: img.trueOriginalUrl || img.originalUrl
      })));
    }
  }, [historyIndex, imageHistory]);

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.ctrlKey || e.metaKey) {
        switch (e.key) {
          case 'z':
            e.preventDefault();
            if (e.shiftKey) {
              handleRedo();
            } else {
              handleUndo();
            }
            break;
          case 's':
            e.preventDefault();
            if (images.length > 0 && images[0].compressedUrl) {
              handleDownload();
            }
            break;
          case 'Enter':
            e.preventDefault();
            if (images.length > 0) {
              handleCompress();
            }
            break;
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [images, historyIndex, imageHistory.length, handleRedo, handleUndo, handleDownload, handleCompress]);

  // Feature summary
  const getFeatureSummary = () => {
    const totalOriginalSize = images.reduce((sum, img) => sum + img.originalSize, 0);
    const totalCompressedSize = images.reduce((sum, img) => sum + (img.compressedSize || 0), 0);
    const totalSaved = totalOriginalSize > 0 ? ((totalOriginalSize - totalCompressedSize) / totalOriginalSize * 100) : 0;
    
    return {
      totalImages: images.length,
      totalOriginalSize: (totalOriginalSize / 1024).toFixed(1),
      totalCompressedSize: (totalCompressedSize / 1024).toFixed(1),
      totalSaved: totalSaved.toFixed(1)
    };
  };

  // Drag & drop handlers
  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    handleFiles(e.dataTransfer.files);
  };
  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

  // Remove individual image
  const handleRemove = (idx: number) => {
    setImages((prev) => prev.filter((_, i) => i !== idx));
    saveToHistory(images.filter((_, i) => i !== idx));
  };

  // Clear all images
  const handleClearAll = () => {
    setImages([]);
    saveToHistory([]);
  };

  // Batch ZIP download logic
  const handleDownloadZip = async () => {
    if (images.length < 2) return;
    const zip = new JSZip();
    images.forEach((img, idx) => {
      if (img.compressedUrl) {
        // Convert dataURL to binary
        const arr = img.compressedUrl.split(',');
        const mimeMatch = arr[0].match(/:(.*?);/);
        if (!mimeMatch) return;
        const mime = mimeMatch[1];
        const bstr = atob(arr[1]);
        let n = bstr.length;
        const u8arr = new Uint8Array(n);
        while (n--) {
          u8arr[n] = bstr.charCodeAt(n);
        }
        // Use original file name with prefix
        let ext = mime.split('/')[1];
        if (ext === 'jpeg') ext = 'jpg';
        const name = img.file.name.replace(/\.[^.]+$/, '') + '-compressed.' + ext;
        zip.file(name, u8arr);
      }
    });
    const blob = await zip.generateAsync({ type: 'blob' });
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = 'compressed-images.zip';
    document.body.appendChild(a);
    a.click();
    setTimeout(() => document.body.removeChild(a), 100);
  };

  // Crop completion handler
  const onCropComplete = (croppedArea: { x: number; y: number; width: number; height: number }, croppedAreaPixels: { x: number; y: number; width: number; height: number }) => {
    setCroppedAreaPixels(croppedAreaPixels);
  };

  // Apply crop to image
  const applyCrop = async () => {
    if (croppedAreaPixels && showCrop.open && showCrop.idx >= 0) {
      const img = images[showCrop.idx];
      const image = new window.Image();
      image.src = img.originalUrl;
      await new Promise((resolve) => {
        image.onload = resolve;
      });

      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      if (!ctx) return;

      // Correct cropping: use the crop rectangle directly, no scaling
      canvas.width = croppedAreaPixels.width;
      canvas.height = croppedAreaPixels.height;

      ctx.drawImage(
        image,
        croppedAreaPixels.x,
        croppedAreaPixels.y,
        croppedAreaPixels.width,
        croppedAreaPixels.height,
        0,
        0,
        croppedAreaPixels.width,
        croppedAreaPixels.height
      );

      const croppedDataUrl = canvas.toDataURL(img.format);
      setImages(prev => prev.map((im, i) => 
        i === showCrop.idx 
          ? { ...im, originalUrl: croppedDataUrl, originalSize: croppedDataUrl.length }
          : im
      ));
      setShowCrop({ idx: -1, open: false });
      setCrop({ x: 0, y: 0 });
      setZoom(1);
      setCroppedAreaPixels(null);
      saveToHistory(images.map((im, i) => i === showCrop.idx ? { ...im, originalUrl: croppedDataUrl, originalSize: croppedDataUrl.length } : im));
    }
  };

  // Apply watermark to canvas
  const applyWatermark = (ctx: CanvasRenderingContext2D, canvas: HTMLCanvasElement) => {
    if (!showWatermark) return;
    
    ctx.font = '24px Arial';
    ctx.fillStyle = 'rgba(255, 255, 255, 0.7)';
    ctx.strokeStyle = 'rgba(0, 0, 0, 0.7)';
    ctx.lineWidth = 2;
    
    const text = watermarkText;
    const textMetrics = ctx.measureText(text);
    const textWidth = textMetrics.width;
    const textHeight = 24;
    
    let x, y;
    const padding = 20;
    
    switch (watermarkPosition) {
      case 'top-left':
        x = padding;
        y = padding + textHeight;
        break;
      case 'top-right':
        x = canvas.width - textWidth - padding;
        y = padding + textHeight;
        break;
      case 'bottom-left':
        x = padding;
        y = canvas.height - padding;
        break;
      case 'bottom-right':
      default:
        x = canvas.width - textWidth - padding;
        y = canvas.height - padding;
        break;
      case 'center':
        x = (canvas.width - textWidth) / 2;
        y = (canvas.height + textHeight) / 2;
        break;
    }
    
    ctx.strokeText(text, x, y);
    ctx.fillText(text, x, y);
  };

  // Remove metadata from image
  const removeImageMetadata = (dataUrl: string): string => {
    if (!removeMetadata) return dataUrl;
    
    try {
      // For JPEG images, remove EXIF data
      if (dataUrl.includes('image/jpeg')) {
        const exifRemoved = piexif.remove(dataUrl);
        return exifRemoved;
      }
      // For other formats, return as is (metadata removal is mainly for JPEG)
      return dataUrl;
    } catch (error) {
      console.warn('Failed to remove metadata:', error);
      return dataUrl;
    }
  };

  // Generate shareable link
  const generateShareableLink = async () => {
    if (images.length === 0 || !images.every(img => img.compressedUrl)) return;
    
    setIsGeneratingLink(true);
    try {
      const zip = new JSZip();
      images.forEach((img) => {
        if (img.compressedUrl) {
          const arr = img.compressedUrl.split(',');
          const mimeMatch = arr[0].match(/:(.*?);/);
          if (!mimeMatch) return;
          const mime = mimeMatch[1];
          const bstr = atob(arr[1]);
          let n = bstr.length;
          const u8arr = new Uint8Array(n);
          while (n--) {
            u8arr[n] = bstr.charCodeAt(n);
          }
          let ext = mime.split('/')[1];
          if (ext === 'jpeg') ext = 'jpg';
          const name = img.file.name.replace(/\.[^.]+$/, '') + '-compressed.' + ext;
          zip.file(name, u8arr);
        }
      });
      
      const blob = await zip.generateAsync({ type: 'blob' });
      
      // Create a temporary URL for the blob
      const url = URL.createObjectURL(blob);
      setShareableLink(url);
      
      // Auto-clear the link after 1 hour
      setTimeout(() => {
        setShareableLink(null);
        URL.revokeObjectURL(url);
      }, 3600000);
      
    } catch (error) {
      console.error('Failed to generate shareable link:', error);
      alert('Failed to generate shareable link');
    } finally {
      setIsGeneratingLink(false);
    }
  };

  // Drag-and-drop reordering
  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (over && active.id !== over.id) {
      setImages((prev) => {
        const oldIndex = prev.findIndex((img) => img.originalUrl === active.id);
        const newIndex = prev.findIndex((img) => img.originalUrl === over.id);
        const newImages = arrayMove(prev, oldIndex, newIndex);
        saveToHistory(newImages);
        return newImages;
      });
    }
  };

  // Sortable image item component
  type SortableImageItemProps = { img: ImageItem; idx: number };
  function SortableImageItem({ img, idx }: SortableImageItemProps) {
    const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({ id: img.originalUrl });
    const beforeUrl = img.trueOriginalUrl || img.originalUrl;
    return (
      <div
        ref={setNodeRef}
        style={{
          transform: CSS.Transform.toString(transform),
          transition,
          opacity: isDragging ? 0.5 : 1,
        }}
        className="bg-gray-50 dark:bg-gray-800 rounded-xl p-4 shadow border relative"
      >
        {/* Drag handle */}
        <div 
          className="absolute top-2 left-2 w-6 h-6 cursor-grab active:cursor-grabbing z-20 flex items-center justify-center text-gray-400 hover:text-gray-600"
          {...attributes}
          {...listeners}
        >
          ☰
        </div>
        
        {/* Modal preview button */}
        <button 
          onClick={(e) => {
            e.stopPropagation();
            setShowPreview({ idx, open: true });
          }} 
          className="absolute top-2 left-10 text-blue-500 hover:text-blue-700 text-lg font-bold z-10" 
          aria-label={`Preview ${img.file.name}`}
        >🔍</button>
        {/* Crop button */}
        <button 
          onClick={(e) => {
            e.stopPropagation();
            setShowCrop({ idx, open: true });
          }} 
          className="absolute top-2 right-10 text-green-500 hover:text-green-700 text-lg font-bold z-10" 
          aria-label={`Crop ${img.file.name}`}
        >✂️</button>
        <button 
          onClick={(e) => {
            e.stopPropagation();
            handleRemove(idx);
          }} 
          className="absolute top-2 right-2 text-red-500 hover:text-red-700 text-lg font-bold z-10"
          aria-label={`Remove ${img.file.name}`}
        >&times;</button>
        <h3 className="text-md font-bold text-gray-900 dark:text-gray-100 mb-2 mt-6">{img.file.name}</h3>
        {/* Before/After slider */}
        <div className="mb-2" onMouseDown={(e) => e.stopPropagation()} onTouchStart={(e) => e.stopPropagation()}>
          <BeforeAfterSlider originalUrl={beforeUrl} compressedUrl={img.compressedUrl} />
        </div>
        {/* Progress bar */}
        {img.isProcessing && (
          <div className="w-full h-2 bg-gray-300 rounded mb-2 overflow-hidden">
            <div 
              className="h-full bg-blue-500 transition-all duration-300" 
              style={{ width: `${compressionProgress[idx] || 0}%` }} 
            />
          </div>
        )}
        {img.isProcessing && (
          <div className="text-xs text-gray-500 dark:text-gray-300 mb-1">
            Compressing... {compressionProgress[idx] || 0}%
          </div>
        )}
        {/* Compression stats */}
        <div className="text-xs text-gray-500 dark:text-gray-300 mb-1">
          Original: {(img.originalSize / 1024).toFixed(1)} KB
          {img.compressedSize && (
            <>
              {' | '}Compressed: {(img.compressedSize / 1024).toFixed(1)} KB
              {' | '}Saved: {((1 - img.compressedSize / img.originalSize) * 100).toFixed(1)}%
            </>
          )}
        </div>
        {/* Output format dropdown */}
        <div className="mb-2 w-full">
          <label className="block text-xs font-semibold text-gray-700 dark:text-gray-200 mb-1">Output Format</label>
          <select
            className="w-full border rounded px-2 py-1 text-sm"
            value={img.formatOverride || 'auto'}
            onChange={e => {
              const val = e.target.value;
              setImages(prev => prev.map((im, i) => i === idx ? { ...im, formatOverride: val } : im));
            }}
          >
            <option value="auto">Same as input</option>
            <option value="image/jpeg">JPEG</option>
            <option value="image/png">PNG</option>
            <option value="image/webp">WebP</option>
          </select>
        </div>
        {/* Resize fields */}
        <div className="flex gap-2 w-full mb-2">
          <div className="flex-1">
            <label className="block text-xs font-semibold text-gray-700 dark:text-gray-200 mb-1">Width</label>
            <input
              type="number"
              min={1}
              placeholder="auto"
              className="w-full border rounded px-2 py-1 text-sm"
              value={img.resizeWidth}
              onChange={e => {
                const val = e.target.value;
                setImages(prev => prev.map((im, i) => i === idx ? { ...im, resizeWidth: val } : im));
              }}
            />
          </div>
          <div className="flex-1">
            <label className="block text-xs font-semibold text-gray-700 dark:text-gray-200 mb-1">Height</label>
            <input
              type="number"
              min={1}
              placeholder="auto"
              className="w-full border rounded px-2 py-1 text-sm"
              value={img.resizeHeight}
              onChange={e => {
                const val = e.target.value;
                setImages(prev => prev.map((im, i) => i === idx ? { ...im, resizeHeight: val } : im));
              }}
            />
          </div>
        </div>
        {/* Watermark option */}
        {showWatermark && (
          <div className="text-xs text-blue-500 mb-2">Watermark: {watermarkText}</div>
        )}
      </div>
    );
  }

  // Ensure all images have trueOriginalUrl set after undo/redo or on load
  useEffect(() => {
    setImages(prev => prev.map((img: ImageItem) => ({
      ...img,
      trueOriginalUrl: img.trueOriginalUrl || img.originalUrl
    })));
  }, []);

  return (
    <>
      <Head>
        <title>Image Compressor - ZapTools</title>
        <meta name="description" content="Compress JPG, PNG, and WebP images instantly online. Free, fast, and secure image compression by ZapTools." />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />
      <div className={`min-h-screen py-20 px-4 ${darkMode ? 'bg-gray-900' : 'bg-gradient-to-br from-blue-50 via-white to-purple-50'}`}>
        <div className="max-w-4xl mx-auto">
          {/* Hero Section */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-blue-600 via-purple-600 to-pink-600 rounded-2xl mb-6 shadow-xl">
              <span className="text-white text-3xl">🖼️</span>
            </div>
            <h1 className={`text-5xl font-black mb-4 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
              Image <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">Compressor</span>
            </h1>
            <p className={`text-xl max-w-2xl mx-auto ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
              Compress JPG, PNG, and WebP images instantly. Reduce file size, keep quality. 100% free & private.
            </p>
          </div>

          {/* Controls Card */}
          <div className={`${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-100'} rounded-3xl shadow-2xl p-8 border mb-8`}>
            <div className="flex flex-wrap gap-4 justify-between items-center">
              <div className="flex flex-wrap gap-2 items-center flex-1 min-w-0">
                <select
                  className={`border-2 rounded-xl px-4 py-2 text-sm min-w-[160px] focus:outline-none focus:ring-4 focus:ring-blue-400 focus:border-transparent transition-all duration-300 ${darkMode ? 'bg-gray-700 border-gray-600 text-white' : 'border-gray-200'}`}
                  value={globalFormat}
                  onChange={e => {
                    const val = e.target.value;
                    setGlobalFormat(val);
                    const newImages = images.map(img =>
                      (!img.formatOverride || img.formatOverride === 'auto')
                        ? { ...img, formatOverride: val }
                        : img
                    );
                    setImages(newImages);
                    saveToHistory(newImages);
                  }}
                  aria-label="Set output format for all images"
                >
                  <option value="auto">Format: Same as input</option>
                  <option value="image/jpeg">JPEG</option>
                  <option value="image/png">PNG</option>
                  <option value="image/webp">WebP</option>
                </select>
                <label className={`flex items-center gap-1 text-sm cursor-pointer ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                  <input type="checkbox" checked={showWatermark} onChange={e => setShowWatermark(e.target.checked)} />
                  Add Watermark
                </label>
                {showWatermark && (
                  <>
                    <input
                      type="text"
                      value={watermarkText}
                      onChange={e => setWatermarkText(e.target.value)}
                      placeholder="Watermark text"
                      className={`border-2 rounded-xl px-3 py-2 text-sm w-28 focus:outline-none focus:ring-4 focus:ring-blue-400 focus:border-transparent transition-all duration-300 ${darkMode ? 'bg-gray-700 border-gray-600 text-white' : 'border-gray-200'}`}
                    />
                    <select
                      value={watermarkPosition}
                      onChange={e => setWatermarkPosition(e.target.value)}
                      className={`border-2 rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-4 focus:ring-blue-400 focus:border-transparent transition-all duration-300 ${darkMode ? 'bg-gray-700 border-gray-600 text-white' : 'border-gray-200'}`}
                    >
                      <option value="bottom-right">Bottom Right</option>
                      <option value="bottom-left">Bottom Left</option>
                      <option value="top-right">Top Right</option>
                      <option value="top-left">Top Left</option>
                      <option value="center">Center</option>
                    </select>
                  </>
                )}
                <label className={`flex items-center gap-1 text-sm cursor-pointer ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                  <input type="checkbox" checked={removeMetadata} onChange={e => setRemoveMetadata(e.target.checked)} />
                  Remove Metadata
                </label>
              </div>
              <button
                className={`px-4 py-2 rounded-xl text-sm font-semibold transition-all duration-300 ${darkMode ? 'bg-gray-700 text-gray-300 hover:bg-gray-600' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
                onClick={() => setDarkMode(dm => !dm)}
                aria-label="Toggle dark mode"
              >
                {darkMode ? 'Light Mode' : 'Dark Mode'}
              </button>
            </div>
          </div>

          {/* Upload Area */}
          <div
            className={`${darkMode ? 'bg-gray-800 border-gray-600' : 'bg-white border-blue-300'} border-2 border-dashed rounded-2xl p-8 mb-8 flex flex-col items-center justify-center cursor-pointer hover:border-blue-500 transition-all duration-300 shadow-lg`}
            onDrop={handleDrop}
            onDragOver={handleDragOver}
            onClick={() => fileInputRef.current?.click()}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                fileInputRef.current?.click();
              }
            }}
            tabIndex={0}
            role="button"
            aria-label="Upload images by clicking or dragging and dropping"
            style={{ minHeight: 180 }}
          >
            <input
              ref={fileInputRef}
              type="file"
              accept="image/jpeg,image/png,image/webp"
              className="hidden"
              onChange={e => handleFiles(e.target.files)}
              multiple
            />
            <span className="text-3xl text-blue-400 mb-2" role="img" aria-label="Upload icon">⬆️</span>
            <p className={`text-lg font-medium mb-1 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>Drag & drop images here, or click to select</p>
            <p className="text-sm text-gray-400">Your images never leave your device</p>
          </div>

          {/* Empty State */}
          {images.length === 0 && (
            <div className="text-center py-12">
              <img src="/file.svg" alt="No images" className="w-32 h-32 mx-auto mb-4 opacity-60" />
              <h2 className={`text-2xl font-bold mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>No images uploaded</h2>
              <p className={`mb-4 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>Upload images to start compressing. You can batch upload, reorder, crop, and more!</p>
            </div>
          )}

          {/* Images List */}
          {images.length > 0 && (
            <div className="mb-8">
              <div className="flex flex-wrap justify-between items-center mb-4 gap-2">
                <h2 className={`text-lg font-bold ${darkMode ? 'text-gray-300' : 'text-gray-900'}`}>Images ({images.length})</h2>
                <div className="flex gap-2 flex-wrap">
                  <button 
                    onClick={handleUndo} 
                    disabled={historyIndex <= 0}
                    className={`px-3 py-2 rounded-xl text-sm disabled:opacity-50 transition-all duration-300 ${darkMode ? 'bg-gray-700 text-gray-300 hover:bg-gray-600' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
                  >
                    Undo
                  </button>
                  <button 
                    onClick={handleRedo} 
                    disabled={historyIndex >= imageHistory.length - 1}
                    className={`px-3 py-2 rounded-xl text-sm disabled:opacity-50 transition-all duration-300 ${darkMode ? 'bg-gray-700 text-gray-300 hover:bg-gray-600' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
                  >
                    Redo
                  </button>
                  <button onClick={handleClearAll} className="text-red-500 font-semibold hover:underline text-sm">Clear All</button>
                </div>
              </div>
              <DndContext
                sensors={sensors}
                collisionDetection={closestCenter}
                onDragEnd={handleDragEnd}
              >
                <SortableContext items={images.map((img: ImageItem) => img.originalUrl)} strategy={verticalListSortingStrategy}>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {images.map((img, idx) => (
                      <SortableImageItem key={img.originalUrl} img={img} idx={idx} />
                    ))}
                  </div>
                </SortableContext>
              </DndContext>
            </div>
          )}

          {/* Compression Controls */}
          {images.length > 0 && (
            <div className={`${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-100'} rounded-3xl shadow-2xl p-8 border mb-8`}>
              <div className="space-y-6">
                <div>
                  <label className={`block text-lg font-bold mb-4 ${darkMode ? 'text-gray-300' : 'text-gray-900'}`}>Compression Level: {Math.round(compression * 100)}%</label>
                  <input
                    type="range"
                    min={0.1}
                    max={1}
                    step={0.01}
                    value={compression}
                    onChange={e => setCompression(Number(e.target.value))}
                    className="w-full h-3 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
                    aria-label="Compression level"
                    aria-valuemin={0.1}
                    aria-valuemax={1}
                    aria-valuenow={compression}
                    aria-valuetext={`${Math.round(compression * 100)}% quality`}
                  />
                  <div className="flex justify-between text-sm text-gray-500 mt-1">
                    <span>High Compression</span>
                    <span>Low Compression</span>
                  </div>
                </div>
                <div className="flex flex-col sm:flex-row gap-4">
                  <button
                    className="flex-1 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-bold text-lg rounded-xl shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                    disabled={images.some((img: ImageItem) => img.isProcessing)}
                    onClick={handleCompress}
                  >
                    {images.some((img: ImageItem) => img.isProcessing) ? 'Compressing...' : 'Compress Images'}
                  </button>
                  <button
                    className="flex-1 py-4 bg-gradient-to-r from-green-600 to-blue-600 text-white font-bold text-lg rounded-xl shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                    disabled={!images[0]?.compressedUrl}
                    onClick={handleDownload}
                  >
                    Download
                  </button>
                </div>
                {images.length > 1 && (
                  <div className="flex flex-col sm:flex-row gap-4">
                    <button
                      className="flex-1 py-3 bg-gradient-to-r from-green-600 to-blue-600 text-white font-bold text-md rounded-xl shadow hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                      disabled={!images.every((img: ImageItem) => img.compressedUrl)}
                      onClick={handleDownloadZip}
                    >
                      Download All as ZIP
                    </button>
                    <button
                      className="flex-1 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-bold text-md rounded-xl shadow hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                      disabled={isGeneratingLink || !images.every((img: ImageItem) => img.compressedUrl)}
                      onClick={generateShareableLink}
                    >
                      {isGeneratingLink ? 'Generating...' : 'Share Link'}
                    </button>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Shareable Link Display */}
          {shareableLink && (
            <div className="bg-green-50 border border-green-200 rounded-2xl p-6 mb-8">
              <h3 className="text-lg font-bold text-green-800 mb-2">Shareable Link Generated!</h3>
              <p className="text-sm text-green-600 mb-3">
                This link will expire in 1 hour. Share it with others to download your compressed images.
              </p>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={shareableLink}
                  readOnly
                  className="flex-1 p-3 border rounded-xl text-sm bg-white"
                />
                <button
                  onClick={() => navigator.clipboard.writeText(shareableLink)}
                  className="px-4 py-3 bg-green-600 text-white rounded-xl font-semibold hover:bg-green-700 transition-all duration-300"
                >
                  Copy
                </button>
              </div>
            </div>
          )}

          {/* Feature Summary Display */}
          {images.length > 0 && (
            <div className={`${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-100'} rounded-2xl shadow-lg p-6 border`}>
              <h3 className={`font-bold mb-4 ${darkMode ? 'text-gray-300' : 'text-gray-800'}`}>📊 Compression Summary</h3>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-sm">
                <div>
                  <div className={`${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>Images</div>
                  <div className={`font-semibold ${darkMode ? 'text-gray-300' : 'text-gray-800'}`}>{getFeatureSummary().totalImages}</div>
                </div>
                <div>
                  <div className={`${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>Original Size</div>
                  <div className={`font-semibold ${darkMode ? 'text-gray-300' : 'text-gray-800'}`}>{getFeatureSummary().totalOriginalSize} KB</div>
                </div>
                <div>
                  <div className={`${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>Compressed Size</div>
                  <div className={`font-semibold ${darkMode ? 'text-gray-300' : 'text-gray-800'}`}>{getFeatureSummary().totalCompressedSize} KB</div>
                </div>
                <div>
                  <div className={`${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>Space Saved</div>
                  <div className="font-semibold text-green-600">{getFeatureSummary().totalSaved}%</div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
      <Footer />
      {/* Modal preview placeholder */}
      {showPreview.open && (
        <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-gray-900 rounded-xl p-6 shadow-xl max-w-4xl w-full relative">
            <button className="absolute top-2 right-2 text-red-500 text-xl font-bold" onClick={() => setShowPreview({ idx: -1, open: false })}>&times;</button>
            <div className="w-full h-96 flex items-center justify-center">
              <img 
                src={images[showPreview.idx]?.originalUrl} 
                alt="Preview" 
                className="max-w-full max-h-full object-contain"
              />
            </div>
            <div className="mt-4 text-center text-sm text-gray-600 dark:text-gray-300">
              {images[showPreview.idx]?.file.name} - {(images[showPreview.idx]?.originalSize / 1024).toFixed(1)} KB
            </div>
          </div>
        </div>
      )}
      {/* Crop modal placeholder */}
      {showCrop.open && (
        <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-gray-900 rounded-xl p-6 shadow-xl max-w-4xl w-full relative">
            <button className="absolute top-2 right-2 text-red-500 text-xl font-bold" onClick={() => setShowCrop({ idx: -1, open: false })}>&times;</button>
            <div className="w-full h-96 relative">
              <Cropper
                image={images[showCrop.idx]?.originalUrl}
                crop={crop}
                zoom={zoom}
                aspect={undefined}
                onCropChange={setCrop}
                onZoomChange={setZoom}
                onCropComplete={onCropComplete}
                style={{
                  containerStyle: {
                    width: '100%',
                    height: '100%',
                    backgroundColor: '#f3f4f6'
                  }
                }}
              />
            </div>
            <div className="flex justify-between items-center mt-4">
              <div className="flex items-center gap-4">
                <label className="text-sm font-semibold">Zoom:</label>
                <input
                  type="range"
                  min={1}
                  max={3}
                  step={0.1}
                  value={zoom}
                  onChange={(e) => setZoom(Number(e.target.value))}
                  className="w-32"
                />
              </div>
              <button
                onClick={applyCrop}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700"
              >
                Apply Crop
              </button>
            </div>
          </div>
        </div>
      )}
      <style jsx>{`
        .slider::-webkit-slider-thumb {
          appearance: none;
          height: 20px;
          width: 20px;
          border-radius: 50%;
          background: linear-gradient(45deg, #3b82f6, #8b5cf6);
          cursor: pointer;
          box-shadow: 0 2px 6px rgba(0,0,0,0.2);
        }
        .slider::-moz-range-thumb {
          height: 20px;
          width: 20px;
          border-radius: 50%;
          background: linear-gradient(45deg, #3b82f6, #8b5cf6);
          cursor: pointer;
          border: none;
          box-shadow: 0 2px 6px rgba(0,0,0,0.2);
        }
      `}</style>
    </>
  );
} 