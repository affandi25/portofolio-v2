import React, { useState, useEffect, useRef, useCallback, memo } from 'react';
import { MessageCircle, UserCircle2, Loader2, AlertCircle, Send, ImagePlus, X, Pin } from 'lucide-react';
import AOS from "aos";
import "aos/dist/aos.css";
import { supabase } from '../supabase';

const Comment = memo(({ comment, formatDate, index, isPinned = false }) => (
    <div 
        className={`p-4 border transition-all ${
            isPinned 
                ? 'bg-[#0D0D0D] text-white border-neutral-800' 
                : 'bg-white text-black border-black hover:scale-[1.01] hover:shadow-md'
        }`}
    >
        {isPinned && (
            <div className="flex items-center gap-1.5 mb-2.5 text-neutral-400 text-[10px] font-mono tracking-widest uppercase">
                <Pin className="w-3.5 h-3.5" />
                <span>PINNED COMMENT</span>
            </div>
        )}
        <div className="flex items-start gap-3">
            {comment.profile_image ? (
                <img
                    src={comment.profile_image}
                    alt={`${comment.user_name}'s profile`}
                    className={`w-9 h-9 object-cover border flex-shrink-0 ${
                        isPinned ? 'border-neutral-700' : 'border-neutral-300'
                    }`}
                    loading="lazy"
                />
            ) : (
                <div className={`p-2 flex-shrink-0 ${
                    isPinned ? 'bg-neutral-800 text-neutral-300' : 'bg-neutral-100 text-neutral-600'
                }`}>
                    <UserCircle2 className="w-5 h-5" />
                </div>
            )}
            <div className="flex-grow min-w-0">
                <div className="flex items-center justify-between gap-4 mb-1">
                    <div className="flex items-center gap-2">
                        <h4 className={`text-xs font-bold tracking-wider uppercase truncate ${
                            isPinned ? 'text-white' : 'text-black'
                        }`}>
                            {comment.user_name}
                        </h4>
                        {isPinned && (
                            <span className="px-1.5 py-0.5 text-[9px] font-mono bg-white text-black font-semibold">
                                ADMIN
                            </span>
                        )}
                    </div>
                    <span className="text-[10px] font-mono text-neutral-400 whitespace-nowrap">
                        {formatDate(comment.created_at)}
                    </span>
                </div>
                <p className={`text-xs leading-relaxed break-words font-normal ${
                    isPinned ? 'text-neutral-300' : 'text-neutral-700'
                }`}>
                    {comment.content}
                </p>
            </div>
        </div>
    </div>
));

const CommentForm = memo(({ onSubmit, isSubmitting, error }) => {
    const [newComment, setNewComment] = useState('');
    const [userName, setUserName] = useState('');
    const [imagePreview, setImagePreview] = useState(null);
    const [imageFile, setImageFile] = useState(null);
    const textareaRef = useRef(null);
    const fileInputRef = useRef(null);

    const handleImageChange = useCallback((e) => {
        const file = e.target.files[0];
        if (file) {
            if (file.size > 5 * 1024 * 1024) {
                alert('File size must be less than 5MB. Please choose a smaller image.');
                if (e.target) e.target.value = '';
                return;
            }
            if (!file.type.startsWith('image/')) {
                alert('Please select a valid image file.');
                if (e.target) e.target.value = '';
                return;
            }
            setImageFile(file);
            const reader = new FileReader();
            reader.onloadend = () => setImagePreview(reader.result);
            reader.readAsDataURL(file);
        }
    }, []);

    const handleTextareaChange = useCallback((e) => {
        setNewComment(e.target.value);
        if (textareaRef.current) {
            textareaRef.current.style.height = 'auto';
            textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
        }
    }, []);

    const handleSubmit = useCallback((e) => {
        e.preventDefault();
        if (!newComment.trim() || !userName.trim()) return;
        
        onSubmit({ newComment, userName, imageFile });
        setNewComment('');
        setUserName('');
        setImagePreview(null);
        setImageFile(null);
        if (fileInputRef.current) fileInputRef.current.value = '';
        if (textareaRef.current) textareaRef.current.style.height = 'auto';
    }, [newComment, userName, imageFile, onSubmit]);

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <div>
                <label className="block text-[11px] font-mono uppercase tracking-wider text-black font-semibold mb-1">
                    NAME <span className="text-red-500">*</span>
                </label>
                <input
                    type="text"
                    value={userName}
                    onChange={(e) => setUserName(e.target.value)}
                    maxLength={20}
                    placeholder="Nama Anda"
                    className="w-full py-2.5 px-3 bg-white border border-neutral-300 text-black text-xs placeholder-neutral-400 focus:outline-none focus:border-black transition-colors"
                    required
                />
            </div>

            <div>
                <label className="block text-[11px] font-mono uppercase tracking-wider text-black font-semibold mb-1">
                    MESSAGE <span className="text-red-500">*</span>
                </label>
                <textarea
                    ref={textareaRef}
                    value={newComment}
                    maxLength={250}
                    onChange={handleTextareaChange}
                    placeholder="Tuliskan ucapan atau komentar..."
                    rows={3}
                    className="w-full py-2.5 px-3 bg-white border border-neutral-300 text-black text-xs placeholder-neutral-400 focus:outline-none focus:border-black transition-colors resize-none"
                    required
                />
            </div>

            <div>
                <label className="block text-[11px] font-mono uppercase tracking-wider text-neutral-500 mb-1">
                    PHOTO (OPTIONAL)
                </label>
                <div className="flex items-center gap-3 p-3 bg-neutral-50 border border-neutral-200">
                    {imagePreview ? (
                        <div className="flex items-center gap-3">
                            <img
                                src={imagePreview}
                                alt="Profile preview"
                                className="w-10 h-10 object-cover border border-neutral-400"
                            />
                            <button
                                type="button"
                                onClick={() => {
                                    setImagePreview(null);
                                    setImageFile(null);
                                    if (fileInputRef.current) fileInputRef.current.value = '';
                                }}
                                className="flex items-center gap-1 px-2.5 py-1 text-[11px] font-mono bg-neutral-200 text-neutral-800 hover:bg-neutral-300 transition-colors uppercase"
                            >
                                <X className="w-3.5 h-3.5" />
                                <span>Remove</span>
                            </button>
                        </div>
                    ) : (
                        <div className="w-full flex items-center justify-between">
                            <input
                                type="file"
                                ref={fileInputRef}
                                onChange={handleImageChange}
                                accept="image/*"
                                className="hidden"
                            />
                            <button
                                type="button"
                                onClick={() => fileInputRef.current?.click()}
                                className="inline-flex items-center gap-1.5 text-xs font-mono font-semibold uppercase text-black hover:opacity-70 transition-opacity"
                            >
                                <ImagePlus className="w-4 h-4" />
                                <span>Attach Photo</span>
                            </button>
                            <span className="text-[10px] font-mono text-neutral-400">MAX 5MB</span>
                        </div>
                    )}
                </div>
            </div>

            <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-3 bg-black text-white hover:bg-neutral-800 transition-colors text-xs font-bold tracking-[0.2em] uppercase flex items-center justify-center gap-2 disabled:opacity-50"
            >
                {isSubmitting ? (
                    <>
                        <Loader2 className="w-3.5 h-3.5 animate-spin" />
                        <span>POSTING...</span>
                    </>
                ) : (
                    <>
                        <Send className="w-3.5 h-3.5" />
                        <span>POST TO GUESTBOOK</span>
                    </>
                )}
            </button>
        </form>
    );
});

const Komentar = () => {
    const [comments, setComments] = useState([]);
    const [pinnedComment, setPinnedComment] = useState(null);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState('');

    useEffect(() => {
        AOS.init({
            once: false,
      mirror: true,
            duration: 800,
        });
    }, []);

    useEffect(() => {
        const fetchPinnedComment = async () => {
            try {
                const { data, error } = await supabase
                    .from('portfolio_comments')
                    .select('*')
                    .eq('is_pinned', true)
                    .single();
                if (error && error.code !== 'PGRST116') throw error;
                setPinnedComment(data);
            } catch (err) {
                console.error('Error fetching pinned comment:', err);
            }
        };
        fetchPinnedComment();
    }, []);

    useEffect(() => {
        const fetchComments = async () => {
            try {
                const { data, error } = await supabase
                    .from('portfolio_comments')
                    .select('*')
                    .eq('is_pinned', false)
                    .order('created_at', { ascending: false });
                if (error) throw error;
                setComments(data || []);
            } catch (err) {
                console.error('Error fetching comments:', err);
            }
        };
        fetchComments();

        const channel = supabase
            .channel('public:portfolio_comments')
            .on('postgres_changes', { event: '*', schema: 'public', table: 'portfolio_comments' }, payload => {
                if (payload.eventType === 'INSERT') {
                    if (payload.new.is_pinned) {
                        setPinnedComment(payload.new);
                    } else {
                        setComments(prev => [payload.new, ...prev]);
                    }
                } else if (payload.eventType === 'DELETE') {
                    setComments(prev => prev.filter(c => c.id !== payload.old.id));
                    setPinnedComment(prev => (prev?.id === payload.old.id ? null : prev));
                }
            })
            .subscribe();

        return () => {
            supabase.removeChannel(channel);
        };
    }, []);

    const uploadImage = useCallback(async (file) => {
        if (!file) return null;
        try {
            const fileExt = file.name.split('.').pop();
            const fileName = `${Date.now()}_${Math.random().toString(36).substr(2, 9)}.${fileExt}`;
            const { error: uploadError } = await supabase.storage
                .from('comment_images')
                .upload(fileName, file);
            if (uploadError) throw uploadError;

            const { data } = supabase.storage
                .from('comment_images')
                .getPublicUrl(fileName);
            return data.publicUrl;
        } catch (err) {
            console.error('Image upload error:', err);
            return null;
        }
    }, []);

    const handleCommentSubmit = useCallback(async ({ newComment, userName, imageFile }) => {
        setIsSubmitting(true);
        setError('');
        try {
            const profileUrl = await uploadImage(imageFile);
            const { error } = await supabase
                .from('portfolio_comments')
                .insert([{
                    user_name: userName,
                    content: newComment,
                    profile_image: profileUrl,
                    is_pinned: false
                }]);
            if (error) throw error;
        } catch (err) {
            setError('Gagal mengirim komentar. Silakan coba lagi.');
            console.error('Error adding comment:', err);
        } finally {
            setIsSubmitting(false);
        }
    }, [uploadImage]);

    const formatDate = useCallback((timestamp) => {
        if (!timestamp) return '';
        const date = new Date(timestamp);
        const now = new Date();
        const diffMinutes = Math.floor((now - date) / (1000 * 60));
        const diffHours = Math.floor(diffMinutes / 60);
        const diffDays = Math.floor(diffHours / 24);

        if (diffMinutes < 1) return 'Just now';
        if (diffMinutes < 60) return `${diffMinutes}m ago`;
        if (diffHours < 24) return `${diffHours}h ago`;
        if (diffDays < 7) return `${diffDays}d ago`;

        return new Intl.DateTimeFormat('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric'
        }).format(date);
    }, []);

    const totalComments = comments.length + (pinnedComment ? 1 : 0);

    return (
        <div className="w-full space-y-6">
            <div className="flex items-center justify-between text-xs font-mono uppercase tracking-widest text-neutral-500 pb-2 border-b border-neutral-200">
                <span className="flex items-center gap-1.5 text-black font-bold">
                    <MessageCircle className="w-4 h-4" />
                    RECORDS ({totalComments})
                </span>
                <span>REAL-TIME FEED</span>
            </div>

            {error && (
                <div className="p-3 bg-red-50 border border-red-200 text-red-600 text-xs flex items-center gap-2">
                    <AlertCircle className="w-4 h-4 flex-shrink-0" />
                    <span>{error}</span>
                </div>
            )}

            <CommentForm onSubmit={handleCommentSubmit} isSubmitting={isSubmitting} error={error} />

            <div className="space-y-3 max-h-[360px] overflow-y-auto pr-1">
                {pinnedComment && (
                    <Comment
                        comment={pinnedComment}
                        formatDate={formatDate}
                        index={0}
                        isPinned={true}
                    />
                )}

                {comments.length === 0 && !pinnedComment ? (
                    <div className="py-8 text-center text-xs font-mono text-neutral-400 uppercase">
                        Belum ada komentar. Jadilah yang pertama meninggalkan jejak!
                    </div>
                ) : (
                    comments.map((comment, index) => (
                        <Comment
                            key={comment.id}
                            comment={comment}
                            formatDate={formatDate}
                            index={index + (pinnedComment ? 1 : 0)}
                            isPinned={false}
                        />
                    ))
                )}
            </div>
        </div>
    );
};

export default Komentar;
