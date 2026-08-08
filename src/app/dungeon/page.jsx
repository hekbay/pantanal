"use client";
import { useState, useEffect, useCallback, useRef } from 'react';
import './dungeon.css';

const GRID_SIZE = 40;
const STORAGE_KEY = 'dungeon_grid_v1';
const NOTES_KEY = 'dungeon_notes_v1';

const SB_URL = 'https://tvxxkvoamgxblaehnlhf.supabase.co';
const SB_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InR2eHhrdm9hbWd4YmxhZWhubGhmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODAzODg5MTEsImV4cCI6MjA5NTk2NDkxMX0.hDEj28pF_4B8B6asQlfEuPcuVy-2u9dXlJrKlOw6API';
const SHEET_ID = 'dungeon-shared';

async function sbGet() {
  const res = await fetch(`${SB_URL}/rest/v1/character_sheets?sheet_id=eq.${SHEET_ID}&select=data,updated_at&limit=1`, {
    headers: { apikey: SB_KEY, Authorization: `Bearer ${SB_KEY}` }
  });
  if (!res.ok) throw new Error(await res.text());
  return res.json();
}
async function sbPush(data) {
  const now = new Date().toISOString();
  const res = await fetch(`${SB_URL}/rest/v1/character_sheets`, {
    method: 'POST',
    headers: {
      apikey: SB_KEY, Authorization: `Bearer ${SB_KEY}`, 'Content-Type': 'application/json',
      Prefer: 'resolution=merge-duplicates,return=minimal'
    },
    body: JSON.stringify({ sheet_id: SHEET_ID, data, updated_at: now })
  });
  if (!res.ok) throw new Error(await res.text());
  return now;
}

export default function DungeonPage() {
  const [painted, setPainted] = useState(() => new Set());
  const [notesOpen, setNotesOpen] = useState(true);
  const [notes, setNotes] = useState('');
  const [syncStatus, setSyncStatus] = useState('Carregando...');

  const loadedRef = useRef(false);
  const paintingRef = useRef(false);
  const paintModeRef = useRef(true);
  const notesFocusedRef = useRef(false);
  const updatedAtRef = useRef(null);
  const paintedRef = useRef(painted);
  const notesRef = useRef(notes);
  const pushTimerRef = useRef(null);

  paintedRef.current = painted;
  notesRef.current = notes;

  const pushNow = useCallback(async () => {
    try {
      setSyncStatus('Salvando...');
      const now = await sbPush({ painted: [...paintedRef.current], notes: notesRef.current });
      updatedAtRef.current = now;
      setSyncStatus('Sincronizado');
    } catch (e) {
      setSyncStatus('Offline — salvo só localmente');
      console.error('[Dungeon] erro ao salvar', e.message || e);
    }
  }, []);

  const pushDebounced = useCallback(() => {
    clearTimeout(pushTimerRef.current);
    pushTimerRef.current = setTimeout(pushNow, 1000);
  }, [pushNow]);

  // carga inicial: Supabase, com fallback localStorage
  useEffect(() => {
    (async () => {
      try {
        const rows = await sbGet();
        if (rows && rows.length > 0) {
          setPainted(new Set(rows[0].data?.painted || []));
          setNotes(rows[0].data?.notes || '');
          updatedAtRef.current = rows[0].updated_at;
          setSyncStatus('Sincronizado');
        } else {
          setSyncStatus('Sincronizado');
        }
      } catch (e) {
        setSyncStatus('Offline — usando cópia local');
        try {
          const saved = localStorage.getItem(STORAGE_KEY);
          if (saved) setPainted(new Set(JSON.parse(saved)));
          const savedNotes = localStorage.getItem(NOTES_KEY);
          if (savedNotes) setNotes(savedNotes);
        } catch (e2) {}
      }
      loadedRef.current = true;
    })();

    const stopPaint = () => {
      if (paintingRef.current) { paintingRef.current = false; pushDebounced(); }
    };
    window.addEventListener('mouseup', stopPaint);

    const poll = setInterval(async () => {
      if (paintingRef.current || notesFocusedRef.current) return;
      try {
        const rows = await sbGet();
        if (rows && rows.length > 0 && rows[0].updated_at !== updatedAtRef.current) {
          updatedAtRef.current = rows[0].updated_at;
          setPainted(new Set(rows[0].data?.painted || []));
          setNotes(rows[0].data?.notes || '');
          setSyncStatus('Sincronizado');
        }
      } catch (e) { /* silencioso, tenta de novo no próximo ciclo */ }
    }, 4000);

    return () => { window.removeEventListener('mouseup', stopPaint); clearInterval(poll); };
  }, [pushDebounced]);

  // backup local sempre que muda (funciona mesmo offline)
  useEffect(() => {
    if (!loadedRef.current) return;
    try { localStorage.setItem(STORAGE_KEY, JSON.stringify([...painted])); } catch (e) {}
  }, [painted]);
  useEffect(() => {
    if (!loadedRef.current) return;
    try { localStorage.setItem(NOTES_KEY, notes); } catch (e) {}
  }, [notes]);

  const setCell = useCallback((key, shouldPaint) => {
    setPainted(prev => {
      const has = prev.has(key);
      if (shouldPaint === has) return prev;
      const next = new Set(prev);
      if (shouldPaint) next.add(key); else next.delete(key);
      return next;
    });
  }, []);

  const handleCellDown = useCallback((key) => {
    const willPaint = !painted.has(key);
    paintModeRef.current = willPaint;
    paintingRef.current = true;
    setCell(key, willPaint);
  }, [painted, setCell]);

  const handleCellEnter = useCallback((key) => {
    if (!paintingRef.current) return;
    setCell(key, paintModeRef.current);
  }, [setCell]);

  const clearGrid = () => {
    if (confirm('Limpar todo o grid da dungeon para todo mundo?')) {
      setPainted(new Set());
      pushDebounced();
    }
  };

  const handleNotesChange = (e) => {
    setNotes(e.target.value);
    pushDebounced();
  };

  const cells = [];
  for (let r = 0; r < GRID_SIZE; r++) {
    for (let c = 0; c < GRID_SIZE; c++) {
      const key = `${r}-${c}`;
      cells.push(
        <div
          key={key}
          className={`dg-cell${painted.has(key) ? ' painted' : ''}`}
          onMouseDown={() => handleCellDown(key)}
          onMouseOver={() => handleCellEnter(key)}
        />
      );
    }
  }

  return (
    <div className="dungeon-page">
      <div className="dg-toolbar">
        <h1>Dungeon</h1>
        <span className="dg-sync">{syncStatus}</span>
        <button onClick={clearGrid}>Limpar grid</button>
      </div>
      <div className="dg-hint">Compartilhado — atualiza sozinho para todo mundo. Clique (ou clique e arraste) para pintar/apagar quadrados conforme você explora.</div>

      <div className="dg-grid-wrap">
        <div className="dg-grid" style={{ gridTemplateColumns: `repeat(${GRID_SIZE}, 22px)` }}>
          {cells}
        </div>
      </div>

      <button className="dg-notes-toggle" onClick={() => setNotesOpen(o => !o)}>
        {notesOpen ? 'Esconder notas' : 'Mostrar notas'}
      </button>

      {notesOpen && (
        <div className="dg-notes-overlay">
          <span className="lbl">Anotações</span>
          <textarea
            value={notes}
            onChange={handleNotesChange}
            onFocus={() => { notesFocusedRef.current = true; }}
            onBlur={() => { notesFocusedRef.current = false; pushDebounced(); }}
            placeholder="Anote aqui o que você achou, armadilhas, itens, caminhos..."
          />
        </div>
      )}
    </div>
  );
}
