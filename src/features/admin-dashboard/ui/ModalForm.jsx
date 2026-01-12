import React, { useState, useEffect } from 'react';
import { getFieldLabel, initialItemState, CATEGORIES  } from '../model/lib/constants';

const ModalForm = ({ item, onClose, onSave, onFieldChange, loading = false  }) => {
    const [imagePreview, setImagePreview] = useState('');
    const [imageFile, setImageFile] = useState(null);

    useEffect(() => {
        setImagePreview('');

        if (item.image) {
            if (typeof item.image === 'string') {
                if (item.image.startsWith('http') || item.image.startsWith('/')) {
                    setImagePreview(item.image);
                } else {

                    const previewUrl = `https://stroi-dvor-backend.onrender.com/uploads/${item.image}`;
                    setImagePreview(previewUrl);
                }
            } else if (item.image instanceof File) {

                const previewUrl = URL.createObjectURL(item.image);
                setImagePreview(previewUrl);
                
                return () => URL.revokeObjectURL(previewUrl);
            }
        }
    }, [item.image]);

    const handleChange = (e) => {
        const { name, value, type, files } = e.target;
        
        if (type === 'file') {
            const file = files[0];
            if (file) {
                setImageFile(file);

                const previewUrl = URL.createObjectURL(file);
                console.log('New file preview:', previewUrl);
                setImagePreview(previewUrl);
                
                onFieldChange(name, file);
            }
        } else {
            onFieldChange(name, value);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSave(e);
    };

    return (
        <div style={{ 
            position: 'fixed', 
            top: 0, 
            left: 0, 
            width: '100%', 
            height: '100%', 
            background: 'rgba(0,0,0,0.7)', 
            display: 'flex', 
            justifyContent: 'center', 
            alignItems: 'center', 
            zIndex: 1000 
        }}>
            <div style={{ 
                background: 'white', 
                padding: '30px', 
                borderRadius: '8px', 
                width: '90%', 
                maxWidth: '700px', 
                maxHeight: '90vh', 
                overflowY: 'auto' 
            }}>
                <h3>{item._id ? 'Редактирование товара' : 'Добавление товара'}</h3>
                <form onSubmit={handleSubmit}>
                    {Object.keys(initialItemState).map(key => (
                        <div key={key} style={{ marginBottom: '15px' }}>
                            <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>
                                {getFieldLabel(key)}:
                                {key === 'image' && (
                                    <span style={{ fontSize: '12px', color: '#666', marginLeft: '5px' }}>
                                        (Загрузите изображение)
                                    </span>
                                )}
                            </label>
                            
                            {key === 'image' ? (
                                <div>
                                    <input
                                        type="file"
                                        name={key}
                                        accept="image/*"
                                        onChange={handleChange}
                                        required={!item._id} 
                                        style={{ width: '100%', padding: '8px', border: '1px solid #ddd' }}
                                    />

                                    {imagePreview && (
                                        <div style={{ marginTop: '10px' }}>
                                            <img 
                                                src={imagePreview} 
                                                alt="Preview"
                                                onError={(e) => {
                                                    console.error('Failed to load preview:', imagePreview);
                                                    e.target.style.display = 'none';
                                                }}
                                                style={{ 
                                                    maxWidth: '200px', 
                                                    maxHeight: '200px',
                                                    border: '1px solid #ddd',
                                                    borderRadius: '4px'
                                                }} 
                                            />
                                        </div>
                                    )}
                                </div>
                            ) : key === 'fullDescription' ? (
                                <textarea
                                    name={key}
                                    value={item[key] || ''}
                                    onChange={handleChange}
                                    required={key === 'name'}
                                    style={{ width: '100%', padding: '8px', border: '1px solid #ddd', minHeight: '100px' }}
                                />
                            ) : key === 'category' ? (
                                <select
                                    name={key}
                                    value={item[key] || ''}
                                    onChange={handleChange}
                                    style={{ 
                                        width: '100%', 
                                        padding: '8px', 
                                        border: '1px solid #ddd',
                                        borderRadius: '4px',
                                        background: 'white',
                                        cursor: 'pointer'
                                    }}
                                >
                                    <option value="">-- Выберите категорию --</option>
                                    {CATEGORIES.map(category => (
                                        <option key={category} value={category}>
                                            {category}
                                        </option>
                                    ))}
                                </select>
                            ) : (
                                <input
                                    type={key === 'price' ? 'number' : 'text'}
                                    name={key}
                                    value={item[key] || ''}
                                    onChange={handleChange}
                                    required={key === 'name'}
                                    style={{ width: '100%', padding: '8px', border: '1px solid #ddd' }}
                                    step={key === 'price' ? '0.01' : undefined}
                                />
                            )}
                        </div>
                    ))}
                    
                    <div style={{ marginTop: '20px', textAlign: 'right' }}>
                        <button 
                            type="button" 
                            onClick={onClose} 
                            style={{ 
                                marginRight: '10px', 
                                padding: '8px 15px',
                                background: '#6c757d',
                                color: 'white',
                                border: 'none',
                                borderRadius: '4px',
                                cursor: loading ? 'not-allowed' : 'pointer'
                            }}
                        >
                            {loading ? 'Отмена...' : 'Отменить'}
                        </button>
                        <button 
                            type="submit" 
                            style={{ 
                                padding: '8px 15px', 
                                background: '#007bff', 
                                color: 'white', 
                                border: 'none', 
                                borderRadius: '4px',
                                cursor: loading ? 'not-allowed' : 'pointer'
                            }}
                        >
                            {loading ? 'Сохранение...' : 'Сохранить'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default ModalForm;