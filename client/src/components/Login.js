// src/components/Login.js
import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { signInWithEmailAndPassword, signInWithPopup, sendPasswordResetEmail } from 'firebase/auth';
import { auth, googleProvider } from '../firebase/config';
import './Login.css';

const Login = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const [resetEmailSent, setResetEmailSent] = useState(false);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        try {
            const userCredential = await signInWithEmailAndPassword(
                auth,
                formData.email,
                formData.password
            );

            // Store user info in localStorage
            localStorage.setItem('user', JSON.stringify({
                uid: userCredential.user.uid,
                email: userCredential.user.email,
                displayName: userCredential.user.displayName
            }));

            // Success - redirect to home
            alert('Signed in successfully! 🎉');
            navigate('/');

            // Force page refresh to update header
            window.location.reload();
        } catch (error) {
            console.error('Login error:', error);

            switch (error.code) {
                case 'auth/user-not-found':
                    setError('No account found with this email. Please sign up.');
                    break;
                case 'auth/wrong-password':
                    setError('Incorrect password. Please try again.');
                    break;
                case 'auth/invalid-email':
                    setError('Invalid email address format.');
                    break;
                case 'auth/user-disabled':
                    setError('This account has been disabled.');
                    break;
                case 'auth/too-many-requests':
                    setError('Too many failed attempts. Please try again later.');
                    break;
                case 'auth/invalid-credential':
                    setError('Invalid email or password. Please try again.');
                    break;
                default:
                    setError('Login failed. Please check your credentials.');
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

            localStorage.setItem('user', JSON.stringify({
                uid: result.user.uid,
                email: result.user.email,
                displayName: result.user.displayName,
                photoURL: result.user.photoURL
            }));

            alert('Signed in with Google successfully! 🎉');
            navigate('/');

            // Force page refresh to update header
            window.location.reload();
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

    const handleForgotPassword = async () => {
        if (!formData.email) {
            setError('Please enter your email address first');
            return;
        }

        try {
            await sendPasswordResetEmail(auth, formData.email);
            setResetEmailSent(true);
            setError('');
            alert('Password reset email sent! Check your inbox. 📧');
        } catch (error) {
            console.error('Password reset error:', error);

            if (error.code === 'auth/user-not-found') {
                setError('No account found with this email address.');
            } else if (error.code === 'auth/invalid-email') {
                setError('Invalid email address format.');
            } else {
                setError('Failed to send reset email. Please try again.');
            }
        }
    };

    return (
        <div className="login-page">
            <div className="login-left">
                <div className="login-brand">
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
                <div className="login-hero">
                    <h1>Welcome Back</h1>
                    <p>Sign in to access your account</p>
                    <Link to="/" className="back-home">← Back to Home</Link>
                </div>
            </div>

            <div className="login-right">
                <div className="login-form-container">
                    <button
                        className="google-signin"
                        onClick={handleGoogleSignIn}
                        disabled={loading}
                    >
                        <img src="https://www.google.com/favicon.ico" alt="Google" />
                        {loading ? 'Signing in...' : 'Continue with Google'}
                    </button>

                    <div className="divider">Or continue with</div>

                    <h2>Sign In</h2>
                    <p className="subtitle">Enter your credentials to continue</p>

                    {error && <div className="error-message">{error}</div>}
                    {resetEmailSent && (
                        <div className="success-message">
                            Password reset email sent! Check your inbox. 📧
                        </div>
                    )}

                    <form onSubmit={handleSubmit}>
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
                                disabled={loading}
                                placeholder="Enter your password"
                            />
                        </div>

                        <div className="form-options">
                            <button
                                type="button"
                                className="forgot-password"
                                onClick={handleForgotPassword}
                                disabled={loading}
                            >
                                Forgot Password?
                            </button>
                        </div>

                        <button
                            type="submit"
                            className="submit-button"
                            disabled={loading}
                        >
                            {loading ? 'SIGNING IN...' : 'SIGN IN'}
                        </button>

                        <p className="signup-link">
                            Don't have an account? <Link to="/register">Sign Up</Link>
                        </p>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Login;
