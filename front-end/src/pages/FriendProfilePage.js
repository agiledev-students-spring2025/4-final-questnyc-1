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
                const res = await fetch(`/api/auth/users/${friendId}/fullprofile`);
                
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

    const handleRemoveFriend = async () => {
        if (!window.confirm('Are you sure you want to remove this friend?')) {
            return;
        }
        
        try {
            const res = await fetch(`/api/friends/${authUser._id}/remove/${friendId}`, {
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

    if (loading) return <div className="friend-profile-container"><p>Loading...</p></div>;
    if (!friend) return <div className="friend-profile-container"><p>Friend not found.</p></div>;

    return (
        <div className="friend-profile-container">
            <div className="friend-profile-header">
                <div className="friend-profile-pic">
                    <img src={friend.profilePic} alt="Profile" />
                </div>
                <h2 className="friend-username">{friend.username}</h2>
            </div>

            <div className="friend-stats">
                <div className="stat-item">
                    <span>First Joined:</span>
                    <span>{new Date(friend.firstJoined).toLocaleDateString()}</span>
                </div>
                <div className="stat-item">
                    <span>Total XP:</span>
                    <span>{friend.totalXP || 0}</span>
                </div>
            </div>

            <div className="friend-actions">
                <button 
                    className="btn btn-primary" 
                    onClick={() => navigate(`/achievements?userId=${friendId}`)}
                >
                    View Achievements
                </button>
                
                <button 
                    className="btn btn-primary" 
                    onClick={() => navigate(`/completed-quests?userId=${friendId}`)}
                >
                    View Completed Quests
                </button>
                
                <button 
                    className="btn btn-danger"
                    onClick={handleRemoveFriend}
                >
                    Remove Friend
                </button>
                
                <button 
                    className="btn btn-secondary"
                    onClick={() => navigate('/friends-list-page')}
                >
                    Back to Friends List
                </button>
            </div>

            <NavBar />
        </div>
    );
}

export default FriendProfilePage;