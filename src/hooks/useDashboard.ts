'use client';

import { useState, useCallback } from 'react';
import { Contact, InteractionNote, StudentStage } from '@/types/dashboard';

const CONTACTS_KEY = 'welcome-hub-dashboard-contacts';
const PIN_KEY = 'welcome-hub-dashboard-pin';

// Default PIN for prototype — ministry workers set their own on first use
const DEFAULT_PIN = '1234';

// --- Auth (simple PIN gate, no real auth) ---

function getStoredPin(): string {
  if (typeof window === 'undefined') return DEFAULT_PIN;
  return localStorage.getItem(PIN_KEY) || DEFAULT_PIN;
}

function isAuthenticated(): boolean {
  if (typeof window === 'undefined') return false;
  return localStorage.getItem('welcome-hub-dashboard-auth') === 'true';
}

export function useDashboardAuth() {
  const [authed, setAuthed] = useState<boolean>(isAuthenticated);

  const login = useCallback((pin: string): boolean => {
    if (pin === getStoredPin()) {
      localStorage.setItem('welcome-hub-dashboard-auth', 'true');
      setAuthed(true);
      return true;
    }
    return false;
  }, []);

  const logout = useCallback(() => {
    localStorage.removeItem('welcome-hub-dashboard-auth');
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
  const [contacts, setContacts] = useState<Contact[]>(loadContacts);

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
