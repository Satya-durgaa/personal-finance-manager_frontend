import React, { useState, useEffect } from 'react';
import { Lock, Loader2, CheckCircle2, KeyRound } from 'lucide-react';
import api from '../services/api';

const ResetPassword = ({ onSwitchToLogin }) => {
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState(false);
    const [accessToken, setAccessToken] = useState(null);

    useEffect(() => {
        // Supabase redirects with the access token in the hash snippet:
        // #access_token=...&refresh_token=...&type=recovery
        const hash = window.location.hash.substring(1);
        const params = new URLSearchParams(hash.replace(/&/g, '&'));
        const token = params.get('access_token');

        if (token) {
            setAccessToken(token);
            // Clear the hash from the URL so it's not lingering
            window.history.replaceState(null, '', window.location.pathname);
        } else {
            setError('No recovery token found. The link may be expired or invalid.');
        }
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!accessToken) {
            setError('Cannot reset password without a valid recovery token.');
            return;
        }

        if (password.length < 6) {
            setError('Password must be at least 6 characters long.');
            return;
        }

        setLoading(true);
        setError('');

        try {
            await api.post('/auth/reset-password', { password }, {
                headers: {
                    Authorization: `Bearer ${accessToken}`
                }
            });
            setSuccess(true);
        } catch (err) {
            setError(err.response?.data?.error || 'Failed to update password.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-background p-4">
            <div className="glass w-full max-w-md p-8 rounded-2xl shadow-2xl space-y-8 animate-in fade-in zoom-in duration-300">
                <div className="text-center">
                    <div className="w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-4">
                        <KeyRound className="w-8 h-8 text-primary" />
                    </div>
                    <h1 className="text-3xl font-bold text-white mb-2">Create New Password</h1>
                    <p className="text-gray-400">Enter your new secure password below.</p>
                </div>

                {success ? (
                    <div className="bg-emerald-500/10 border border-emerald-500/50 p-6 rounded-2xl text-center space-y-4 animate-in slide-in-from-bottom-2">
                        <CheckCircle2 className="w-8 h-8 text-emerald-500 mx-auto" />
                        <h2 className="text-xl font-bold text-emerald-500">Password Updated!</h2>
                        <p className="text-sm text-gray-300">
                            Your password has been successfully changed.
                        </p>
                        <button
                            onClick={onSwitchToLogin}
                            className="w-full bg-white/10 hover:bg-white/20 text-white font-semibold py-3 rounded-xl transition-all mt-4"
                        >
                            Return to Login
                        </button>
                    </div>
                ) : (
                    <form onSubmit={handleSubmit} className="space-y-6">
                        {error && (
                            <div className="bg-red-500/10 border border-red-500/50 text-red-500 p-3 rounded-lg text-sm text-center">
                                {error}
                            </div>
                        )}

                        <div className="space-y-2">
                            <label className="text-sm font-medium text-gray-300">New Password</label>
                            <div className="relative">
                                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
                                <input
                                    type="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="w-full bg-white/5 border border-white/10 rounded-xl py-3 pl-10 pr-4 text-white focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all font-light"
                                    placeholder="••••••••"
                                    required
                                    disabled={!accessToken}
                                />
                            </div>
                        </div>

                        <button
                            type="submit"
                            disabled={loading || !accessToken}
                            className="w-full bg-primary hover:bg-primary/90 text-white font-semibold py-3 rounded-xl transition-all flex items-center justify-center gap-2 shadow-lg shadow-primary/20 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {loading ? (
                                <Loader2 className="w-5 h-5 animate-spin" />
                            ) : (
                                'Update Password'
                            )}
                        </button>
                    </form>
                )}
            </div>
        </div>
    );
};

export default ResetPassword;
