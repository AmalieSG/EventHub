import type { LayoutProps } from 'rwsdk/router'
import { Navigation } from '../components/Navigation'
import { Footer } from '../components/Footer'

// The Layout component receives the 'children' it is wrapping.
export function AppLayout({ children }: LayoutProps) {
  return (
    <div className="app-container">
      <header>
       <Navigation />
      </header>

      <main>{children}</main>

      <Footer />
    </div>
  )
}