import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom'; 
import '../styles/index.css';
import NavBar from '../components/NavBar.js';
import { useAuth } from '../context/AuthContext.js';

function FriendProfilePage() {
    const navigate = useNavigate(); 
    const { friendId } = useParams(); 
    const [friend, setFriend] = useState(null); 
    const [loading, setLoading] = useState(true);
    const { user: authUser } = useAuth();

    useEffect(() => {
        const fetchFriendProfile = async () => {
            try {
                // Using the auth/check-user endpoint to get user info by ID
                const res = await fetch(`http://localhost:5000/api/auth/users/${friendId}/fullprofile`);
                
                if (res.ok) {
                    const data = await res.json();
                    setFriend(data);
                } else {
                    console.error('Failed to fetch friend profile');
                }
            } catch (error) {
                console.error('Failed to fetch profile:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchFriendProfile();
    }, [friendId]);

    // Handle removing a friend
    const handleRemoveFriend = async () => {
        if (!window.confirm('Are you sure you want to remove this friend?')) {
            return;
        }
        
        try {
            const res = await fetch(`http://localhost:5000/api/friends/${authUser._id}/remove/${friendId}`, {
                method: 'DELETE'
            });
            
            if (res.ok) {
                alert('Friend removed successfully');
                navigate('/friends-list-page');
            } else {
                const data = await res.json();
                alert(data.message || 'Failed to remove friend');
            }
        } catch (error) {
            console.error('Error removing friend:', error);
            alert('Something went wrong. Please try again.');
        }
    };

    if (loading) return <div className="container text-center"><p>Loading...</p></div>;
    if (!friend) return <div className="container text-center"><p>Friend not found.</p></div>;

    return (
        <div className="container text-center">
            {/* Profile Picture */}
            <div className="profile-pic">
                <img 
                    src={friend.profilePic} 
                    alt="Profile" 
                />
            </div>

            {/* Username */}
            <h2 className="mt-sm">{friend.username}</h2>

            {/* First Joined */}
            <p style={{ color: 'var(--text-secondary)' }}>
                First Joined: {new Date(friend.firstJoined).toLocaleDateString()}
            </p>
            
            {/* XP Points */}
            <p style={{ color: 'var(--text-secondary)' }}>
                Total XP: {friend.totalXP || 0}
            </p>

            {/* Action Buttons */}
            <div className="mt-md">
                <button 
                    className="btn btn-primary btn-block" 
                    onClick={() => navigate(`/achievements?userId=${friendId}`)}
                >
                    View Achievements
                </button>
                
                <button 
                    className="btn btn-primary btn-block" 
                    onClick={() => navigate(`/completed-quests?userId=${friendId}`)}
                >
                    View Completed Quests
                </button>
                
                <button 
                    className="btn btn-danger btn-block"
                    onClick={handleRemoveFriend}
                >
                    Remove Friend
                </button>
            </div>

            <button 
                className="btn btn-secondary btn-block"
                onClick={() => navigate('/friends-list-page')}
            >
                Back to Friends List
            </button>

            {/* Bottom Navigation Menu */}
            <NavBar />
        </div>
    );
}

export default FriendProfilePage;