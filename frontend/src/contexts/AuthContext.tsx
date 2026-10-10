import { createContext, useCallback, useEffect, useMemo, useState } from "react";
import type { ReactNode } from "react";
import { api } from "@/lib/api";
import type { User } from "@/types";

type AuthState = {
    user: User | null;
    loading: boolean;
    login: (email: string, password: string) => Promise<void>;
    register: (name: string, email: string, password: string) => Promise<void>;
    logout: () => void;
    refresh: () => Promise<void>;
};

export const AuthContext = createContext<AuthState | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);

    const refresh = useCallback(async () => {
        const token = localStorage.getItem("nf_token");
        if (!token) {
            setUser(null);
            setLoading(false);
            return;
        }
        try {
            const { user } = await api.get<{ user: User }>("/auth/me");
            setUser(user);
        } catch {
            localStorage.removeItem("nf_token");
            setUser(null);
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        refresh();
    }, [refresh]);

    const login = async (email: string, password: string) => {
        const { token, user } = await api.post<{ token: string; user: User }>("/auth/login", {
            email,
            password,
        });
        localStorage.setItem("nf_token", token);
        setUser(user);
    };

    const register = async (name: string, email: string, password: string) => {
        const { token, user } = await api.post<{ token: string; user: User }>("/auth/register", {
            name,
            email,
            password,
        });
        localStorage.setItem("nf_token", token);
        setUser(user);
    };

    const logout = () => {
        localStorage.removeItem("nf_token");
        setUser(null);
    };

    const value = useMemo(
        () => ({ user, loading, login, register, logout, refresh }),
        [user, loading, refresh]
    );

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}