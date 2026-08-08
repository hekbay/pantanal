"use client";
import { useState, useEffect, useCallback, useRef } from 'react';
import './dungeon.css';

const GRID_SIZE = 40;
const STORAGE_KEY = 'dungeon_grid_v1';
const NOTES_KEY = 'dungeon_notes_v1';

export default function DungeonPage() {
  const [painted, setPainted] = useState(() => new Set());
  const [notesOpen, setNotesOpen] = useState(true);
  const [notes, setNotes] = useState('');
  const loadedRef = useRef(false);
  const paintingRef = useRef(false);
  const paintModeRef = useRef(true); // true = pintando, false = apagando (definido pela primeira célula do arrasto)

  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) setPainted(new Set(JSON.parse(saved)));
      const savedNotes = localStorage.getItem(NOTES_KEY);
      if (savedNotes) setNotes(savedNotes);
    } catch (e) {}
    loadedRef.current = true;

    const stopPaint = () => { paintingRef.current = false; };
    window.addEventListener('mouseup', stopPaint);
    return () => window.removeEventListener('mouseup', stopPaint);
  }, []);

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
    if (confirm('Limpar todo o grid da dungeon?')) setPainted(new Set());
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
        <button onClick={clearGrid}>Limpar grid</button>
      </div>
      <div className="dg-hint">Clique (ou clique e arraste) para pintar/apagar quadrados conforme você explora.</div>

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
            onChange={e => setNotes(e.target.value)}
            placeholder="Anote aqui o que você achou, armadilhas, itens, caminhos..."
          />
        </div>
      )}
    </div>
  );
}
