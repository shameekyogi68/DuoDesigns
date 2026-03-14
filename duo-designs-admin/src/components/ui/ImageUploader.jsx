/** @file ImageUploader.jsx */
import React, { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { Image as ImageIcon, X, UploadCloud } from 'lucide-react';
import toast from 'react-hot-toast';

const ImageUploader = ({ images = [], onChange, maxImages = 5 }) => {
  const onDrop = useCallback((acceptedFiles) => {
    if (images.length + acceptedFiles.length > maxImages) {
      toast.error(`Max ${maxImages} images allowed`);
      return;
    }

    // In a real app, you'd upload to a server/S3 here
    // For now, we simulate by creating object URLs
    const newImages = acceptedFiles.map(file => URL.createObjectURL(file));
    onChange([...images, ...newImages]);
  }, [images, onChange, maxImages]);

  const removeImage = (index) => {
    const updated = images.filter((_, i) => i !== index);
    onChange(updated);
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { 'image/*': ['.jpeg', '.jpg', '.png', '.webp'] },
    maxFiles: maxImages - images.length
  });

  return (
    <div className="image-uploader-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(100px, 1fr))', gap: '12px' }}>
      {images.map((url, idx) => (
        <div key={idx} style={{ position: 'relative', height: '100px', background: '#111', border: '1px solid #222' }}>
          <img src={url} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
          <button 
            type="button"
            onClick={() => removeImage(idx)}
            style={{ position: 'absolute', top: '-8px', right: '-8px', background: 'var(--red)', color: 'white', border: 'none', borderRadius: '50%', width: '20px', height: '20px', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}
          >
            <X size={12} />
          </button>
        </div>
      ))}
      
      {images.length < maxImages && (
        <div 
          {...getRootProps()} 
          className={`upload-zone ${isDragActive ? 'active' : ''}`}
          style={{ 
            height: '100px', 
            padding: '0', 
            display: 'flex', 
            flexDirection: 'column', 
            alignItems: 'center', 
            justifyContent: 'center',
            fontSize: '10px',
            color: 'var(--gray)',
            border: '1px dashed #333'
          }}
        >
          <input {...getInputProps()} />
          <UploadCloud size={20} style={{ marginBottom: '4px' }} />
          <span>UPLOAD</span>
        </div>
      )}
    </div>
  );
};

export default ImageUploader;
