import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom'; 
import '../styles/index.css';
import NavBar from '../components/NavBar.js';

function FriendListPage() {
    const navigate = useNavigate(); 
    const [friends, setFriends] = useState([]);

    // Fetch friends from backend on mount
    useEffect(() => {
        const fetchFriends = async () => {
            try {
                const res = await fetch('http://localhost:5000/api/friends');
                const data = await res.json();
                setFriends(data);
            } catch (error) {
                console.error('Failed to fetch friends:', error);
            }
        };
        fetchFriends();
    }, []);

    return (
        <div className="container text-center" style={{ position: 'relative' }}>
            {/* Heading */}
            <h2 className="section-header">Friends List</h2>

            {/* Friend Buttons */}
            <div className="mt-md">
                {friends.map((friend) => (
                    <button 
                        key={friend._id} 
                        className="btn btn-primary btn-block" 
                        onClick={() => navigate(`/friend-profile/${friend._id}`)}
                    >
                        {friend.username}
                    </button>
                ))}
            </div>

            {/* Invite Friend Button */}
            <button className="btn btn-primary btn-block" onClick={() => navigate('/invite-friend-page')}>
                Invite Friend
            </button>

            {/* Bottom Navigation Menu */}
            <NavBar />
        </div>
    );
}

export default FriendListPage;
