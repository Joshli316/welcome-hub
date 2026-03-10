'use client';

import { useState, useCallback, useEffect } from 'react';
import { Contact, InteractionNote, StudentStage } from '@/types/dashboard';

// Storage keys — colon-separated namespace for consistency
const CONTACTS_KEY = 'welcome-hub:dashboard-contacts';
const PIN_KEY = 'welcome-hub:dashboard-pin';
const AUTH_KEY = 'welcome-hub:dashboard-auth';

// Also set a cookie so middleware can gate dashboard routes server-side.
// The cookie is not httpOnly (set from JS), so it's not tamper-proof —
// but it prevents the dashboard HTML from being sent before auth check.
const AUTH_COOKIE = 'welcome-hub-authed';

// Prototype-only PIN gate. Default '1234' is replaced when a worker
// changes their PIN via settings. In a real app, this would be
// server-side auth — localStorage is intentionally insecure here.
const DEFAULT_PIN = '1234';

// --- Auth ---

function getStoredPin(): string {
  if (typeof window === 'undefined') return DEFAULT_PIN;
  return localStorage.getItem(PIN_KEY) || DEFAULT_PIN;
}

export function useDashboardAuth() {
  // Initialize as false on server AND client to avoid hydration mismatch.
  // The real value is synced from localStorage in useEffect below.
  const [authed, setAuthed] = useState(false);

  // Sync auth state from localStorage after hydration (client-only)
  useEffect(() => {
    const stored = localStorage.getItem(AUTH_KEY) === 'true';
    setAuthed(stored);
  }, []);

  const login = useCallback((pin: string): boolean => {
    if (pin === getStoredPin()) {
      localStorage.setItem(AUTH_KEY, 'true');
      // Set cookie so middleware can gate dashboard routes server-side.
      // Secure flag ensures cookie is only sent over HTTPS in production.
      const secure = window.location.protocol === 'https:' ? '; Secure' : '';
      document.cookie = `${AUTH_COOKIE}=1; path=/; SameSite=Lax${secure}`;
      setAuthed(true);
      return true;
    }
    return false;
  }, []);

  const logout = useCallback(() => {
    localStorage.removeItem(AUTH_KEY);
    // Remove the auth cookie
    document.cookie = `${AUTH_COOKIE}=; path=/; max-age=0`;
    setAuthed(false);
  }, []);

  const changePin = useCallback((oldPin: string, newPin: string): boolean => {
    if (oldPin === getStoredPin()) {
      localStorage.setItem(PIN_KEY, newPin);
      return true;
    }
    return false;
  }, []);

  return { authed, login, logout, changePin };
}

// --- Contacts CRUD ---

function loadContacts(): Contact[] {
  if (typeof window === 'undefined') return [];
  try {
    const raw = localStorage.getItem(CONTACTS_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

function saveContacts(contacts: Contact[]) {
  localStorage.setItem(CONTACTS_KEY, JSON.stringify(contacts));
}

export function useDashboardContacts() {
  // Initialize empty on server, sync from localStorage after hydration
  const [contacts, setContacts] = useState<Contact[]>([]);

  useEffect(() => {
    setContacts(loadContacts());
  }, []);

  const addContact = useCallback((contact: Omit<Contact, 'id' | 'createdAt' | 'notes'>) => {
    setContacts(prev => {
      const newContact: Contact = {
        ...contact,
        id: `contact-${Date.now()}`,
        notes: [],
        createdAt: new Date().toISOString(),
      };
      const next = [newContact, ...prev];
      saveContacts(next);
      return next;
    });
  }, []);

  const updateContact = useCallback((id: string, updates: Partial<Omit<Contact, 'id' | 'createdAt'>>) => {
    setContacts(prev => {
      const next = prev.map(c => c.id === id ? { ...c, ...updates } : c);
      saveContacts(next);
      return next;
    });
  }, []);

  const deleteContact = useCallback((id: string) => {
    setContacts(prev => {
      const next = prev.filter(c => c.id !== id);
      saveContacts(next);
      return next;
    });
  }, []);

  const addNote = useCallback((contactId: string, note: Omit<InteractionNote, 'id' | 'contactId' | 'createdAt'>) => {
    setContacts(prev => {
      const next = prev.map(c => {
        if (c.id !== contactId) return c;
        const newNote: InteractionNote = {
          ...note,
          id: `note-${Date.now()}`,
          contactId,
          createdAt: new Date().toISOString(),
        };
        return {
          ...c,
          notes: [newNote, ...c.notes],
          lastContactedAt: note.date,
        };
      });
      saveContacts(next);
      return next;
    });
  }, []);

  const deleteNote = useCallback((contactId: string, noteId: string) => {
    setContacts(prev => {
      const next = prev.map(c => {
        if (c.id !== contactId) return c;
        return { ...c, notes: c.notes.filter(n => n.id !== noteId) };
      });
      saveContacts(next);
      return next;
    });
  }, []);

  const updateStage = useCallback((id: string, stage: StudentStage) => {
    updateContact(id, { stage });
  }, [updateContact]);

  const addTag = useCallback((id: string, tag: string) => {
    setContacts(prev => {
      const next = prev.map(c => {
        if (c.id !== id || c.tags.includes(tag)) return c;
        return { ...c, tags: [...c.tags, tag] };
      });
      saveContacts(next);
      return next;
    });
  }, []);

  const removeTag = useCallback((id: string, tag: string) => {
    setContacts(prev => {
      const next = prev.map(c => {
        if (c.id !== id) return c;
        return { ...c, tags: c.tags.filter(t => t !== tag) };
      });
      saveContacts(next);
      return next;
    });
  }, []);

  const getContact = useCallback((id: string) => {
    return contacts.find(c => c.id === id);
  }, [contacts]);

  return {
    contacts,
    addContact,
    updateContact,
    deleteContact,
    addNote,
    deleteNote,
    updateStage,
    addTag,
    removeTag,
    getContact,
  };
}
