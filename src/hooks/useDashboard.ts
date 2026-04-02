'use client';

import { useState, useCallback, useEffect } from 'react';
import { Contact, InteractionNote, StudentStage } from '@/types/dashboard';

// Storage keys — colon-separated namespace for consistency
const CONTACTS_KEY = 'welcome-hub:dashboard-contacts';
const AUTH_KEY = 'welcome-hub:dashboard-auth';

const CONTACTS_VERSION_KEY = 'welcome-hub:dashboard-contacts-version';
const CONTACTS_SCHEMA_VERSION = 1; // increment when Contact schema changes

// --- Auth ---

export function useDashboardAuth() {
  // Initialize as false on server AND client to avoid hydration mismatch.
  // The real value is synced from localStorage in useEffect below.
  const [authed, setAuthed] = useState(false);

  // Sync auth state from localStorage after hydration (client-only)
  useEffect(() => {
    const stored = localStorage.getItem(AUTH_KEY) === 'true';
    setAuthed(stored);
  }, []);

  const login = useCallback(async (pin: string): Promise<boolean> => {
    try {
      const res = await fetch('/api/auth', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ pin }),
      });
      if (res.ok) {
        localStorage.setItem(AUTH_KEY, 'true');
        setAuthed(true);
        return true;
      }
    } catch {
      // Network error — fall through to return false
    }
    return false;
  }, []);

  const logout = useCallback(async () => {
    await fetch('/api/auth', { method: 'DELETE' }).catch(() => {});
    localStorage.removeItem(AUTH_KEY);
    setAuthed(false);
  }, []);

  return { authed, login, logout };
}

// --- Contacts CRUD ---

function loadContacts(): Contact[] {
  if (typeof window === 'undefined') return [];
  try {
    const storedVersion = parseInt(localStorage.getItem(CONTACTS_VERSION_KEY) ?? '0', 10);
    if (storedVersion !== CONTACTS_SCHEMA_VERSION) {
      // Schema version mismatch — clear stale data to prevent silent failures.
      // Increment CONTACTS_SCHEMA_VERSION whenever the Contact type changes.
      localStorage.removeItem(CONTACTS_KEY);
      localStorage.setItem(CONTACTS_VERSION_KEY, String(CONTACTS_SCHEMA_VERSION));
      return [];
    }
    const raw = localStorage.getItem(CONTACTS_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

function saveContacts(contacts: Contact[]) {
  localStorage.setItem(CONTACTS_KEY, JSON.stringify(contacts));
  localStorage.setItem(CONTACTS_VERSION_KEY, String(CONTACTS_SCHEMA_VERSION));
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
        id: `contact-${crypto.randomUUID()}`,
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
          id: `note-${crypto.randomUUID()}`,
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
        const remainingNotes = c.notes.filter(n => n.id !== noteId);
        // Recalculate lastContactedAt from remaining notes after deletion
        const lastNote = remainingNotes.length > 0
          ? remainingNotes.reduce((latest, n) => n.date > latest.date ? n : latest)
          : null;
        return {
          ...c,
          notes: remainingNotes,
          lastContactedAt: lastNote?.date,
        };
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
