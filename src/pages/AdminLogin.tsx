import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";

const AdminLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSignUp, setIsSignUp] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      if (isSignUp) {
        const { error } = await supabase.auth.signUp({ email, password });
        if (error) throw error;
      } else {
        const { error } = await supabase.auth.signInWithPassword({ email, password });
        if (error) throw error;
      }
      navigate("/dashboard");
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-6">
      <div className="w-full max-w-sm space-y-8">
        <div className="text-center">
          <h1 className="font-headline text-2xl font-light text-foreground mb-2">
            {isSignUp ? "Create Admin Account" : "Admin Login"}
          </h1>
          <p className="font-body text-sm text-muted-foreground">
            {isSignUp ? "Set up your admin credentials" : "Sign in to manage your site"}
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full h-11 px-4 bg-surface-container border border-outline-variant/30 rounded-xl font-body text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary/50 transition-colors"
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            minLength={6}
            className="w-full h-11 px-4 bg-surface-container border border-outline-variant/30 rounded-xl font-body text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary/50 transition-colors"
          />

          {error && (
            <p className="font-body text-xs text-destructive">{error}</p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full h-11 bg-primary text-primary-foreground font-body text-sm tracking-wider uppercase rounded-xl hover:bg-primary/90 transition-all duration-300 disabled:opacity-50"
          >
            {loading ? "..." : isSignUp ? "Create Account" : "Sign In"}
          </button>
        </form>

        <button
          onClick={() => { setIsSignUp(!isSignUp); setError(""); }}
          className="block w-full text-center font-body text-xs text-muted-foreground hover:text-primary transition-colors"
        >
          {isSignUp ? "Already have an account? Sign in" : "First time? Create an account"}
        </button>
      </div>
    </div>
  );
};

export default AdminLogin;
