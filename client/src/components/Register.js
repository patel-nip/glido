// src/components/Register.js
import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { createUserWithEmailAndPassword, signInWithPopup, updateProfile } from 'firebase/auth';
import { auth, googleProvider, db } from '../firebase/config';
import { doc, setDoc } from 'firebase/firestore';
import './Register.css';

const Register = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        full_name: '',
        email: '',
        password: '',
        confirm_password: ''
    });
    const [agreeTerms, setAgreeTerms] = useState(false);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        // Validation
        if (formData.password !== formData.confirm_password) {
            setError('Passwords do not match');
            setLoading(false);
            return;
        }

        if (formData.password.length < 6) {
            setError('Password must be at least 6 characters');
            setLoading(false);
            return;
        }

        if (!agreeTerms) {
            setError('Please agree to the Terms of Service and Privacy Policy');
            setLoading(false);
            return;
        }

        try {
            // Create user with Firebase Authentication
            const userCredential = await createUserWithEmailAndPassword(
                auth,
                formData.email,
                formData.password
            );

            // Update user profile with display name
            await updateProfile(userCredential.user, {
                displayName: formData.full_name
            });

            // Save additional user data to Firestore
            await setDoc(doc(db, 'users', userCredential.user.uid), {
                full_name: formData.full_name,
                email: formData.email,
                created_at: new Date().toISOString(),
                role: 'customer'
            });

            // Store user info in localStorage
            localStorage.setItem('user', JSON.stringify({
                uid: userCredential.user.uid,
                email: userCredential.user.email,
                displayName: formData.full_name
            }));

            // Success - redirect to home
            alert('Account created successfully! 🎉');
            navigate('/');
        } catch (error) {
            console.error('Registration error:', error);

            // Handle specific Firebase errors
            switch (error.code) {
                case 'auth/email-already-in-use':
                    setError('This email is already registered. Please sign in instead.');
                    break;
                case 'auth/invalid-email':
                    setError('Invalid email address format.');
                    break;
                case 'auth/weak-password':
                    setError('Password is too weak. Please use a stronger password.');
                    break;
                default:
                    setError('Registration failed. Please try again.');
            }
        } finally {
            setLoading(false);
        }
    };

    const handleGoogleSignIn = async () => {
        setError('');
        setLoading(true);

        try {
            const result = await signInWithPopup(auth, googleProvider);
            const user = result.user;

            // Save user data to Firestore
            await setDoc(doc(db, 'users', user.uid), {
                full_name: user.displayName,
                email: user.email,
                created_at: new Date().toISOString(),
                role: 'customer',
                photo_url: user.photoURL
            }, { merge: true }); // merge: true prevents overwriting existing data

            // Store user info in localStorage
            localStorage.setItem('user', JSON.stringify({
                uid: user.uid,
                email: user.email,
                displayName: user.displayName,
                photoURL: user.photoURL
            }));

            // Success - redirect to home
            alert('Signed in with Google successfully! 🎉');
            navigate('/');
        } catch (error) {
            console.error('Google sign-in error:', error);

            if (error.code === 'auth/popup-closed-by-user') {
                setError('Sign-in popup was closed. Please try again.');
            } else if (error.code === 'auth/cancelled-popup-request') {
                setError('Sign-in cancelled. Please try again.');
            } else {
                setError('Google sign-in failed. Please try again.');
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="register-page">
            <div className="register-left">
                <div className="register-brand">
                    <div className="logo-large">
                        <span className="logo-text-large">GLIDO</span>
                        <div className="logo-bars">
                            <div className="bar"></div>
                            <div className="bar"></div>
                            <div className="bar"></div>
                        </div>
                    </div>
                    <p className="tagline-large">Your ride, your rhythm.</p>
                </div>
                <div className="register-hero">
                    <h1>Join Us</h1>
                    <p>Create your account and get started</p>
                    <Link to="/" className="back-home">← Back to Home</Link>
                </div>
            </div>

            <div className="register-right">
                <div className="register-form-container">
                    <button
                        className="google-signin"
                        onClick={handleGoogleSignIn}
                        disabled={loading}
                    >
                        <img src="https://www.google.com/favicon.ico" alt="Google" />
                        {loading ? 'Signing in...' : 'Continue with Google'}
                    </button>

                    <div className="divider">Or continue with</div>

                    <h2>Create Your Account</h2>
                    <p className="subtitle">Fill in your details to get started</p>

                    {error && <div className="error-message">{error}</div>}

                    <form onSubmit={handleSubmit}>
                        <div className="form-group">
                            <label>Full Name <span className="required">*</span></label>
                            <input
                                type="text"
                                name="full_name"
                                value={formData.full_name}
                                onChange={handleChange}
                                required
                                disabled={loading}
                                placeholder="Enter your full name"
                            />
                        </div>

                        <div className="form-group">
                            <label>Email Address <span className="required">*</span></label>
                            <input
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                required
                                disabled={loading}
                                placeholder="Enter your email"
                            />
                        </div>

                        <div className="form-group">
                            <label>Password <span className="required">*</span></label>
                            <input
                                type="password"
                                name="password"
                                value={formData.password}
                                onChange={handleChange}
                                required
                                minLength="6"
                                disabled={loading}
                                placeholder="Create a password"
                            />
                            <small style={{ color: '#666', fontSize: '12px', display: 'block', marginTop: '5px' }}>
                                Minimum 6 characters
                            </small>
                        </div>

                        <div className="form-group">
                            <label>Confirm Password <span className="required">*</span></label>
                            <input
                                type="password"
                                name="confirm_password"
                                value={formData.confirm_password}
                                onChange={handleChange}
                                required
                                disabled={loading}
                                placeholder="Confirm your password"
                            />
                        </div>

                        <div className="checkbox-group">
                            <input
                                type="checkbox"
                                id="terms"
                                checked={agreeTerms}
                                onChange={(e) => setAgreeTerms(e.target.checked)}
                                disabled={loading}
                            />
                            <label htmlFor="terms">
                                I agree to the <Link to="/terms">Terms of Service</Link> and{' '}
                                <Link to="/privacy">Privacy Policy</Link>
                            </label>
                        </div>

                        <button
                            type="submit"
                            className="submit-button"
                            disabled={loading}
                        >
                            {loading ? 'CREATING ACCOUNT...' : 'CREATE ACCOUNT'}
                        </button>

                        <p className="signin-link">
                            Already have an account? <Link to="/login">Sign In</Link>
                        </p>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Register;
