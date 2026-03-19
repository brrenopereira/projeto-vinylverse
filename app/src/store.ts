import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';
import type { Album } from './data';
import { VALID_COUPONS } from './data';

// ─── CART ───────────────────────────────────────
interface CartItem { album: Album; qty: number }

interface CartStore {
  items: CartItem[];
  coupon: string | null;
  discount: number;
  addItem: (a: Album) => void;
  removeItem: (id: string) => void;
  setQty: (id: string, qty: number) => void;
  applyCoupon: (code: string) => { ok: boolean; msg: string };
  removeCoupon: () => void;
  clear: () => void;
  sub: () => number;
  disc: () => number;
  total: () => number;
  count: () => number;
}

export const useCart = create<CartStore>()(
  persist((set, get) => ({
    items: [], coupon: null, discount: 0,
    addItem: (a) => set(s => {
      const ex = s.items.find(i => i.album.id === a.id);
      if (ex) return { items: s.items.map(i => i.album.id === a.id ? { ...i, qty: Math.min(i.qty + 1, a.stock) } : i) };
      return { items: [...s.items, { album: a, qty: 1 }] };
    }),
    removeItem: (id) => set(s => ({ items: s.items.filter(i => i.album.id !== id) })),
    setQty: (id, qty) => {
      if (qty <= 0) { get().removeItem(id); return; }
      set(s => ({ items: s.items.map(i => i.album.id === id ? { ...i, qty: Math.min(qty, i.album.stock) } : i) }));
    },
    applyCoupon: (code) => {
      const d = VALID_COUPONS[code.toUpperCase()];
      if (d) { set({ coupon: code.toUpperCase(), discount: d }); return { ok: true, msg: `${d}% de desconto aplicado!` }; }
      return { ok: false, msg: 'Cupom inválido' };
    },
    removeCoupon: () => set({ coupon: null, discount: 0 }),
    clear: () => set({ items: [], coupon: null, discount: 0 }),
    sub: () => get().items.reduce((s, i) => s + i.album.price * i.qty, 0),
    disc: () => get().sub() * get().discount / 100,
    total: () => get().sub() - get().disc(),
    count: () => get().items.reduce((s, i) => s + i.qty, 0),
  }), { name: 'vv-cart', storage: createJSONStorage(() => AsyncStorage) })
);

// ─── AUTH ───────────────────────────────────────
interface User {
  displayName: string; username: string; email: string;
  avatarUrl: string; bio: string; location: string;
  points: number; level: string;
  followers: number; following: number; collection: number;
}

const DEMO_USER: User = {
  displayName: 'VinylVerse Demo', username: 'vinyl_demo', email: 'demo@vinylverse.app',
  avatarUrl: 'https://i.pravatar.cc/200?img=33',
  bio: 'Colecionador apaixonado por jazz, rock progressivo e eletrônica. 🎵',
  location: 'São Paulo, BR', points: 350, level: 'Ouvinte',
  followers: 142, following: 89, collection: 67,
};

interface AuthStore {
  user: User | null; loading: boolean;
  login: (email: string, pass: string) => Promise<{ ok: boolean; err?: string }>;
  loginSpotify: () => Promise<void>;
  guest: () => void;
  logout: () => void;
  register: (email: string, pass: string, username: string) => Promise<{ ok: boolean; err?: string }>;
}

export const useAuth = create<AuthStore>()(
  persist((set) => ({
    user: null, loading: false,
    login: async (email, pass) => {
      set({ loading: true });
      await new Promise(r => setTimeout(r, 1000));
      if (email && pass.length >= 6) { set({ user: { ...DEMO_USER, email }, loading: false }); return { ok: true }; }
      set({ loading: false }); return { ok: false, err: 'Email ou senha inválidos' };
    },
    loginSpotify: async () => {
      set({ loading: true });
      await new Promise(r => setTimeout(r, 1200));
      set({ user: { ...DEMO_USER, displayName: 'Spotify User', avatarUrl: 'https://i.pravatar.cc/200?img=44' }, loading: false });
    },
    guest: () => set({ user: null, loading: false }),
    logout: () => set({ user: null }),
    register: async (email, pass, username) => {
      set({ loading: true });
      await new Promise(r => setTimeout(r, 1200));
      if (email && pass.length >= 6 && username.length >= 3) {
        set({ user: { ...DEMO_USER, email, username, displayName: username, followers: 0, following: 0, collection: 0, points: 100 }, loading: false });
        return { ok: true };
      }
      set({ loading: false }); return { ok: false, err: 'Dados inválidos' };
    },
  }), { name: 'vv-auth', storage: createJSONStorage(() => AsyncStorage) })
);
