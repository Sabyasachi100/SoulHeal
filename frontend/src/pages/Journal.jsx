import React, { useState, useEffect } from "react";
import { fetchPosts, createPost, updatePost, deletePost } from "../services/api";
import { 
  Plus, Edit2, Trash2, Smile, Cloud, Zap, Heart, AlertCircle, Save, 
  X, Loader2, Calendar, Search, Filter, BookOpen 
} from "lucide-react";

const Journal = () => {
  const [posts, setPosts] = useState([]);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [mood, setMood] = useState("Calm");
  const [isEditing, setIsEditing] = useState(false);
  const [editId, setEditId] = useState(null);
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);

  const moods = [
    { name: "Happy", icon: Smile, color: "text-yellow-400" },
    { name: "Sad", icon: Cloud, color: "text-blue-400" },
    { name: "Anxious", icon: Zap, color: "text-purple-400" },
    { name: "Calm", icon: Heart, color: "text-emerald-400" },
    { name: "Angry", icon: Zap, color: "text-red-400" },
    { name: "Stressed", icon: AlertCircle, color: "text-orange-400" },
  ];

  useEffect(() => {
    getPosts();
  }, []);

  const getPosts = async () => {
    try {
      const { data } = await fetchPosts();
      setPosts(data);
    } catch (err) {
      console.error(err);
    } finally {
      setFetching(false);
    }
  };

  const resetForm = () => {
    setTitle("");
    setContent("");
    setMood("Calm");
    setIsEditing(false);
    setEditId(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (isEditing) {
        await updatePost(editId, { title, content, mood });
      } else {
        await createPost({ title, content, mood });
      }
      resetForm();
      getPosts();
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (post) => {
    setIsEditing(true);
    setEditId(post._id);
    setTitle(post.title);
    setContent(post.content);
    setMood(post.mood);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this entry?")) {
      try {
        await deletePost(id);
        getPosts();
      } catch (err) {
        console.error(err);
      }
    }
  };

  return (
    <div className="space-y-12 animate-in fade-in duration-700">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <h1 className="text-4xl font-extrabold text-white tracking-tight mb-2 text-gradient">Mood Journal</h1>
          <p className="text-slate-400 font-medium tracking-wide">Write your path to clarity and peace.</p>
        </div>
        <div className="flex items-center gap-3 glass-morph px-6 py-3 rounded-2xl border-white/5">
          <BookOpen className="w-5 h-5 text-purple-400" />
          <span className="text-sm font-bold text-white">{posts.length} Total Entries</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        {/* Editor Side */}
        <div className="lg:col-span-1">
          <div className="premium-card sticky top-24">
            <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
              {isEditing ? <Edit2 className="w-5 h-5 text-purple-400" /> : <Plus className="w-5 h-5 text-purple-400" />}
              {isEditing ? "Edit Entry" : "New Entry"}
            </h2>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <label className="text-[10px] uppercase font-bold tracking-widest text-slate-500 ml-1">Title</label>
                <input
                  type="text"
                  required
                  className="w-full bg-slate-900 border border-white/5 rounded-xl p-4 text-sm text-white outline-none focus:ring-2 focus:ring-purple-500/30 transition-all"
                  placeholder="Today's highlight..."
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <label className="text-[10px] uppercase font-bold tracking-widest text-slate-500 ml-1">How are you feeling?</label>
                <div className="grid grid-cols-3 gap-2">
                  {moods.map((m) => (
                    <button
                      key={m.name}
                      type="button"
                      onClick={() => setMood(m.name)}
                      className={`p-3 rounded-xl border text-[10px] font-bold transition-all flex flex-col items-center gap-1 ${
                        mood === m.name 
                        ? 'bg-purple-500/20 border-purple-500 text-white' 
                        : 'bg-slate-900 border-white/5 text-slate-500 hover:border-white/10'
                      }`}
                    >
                      <m.icon className={`w-4 h-4 ${mood === m.name ? m.color : 'text-slate-600'}`} />
                      {m.name}
                    </button>
                  ))}
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-[10px] uppercase font-bold tracking-widest text-slate-500 ml-1">Reflection</label>
                <textarea
                  required
                  rows="6"
                  className="w-full bg-slate-900 border border-white/5 rounded-xl p-4 text-sm text-white outline-none focus:ring-2 focus:ring-purple-500/30 transition-all resize-none shadow-inner"
                  placeholder="Dear Journal..."
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                />
              </div>

              <div className="flex items-center gap-3">
                <button
                  type="submit"
                  disabled={loading}
                  className="flex-1 gradient-btn text-white text-sm flex items-center justify-center gap-2 group"
                >
                  {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : <Save className="w-5 h-5" />}
                  {isEditing ? "Update" : "Save Entry"}
                </button>
                {isEditing && (
                  <button
                    type="button"
                    onClick={resetForm}
                    className="p-4 bg-slate-800 text-slate-400 rounded-xl hover:text-white transition-all"
                  >
                    <X className="w-5 h-5" />
                  </button>
                )}
              </div>
            </form>
          </div>
        </div>

        {/* Entries Side */}
        <div className="lg:col-span-2 space-y-6">
          <div className="flex items-center justify-between px-2">
            <h2 className="text-xl font-bold text-white">Previous Entries</h2>
            <div className="flex items-center gap-2">
              <button className="p-2 text-slate-500 hover:text-white transition-all"><Search className="w-4 h-4" /></button>
              <button className="p-2 text-slate-500 hover:text-white transition-all"><Filter className="w-4 h-4" /></button>
            </div>
          </div>

          <div className="space-y-6">
            {fetching ? (
              <div className="flex justify-center py-12">
                <div className="w-10 h-10 border-2 border-purple-500/20 border-t-purple-500 rounded-full animate-spin"></div>
              </div>
            ) : posts.length > 0 ? (
              posts.map((post) => (
                <div key={post._id} className="premium-card group transition-all duration-300 hover:translate-x-1">
                  <div className="flex flex-col md:flex-row md:items-start justify-between gap-6">
                    <div className="flex-1 space-y-4">
                      <div className="flex items-center gap-3">
                        <div className={`w-10 h-10 rounded-xl flex items-center justify-center bg-white/5 border border-white/5`}>
                          {moods.find(m => m.name === post.mood)?.icon({ className: `w-5 h-5 ${moods.find(m => m.name === post.mood)?.color}` })}
                        </div>
                        <div>
                          <h3 className="text-lg font-bold text-white group-hover:text-purple-400 transition-colors">{post.title}</h3>
                          <div className="flex items-center gap-2 mt-1">
                            <Calendar className="w-3 h-3 text-slate-600" />
                            <span className="text-[10px] font-bold text-slate-600 uppercase tracking-widest">
                              {new Date(post.createdAt).toLocaleDateString(undefined, { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
                            </span>
                          </div>
                        </div>
                      </div>
                      <p className="text-sm text-slate-400 leading-relaxed line-clamp-3 md:line-clamp-none">
                        {post.content}
                      </p>
                    </div>
                    
                    <div className="flex md:flex-col items-center gap-2 self-end md:self-start opacity-100 md:opacity-0 group-hover:opacity-100 transition-opacity">
                      <button 
                        onClick={() => handleEdit(post)}
                        className="p-3 bg-white/5 text-slate-500 hover:text-purple-400 hover:bg-white/10 rounded-xl transition-all"
                      >
                        <Edit2 className="w-4 h-4" />
                      </button>
                      <button 
                         onClick={() => handleDelete(post._id)}
                        className="p-3 bg-white/5 text-slate-500 hover:text-red-400 hover:bg-red-500/10 rounded-xl transition-all"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="premium-card flex flex-col items-center justify-center text-center p-16">
                <div className="w-20 h-20 bg-slate-800 rounded-3xl flex items-center justify-center mb-6 border border-white/5">
                  <BookOpen className="w-10 h-10 text-slate-700" />
                </div>
                <h3 className="text-xl font-bold text-white mb-2">No entries yet</h3>
                <p className="text-slate-400 text-sm">Every journey begins with a single word. Start yours today.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Journal;
