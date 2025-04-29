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
    
    // Fetch friends from backend on mount
    useEffect(() => {
        const fetchFriends = async () => {
            if (!authUser || !authUser._id) {
                setLoading(false);
                return;
            }
            
            try {
                setLoading(true);
                const res = await fetch(`http://localhost:5000/api/friends/${authUser._id}`);
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
        <div className="container text-center" style={{ position: 'relative' }}>
            {/* Heading */}
            <h2 className="section-header">Friends List</h2>

            {/* Friend Buttons */}
            <div className="mt-md">
                {loading ? (
                    <p>Loading friends...</p>
                ) : friends.length > 0 ? (
                    friends.map((friend) => (
                        <button 
                            key={friend.userId} 
                            className="btn btn-primary btn-block" 
                            onClick={() => navigate(`/friend-profile/${friend.userId}`)}
                        >
                            {friend.username}
                        </button>
                    ))
                ) : (
                    <p>No friends yet. Add some friends to get started!</p>
                )}
            </div>

            {/* Add Friend Button */}
            <button 
                className="btn btn-primary btn-block" 
                onClick={() => navigate('/add-friend')}
            >
                Add Friend
            </button>

            {/* Bottom Navigation Menu */}
            <NavBar />
        </div>
    );
}

export default FriendListPage;