import Link from 'next/link';

export default function PortfolioHome() {
  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      minHeight: '100vh',
      backgroundColor: '#040d1a',
      color: 'white',
      fontFamily: 'Inter, sans-serif'
    }}>
      <h1 style={{ fontSize: '3rem', marginBottom: '1rem', fontWeight: 'bold' }}>hekbay</h1>
      <p style={{ color: '#94a3b8', marginBottom: '2rem' }}>Portfólio em construção.</p>
      
      <Link 
        href="/pantanal" 
        style={{
          padding: '12px 24px',
          backgroundColor: '#1b8b73',
          color: 'white',
          textDecoration: 'none',
          borderRadius: '8px',
          fontWeight: '600'
        }}
      >
        Ver projeto Pantanal Saúde →
      </Link>
    </div>
  );
}
