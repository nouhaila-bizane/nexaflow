export type ContactMessage = {
    id: string;
    name: string;
    email: string;
    message: string;
    createdAt: string;
    read: boolean;
};

const STORAGE_KEY = "nexaflow_messages";

export function getMessages(): ContactMessage[] {
    try {
        return JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");
    } catch {
        return [];
    }
}

export function saveMessage(msg: Omit<ContactMessage, "id" | "createdAt" | "read">): ContactMessage {
    const full: ContactMessage = {
        ...msg,
        id: `msg-${Date.now()}`,
        createdAt: new Date().toISOString(),
        read: false,
    };
    const messages = getMessages();
    messages.unshift(full);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(messages));
    return full;
}

export function markAsRead(id: string) {
    const messages = getMessages().map((m) => (m.id === id ? { ...m, read: true } : m));
    localStorage.setItem(STORAGE_KEY, JSON.stringify(messages));
}

export function getUnreadCount(): number {
    return getMessages().filter((m) => !m.read).length;
}