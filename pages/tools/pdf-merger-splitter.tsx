import { useState, useEffect } from 'react';
import Head from 'next/head';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import { PDFDocument } from 'pdf-lib';
import { DndContext, closestCenter, PointerSensor, useSensor, useSensors } from '@dnd-kit/core';
import { arrayMove, SortableContext, useSortable, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import SEOHead from '../../components/SEOHead';

export default function PDFMergerSplitter() {
  const [files, setFiles] = useState<File[]>([]);
  const [mode, setMode] = useState<'merge' | 'split'>('merge');
  const [isProcessing, setIsProcessing] = useState(false);
  const [downloadLinks, setDownloadLinks] = useState<string[]>([]);
  const [pageRange, setPageRange] = useState('');
  const [splitError, setSplitError] = useState('');
  const [darkMode, setDarkMode] = useState(false);

  // DnD-kit setup for file reordering
  const sensors = useSensors(useSensor(PointerSensor));
  const handleDragEnd = (event: any) => {
    const { active, over } = event;
    if (active.id !== over.id) {
      const oldIndex = files.findIndex(f => f.name === active.id);
      const newIndex = files.findIndex(f => f.name === over.id);
      setFiles(arrayMove(files, oldIndex, newIndex));
    }
  };

  // Sortable file item for merge mode
  function SortableFileItem({ file, idx }: { file: File, idx: number }) {
    const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({ id: file.name });
    return (
      <li
        ref={setNodeRef}
        style={{
          transform: CSS.Transform.toString(transform),
          transition,
          opacity: isDragging ? 0.5 : 1,
          cursor: 'grab',
        }}
        className="flex items-center justify-between bg-gray-100 rounded-xl px-4 py-3 border border-blue-200 mb-1"
        {...attributes}
        {...listeners}
      >
        <span className="font-medium text-gray-800 truncate max-w-xs">{file.name}</span>
        <span className="text-xs text-gray-500 ml-2">{(file.size / 1024).toFixed(1)} KB</span>
        <span className="ml-2 text-blue-400 cursor-grab">☰</span>
      </li>
    );
  }

  // Handle file upload
  const handleFiles = (fileList: FileList | null) => {
    if (!fileList) return;
    const newFiles = Array.from(fileList);
    if (mode === 'merge') {
      // Append and deduplicate by name
      const allFiles = [...files, ...newFiles];
      const deduped = Array.from(new Map(allFiles.map(f => [f.name + f.size, f])).values());
      setFiles(deduped);
    } else {
      // Only keep the last selected file
      setFiles([newFiles[newFiles.length - 1]]);
    }
  };

  // Drag & drop handlers
  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    handleFiles(e.dataTransfer.files);
  };
  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

  // Helper to trigger download
  const triggerDownload = (blob: Blob, filename: string) => {
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    setTimeout(() => {
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    }, 100);
  };

  // Parse page range string (e.g., '1-3,5,7-9') into array of page indices (0-based)
  function parsePageRange(range: string, max: number): number[] {
    if (!range.trim()) return Array.from({ length: max }, (_, i) => i);
    const parts = range.split(',');
    const pages: number[] = [];
    for (const part of parts) {
      if (part.includes('-')) {
        const [start, end] = part.split('-').map(x => parseInt(x.trim(), 10));
        if (isNaN(start) || isNaN(end) || start < 1 || end > max || start > end) throw new Error('Invalid range');
        for (let i = start; i <= end; i++) pages.push(i - 1);
      } else {
        const num = parseInt(part.trim(), 10);
        if (isNaN(num) || num < 1 || num > max) throw new Error('Invalid page number');
        pages.push(num - 1);
      }
    }
    return Array.from(new Set(pages));
  }

  // Merge PDFs
  const handleMerge = async () => {
    setIsProcessing(true);
    try {
      const mergedPdf = await PDFDocument.create();
      for (const file of files) {
        const bytes = await file.arrayBuffer();
        const pdf = await PDFDocument.load(bytes);
        const copiedPages = await mergedPdf.copyPages(pdf, pdf.getPageIndices());
        copiedPages.forEach((page) => mergedPdf.addPage(page));
      }
      const mergedBytes = await mergedPdf.save();
      triggerDownload(new Blob([mergedBytes], { type: 'application/pdf' }), 'merged.pdf');
    } catch (err) {
      alert('Failed to merge PDFs.');
    } finally {
      setIsProcessing(false);
    }
  };

  // Split PDF
  const handleSplit = async () => {
    setIsProcessing(true);
    setDownloadLinks([]);
    setSplitError('');
    try {
      const file = files[0];
      const bytes = await file.arrayBuffer();
      const pdf = await PDFDocument.load(bytes);
      const pageCount = pdf.getPageCount();
      let indices: number[];
      try {
        indices = parsePageRange(pageRange, pageCount);
      } catch (e) {
        setSplitError('Invalid page range.');
        setIsProcessing(false);
        return;
      }
      if (indices.length === 0) {
        setSplitError('No valid pages selected.');
        setIsProcessing(false);
        return;
      }
      const links: string[] = [];
      for (const i of indices) {
        const newPdf = await PDFDocument.create();
        const [copiedPage] = await newPdf.copyPages(pdf, [i]);
        newPdf.addPage(copiedPage);
        const newBytes = await newPdf.save();
        const blob = new Blob([newBytes], { type: 'application/pdf' });
        const url = URL.createObjectURL(blob);
        links.push(url);
      }
      setDownloadLinks(links);
    } catch (err) {
      setSplitError('Failed to split PDF.');
    } finally {
      setIsProcessing(false);
    }
  };

  const handleAction = () => {
    if (mode === 'merge') handleMerge();
    else handleSplit();
  };

  return (
    <>
      <SEOHead
        title="PDF Merger & Splitter – Free Online Tool | Zaptools"
        description="Merge or split PDF files easily with our free online PDF tool. No signup, no watermark. Secure and fast PDF processing."
        url="https://zaptools.tech/tools/pdf-merger-splitter"
      />
      <Header />
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 py-20 px-4">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-12">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-blue-600 via-purple-600 to-pink-600 rounded-2xl mb-6 shadow-xl">
              <span className="text-white text-3xl">📄</span>
            </div>
            <h1 className="text-5xl font-black text-gray-900 mb-4">
              PDF <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">Merger & Splitter</span>
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Merge multiple PDFs into one or split a PDF into separate pages. 100% free and private.
            </p>
          </div>

          {/* Mode Switch */}
          <div className="flex justify-center mb-8 gap-4">
            <button
              className={`px-6 py-3 rounded-xl font-bold transition-all duration-300 ${mode === 'merge' ? 'bg-blue-600 text-white shadow-lg' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
              onClick={() => setMode('merge')}
            >
              Merge PDFs
            </button>
            <button
              className={`px-6 py-3 rounded-xl font-bold transition-all duration-300 ${mode === 'split' ? 'bg-purple-600 text-white shadow-lg' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
              onClick={() => setMode('split')}
            >
              Split PDF
            </button>
          </div>

          {/* Upload Area */}
          <div
            className="bg-white border-2 border-dashed border-blue-300 rounded-2xl p-8 mb-8 flex flex-col items-center justify-center cursor-pointer hover:border-blue-500 transition-all duration-300"
            onDrop={handleDrop}
            onDragOver={handleDragOver}
            onClick={() => document.getElementById('pdf-upload')?.click()}
            style={{ minHeight: 180 }}
          >
            <input
              id="pdf-upload"
              type="file"
              accept="application/pdf"
              multiple={mode === 'merge'}
              className="hidden"
              onChange={e => handleFiles(e.target.files)}
            />
            <span className="text-3xl text-blue-400 mb-2">⬆️</span>
            <p className="text-lg text-gray-700 font-medium mb-1">Drag & drop PDF{mode === 'merge' ? 's' : ''} here, or click to select</p>
            <p className="text-sm text-gray-400">(Your files never leave your device)</p>
          </div>

          {/* File List with DnD for merge mode */}
          {files.length > 0 && (
            <div className="mb-8">
              <h2 className="text-lg font-bold text-gray-900 mb-4">Selected PDF{files.length > 1 ? 's' : ''}</h2>
              {mode === 'merge' ? (
                <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
                  <SortableContext items={files.map(f => f.name)} strategy={verticalListSortingStrategy}>
                    <ul className="space-y-2">
                      {files.map((file, idx) => (
                        <SortableFileItem key={file.name} file={file} idx={idx} />
                      ))}
                    </ul>
                  </SortableContext>
                </DndContext>
              ) : (
                <ul className="space-y-2">
                  {files.map((file, idx) => (
                    <li key={idx} className="flex items-center justify-between bg-gray-100 rounded-xl px-4 py-3">
                      <span className="font-medium text-gray-800 truncate max-w-xs">{file.name}</span>
                      <span className="text-xs text-gray-500 ml-2">{(file.size / 1024).toFixed(1)} KB</span>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          )}

          {/* Page Range Input for Split Mode */}
          {mode === 'split' && files.length > 0 && (
            <div className="mb-6">
              <label className="block text-lg font-bold text-gray-900 mb-2">Page Range</label>
              <input
                type="text"
                className="w-full p-4 border-2 border-gray-200 rounded-2xl focus:outline-none focus:ring-4 focus:ring-blue-400 focus:border-transparent text-lg font-medium transition-all duration-300"
                placeholder="e.g. 1-3,5,7-9 (leave blank for all pages)"
                value={pageRange}
                onChange={e => setPageRange(e.target.value)}
                disabled={isProcessing}
              />
              {splitError && <div className="text-red-600 mt-2 text-sm font-semibold">{splitError}</div>}
            </div>
          )}

          {/* Action Button */}
          <button
            className="w-full py-5 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-bold text-xl rounded-2xl shadow-xl hover:shadow-2xl transform hover:-translate-y-1 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={files.length === 0 || isProcessing}
            onClick={handleAction}
          >
            {isProcessing ? (mode === 'merge' ? 'Merging...' : 'Splitting...') : (mode === 'merge' ? 'Merge PDFs' : 'Split PDF')}
          </button>

          {/* Download links for split PDFs */}
          {mode === 'split' && downloadLinks.length > 0 && (
            <div className="mt-8">
              <h2 className="text-lg font-bold text-gray-900 mb-4">Download Split Pages</h2>
              <ul className="space-y-2">
                {downloadLinks.map((url, idx) => (
                  <li key={idx} className="flex items-center justify-between bg-gray-100 rounded-xl px-4 py-3">
                    <span className="font-medium text-gray-800">Page {idx + 1}</span>
                    <a href={url} download={`page-${idx + 1}.pdf`} className="text-blue-600 font-bold hover:underline">Download</a>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* How to Use Section */}
          <div className={`mt-12 ${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-100'} rounded-3xl shadow-2xl p-8 border`}>
            <h2 className={`text-2xl font-bold mb-6 ${darkMode ? 'text-gray-300' : 'text-gray-900'}`}>📖 How to Use</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h3 className={`text-lg font-semibold mb-4 ${darkMode ? 'text-gray-300' : 'text-gray-900'}`}>Merge PDFs</h3>
                <ol className={`space-y-3 text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                  <li className="flex items-start">
                    <span className="bg-blue-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold mr-3 mt-0.5">1</span>
                    <span>Click "Choose Files" or drag & drop multiple PDF files</span>
                  </li>
                  <li className="flex items-start">
                    <span className="bg-blue-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold mr-3 mt-0.5">2</span>
                    <span>Drag files to reorder them in your preferred sequence</span>
                  </li>
                  <li className="flex items-start">
                    <span className="bg-blue-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold mr-3 mt-0.5">3</span>
                    <span>Click "Merge PDFs" to combine all files into one</span>
                  </li>
                  <li className="flex items-start">
                    <span className="bg-blue-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold mr-3 mt-0.5">4</span>
                    <span>Download your merged PDF file</span>
                  </li>
                </ol>
              </div>
              <div>
                <h3 className={`text-lg font-semibold mb-4 ${darkMode ? 'text-gray-300' : 'text-gray-900'}`}>Split PDF</h3>
                <ol className={`space-y-3 text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                  <li className="flex items-start">
                    <span className="bg-green-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold mr-3 mt-0.5">1</span>
                    <span>Upload a single PDF file you want to split</span>
                  </li>
                  <li className="flex items-start">
                    <span className="bg-green-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold mr-3 mt-0.5">2</span>
                    <span>Choose split method: by page ranges or individual pages</span>
                  </li>
                  <li className="flex items-start">
                    <span className="bg-green-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold mr-3 mt-0.5">3</span>
                    <span>Specify page numbers or ranges (e.g., 1-5, 7, 10-15)</span>
                  </li>
                  <li className="flex items-start">
                    <span className="bg-green-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold mr-3 mt-0.5">4</span>
                    <span>Click "Split PDF" and download your separated files</span>
                  </li>
                </ol>
              </div>
            </div>
            
            <div className="mt-8">
              <h3 className={`text-lg font-semibold mb-4 ${darkMode ? 'text-gray-300' : 'text-gray-900'}`}>Pro Tips</h3>
              <ul className={`space-y-2 text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                <li className="flex items-start">
                  <span className="text-green-500 mr-2">✓</span>
                  <span>Use drag & drop to quickly reorder files before merging</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-500 mr-2">✓</span>
                  <span>For splitting, use comma-separated page numbers (1,3,5) or ranges (1-5)</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-500 mr-2">✓</span>
                  <span>Large files may take longer to process - be patient</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-500 mr-2">✓</span>
                  <span>All processing happens in your browser - your files stay private</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-500 mr-2">✓</span>
                  <span>Use the preview to verify page order before merging</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Features Section */}
          <div className={`mt-8 ${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-100'} rounded-3xl shadow-2xl p-8 border`}>
            <h2 className={`text-2xl font-bold mb-6 ${darkMode ? 'text-gray-300' : 'text-gray-900'}`}>✨ Features</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <span className="text-white text-2xl">🔗</span>
                </div>
                <h3 className={`font-bold mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-900'}`}>Merge Multiple PDFs</h3>
                <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                  Combine unlimited PDF files into a single document
                </p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-blue-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <span className="text-white text-2xl">✂️</span>
                </div>
                <h3 className={`font-bold mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-900'}`}>Split by Pages</h3>
                <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                  Extract specific pages or ranges from any PDF
                </p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <span className="text-white text-2xl">🔄</span>
                </div>
                <h3 className={`font-bold mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-900'}`}>Drag & Drop Reorder</h3>
                <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                  Easily reorder files before merging with intuitive controls
                </p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-yellow-500 to-orange-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <span className="text-white text-2xl">🔒</span>
                </div>
                <h3 className={`font-bold mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-900'}`}>100% Private</h3>
                <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                  All processing happens locally - files never leave your device
                </p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-red-500 to-pink-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <span className="text-white text-2xl">⚡</span>
                </div>
                <h3 className={`font-bold mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-900'}`}>Fast Processing</h3>
                <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                  Optimized for speed with progress indicators
                </p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-indigo-500 to-purple-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <span className="text-white text-2xl">📱</span>
                </div>
                <h3 className={`font-bold mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-900'}`}>Mobile Friendly</h3>
                <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                  Works perfectly on all devices and screen sizes
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
} 