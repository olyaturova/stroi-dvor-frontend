import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import { useAuth } from '@/app/providers/AuthProvider';
import { useNavigate } from 'react-router-dom';
import { API_SHOP, initialItemState } from '../model/lib/constants';
import ModalForm from './ModalForm';

const AdminDashboard = () => {
    const { logout, isAdmin } = useAuth();
    const navigate = useNavigate();
    
    const [items, setItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [editingItem, setEditingItem] = useState(initialItemState);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [uploading, setUploading] = useState(false); 

    const fetchItems = useCallback(async () => {
        setLoading(true);
        try {
            const response = await axios.get(API_SHOP);
            setItems(response.data);
        } catch (error) {
            console.error("Ошибка при получении данных:", error);
            if (error.response?.status === 403 || error.response?.status === 401) {
                alert("Сессия истекла. Пожалуйста, войдите снова.");
                logout();
                navigate('/admin/login');
            }
        } finally {
            setLoading(false);
        }
    }, [logout, navigate]);

    useEffect(() => {
        fetchItems();
    }, [fetchItems]);

    const handleLogout = () => {
        logout();
        navigate('/admin/login');
    };

    const handleEdit = (item) => {
        setEditingItem(item);
        setIsModalOpen(true);
    };

    const handleAdd = () => {
        setEditingItem(initialItemState);
        setIsModalOpen(true);
    };

    const handleDelete = async (id) => {
        if (window.confirm("Удалить товар?")) {
            try {
                await axios.delete(`${API_SHOP}/${id}`);
                fetchItems();
            } catch (error) {
                if (error.response?.status === 403 || error.response?.status === 401) {
                    alert("Токен истек. Пожалуйста, войдите снова.");
                    logout();
                    navigate('/admin/login');
                } else {
                    alert("Ошибка удаления.");
                }
            }
        }
    };

    const handleSave = async (e) => {
        e.preventDefault();
        setUploading(true); 
        
        try {
    
            const formData = new FormData();

            if (editingItem.image instanceof File) {
                formData.append('image', editingItem.image);
            } else if (editingItem.image) {
                formData.append('image', editingItem.image);
            }

            Object.keys(editingItem).forEach(key => {
                if (key !== 'image' && editingItem[key] !== undefined && editingItem[key] !== null) {
                    formData.append(key, editingItem[key]);
                }
            });

            if (editingItem._id) {
                await axios.put(`${API_SHOP}/${editingItem._id}`, formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    },
                });
            } else {
                await axios.post(API_SHOP, formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    },
                });
            }
            
            setIsModalOpen(false);
            fetchItems();
        } catch (error) {
            if (error.response?.status === 403 || error.response?.status === 401) {
                alert("Токен истек. Пожалуйста, войдите снова.");
                logout();
                navigate('/admin/login');
            } else {
                alert("Ошибка сохранения. Проверьте данные.");
            }
        } finally {
            setUploading(false); 
        }
    };

    const handleFieldChange = (name, value) => {
        const numFields = ['price'];
        const valueToSet = numFields.includes(name) ? 
            (value === "" ? 0 : parseFloat(value)) : 
            value;
        
        setEditingItem(prev => ({ ...prev, [name]: valueToSet }));
    };

    if (loading) return <div style={{ textAlign: 'center', padding: '50px' }}>Загрузка данных...</div>;

    if (!isAdmin) {
        return (
            <div style={{ textAlign: 'center', padding: '50px' }}>
                <h2>Доступ запрещен</h2>
                <p>У вас нет прав для доступа к этой странице.</p>
                <button 
                    onClick={() => navigate('/admin/login')}
                    style={{ 
                        marginTop: '20px',
                        padding: '10px 20px',
                        background: '#007bff',
                        color: 'white',
                        border: 'none',
                        borderRadius: '4px',
                        cursor: 'pointer'
                    }}
                >
                    Войти
                </button>
            </div>
        );
    }

    return (
        <div style={{ padding: '20px', maxWidth: '1200px', margin: '0 auto' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                <h1>Управление Товарами</h1>
                <button 
                    onClick={handleLogout} 
                    style={{ 
                        padding: '8px 16px',
                        background: '#dc3545',
                        color: 'white',
                        border: 'none',
                        borderRadius: '4px',
                        cursor: 'pointer'
                    }}
                >
                    Выход
                </button>
            </div>

            <button 
                onClick={handleAdd} 
                style={{ 
                    marginBottom: '20px', 
                    padding: '10px 20px',
                    background: '#28a745',
                    color: 'white',
                    border: 'none',
                    borderRadius: '4px',
                    cursor: 'pointer',
                    fontSize: '16px'
                }}
            >
                + Добавить Товар
            </button>

            <div style={{ overflowX: 'auto' }}>
                <table style={{ 
                    width: '100%', 
                    borderCollapse: 'collapse',
                    boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
                }}>
                    <thead>
                        <tr style={{ 
                            background: '#f8f9fa', 
                            borderBottom: '2px solid #dee2e6' 
                        }}>
                            <th style={{ padding: '12px', textAlign: 'left' }}>ID</th>
                            <th style={{ padding: '12px', textAlign: 'left' }}>Название</th>
                            <th style={{ padding: '12px', textAlign: 'left' }}>Цена</th>
                            <th style={{ padding: '12px', textAlign: 'left' }}>Действия</th>
                        </tr>
                    </thead>
                    <tbody>
                        {items.map(item => (
                            <tr key={item._id} style={{ 
                                borderBottom: '1px solid #dee2e6',
                                background: item._id === editingItem._id ? '#f8f9fa' : 'transparent'
                            }}>
                                <td style={{ padding: '12px' }}>{item._id?.substring(0, 8)}...</td>
                                <td style={{ padding: '12px' }}>{item.name}</td>
                                <td style={{ padding: '12px' }}>{item.price} руб.</td>
                                <td style={{ padding: '12px' }}>
                                    <button 
                                        onClick={() => handleEdit(item)}
                                        style={{
                                            padding: '6px 12px',
                                            background: '#007bff',
                                            color: 'white',
                                            border: 'none',
                                            borderRadius: '4px',
                                            cursor: 'pointer',
                                            marginRight: '8px'
                                        }}
                                    >
                                        Редактировать
                                    </button>
                                    <button 
                                        onClick={() => handleDelete(item._id)}
                                        style={{
                                            padding: '6px 12px',
                                            background: '#dc3545',
                                            color: 'white',
                                            border: 'none',
                                            borderRadius: '4px',
                                            cursor: 'pointer'
                                        }}
                                    >
                                        Удалить
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {isModalOpen && (
                <ModalForm 
                    item={editingItem}
                    onClose={() => setIsModalOpen(false)}
                    onSave={handleSave}
                    onFieldChange={handleFieldChange}
                    loading={uploading} 
                />
            )}
        </div>
    );
};

export default AdminDashboard;