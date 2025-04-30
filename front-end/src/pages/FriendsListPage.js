import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom'; 
import '../styles/index.css';
import NavBar from '../components/NavBar.js';
import { useAuth } from '../context/AuthContext.js';

function FriendListPage() {
    const navigate = useNavigate(); 
    const { user: authUser } = useAuth();
    const [friends, setFriends] = useState([]);
    const [loading, setLoading] = useState(true);
    
    useEffect(() => {
        const fetchFriends = async () => {
            if (!authUser || !authUser._id) {
                setLoading(false);
                return;
            }
            
            try {
                setLoading(true);
                const res = await fetch(`/api/friends/${authUser._id}`);
                if (res.ok) {
                    const data = await res.json();
                    setFriends(data);
                } else {
                    console.error('Failed to fetch friends');
                }
            } catch (error) {
                console.error('Failed to fetch friends:', error);
            } finally {
                setLoading(false);
            }
        };
        fetchFriends();
    }, [authUser]);

    return (
        <div className="friends-list-container">
            <h1 className="friends-list-title">Friends List</h1>

            <div className="friends-list-section">
                {loading ? (
                    <p>Loading friends...</p>
                ) : friends.length > 0 ? (
                    friends.map((friend) => (
                        <div 
                            key={friend.userId} 
                            className="friend-item"
                            onClick={() => navigate(`/friend-profile/${friend.userId}`)}
                        >
                            <span className="friend-name">{friend.username}</span>
                        </div>
                    ))
                ) : (
                    <p>No friends yet. Add some friends to get started!</p>
                )}
            </div>

            <button 
                className="btn btn-primary add-friend-button" 
                onClick={() => navigate('/add-friend')}
            >
                Add Friend
            </button>

            <NavBar />
        </div>
    );
}

export default FriendListPage;