import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; 
import '../styles/index.css';
import NavBar from '../components/NavBar.js';
import { useAuth } from '../context/AuthContext.js';

function AddFriendPage() {
    const navigate = useNavigate(); 
    const { user: authUser } = useAuth();
    const [username, setUsername] = useState('');
    const [message, setMessage] = useState('');
    const [isError, setIsError] = useState(false);

    const handleAddFriend = async (e) => {
        e.preventDefault();
        
        if (!username.trim()) {
            setIsError(true);
            setMessage('Please enter a username');
            return;
        }
        
        try {
            const res = await fetch('http://localhost:5000/api/friends/add', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ 
                    userId: authUser._id, 
                    friendUsername: username 
                })
            });
    
            const data = await res.json();
    
            if (res.ok) {
                setIsError(false);
                setMessage(data.message || 'Friend added successfully!');
                setUsername('');
                setTimeout(() => navigate('/friends-list-page'), 2000);
            } else {
                setIsError(true);
                setMessage(data.message || 'Failed to add friend.');
            }
        } catch (error) {
            console.error('Add friend error:', error);
            setIsError(true);
            setMessage('Something went wrong. Please try again.');
        }
    };

    return (
        <div className="add-friend-container">
            <h1 className="add-friend-title">Add Friend</h1>

            <form onSubmit={handleAddFriend} className="add-friend-form">
                <div className="form-group">
                    <label htmlFor="username" style={{color: 'var(--secondary)', marginBottom: 'var(--spacing-sm)', display: 'block'}}>
                        Friend's Username
                    </label>
                    <input 
                        type="text"
                        id="username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        placeholder="Enter username"
                    />
                </div>

                {message && (
                    <div className={`alert ${isError ? 'alert-danger' : 'alert-success'}`}>
                        {message}
                    </div>
                )}

                <button type="submit" className="btn btn-primary btn-block">
                    Add Friend
                </button>

                <button 
                    type="button" 
                    className="btn btn-secondary btn-block"
                    onClick={() => navigate('/friends-list-page')}
                    style={{marginTop: 'var(--spacing-md)'}}
                >
                    Back to Friends List
                </button>
            </form>

            <NavBar />
        </div>
    );
}

export default AddFriendPage;