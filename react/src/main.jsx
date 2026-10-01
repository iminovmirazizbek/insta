import { Component, StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

// Never show a blank white page: if rendering crashes, show a recovery screen instead.
class ErrorBoundary extends Component {
	state = { failed: false }
	static getDerivedStateFromError() { return { failed: true } }
	componentDidCatch(error) { console.error('App crashed:', error) }
	reset = async () => {
		try {
			if ('serviceWorker' in navigator) (await navigator.serviceWorker.getRegistrations()).forEach(r => r.unregister())
			if (window.caches) (await caches.keys()).forEach(key => caches.delete(key))
		} catch { /* ignore */ }
		location.reload()
	}
	render() {
		if (!this.state.failed) return this.props.children
		return (
			<div style={{ minHeight: '100vh', display: 'grid', placeItems: 'center', background: '#0b1224', color: '#fff', fontFamily: 'system-ui, sans-serif', padding: 24, textAlign: 'center' }}>
				<div>
					<h1 style={{ fontSize: 22, marginBottom: 8 }}>Nimadir xato ketdi</h1>
					<p style={{ opacity: 0.7, marginBottom: 16 }}>Sahifani qayta yuklab ko‘ring.</p>
					<button onClick={this.reset} style={{ background: '#6366f1', color: '#fff', border: 0, borderRadius: 10, padding: '10px 20px', fontSize: 16, cursor: 'pointer' }}>Qayta yuklash</button>
				</div>
			</div>
		)
	}
}

if (import.meta.env.PROD && 'serviceWorker' in navigator) {
	window.addEventListener('load', () => {
		navigator.serviceWorker.register('/sw.js').catch(() => {})
	})
}

createRoot(document.getElementById('root')).render(<StrictMode><ErrorBoundary><App /></ErrorBoundary></StrictMode>)
